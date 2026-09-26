import type {Metadata, Viewport} from 'next';
import { Cairo } from 'next/font/google';
import Script from 'next/script';
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
  metadataBase: new URL('https://www.matabekhjeddah.com'),
  title: {
    default: 'معلم مطابخ جدة | تفصيل، تركيب، وصيانة مطابخ ورخام بأفضل الأسعار',
    template: '%s | معلم مطابخ جدة'
  },
  description: 'أفضل معلم مطابخ بجدة متخصص في تصميم، تفصيل، تركيب، وصيانة المطابخ ومزج الخامات العصرية (خشب، ألمنيوم، صاج، كلادينج). تغيير أبواب الخزائن وتفصيل رخام المطابخ بدقة عالية. اتصل 0567659475.',
  keywords: ['معلم مطابخ', 'معلم مطابخ جدة', 'تفصيل مطابخ', 'تركيب مطابخ جدة', 'مطابخ خشب', 'مطابخ صاج', 'مطابخ المنيوم بجدة', 'مطابخ فرميكا', 'كلادينج مطابخ', 'مكس وتصميم مطابخ', 'صيانة مطابخ بجدة', 'تجديد مطابخ قديمة', 'فني تركيب مطابخ', 'تركيب رخام مطابخ'],
  authors: [{ name: 'معلم مطابخ جدة', url: 'https://www.matabekhjeddah.com' }],
  creator: 'معلم مطابخ جدة',
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://www.matabekhjeddah.com',
    siteName: 'معلم مطابخ جدة',
    title: 'معلم مطابخ جدة | الأفضل في تفصيل وتركيب وصيانة المطابخ',
    description: 'الأفضل في تصميم، تفصيل، تركيب، وصيانة المطابخ وتركيب الرخام الصناعي والطبيعي في جدة وكافة أحيائها (الحمدانية، أبحر، الصفا، المروة). استشارة مجانية وسرعة في الإنجاز.',
    images: [
      {
        url: 'https://www.matabekhjeddah.com/moalem-matabekh-logo.svg',
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
    images: ['https://www.matabekhjeddah.com/moalem-matabekh-logo.svg'],
  },
  alternates: {
    canonical: 'https://www.matabekhjeddah.com/',
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
  verification: {
    google: 'qj1L2mp26x3dDJ1N-8BX_BWar9cx3eIoQLlWFMs6FQY',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "معلم مطابخ جدة",
  "image": "https://www.matabekhjeddah.com/moalem-matabekh-logo.svg",
  "@id": "https://www.matabekhjeddah.com/#company",
  "url": "https://www.matabekhjeddah.com",
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZB1J2KBEQ7" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZB1J2KBEQ7');
        `}</Script>
      </body>
    </html>
  );
}
