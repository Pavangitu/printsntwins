import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Gift, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Check, 
  Truck 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedPromo,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500;
  const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  
  // Calculate discount if promo applied
  let discountAmount = 0;
  if (appliedPromo === 'TWINS10') {
    discountAmount = subtotal * 0.10;
  } else if (appliedPromo === 'WELCOME5') {
    discountAmount = Math.min(subtotal, 50);
  }

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Try "TWINS10" for 10% off or "WELCOME5"');
      setPromoSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-md flex justify-end animate-fadeIn">
      <div 
        id="cart-drawer-container"
        className="w-full max-w-md glass-panel h-full shadow-2xl flex flex-col justify-between border-l border-white/85"
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#D9C9B2]/60 flex items-center justify-between glass-dock">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C96F4F]" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Your Gift Bag ({items.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-600 flex items-center justify-center transition border border-[#D9C9B2]/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="glass-dock px-6 py-3 border-b border-[#D9C9B2]/40 text-xs">
          <div className="flex items-center justify-between mb-1 font-medium text-stone-700">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#C96F4F]" />
              {amountToFreeShipping > 0 ? (
                <span>Add <strong>₹{amountToFreeShipping.toFixed(0)}</strong> more for <strong>Free Shipping</strong></span>
              ) : (
                <span className="text-[#42594D] font-bold">🎉 You've Unlocked Free Express Shipping!</span>
              )}
            </span>
            <span className="text-[11px] text-stone-500 font-bold">{freeShippingProgress}%</span>
          </div>

          <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#C96F4F] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Scrollable Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full glass-dock text-stone-400 flex items-center justify-center mx-auto border border-white/80">
                <ShoppingBag className="w-8 h-8 text-[#C96F4F]" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-800">
                Your Bag is Empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our personalized keepsakes, custom mugs, or curate your own custom box to fill it with happiness!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-full bg-[#2E3A2F] text-white text-xs font-semibold hover:bg-stone-800 transition"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl glass-panel floating-window border border-white/85 flex gap-3 relative group shadow-xs"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0 relative">
                  <img
                    src={item.customization.photoUrl || item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                  {item.customization.giftWrap && (
                    <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#C96F4F] text-white flex items-center justify-center shadow-xs" title="Gift Wrapped">
                      <Gift className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between">
                    <h5 className="font-serif font-bold text-xs text-stone-900 line-clamp-1">
                      {item.product.name}
                    </h5>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-500 transition p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Personalization specifications badge */}
                  <div className="text-[11px] text-stone-600 space-y-1 bg-white/80 p-2 rounded-lg border border-stone-200/60">
                    {/* Dimension & Material tags */}
                    {(item.customization.selectedDimension || item.customization.selectedMaterial) && (
                      <div className="flex items-center gap-1 flex-wrap pb-0.5">
                        {item.customization.selectedDimension && (
                          <span className="bg-[#FAF5EE] text-[#C96F4F] px-1.5 py-0.5 rounded text-[9px] font-bold border border-[#D9C9B2]/60">
                            {item.customization.selectedDimension}
                          </span>
                        )}
                        {item.customization.selectedMaterial && (
                          <span className="bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded text-[9px] font-semibold border border-stone-200">
                            {item.customization.selectedMaterial}
                          </span>
                        )}
                      </div>
                    )}
                    {/* Size, Fabric, Print Type tags */}
                    {(item.customization.selectedSize || item.customization.selectedFabric || item.customization.selectedPrintType) && (
                      <div className="flex items-center gap-1 flex-wrap pb-0.5">
                        {item.customization.selectedPrintType && (
                          <span className="bg-[#FAF5EE] text-[#C96F4F] px-1.5 py-0.2 rounded text-[9px] font-bold border border-[#D9C9B2]/60">
                            {item.customization.selectedPrintType}
                          </span>
                        )}
                        {item.customization.selectedSize && (
                          <span className="bg-stone-100 text-stone-800 px-1.5 py-0.2 rounded text-[9px] font-bold border border-stone-200">
                            Size: {item.customization.selectedSize}
                          </span>
                        )}
                        {item.customization.selectedFabric && (
                          <span className="bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded text-[9px] border border-stone-200">
                            {item.customization.selectedFabric}
                          </span>
                        )}
                      </div>
                    )}
                    {item.customization.recipientName && (
                      <p className="truncate">
                        <strong className="text-stone-700">Text:</strong> {item.customization.recipientName}
                      </p>
                    )}
                    {item.customization.customMessage && (
                      <p className="truncate text-[10px] text-stone-500 italic">
                        "{item.customization.customMessage}"
                      </p>
                    )}
                    {item.customization.giftWrap && (
                      <p className="text-[10px] text-[#C96F4F] font-medium flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        Includes Ribbon Gift Box &amp; Calligraphy Card
                      </p>
                    )}
                  </div>

                  {/* Price & Quantity Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-xs text-stone-900">
                      ₹{(item.unitPrice * item.quantity).toFixed(0)}
                    </span>

                    <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-2 py-0.5 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-stone-500 hover:text-stone-900 p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold text-stone-800 px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-stone-500 hover:text-stone-900 p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Totals & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-[#F8F6EE] space-y-3 text-xs">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromoCode} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (e.g. TWINS10)"
                  className="w-full pl-8 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs uppercase focus:outline-none focus:border-[#C96F4F]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-stone-800 text-white rounded-xl font-semibold hover:bg-stone-900 transition text-xs"
              >
                Apply
              </button>
            </form>

            {promoError && (
              <p className="text-[11px] text-red-500 font-medium">{promoError}</p>
            )}
            {appliedPromo && (
              <p className="text-[11px] text-[#42594D] font-bold flex items-center gap-1">
                <Check className="w-3 h-3" /> Promo Code "{appliedPromo}" Applied!
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-stone-200 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium text-stone-900">₹{subtotal.toFixed(0)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C96F4F] font-semibold">
                  <span>Savings:</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Boutique Shipping:</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="text-[#42594D]">FREE</strong>
                  ) : (
                    `₹${shippingCost.toFixed(0)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Estimated Total:</span>
                <span className="font-serif text-lg">₹{grandTotal.toFixed(0)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              id="proceed-to-checkout-btn"
              onClick={onCheckout}
              className="w-full py-3.5 bg-[#2E3A2F] text-white hover:bg-[#3E3836] rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md transition transform active:scale-95"
            >
              <span>Proceed to Boutique Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#D9C9B2]" />
            </button>

            <p className="text-[10px] text-center text-stone-400">
              🔒 256-bit SSL encrypted • Proof verified before printing
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
