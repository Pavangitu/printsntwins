import React from 'react';
import { X, Heart, Sparkles, Trash2, ArrowRight, Wand2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onCustomizeItem: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onCustomizeItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="wishlist-modal-container"
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#F8F6EE]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C96F4F] fill-[#C96F4F]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Your Saved Keepsakes ({wishlistItems.length})
              </h3>
              <p className="text-xs text-stone-500">
                Treasured gift inspirations saved for upcoming birthdays, anniversaries &amp; milestones
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-base font-bold text-stone-800">
                No saved keepsakes yet
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any star map, personalized mug, or twin hoodie to save it for later inspiration!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-full bg-[#2E3A2F] text-white text-xs font-semibold hover:bg-stone-800 transition"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#F8F6EE] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#C96F4F]">
                      {item.categoryLabel}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1">
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-stone-800">
                      ₹{item.price.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      onCustomizeItem(item);
                      onClose();
                    }}
                    className="px-4 py-2 bg-[#2E3A2F] text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-[#D9C9B2]" />
                    <span>Customize &amp; Order</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(item)}
                    className="p-2 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-100 transition"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-[#F8F6EE] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 text-white rounded-full text-xs font-semibold hover:bg-stone-900 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
