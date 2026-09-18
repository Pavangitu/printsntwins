import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Star, 
  BookOpen, 
  Gift, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Smile, 
  Flower2, 
  Shirt, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Award,
  ChevronRight
} from 'lucide-react';
import { PrintsNTwinsLogo } from './PrintsNTwinsLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getGeneralWhatsAppUrl, WHATSAPP_DISPLAY_PHONE } from '../config/whatsapp';
import { ProductCategory } from '../types';

interface EntrancePageProps {
  onEnterShop: () => void;
  onSelectCategoryAndEnter: (cat: ProductCategory) => void;
  onNavigateToMenu: () => void;
  onNavigateToContact: () => void;
}

export const EntrancePage: React.FC<EntrancePageProps> = ({
  onEnterShop,
  onSelectCategoryAndEnter,
  onNavigateToMenu,
  onNavigateToContact,
}) => {
  const signatureOfferings: { id: ProductCategory; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'bill-books', label: 'Bill Books', icon: <FileSpreadsheet className="w-4 h-4" />, desc: 'Custom Carbonless NCR' },
    { id: 'photo-cards', label: 'Photo Cards', icon: <ImageIcon className="w-4 h-4" />, desc: 'Polaroid & Keepsake Memories' },
    { id: 'customized-stickers', label: 'Customized Stickers', icon: <Smile className="w-4 h-4" />, desc: 'Waterproof Die-Cut Vinyl' },
    { id: 'pipe-cleaner-crafts', label: 'Pipe Cleaner Crafts', icon: <Flower2 className="w-4 h-4" />, desc: 'Everlasting Handmade Blooms' },
    { id: 'tshirts-printing', label: 'Tshirts Printing', icon: <Shirt className="w-4 h-4" />, desc: 'Bespoke Aesthetic Apparel' },
    { id: 'visiting-cards', label: 'Visiting Cards', icon: <CreditCard className="w-4 h-4" />, desc: 'Luxury Heavy Cardstock' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F8F6EE] text-[#2E3A2F] flex flex-col justify-between selection:bg-[#D9C9B2]">
      
      {/* ========================================================================= */}
      {/* MULTI-LAYERED BEAUTIFUL ANIMATED BACKGROUND CANVAS                        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Warm Golden / Linen Aurora Blob (Top Left) */}
        <div className="absolute -top-[12%] -left-[8%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-[#D9C9B2]/45 blur-[140px] animate-slow-drift-1" />
        
        {/* Terracotta Radiant Glow (Center-Right) */}
        <div className="absolute top-[22%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-[#C96F4F]/22 blur-[150px] animate-slow-drift-2" />
        
        {/* Olive Sage Organic Atmosphere (Bottom Left) */}
        <div className="absolute -bottom-[15%] left-[5%] w-[48vw] h-[48vw] max-w-[650px] max-h-[650px] rounded-full bg-[#6B7F5B]/20 blur-[130px] animate-slow-drift-1" />

        {/* Deep Forest Foundation Accent (Bottom Right) */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] rounded-full bg-[#2E3A2F]/12 blur-[130px]" />

        {/* Subtle Radial Sunburst Beam */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] bg-radial from-white/70 via-transparent to-transparent opacity-80" />

        {/* Floating Craft Motifs & Sparkles in the Air */}
        <span className="absolute top-[14%] left-[12%] text-2xl text-[#C96F4F]/35 select-none animate-soft-float">♡</span>
        <span className="absolute top-[24%] right-[16%] text-xl text-[#6B7F5B]/40 select-none animate-float-reverse">✧</span>
        <span className="absolute top-[68%] left-[8%] text-lg text-[#D9C9B2]/60 select-none animate-soft-float">✦</span>
        <span className="absolute top-[75%] right-[14%] text-2xl text-[#C96F4F]/35 select-none animate-float-reverse">♡</span>
        <span className="absolute bottom-[20%] left-[24%] text-xl text-[#6B7F5B]/35 select-none animate-soft-float">✧</span>
        <span className="absolute top-[40%] left-[5%] text-xs text-[#C96F4F]/40 select-none animate-float-reverse">🌸</span>
        <span className="absolute top-[48%] right-[6%] text-xs text-[#6B7F5B]/40 select-none animate-soft-float">✨</span>
      </div>

      {/* ========================================================================= */}
      {/* TOP FLOATING APERÇU BAR (Self-contained for Entrance Portal)              */}
      {/* ========================================================================= */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 flex items-center justify-between animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dock border border-white/80 text-xs font-semibold text-stone-700 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C96F4F]" />
          <span>PrintsNTwins Studio Gateway</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onNavigateToMenu}
            className="px-3.5 py-1.5 rounded-full glass-pill border border-white/80 hover:bg-white text-xs font-medium text-stone-700 hover:text-[#C96F4F] transition flex items-center gap-1.5 shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C96F4F]" />
            <span className="hidden sm:inline">Menu Brochure</span>
          </button>

          <button
            onClick={onNavigateToContact}
            className="px-3.5 py-1.5 rounded-full glass-pill border border-white/80 hover:bg-white text-xs font-medium text-stone-700 hover:text-stone-900 transition shadow-2xs"
          >
            Contact
          </button>

          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-[#E8F8EE]/90 border border-[#A7F3D0] hover:bg-[#25D366] hover:text-white text-[#128C7E] text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO ENTRANCE STAGE WITH FLOATING WINDOWS                                 */}
      {/* ========================================================================= */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center justify-center my-auto">
        
        {/* Main Grid: Orbiting Floating Windows + Centerpiece */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* ------------------------------------------------------------- */}
          {/* LEFT ORBITING FLOATING WINDOWS (Desktop)                      */}
          {/* ------------------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
            
            {/* Window 1: Pipe Cleaner Crafts */}
            <div 
              onClick={() => onSelectCategoryAndEnter('pipe-cleaner-crafts')}
              className="glass-panel glass-panel-hover floating-window rounded-3xl p-4.5 border border-white/90 shadow-lg cursor-pointer group animate-soft-float"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-2xl bg-[#C96F4F]/15 text-[#C96F4F] flex items-center justify-center border border-[#D9C9B2]/60">
                  <Flower2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#C96F4F] block">
                    Handmade Blooms
                  </span>
                  <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#C96F4F] transition-colors">
                    Pipe Cleaner Crafts
                  </h4>
                </div>
              </div>

              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 relative shadow-inner">
                <img
                  src="/products/pipe-cleaner-crafts.jpg"
                  alt="Pipe cleaner flowers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 glass-dark text-white text-[10px] px-2 py-0.5 rounded-full font-script border border-white/20">
                  Everlasting Flowers ♡
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 text-xs">
                <span className="text-[11px] text-stone-500 font-medium">From ₹150</span>
                <span className="text-[#C96F4F] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Window 2: Customer Love Rating */}
            <div className="glass-panel floating-window rounded-3xl p-5 border border-white/90 shadow-md animate-float-reverse">
              <div className="flex items-center gap-1.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C96F4F] text-[#C96F4F]" />
                ))}
                <span className="text-xs font-bold text-stone-800 ml-1">4.97 ★</span>
              </div>
              <h5 className="font-serif font-bold text-xs text-stone-900 leading-snug">
                “Loved by twins, besties &amp; families”
              </h5>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                Over 3,500+ personalized keepsakes hand-inspected with tears of joy guarantee.
              </p>
            </div>

          </div>


          {/* ------------------------------------------------------------- */}
          {/* CENTER GRAND FLOATING WINDOW (The Welcoming Portal)          */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 w-full flex justify-center">
            
            <div className="glass-panel floating-window rounded-[2.5rem] p-7 sm:p-10 lg:p-12 border border-white/95 shadow-2xl relative overflow-hidden backdrop-blur-2xl text-center w-full max-w-lg lg:max-w-none">
              
              {/* Inner ambient glow behind the logo */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#C96F4F]/20 rounded-full blur-3xl pointer-events-none animate-gentle-pulse" />
              <div className="absolute -bottom-10 right-0 w-44 h-44 bg-[#6B7F5B]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">

                {/* Studio Hallmark Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dock border border-white/80 text-[#C96F4F] text-xs font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9C9B2]" />
                  <span>Official Boutique Studio Portal</span>
                </div>

                {/* The Official Brand Logo (Prominent with Halo) */}
                <div className="flex flex-col items-center justify-center pt-1">
                  <div className="relative group cursor-pointer" onClick={onEnterShop}>
                    <div className="absolute inset-0 bg-[#D4AF37]/25 rounded-full blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
                    <PrintsNTwinsLogo size="2xl" variant="stacked" showTagline={false} />
                  </div>
                </div>

                {/* Heartfelt Motto & Studio Description */}
                <div className="space-y-2">
                  <h1 className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#6B7F5B] leading-tight tracking-wide">
                    “Little Creations, <span className="text-[#C96F4F]">Big Happiness” ♡</span>
                  </h1>
                  
                  <p className="font-serif text-sm sm:text-base font-bold text-stone-800 tracking-tight">
                    Creative Gifts For Every Occasion
                  </p>
                  
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed pt-1">
                    Your certified boutique for personalized keepsakes, everlasting crafts, and custom printing. Thoughtfully designed, precision-printed, and handcrafted with endless love.
                  </p>
                </div>

                {/* Primary Gateway Entrance Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    id="entrance-enter-boutique-btn"
                    onClick={onEnterShop}
                    className="w-full sm:w-auto px-7 py-3.5 bg-[#2E3A2F] hover:bg-[#232C24] text-white rounded-full font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2.5 group"
                  >
                    <span>Enter Boutique &amp; Shop</span>
                    <ArrowRight className="w-4 h-4 text-[#D9C9B2] group-hover:translate-x-1.5 transition-transform" />
                  </button>

                  <button
                    id="entrance-view-menu-btn"
                    onClick={onNavigateToMenu}
                    className="w-full sm:w-auto px-5 py-3.5 glass-dock hover:bg-white text-stone-800 hover:text-[#C96F4F] border border-white/90 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-[#C96F4F]" />
                    <span>View Menu Brochure</span>
                  </button>
                </div>

                {/* WhatsApp Instant Help Button */}
                <div className="pt-2">
                  <a
                    id="entrance-whatsapp-btn"
                    href={getGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#15803d] hover:text-[#166534] transition underline underline-offset-4"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Direct WhatsApp Assistance ({WHATSAPP_DISPLAY_PHONE})</span>
                  </a>
                </div>

                {/* Trust mini-strip */}
                <div className="pt-4 border-t border-[#D9C9B2]/50 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-600 font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-[#6B7F5B]" />
                    <span>100% Custom</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C96F4F]" />
                    <span>24–48hr Dispatch</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2E3A2F]" />
                    <span>Handmade Proof</span>
                  </div>
                </div>

              </div>

            </div>

          </div>


          {/* ------------------------------------------------------------- */}
          {/* RIGHT ORBITING FLOATING WINDOWS (Desktop)                     */}
          {/* ------------------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6">
            
            {/* Window 3: Photo Cards & Stickers */}
            <div 
              onClick={() => onSelectCategoryAndEnter('customized-stickers')}
              className="glass-panel glass-panel-hover floating-window rounded-3xl p-4.5 border border-white/90 shadow-lg cursor-pointer group animate-float-reverse"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-2xl bg-[#6B7F5B]/15 text-[#6B7F5B] flex items-center justify-center border border-[#6B7F5B]/30">
                  <Smile className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B7F5B] block">
                    Waterproof &amp; Cute
                  </span>
                  <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#C96F4F] transition-colors">
                    Customized Stickers
                  </h4>
                </div>
              </div>

              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 relative shadow-inner">
                <img
                  src="/products/custom-stickers.jpg"
                  alt="Customized stickers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 glass-dark text-white text-[10px] px-2 py-0.5 rounded-full font-script border border-white/20">
                  Die-Cut Vinyl ♡
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 text-xs">
                <span className="text-[11px] text-stone-500 font-medium">From ₹100/sheet</span>
                <span className="text-[#C96F4F] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Window 4: Bill Books & Visiting Cards */}
            <div 
              onClick={() => onSelectCategoryAndEnter('bill-books')}
              className="glass-panel glass-panel-hover floating-window rounded-3xl p-4.5 border border-white/90 shadow-lg cursor-pointer group animate-soft-float"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-2xl bg-[#2E3A2F]/10 text-[#2E3A2F] flex items-center justify-center border border-[#D9C9B2]/60">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">
                    Studio NCR Printing
                  </span>
                  <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#C96F4F] transition-colors">
                    Bill Books &amp; Cards
                  </h4>
                </div>
              </div>

              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 relative shadow-inner">
                <img
                  src="/products/bill-books.jpg"
                  alt="Bill books printing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 glass-dark text-white text-[10px] px-2 py-0.5 rounded-full font-script border border-white/20">
                  Carbonless NCR ♡
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 text-xs">
                <span className="text-[11px] text-stone-500 font-medium">From ₹350/book</span>
                <span className="text-[#C96F4F] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

        </div>

      </main>


      {/* ========================================================================= */}
      {/* BOTTOM FLOATING GLASS PILL STRIP: 6 SIGNATURE OFFERINGS                   */}
      {/* ========================================================================= */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="glass-dock floating-window rounded-3xl p-4 sm:p-5 border border-white/85 shadow-lg">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-3 pb-3 border-b border-[#D9C9B2]/40 text-center md:text-left">
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2 justify-center md:justify-start">
                <span>Direct Category Portals</span>
                <span className="text-[10px] uppercase font-sans font-bold bg-[#C96F4F] text-white px-2 py-0.5 rounded-full">
                  Instant Shop
                </span>
              </h4>
              <p className="text-xs text-stone-500">
                Click any signature craft below to jump straight into that collection in the boutique catalog.
              </p>
            </div>

            <button
              onClick={onEnterShop}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E3A2F] hover:text-[#C96F4F] transition shrink-0"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C96F4F]" />
            </button>
          </div>

          {/* 6 Category Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {signatureOfferings.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectCategoryAndEnter(item.id)}
                className="glass-pill rounded-2xl p-2.5 text-left hover:bg-white hover:border-[#C96F4F]/50 transition-all duration-200 group flex flex-col justify-between shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#C96F4F] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-serif font-bold text-xs text-stone-800 group-hover:text-[#C96F4F] transition-colors line-clamp-1">
                    {item.label}
                  </span>
                </div>
                <span className="text-[10px] text-stone-500 line-clamp-1">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>

        </div>
      </footer>

    </div>
  );
};

// Helper CheckCircleIcon inside same component
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
