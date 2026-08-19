import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { seoArticles } from '@/lib/seo-articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPostUrls: MetadataRoute.Sitemap = seoArticles.map((post) => ({ url: `https://matabekhjeddah.com/blog/${post.slug}`, lastModified: new Date(post.updated), changeFrequency: 'monthly', priority: 0.8 }));
  const legacyPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({ url: `https://matabekhjeddah.com/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.75 }));
  return [
    { url: 'https://matabekhjeddah.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://matabekhjeddah.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...seoPostUrls, ...legacyPostUrls,
  ];
}
