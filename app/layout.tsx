import type {Metadata, Viewport} from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#d97706',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'معلم مطابخ جدة | تفصيل، تركيب، وصيانة مطابخ ورخام بأفضل الأسعار',
    template: '%s | معلم مطابخ جدة'
  },
  description: 'أفضل معلم مطابخ بجدة متخصص في تصميم، تفصيل، تركيب، وصيانة المطابخ ومزج الخامات العصرية (خشب، ألمنيوم، صاج، كلادينج). تغيير أبواب الخزائن وتفصيل رخام المطابخ بدقة عالية. اتصل 0567659475.',
  keywords: ['معلم مطابخ', 'معلم مطابخ جدة', 'تفصيل مطابخ', 'تركيب مطابخ جدة', 'مطابخ خشب', 'مطابخ صاج', 'مطابخ المنيوم بجدة', 'مطابخ فرميكا', 'كلادينج مطابخ', 'مكس وتصميم مطابخ', 'صيانة مطابخ بجدة', 'تجديد مطابخ قديمة', 'فني تركيب مطابخ', 'تركيب رخام مطابخ'],
  authors: [{ name: 'معلم مطابخ جدة', url: 'https://moalemmatabekh.com' }],
  creator: 'معلم مطابخ جدة',
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://moalemmatabekh.com',
    siteName: 'معلم مطابخ جدة',
    title: 'معلم مطابخ جدة | الأفضل في تفصيل وتركيب وصيانة المطابخ',
    description: 'الأفضل في تصميم، تفصيل، تركيب، وصيانة المطابخ وتركيب الرخام الصناعي والطبيعي في جدة وكافة أحيائها (الحمدانية، أبحر، الصفا، المروة). استشارة مجانية وسرعة في الإنجاز.',
    images: [
      {
        url: 'https://res.cloudinary.com/dxvjqrb9l/image/upload/v1781439759/%D9%85%D8%B9%D9%84%D9%85_%D9%85%D8%B7%D8%A7%D8%A8%D8%AE_sda9ba.png',
        width: 800,
        height: 600,
        alt: 'معلم مطابخ جدة لخدمات تفصيل وتركيب المطابخ والرخام',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'معلم مطابخ جدة | تفصيل وتركيب وصيانة مطابخ ورخام',
    description: 'تفصيل، تركيب وصيانة مطابخ وتركيب رخام مطابخ بأعلى جودة بجدة.',
    images: ['https://res.cloudinary.com/dxvjqrb9l/image/upload/v1781439759/%D9%85%D8%B9%D9%84%D9%85_%D9%85%D8%B7%D8%A7%D8%A8%D8%AE_sda9ba.png'],
  },
  alternates: {
    canonical: 'https://moalemmatabekh.com',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "معلم مطابخ جدة",
  "image": "https://res.cloudinary.com/dxvjqrb9l/image/upload/v1781439759/%D9%85%D8%B9%D9%84%D9%85_%D9%85%D8%B7%D8%A7%D8%A8%D8%AE_sda9ba.png",
  "@id": "https://moalemmatabekh.com/#company",
  "url": "https://moalemmatabekh.com",
  "telephone": "+966567659475",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "جدة",
    "addressRegion": "مكة المكرمة",
    "addressCountry": "SA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.5433,
    "longitude": 39.1980
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "جدة"
    },
    {
      "@type": "City",
      "name": "مكة المكرمة"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "125"
  },
  "sameAs": [
    "https://wa.me/966567659475"
  ],
  "description": "أفضل معلم ومقاول لتركيب وتفصيل وصيانة المطابخ ورخام المطابخ في مدينة جدة والمناطق المجاورة."
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-cairo antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
