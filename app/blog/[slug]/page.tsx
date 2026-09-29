import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowRight, List } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/lib/all-blog-posts';
import { loadImportedGoogleDoc } from '@/lib/imported-google-doc';
import { BlogPostCover } from '@/components/BlogCover';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'مقال غير موجود' };
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `https://www.matabekhjeddah.com${post.coverImage}`;
  return {
    title: `${post.title} | مدونة معلم مطابخ جدة`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `https://www.matabekhjeddah.com/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: imageUrl, width: 1200, height: 675, alt: post.title }], type: 'article', publishedTime: post.date, authors: [post.author] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [imageUrl] },
  };
}

export async function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const basePost = getBlogPost(slug);
  if (!basePost) notFound();
  const loaded = await loadImportedGoogleDoc(slug);
  const post = loaded ? { ...basePost, ...loaded } : basePost;
  const relatedPosts = blogPosts.filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag))).slice(0, 3);
  const fallbackRelated = relatedPosts.length ? relatedPosts : blogPosts.filter(p => p.id !== post.id).slice(0, 3);
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `https://www.matabekhjeddah.com${post.coverImage}`;
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt,
    image: [imageUrl], datePublished: post.date, dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    mainEntityOfPage: `https://www.matabekhjeddah.com/blog/${post.slug}`,
    keywords: post.tags.join(', '), inLanguage: 'ar-SA'
  };
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://www.matabekhjeddah.com/' },
    { '@type': 'ListItem', position: 2, name: 'المدونة', item: 'https://www.matabekhjeddah.com/blog' },
    { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.matabekhjeddah.com/blog/${post.slug}` }
  ]};

  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="pt-32 pb-14 bg-white border-b border-stone-200">
        <div className="container mx-auto px-6 md:px-12"><div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 mb-8 font-medium"><ArrowRight className="w-4 h-4" />العودة للمدونة</Link>
          <div className="flex gap-2 flex-wrap mb-6">{post.tags.map((tag, idx) => <span key={idx} className="bg-amber-100 text-amber-800 text-sm font-bold px-4 py-1.5 rounded-full">{tag}</span>)}</div>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-8">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-stone-600 border-t border-b border-stone-100 py-4">
            <span className="flex items-center gap-2"><User className="w-5 h-5" /> <b>{post.author}</b></span>
            <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {post.readTime} قراءة</span>
          </div>
        </div></div>
      </section>

      <section className="py-12"><div className="container mx-auto px-6 md:px-12"><div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        <aside className="w-full lg:w-1/3 space-y-8 lg:sticky lg:top-32 order-2 lg:order-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2"><List className="w-5 h-5 text-amber-500" />محتويات المقال</h2>
            <ul className="space-y-3">{post.tableOfContents.map((item, idx) => <li key={idx} className={item.level === 3 ? 'pr-4' : ''}><a href={`#${item.id}`} className="text-stone-600 hover:text-amber-600 block text-sm leading-relaxed">{item.title}</a></li>)}</ul>
          </div>
          <div className="bg-stone-900 rounded-2xl p-8 text-center text-white shadow-lg border-b-4 border-amber-500">
            <h2 className="text-xl font-bold mb-4">هل تحتاج إلى خدمة لمطبخك؟</h2>
            <p className="text-stone-300 text-sm mb-6 leading-relaxed">تواصل معنا لخدمات التركيب والصيانة والفك والنقل والتفصيل داخل جدة.</p>
            <a href="tel:+966567659475" className="inline-flex w-full justify-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl"><span dir="ltr">056 765 9475</span></a>
          </div>
        </aside>

        <article className="w-full lg:w-2/3 order-1 lg:order-2">
          <div className="relative w-full aspect-[16/9] mb-12 rounded-3xl overflow-hidden shadow-md bg-stone-200">
            <BlogPostCover slug={post.slug} src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full" />
          </div>
          <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-900 prose-a:text-amber-600 prose-li:marker:text-amber-500" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div></div></section>

      <section className="py-16 bg-white border-t border-stone-200"><div className="container mx-auto px-6 md:px-12"><div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-stone-900 mb-10 text-center">مقالات ذات صلة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{fallbackRelated.map((related) => <Link key={related.id} href={`/blog/${related.slug}`} className="group bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 hover:shadow-md transition-all"><div className="h-40 relative bg-stone-200"><BlogPostCover slug={related.slug} src={related.coverImage} alt={related.title} className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500" /></div><div className="p-5"><span className="text-amber-600 text-xs font-bold">{related.tags[0]}</span><h3 className="font-bold mt-2 line-clamp-2 group-hover:text-amber-600">{related.title}</h3></div></Link>)}</div>
      </div></div></section>
    </div>
  );
}
