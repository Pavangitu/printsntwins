import React, { useState } from 'react';
import { 
  X, 
  Gift, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  ShoppingBag,
  Percent
} from 'lucide-react';
import { BOX_BUILDER_ITEMS } from '../data/products';
import { BoxBuilderItem, Product, CustomizationState } from '../types';

interface GiftBoxBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBoxToCart: (product: Product, customization: CustomizationState) => void;
}

const BOX_DESIGNS = [
  {
    id: 'blush-velvet',
    name: 'Blush Petal & Rose Silk',
    color: '#F4EAE6',
    ribbonColor: '#B76E79',
    ribbonName: 'Rose Dust Satin Ribbon',
    tag: 'Popular',
    desc: 'Soft powdered blush exterior with metallic gold foil printsntwins crest'
  },
  {
    id: 'sage-linen',
    name: 'Sage Botanical & Velvet Moss',
    color: '#E5EBE7',
    ribbonColor: '#42594D',
    ribbonName: 'Moss Velvet Ribbon',
    tag: 'Earthy & Calm',
    desc: 'Calming botanical green with earthy forest green ribbon'
  },
  {
    id: 'midnight-gold',
    name: 'Midnight & Champagne Gold',
    color: '#1E232A',
    ribbonColor: '#C5A059',
    ribbonName: 'Champagne Gold Luster Ribbon',
    tag: 'Luxury Evening',
    desc: 'Deep obsidian black box with brilliant warm champagne gold foil'
  },
  {
    id: 'kraft-artisan',
    name: 'Artisan Eco Kraft & Twill',
    color: '#E8DFD3',
    ribbonColor: '#8C6239',
    ribbonName: 'Caramel Herringbone Twill',
    tag: '100% Recycled',
    desc: 'Warm tactile textured craft paper with herringbone twill tie'
  }
];

const CARD_DESIGNS = [
  { id: 'twin', label: 'To My Twin / Soulmate', icon: '👭' },
  { id: 'birthday', label: 'Happiest Birthday', icon: '🎂' },
  { id: 'anniversary', label: 'With All My Love', icon: '🥂' },
  { id: 'thinking', label: 'Thinking of You', icon: '🌿' },
  { id: 'celebrate', label: 'A Little Celebration', icon: '✨' },
];

export const GiftBoxBuilder: React.FC<GiftBoxBuilderProps> = ({
  isOpen,
  onClose,
  onAddBoxToCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBox, setSelectedBox] = useState(BOX_DESIGNS[0]);
  const [selectedItems, setSelectedItems] = useState<BoxBuilderItem[]>([
    BOX_BUILDER_ITEMS[0], // Ceramic mug default
    BOX_BUILDER_ITEMS[1], // Candle default
    BOX_BUILDER_ITEMS[3], // Chocolate default
  ]);
  const [cardDesign, setCardDesign] = useState(CARD_DESIGNS[0].id);
  const [recipientName, setRecipientName] = useState('Sarah & Jordan');
  const [cardMessage, setCardMessage] = useState(
    'Wishing you the sweetest, brightest moments. You deserve every ounce of happiness in this world!'
  );

  const toggleItem = (item: BoxBuilderItem) => {
    const exists = selectedItems.find(i => i.id === item.id);
    if (exists) {
      if (selectedItems.length <= 2) {
        alert('Please choose at least 2 items for your custom gift box.');
        return;
      }
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      if (selectedItems.length >= 5) {
        alert('You have reached the maximum of 5 items for this box size.');
        return;
      }
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Base box packaging cost ₹100, plus item totals, with 12% bundle discount
  const itemsSubtotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const baseBoxPrice = 100;
  const rawTotal = itemsSubtotal + baseBoxPrice;
  const bundleDiscount = Math.round(rawTotal * 0.12); // 12% gift bundle discount
  const finalPrice = Math.max(0, rawTotal - bundleDiscount);

  const handleFinishBox = () => {
    const dummyProduct: Product = {
      id: `custom-box-${Date.now()}`,
      name: `Custom Curated Gift Box (${selectedBox.name})`,
      slug: 'custom-curated-box',
      tagline: `Filled with: ${selectedItems.map(i => i.name).join(', ')}`,
      category: 'pipe-cleaner-crafts',
      categoryLabel: 'Pipe Cleaner Crafts & Gift Sets',
      price: finalPrice,
      originalPrice: rawTotal,
      rating: 5.0,
      reviewCount: 1,
      image: selectedItems[0]?.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=95',
      description: `Bespoke gift box packed in ${selectedBox.name} with handwritten card message: "${cardMessage}"`,
      craftDetails: [
        `Box: ${selectedBox.name}`,
        `Ribbon: ${selectedBox.ribbonName}`,
        `Included Gifts: ${selectedItems.map(i => i.name).join(', ')}`,
        'Handwritten fountain pen card included'
      ],
      leadTime: 'Crafted & boxed in 24 hours',
      isPersonalizable: true,
      occasionTags: ['Twins & Besties', 'Birthday', 'Just Because'],
      recipientTags: ['For Twins & Besties', 'For Her'],
      mockupType: 'box',
      customizationOptions: {
        requiresName: true,
        requiresMessage: true,
      }
    };

    const dummyCustomization: CustomizationState = {
      recipientName: recipientName,
      customMessage: `Included items: ${selectedItems.map(i => i.name).join(', ')}`,
      specialDate: new Date().toISOString().split('T')[0],
      selectedFont: 'script',
      selectedColor: selectedBox.ribbonColor,
      selectedStyle: selectedBox.name,
      giftWrap: true,
      giftCardMessage: cardMessage,
    };

    onAddBoxToCart(dummyProduct, dummyCustomization);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="gift-box-builder-container"
        className="glass-panel floating-window rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-white/85 flex flex-col my-auto max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#D9C9B2]/60 flex items-center justify-between glass-dock">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C96F4F]/15 text-[#C96F4F] flex items-center justify-center border border-[#D9C9B2]/60 shadow-xs">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2E3A2F] flex items-center gap-2">
                <span>Build A Custom Gift Box Studio</span>
                <span className="text-[11px] font-sans font-semibold bg-[#C96F4F]/15 text-[#C96F4F] px-2.5 py-0.5 rounded-full border border-[#C96F4F]/20">
                  12% Bundle Savings
                </span>
              </h2>
              <p className="text-xs text-stone-500">
                Curate custom personalized items, choose luxury packaging &amp; write your card
              </p>
            </div>
          </div>

          <button
            id="close-box-builder-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-[#F8F6F0] px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 transition ${step === 1 ? 'text-[#C96F4F]' : 'text-stone-400'}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-[#C96F4F] text-white' : 'bg-stone-200 text-stone-600'}`}>
                1
              </span>
              <span>1. Box &amp; Ribbon</span>
            </button>

            <span className="text-stone-300">/</span>

            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 transition ${step === 2 ? 'text-[#C96F4F]' : 'text-stone-400'}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-[#C96F4F] text-white' : 'bg-stone-200 text-stone-600'}`}>
                2
              </span>
              <span>2. Pick 3–5 Gifts ({selectedItems.length}/5)</span>
            </button>

            <span className="text-stone-300">/</span>

            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-2 transition ${step === 3 ? 'text-[#C96F4F]' : 'text-stone-400'}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-[#C96F4F] text-white' : 'bg-stone-200 text-stone-600'}`}>
                3
              </span>
              <span>3. Handwritten Card</span>
            </button>

            <span className="text-stone-300">/</span>

            <button
              onClick={() => setStep(4)}
              className={`flex items-center gap-2 transition ${step === 4 ? 'text-[#C96F4F]' : 'text-stone-400'}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-[#C96F4F] text-white' : 'bg-stone-200 text-stone-600'}`}>
                4
              </span>
              <span>4. Final Reveal</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-stone-700">
            <span className="text-stone-400">Bundle Price:</span>
            <span className="font-bold text-stone-900">₹{finalPrice.toFixed(0)}</span>
          </div>
        </div>

        {/* Studio Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* STEP 1: CHOOSE BOX & RIBBON */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Choose Your Keepsake Box &amp; Ribbon
                </h3>
                <p className="text-xs text-stone-500">
                  Every box is made with rigid 1200gsm board, foil stamped with printsntwins and tied by hand with lustrous ribbon.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {BOX_DESIGNS.map((box) => {
                  const isSelected = selectedBox.id === box.id;
                  return (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? 'border-[#C96F4F] bg-[#F8F6EE] shadow-md ring-2 ring-[#C96F4F]/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {/* Box color chip */}
                          <div 
                            className="w-10 h-10 rounded-xl shadow-xs border border-black/10 flex items-center justify-center relative overflow-hidden"
                            style={{ backgroundColor: box.color }}
                          >
                            <div 
                              className="w-2 h-full absolute transform -rotate-12 shadow-xs"
                              style={{ backgroundColor: box.ribbonColor }} 
                            />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-stone-800 block">
                              {box.name}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              Ribbon: {box.ribbonName}
                            </span>
                          </div>
                        </div>

                        {isSelected ? (
                          <span className="w-6 h-6 rounded-full bg-[#C96F4F] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full font-medium">
                            {box.tag}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {box.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT 3 TO 5 GIFTS */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Pick 3 to 5 Handcrafted Treasures
                  </h3>
                  <p className="text-xs text-stone-500">
                    Click items to pack into your gift box ({selectedItems.length} of 5 selected)
                  </p>
                </div>
                
                {/* Visual selected tray */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-700">In Box:</span>
                  <div className="flex items-center gap-1.5">
                    {selectedItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="relative w-8 h-8 rounded-lg overflow-hidden border border-stone-200 group"
                        title={item.name}
                      >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleItem(item)}
                          className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 5 - selectedItems.length) }).map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-lg border border-dashed border-stone-300 flex items-center justify-center text-stone-400 text-xs">
                        +
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BOX_BUILDER_ITEMS.map((item) => {
                  const isSelected = selectedItems.some(i => i.id === item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C96F4F] bg-[#F8F6EE] shadow-sm ring-1 ring-[#C96F4F]'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-stone-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          {item.badge && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold rounded-full bg-white/90 text-stone-800">
                              {item.badge}
                            </span>
                          )}
                          <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition ${
                            isSelected ? 'bg-[#C96F4F] text-white' : 'bg-white/80 text-stone-600'
                          }`}>
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-stone-400 uppercase font-semibold">{item.category}</span>
                            <span className="text-xs font-bold text-stone-900">₹{item.price.toFixed(0)}</span>
                          </div>
                          <h4 className="text-xs font-bold text-stone-900 line-clamp-1 mt-0.5">{item.name}</h4>
                          <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">{item.description}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`w-full mt-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          isSelected
                            ? 'bg-[#C96F4F] text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {isSelected ? '✓ Added to Box' : '+ Add Item'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: HANDWRITTEN CARD */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Write Your Handwritten Calligraphy Note
                </h3>
                <p className="text-xs text-stone-500">
                  Our calligraphy artists handwrite your note using vintage fountain ink on heavy archival cardstock.
                </p>
              </div>

              {/* Card Style Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  Select Card Design:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CARD_DESIGNS.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setCardDesign(card.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition ${
                        cardDesign === card.id
                          ? 'border-[#C96F4F] bg-[#F8F6EE] text-[#C96F4F] ring-1 ring-[#C96F4F]'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-sm">{card.icon}</span>
                      <span>{card.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">
                  Recipient Name(s):
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Maya & Liam"
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                />
              </div>

              {/* Card Letterpress Simulation Card */}
              <div className="p-6 rounded-2xl bg-[#FDFBF7] border-2 border-[#E8DFD3] shadow-sm relative space-y-3">
                <div className="flex items-center justify-between border-b border-[#E8DFD3] pb-2">
                  <span className="font-serif text-xs font-bold text-stone-800 tracking-wider">
                    PRINTSNTWINS CALLIGRAPHY CARD
                  </span>
                  <span className="text-[10px] text-[#C96F4F] font-script text-base">
                    Handwritten with love
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Pour your heart out here..."
                  className="w-full bg-transparent border-none text-stone-800 font-script text-2xl leading-relaxed focus:outline-none resize-none placeholder:text-stone-300"
                  maxLength={240}
                />

                <div className="flex justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-200/60">
                  <span>Included complimentary with all curated gift boxes</span>
                  <span>{240 - cardMessage.length} chars left</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FINAL REVEAL & ADD TO CART */}
          {step === 4 && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#FAF0EB] text-[#C96F4F] flex items-center justify-center mx-auto border border-[#D9C9B2]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Your Bespoke Hamper Is Ready!
                </h3>
                <p className="text-xs text-stone-500">
                  Packed in {selectedBox.name} with {selectedItems.length} handcrafted items and your personal calligraphy message.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F8F6EE] p-6 rounded-3xl border border-stone-200 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left: Box details */}
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-wider text-[#C96F4F] font-bold block">
                      Packaging &amp; Ribbon
                    </span>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                      <div 
                        className="w-10 h-10 rounded-lg shrink-0 border border-black/10"
                        style={{ backgroundColor: selectedBox.color }}
                      />
                      <div>
                        <h5 className="text-xs font-bold text-stone-900">{selectedBox.name}</h5>
                        <p className="text-[11px] text-stone-500">{selectedBox.ribbonName}</p>
                      </div>
                    </div>

                    <span className="text-xs uppercase tracking-wider text-[#C96F4F] font-bold block pt-2">
                      Handwritten Note to {recipientName}
                    </span>
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                      <p className="font-script text-xl text-stone-800 leading-snug">
                        "{cardMessage}"
                      </p>
                    </div>
                  </div>

                  {/* Right: Items Inside */}
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-wider text-[#C96F4F] font-bold block">
                      Items Inside Box ({selectedItems.length})
                    </span>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-stone-200 text-xs">
                          <div className="flex items-center gap-2.5">
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                            <span className="font-medium text-stone-800">{item.name}</span>
                          </div>
                          <span className="font-bold text-stone-900">₹{item.price.toFixed(0)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price calculation with discount */}
                    <div className="pt-3 border-t border-stone-200 text-xs space-y-1.5">
                      <div className="flex justify-between text-stone-500">
                        <span>Items Subtotal:</span>
                        <span>₹{itemsSubtotal.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-stone-500">
                        <span>Keepsake Box &amp; Ribbon:</span>
                        <span>₹{baseBoxPrice.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-[#C96F4F] font-semibold">
                        <span className="flex items-center gap-1">
                          <Percent className="w-3.5 h-3.5" />
                          Bundle Discount (12% OFF):
                        </span>
                        <span>-₹{bundleDiscount.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-stone-900 pt-1 border-t border-stone-200">
                        <span>Total:</span>
                        <span>₹{finalPrice.toFixed(0)}</span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          )}

        </div>

        {/* Studio Footer Navigation Controls */}
        <div className="px-6 py-4 border-t border-stone-200 bg-[#F8F6EE] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2.5 rounded-full border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-100 flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((step + 1) as any)}
              className="px-6 py-2.5 rounded-full bg-[#2E3A2F] text-white text-xs font-semibold hover:bg-[#3E3836] flex items-center gap-1.5 transition shadow-xs"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              id="add-finished-box-to-cart-btn"
              onClick={handleFinishBox}
              className="px-8 py-3 rounded-full bg-[#C96F4F] text-white text-xs font-bold hover:bg-[#9E4A31] flex items-center gap-2 transition shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Custom Hamper to Cart (₹{finalPrice.toFixed(0)})</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
