import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin, List } from 'lucide-react';
import { blogPosts, getBlogPost } from '@/lib/blog-data';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return { title: 'مقال غير موجود' };
  }
  
  return {
    title: `${post.title} | مدونة معلم مطابخ جدة`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    }
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  // Get related posts (just taking 2 random ones for demo, excluding current)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">
      {/* Article Header */}
      <section className="pt-32 pb-16 bg-white border-b border-stone-200">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors mb-8 font-medium">
              <ArrowRight className="w-4 h-4" />
              العودة للمدونة
            </Link>
            
            <div className="flex gap-2 flex-wrap mb-6">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="bg-amber-100 text-amber-800 text-sm font-bold px-4 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-8">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-stone-600 border-t border-b border-stone-100 py-4 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
                  <User className="w-5 h-5" />
                </div>
                <span className="font-bold text-stone-900">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 border-r border-stone-200 pr-6">
                <Calendar className="w-5 h-5 text-stone-400" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 border-r border-stone-200 pr-6">
                <Clock className="w-5 h-5 text-stone-400" />
                <span>{post.readTime} قراءة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Sidebar (Table of Contents & CTA) */}
            <aside className="w-full lg:w-1/3 space-y-8 lg:sticky lg:top-32 order-2 lg:order-1">
              {/* Table of Contents */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <List className="w-5 h-5 text-amber-500" />
                  محتويات المقال
                </h3>
                <ul className="space-y-3">
                  {post.tableOfContents.map((item, idx) => (
                    <li key={idx}>
                      <a href={`#${item.id}`} className="text-stone-600 hover:text-amber-600 transition-colors block text-sm leading-relaxed">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Service CTA */}
              <div className="bg-stone-900 rounded-2xl p-8 text-center text-white relative overflow-hidden shadow-lg border-b-4 border-amber-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-[80px] opacity-20"></div>
                <h3 className="text-xl font-bold mb-4">هل تحتاج إلى استشارة لمطبخك؟</h3>
                <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                  تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر لتفصيل أو صيانة مطبخك في جدة.
                </p>
                <a 
                  href="tel:0567659475"
                  className="inline-flex w-full items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  <span dir="ltr">056 765 9475</span>
                </a>
              </div>
            </aside>

            {/* Article Body */}
            <article className="w-full lg:w-2/3 order-1 lg:order-2">
              <div className="relative w-full aspect-[16/9] mb-12 rounded-3xl overflow-hidden shadow-md">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
              
              {/* Render HTML content securely (since we generated it) */}
              <div 
                className="prose-container"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
              
              {/* Article Footer (Tags & Share) */}
              <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-stone-900">مشاركة:</span>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-[#1877F2] hover:text-white transition-colors">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-[#0A66C2] hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
            
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-900 mb-10 text-center">مقالات ذات صلة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group flex flex-col sm:flex-row gap-6 bg-stone-50 rounded-2xl p-4 border border-stone-100 hover:shadow-md transition-all">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <span className="text-amber-600 text-xs font-bold mb-2 block">{relatedPost.tags[0]}</span>
                    <h3 className="text-lg font-bold text-stone-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
