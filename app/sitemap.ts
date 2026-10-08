import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/all-blog-posts';
import { seoArticles } from '@/lib/seo-articles';

const CANONICAL_ORIGIN = 'https://www.matabekhjeddah.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use the same complete article source as the blog and dynamic post routes.
  // Imported articles were previously omitted from the sitemap.
  const posts = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const post of blogPosts) {
    posts.set(post.slug, {
      url: `${CANONICAL_ORIGIN}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  }

  // Dedicated SEO routes have their own updated date and take precedence.
  for (const post of seoArticles) {
    posts.set(post.slug, {
      url: `${CANONICAL_ORIGIN}/blog/${post.slug}`,
      lastModified: new Date(post.updated),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  const latestArticleDate = [...blogPosts.map(post => post.date), ...seoArticles.map(post => post.updated)].sort().at(-1);

  return [
    { url: CANONICAL_ORIGIN, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${CANONICAL_ORIGIN}/blog`,
      ...(latestArticleDate ? { lastModified: new Date(latestArticleDate) } : {}),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...posts.values(),
  ];
}
