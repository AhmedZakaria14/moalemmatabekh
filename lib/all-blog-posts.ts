import type { BlogPost } from './blog-data';
import { blogPosts as legacyBlogPosts } from './blog-data';
import { importedArticles } from './imported-articles';

const blogCoverBySlug: Record<string, string> = {
  'aluminum-kitchen-maintenance-technician': '/blog/photos/aluminum-modern-kitchen.jpg',
  'kitchen-moving-installation-jeddah': '/blog/photos/kitchen-installation-technician.jpg',
  'kitchen-installer-services-jeddah': '/blog/photos/kitchen-installation-technician.jpg',
  'kitchen-installer-jeddah': '/blog/photos/kitchen-installation-technician.jpg',
  'aluminum-kitchen-technician-jeddah': '/blog/photos/aluminum-modern-kitchen.jpg',
  'kitchen-installation-master-jeddah': '/blog/photos/kitchen-installation-technician.jpg',
  'kitchen-technician-al-safa-jeddah': '/blog/photos/kitchen-installation-technician.jpg',
  'kitchen-installation-worker-jeddah': '/blog/photos/kitchen-installation-technician.jpg',
  'kitchen-disassembly-reinstallation': '/blog/photos/kitchen-installation-technician.jpg',
  'kitchen-hinge-repair': '/blog/photos/kitchen-hinge-repair.jpg',
  'ready-made-kitchen-installation': '/blog/photos/modern-kitchen-cabinets.jpg',
  'ikea-kitchen-customization-jeddah': '/blog/photos/modern-kitchen-cabinets.jpg',
  'custom-kitchen-marble-jeddah': '/blog/photos/marble-countertop-kitchen.jpg',
  'best-custom-kitchen-shop-jeddah': '/blog/photos/modern-kitchen-cabinets.jpg',
  'cheap-custom-kitchens-jeddah': '/blog/photos/modern-kitchen-cabinets.jpg',
  'industrial-kitchen-marble-installation': '/blog/photos/marble-countertop-kitchen.jpg',
  'kitchen-marble-shop-jeddah': '/blog/photos/marble-countertop-kitchen.jpg',
  'black-kitchen-marble': '/blog/photos/marble-countertop-kitchen.jpg',
  'white-granite-kitchen-marble': '/blog/photos/marble-countertop-kitchen.jpg',
  'natural-kitchen-marble-installation': '/blog/photos/marble-countertop-kitchen.jpg',
  'kitchen-marble-jeddah': '/blog/photos/marble-countertop-kitchen.jpg',
  'modern-marble-kitchen-installation': '/blog/photos/marble-countertop-kitchen.jpg',
  'kitchen-marble-installer-jeddah': '/blog/photos/marble-countertop-kitchen.jpg',
};

const getCoverImageForSlug = (slug: string) => blogCoverBySlug[slug] ?? '/blog/photos/modern-kitchen-cabinets.jpg';

const importedBlogPosts: BlogPost[] = importedArticles.map((article) => ({
  id: article.id,
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  coverImage: getCoverImageForSlug(article.slug),
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
