import type { ReactNode } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans overflow-x-hidden">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
