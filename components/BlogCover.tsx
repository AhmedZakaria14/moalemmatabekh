import React from 'react';

export const BLOG_COVER_SPRITE = '/blog/photos/modern-kitchen-cabinets.jpg';

export function getBlogCoverSrc() {
  return BLOG_COVER_SPRITE;
}

export default function BlogCover({ alt, className = '' }: { slug: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden bg-stone-200 ${className}`} role="img" aria-label={alt}>
      <img
        src={BLOG_COVER_SPRITE}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}


export function BlogPostCover({
  slug,
  src,
  alt,
  className = '',
}: {
  slug: string;
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src || src === BLOG_COVER_SPRITE) {
    return <BlogCover slug={slug} alt={alt} className={className} />;
  }

  return (
    <div className={`overflow-hidden bg-stone-200 ${className}`} role="img" aria-label={alt}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
