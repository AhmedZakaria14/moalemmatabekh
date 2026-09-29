import type { BlogPost } from './blog-data';
import { blogPosts as legacyBlogPosts } from './blog-data';
import { importedArticles } from './imported-articles';

const aiKitchenImage = '/blog/ai/blog-covers-sprite.webp';

const importedBlogPosts: BlogPost[] = importedArticles.map((article) => ({
  id: article.id,
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  coverImage: aiKitchenImage,
  date: article.date,
  author: article.author,
  readTime: article.readTime,
  tags: article.tags,
  tableOfContents: [],
  content: '',
}));

const refreshedLegacyPosts: BlogPost[] = legacyBlogPosts;

export const blogPosts: BlogPost[] = [...importedBlogPosts, ...refreshedLegacyPosts];
export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
