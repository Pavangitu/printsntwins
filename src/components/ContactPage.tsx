import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Gift, 
  PackageCheck, 
  ShieldCheck, 
  ArrowLeft,
  Calendar,
  Layers,
  Instagram,
  ExternalLink
} from 'lucide-react';
import { PrintsNTwinsLogo } from './PrintsNTwinsLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { 
  WHATSAPP_DISPLAY_PHONE, 
  getContactPageWhatsAppUrl, 
  getContactEnquiryWhatsAppUrl, 
  getGeneralWhatsAppUrl, 
  openWhatsApp 
} from '../config/whatsapp';
import { sendContactEmail } from '../utils/emailService';


interface ContactPageProps {
  onBackToShop: () => void;
  onOpenTrackOrder: () => void;
  onOpenBoxBuilder: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToShop,
  onOpenTrackOrder,
  onOpenBoxBuilder,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'bill-books',
    address: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const topicMap: Record<string, string> = {
      'bill-books': 'Bill Books',
      'photo-cards': 'Photo Cards',
      'customized-stickers': 'Customized Stickers',
      'pipe-cleaner-crafts': 'Pipe Cleaner Crafts',
      'tshirts-printing': 'Tshirts Printing',
      'visiting-cards': 'Visiting Cards',
    };

    const ticketId = `PNT-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        topic: topicMap[formData.inquiryType] || formData.inquiryType,
        message: formData.message,
        time: new Date().toLocaleString("en-IN", { dateStyle: 'medium', timeStyle: 'short' }),
      }, ticketId);
    } catch (error: any) {
      console.warn('[ContactPage] Email dispatch issue logged:', error);
    } finally {
      setIsSubmitting(false);
      setSubmittedTicket(ticketId);
    }
  };

  const handleSendViaWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please enter at least your Name and Message to send via WhatsApp.");
      return;
    }

    const topicMap: Record<string, string> = {
      'bill-books': 'Bill Books',
      'photo-cards': 'Photo Cards',
      'customized-stickers': 'Customized Stickers',
      'pipe-cleaner-crafts': 'Pipe Cleaner Crafts',
      'tshirts-printing': 'Tshirts Printing',
      'visiting-cards': 'Visiting Cards',
    };

    const url = getContactEnquiryWhatsAppUrl({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      productOrService: topicMap[formData.inquiryType] || formData.inquiryType,
      message: formData.message,
    });

    openWhatsApp(url);
  };

  const faqs = [
    {
      q: 'Can I see a proof before my personalized gift is crafted and shipped?',
      a: 'Yes, absolutely! We provide a complimentary digital proof for all bespoke star maps, song plaques, and custom-engraved items. When you submit your order or inquiry, our design artisans prepare a visual preview within 2–4 hours for your sign-off before printing.'
    },
    {
      q: 'What is your typical production and delivery turnaround?',
      a: 'Individual custom gifts are hand-printed, inspected, and packaged within 24–48 hours. Domestic standard delivery takes 2–4 business days, while express courier shipping takes 1–2 business days. If you have an urgent anniversary or birthday deadline, let us know and we will prioritize your piece.'
    },
    {
      q: 'Can I customize matching items or order in bulk for bridal parties and twins?',
      a: 'Yes! "printsntwins" was born from creating coordinated, matching keepsakes for twins, couples, families, and best friends. We offer special tiered pricing and bespoke layout design for orders of 5 or more items.'
    },
    {
      q: 'What if I noticed a typo or mistake in my submitted message?',
      a: 'Contact us immediately via this form or email printsntwins@gmail.com. As long as your piece has not moved to active laser cutting or thermal pressing, our studio team will gladly amend your names, dates, or coordinates free of charge.'
    },
    {
      q: 'Are items delivered gift-ready with wrapping and greeting cards?',
      a: 'Every item from printsntwins comes thoughtfully presented in recyclable luxury tissue wrapping with our signature gold seal. You can also add our curated hard-shell keepsake box and a real handwritten calligraphy card during checkout or using our Build-A-Box studio.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F6EE] text-[#2E3A2F] pb-24">
      
      {/* Top Floating Glass Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="glass-dock floating-window rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between border border-white/85 shadow-sm">
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#C96F4F] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gift Boutique</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Home</span>
            <span>/</span>
            <span className="font-semibold text-stone-800">Studio &amp; Contact</span>
          </div>
        </div>
      </div>

      {/* Hero Header with Brand Hallmark */}
      <section className="relative overflow-hidden pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          
          {/* Official Logo Emblem Centered */}
          <div className="flex justify-center mb-2">
            <PrintsNTwinsLogo size="2xl" variant="emblem" className="hover:scale-105 transition-transform" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dock border border-white/80 text-[#C96F4F] text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D9C9B2]" />
            <span>Artisan Craft Studio • Customer Concierge</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2E3A2F]">
            Let’s Create Something <span className="italic font-normal text-[#C96F4F]">Memorable</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Whether you have a custom design idea, need help revising a proof, want to inquire about bulk twin gifts, or simply want to check on an order — our studio team is always here for you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="text-xs text-stone-500 font-medium">Quick Assistance:</span>
            <button
              onClick={onOpenTrackOrder}
              className="glass-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-stone-700 text-xs font-semibold hover:border-[#C96F4F] hover:text-[#C96F4F] hover:bg-white transition shadow-2xs"
            >
              <PackageCheck className="w-3.5 h-3.5 text-[#C96F4F]" />
              <span>Track Existing Order</span>
            </button>
            <button
              onClick={onOpenBoxBuilder}
              className="glass-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-stone-700 text-xs font-semibold hover:border-[#C96F4F] hover:text-[#C96F4F] hover:bg-white transition shadow-2xs"
            >
              <Gift className="w-3.5 h-3.5 text-[#C96F4F]" />
              <span>Build Custom Gift Box</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Channels & Studio Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dedicated WhatsApp Contact Card (Floating Glass Window) */}
            <div className="glass-panel floating-window rounded-3xl p-6 sm:p-7 border border-[#25D366]/40 shadow-md space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 text-[#15803d] text-xs font-bold border border-[#25D366]/30">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  Instant WhatsApp Concierge
                </span>
                <span className="text-[11px] font-semibold text-stone-500 font-mono">
                  {WHATSAPP_DISPLAY_PHONE}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                  <span>Chat with us on WhatsApp</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Have a question or need more information? Send us a message directly on WhatsApp.
                </p>
              </div>

              <a
                id="contact-page-whatsapp-btn"
                href={getContactPageWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white font-bold text-sm transition-all shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/35 flex items-center justify-center gap-2 group"
              >
                <WhatsAppIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>💬 Chat on WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-emerald-100/80">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  ⚡ 1-Click Direct Chat
                </span>
                <span>Replies within minutes</span>
              </div>
            </div>

            {/* Direct Studio Cards (Floating Glass Window) */}
            <div className="glass-panel floating-window rounded-3xl p-6 sm:p-7 border border-white/85 shadow-md space-y-5">
              <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Studio Concierge &amp; Channels
              </h3>

              {/* WhatsApp Direct Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F8EE] text-[#128C7E] flex items-center justify-center shrink-0 border border-[#A7F3D0]">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">WhatsApp &amp; Direct Phone</h4>
                  <a 
                    href={getGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-stone-800 hover:text-[#128C7E] transition inline-flex items-center gap-1.5"
                  >
                    <span>{WHATSAPP_DISPLAY_PHONE}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8F8EE] text-[#166534] font-semibold border border-[#86EFAC]">
                      Chat Now
                    </span>
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Monday to Saturday, 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8F6EE] text-[#C96F4F] flex items-center justify-center shrink-0 border border-[#D9C9B2]/60">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Email Studio</h4>
                  <a 
                    href="mailto:printsntwins@gmail.com" 
                    className="text-sm font-semibold text-stone-800 hover:text-[#C96F4F] transition block"
                  >
                    printsntwins@gmail.com
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    For proofs &amp; design mockups: printsntwins@gmail.com
                  </p>
                </div>
              </div>

              {/* Studio Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8F6EE] text-[#C96F4F] flex items-center justify-center shrink-0 border border-[#D9C9B2]/60">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Artisan Print Studio</h4>
                  <p className="text-sm font-semibold text-stone-800">
                    142 Magnolia Craft Lane, Suite 204
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Creative Arts District, Portland, OR 97201
                  </p>
                </div>
              </div>

              {/* Studio Operating Hours */}
              <div className="flex items-start gap-4 pt-2 border-t border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-[#F8F6EE] text-[#C96F4F] flex items-center justify-center shrink-0 border border-[#D9C9B2]/60">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Crafting &amp; Dispatch Hours</h4>
                  <div className="text-xs text-stone-600 mt-1 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-stone-800">Mon – Fri:</span>
                      <span>9:00 AM – 6:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-stone-800">Saturday:</span>
                      <span>10:00 AM – 4:00 PM IST</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Sunday:</span>
                      <span>Studio Closed for Family</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-3 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                  Social Channels
                </h4>
                <div className="flex items-center gap-2.5">
                  <a
                    href={getGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F8EE] text-[#166534] hover:bg-[#25D366] hover:text-white transition text-xs font-medium border border-[#A7F3D0]"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://instagram.com/printsntwins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-[#C96F4F] hover:text-white transition text-xs font-medium border border-stone-200"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>@printsntwins</span>
                  </a>
                  <a
                    href="mailto:printsntwins@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-800 hover:text-white transition text-xs font-medium border border-stone-200"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Artisan Guarantee Card (Floating Glass Window) */}
            <div className="glass-panel floating-window rounded-3xl p-5 sm:p-6 border border-white/85 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#C96F4F]">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  The printsntwins Studio Promise
                </h4>
              </div>
              <ul className="text-xs text-stone-700 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C96F4F] shrink-0" />
                  <span>Free digital proofing on all custom text &amp; dates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C96F4F] shrink-0" />
                  <span>Direct contact with the artisan creating your gift</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C96F4F] shrink-0" />
                  <span>100% happiness &amp; safe delivery guarantee</span>
                </li>
              </ul>
            </div>

            {/* Mini Brand Hallmark Banner (Floating Glass Dark Window) */}
            <div className="glass-dark floating-window text-white rounded-3xl p-5 sm:p-6 flex items-center gap-4 shadow-xl border border-white/15">
              <PrintsNTwinsLogo size="md" variant="emblem" />
              <div>
                <p className="text-xs text-[#D9C9B2] font-semibold uppercase tracking-wider">
                  Handcrafted with Care
                </p>
                <p className="font-serif text-sm font-bold text-white">
                  “Little Creations, Big Happiness”
                </p>
                <p className="text-[11px] text-stone-300 mt-0.5">
                  Proudly personalized &amp; printed in our Oregon studio.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact & Inquiry Form (Floating Glass Window) */}
          <div className="lg:col-span-7">
            <div className="glass-panel floating-window rounded-3xl p-7 sm:p-9 border border-white/85 shadow-xl">
              
              {submittedTicket ? (
                /* Success Confirmation View */
                <div className="py-12 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 bg-[#EBF5EE] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#C8E6C9]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#C96F4F] font-bold">
                      Message Received
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      Thank You, {formData.name || 'Friend'}!
                    </h3>
                    <p className="text-xs text-stone-500">
                      Reference Ticket ID: <strong className="text-stone-800 font-mono">{submittedTicket}</strong>
                    </p>
                  </div>

                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Our artisan team has received your message. We review all inquiries promptly and will email you back at <strong className="text-stone-800">{formData.email}</strong> within <strong>2–4 business hours</strong> with digital proofs or helpful guidance.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={onBackToShop}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#2E3A2F] text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition"
                    >
                      Return to Gift Boutique
                    </button>
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                      <span>Also Chat via WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmittedTicket(null);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          inquiryType: 'bill-books',
                          address: '',
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 bg-stone-100 text-stone-700 rounded-full text-xs font-semibold hover:bg-stone-200 transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* The Contact Form */
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      Send a Message to Our Studio
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Fill out the form below and our studio coordinators will reply with personal attention.
                    </p>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Your Name <span className="text-[#C96F4F]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        id="contact-form-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Charlotte Evans"
                        className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C96F4F]/20 focus:border-[#C96F4F] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Email Address <span className="text-[#C96F4F]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        id="contact-form-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., charlotte@example.com"
                        className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C96F4F]/20 focus:border-[#C96F4F] transition"
                      />
                    </div>
                  </div>

                  {/* Phone & Customer Address (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Phone Number <span className="text-stone-400 font-normal">(Optional, for SMS/WhatsApp)</span>
                      </label>
                      <input
                        type="tel"
                        id="contact-form-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C96F4F]/20 focus:border-[#C96F4F] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Customer Address <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="contact-form-address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g., Flat 4B, 123 Blossom St, City, Pincode"
                        className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C96F4F]/20 focus:border-[#C96F4F] transition"
                      />
                    </div>
                  </div>

                  {/* Inquiry Topic Select */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Topic of Inquiry <span className="text-[#C96F4F]">*</span>
                    </label>
                    <select
                      id="contact-form-topic"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C96F4F]/20 focus:border-[#C96F4F] transition text-stone-800"
                    >
                      <option value="bill-books">📋 Bill Books</option>
                      <option value="photo-cards">📸 Photo Cards</option>
                      <option value="customized-stickers">✨ Customized Stickers</option>
                      <option value="pipe-cleaner-crafts">🌸 Pipe Cleaner Crafts</option>
                      <option value="tshirts-printing">👕 Tshirts Printing</option>
                      <option value="visiting-cards">💳 Visiting Cards</option>
                    </select>
                  </div>

                  {/* Message details */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Message or Customization Details <span className="text-[#C96F4F]">*</span>
                    </label>
                    <textarea
                      required
                      id="contact-form-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share names, special dates, favorite colors, song titles/artists, or any bespoke ideas you would like us to bring to life..."
                      className="w-full px-3.5 py-2.5 bg-stone-50/70 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C96F4F]/20 focus:border-[#C96F4F] transition resize-y"
                    />
                  </div>

                  {/* Action Buttons: WhatsApp Direct Enquiry & Email Ticket */}
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Option: Send enquiry via WhatsApp */}
                      <button
                        type="button"
                        onClick={handleSendViaWhatsApp}
                        id="contact-form-whatsapp-btn"
                        className="w-full py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa52] text-white font-bold text-xs transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                        <span>Send enquiry via WhatsApp</span>
                      </button>

                      {/* Standard Email Ticket Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        id="contact-form-submit-btn"
                        className="w-full py-3.5 px-5 rounded-full bg-[#2E3A2F] text-white hover:bg-stone-800 disabled:bg-stone-400 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                      >
                        {isSubmitting ? (
                          <span>Submitting to Studio Artisans...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#D9C9B2]" />
                            <span>Send Message via Email</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 text-center">
                      ⚡ <strong>Instant WhatsApp:</strong> Clicking <em>Send enquiry via WhatsApp</em> auto-prepares your enquiry with your details directly in your chat.
                    </p>
                  </div>

                  <p className="text-[11px] text-stone-400 text-center">
                    🔒 We respect your privacy. Your contact details are only used to respond to your inquiry and craft your order.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Studio FAQ Section (Floating Glass Window) */}
        <div className="mt-16 glass-panel floating-window rounded-3xl p-6 sm:p-10 border border-white/85 shadow-lg">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-dock border border-white/80 text-[#C96F4F] text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <HelpCircle className="w-4 h-4" />
              <span>Studio Knowledge Base</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Quick answers about our crafting process, personalization options, and delivery guarantees.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className={`rounded-2xl transition-all ${
                    isOpen ? 'glass-dock border border-[#C96F4F]/40 shadow-sm' : 'bg-white/60 hover:bg-white border border-[#D9C9B2]/60'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C96F4F] shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-stone-600 leading-relaxed border-t border-[#D9C9B2]/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
