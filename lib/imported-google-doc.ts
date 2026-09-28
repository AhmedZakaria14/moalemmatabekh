import { getImportedArticle } from './imported-articles';

const decodeEntities = (value: string) => value
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => String.fromCodePoint(parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_m, dec) => String.fromCodePoint(parseInt(dec, 10)));

const cleanText = (value: string) => decodeEntities(value)
  .replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

const stripTags = (value: string) => cleanText(value.replace(/<[^>]+>/g, ' '));

const normalizeGoogleLinks = (html: string) => html.replace(/href="https:\/\/www\.google\.com\/url\?q=([^&"]+)[^"]*"/gi, (_m, encoded) => {
  try { return `href="${decodeURIComponent(encoded)}"`; } catch { return `href="${encoded}"`; }
});

const removeMetaDescriptionBlock = (html: string) => {
  // Google Docs exports the label and its description as adjacent paragraphs.
  return html.replace(
    /<p[^>]*>[\s\S]*?Meta\s*description\s*:?[\s\S]*?<\/p>\s*<p[^>]*>[\s\S]*?<\/p>/i,
    ''
  );
};

export async function loadImportedGoogleDoc(slug: string) {
  const article = getImportedArticle(slug);
  if (!article) return null;

  const url = `https://docs.google.com/document/d/${article.googleDocId}/export?format=html`;
  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) throw new Error(`Unable to load article ${slug}: ${response.status}`);
  const source = await response.text();
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : source;

  body = normalizeGoogleLinks(body)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(/<a[^>]*id="[^"]*"[^>]*><\/a>/gi, '')
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');

  body = removeMetaDescriptionBlock(body);

  const toc: { id: string; title: string; level: number }[] = [];
  const seenTitles = new Set<string>();
  let index = 0;

  body = body.replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi, (_match, tag: string, _attrs: string, inner: string) => {
    const title = stripTags(inner);
    if (!title || /^meta\s*description/i.test(title)) return '';

    index += 1;
    const id = `section-${index}`;
    const level = tag.toLowerCase() === 'h2' ? 2 : 3;
    const tocKey = `${level}:${title}`;
    if (!seenTitles.has(tocKey)) {
      toc.push({ id, title, level });
      seenTitles.add(tocKey);
    }
    return `<${tag} id="${id}" class="scroll-mt-24">${inner}</${tag}>`;
  });

  body = body
    .replace(/<span[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/<a([^>]*)>/gi, '<a$1 class="text-amber-600 font-bold hover:underline">')
    .replace(/>\s+</g, '><')
    .trim();

  return {
    content: `<div class="prose prose-stone prose-lg max-w-none text-stone-700 leading-8">${body}</div>`,
    tableOfContents: toc,
  };
}
