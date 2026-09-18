import React from 'react';
import { 
  Sparkles, 
  SlidersHorizontal, 
  Heart, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Smile, 
  Flower2, 
  Shirt, 
  CreditCard, 
  RotateCcw,
  Check
} from 'lucide-react';
import { ProductCategory, OccasionTag, RecipientTag } from '../types';

interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedOccasion: OccasionTag | 'all';
  onSelectOccasion: (occ: OccasionTag | 'all') => void;
  selectedRecipient: RecipientTag | 'all';
  onSelectRecipient: (rec: RecipientTag | 'all') => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
  onResetFilters: () => void;
  activeCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedOccasion,
  onSelectOccasion,
  selectedRecipient,
  onSelectRecipient,
  sortBy,
  onSortChange,
  onResetFilters,
  activeCount,
}) => {
  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Menu Offerings', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'bill-books', label: 'Bill Books', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
    { id: 'photo-cards', label: 'Photo Cards', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'customized-stickers', label: 'Customized Stickers', icon: <Smile className="w-3.5 h-3.5" /> },
    { id: 'pipe-cleaner-crafts', label: 'Pipe Cleaner Crafts', icon: <Flower2 className="w-3.5 h-3.5" /> },
    { id: 'tshirts-printing', label: 'Tshirts Printing', icon: <Shirt className="w-3.5 h-3.5" /> },
    { id: 'visiting-cards', label: 'Visiting Cards', icon: <CreditCard className="w-3.5 h-3.5" /> },
  ];

  const occasions: (OccasionTag | 'all')[] = [
    'all',
    'Birthday',
    'Anniversary',
    'Wedding',
    'Twins & Besties',
    'New Baby',
    'Love & Romance',
  ];

  const recipients: (RecipientTag | 'all')[] = [
    'all',
    'For Her',
    'For Him',
    'For Couples',
    'For Twins & Besties',
    'For Parents',
  ];

  const isFiltered = selectedCategory !== 'all' || selectedOccasion !== 'all' || selectedRecipient !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-4 relative z-20">
      <div className="glass-dock floating-window rounded-3xl p-4 sm:p-5 border border-white/85 shadow-lg space-y-4">
        
        {/* Main Category Tabs (Glass Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#2E3A2F] text-white shadow-xs border border-[#2E3A2F]'
                    : 'glass-pill text-[#2E3A2F] hover:bg-white hover:border-[#C96F4F]/50'
                }`}
              >
                <span className={isSelected ? 'text-[#D9C9B2]' : 'text-[#6B7F5B]'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-Filters: Occasions, Recipients, and Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#D9C9B2]/40 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Occasion select */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Occasion:</span>
              <select
                id="occasion-filter-select"
                value={selectedOccasion}
                onChange={(e) => onSelectOccasion(e.target.value as OccasionTag | 'all')}
                className="bg-white/80 backdrop-blur-xs border border-[#D9C9B2] rounded-xl px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:border-[#C96F4F] cursor-pointer shadow-2xs"
              >
                <option value="all">Any Occasion</option>
                {occasions.filter(o => o !== 'all').map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            {/* Recipient select */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">For:</span>
              <select
                id="recipient-filter-select"
                value={selectedRecipient}
                onChange={(e) => onSelectRecipient(e.target.value as RecipientTag | 'all')}
                className="bg-white/80 backdrop-blur-xs border border-[#D9C9B2] rounded-xl px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:border-[#C96F4F] cursor-pointer shadow-2xs"
              >
                <option value="all">Everyone</option>
                {recipients.filter(r => r !== 'all').map((rec) => (
                  <option key={rec} value={rec}>{rec}</option>
                ))}
              </select>
            </div>

            {/* Reset button if active */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-stone-500 hover:text-[#C96F4F] font-medium py-1 px-2.5 rounded-full hover:bg-white/80 border border-transparent hover:border-[#D9C9B2] transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Right: Sort and Count */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-stone-500 font-medium">
              {activeCount} {activeCount === 1 ? 'gift' : 'gifts'}
            </span>
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                id="sort-products-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="bg-white/80 backdrop-blur-xs border border-[#D9C9B2] rounded-xl px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:border-[#C96F4F] cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured Curations</option>
                <option value="rating">Highest Rated (★ 5.0)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
