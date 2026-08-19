import { seoArticles, type SeoArticle } from '@/lib/seo-articles';
import kitchenInstallation from '@/content/blog/kitchen-installation-jeddah';
import ikeaInstallation from '@/content/blog/ikea-kitchen-installation-jeddah';
import woodInstallation from '@/content/blog/wood-kitchen-installation-jeddah';
import countertopInstallation from '@/content/blog/kitchen-countertop-installation-jeddah';

const markdownBySlug: Record<string, string> = {
  'kitchen-installation-jeddah': kitchenInstallation,
  'ikea-kitchen-installation-jeddah': ikeaInstallation,
  'wood-kitchen-installation-jeddah': woodInstallation,
  'kitchen-countertop-installation-jeddah': countertopInstallation,
};

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const renderInline = (value: string) => {
  let result = escapeHtml(value).replace(/\\\./g, '.');
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_match, label: string, href: string) => {
    const normalized = href.includes('matabekhjeddah.com') ? (href.includes('#hero') ? '/#hero' : '/') : href;
    return `<a href="${normalized}" target="_blank" rel="noopener noreferrer" class="text-amber-600 font-bold hover:underline">${label}</a>`;
  });
  return result;
};

export async function loadGoogleDocArticle(article: SeoArticle) {
  const markdown = markdownBySlug[article.slug];
  if (!markdown) throw new Error(`Article content not found: ${article.slug}`);

  const tableOfContents: { id: string; title: string; level: number }[] = [];
  const blocks = markdown.replace(/^\uFEFF/, '').split(/\n\s*\n/);
  let h2Index = 0;
  let skippedTitle = false;
  const html: string[] = [];

  for (const rawBlock of blocks) {
    const block = rawBlock.trim();
    if (!block) continue;
    if (block.startsWith('# ')) {
      if (!skippedTitle) skippedTitle = true;
      continue;
    }
    if (block.startsWith('## ')) {
      h2Index += 1;
      const plainTitle = block.slice(3).replace(/\*\*/g, '').trim();
      const id = `section-${h2Index}`;
      tableOfContents.push({ id, title: plainTitle, level: 2 });
      html.push(`<h2 id="${id}" class="text-3xl font-bold text-stone-900 mt-12 mb-6 scroll-mt-28">${renderInline(block.slice(3))}</h2>`);
      continue;
    }
    if (block.startsWith('### ')) {
      html.push(`<h3 class="text-xl font-bold text-stone-900 mt-8 mb-4">${renderInline(block.slice(4))}</h3>`);
      continue;
    }
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length > 1 && lines.every((line) => line.startsWith('* '))) {
      html.push(`<ul class="list-disc pr-6 space-y-2 my-6">${lines.map((line) => `<li>${renderInline(line.slice(2).trim())}</li>`).join('')}</ul>`);
      continue;
    }
    html.push(`<p class="mb-6 leading-8">${renderInline(block.replace(/\n+/g, ' '))}</p>`);
  }

  const related = seoArticles.filter((item) => item.slug !== article.slug);
  html.push(`<section class="my-12 rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 class="text-2xl font-bold text-stone-900 mb-4">مقالات مرتبطة قد تهمك</h2><p class="text-stone-700 mb-4">للتوسع في موضوع تركيب المطابخ، يمكنك الاطلاع على هذه الأدلة المرتبطة:</p><ul class="space-y-3">${related.map((item) => `<li><a href="/blog/${item.slug}" target="_blank" rel="noopener noreferrer" class="text-amber-700 font-bold hover:underline">${item.title}</a></li>`).join('')}</ul></section>`);

  return { content: `<div class="prose prose-stone prose-lg max-w-none text-stone-700">${html.join('')}</div>`, tableOfContents };
}
