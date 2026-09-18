import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Heart, Award, Clock, BookOpen } from 'lucide-react';
import { ProductCategory } from '../types';
import { PrintsNTwinsLogo } from './PrintsNTwinsLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getGeneralWhatsAppUrl } from '../config/whatsapp';

interface HeroProps {
  onExploreClick: () => void;
  onOpenBoxBuilder: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateToMenu?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenBoxBuilder,
  onSelectCategory,
  onNavigateToMenu,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F6EE] via-[#F1ECE1] to-[#F8F6EE] border-b border-[#D9C9B2]/60">
      {/* Subtle organic background aura */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#C96F4F]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-[#6B7F5B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D9C9B2]/20 border border-[#D9C9B2] text-[#C96F4F] text-xs font-semibold tracking-wide shadow-2xs">
              <PrintsNTwinsLogo size="xs" variant="emblem" />
              <span>Certified Boutique Studio • Made With Love ♡</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2E3A2F] font-bold tracking-tight leading-[1.15]">
                Creative Gifts For <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#C96F4F]">Every Occasion.</span>
              </h1>
              <p className="font-script text-2xl sm:text-3xl text-[#6B7F5B] font-medium tracking-wide">
                “Little Creations, Big Happiness” ♡
              </p>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Welcome to <strong>printsntwins</strong> — your boutique for personalized gifts and custom printing. Explore our official studio collection: handcrafted <em>Pipe Cleaner Crafts</em>, keepsake <em>Photo Cards</em>, waterproof <em>Customized Stickers</em>, professional <em>Bill Books</em>, aesthetic <em>T-shirts Printing</em>, and luxury <em>Visiting Cards</em>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#2E3A2F] text-white rounded-full font-medium text-sm hover:bg-[#232C24] transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {onNavigateToMenu && (
                <button
                  id="hero-view-menu-btn"
                  onClick={onNavigateToMenu}
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#C96F4F]/15 text-[#C96F4F] border border-[#D9C9B2] rounded-full font-semibold text-sm hover:bg-[#C96F4F]/25 transition shadow-2xs flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#C96F4F]" />
                  <span>Menu Card</span>
                </button>
              )}

              {/* Direct WhatsApp Chat CTA in Hero */}
              <a
                id="hero-whatsapp-chat-btn"
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 bg-[#E8F8EE] text-[#15803d] hover:bg-[#25D366] hover:text-white border border-[#A7F3D0] rounded-full font-bold text-sm transition shadow-2xs flex items-center justify-center gap-2 group"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Filter Categories (Glass Pills) */}
            <div className="pt-3">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-medium block mb-2">
                Our 6 Signature Offerings:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                {[
                  { id: 'bill-books', label: '📋 Bill Books' },
                  { id: 'photo-cards', label: '📸 Photo Cards' },
                  { id: 'customized-stickers', label: '✨ Customized Stickers' },
                  { id: 'pipe-cleaner-crafts', label: '🌸 Pipe Cleaner Crafts' },
                  { id: 'tshirts-printing', label: '👕 Tshirts Printing' },
                  { id: 'visiting-cards', label: '💳 Visiting Cards' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectCategory(item.id as ProductCategory)}
                    className="glass-pill px-3.5 py-1.5 rounded-full text-stone-700 hover:text-[#C96F4F] hover:bg-white hover:border-[#C96F4F]/50 transition shadow-2xs font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust highlights bar (Floating Glass Badges) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-[#D9C9B2]/60 text-left">
              <div className="glass-panel floating-window rounded-2xl p-3 sm:p-3.5 border border-white/80 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#6B7F5B]/15 text-[#6B7F5B] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800">100% Custom</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500">Live preview proof</p>
                </div>
              </div>

              <div className="glass-panel floating-window rounded-2xl p-3 sm:p-3.5 border border-white/80 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#D9C9B2]/35 text-[#2E3A2F] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800">Fast Dispatch</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500">Ready in 24–48 hrs</p>
                </div>
              </div>

              <div className="glass-panel floating-window rounded-2xl p-3 sm:p-3.5 border border-white/80 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C96F4F]/15 text-[#C96F4F] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800">4.97 ★ Rating</h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-500">Over 3,500+ smiles</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Glass Window Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Featured Image Floating Glass Window */}
              <div className="glass-panel floating-window p-2.5 rounded-3xl shadow-2xl border border-white/90 aspect-[4/5] bg-stone-100/80 group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=95"
                    alt="Personalized gifts collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  
                  {/* Overlay Frosted Badge */}
                  <div className="absolute top-3.5 left-3.5 glass-dock px-3 py-1.5 rounded-full text-xs font-semibold text-stone-800 shadow-sm flex items-center gap-1.5 border border-white/80">
                    <Heart className="w-3.5 h-3.5 text-[#C96F4F] fill-[#C96F4F]" />
                    <span>Handcrafted with Love ♡</span>
                  </div>

                  {/* Bottom Card Note */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-[#D9C9B2] font-semibold block">
                      Boutique Printing &amp; Crafts
                    </span>
                    <h3 className="font-serif text-lg font-bold">
                      Thoughtful Gifts For Every Moment ♡
                    </h3>
                    <p className="text-xs text-stone-200 mt-0.5">
                      Custom bill books, photo cards, stickers, pipe cleaner crafts, t-shirts &amp; cards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Accent Card 1: Pipe Cleaner Bouquet (Animated Soft Float) */}
              <div className="absolute -bottom-6 -left-6 glass-dock p-3.5 rounded-2xl shadow-xl border border-white/80 max-w-[220px] hidden sm:block animate-soft-float">
                <div className="flex items-center gap-3">
                  <img
                    src="/products/pipe-cleaner-crafts.jpg"
                    alt="Pipe cleaner flower"
                    className="w-12 h-12 rounded-xl object-cover shadow-2xs border border-white/80"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C96F4F] block">
                      Tiny Crafts
                    </span>
                    <h5 className="text-xs font-bold text-stone-800 leading-tight">
                      Pipe Cleaner Crafts
                    </h5>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      Big Smiles ♡
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Accent Card 2: Official Hallmark Stamp */}
              <div className="absolute -top-4 -right-4 glass-dock border border-white/80 p-2.5 rounded-2xl shadow-lg hidden sm:flex items-center gap-2.5">
                <PrintsNTwinsLogo size="sm" variant="emblem" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-stone-900 leading-tight">
                    printsntwins
                  </p>
                  <p className="text-[9px] text-[#6B7F5B]">
                    Official Studio Seal
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
