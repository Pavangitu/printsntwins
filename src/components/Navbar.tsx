import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  Search, 
  PackageCheck, 
  Menu, 
  X, 
  Gift, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { ProductCategory } from '../types';
import { PrintsNTwinsLogo } from './PrintsNTwinsLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getGeneralWhatsAppUrl, WHATSAPP_DISPLAY_PHONE } from '../config/whatsapp';

interface NavbarProps {
  cartCount?: number;
  wishlistCount: number;
  onOpenCart?: () => void;
  onOpenWishlist: () => void;
  onOpenBoxBuilder: () => void;
  onOpenTrackOrder: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  activeCategory: ProductCategory;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentPage: 'entrance' | 'shop' | 'contact' | 'menu';
  onNavigateToContact: () => void;
  onNavigateToShop: () => void;
  onNavigateToMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount = 0,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBoxBuilder,
  onOpenTrackOrder,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange,
  currentPage,
  onNavigateToContact,
  onNavigateToShop,
  onNavigateToMenu,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; cat: ProductCategory }[] = [
    { label: 'All Items', cat: 'all' },
    { label: 'Bill Books', cat: 'bill-books' },
    { label: 'Photo Cards', cat: 'photo-cards' },
    { label: 'Customized Stickers', cat: 'customized-stickers' },
    { label: 'Pipe Cleaner Crafts', cat: 'pipe-cleaner-crafts' },
    { label: 'Tshirts Printing', cat: 'tshirts-printing' },
    { label: 'Visiting Cards', cat: 'visiting-cards' },
  ];

  return (
    <header className="sticky top-0 z-40 px-3 sm:px-6 pt-2 pb-1.5 transition-all">
      {/* Top micro-announcement bar - Floating glass capsule */}
      <div className="max-w-4xl mx-auto mb-2 glass-dark text-[#F8F6EE] text-[11px] py-1.5 px-4 rounded-full border border-white/15 shadow-sm text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D9C9B2] animate-pulse" />
          <span>
            <strong className="font-semibold text-[#D9C9B2]">Little Creations, Big Happiness ♡</strong> — Thoughtful gifts &amp; custom printing
          </span>
        </div>
        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition text-[11px] font-semibold underline underline-offset-2"
        >
          <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
          <span>WhatsApp Concierge: {WHATSAPP_DISPLAY_PHONE}</span>
        </a>
      </div>

      {/* Main Brand Header: Floating Island Glass Dock */}
      <div className="max-w-7xl mx-auto glass-dock floating-window rounded-3xl border border-white/85 shadow-lg px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 rounded-xl hover:bg-stone-100/60 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Official Brand Logo & Tagline */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => {
              onNavigateToShop();
              onSelectCategory('all');
            }}
          >
            <PrintsNTwinsLogo size="md" variant="full" />
          </div>

          {/* Desktop Search Bar (Frosted Glass Input) */}
          <div className="hidden md:flex items-center relative w-60 lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              id="desktop-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search bill books, stickers, tees..."
              className="w-full pl-9 pr-4 py-2 bg-white/70 backdrop-blur-xs border border-[#D9C9B2]/80 rounded-full text-xs placeholder:text-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#C96F4F]/20 focus:border-[#C96F4F] transition shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-stone-400 hover:text-stone-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action CTAs: Entrance, Menu Brochure, Order Tracking, Wishlist, WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Official Menu Brochure CTA button */}
            <button
              id="nav-menu-brochure-btn"
              onClick={onNavigateToMenu}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition shadow-2xs border ${
                currentPage === 'menu'
                  ? 'bg-[#2E3A2F] text-white border-[#2E3A2F]'
                  : 'bg-[#C96F4F]/15 text-[#C96F4F] border-[#D9C9B2] hover:bg-[#C96F4F]/25'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C96F4F]" />
              <span className="hidden sm:inline">Menu Brochure</span>
              <span className="sm:hidden">Menu</span>
            </button>

            {/* Order status tracking */}
            <button
              id="nav-track-order-btn"
              onClick={onOpenTrackOrder}
              className="p-2.5 text-stone-700 hover:text-[#C96F4F] rounded-full hover:bg-stone-100/60 transition relative"
              title="Track Custom Order"
            >
              <PackageCheck className="w-5 h-5" />
            </button>

            {/* Wishlist button */}
            <button
              id="nav-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2.5 text-stone-700 hover:text-[#C96F4F] rounded-full hover:bg-stone-100/60 transition relative"
              title="Saved Keepsakes"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C96F4F] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* WhatsApp direct chat button */}
            <a
              id="nav-whatsapp-btn"
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#E8F8EE]/90 backdrop-blur-xs text-[#128C7E] hover:bg-[#25D366] hover:text-white transition shadow-2xs border border-[#A7F3D0] text-xs font-bold"
              title={`Chat on WhatsApp (${WHATSAPP_DISPLAY_PHONE})`}
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Desktop Category Navigation links */}
        <nav className="hidden lg:flex items-center justify-center space-x-1 py-2 border-t border-[#D9C9B2]/40 text-xs font-medium text-stone-600">
          {navItems.map((item) => (
            <button
              key={item.cat}
              id={`nav-link-${item.cat}`}
              onClick={() => {
                if (currentPage !== 'shop') onNavigateToShop();
                onSelectCategory(item.cat);
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                currentPage === 'shop' && activeCategory === item.cat
                  ? 'bg-[#2E3A2F] text-white shadow-xs'
                  : 'hover:text-stone-900 hover:bg-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            id="nav-link-official-menu"
            onClick={onNavigateToMenu}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-semibold ${
              currentPage === 'menu'
                ? 'bg-[#2E3A2F] text-white shadow-xs'
                : 'text-[#C96F4F] hover:bg-[#C96F4F]/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D9C9B2]" />
            <span>Menu Brochure</span>
          </button>

          <button
            id="nav-link-contact"
            onClick={onNavigateToContact}
            className={`px-3.5 py-1.5 rounded-full transition-all font-medium ${
              currentPage === 'contact'
                ? 'bg-[#2E3A2F] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/80'
            }`}
          >
            Contact Studio
          </button>
        </nav>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F6EE] border-b border-[#D9C9B2]/60 px-4 pt-3 pb-5 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              id="mobile-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search bill books, photo cards, stickers..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#D9C9B2] rounded-lg text-xs"
            />
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigateToMenu();
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-bold flex items-center justify-between ${
                currentPage === 'menu'
                  ? 'bg-[#2E3A2F] text-white'
                  : 'bg-[#C96F4F]/15 text-[#C96F4F]'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C96F4F]" />
                Official Menu Brochure
              </span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                onNavigateToShop();
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                currentPage === 'shop' && activeCategory === 'all'
                  ? 'bg-[#2E3A2F] text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>Shop All Items</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            {navItems.filter(i => i.cat !== 'all').map((item) => (
              <button
                key={item.cat}
                onClick={() => {
                  onNavigateToShop();
                  onSelectCategory(item.cat);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                  currentPage === 'shop' && activeCategory === item.cat
                    ? 'bg-[#2E3A2F] text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

            <button
              onClick={() => {
                onOpenTrackOrder();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-stone-600 hover:bg-stone-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <PackageCheck className="w-4 h-4" />
                Track Order Status
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onNavigateToContact();
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-between mt-1 ${
                currentPage === 'contact'
                  ? 'bg-[#2E3A2F] text-white'
                  : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C96F4F]" />
                Contact Studio &amp; FAQ
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Mobile WhatsApp Direct Chat CTA */}
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-bold flex items-center justify-between bg-[#E8F8EE] text-[#15803d] hover:bg-[#D4F4E0] transition border border-[#A7F3D0]/80 mt-2"
            >
              <span className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Chat with us on WhatsApp
              </span>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-full border border-[#86EFAC] text-emerald-800">
                Online
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
