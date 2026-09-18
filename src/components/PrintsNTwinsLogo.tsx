import React from 'react';

interface PrintsNTwinsLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'emblem' | 'full' | 'stacked';
  className?: string;
  showTagline?: boolean;
  onClick?: () => void;
}

export const PrintsNTwinsLogo: React.FC<PrintsNTwinsLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  showTagline = true,
  onClick,
}) => {
  // Dimension maps
  const dimensionMap = {
    xs: { emblem: 28, text: 'text-base', sub: 'text-[8px]', gap: 'gap-2' },
    sm: { emblem: 36, text: 'text-lg', sub: 'text-[9px]', gap: 'gap-2.5' },
    md: { emblem: 46, text: 'text-2xl', sub: 'text-[10px]', gap: 'gap-3' },
    lg: { emblem: 60, text: 'text-3xl', sub: 'text-xs', gap: 'gap-3.5' },
    xl: { emblem: 90, text: 'text-4xl', sub: 'text-xs', gap: 'gap-4' },
    '2xl': { emblem: 140, text: 'text-5xl', sub: 'text-sm', gap: 'gap-5' },
  };

  const currentDim = dimensionMap[size] || dimensionMap.md;

  // The official gold medallion logo
  const emblemSvg = (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 select-none shadow-md ring-1 ring-[#D4AF37]/30`}
      style={{ width: currentDim.emblem, height: currentDim.emblem }}
    >
      <img
        src="/logo.png"
        alt="printsntwins official monogram logo"
        className="w-full h-full object-cover rounded-full"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  if (variant === 'emblem') {
    return (
      <div 
        className={`inline-block ${onClick ? 'cursor-pointer' : ''} ${className}`} 
        onClick={onClick}
        title="printsntwins • Creative Gifts For Every Occasion"
      >
        {emblemSvg}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div 
        className={`flex flex-col items-center text-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
      >
        {emblemSvg}
        <div className="mt-2.5 flex flex-col items-center">
          <span className={`font-serif font-bold tracking-tight text-[#2E3A2F] ${currentDim.text}`}>
            printsntwins
          </span>
          {showTagline && (
            <span className={`uppercase tracking-[0.22em] text-[#6B7F5B] font-semibold ${currentDim.sub} mt-0.5`}>
              Creative Gifts For Every Occasion
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default 'full' horizontal brand header
  return (
    <div 
      className={`flex items-center ${currentDim.gap} ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      onClick={onClick}
    >
      {emblemSvg}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif font-bold tracking-tight text-[#2E3A2F] group-hover:text-[#C96F4F] transition-colors leading-tight ${currentDim.text}`}>
            printsntwins
          </span>
        </div>
        {showTagline && (
          <span className={`uppercase tracking-[0.2em] text-[#6B7F5B] font-medium leading-none ${currentDim.sub} mt-0.5`}>
            Creative Gifts For Every Occasion
          </span>
        )}
      </div>
    </div>
  );
};
