import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getContactEnquiryWhatsAppUrl, openWhatsApp } from '../config/whatsapp';

interface CustomInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomInquiryModal: React.FC<CustomInquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Wedding & Bridal Favors');
  const [quantity, setQuantity] = useState('25-50 items');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendViaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert("Please fill in your name and vision details to send via WhatsApp.");
      return;
    }

    const url = getContactEnquiryWhatsAppUrl({
      name,
      phone,
      email,
      productOrService: `${inquiryType} (${quantity})`,
      message,
    });

    openWhatsApp(url);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="custom-inquiry-modal-container"
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col my-auto"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#F8F6EE]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#C96F4F]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Bespoke &amp; Bulk Studio Inquiry
              </h3>
              <p className="text-xs text-stone-500">
                Weddings, Corporate Gifting, Events &amp; Custom Printing Projects
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

        {/* Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jessica Adams"
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jessica@example.com"
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Event / Purpose</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                  >
                    <option value="Wedding & Bridal Favors">Wedding &amp; Favors</option>
                    <option value="Corporate Holiday Hampers">Corporate Hampers</option>
                    <option value="Twin Celebration / Reunion">Twin Reunion</option>
                    <option value="Bespoke One-of-a-Kind Art">Custom Artwork</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Estimated Quantity</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                  >
                    <option value="1-5 bespoke items">1–5 bespoke items</option>
                    <option value="10-25 items">10–25 items</option>
                    <option value="25-100 items">25–100 items</option>
                    <option value="100+ bulk items">100+ bulk items</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Phone / WhatsApp Number (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Tell us about your creative vision</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe colors, preferred materials, dates, or custom logos you want to incorporate..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 transition"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#2E3A2F] text-white hover:bg-[#3E3836] rounded-full font-bold text-xs shadow-md flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-3.5 h-3.5 text-[#D9C9B2]" />
                  <span>Submit via Email</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E5EBE7] text-[#42594D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-stone-900">
                Thank You, {name}!
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                Our bespoke craft director will review your inquiry and email you a personalized design proposal &amp; pricing guide within 12 hours.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#2E3A2F] text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition"
              >
                Return to Shop
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
