import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { LiveCustomizerModal } from './components/LiveCustomizerModal';
import { GiftBoxBuilder } from './components/GiftBoxBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { WishlistModal } from './components/WishlistModal';
import { CustomInquiryModal } from './components/CustomInquiryModal';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactPage } from './components/ContactPage';
import { MenuPage } from './components/MenuPage';
import { EntrancePage } from './components/EntrancePage';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, OccasionTag, RecipientTag, CartItem, CustomizationState } from './types';
import { Sparkles, Gift, Heart, ArrowRight, Wand2, ShieldCheck, Check } from 'lucide-react';

export default function App() {
  // Page view state: 'entrance' | 'shop' | 'contact' | 'menu'
  const [currentPage, setCurrentPage] = useState<'entrance' | 'shop' | 'contact' | 'menu'>('entrance');

  // Navigation & Filter states
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionTag | 'all'>('all');
  const [selectedRecipient, setSelectedRecipient] = useState<RecipientTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Interactive Modal States
  const [customizerProduct, setCustomizerProduct] = useState<Product | null>(null);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [trackedOrderId, setTrackedOrderId] = useState('PNT-84920');

  // E-commerce cart & wishlist persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pnt_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed with 1 initial sample custom gift so cart drawer looks charming on initial inspection
    return [
      {
        id: 'cart-init-1',
        product: PRODUCTS[0], // Bill Books
        quantity: 1,
        unitPrice: 350,
        customization: {
          recipientName: 'Studio printsntwins',
          customMessage: 'A4 1/2 Standard Size • Duplicate NCR',
          specialDate: '001',
          selectedFont: 'serif',
          selectedColor: '#2E3A2F',
          giftWrap: false,
          giftCardMessage: '',
        }
      }
    ];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pnt_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [PRODUCTS[1], PRODUCTS[3]]; // Plaque & Matching hoodies
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>('TWINS10');

  // Toast notification banner state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('pnt_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('pnt_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    if (selectedOccasion !== 'all') {
      list = list.filter(p => p.occasionTags.includes(selectedOccasion));
    }

    if (selectedRecipient !== 'all') {
      list = list.filter(p => p.recipientTags.includes(selectedRecipient));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured default order in array
        break;
    }

    return list;
  }, [activeCategory, selectedOccasion, selectedRecipient, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, customization: CustomizationState, customUnitPrice?: number) => {
    const calculatedUnitPrice = customUnitPrice !== undefined 
      ? customUnitPrice 
      : product.price + (customization.giftWrap ? 50 : 0);

    const newItem: CartItem = {
      id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      product,
      quantity: 1,
      unitPrice: calculatedUnitPrice,
      customization,
    };

    setCartItems(prev => [newItem, ...prev]);
    setIsCartOpen(true);
    showToast(`✨ Added "${product.name}" with personalized proof to your gift bag!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from your gift bag.');
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlist.some(p => p.id === product.id);
    if (isSaved) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed from saved keepsakes`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`💖 Saved "${product.name}" to your wishlist!`);
    }
  };

  const handleApplyPromo = (code: string): boolean => {
    if (code === 'TWINS10' || code === 'WELCOME5' || code === 'WELCOME10') {
      setAppliedPromo(code);
      showToast(`🎉 Promo code "${code}" successfully activated!`);
      return true;
    }
    return false;
  };

  const handleOrderSuccess = (orderId: string) => {
    setTrackedOrderId(orderId);
    setCartItems([]); // clear cart
    showToast(`🎉 Order ${orderId} placed! Tracking is now available.`);
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedOccasion('all');
    setSelectedRecipient('all');
    setSearchQuery('');
  };

  const scrollToCatalog = () => {
    if (currentPage !== 'shop') {
      setCurrentPage('shop');
    }
    setTimeout(() => {
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const navigateToContact = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToMenu = () => {
    setCurrentPage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToEntrance = () => {
    setCurrentPage('entrance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F6EE] text-[#2E3A2F] flex flex-col font-sans selection:bg-[#D9C9B2] relative">
      
      {/* Ambient Organic Background Lighting Blobs for Glassmorphic Depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[-8%] left-[-6%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full bg-[#D9C9B2]/35 blur-[120px]" />
        <div className="absolute top-[28%] right-[-8%] w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] rounded-full bg-[#6B7F5B]/15 blur-[130px]" />
        <div className="absolute top-[60%] left-[-5%] w-[38vw] h-[38vw] max-w-[550px] max-h-[550px] rounded-full bg-[#C96F4F]/12 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-[#D9C9B2]/30 blur-[130px]" />
      </div>

      {/* Main App Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-dark text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2.5 animate-fadeIn border border-[#6B7F5B]/40">
          <Sparkles className="w-4 h-4 text-[#C96F4F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header / Navigation (Only visible after entering the website) */}
      {currentPage !== 'entrance' && (
        <Navbar
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
          onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
          onSelectCategory={(cat) => {
            if (currentPage !== 'shop') setCurrentPage('shop');
            setActiveCategory(cat);
            scrollToCatalog();
          }}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            if (currentPage !== 'shop') setCurrentPage('shop');
            setSearchQuery(q);
            if (q) scrollToCatalog();
          }}
          currentPage={currentPage}
          onNavigateToContact={navigateToContact}
          onNavigateToShop={navigateToShop}
          onNavigateToMenu={navigateToMenu}
        />
      )}

      <main className="flex-1">
        {currentPage === 'entrance' ? (
          <EntrancePage
            onEnterShop={navigateToShop}
            onSelectCategoryAndEnter={(cat) => {
              setActiveCategory(cat);
              navigateToShop();
              scrollToCatalog();
            }}
            onNavigateToMenu={navigateToMenu}
            onNavigateToContact={navigateToContact}
          />
        ) : currentPage === 'contact' ? (
          <ContactPage
            onBackToShop={navigateToShop}
            onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
            onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
          />
        ) : currentPage === 'menu' ? (
          <MenuPage
            products={PRODUCTS}
            onOpenCustomizer={(p) => setCustomizerProduct(p)}
            onBackToShop={navigateToShop}
            onNavigateToContact={navigateToContact}
          />
        ) : (
          <>
            {/* Brand Editorial Hero */}
            <Hero
              onExploreClick={scrollToCatalog}
              onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                scrollToCatalog();
              }}
              onNavigateToMenu={navigateToMenu}
            />

        {/* Feature Spotlight Banner: Build A Box Studio Banner (Floating Glass Window) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
          <div className="glass-panel floating-window rounded-3xl p-6 sm:p-7 border border-white/80 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
            {/* Soft inner glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C96F4F]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 text-center md:text-left relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#C96F4F]/15 text-[#C96F4F] flex items-center justify-center border border-[#D9C9B2]/60 shadow-2xs shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 flex items-center gap-2 justify-center md:justify-start">
                  <span>Build A Custom Gift Box Studio</span>
                  <span className="text-[10px] uppercase font-sans font-bold bg-[#C96F4F] text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                    Save 12%
                  </span>
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Pick your keepsake box, choose 3–5 handcrafted items, and write a calligraphy card.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsBoxBuilderOpen(true)}
              className="px-5 py-2.5 bg-[#2E3A2F] text-white hover:bg-[#232C24] rounded-full text-xs font-semibold flex items-center gap-2 transition shadow-sm hover:shadow-md shrink-0 relative z-10"
            >
              <span>Launch Studio Builder</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D9C9B2]" />
            </button>
          </div>
        </section>

        {/* Catalog Filter Controls */}
        <div id="catalog-section">
          <CategoryFilter
            selectedCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            selectedOccasion={selectedOccasion}
            onSelectOccasion={setSelectedOccasion}
            selectedRecipient={selectedRecipient}
            onSelectRecipient={setSelectedRecipient}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={resetFilters}
            activeCount={filteredProducts.length}
          />
        </div>

        {/* Products Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Active filter badges indicator */}
          {(activeCategory !== 'all' || selectedOccasion !== 'all' || selectedRecipient !== 'all' || searchQuery) && (
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-400 font-medium">Filtering by:</span>
              {activeCategory !== 'all' && (
                <span className="px-3 py-1 bg-white border border-stone-200 rounded-full font-semibold text-stone-800">
                  Category: {activeCategory}
                </span>
              )}
              {selectedOccasion !== 'all' && (
                <span className="px-3 py-1 bg-white border border-stone-200 rounded-full font-semibold text-stone-800">
                  Occasion: {selectedOccasion}
                </span>
              )}
              {selectedRecipient !== 'all' && (
                <span className="px-3 py-1 bg-white border border-stone-200 rounded-full font-semibold text-stone-800">
                  Recipient: {selectedRecipient}
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 bg-white border border-stone-200 rounded-full font-semibold text-stone-800">
                  Search: "{searchQuery}"
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-[#C96F4F] hover:underline ml-2 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onCustomize={(p) => setCustomizerProduct(p)}
                  isWishlisted={wishlist.some(w => w.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C96F4F]/15 text-[#C96F4F] flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                No matching gifts found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try clearing your search keyword or switching occasion filters to discover other handmade keepsakes.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#2E3A2F] text-white rounded-full text-xs font-semibold hover:bg-[#232C24] transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* Artisanal Process Callout: How We Craft (Floating Glass Windows) */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C96F4F]">
                The printsntwins Crafting Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E3A2F]">
                How Your Custom Gift Comes to Life
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                We believe personalized gifts should feel like handcrafted heirlooms, never rushed mass manufacturing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              
              <div className="glass-panel glass-panel-hover floating-window p-7 rounded-3xl border border-white/80 shadow-md space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#C96F4F]/15 text-[#C96F4F] flex items-center justify-center mx-auto font-serif text-lg font-bold border border-[#D9C9B2]/60 shadow-2xs">
                  1
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Live Customization &amp; Proof
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Enter your meaningful names, dates, coordinates, or song links. Preview the typography and foil effect in real time before placing your order.
                </p>
              </div>

              <div className="glass-panel glass-panel-hover floating-window p-7 rounded-3xl border border-white/80 shadow-md space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#6B7F5B]/15 text-[#6B7F5B] flex items-center justify-center mx-auto font-serif text-lg font-bold border border-[#6B7F5B]/30 shadow-2xs">
                  2
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Artisan Studio Inscription
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Our master printmakers handle precision laser etching, hot foil debossing, archival cotton-rag printing, or wheel-thrown stoneware ceramics.
                </p>
              </div>

              <div className="glass-panel glass-panel-hover floating-window p-7 rounded-3xl border border-white/80 shadow-md space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#2E3A2F]/10 text-[#2E3A2F] flex items-center justify-center mx-auto font-serif text-lg font-bold border border-[#D9C9B2]/60 shadow-2xs">
                  3
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Boutique Gift Wrapping
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Packed in rigid magnetic keepsake boxes with shredded crinkle paper, hand-tied silk ribbon, and your personal note penned in fountain ink calligraphy.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Customer Testimonials & Reviews */}
        <CustomerReviews />
      </>
    )}

      </main>

      {/* Boutique Footer (Shown on Shop, Contact, and Menu views) */}
      {currentPage !== 'entrance' && (
        <Footer
          onSelectCategory={(cat) => {
            if (currentPage !== 'shop') setCurrentPage('shop');
            setActiveCategory(cat);
            scrollToCatalog();
          }}
          onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
          onOpenInquiry={() => setIsInquiryOpen(true)}
          onNavigateToContact={navigateToContact}
          onNavigateToMenu={navigateToMenu}
        />
      )}

      {/* MODALS & DRAWERS */}
      
      {/* 1. Live Personalizer Studio Modal */}
      <LiveCustomizerModal
        product={customizerProduct}
        onClose={() => setCustomizerProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Build A Gift Box Studio */}
      <GiftBoxBuilder
        isOpen={isBoxBuilderOpen}
        onClose={() => setIsBoxBuilderOpen(false)}
        onAddBoxToCart={handleAddToCart}
      />

      {/* 3. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
      />

      {/* 4. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
        appliedPromo={appliedPromo}
      />

      {/* 5. Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        initialOrderId={trackedOrderId}
      />

      {/* 6. Wishlist Saved Keepsakes Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onCustomizeItem={(p) => setCustomizerProduct(p)}
      />

      {/* 7. Bespoke / Bulk Inquiry Modal */}
      <CustomInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* 8. Global Floating WhatsApp Direct Chat Concierge (Active once entered into store) */}
      {currentPage !== 'entrance' && (
        <FloatingWhatsApp />
      )}

      </div>
    </div>
  );
}

