import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Check, 
  Instagram, 
  Mail, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Smile, 
  Flower2, 
  Shirt, 
  CreditCard,
  Eye, 
  Download, 
  ZoomIn, 
  X
} from 'lucide-react';
import { Product } from '../types';
import { PrintsNTwinsLogo } from './PrintsNTwinsLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getGeneralWhatsAppUrl } from '../config/whatsapp';

interface MenuPageProps {
  products: Product[];
  onOpenCustomizer: (product: Product) => void;
  onBackToShop: () => void;
  onNavigateToContact: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  products,
  onOpenCustomizer,
  onBackToShop,
  onNavigateToContact,
}) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'flyer'>('interactive');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Helper to find specific menu items from products
  const billBooks = products.find(p => p.id === 'pnt-bill-books') || products[0];
  const photoCards = products.find(p => p.id === 'pnt-photo-cards') || products[1];
  const stickers = products.find(p => p.id === 'pnt-custom-stickers') || products[2];
  const pipeCrafts = products.find(p => p.id === 'pnt-pipe-cleaner-crafts') || products[3];
  const tshirts = products.find(p => p.id === 'pnt-tshirt-printing') || products[4];
  const visitingCards = products.find(p => p.id === 'pnt-visiting-cards') || products[5];

  const whyChooseUsPoints = [
    'Handmade with love',
    'Unique & aesthetic designs',
    'Perfect for gifting',
    'Personalized options available',
    'High quality materials',
    'Affordable prices',
    'Support a small business',
  ];

  const menuItems = [
    {
      product: billBooks,
      title: 'Bill Books',
      subtitle: 'Professional & Customizable',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      badge: `From ₹${billBooks.price} (A4 1/2: Rs. 350 • A4: Rs. 400)`,
      scriptTag: 'Custom Carbonless NCR ♡',
      highlights: [
        'A4 1/2 size paper: Rs. 350 per book',
        'A4 sheet size paper: Rs. 400 per book',
        'Different sizes available (A5, A4, 1/4 size)',
        'Single / Duplicate / Triplicate carbonless sheets',
        'Custom design & company logo integration',
        'High quality paper with firm cardboard backing',
        'Perfect for shops, boutiques, cafés & freelancers',
      ],
      buttonText: 'Customize & Order Bill Books',
    },
    {
      product: photoCards,
      title: 'Photo Cards',
      subtitle: 'Turn Your Memories into Beautiful Cards',
      icon: <ImageIcon className="w-5 h-5" />,
      badge: `₹${photoCards.price} (Rs. 60)`,
      scriptTag: 'Good Memories Last Forever ♡',
      highlights: [
        'Photo cards cost: Rs. 60',
        'Personal photos, portraits & polaroid style prints',
        'Travel memories & milestone celebrations',
        'Special occasions, anniversaries & birthdays',
        'Custom border designs, layouts & sizes',
        'Perfect for keepsakes, decor & personalized gifting',
      ],
      buttonText: 'Customize & Order Photo Cards',
    },
    {
      product: stickers,
      title: 'Customized Stickers',
      subtitle: 'Customized Sticker in PVC Sheet',
      icon: <Smile className="w-5 h-5" />,
      badge: `₹${stickers.price} / sheet`,
      scriptTag: 'Stickers Make Everything Brighter ♡',
      highlights: [
        'Customized Sticker in PVC sheet: Rs. 100 per sheet',
        'Name, quote & custom typography stickers',
        'Brand, studio & business logo die-cuts',
        'Cute character, anime & aesthetic art decals',
        '100% Waterproof, scratch-resistant & durable PVC vinyl',
      ],
      buttonText: 'Customize & Order Stickers',
    },
    {
      product: pipeCrafts,
      title: 'Pipe Cleaner Crafts',
      subtitle: 'Cute • Colorful • Handmade',
      icon: <Flower2 className="w-5 h-5" />,
      badge: `From ₹${pipeCrafts.price}`,
      scriptTag: 'Tiny Crafts Big Smiles ♡',
      highlights: [
        'Everlasting flowers (Tulips, Sunflowers, Daisies)',
        'Adorable animal figurines (Bunnies, Kittens)',
        'Hand-sculpted keychains & bag charm accessories',
        'Aesthetic desk, bedside & room decor pieces',
        'Custom artisan bouquet & gift arrangements',
      ],
      buttonText: 'Customize & Order Pipe Crafts',
    },
    {
      product: tshirts,
      title: 'Tshirts Printing',
      subtitle: 'Wear Your Ideas • Express Your Style',
      icon: <Shirt className="w-5 h-5" />,
      badge: `₹${tshirts.price} (Rs. 200)`,
      scriptTag: 'Good Things Take Time ♡',
      highlights: [
        'Tshirts printing cost: Rs. 200',
        'Custom bespoke graphic designs & typography',
        'High-resolution photos, quotes & company logos',
        'All unisex sizes available (XS, S, M, L, XL, XXL)',
        'Premium ultra-soft cotton & non-fading print',
        'Perfect for couples, twin besties & group events',
      ],
      buttonText: 'Customize & Order T-Shirt',
    },
    {
      product: visitingCards,
      title: 'Visiting Cards',
      subtitle: 'Visiting Cards Cost for 30 Cards Rs. 200',
      icon: <CreditCard className="w-5 h-5" />,
      badge: `₹${visitingCards.price} for 30 cards`,
      scriptTag: 'A Small Card A Big Opportunity ♡',
      highlights: [
        'Visiting cards cost for 30 cards: Rs. 200',
        'Executive business & independent creator cards',
        'Personal networking & portfolio mini cards',
        'Multiple designs with matte or gloss finishes',
        'Premium 400gsm luxury heavy cardstock',
        'Custom branding, QR code & gold foil accents',
      ],
      buttonText: 'Customize & Order Visiting Cards',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6EE] text-[#2E3A2F] pb-20">
      
      {/* Top Floating Glass Action Bar */}
      <div className="sticky top-24 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="glass-dock floating-window rounded-2xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border border-white/85 shadow-md">
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-[#C96F4F] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gift Catalog</span>
          </button>

          {/* Mode Switcher Pills */}
          <div className="inline-flex items-center p-1 bg-white/70 backdrop-blur-xs rounded-full border border-[#D9C9B2]/60 shadow-xs">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'interactive'
                  ? 'bg-[#2E3A2F] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D9C9B2]" />
              <span>Interactive Menu</span>
            </button>

            <button
              onClick={() => setViewMode('flyer')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'flyer'
                  ? 'bg-[#2E3A2F] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Original Flyer Card</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLightboxOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-white/80 text-stone-700 border border-[#D9C9B2] text-xs font-semibold hover:border-[#C96F4F] hover:text-[#C96F4F] transition flex items-center gap-1.5 shadow-2xs"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Full Flyer View</span>
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-4 py-1.5 rounded-full bg-[#C96F4F]/15 text-[#C96F4F] border border-[#D9C9B2] text-xs font-semibold hover:bg-[#C96F4F]/25 transition"
            >
              Contact Concierge
            </button>
          </div>
        </div>
      </div>

      {/* Brochure Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Editorial Subheader */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-dock border border-white/80 text-[#C96F4F] text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C96F4F]" />
            <span>Handmade With Love • Official Menu</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2E3A2F] tracking-tight">
            The printsntwins <span className="italic font-normal text-[#C96F4F]">Menu</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {viewMode === 'interactive' 
              ? 'Every item below is lovingly designed, personalized, and handcrafted in our small business boutique studio. Click any offering to customize yours live.'
              : 'The official printed 3-panel menu brochure for printsntwins studio. View all offerings, values, and gift collections.'
            }
          </p>
        </div>

        {/* View Mode: Original Flyer Presentation */}
        {viewMode === 'flyer' ? (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="glass-panel floating-window rounded-3xl p-4 sm:p-6 shadow-xl border border-white/80 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Official printsntwins 3-Panel Brochure</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/menu-flyer.jpg"
                    download="printsntwins-menu-flyer.jpg"
                    className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-stone-800 text-xs font-medium transition flex items-center gap-1.5 border border-[#D9C9B2]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Flyer</span>
                  </a>
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="px-3 py-1.5 rounded-full bg-[#C96F4F] text-white text-xs font-medium transition hover:bg-[#B35D3F] flex items-center gap-1.5 shadow-xs"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom Fullscreen</span>
                  </button>
                </div>
              </div>

              <div 
                className="cursor-pointer group relative rounded-2xl overflow-hidden bg-stone-900/5 border border-stone-200 shadow-inner"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src="/menu-flyer.jpg"
                  alt="printsntwins official menu brochure"
                  className="w-full h-auto object-contain transition duration-300 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-sm">
                  <ZoomIn className="w-5 h-5" />
                  <span>Click to view full screen</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
                <p className="text-xs text-stone-500">
                  Want to customize any of these items? Switch to <strong>Interactive Menu</strong> to personalize live.
                </p>
                <button
                  onClick={() => setViewMode('interactive')}
                  className="px-5 py-2 rounded-full bg-[#C96F4F] text-white text-xs font-semibold hover:bg-[#B35D3F] transition inline-flex items-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Switch to Interactive Customizer</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
        /* Unified Single-Format Interactive Menu */
        <div className="space-y-12">
          
          {/* ======================================================== */}
          {/* TOP STUDIO BRAND BANNER (Floating Glass Dark Window)      */}
          {/* ======================================================== */}
          <div className="glass-dark floating-window text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 relative overflow-hidden">
            {/* Ambient Warm Glow */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#D9C9B2]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#C96F4F]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <PrintsNTwinsLogo size="lg" variant="emblem" />
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#D9C9B2] font-semibold">
                    <span>CREATE • CUSTOMIZE • CELEBRATE</span>
                    <span className="text-stone-400">•</span>
                    <span>GIFT • SMILE • REPEAT ♡</span>
                  </div>
                  <h2 className="font-script text-3xl sm:text-4xl text-[#D9C9B2] leading-snug">
                    Little Creations, <span className="text-white">Big Happiness ♡</span>
                  </h2>
                  <p className="text-xs text-stone-300 max-w-xl">
                    Personalized, creative, unique, and handmade with love in our boutique studio. Every offering below is crafted to order.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#D9C9B2]" />
                  <span>View Original Flyer</span>
                </button>
                <button
                  onClick={onNavigateToContact}
                  className="px-5 py-2.5 rounded-full bg-[#C96F4F] hover:bg-[#B35D3F] text-white text-xs font-semibold shadow-sm transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Custom Studio Order</span>
                </button>
              </div>
            </div>

            {/* 4 Pillars Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10">
              {[
                { title: 'CUSTOM', desc: 'Made to Order', color: 'bg-white/5 border-white/10 text-stone-200' },
                { title: 'GIFTS', desc: 'Every Occasion', color: 'bg-[#C96F4F]/30 border-[#C96F4F]/50 text-[#D9C9B2]' },
                { title: 'PRINTS', desc: 'Premium Quality', color: 'bg-white/5 border-white/10 text-stone-200' },
                { title: 'HAPPINESS', desc: 'Guaranteed Smiles', color: 'bg-[#6B7F5B]/25 border-[#6B7F5B]/40 text-[#D9C9B2]' }
              ].map((pill, idx) => (
                <div key={idx} className={`${pill.color} p-2.5 rounded-2xl border text-center`}>
                  <span className="block text-xs font-bold tracking-wider">{pill.title}</span>
                  <span className="block text-[10px] text-stone-300 font-script">{pill.desc}</span>
                </div>
              ))}
            </div>
          </div>


          {/* ======================================================== */}
          {/* SECTION HEADER: UNIFIED 6 OFFERINGS                      */}
          {/* ======================================================== */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C96F4F] fill-[#C96F4F]" />
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-[0.15em] text-[#C96F4F] uppercase">
                STUDIO MENU OFFERINGS
              </span>
              <Heart className="w-4 h-4 text-[#C96F4F] fill-[#C96F4F]" />
            </div>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              Thoughtful Gifts For Every Moment ♡ • Choose an offering below to customize live
            </p>
          </div>


          {/* ======================================================== */}
          {/* SINGLE FORMAT MENU GRID (3 Equal Columns x 2 Equal Rows) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {menuItems.map((item, idx) => (
              <div 
                key={idx}
                className="glass-panel glass-panel-hover floating-window rounded-3xl p-5 sm:p-6 border border-white/85 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Card Top & Information */}
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#6B7F5B]/15 text-[#6B7F5B] flex items-center justify-center shrink-0 shadow-2xs border border-[#6B7F5B]/20 group-hover:bg-[#2E3A2F] group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#C96F4F] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-stone-500 font-medium">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#C96F4F] bg-[#C96F4F]/15 px-2.5 py-1 rounded-full shrink-0 border border-[#C96F4F]/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 relative shadow-inner">
                    <img
                      src={item.product.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2.5 right-2.5 glass-dark px-2.5 py-0.5 rounded-full text-[11px] text-[#D9C9B2] font-script shadow-xs border border-white/20">
                      {item.scriptTag}
                    </div>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                      Key Highlights
                    </span>
                    <ul className="text-xs text-stone-600 space-y-1.5">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#6B7F5B] mt-1.5 shrink-0" />
                          <span className="leading-snug">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-5 mt-5 border-t border-stone-200/60">
                  <button
                    onClick={() => onOpenCustomizer(item.product)}
                    className="w-full py-3 bg-white/80 hover:bg-[#C96F4F] text-[#2E3A2F] hover:text-white border border-[#D9C9B2] hover:border-[#C96F4F] rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs group-hover:shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-[#C96F4F] group-hover:text-white transition-colors" />
                    <span>{item.buttonText}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>


          {/* ======================================================== */}
          {/* BOTTOM SECTION: WHY CHOOSE US & LET'S CONNECT (BALANCED) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4">
            
            {/* Left Card: Why Choose Us? (Floating Glass Window) */}
            <div className="glass-panel floating-window rounded-3xl p-6 sm:p-8 border border-white/85 flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D9C9B2]/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#C96F4F] fill-[#C96F4F]" />
                    <h4 className="font-serif font-bold text-stone-900 text-base uppercase tracking-wider">
                      WHY CHOOSE US?
                    </h4>
                  </div>
                  <span className="font-script text-base text-[#C96F4F]">
                    Small Business Big Dreams ♡
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                  {whyChooseUsPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#6B7F5B] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 glass-dock rounded-2xl border border-white/80 flex items-center gap-3 shadow-2xs">
                <Heart className="w-5 h-5 text-[#C96F4F] fill-[#C96F4F] shrink-0" />
                <p className="text-xs text-stone-600">
                  <strong className="text-stone-900">Good Things Take Time ♡</strong> Every single order is inspected by hand for flawless finish and packed with warmth.
                </p>
              </div>
            </div>

            {/* Right Card: Let's Connect (Floating Glass Window) */}
            <div className="glass-panel floating-window rounded-3xl p-6 sm:p-8 border border-white/85 flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    LET'S CONNECT
                  </span>
                  <span className="font-script text-base text-[#C96F4F]">
                    Follow us for updates ♡
                  </span>
                </div>

                <p className="text-xs text-stone-600">
                  Have a custom question, bulk requirement, or unique design idea? Connect with our studio creators directly through WhatsApp, Instagram, or Email.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a 
                    href={getGeneralWhatsAppUrl()} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Chat with us on WhatsApp"
                    className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition flex items-center gap-2 shadow-xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>WhatsApp Direct</span>
                  </a>

                  <a 
                    href="https://ig.me/j/PYfF2Ii4pv1ZS2pu/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Join our printsntwins Club on Instagram"
                    className="px-4 py-2.5 rounded-full bg-[#F8F6EE] hover:bg-[#C96F4F] hover:text-white text-stone-800 border border-[#D9C9B2] text-xs font-semibold transition flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>@printsntwins</span>
                  </a>

                  <a 
                    href="mailto:printsntwins@gmail.com" 
                    className="px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Studio</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                <span className="font-semibold text-stone-800">printsntwins Studio</span>
                <span className="font-script text-sm text-[#C96F4F]">
                  Made with Love ♡
                </span>
              </div>
            </div>

          </div>

        </div>
        )}

      </div>

      {/* Full-Screen Flyer Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-stone-900 text-white border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D9C9B2]" />
                <span className="font-serif font-semibold text-sm tracking-wide">
                  printsntwins • Official 3-Panel Menu Flyer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/menu-flyer.jpg"
                  download="printsntwins-menu-flyer.jpg"
                  className="px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Container */}
            <div className="p-2 sm:p-4 bg-stone-950 flex items-center justify-center max-h-[80vh] overflow-auto">
              <img
                src="/menu-flyer.jpg"
                alt="printsntwins menu brochure high resolution"
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl mx-auto"
              />
            </div>

            {/* Lightbox Footer Bar */}
            <div className="px-5 py-3 bg-stone-900 text-stone-300 text-xs flex flex-wrap items-center justify-between gap-3 border-t border-stone-800">
              <span className="font-script text-sm text-[#D9C9B2]">
                “Creative Gifts for Every Occasion • Little Creations, Big Happiness ♡”
              </span>
              <button
                onClick={() => {
                  setLightboxOpen(false);
                  setViewMode('interactive');
                }}
                className="px-4 py-1.5 rounded-full bg-[#C96F4F] text-white text-xs font-semibold hover:bg-[#B35D3F] transition"
              >
                Customize Products Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
