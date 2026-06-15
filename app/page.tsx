'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Wrench, 
  Hammer, 
  Layers, 
  Menu,
  X,
  MessageCircle,
  Gem,
  Clock,
  ShieldCheck,
  Star,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';

export default function MoalemMatabekh() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'تفصيل مطبخ (خشب، المنيوم، مكس)',
    message: ''
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `السلام عليكم ورحمة الله وبركاته،\n\n*الاسم:* ${formData.name}\n*رقم الجوال:* ${formData.phone}\n*الخدمة المطلوبة:* ${formData.service}\n*التفاصيل:* ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/966567659475?text=${encodedText}`, '_blank');
  };

  
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, selectedImage]);

  const heroSlides = [
    {
      title: "تفصيل وتركيب مطابخ حديثة بتشطيب احترافي في جدة",
      description: "معلم مطابخ جدة – دقة التنفيذ، جمال التفاصيل",
      image: "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_1600,q_auto,f_auto/v1781396929/hero-bg1.jpg_s0urew.jpg"
    },
    {
      title: "صيانة وتجديد مطابخ تعيد لمطبخك كفاءته وأناقتـه",
      description: "فني صيانة مطابخ بجدة – استبدال مفصلات وأدراج",
      image: "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_1600,q_auto,f_auto/v1781396928/blog1_w5gduo.jpg"
    },
    {
      title: "تركيب رخام مطابخ صناعي وطبيعي بأعلى دقة",
      description: "أفضل معلم تركيب رخام مطابخ في جميع أحياء جدة",
      image: "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_1600,q_auto,f_auto/v1781396928/blog2_jbgmew.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const services = [
    {
      id: 1,
      title: 'تفصيل وتركيب مطابخ',
      description: 'نقدم حلول متكاملة في تركيب جميع قطاعات المطابخ: الألمنيوم، الخشب، الصاج، والكلادينج (ومكس الخامات)، من التصميم وحتى التنفيذ النهائي.',
      icon: <Hammer className="w-7 h-7" />,
      image: 'https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396928/D8_AA_D8_B1_D9_83_D9_8A_D8_A8-_D9_85_D8_B7_D8_A7_D8_A8_D8_AE.jpg_xi9q5l.jpg'
    },
    {
      id: 2,
      title: 'تجديد وصيانة شاملة',
      description: 'خدمات صيانة شاملة للمطابخ وتجديدها بالكامل لتبدو كأنها جديدة؛ استبدال المفصلات، أدراج السحب، الأبواب، ومسكات الخزائن بحرفية عالية.',
      icon: <Wrench className="w-7 h-7" />,
      image: 'https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396928/D8_B5_D9_8A_D8_A7_D9_86_D8_A9-_D9_85_D8_B7_D8_A7_D8_A8_D8_AE.png_d9o8oc.jpg'
    },
    {
      id: 3,
      title: 'تفصيل رخام مطابخ',
      description: 'نُتقن تركيب جميع أنواع الرخام الصناعي والطبيعي بأسلوب احترافي يضمن المتانة والجمال وسهولة الاستخدام، مع قص وتركيب دقيق ومطابق للمقاسات.',
      icon: <Gem className="w-7 h-7" />,
      image: 'https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396927/D8_AA_D8_B1_D9_83_D9_8A_D8_A8-_D8_B1_D8_AE_D8_A7_D9_85_myoltn.jpg'
    },
    {
      id: 4,
      title: 'إكسسوارات وتشطيبات',
      description: 'تشطيبات مطابخ حديثة تجمع بين الجمال والعملية، نهتم بتركيب الإكسسوارات العصرية والسلال المخفية واللمسات النهائية التي تضفي حيوية وسهولة.',
      icon: <Layers className="w-7 h-7" />,
      image: 'https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396928/blog3_yscypf.jpg'
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "معاينة دقيقة",
      description: "نبدأ بمعاينة شاملة للمكان وأخذ مقاسات دقيقة لضمان استغلال المساحة بأفضل شكل."
    },
    {
      step: "02",
      title: "خامات قوية",
      description: "نستخدم أفضل أنواع الخامات والرخام القوية والعملية التي تناسب الاستخدام اليومي."
    },
    {
      step: "03",
      title: "جودة التنفيذ",
      description: "نلتزم بالتنفيذ في الوقت المحدد مع متابعة دقيقة لضمان تسليم المطبخ دون ملاحظات."
    },
    {
      step: "04",
      title: "تسليم نظيف",
      description: "نحرص على إنهاء الأعمال والنظافة الكاملة لتسليم المكان جاهزاً للاستخدام الفوري."
    }
  ];

  const galleryImages = [
    "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396928/D8_AA_D8_B1_D9_83_D9_8A_D8_A8-_D9_85_D8_B7_D8_A7_D8_A8_D8_AE.jpg_xi9q5l.jpg",
    "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396928/D8_B5_D9_8A_D8_A7_D9_86_D8_A9-_D9_85_D8_B7_D8_A7_D8_A8_D8_AE.png_d9o8oc.jpg",
    "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396927/D8_AA_D8_B1_D9_83_D9_8A_D8_A8-_D8_B1_D8_AE_D8_A7_D9_85_myoltn.jpg",
    "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396928/blog3_yscypf.jpg",
    "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396928/blog1_w5gduo.jpg",
    "https://res.cloudinary.com/dxvjqrb9l/image/upload/w_800,q_auto,f_auto/v1781396928/blog2_jbgmew.jpg",
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-stone-950 text-stone-300 py-2.5 px-6 md:px-12 text-[11px] font-medium tracking-wide flex justify-between items-center border-b border-stone-800">
        <span className="hidden md:inline-flex items-center gap-2">
          <MapPin className="w-3 h-3 text-amber-500" />
          جدة - المملكة العربية السعودية
        </span>
        <div className="flex gap-6 mx-auto md:mx-0 w-full justify-center md:justify-end">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 leading-none text-amber-500" /> ضمان أعمال التنفيذ</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 leading-none text-amber-500" /> التزام تام بالمواعيد</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-0 bg-white/95 backdrop-blur-md shadow-sm py-3' : 'top-[38px] bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <Image 
              src={(scrolled || isMenuOpen) ? "https://res.cloudinary.com/dxvjqrb9l/image/upload/v1781439759/%D9%85%D8%B9%D9%84%D9%85_%D9%85%D8%B7%D8%A7%D8%A8%D8%AE_sda9ba.png" : "https://res.cloudinary.com/dxvjqrb9l/image/upload/v1781442195/%D9%85%D8%B9%D9%84%D9%85_%D9%85%D8%B7%D8%A7%D8%A8%D8%AE_2-removebg-preview_lc4mso.png"}
              alt="معلم مطابخ جدة"
              width={160}
              height={50}
              className={`h-11 w-auto object-contain transition-all duration-300 ${(scrolled || isMenuOpen) ? '' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] line-clamp-1'}`}
              priority
              referrerPolicy="no-referrer"
            />
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            <div className={`flex gap-8 text-sm font-semibold tracking-wide ${scrolled ? 'text-stone-600' : 'text-stone-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'}`}>
              <a href="#hero" className="hover:text-amber-500 transition-colors">الرئيسية</a>
              <a href="#about" className="hover:text-amber-500 transition-colors">عن الشركة</a>
              <a href="#services" className="hover:text-amber-500 transition-colors">الخدمات</a>
              <a href="#gallery" className="hover:text-amber-500 transition-colors">معرض الأعمال</a>
              <a href="#method" className="hover:text-amber-500 transition-colors">آلية العمل</a>
              <a href="#contact" className="hover:text-amber-500 transition-colors">تواصل معنا</a>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className={`flex flex-col items-end mr-4 border-r ${scrolled ? 'border-stone-200 text-stone-800' : 'border-white/20 text-white'} pr-4`}>
              <span className={`text-[10px] tracking-widest uppercase mb-0.5 ${scrolled ? 'text-stone-400' : 'text-stone-300'}`}>اتصل بنا</span>
              <a href="tel:0511560550" className="font-bold tracking-tighter hover:text-amber-500 transition-colors" style={{ direction: 'ltr' }}>0511560550</a>
            </div>
            <a 
              href="#contact"
              className="bg-amber-600 hover:bg-amber-700 text-white px-7 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-amber-600/20 active:scale-95"
            >
              اطلب معاينة
            </a>
          </div>

          <button 
            className={`lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-lg ${(scrolled || isMenuOpen) ? 'text-stone-900 bg-stone-100' : 'text-white bg-white/10 backdrop-blur-md'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center px-8 z-0"
            >
              <div className="flex flex-col gap-6 text-2xl font-black text-stone-900">
                <a href="#hero" onClick={() => setIsMenuOpen(false)}>الرئيسية</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>عن الشركة</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)}>الخدمات</a>
                <a href="#gallery" onClick={() => setIsMenuOpen(false)}>معرض الأعمال</a>
                <a href="#method" onClick={() => setIsMenuOpen(false)}>كيف نعمل</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>اتصل بنا</a>
                
                <div className="h-px bg-stone-100 my-4 w-12"></div>
                
                <a href="tel:0511560550" className="text-xl text-amber-600 font-bold" style={{ direction: 'ltr', textAlign: 'right' }}>051 156 0550</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-stone-950">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-[20%] -bottom-[20%] w-full z-0 origin-center"
            style={{ y: parallaxY }}
          >
            <Image 
              src={heroSlides[currentSlide].image}
              alt="Kitchen Background"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={85}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-stone-950/90 via-stone-950/60 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide + 'content'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-stone-200 text-xs font-bold tracking-wider">{heroSlides[currentSlide].description}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 pb-1">
                  {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 || i === 2 ? "text-amber-500 block md:inline" : ""}>{word} </span>
                  ))}
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-12">
                  <a href="#services" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-2xl shadow-amber-600/30 transition-all text-center">
                    اكتشف خدماتنا
                  </a>
                  <a href="https://wa.me/966567659475" className="bg-white hover:bg-stone-100 text-stone-900 px-8 py-4 rounded-xl text-lg font-bold transition-all border border-stone-200 text-center flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-500" /> تواصل عبر واتساب
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Custom Navigation */}
        <div className="absolute bottom-10 right-6 md:right-12 z-20 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/30 w-4 hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            <div className="lg:w-1/2 relative px-4 md:px-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              >
                <video 
                  src="https://res.cloudinary.com/dxvjqrb9l/video/upload/v1781444712/aboutUS_vtdyyi.mp4" 
                  autoPlay loop muted playsInline 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </motion.div>
              
              {/* Experience Badge */}
              <div className="absolute top-1/2 sm:-right-8 right-0 -translate-y-1/2 bg-white p-6 rounded-3xl shadow-2xl z-10 flex flex-col items-center justify-center border border-stone-100 hidden sm:flex">
                <div className="text-amber-500 mb-2">
                  <Star className="w-10 h-10 fill-current" />
                </div>
                <div className="text-stone-900 font-black text-2xl leading-none">خبرة</div>
                <div className="text-stone-500 font-semibold tracking-widest text-[10px] uppercase mt-1">حقيقية ومثبتة</div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-amber-600 w-12"></div>
                  <span className="text-amber-600 font-bold tracking-widest text-sm uppercase">من نحن</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-8 leading-[1.2]">
                  معلم مطابخ في جدة<br/> 
                  <span className="text-stone-400 font-light">دقة واحترافية</span>
                </h2>
                
                <p className="text-stone-600 text-lg leading-relaxed mb-6 font-medium">
                  نحن في معلم مطابخ نمتلك خبرة حقيقية في تركيب وصيانة المطابخ وتركيب الرخام، ونعتمد على تنفيذ دقيق، خامات مختارة بعناية، وأسلوب عمل يضمن أفضل نتيجة من أول مرة.
                </p>
                
                <div className="bg-stone-50 border-r-4 border-amber-500 p-6 rounded-l-2xl mb-10">
                  <p className="text-stone-700 italic leading-relaxed text-sm">
                    معلم مطابخ لا يقدم خدمة فقط، بل يقدم نتيجة نهائية ترضيك وتعيش معك سنوات. نعمل في جدة ونخدم جميع الأحياء باحترافية كاملة وأسعار مناسبة وجودة مضمونة.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
                  {[
                    "خامات عالية الجودة", 
                    "تشطيب نظيف بدون أخطاء", 
                    "حلول للمساحات الصغيرة", 
                    "خبرة في السوق السعودي"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-stone-800 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-stone-950 text-white relative">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-stone-900/50 clip-diagonal z-0"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-amber-600 w-12"></div>
                <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">ماذا نقدم؟</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">خدماتنا المتكاملة</h2>
              <p className="text-stone-400 text-lg leading-relaxed">
                حلول عملية ومتميزة في عالم المطابخ، نغطي كل احتياجاتك بدءاً من التصميم ومروراً بالتركيب وحتى الصيانة الدورية.
              </p>
            </div>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-white hover:text-amber-500 transition-colors font-bold border-b border-amber-500 pb-1">
              جميع الخدمات <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-colors duration-500 h-full flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden border-b border-stone-800/50">
                  <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    quality={75}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
                </div>
                
                {/* Icon floating */}
                <div className="absolute top-[12.25rem] right-6 w-14 h-14 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform z-10">
                  {service.icon}
                </div>
                
                <div className="p-8 pt-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors text-sm">
                    طلب الخدمة <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-stone-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            
            <div className="lg:w-1/2 relative w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
              >
                <video 
                  src="https://res.cloudinary.com/dxvjqrb9l/video/upload/v1781444696/whyUS_tuvvm6.mp4" 
                  autoPlay loop muted playsInline 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-xl ml-auto text-right"
              >
                <div className="flex items-center gap-4 mb-6 justify-end">
                  <span className="text-amber-600 font-bold tracking-widest text-sm uppercase">لماذا نحن؟</span>
                  <div className="h-px bg-amber-600 w-12"></div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-8 leading-[1.2]">
                  الجودة والدقة<br/> 
                  <span className="text-stone-400 font-light">في كل تفصيلة</span>
                </h2>
                
                <p className="text-stone-600 text-lg leading-relaxed mb-8 font-medium">
                  نحن نؤمن بأن المطبخ هو قلب المنزل، ولهذا نحرص على تقديم أفضل الحلول التي تجمع بين التصميم العصري والجودة التي تدوم طويلاً، مع ضمان التنفيذ المثالي.
                </p>

                <div className="space-y-6">
                  <div className="flex flex-row-reverse items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">دقة في المواعيد</h4>
                      <p className="text-sm text-stone-500">نلتزم بتسليم العمل في الوقت المحدد مسبقاً.</p>
                    </div>
                  </div>

                  <div className="flex flex-row-reverse items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">ضمان الجودة</h4>
                      <p className="text-sm text-stone-500">نقدم أطول فترة ضمان على التركيب والصيانة.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 bg-stone-950 text-white relative flex flex-col items-center">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-stone-900/50 clip-diagonal z-0"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-bold tracking-widest text-sm mb-4 block uppercase leading-none">معرض الأعمال</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">صور من أرض الواقع</h2>
            <p className="text-stone-400 text-lg leading-relaxed">
              شاهد جودة التنفيذ والتشطيب في بعض أعمالنا السابقة في تركيب وصيانة المطابخ والرخام.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedImage(img)}
                className="group relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              >
                <Image
                  src={img}
                  alt={`صورة أعمال ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                  quality={70}
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-amber-600 text-white p-3 rounded-full transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/95 p-4 md:p-12 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-stone-800 hover:bg-stone-700 p-3 rounded-full transition-all z-10 shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(null)}
              aria-label="إغلاق الصورة"
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[3/4] md:aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.replace('w_800', 'w_1600')}
                alt="صورة مكبرة"
                fill
                className="object-contain bg-transparent"
                sizes="100vw"
                quality={90}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Methodology Section */}
      <section id="method" className="py-24 md:py-32 bg-stone-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-amber-600 font-bold tracking-widest text-sm mb-4 block uppercase leading-none">كيف نعمل؟</span>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-6">منهجية العمل الاحترافية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 relative">
            {/* Connecting Line - desktop only */}
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-px border-t-2 border-dashed border-stone-200 z-0"></div>

            {methodology.map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-white rounded-2xl border-2 border-stone-100 flex items-center justify-center text-3xl font-black text-stone-300 mb-8 shadow-sm group-hover:border-amber-500 group-hover:text-amber-500 transition-all duration-300 relative bg-clip-padding">
                  <div className="absolute inset-2 bg-stone-50 rounded-xl flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                    {step.step}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-stone-900 mb-4">{step.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed max-w-[250px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-stone-50 rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-xl flex flex-col lg:flex-row max-w-6xl mx-auto">
            
            {/* Contact Info Side */}
            <div className="bg-stone-950 text-white p-10 md:p-16 lg:w-2/5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 rounded-tl-full"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4 gap-2">تواصل معنا الآن</h2>
                <p className="text-stone-400 mb-12 text-sm leading-relaxed">
                  تواصل مع معلم مطابخ محترف لتركيب وصيانة المطابخ وتنفيذ أعمال الرخام بدقة عالية في جدة. نحن هنا للإجابة على استفساراتك.
                </p>
                
                <div className="space-y-8">
                  <a href="tel:0511560550" className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-stone-500 text-[11px] font-bold uppercase tracking-wider mb-1">الهاتف</p>
                      <p className="text-xl font-bold tracking-tight" style={{ direction: 'ltr' }}>051 156 0550</p>
                    </div>
                  </a>
                  
                  <a href="https://wa.me/966567659475" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-stone-500 text-[11px] font-bold uppercase tracking-wider mb-1">واتساب</p>
                      <p className="text-xl font-bold tracking-tight" style={{ direction: 'ltr' }}>+966 567 659 475</p>
                    </div>
                  </a>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-stone-500 text-[11px] font-bold uppercase tracking-wider mb-1">الموقع</p>
                      <p className="text-lg font-bold leading-tight">جدة، المملكة العربية السعودية</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-10 md:p-16 lg:w-3/5 bg-white">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-stone-900 mb-2">طلب استشارة أو تسعير</h3>
                <p className="text-stone-500 text-sm">املأ النموذج وسنقوم بالتواصل معك في أقرب وقت لإرسال فني لمعاينة الموقع.</p>
              </div>

              <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-stone-900 font-bold text-sm">الاسم</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-stone-50/50 border border-stone-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-stone-900" 
                      placeholder="الاسم الكريم" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-stone-900 font-bold text-sm">رقم الجوال</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-stone-50/50 border border-stone-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-stone-900" 
                      placeholder="05xxxxxxxx" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-stone-900 font-bold text-sm">الخدمة المطلوبة</label>
                  <div className="relative">
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-stone-50/50 border border-stone-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-stone-900 appearance-none font-medium"
                    >
                      <option value="تفصيل مطبخ (خشب، المنيوم، مكس)">تفصيل مطبخ (خشب، المنيوم، مكس)</option>
                      <option value="تركيب مطبخ جديد أو جاهز">تركيب مطبخ جديد أو جاهز</option>
                      <option value="صيانة وتجديد مطبخ قائم">صيانة وتجديد مطبخ قائم</option>
                      <option value="تفصيل وتركيب رخام">تفصيل وتركيب رخام</option>
                      <option value="تشطيبات عامة (ابواب، مفصلات)">تشطيبات عامة (ابواب، مفصلات)</option>
                    </select>
                    <ArrowLeft className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 rotate-[-90deg] pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-stone-900 font-bold text-sm">التفاصيل</label>
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-stone-50/50 border border-stone-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-stone-900 resize-none" 
                    placeholder="حدثنا عن احتياجك أو متطلباتك..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-stone-900 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors duration-300 flex justify-center items-center gap-2"
                >
                  إرسال الطلب
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-12 bg-stone-100 border-t border-stone-200 text-stone-600">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-4 text-stone-800">أفضل معلم مطابخ بجدة لتفصيل وتركيب وصيانة جميع أنواع المطابخ</h2>
            <p className="text-sm leading-relaxed mb-4">
              نحن نقدم خدمات <a href="#services" className="font-semibold text-amber-600 hover:underline">تفصيل وتركيب مطابخ بجدة</a> بأعلى معايير الجودة. نتميز بالجمع والمزج بين أجود الخامات العصرية: <strong>مطابخ الألمنيوم، ومطابخ الصاج، ومطابخ الخشب، والكلادينج، والفرميكا</strong>. سواء كنت تبحث عن <strong>فني مطابخ بجدة</strong> لتصميم مطبخ أحلامك، أو <strong>معلم صيانة وتجديد مطابخ</strong> وتفصيل أسطح الرخام (الصناعي والطبيعي)، فنحن نوفر لك أفضل الكفاءات بأرخص الأسعار في جميع أحياء جدة (الحمدانية، أبحر، الصفا، المروة).
            </p>
            <p className="text-sm leading-relaxed flex flex-wrap justify-center gap-2 text-stone-500">
              <span>#معلم_مطابخ_جدة</span>
              <span>#مطابخ_المنيوم_وصاج</span>
              <span>#تفصيل_مطابخ_خشب</span>
              <span>#تركيب_وصيانة_مطابخ</span>
              <span>#تجديد_المطابخ_القديمة</span>
              <span>#رخام_مطابخ_صناعي</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-300 pt-20 pb-8 border-t border-stone-900">
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
                <a href="https://wa.me/966567659475" className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all text-stone-400">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="mt-2 text-right">
              <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#hero" className="hover:text-amber-500 transition-colors">الرئيسية</a></li>
                <li><a href="#about" className="hover:text-amber-500 transition-colors">عن الشركة</a></li>
                <li><a href="#services" className="hover:text-amber-500 transition-colors">الخدمات</a></li>
                <li><a href="#method" className="hover:text-amber-500 transition-colors">آلية العمل</a></li>
              </ul>
            </div>
            
            <div className="mt-2 text-right">
              <h4 className="text-white font-bold mb-6">الخدمات</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#services" className="hover:text-amber-500 transition-colors">تركيب مطابخ جديدة</a></li>
                <li><a href="#services" className="hover:text-amber-500 transition-colors">صيانة وتجديد</a></li>
                <li><a href="#services" className="hover:text-amber-500 transition-colors">تركيب رخام</a></li>
                <li><a href="#services" className="hover:text-amber-500 transition-colors">تشطيبات واكسسوارات</a></li>
              </ul>
            </div>
            
            <div className="mt-2 text-right">
              <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 justify-end group">
                  <div className="pt-0.5">
                    <p className="font-bold text-stone-200" style={{ direction: 'ltr' }}>0511560550</p>
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
            <a href="https://nasharhub.com" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 transition-colors font-bold mx-1">
              Nasharhub.com
            </a>
          </p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col gap-3">
        {/* Phone Floating Action Button */}
        <motion.a
          href="tel:0567659475"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-amber-500 text-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center hover:bg-amber-600 transition-colors"
          aria-label="اتصل بنا"
        >
          <Phone className="w-7 h-7" />
        </motion.a>

        {/* WhatsApp Floating Action Button */}
        <motion.a
          href="https://wa.me/966567659475"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#25D366] text-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center hover:bg-[#20bd5a] transition-colors"
          aria-label="تواصل معنا عبر واتساب"
        >
          <MessageCircle className="w-7 h-7" />
        </motion.a>
      </div>
    </div>
  );
}
