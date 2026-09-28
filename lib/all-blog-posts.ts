import type { BlogPost } from './blog-data';
import { blogPosts as legacyBlogPosts } from './blog-data';
import { importedArticles } from './imported-articles';

const aiKitchenImage = 'https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:4349d4a5-ce5a-49ef-b247-e8bf955ca42b';

const importedBlogPosts: BlogPost[] = importedArticles.map((article) => ({
  id: article.id,
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  coverImage: article.coverImage,
  date: article.date,
  author: article.author,
  readTime: article.readTime,
  tags: article.tags,
  tableOfContents: [],
  content: '',
}));

const refreshedLegacyPosts: BlogPost[] = legacyBlogPosts.map((post) => ({ ...post, coverImage: aiKitchenImage }));

export const blogPosts: BlogPost[] = [...importedBlogPosts, ...refreshedLegacyPosts];
export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
