import React from 'react';

const xOffset = [0, -102.4, -202.4, -303.2, -400];
const yOffset = [0, -140.5, -287.5];

const tileBySlug: Record<string, [number, number]> = {
  'aluminum-kitchen-maintenance-technician': [0, 0],
  'kitchen-moving-installation-jeddah': [1, 0],
  'kitchen-installer-services-jeddah': [2, 0],
  'kitchen-installer-jeddah': [3, 0],
  'aluminum-kitchen-technician-jeddah': [4, 0],
  'kitchen-installation-master-jeddah': [2, 0],
  'kitchen-technician-al-safa-jeddah': [3, 0],
  'kitchen-installation-worker-jeddah': [4, 2],
  'kitchen-disassembly-reinstallation': [1, 2],
  'kitchen-hinge-repair': [4, 1],
  'ready-made-kitchen-installation': [3, 2],
  'ikea-kitchen-customization-jeddah': [2, 1],
  'custom-kitchen-marble-jeddah': [2, 2],
  'best-custom-kitchen-shop-jeddah': [2, 1],
  'cheap-custom-kitchens-jeddah': [4, 0],
  'best-kitchen-types-jeddah': [4, 0],
  'kitchen-prices-guide-jeddah-2026': [2, 1],
  'how-to-choose-kitchen-marble': [2, 2],
  'kitchen-maintenance-and-renewal': [1, 2],
  'cladding-kitchens-pros-cons': [0, 2],
  'tips-before-designing-new-kitchen': [2, 1],
  'modern-kitchen-colors-trends-2026': [0, 2],
  'how-to-choose-best-kitchen-technician': [4, 2],
  'smart-storage-solutions-small-kitchens': [3, 1],
  'how-to-clean-kitchen-cabinets': [0, 0],
  'kitchen-installation-jeddah': [2, 0],
  'ikea-kitchen-installation-jeddah': [3, 2],
  'wood-kitchen-installation-jeddah': [0, 1],
  'kitchen-countertop-installation-jeddah': [1, 1],
  'kitchen-maintenance-jeddah': [4, 1],
};

function fallbackTile(slug: string): [number, number] {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return [hash % 5, Math.floor(hash / 5) % 3];
}

export const BLOG_COVER_SPRITE = '/blog/ai/blog-covers-sprite.webp';

export function getBlogCoverSrc() {
  return BLOG_COVER_SPRITE;
}

export default function BlogCover({ slug, alt, className = '' }: { slug: string; alt: string; className?: string }) {
  const [col, row] = tileBySlug[slug] ?? fallbackTile(slug);

  return (
    <div className={`overflow-hidden bg-stone-200 ${className}`} role="img" aria-label={alt}>
      <img
        src={BLOG_COVER_SPRITE}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute max-w-none select-none pointer-events-none"
        style={{
          width: '500%',
          height: '426.67%',
          left: `${xOffset[col]}%`,
          top: `${yOffset[row]}%`,
        }}
      />
    </div>
  );
}
