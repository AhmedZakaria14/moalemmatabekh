import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import { seoArticles } from '@/lib/seo-articles';

export const metadata: Metadata = {
  title: 'المدونة | نصائح ومعلومات عن المطابخ',
  description: 'اقرأ أحدث المقالات والنصائح حول تفصيل وتركيب وصيانة المطابخ في جدة، مع أدلة عملية لاختيار الخامات والفني المناسب.',
  keywords: ['مدونة مطابخ', 'تركيب مطابخ', 'فني مطابخ جدة', 'نصائح مطابخ', 'تفصيل مطابخ'],
  alternates: { canonical: 'https://matabekhjeddah.com/blog' },
};

export default function BlogListingPage() {
  const allPosts = [...seoArticles, ...blogPosts];
  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">
      <section className="relative pt-32 pb-20 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0"><div className="absolute inset-0 bg-stone-900/90 mix-blend-multiply z-10" /><Image src="/blog/kitchen-installation-jeddah.svg" alt="خلفية مدونة معلم مطابخ جدة" fill className="object-cover" referrerPolicy="no-referrer" priority /></div>
        <div className="container relative z-20 mx-auto px-6 md:px-12 text-center"><h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">مدونة <span className="text-amber-500">معلم مطابخ جدة</span></h1><p className="text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">دليلك الشامل لكل ما يخص تفصيل وتركيب وصيانة المطابخ، مع نصائح عملية لمطبخ متين وعملي.</p></div>
      </section>
      <section className="py-20"><div className="container mx-auto px-6 md:px-12"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPosts.map((post) => (<article key={post.slug} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
          <Link href={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden"><Image src={post.coverImage} alt={post.title} fill unoptimized={post.coverImage.endsWith('.svg')} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy={post.coverImage.startsWith('http') ? 'no-referrer' : undefined} /><div className="absolute top-4 right-4 flex gap-2 flex-wrap">{post.tags.slice(0, 2).map((tag, idx) => <span key={idx} className="bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-bold px-3 py-1 rounded-full">{tag}</span>)}</div></Link>
          <div className="p-6 flex flex-col flex-grow"><div className="flex items-center gap-4 text-xs text-stone-500 mb-4"><span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span><span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span></div><Link href={`/blog/${post.slug}`}><h2 className="text-xl font-bold text-stone-900 mb-3 line-clamp-2 hover:text-amber-600 transition-colors">{post.title}</h2></Link><p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">{post.excerpt}</p><div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto"><span className="flex items-center gap-2 text-sm font-medium text-stone-900"><span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center"><User className="w-4 h-4" /></span>{post.author}</span><Link href={`/blog/${post.slug}`} className="text-amber-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">اقرأ المزيد <ArrowLeft className="w-4 h-4" /></Link></div></div>
        </article>))}
      </div></div></section>
    </div>
  );
}
