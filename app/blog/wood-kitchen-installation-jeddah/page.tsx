import type { Metadata } from 'next';
import SeoArticlePage from '@/components/SeoArticlePage';
import { getSeoArticle } from '@/lib/seo-articles';

const article = getSeoArticle("wood-kitchen-installation-jeddah")!;

export const metadata: Metadata = {
  title: article.seoTitle, description: article.excerpt, keywords: article.keywords,
  alternates: { canonical: `https://matabekhjeddah.com/blog/${article.slug}` },
  openGraph: { title: article.seoTitle, description: article.excerpt, url: `https://matabekhjeddah.com/blog/${article.slug}`, siteName: 'معلم مطابخ جدة', locale: 'ar_SA', type: 'article', publishedTime: article.date, modifiedTime: article.updated, images: [{ url: `https://matabekhjeddah.com${article.coverImage}`, width: 1200, height: 675, alt: article.title }] },
  twitter: { card: 'summary_large_image', title: article.seoTitle, description: article.excerpt, images: [`https://matabekhjeddah.com${article.coverImage}`] },
};

export default function Page() { return <SeoArticlePage article={article} />; }
