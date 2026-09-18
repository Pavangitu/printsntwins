import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getGeneralWhatsAppUrl, WHATSAPP_DISPLAY_PHONE } from '../config/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showGreeting, setShowGreeting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user already dismissed the greeting in this session
    try {
      const dismissed = sessionStorage.getItem('pnt_wa_greeting_closed');
      if (dismissed === 'true') {
        setIsDismissed(true);
        return;
      }
    } catch {
      // Storage access safety
    }

    // Display greeting bubble after a pleasant 2.5s delay
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismissGreeting = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowGreeting(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('pnt_wa_greeting_closed', 'true');
    } catch {
      // Storage safety
    }
  };

  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <aside 
      aria-label="WhatsApp Direct Support"
      className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end pointer-events-none select-none"
    >
      {/* Optional Greeting Bubble */}
      {showGreeting && !isDismissed && (
        <div 
          role="region"
          aria-live="polite"
          className="pointer-events-auto mb-3 max-w-[280px] sm:max-w-xs bg-white text-stone-900 rounded-2xl p-3.5 shadow-2xl border border-stone-200/80 transition-all duration-300 animate-fadeIn relative backdrop-blur-md"
        >
          {/* Close button */}
          <button
            onClick={handleDismissGreeting}
            aria-label="Close WhatsApp greeting"
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-[#25D366]"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Greeting Header */}
          <div className="flex items-center gap-2 mb-1.5 pr-6">
            <div className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#128C7E] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D9C9B2]" />
              Artisan Concierge
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-left group"
          >
            <p className="text-xs font-semibold text-stone-800 leading-snug group-hover:text-[#128C7E] transition-colors">
              Need help? Chat with us on WhatsApp 👋
            </p>
            <p className="text-[11px] text-stone-500 mt-1 leading-normal">
              Quick questions on custom proofs, pricing, or orders.
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#128C7E] mt-2 group-hover:underline">
              Start chat now &rarr;
            </span>
          </a>

          {/* Little tail pointing to the floating button */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-stone-200/80 transform rotate-45" />
        </div>
      )}

      {/* Floating Main WhatsApp Button */}
      <a
        id="floating-whatsapp-chat-button"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="pointer-events-auto group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white shadow-xl shadow-[#25D366]/35 hover:shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 border border-[#1ebd5b]"
      >
        {/* Subtle pulsing aura behind icon */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-40" />

        {/* WhatsApp Icon */}
        <div className="relative flex items-center justify-center shrink-0">
          <WhatsAppIcon className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
          {/* Online green dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#F8F6EE] border-2 border-[#25D366] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
        </div>

        {/* Desktop Text */}
        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-xs font-bold tracking-wide">
            Chat with us
          </span>
          <span className="text-[10px] text-emerald-100 font-medium opacity-90">
            WhatsApp Concierge
          </span>
        </div>

        {/* Mobile text badge (compact) */}
        <span className="sm:hidden text-xs font-bold tracking-wide">
          Chat
        </span>
      </a>
    </aside>
  );
};
