import React, { useState } from 'react';
import { 
  X, 
  PackageCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Gift, 
  Printer 
} from 'lucide-react';
import { OrderTrackState } from '../types';
import { PrintsNTwinsLogo } from './PrintsNTwinsLogo';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

const DEMO_ORDERS: Record<string, OrderTrackState> = {
  'PNT-84920': {
    orderId: 'PNT-84920',
    recipientName: 'Chloe & Sienna',
    placedDate: 'Yesterday at 2:15 PM',
    status: 'crafting',
    estimatedDelivery: 'Thursday, Sept 18',
    carrier: 'FedEx Express Boutique Delivery',
    trackingNumber: 'FX-9284-01928-US',
    items: [
      {
        name: 'The Custom Constellation Star Map Frame',
        customizationText: 'Chloe & Sienna • Under The London Sky',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=90'
      },
      {
        name: 'Artisanal Ceramic Name Mug (Pair)',
        customizationText: 'Sienna & Chloe • Morning Bliss in Gold Luster',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=90'
      }
    ]
  },
  'PNT-41092': {
    orderId: 'PNT-41092',
    recipientName: 'Marcus Vance',
    placedDate: '3 days ago',
    status: 'dispatched',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    carrier: 'USPS Priority Fine Art Courier',
    trackingNumber: '9400-1118-9922-3849-01',
    items: [
      {
        name: 'Custom Spotify Acrylic Song Plaque with Wooden LED Base',
        customizationText: 'Coldplay - Yellow • 1:43 Roadtrip Memory',
        image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=90'
      }
    ]
  }
};

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = 'PNT-84920',
}) => {
  if (!isOpen) return null;

  const [inputOrderId, setInputOrderId] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState<OrderTrackState | null>(
    DEMO_ORDERS[initialOrderId] || DEMO_ORDERS['PNT-84920']
  );
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputOrderId.trim().toUpperCase();
    if (DEMO_ORDERS[query]) {
      setCurrentOrder(DEMO_ORDERS[query]);
      setNotFound(false);
    } else {
      // Generate a dynamic mock order state if not pre-seeded so user can track any ID they received at checkout!
      if (query.startsWith('PNT-')) {
        setCurrentOrder({
          orderId: query,
          recipientName: 'Valued Customer',
          placedDate: 'Today at 10:30 AM',
          status: 'crafting',
          estimatedDelivery: 'In 3-4 business days',
          carrier: 'Priority Gift Courier',
          trackingNumber: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
          items: [
            {
              name: 'Personalized Custom Creation',
              customizationText: 'Under Master Artisan Review',
              image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=90'
            }
          ]
        });
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }
  };

  const steps = [
    {
      id: 'confirmed',
      title: 'Proof Approved',
      desc: 'Typography, dates & coordinates verified by design team.',
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    {
      id: 'crafting',
      title: 'In Crafting Studio',
      desc: 'UV printing, hot-foil stamping, and assembly in progress.',
      icon: <Printer className="w-4 h-4" />
    },
    {
      id: 'packaging',
      title: 'Boutique Gift Wrapping',
      desc: 'Silk ribbon tied, tissue wrapping, & calligraphy card sealed.',
      icon: <Gift className="w-4 h-4" />
    },
    {
      id: 'dispatched',
      title: 'Dispatched with Courier',
      desc: 'En route with temperature & impact proof packaging.',
      icon: <Truck className="w-4 h-4" />
    }
  ];

  const getStepIndex = (status: OrderTrackState['status']) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'crafting': return 1;
      case 'packaging': return 2;
      case 'dispatched': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const activeIndex = currentOrder ? getStepIndex(currentOrder.status) : 1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="track-order-modal-container"
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col my-auto max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#F8F6EE]">
          <div className="flex items-center gap-3">
            <PrintsNTwinsLogo size="sm" variant="emblem" />
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Track Studio Creation
              </h3>
              <p className="text-xs text-stone-500">
                Real-time crafting progress from our boutique printing workshop
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

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Order Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g. PNT-84920)"
                className="w-full pl-9 pr-3 py-2.5 bg-[#F8F6EE] border border-stone-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-[#C96F4F]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#2E3A2F] text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition"
            >
              Track Order
            </button>
          </form>

          {notFound && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              Order ID not found. Try searching demo order <strong>PNT-84920</strong> or <strong>PNT-41092</strong>.
            </div>
          )}

          {currentOrder && (
            <div className="space-y-6 text-xs">
              
              {/* Order Status Banner */}
              <div className="p-4 rounded-2xl bg-[#F8F6EE] border border-[#D9C9B2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-stone-900">
                      {currentOrder.orderId}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#C96F4F] text-white text-[10px] font-bold uppercase tracking-wider">
                      {currentOrder.status === 'crafting' ? 'In Handcrafting' : 'Dispatched'}
                    </span>
                  </div>
                  <p className="text-stone-500 text-[11px]">
                    Created for <strong>{currentOrder.recipientName}</strong> • Placed {currentOrder.placedDate}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Est. Arrival</span>
                  <span className="font-bold text-stone-900 text-xs">{currentOrder.estimatedDelivery}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-stone-900 text-sm">
                  Workshop Progress Timeline
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {steps.map((s, index) => {
                    const isDone = index <= activeIndex;
                    const isCurrent = index === activeIndex;
                    return (
                      <div key={s.id} className="relative group">
                        {/* Step Marker */}
                        <div className={`absolute -left-6 top-0 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                          isDone 
                            ? 'bg-[#C96F4F] border-[#C96F4F] text-white shadow-xs' 
                            : 'bg-white border-stone-300'
                        }`}>
                          {isDone && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-xs ${isCurrent ? 'text-[#C96F4F]' : (isDone ? 'text-stone-900' : 'text-stone-400')}`}>
                              {s.title}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-[#F5EAE6] text-[#C96F4F] text-[9px] font-bold animate-pulse">
                                Currently Here
                              </span>
                            )}
                          </div>
                          <p className="text-stone-500 text-[11px] mt-0.5">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ordered Items Preview */}
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-xs">
                  Items in this Creation Package:
                </h4>
                <div className="space-y-2">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8F6EE] border border-stone-200">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-stone-900 text-xs truncate">{item.name}</h5>
                        <p className="text-[11px] text-stone-500 truncate">{item.customizationText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carrier Note */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 text-[11px] flex items-center justify-between">
                <span>Carrier: <strong>{currentOrder.carrier}</strong></span>
                <span className="font-mono text-stone-500">#{currentOrder.trackingNumber}</span>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-[#F8F6EE] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 text-white rounded-full text-xs font-semibold hover:bg-stone-900 transition"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
