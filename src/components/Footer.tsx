import React, { useState } from 'react';
import { Sparkles, Heart, Check, BookOpen, Truck, User } from 'lucide-react';
import { ProductCategory } from '../types';
import { PrintsNTwinsLogo } from './PrintsNTwinsLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getGeneralWhatsAppUrl, WHATSAPP_DISPLAY_PHONE } from '../config/whatsapp';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenTrackOrder: () => void;
  onOpenBoxBuilder: () => void;
  onOpenInquiry: () => void;
  onNavigateToContact?: () => void;
  onNavigateToMenu?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTrackOrder,
  onOpenInquiry,
  onNavigateToContact,
  onNavigateToMenu,
}) => {
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    window.open('https://ig.me/j/PYfF2Ii4pv1ZS2pu/', '_blank', 'noopener,noreferrer');
  };

  const menuItems: { label: string; cat: ProductCategory }[] = [
    { label: 'Bill Books (Custom & Duplicate)', cat: 'bill-books' },
    { label: 'Photo Cards (Polaroid Keepsakes)', cat: 'photo-cards' },
    { label: 'Customized Stickers (Waterproof Vinyl)', cat: 'customized-stickers' },
    { label: 'Pipe Cleaner Crafts (Bouquets & Charms)', cat: 'pipe-cleaner-crafts' },
    { label: 'Tshirts Printing (Custom Graphics & Tees)', cat: 'tshirts-printing' },
    { label: 'Visiting Cards (Luxury Gold Foil & Matte)', cat: 'visiting-cards' },
  ];

  return (
    <footer className="bg-[#2E3A2F] text-[#F8F6EE] border-t border-[#3D4D3E]">
      
      {/* Newsletter / Club Signup Ribbon */}
      <div className="border-b border-[#3D4D3E]/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D9C9B2] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The printsntwins Club</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Enjoy 10% Off Your First Custom Order
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              Receive updates on new collections, boutique craft drops, and special offers. Little creations, big happiness!
            </p>
          </div>

          <div className="w-full max-w-md">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-700 rounded-full text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#C96F4F]"
                  />
                </div>
                <a
                  href="https://ig.me/j/PYfF2Ii4pv1ZS2pu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSubscribed(true)}
                  className="px-6 py-3 bg-[#C96F4F] hover:bg-[#B35D3F] text-white rounded-full text-xs font-bold transition shadow-sm shrink-0 inline-flex items-center justify-center cursor-pointer"
                >
                  Join Club
                </a>
              </form>
            ) : (
              <div className="p-3 bg-stone-900 border border-[#42594D] text-[#86EFAC] rounded-2xl flex items-center justify-between gap-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#86EFAC] shrink-0" />
                  <span>
                    Welcome to the family{name ? `, ${name}` : ''}! Use code <strong>TWINS10</strong> at checkout.
                  </span>
                </div>
                <a
                  href="https://ig.me/j/PYfF2Ii4pv1ZS2pu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#C96F4F] hover:bg-[#B35D3F] text-white rounded-full text-[11px] font-bold transition shrink-0"
                >
                  Open Club →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col with Official Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <PrintsNTwinsLogo size="md" variant="emblem" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  printsntwins
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9C9B2] font-semibold">
                  Personalized Gifts &amp; Custom Printing
                </span>
              </div>
            </div>
            
            <p className="font-script text-xl text-[#D9C9B2]">
              “Creative Gifts for Every Occasion” ♡
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Supporting tagline: <em>“Little Creations, Big Happiness”</em>. An artisanal small business bringing you handcrafted pipe cleaner crafts, personalized photo cards, waterproof stickers, business bill books, printed t-shirts, and luxury visiting cards.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <Heart className="w-3.5 h-3.5 text-[#C96F4F] fill-[#C96F4F]" />
              <span>Handmade with Love in our Boutique Studio</span>
            </div>
          </div>

          {/* Quick Menu Offerings */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Menu Offerings
            </h4>
            <ul className="space-y-2 text-stone-400">
              {menuItems.map((item) => (
                <li key={item.cat}>
                  <button 
                    onClick={() => onSelectCategory(item.cat)} 
                    className="hover:text-white transition text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {onNavigateToMenu && (
                <li className="pt-1">
                  <button 
                    onClick={onNavigateToMenu} 
                    className="text-[#D9C9B2] font-semibold hover:underline flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Official Menu Brochure →</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Customer Care & Help */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-stone-400">
              {/* WhatsApp Direct Chat button */}
              <li>
                <a
                  id="footer-whatsapp-chat-btn"
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] font-bold text-xs transition shadow-sm"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1.5 font-medium"
                >
                  <span>Chat: <strong>{WHATSAPP_DISPLAY_PHONE}</strong></span>
                </a>
              </li>
              {onNavigateToContact && (
                <li>
                  <button onClick={onNavigateToContact} className="text-[#D9C9B2] hover:underline font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D9C9B2]" />
                    <span>Contact Studio &amp; FAQ Page</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenTrackOrder} className="hover:text-white transition flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-[#C96F4F]" />
                  <span>Track Order Status</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenInquiry} className="hover:text-white transition">
                  Bulk &amp; Business Orders
                </button>
              </li>
              <li>
                <span className="text-stone-300">Fast Dispatch:</span> 24–48 hours
              </li>
              <li>
                <span className="text-stone-300">100% Quality:</span> Handcrafted with care
              </li>
              <li>
                <a
                  href="https://ig.me/j/PYfF2Ii4pv1ZS2pu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="text-stone-300">Instagram Club:</span>
                  <span className="text-[#D9C9B2] font-semibold underline">@printsntwins</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Brand Values Badges */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Why Choose Us
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="p-2.5 rounded-xl bg-stone-900 border border-[#3D4D3E]">
                <span className="font-bold text-white block">✨ Handmade with love</span>
                <span className="text-[11px]">Unique &amp; aesthetic designs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900 border border-[#3D4D3E]">
                <span className="font-bold text-white block">🌱 Small Business</span>
                <span className="text-[11px]">Big dreams, made with love ♡</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#3D4D3E]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} printsntwins. All rights reserved. “Little Creations, Big Happiness”.</p>
          <div className="flex items-center gap-4">
            <a 
              href={getGeneralWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition flex items-center gap-1"
            >
              <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
              <span>WhatsApp Support</span>
            </a>
            <span>•</span>
            {onNavigateToMenu && (
              <>
                <button onClick={onNavigateToMenu} className="hover:text-stone-300 transition">Official Menu</button>
                <span>•</span>
              </>
            )}
            {onNavigateToContact && (
              <>
                <button onClick={onNavigateToContact} className="hover:text-stone-300 transition">Contact Us</button>
                <span>•</span>
              </>
            )}
            <button onClick={onOpenInquiry} className="hover:text-stone-300 transition">Custom Printing</button>
            <span>•</span>
            <button onClick={onOpenTrackOrder} className="hover:text-stone-300 transition">Track Order</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
