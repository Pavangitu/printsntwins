import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Gift, 
  Truck, 
  CreditCard, 
  Sparkles,
  ArrowRight,
  PackageCheck,
  Loader2
} from 'lucide-react';
import { CartItem } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getOrderWhatsAppUrl, openWhatsApp } from '../config/whatsapp';
import { uploadImageForWhatsApp } from '../utils/imageUpload';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderId: string) => void;
  appliedPromo: string | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  appliedPromo,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isGiftRecipient, setIsGiftRecipient] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');
  
  // Form fields
  const [customerName, setCustomerName] = useState('Elena Woods');
  const [customerEmail, setCustomerEmail] = useState('elena.woods@example.com');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [state, setState] = useState('OR');
  const [zip, setZip] = useState('97477');
  const [giftNoteToDriver, setGiftNoteToDriver] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const discountAmount = appliedPromo === 'TWINS10' ? subtotal * 0.10 : (appliedPromo === 'WELCOME5' ? 50 : 0);
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleSendOrderWhatsApp = async () => {
    setIsSendingWhatsApp(true);

    const processedItems = await Promise.all(items.map(async (item) => {
      let finalPhoto = item.customization.photoUrl;
      if (finalPhoto && finalPhoto.startsWith('blob:')) {
        try {
          const publicUrl = await uploadImageForWhatsApp(finalPhoto);
          if (publicUrl) finalPhoto = publicUrl;
        } catch (e) {
          console.warn('Item photo upload failed:', e);
        }
      }
      return {
        productName: item.product.name,
        quantity: item.quantity,
        recipientName: item.customization.recipientName,
        customMessage: item.customization.customMessage,
        size: item.customization.selectedSize,
        fabric: item.customization.selectedFabric,
        printType: item.customization.selectedPrintType,
        dimension: item.customization.selectedDimension,
        material: item.customization.selectedMaterial,
        photoUrl: finalPhoto,
        photoFileName: finalPhoto ? 'Custom Design / Photo' : undefined,
      };
    }));

    setIsSendingWhatsApp(false);

    const url = getOrderWhatsAppUrl({
      orderId: createdOrderId,
      customerName,
      customerEmail,
      total,
      items: processedItems,
    });
    openWhatsApp(url);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
      const newOrderId = `PNT-${randomOrderNum}`;
      setCreatedOrderId(newOrderId);
      setIsProcessing(false);
      setStep('success');
      onOrderSuccess(newOrderId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="checkout-modal-container"
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col my-auto max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#F8F6EE]">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#C96F4F] text-white flex items-center justify-center font-serif text-xs font-bold">
              &amp;
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {step === 'details' ? 'Boutique Gift Checkout' : 'Order Confirmed!'}
              </h3>
              <p className="text-xs text-stone-500">
                {step === 'details' ? 'Safe & Encrypted Personalization Processing' : 'Thank you for choosing printsntwins'}
              </p>
            </div>
          </div>

          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'details' ? (
            <form onSubmit={handlePlaceOrder} className="space-y-6 text-xs">
              
              {/* Order Summary Strip */}
              <div className="bg-[#F8F6EE] p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Package Contents</span>
                  <div className="flex items-center gap-2">
                    {items.slice(0, 3).map((item) => (
                      <img 
                        key={item.id} 
                        src={item.customization.photoUrl || item.product.image} 
                        alt={item.product.name} 
                        className="w-9 h-9 rounded-lg object-cover border border-stone-200"
                        title={item.product.name}
                      />
                    ))}
                    {items.length > 3 && (
                      <span className="text-xs text-stone-500 font-semibold">
                        +{items.length - 3} more
                      </span>
                    )}
                    <span className="font-semibold text-stone-800 text-xs ml-1">
                      {items.reduce((a, b) => a + b.quantity, 0)} custom items
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-medium">Total Payable</span>
                  <span className="font-serif text-lg font-bold text-stone-900">₹{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Gift Recipient Direct Delivery Toggle */}
              <div className="p-3.5 rounded-2xl bg-[#F8F6EE] border border-[#D9C9B2] flex items-start gap-3">
                <input
                  type="checkbox"
                  id="direct-gift-toggle"
                  checked={isGiftRecipient}
                  onChange={(e) => setIsGiftRecipient(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#C96F4F] rounded focus:ring-[#C96F4F]"
                />
                <label htmlFor="direct-gift-toggle" className="cursor-pointer">
                  <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#C96F4F]" />
                    <span>Send directly to gift recipient (We hide all pricing invoices)</span>
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    We will package it as a surprise gift with no receipts included in the box.
                  </span>
                </label>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm border-b border-stone-100 pb-1">
                  1. Contact &amp; Notification
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-600 block mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1 font-medium">Email for Proof Approval &amp; Tracking</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Destination */}
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm border-b border-stone-100 pb-1">
                  2. {isGiftRecipient ? 'Recipient Destination Address' : 'Shipping Address'}
                </h4>
                <div className="space-y-2.5">
                  <div>
                    <label className="text-stone-600 block mb-1 font-medium">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-stone-600 block mb-1 font-medium">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                      />
                    </div>
                    <div>
                      <label className="text-stone-600 block mb-1 font-medium">State / Province</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                      />
                    </div>
                    <div>
                      <label className="text-stone-600 block mb-1 font-medium">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h4 className="font-bold text-stone-900 text-sm border-b border-stone-100 pb-1">
                  3. Payment Method
                </h4>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 font-medium transition ${
                      paymentMethod === 'card'
                        ? 'border-[#C96F4F] bg-[#F8F6EE] text-[#C96F4F]'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 font-medium transition ${
                      paymentMethod === 'applepay'
                        ? 'border-[#C96F4F] bg-[#F8F6EE] text-[#C96F4F]'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <span> Apple Pay / Google Pay</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-[#F8F6EE] border border-stone-200 space-y-2.5">
                    <div>
                      <label className="text-stone-600 block mb-1 font-medium">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-stone-600 block mb-1 font-medium">Expires</label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-stone-600 block mb-1 font-medium">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full p-2 rounded-lg border border-stone-200 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#2E3A2F] text-white hover:bg-[#3E3836] rounded-full font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#D9C9B2]" />
                    <span>Engraving &amp; Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Order • ₹{total.toFixed(0)}</span>
                    <ArrowRight className="w-4 h-4 text-[#D9C9B2]" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-stone-400 text-[10px]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#42594D]" /> SSL 256-Bit Protection
                </span>
                <span>•</span>
                <span>Money-Back Proof Guarantee</span>
                <span>•</span>
                <span>Made With Love</span>
              </div>

            </form>
          ) : (
            /* ORDER CONFIRMATION SCREEN */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#E5EBE7] text-[#42594D] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-serif text-3xl font-bold text-stone-900">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We've received your personalized creations for crafting. Our studio team is preparing the typography proofs and setting up the print machines!
                </p>
              </div>

              {/* Tracking ID Badge */}
              <div className="p-4 rounded-2xl bg-[#F8F6EE] border border-stone-200 max-w-sm mx-auto space-y-1">
                <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
                  Your Studio Order Reference
                </span>
                <p className="font-mono text-xl font-bold text-[#C96F4F]">
                  {createdOrderId}
                </p>
                <p className="text-[11px] text-stone-500">
                  Confirmation sent to {customerEmail}
                </p>
              </div>

              {/* Next Steps Timeline */}
              <div className="max-w-md mx-auto bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
                <h5 className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C96F4F]" />
                  <span>What happens next in our studio:</span>
                </h5>
                <p className="text-stone-600">
                  1. <strong>Design Review:</strong> Our typographers inspect font kerning and photo clarity.
                </p>
                <p className="text-stone-600">
                  2. <strong>Handcrafted Inscription:</strong> UV printing, hot foil debossing, or hand-turned ceramics.
                </p>
                <p className="text-stone-600">
                  3. <strong>Boutique Packaging:</strong> Hand-tied silk ribbon with your calligraphy note.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  type="button"
                  id="checkout-send-whatsapp-order-btn"
                  onClick={handleSendOrderWhatsApp}
                  disabled={isSendingWhatsApp}
                  className="px-6 py-3 bg-[#E8F8EE] text-[#15803d] hover:bg-[#25D366] hover:text-white border border-[#A7F3D0] rounded-full text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
                >
                  {isSendingWhatsApp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#25D366]" />
                      <span>Uploading Photos &amp; Opening WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                      <span>Send Order &amp; Photos to WhatsApp</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-[#2E3A2F] text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
