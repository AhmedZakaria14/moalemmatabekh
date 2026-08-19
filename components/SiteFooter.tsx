import Image from 'next/image';
import Link from 'next/link';
import { MapPin, MessageCircle, Phone } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-20 pb-8 border-t border-stone-900" dir="rtl">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1 border-b border-stone-800 pb-8 lg:border-0 lg:pb-0">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="https://res.cloudinary.com/dxvjqrb9l/image/upload/v1781439759/%D9%85%D8%B9%D9%84%D9%85_%D9%85%D8%B7%D8%A7%D8%A8%D8%AE_sda9ba.png"
                alt="معلم مطابخ جدة"
                width={150}
                height={50}
                className="h-11 w-auto object-contain opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-opacity hover:opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              متخصصون في تركيب وصيانة المطابخ وتركيب الرخام في جدة، بخبرة عملية وتشطيب احترافي يضمن الجودة والدقة العالية لتبقى إنجازاتنا شاهدة على تميزنا.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/966567659475"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all text-stone-400"
                aria-label="واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="mt-2 text-right">
            <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#hero" className="hover:text-amber-500 transition-colors">الرئيسية</Link></li>
              <li><Link href="/#about" className="hover:text-amber-500 transition-colors">عن الشركة</Link></li>
              <li><Link href="/#services" className="hover:text-amber-500 transition-colors">الخدمات</Link></li>
              <li><Link href="/blog" className="hover:text-amber-500 transition-colors">المدونة</Link></li>
              <li><Link href="/#method" className="hover:text-amber-500 transition-colors">آلية العمل</Link></li>
            </ul>
          </div>

          <div className="mt-2 text-right">
            <h4 className="text-white font-bold mb-6">الخدمات</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#services" className="hover:text-amber-500 transition-colors">تركيب مطابخ جديدة</Link></li>
              <li><Link href="/#services" className="hover:text-amber-500 transition-colors">صيانة وتجديد</Link></li>
              <li><Link href="/#services" className="hover:text-amber-500 transition-colors">تركيب رخام</Link></li>
              <li><Link href="/#services" className="hover:text-amber-500 transition-colors">تشطيبات واكسسوارات</Link></li>
            </ul>
          </div>

          <div className="mt-2 text-right">
            <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 justify-end group">
                <div className="pt-0.5">
                  <a href="tel:0567659475" className="font-bold text-stone-200 hover:text-amber-500 transition-colors" style={{ direction: 'ltr' }}>
                    056 765 9475
                  </a>
                </div>
                <Phone className="w-4 h-4 text-amber-500 mt-1" />
              </li>
              <li className="flex items-start gap-3 justify-end">
                <div className="pt-0.5 max-w-[200px]">
                  <p className="text-stone-400 leading-relaxed">جدة، المملكة العربية السعودية</p>
                </div>
                <MapPin className="w-4 h-4 text-amber-500 mt-1" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wide text-stone-500">
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} معلم مطابخ</p>
        <p className="flex items-center gap-1">
          تم التصميم والتطوير بواسطة:
          <a
            href="https://nasharhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 transition-colors font-bold mx-1"
          >
            Nasharhub.com
          </a>
        </p>
      </div>
    </footer>
  );
}
