import React from 'react';
import { Star, Heart, Sparkles, Wand2 } from 'lucide-react';
import { Product } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getProductWhatsAppUrl } from '../config/whatsapp';

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCustomize,
  isWishlisted,
  onToggleWishlist,
}) => {
  const badgeColors: Record<string, string> = {
    'Bestseller': 'bg-[#D9C9B2]/30 text-[#2E3A2F] border-[#D9C9B2]',
    'Twin Favorite': 'bg-[#C96F4F]/15 text-[#C96F4F] border-[#D9C9B2]',
    'Handcrafted': 'bg-[#6B7F5B]/15 text-[#6B7F5B] border-[#6B7F5B]/30',
    'New': 'bg-[#2E3A2F]/10 text-[#2E3A2F] border-[#D9C9B2]',
    'Popular': 'bg-[#F8F6EE] text-[#6B7F5B] border-[#D9C9B2]',
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group glass-panel glass-panel-hover floating-window rounded-3xl border border-white/85 overflow-hidden flex flex-col relative shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/4.2] overflow-hidden bg-[#F8F6EE]/60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover secondary image if available */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
            loading="lazy"
          />
        )}

        {/* Top Badges (Glass Capsules) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border shadow-2xs backdrop-blur-xs ${badgeColors[product.badge] || 'bg-white/90 text-stone-800'}`}>
              {product.badge}
            </span>
          )}
          {product.isPersonalizable && (
            <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full glass-dock text-[#2E3A2F] border border-white/80 shadow-2xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C96F4F]" />
              Personalizable
            </span>
          )}
        </div>

        {/* Wishlist Button (Glass Circle) */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass-dock flex items-center justify-center text-stone-700 hover:text-[#C96F4F] shadow-2xs transition-transform hover:scale-110 z-10 border border-white/85"
          aria-label="Save to Wishlist"
        >
          <Heart 
            className={`w-4 h-4 ${isWishlisted ? 'fill-[#C96F4F] text-[#C96F4F]' : 'text-stone-600'}`} 
          />
        </button>

        {/* Quick Customize & WhatsApp Floating Glass Overlay CTA on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:flex items-center gap-2 z-20">
          <button
            onClick={() => onCustomize(product)}
            className="flex-1 py-2.5 bg-[#2E3A2F]/90 hover:bg-[#2E3A2F] text-white text-xs font-semibold rounded-xl shadow-md backdrop-blur-md flex items-center justify-center gap-1.5 transition border border-white/20"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#D9C9B2]" />
            <span>Customize</span>
          </button>
          <a
            href={getProductWhatsAppUrl(product.name, product.price)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-2.5 bg-[#25D366]/95 hover:bg-[#25D366] text-white text-xs font-bold rounded-xl shadow-md backdrop-blur-md flex items-center justify-center gap-1 transition border border-[#A7F3D0]/60"
            title={`Ask about ${product.name} on WhatsApp`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Category & Lead Time */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
            <span>{product.categoryLabel}</span>
            <span className="text-stone-400 text-[10px]">{product.leadTime.split('in ')[1] || 'Ready in 2 days'}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onCustomize(product)}
            className="font-serif font-bold text-base text-[#2E3A2F] group-hover:text-[#C96F4F] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Reviews and Mobile CTA */}
        <div className="pt-2 border-t border-stone-100 space-y-3">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#C96F4F]">
                ₹{product.price.toFixed(0)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-[#C96F4F] text-[#C96F4F]" />
              <span className="font-semibold text-stone-800">{product.rating.toFixed(2)}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Action button row for mobile */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              id={`customize-action-btn-${product.id}`}
              onClick={() => onCustomize(product)}
              className="flex-1 py-2.5 bg-[#2E3A2F] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#D9C9B2]" />
              <span>Customize</span>
            </button>
            <a
              href={getProductWhatsAppUrl(product.name, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3.5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-xs shrink-0"
              title={`Ask about ${product.name} on WhatsApp`}
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>Chat</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
