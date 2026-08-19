'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Clock, MapPin, Menu, ShieldCheck, X } from 'lucide-react';

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isBlogIndex = pathname === '/blog';
  const solidHeader = scrolled || isMenuOpen || !isBlogIndex;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header dir="rtl">
      <div className="bg-stone-950 text-stone-300 py-2.5 px-6 md:px-12 text-[11px] font-medium tracking-wide flex justify-between items-center border-b border-stone-800">
        <span className="hidden md:inline-flex items-center gap-2">
          <MapPin className="w-3 h-3 text-amber-500" />
          جدة - المملكة العربية السعودية
        </span>
        <div className="flex gap-6 mx-auto md:mx-0 w-full justify-center md:justify-end">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 leading-none text-amber-500" /> ضمان أعمال التنفيذ
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 leading-none text-amber-500" /> التزام تام بالمواعيد
          </span>
        </div>
      </div>

      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-0 bg-white/95 backdrop-blur-md shadow-sm py-3' : `${solidHeader ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'} top-[38px] py-5`}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="relative z-10 flex items-center gap-2" onClick={closeMenu}>
            <Image
              src={solidHeader
                ? 'https://res.cloudinary.com/dxvjqrb9l/image/upload/v1781439759/%D9%85%D8%B9%D9%84%D9%85_%D9%85%D8%B7%D8%A7%D8%A8%D8%AE_sda9ba.png'
                : 'https://res.cloudinary.com/dxvjqrb9l/image/upload/v1781442195/%D9%85%D8%B9%D9%84%D9%85_%D9%85%D8%B7%D8%A7%D8%A8%D8%AE_2-removebg-preview_lc4mso.png'}
              alt="معلم مطابخ جدة"
              width={160}
              height={50}
              className={`h-11 w-auto object-contain transition-all duration-300 ${solidHeader ? '' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] line-clamp-1'}`}
              priority
              referrerPolicy="no-referrer"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <div className={`flex gap-8 text-sm font-semibold tracking-wide ${solidHeader ? 'text-stone-600' : 'text-stone-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'}`}>
              <Link href="/#hero" className="hover:text-amber-500 transition-colors">الرئيسية</Link>
              <Link href="/#about" className="hover:text-amber-500 transition-colors">عن الشركة</Link>
              <Link href="/#services" className="hover:text-amber-500 transition-colors">الخدمات</Link>
              <Link href="/#gallery" className="hover:text-amber-500 transition-colors">معرض الأعمال</Link>
              <Link href="/blog" className="hover:text-amber-500 transition-colors">المدونة</Link>
              <Link href="/#method" className="hover:text-amber-500 transition-colors">آلية العمل</Link>
              <Link href="/#contact" className="hover:text-amber-500 transition-colors">تواصل معنا</Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className={`flex flex-col items-end mr-4 border-r ${solidHeader ? 'border-stone-200 text-stone-800' : 'border-white/20 text-white'} pr-4`}>
              <span className={`text-[10px] tracking-widest uppercase mb-0.5 ${solidHeader ? 'text-stone-400' : 'text-stone-300'}`}>اتصل بنا</span>
              <a href="tel:0567659475" className="font-bold tracking-tighter hover:text-amber-500 transition-colors" style={{ direction: 'ltr' }}>
                056 765 9475
              </a>
            </div>
            <Link
              href="/#contact"
              className="bg-amber-600 hover:bg-amber-700 text-white px-7 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-amber-600/20 active:scale-95"
            >
              اطلب معاينة
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMenuOpen}
            className={`lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-lg ${solidHeader ? 'text-stone-900 bg-stone-100' : 'text-white bg-white/10 backdrop-blur-md'}`}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center px-8 z-0"
            >
              <div className="flex flex-col gap-6 text-2xl font-black text-stone-900">
                <Link href="/#hero" onClick={closeMenu}>الرئيسية</Link>
                <Link href="/#about" onClick={closeMenu}>عن الشركة</Link>
                <Link href="/#services" onClick={closeMenu}>الخدمات</Link>
                <Link href="/#gallery" onClick={closeMenu}>معرض الأعمال</Link>
                <Link href="/blog" onClick={closeMenu}>المدونة</Link>
                <Link href="/#method" onClick={closeMenu}>كيف نعمل</Link>
                <Link href="/#contact" onClick={closeMenu}>اتصل بنا</Link>
                <div className="h-px bg-stone-100 my-4 w-12" />
                <a href="tel:0567659475" className="text-xl text-amber-600 font-bold" style={{ direction: 'ltr', textAlign: 'right' }}>
                  056 765 9475
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
