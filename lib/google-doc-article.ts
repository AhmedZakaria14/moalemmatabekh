import { seoArticles, type SeoArticle } from '@/lib/seo-articles';

const stripTags = (value: string) => value.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function loadGoogleDocArticle(article: SeoArticle) {
  const url = `https://docs.google.com/document/d/${article.docId}/export?format=html`;
  const response = await fetch(url, { next: { revalidate: 86400 } });
  if (!response.ok) throw new Error(`Unable to load article source (${response.status})`);

  const source = await response.text();
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch?.[1] ?? source;

  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')
    .replace(/\s(?:class|style|id|dir)=("[^"]*"|'[^']*')/gi, '');

  const tableOfContents: { id: string; title: string; level: number }[] = [];
  let h2Index = 0;
  body = body.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_match, inner: string) => {
    h2Index += 1;
    const id = `section-${h2Index}`;
    tableOfContents.push({ id, title: stripTags(inner), level: 2 });
    return `<h2 id="${id}" class="text-3xl font-bold text-stone-900 mt-12 mb-6 scroll-mt-28">${inner}</h2>`;
  });

  body = body
    .replace(/<h3[^>]*>/gi, '<h3 class="text-xl font-bold text-stone-900 mt-8 mb-4">')
    .replace(/<p[^>]*>/gi, '<p class="mb-6 leading-8">')
    .replace(/<ul[^>]*>/gi, '<ul class="list-disc pr-6 space-y-2 my-6">')
    .replace(/<ol[^>]*>/gi, '<ol class="list-decimal pr-6 space-y-2 my-6">');

  body = body.replace(/<a[^>]*href=("([^"]+)"|'([^']+)')[^>]*>/gi, (_match, _q, dquoted, squoted) => {
    const href = (dquoted || squoted || '').replace(/&amp;/g, '&');
    const internal = href.includes('matabekhjeddah.com') ? (href.includes('#hero') ? '/#hero' : '/') : href;
    return `<a href="${escapeAttr(internal)}" target="_blank" rel="noopener noreferrer" class="text-amber-600 font-bold hover:underline">`;
  });

  const related = seoArticles.filter((item) => item.slug !== article.slug);
  const relatedBlock = `<section class="my-12 rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 class="text-2xl font-bold text-stone-900 mb-4">مقالات مرتبطة قد تهمك</h2><p class="text-stone-700 mb-4">للتوسع في موضوع تركيب المطابخ، يمكنك الاطلاع على هذه الأدلة المرتبطة:</p><ul class="space-y-3">${related.map((item) => `<li><a href="/blog/${item.slug}" target="_blank" rel="noopener noreferrer" class="text-amber-700 font-bold hover:underline">${item.title}</a></li>`).join('')}</ul></section>`;

  return { content: `<div class="prose prose-stone prose-lg max-w-none text-stone-700">${body}${relatedBlock}</div>`, tableOfContents };
}
