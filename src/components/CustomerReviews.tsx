import React from 'react';
import { Star, CheckCircle2, Heart, Sparkles, Quote } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="bg-[#F8F6EE] py-16 border-t border-[#D9C9B2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2E6] text-[#A8791C] border border-[#EBD6B0] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>4.97 ★ Studio Satisfaction Rating</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Crafted With Care, <span className="italic font-normal text-[#C96F4F]">Received With Tears of Joy</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            From childhood besties and soulmate twins to newlyweds celebrating first anniversaries, here is what our thoughtful gift-giving community has to say.
          </p>
        </div>

        {/* Review Cards Grid (Floating Glass Windows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="glass-panel glass-panel-hover floating-window p-6 rounded-3xl border border-white/85 shadow-md flex flex-col justify-between space-y-4 hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="space-y-3">
                {/* Customer Photo if available */}
                {review.customerPhoto && (
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 relative shadow-inner">
                    <img
                      src={review.customerPhoto}
                      alt={`${review.author}'s unboxing`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full glass-dark text-[9px] text-white font-medium flex items-center gap-1 border border-white/20">
                      <Heart className="w-2.5 h-2.5 fill-white" /> Verified Unboxing
                    </span>
                  </div>
                )}

                {/* Star rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C96F4F] text-[#C96F4F]" />
                  ))}
                  <span className="text-[11px] text-stone-400 ml-1.5">{review.date}</span>
                </div>

                {/* Review Title & Quote */}
                <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                  "{review.title}"
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-stone-200/60 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">{review.author}</span>
                  <span className="text-[10px] text-stone-400">{review.location}</span>
                </div>
                <p className="text-[10px] text-[#C96F4F] font-medium truncate">
                  Purchased: {review.productName}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Brand Core Pillars Strip (Floating Glass Windows) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center text-xs">
          <div className="p-4 rounded-2xl glass-panel floating-window border border-white/80 shadow-xs hover:bg-white transition-all space-y-1">
            <span className="text-base">✨</span>
            <h5 className="font-bold text-stone-800">100% Meaningful</h5>
            <p className="text-[11px] text-stone-500">Every piece tells your unique story</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel floating-window border border-white/80 shadow-xs hover:bg-white transition-all space-y-1">
            <span className="text-base">🌿</span>
            <h5 className="font-bold text-stone-800">Eco-Kind Crafting</h5>
            <p className="text-[11px] text-stone-500">FSC certified papers &amp; bamboo</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel floating-window border border-white/80 shadow-xs hover:bg-white transition-all space-y-1">
            <span className="text-base">💌</span>
            <h5 className="font-bold text-stone-800">Handwritten Cards</h5>
            <p className="text-[11px] text-stone-500">Fountain ink calligraphy included</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel floating-window border border-white/80 shadow-xs hover:bg-white transition-all space-y-1">
            <span className="text-base">🤝</span>
            <h5 className="font-bold text-stone-800">Happiness Guarantee</h5>
            <p className="text-[11px] text-stone-500">Free reprint proof protection</p>
          </div>
        </div>

      </div>
    </section>
  );
};
