import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'المدونة | نصائح ومعلومات عن المطابخ',
  description: 'اقرأ أحدث المقالات والنصائح حول تفصيل، تركيب، صيانة وتنظيف المطابخ وأنواع الرخام المختلفة. دليل شامل لكل ما يخص مطابخ جدة.',
  keywords: ['مدونة مطابخ', 'نصائح مطابخ', 'معلومات عن تفصيل المطابخ', 'مقالات ديكور مطابخ', 'تجديد مطابخ'],
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">
      {/* Header */}
      <section className="relative pt-32 pb-20 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-stone-900/90 mix-blend-multiply z-10" />
          <Image
            src="https://res.cloudinary.com/dxvjqrb9l/image/upload/w_1600,q_auto,f_auto/v1781396929/hero-bg1.jpg_s0urew.jpg"
            alt="خلفية المدونة"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        
        <div className="container relative z-20 mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            مدونة <span className="text-amber-500">معلم مطابخ جدة</span>
          </h1>
          <p className="text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            دليلك الشامل لكل ما يخص تفصيل، تركيب، وصيانة المطابخ. نصائح وأفكار لمطبخ عصري وعملي.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
                <Link href={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 flex gap-2 flex-wrap">
                    {post.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-bold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-stone-900 mb-3 line-clamp-2 hover:text-amber-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                    <span className="flex items-center gap-2 text-sm font-medium text-stone-900">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      {post.author}
                    </span>
                    <Link href={`/blog/${post.slug}`} className="text-amber-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      اقرأ المزيد
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
