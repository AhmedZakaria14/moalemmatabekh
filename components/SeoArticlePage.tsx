import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, List, Phone } from 'lucide-react';
import { loadGoogleDocArticle } from '@/lib/google-doc-article';
import type { SeoArticle } from '@/lib/seo-articles';

export default async function SeoArticlePage({ article }: { article: SeoArticle }) {
  const { content, tableOfContents } = await loadGoogleDocArticle(article);
  const articleUrl = `https://matabekhjeddah.com/blog/${article.slug}`;
  const imageUrl = `https://matabekhjeddah.com${article.coverImage}`;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.excerpt, image: [imageUrl],
    datePublished: article.date, dateModified: article.updated, author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: 'معلم مطابخ جدة', url: 'https://matabekhjeddah.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl }, keywords: article.keywords.join(', '),
  };

  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="pt-32 pb-14 bg-white border-b border-stone-200">
        <div className="container mx-auto px-6 md:px-12"><div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors mb-8 font-medium"><ArrowRight className="w-4 h-4" /> العودة للمدونة</Link>
          <div className="flex gap-2 flex-wrap mb-6">{article.tags.map((tag) => <span key={tag} className="bg-amber-100 text-amber-800 text-sm font-bold px-4 py-1.5 rounded-full">{tag}</span>)}</div>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-8">{article.title}</h1>
          <p className="text-lg text-stone-600 leading-8 mb-7">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-5 text-sm text-stone-600 border-t border-b border-stone-100 py-4"><span className="flex items-center gap-2"><User className="w-5 h-5" /> <strong>{article.author}</strong></span><span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-stone-400" /> {article.date}</span><span className="flex items-center gap-2"><Clock className="w-5 h-5 text-stone-400" /> {article.readTime} قراءة</span></div>
        </div></div>
      </section>
      <section className="py-12"><div className="container mx-auto px-6 md:px-12"><div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        <aside className="w-full lg:w-1/3 space-y-8 lg:sticky lg:top-28 order-2 lg:order-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100"><h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2"><List className="w-5 h-5 text-amber-500" /> محتويات المقال</h2><nav aria-label="جدول محتويات المقال"><ul className="space-y-3">{tableOfContents.map((item) => <li key={item.id}><a href={`#${item.id}`} className="text-stone-600 hover:text-amber-600 transition-colors block text-sm leading-relaxed">{item.title}</a></li>)}</ul></nav></div>
          <div className="bg-stone-900 rounded-2xl p-8 text-center text-white shadow-lg border-b-4 border-amber-500"><h2 className="text-xl font-bold mb-4">تحتاج فني مطابخ في جدة؟</h2><p className="text-stone-300 text-sm mb-6 leading-relaxed">تواصل معنا لمعاينة المطبخ والحصول على استشارة وعرض سعر مناسب للخدمة المطلوبة.</p><a href="tel:0567659475" className="inline-flex w-full items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"><Phone className="w-4 h-4" /><span dir="ltr">056 765 9475</span></a></div>
        </aside>
        <article className="w-full lg:w-2/3 order-1 lg:order-2"><div className="relative w-full aspect-[16/9] mb-12 rounded-3xl overflow-hidden shadow-md bg-stone-200"><Image src={article.coverImage} alt={article.title} fill unoptimized sizes="(max-width: 1024px) 100vw, 760px" className="object-cover" priority /></div><div className="prose-container" dangerouslySetInnerHTML={{ __html: content }} /></article>
      </div></div></section>
    </div>
  );
}
