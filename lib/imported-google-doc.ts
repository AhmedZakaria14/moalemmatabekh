import { getImportedArticle } from './imported-articles';

const decodeEntities = (value: string) => value
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const stripTags = (value: string) => decodeEntities(value.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const normalizeGoogleLinks = (html: string) => html.replace(/href="https:\/\/www\.google\.com\/url\?q=([^&"]+)[^"]*"/gi, (_m, encoded) => {
  try { return `href="${decodeURIComponent(encoded)}"`; } catch { return `href="${encoded}"`; }
});

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
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sclass="[^"]*"/gi, '')
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')
    .replace(/<p[^>]*>\s*(?:<[^>]+>)*\s*Meta description:?\s*(?:<\/[^>]+>)*\s*<\/p>/i, '')
    .replace(/<p[^>]*>\s*(?:<[^>]+>)*\s*["“][\s\S]*?["”]\s*(?:<\/[^>]+>)*\s*<\/p>/i, '');

  const toc: { id: string; title: string; level: number }[] = [];
  let index = 0;
  body = body.replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi, (_match, tag: string, attrs: string, inner: string) => {
    index += 1;
    const id = `section-${index}`;
    const level = tag.toLowerCase() === 'h2' ? 2 : 3;
    toc.push({ id, title: stripTags(inner), level });
    return `<${tag} id="${id}" class="scroll-mt-24">${inner}</${tag}>`;
  });

  body = body
    .replace(/<a([^>]*)>/gi, '<a$1 class="text-amber-600 font-bold hover:underline">')
    .replace(/<p>\s*<\/p>/gi, '')
    .trim();

  return { content: `<div class="prose prose-stone prose-lg max-w-none text-stone-700">${body}</div>`, tableOfContents: toc };
}
