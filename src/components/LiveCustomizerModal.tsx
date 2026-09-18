import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Upload, 
  Gift, 
  Check, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Music, 
  Play, 
  Pause, 
  Heart,
  Eye,
  Smile,
  Download,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Shirt,
  Ruler,
  ChevronRight
} from 'lucide-react';
import { Product, CustomizationState } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getProductWhatsAppUrl, getCustomProductWhatsAppUrl, openWhatsApp } from '../config/whatsapp';
import { uploadImageForWhatsApp } from '../utils/imageUpload';

interface LiveCustomizerModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, customization: CustomizationState, customPrice?: number) => void;
}

export const LiveCustomizerModal: React.FC<LiveCustomizerModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const isTshirt = product.mockupType === 'tshirt';
  const defaultFont = product.customizationOptions.availableFonts?.[0]?.id || 'serif';
  const defaultColor = product.customizationOptions.availableColors?.[0]?.hex || '#C5A059';

  const defaultInitialName = isTshirt
    ? 'GOOD THINGS TAKE TIME'
    : (product.mockupType === 'billbook' ? 'PRINTSNTWINS STUDIO' : (product.mockupType === 'stickers' ? 'GOOD VIBES' : 'Oliver & Mia'));
  const defaultInitialMessage = isTshirt
    ? 'printsntwins studio edition'
    : (product.mockupType === 'billbook' ? '+91 98765 43210 • GSTIN: 29ABCDE1234F1Z5' : 'Under the stars where our story began');

  const [recipientName, setRecipientName] = useState(defaultInitialName);
  const [customMessage, setCustomMessage] = useState(defaultInitialMessage);
  const [specialDate, setSpecialDate] = useState('2023-09-15');
  const [selectedFont, setSelectedFont] = useState(defaultFont);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedStyle, setSelectedStyle] = useState<string>(product.customizationOptions.availableStyles?.[0]?.id || 'Classic Oak');
  const [selectedSize, setSelectedSize] = useState<string>(
    product.customizationOptions.availableSizes?.[2] || product.customizationOptions.availableSizes?.[0] || 'M'
  );
  const [selectedFabric, setSelectedFabric] = useState<string>(
    product.customizationOptions.availableFabrics?.[0]?.id || ''
  );
  const [selectedPrintType, setSelectedPrintType] = useState<string>(
    product.customizationOptions.availablePrintTypes?.[0]?.id || 'customized'
  );
  const [selectedDimension, setSelectedDimension] = useState<string>(
    product.customizationOptions.availableDimensions?.[0]?.id || ''
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    product.customizationOptions.availableMaterials?.[0]?.id || ''
  );

  useEffect(() => {
    setSelectedDimension(product.customizationOptions.availableDimensions?.[0]?.id || '');
    setSelectedMaterial(product.customizationOptions.availableMaterials?.[0]?.id || '');
  }, [product.id]);

  const [photoUrl, setPhotoUrl] = useState<string>(
    product.customizationOptions.requiresPhoto 
      ? 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=95' 
      : ''
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [photoFileName, setPhotoFileName] = useState<string>(
    product.customizationOptions.requiresPhoto ? (isTshirt ? 'Custom Graphic Artwork' : 'Couple Polaroid Photo') : ''
  );
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftCardMessage, setGiftCardMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'customize' | 'details' | 'craft'>('customize');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setPhotoFileName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setPhotoUrl(objectUrl);
      setCopiedNotice(`Photo "${file.name}" uploaded successfully!`);
      setTimeout(() => setCopiedNotice(null), 5000);
    }
  };

  const handleDownloadPhoto = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!photoUrl) return;
    const a = document.createElement('a');
    a.href = photoUrl;
    a.download = photoFileName || `${product.slug}-photo.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setCopiedNotice('Photo saved to your downloads!');
    setTimeout(() => setCopiedNotice(null), 4000);
  };

  const selectedFontObj = product.customizationOptions.availableFonts?.find(f => f.id === selectedFont);
  const selectedFontFamily = selectedFontObj ? selectedFontObj.cssFamily : 'Playfair Display, serif';
  const selectedFabricObj = product.customizationOptions.availableFabrics?.find(f => f.id === selectedFabric);
  const selectedPrintTypeObj = product.customizationOptions.availablePrintTypes?.find(p => p.id === selectedPrintType);
  const selectedDimensionObj = product.customizationOptions.availableDimensions?.find(d => d.id === selectedDimension) 
    || product.customizationOptions.availableDimensions?.[0];
  const selectedMaterialObj = product.customizationOptions.availableMaterials?.find(m => m.id === selectedMaterial)
    || product.customizationOptions.availableMaterials?.[0];

  const fabricPriceDelta = selectedFabricObj?.priceDelta || 0;
  const printTypePriceDelta = selectedPrintTypeObj?.priceDelta || 0;
  const dimensionPriceDelta = selectedDimensionObj?.priceDelta || 0;
  const materialPriceDelta = selectedMaterialObj?.priceDelta || 0;
  const giftWrapFee = giftWrap ? 50 : 0;
  const finalPrice = product.price + fabricPriceDelta + printTypePriceDelta + dimensionPriceDelta + materialPriceDelta + giftWrapFee;

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleSendViaWhatsApp = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsUploadingPhoto(true);

    let finalPhotoUrl = photoUrl;

    // 1. Upload photo to cloud host to get a public clickable link for WhatsApp
    if (photoUrl) {
      try {
        const publicUrl = await uploadImageForWhatsApp(uploadedFile || photoUrl);
        if (publicUrl) {
          finalPhotoUrl = publicUrl;
          setCopiedNotice('📸 Photo uploaded & link created for WhatsApp!');
        }
      } catch (err) {
        console.warn('Cloud upload skipped or failed:', err);
      }

      // 2. Try to copy the image to clipboard so user can also press Ctrl+V in WhatsApp
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const srcToLoad = uploadedFile ? URL.createObjectURL(uploadedFile) : photoUrl;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = srcToLoad;
        });

        canvas.width = img.naturalWidth || img.width || 800;
        canvas.height = img.naturalHeight || img.height || 800;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(async (blob) => {
          if (blob && navigator.clipboard && window.ClipboardItem) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
              setCopiedNotice('📸 Photo copied to clipboard & public link ready for WhatsApp!');
              setTimeout(() => setCopiedNotice(null), 8000);
            } catch (err) {
              console.warn('Clipboard write image not permitted:', err);
            }
          }
        }, 'image/png');
      } catch (err) {
        console.warn('Image clipboard preparation skipped:', err);
      }
    }

    setIsUploadingPhoto(false);

    // 3. Generate detailed WhatsApp message with the direct photo link
    const url = getCustomProductWhatsAppUrl({
      productName: product.name,
      recipientName,
      customMessage,
      specialDate,
      fontName: selectedFontObj?.name,
      colorName: selectedColor,
      size: product.customizationOptions.availableSizes ? selectedSize : undefined,
      fabric: selectedFabricObj ? selectedFabricObj.name : undefined,
      printType: selectedPrintTypeObj ? selectedPrintTypeObj.name : undefined,
      dimension: selectedDimensionObj ? `${selectedDimensionObj.name} (${selectedDimensionObj.measurements})` : undefined,
      material: selectedMaterialObj ? `${selectedMaterialObj.name} (${selectedMaterialObj.spec})` : undefined,
      giftWrap,
      finalPrice,
      photoUrl: finalPhotoUrl,
      photoFileName: photoFileName || (uploadedFile ? uploadedFile.name : (product.customizationOptions.requiresPhoto ? (isTshirt ? 'Custom Graphic Artwork' : 'Photo Card Image') : undefined)),
    });

    openWhatsApp(url);
  };

  const handleAddToCart = () => {
    const customization: CustomizationState = {
      recipientName,
      customMessage,
      specialDate,
      selectedFont,
      selectedColor,
      selectedStyle,
      selectedSize: product.customizationOptions.availableSizes ? selectedSize : undefined,
      selectedFabric: selectedFabricObj ? selectedFabricObj.name : undefined,
      selectedPrintType: selectedPrintTypeObj ? selectedPrintTypeObj.name : undefined,
      selectedDimension: selectedDimensionObj ? `${selectedDimensionObj.name} (${selectedDimensionObj.measurements})` : undefined,
      selectedMaterial: selectedMaterialObj ? `${selectedMaterialObj.name} (${selectedMaterialObj.spec})` : undefined,
      photoUrl,
      giftWrap,
      giftCardMessage,
    };
    onAddToCart(product, customization, finalPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="customizer-modal-container"
        className="glass-panel floating-window rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-white/85 flex flex-col my-auto max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#D9C9B2]/60 flex items-center justify-between glass-dock">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#C96F4F] text-white flex items-center justify-center font-serif text-xs font-bold shadow-xs">
              &amp;
            </span>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2E3A2F]">
                Personalization Studio
              </h2>
              <p className="text-xs text-stone-500">
                Live Interactive Mockup Preview • Crafted by printsntwins
              </p>
            </div>
          </div>

          <button
            id="close-customizer-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-600 flex items-center justify-center transition border border-[#D9C9B2]/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Column: Live Visual Mockup Preview Stage */}
          <div className="lg:col-span-6 bg-[#F6F4ED]/80 p-6 sm:p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#D9C9B2]/60 relative">
            
            {/* Live Preview Watermark / Tag */}
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dock text-[11px] font-semibold text-stone-700 shadow-2xs border border-white/80">
              <Eye className="w-3 h-3 text-[#C96F4F]" />
              <span>Real-Time Proof Preview</span>
            </div>

            {/* DYNAMIC PRODUCT STAGE BASED ON MOCKUP TYPE */}
            <div className="w-full max-w-sm aspect-[4/4.6] relative floating-window rounded-2xl shadow-xl overflow-hidden bg-white border border-white/80 flex items-center justify-center transition-all duration-300">
              
              {/* 1. BILL BOOK MOCKUP */}
              {product.mockupType === 'billbook' ? (
                <div className="w-full h-full p-5 bg-[#F8F6EE] flex flex-col justify-between relative shadow-inner text-stone-900 font-sans">
                  <div className="border-2 border-stone-800 rounded-lg p-4 bg-white shadow-sm flex flex-col justify-between h-full relative">
                    {/* Top Perforation & Book Spine */}
                    <div className="absolute top-0 inset-x-0 h-3 bg-stone-800 flex items-center justify-center">
                      <div className="w-full border-t border-dashed border-stone-400 opacity-60" />
                    </div>

                    <div className="pt-2 space-y-3">
                      {/* Header: Shop Name & Invoice # */}
                      <div className="flex items-start justify-between border-b pb-2 border-stone-200">
                        <div>
                          <h4 
                            style={{ fontFamily: selectedFontFamily, color: selectedColor }}
                            className="font-bold text-base uppercase tracking-wider"
                          >
                            {recipientName || 'YOUR BUSINESS NAME'}
                          </h4>
                          <p className="text-[10px] text-stone-500 max-w-[200px] leading-tight mt-0.5">
                            {customMessage || 'Phone, Email, GST / Tax ID & Address'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 block">
                            NO. {specialDate || '001'}
                          </span>
                          <span className="text-[9px] text-stone-400 block mt-1">
                            {selectedStyle || 'Duplicate Copy'}
                          </span>
                        </div>
                      </div>

                      {/* Line Items Table Simulation */}
                      <div className="border border-stone-300 rounded text-[9px]">
                        <div className="grid grid-cols-12 bg-stone-100 font-bold p-1 border-b border-stone-300">
                          <span className="col-span-2">QTY</span>
                          <span className="col-span-7">DESCRIPTION</span>
                          <span className="col-span-3 text-right">AMOUNT</span>
                        </div>
                        <div className="p-1.5 space-y-1.5 text-stone-600">
                          <div className="grid grid-cols-12">
                            <span className="col-span-2">01</span>
                            <span className="col-span-7">Customized Gifts &amp; Craft</span>
                            <span className="col-span-3 text-right font-mono">₹350.00</span>
                          </div>
                          <div className="grid grid-cols-12 opacity-50">
                            <span className="col-span-2">02</span>
                            <span className="col-span-7">Boutique Packaging</span>
                            <span className="col-span-3 text-right font-mono">₹50.00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Signature & Total */}
                    <div className="pt-2 border-t border-stone-200 flex items-end justify-between">
                      <div className="text-[8px] text-stone-400 font-script text-base">
                        Thank you for your business ♡
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-stone-500 font-semibold">TOTAL: <span className="text-stone-900 font-mono font-bold">₹400.00</span></div>
                        <div className="text-[8px] text-stone-400 mt-1 border-t border-stone-300 pt-0.5">Authorized Signature</div>
                      </div>
                    </div>
                  </div>
                </div>

              /* 2. PHOTO CARD MOCKUP */
              ) : product.mockupType === 'photocard' ? (
                <div className="w-full h-full p-6 bg-gradient-to-b from-[#F5EFE6] to-[#EBDDCF] flex items-center justify-center shadow-inner">
                  {/* Polaroid Frame */}
                  <div className="w-60 bg-white p-3 pb-6 rounded-lg shadow-2xl border border-stone-200/80 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                    {/* Photo Container */}
                    <div className="w-full aspect-[4/3.8] bg-stone-100 rounded-sm overflow-hidden relative shadow-inner">
                      <img 
                        src={photoUrl || product.image} 
                        alt="Photo preview" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full text-[8px] text-white font-medium">
                        350 GSM Archival Art Print
                      </div>
                    </div>

                    {/* Polaroid Handwritten Caption Area */}
                    <div className="pt-3 text-center space-y-1">
                      <h4 
                        style={{ fontFamily: selectedFontFamily, color: selectedColor || '#2E3A2F' }}
                        className="font-bold text-base leading-tight"
                      >
                        {recipientName || 'Good Memories Last Forever ♡'}
                      </h4>
                      {customMessage && (
                        <p className="font-script text-sm text-stone-600">
                          {customMessage}
                        </p>
                      )}
                      <span className="text-[9px] font-mono text-stone-400 block pt-1">
                        printsntwins • boutique photo card
                      </span>
                    </div>
                  </div>
                </div>

              /* 3. CUSTOMIZED STICKERS MOCKUP */
              ) : product.mockupType === 'stickers' ? (
                <div className="w-full h-full p-6 bg-gradient-to-br from-[#F5EAE6] via-[#FCE7F3] to-[#E0E7FF] flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
                  <div className="relative group">
                    {/* Die Cut Sticker Graphic */}
                    <div 
                      className="w-56 h-56 rounded-3xl bg-white p-5 shadow-2xl border-4 border-dashed border-[#C96F4F]/40 flex flex-col items-center justify-center text-center relative overflow-hidden transform hover:scale-105 transition-all"
                      style={{ boxShadow: '0 15px 35px -5px rgba(0,0,0,0.15)' }}
                    >
                      {/* Gloss Glint Overlay */}
                      <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/40 rotate-45 pointer-events-none rounded-full blur-xs" />

                      <div className="space-y-2 relative z-10">
                        <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-white shadow-md" style={{ backgroundColor: selectedColor || '#C96F4F' }}>
                          <Smile className="w-7 h-7" />
                        </div>

                        <h4 
                          style={{ fontFamily: selectedFontFamily, color: selectedColor || '#2E3A2F' }}
                          className="font-bold text-xl uppercase tracking-wider leading-tight"
                        >
                          {recipientName || 'GOOD VIBES'}
                        </h4>

                        <p className="font-script text-sm text-[#C96F4F]">
                          {customMessage || 'Stickers Make Everything Brighter ♡'}
                        </p>

                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-bold">
                          <Check className="w-2.5 h-2.5" /> 100% Waterproof Vinyl
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-500 font-medium mt-3">
                    Precision Contour Die-Cut • Tear &amp; Dishwasher Resistant
                  </div>
                </div>

              /* 4. PIPE CLEANER CRAFTS MOCKUP */
              ) : product.mockupType === 'craft' ? (
                <div className="w-full h-full p-6 bg-gradient-to-b from-[#FAF5EE] to-[#EAE3D6] flex flex-col items-center justify-center shadow-inner relative">
                  {/* Potted Flower / Bouquet Graphic */}
                  <div className="w-52 bg-white rounded-3xl p-4 shadow-xl border border-stone-200 text-center space-y-3 relative overflow-hidden">
                    <div className="w-full aspect-square rounded-2xl bg-gradient-to-b from-[#FDF2F8] to-[#FEF3C7] flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt="Pipe cleaner flowers" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[9px] font-bold text-[#C96F4F]">
                        Everlasting Bloom
                      </div>
                    </div>

                    {/* Handwritten Calligraphy Dedication Tag */}
                    <div className="border-t border-dashed border-stone-200 pt-2 space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">
                        Gift Tag Note
                      </span>
                      <h4 
                        style={{ fontFamily: selectedFontFamily, color: selectedColor || '#C96F4F' }}
                        className="font-bold text-sm"
                      >
                        For: {recipientName || 'Chloe & Sienna'}
                      </h4>
                      {customMessage && (
                        <p className="font-script text-sm text-stone-600">
                          "{customMessage}"
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-2 font-script text-base text-[#C96F4F]">
                    Tiny Crafts Big Smiles ♡
                  </span>
                </div>

              /* 5. TSHIRTS PRINTING MOCKUP */
              ) : product.mockupType === 'tshirt' ? (
                <div className="w-full h-full p-5 bg-[#ECE8E1] flex flex-col items-center justify-center relative shadow-inner">
                  {/* T-shirt Silhouette */}
                  <div 
                    className="w-64 h-76 rounded-3xl shadow-2xl relative flex flex-col items-center justify-center p-6 border border-black/10 transition-colors duration-300"
                    style={{ backgroundColor: selectedColor || '#F8F6EE' }}
                  >
                    {/* Crewneck Collar */}
                    <div className="absolute top-0 inset-x-20 h-5 bg-stone-300/40 rounded-b-2xl border-b border-black/10" />

                    {/* Top Size & Fabric Collar Tag */}
                    <div className="absolute top-2 inset-x-0 flex justify-center z-20">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 text-stone-800 shadow-xs border border-stone-200 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C96F4F]" />
                        <span>SIZE: {selectedSize}</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-stone-500 font-medium text-[9px] truncate max-w-[120px]">
                          {selectedFabricObj?.name || '100% Combed Cotton'}
                        </span>
                      </div>
                    </div>

                    {/* Print Mode Badge */}
                    <div className={`absolute top-8 right-3 z-10 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider shadow-2xs border ${
                      selectedPrintType === 'customized'
                        ? 'bg-[#C96F4F] text-white border-[#A85338]'
                        : 'bg-stone-800 text-white border-stone-900'
                    }`}>
                      {selectedPrintType === 'customized' ? 'Customized' : 'Catalog Print'}
                    </div>

                    {/* Printed Graphic / Quote on Chest */}
                    <div className="text-center px-3 space-y-2 z-10 mt-1 flex flex-col items-center max-w-[210px]">
                      {/* Photo / Graphic Preview if uploaded */}
                      {selectedPrintType === 'customized' && photoUrl && uploadedFile ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border-2 border-dashed border-[#C96F4F]/40 bg-white/70 p-0.5 mb-1">
                          <img src={photoUrl} alt="Custom Graphic" className="w-full h-full object-contain" />
                        </div>
                      ) : selectedStyle === 'butterfly-graphic' ? (
                        <div className="w-12 h-12 flex items-center justify-center mb-0.5">
                          <svg className={`w-10 h-10 ${selectedColor === '#1C1917' ? 'text-white' : 'text-stone-800'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 4c-2-2-6-2-8 1s0 8 3 9c2 1 5-1 5-1s3 2 5 1c3-1 5-6 3-9s-6-3-8-1z"/>
                            <path d="M12 4v16"/>
                            <path d="M12 4c2-2 6-2 8 1s0 8-3 9c-2 1-5-1-5-1s-3 2-5 1c-3-1-5-6-3-9s6-3 8-1z"/>
                          </svg>
                        </div>
                      ) : selectedStyle === 'floral-illustration' ? (
                        <div className="w-12 h-12 flex items-center justify-center mb-0.5">
                          <svg className={`w-10 h-10 ${selectedColor === '#1C1917' ? 'text-white' : 'text-stone-800'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.17-6.83-2.83 2.83m-8 8-2.83 2.83m0-13.66 2.83 2.83m8 8 2.83 2.83"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-7 h-7 mx-auto rounded-full bg-black/5 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-[#C96F4F]" />
                        </div>
                      )}
                      
                      <h4 
                        style={{ 
                          fontFamily: selectedFontFamily,
                          color: selectedColor === '#1C1917' ? '#F8F6EE' : '#1C1917' 
                        }}
                        className="text-base font-extrabold uppercase tracking-widest leading-tight"
                      >
                        {selectedPrintType === 'normal'
                          ? (selectedStyle === 'butterfly-graphic' ? 'AESTHETIC BUTTERFLY' : selectedStyle === 'floral-illustration' ? 'VINTAGE BOTANICAL' : 'GOOD THINGS TAKE TIME ♡')
                          : (recipientName || 'GOOD THINGS TAKE TIME')}
                      </h4>

                      {selectedPrintType === 'customized' && customMessage && (
                        <p 
                          className="font-script text-xs italic"
                          style={{ color: selectedColor === '#1C1917' ? '#E5BE72' : '#C96F4F' }}
                        >
                          {customMessage}
                        </p>
                      )}
                    </div>

                    {/* Brand Hem Label */}
                    <div className="absolute bottom-2.5 inset-x-4 flex items-center justify-between text-[8px] font-mono tracking-widest text-stone-400">
                      <span>printsntwins • {selectedFabricObj?.name.toUpperCase() || '100% COTTON'}</span>
                      <span className="font-bold bg-white/80 px-1.5 py-0.5 rounded border border-stone-200 text-stone-700">
                        SIZE {selectedSize}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-2 font-script text-sm text-stone-700">
                    Wear Your Ideas • Express Your Style ♡
                  </span>
                </div>

              /* 6. VISITING CARDS MOCKUP */
              ) : (
                <div className="w-full h-full p-6 bg-[#EBE7DF] flex flex-col items-center justify-center shadow-inner relative">
                  {/* 3.5" x 2" Luxury Visiting Card */}
                  <div 
                    className="w-72 h-44 rounded-xl shadow-2xl p-5 flex flex-col justify-between relative border border-white/20 transition-all duration-300 transform hover:scale-105"
                    style={{ backgroundColor: selectedColor || '#181513' }}
                  >
                    {/* Gold Foil Accent Line */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#DFBA62] via-[#FCEAB3] to-[#C59B3F] rounded-t-xl" />

                    {/* Top: Brand Logo / Monogram */}
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-bold tracking-widest text-[#FCEAB3]">
                        printsntwins
                      </span>
                      <div className="w-6 h-6 rounded-full border border-[#FCEAB3]/40 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-[#FCEAB3]" />
                      </div>
                    </div>

                    {/* Middle: Name & Title in Gold Foil */}
                    <div className="space-y-0.5">
                      <h4 
                        style={{ fontFamily: selectedFontFamily }}
                        className="font-bold text-base tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA62] via-[#FCEAB3] to-[#C59B3F]"
                      >
                        {recipientName || 'Your Name'}
                      </h4>
                      <p className="text-[10px] uppercase tracking-wider text-stone-400">
                        {customMessage ? customMessage.split('•')[0] : 'Founder & Artisan'}
                      </p>
                    </div>

                    {/* Bottom: Contact Details */}
                    <div className="pt-2 border-t border-stone-800 text-[9px] text-stone-300 font-mono flex items-center justify-between">
                      <span>{customMessage || '+91 98765 43210'}</span>
                      <span className="text-[#FCEAB3]">printsntwins@gmail.com</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-500 mt-3 font-script text-sm text-stone-700">
                    A Small Card A Big Opportunity ♡
                  </span>
                </div>
              )}

            </div>

            {/* Quick sample photo selector (if photo is required) */}
            {product.customizationOptions.requiresPhoto && (
              <div className="w-full max-w-sm mt-4 text-center">
                <span className="text-[11px] text-stone-500 font-medium block mb-1.5">
                  Try Sample Photo Or Upload Your Own:
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[
                    { label: 'Couple', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=95' },
                    { label: 'Twins', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=95' },
                    { label: 'Sunset', url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=95' },
                    { label: 'Pet', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=95' },
                  ].map((sample) => (
                    <button
                      key={sample.label}
                      type="button"
                      onClick={() => {
                        setPhotoUrl(sample.url);
                        setPhotoFileName(`${sample.label} Sample Photo`);
                        setUploadedFile(null);
                        setCopiedNotice(`Selected ${sample.label} photo!`);
                        setTimeout(() => setCopiedNotice(null), 3000);
                      }}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition ${
                        photoUrl === sample.url
                          ? 'bg-[#2E3A2F] text-white border-stone-800'
                          : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Packaging Preview note */}
            {giftWrap && (
              <div className="w-full max-w-sm mt-3 p-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C9B2] flex items-center gap-2 text-xs text-[#A85338]">
                <Gift className="w-4 h-4 shrink-0 text-[#C96F4F]" />
                <span>
                  <strong>Gift Wrapping Applied:</strong> Luxury rigid box with raw silk ribbon &amp; handwritten calligraphy note.
                </span>
              </div>
            )}

            {/* Selected Dimensions & Material Live Proof Tag */}
            {(selectedDimensionObj || selectedMaterialObj) && (
              <div className="w-full max-w-sm mt-3 p-2.5 rounded-2xl bg-white/95 border border-[#D9C9B2]/80 flex flex-wrap items-center justify-between gap-2 shadow-2xs text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Ruler className="w-3.5 h-3.5 text-[#C96F4F] shrink-0" />
                  <span className="truncate">
                    <strong className="text-stone-900">{selectedDimensionObj?.name || 'Standard'}</strong>
                    {selectedDimensionObj?.measurements && (
                      <span className="text-stone-500 text-[10px] ml-1 font-mono">({selectedDimensionObj.measurements})</span>
                    )}
                  </span>
                </div>
                {selectedMaterialObj && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#C96F4F] border border-[#D9C9B2]/60 shrink-0">
                    {selectedMaterialObj.name}
                  </span>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Customization Controls & Options */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              {/* Product Info Summary */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold tracking-wider text-[#C96F4F]">
                    {product.categoryLabel}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {product.leadTime}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Navigation tabs inside studio */}
              <div className="flex border-b border-stone-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('customize')}
                  className={`pb-2.5 px-3 border-b-2 transition ${
                    activeTab === 'customize'
                      ? 'border-[#C96F4F] text-[#C96F4F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  1. Customize Details
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 px-3 border-b-2 transition ${
                    activeTab === 'details'
                      ? 'border-[#C96F4F] text-[#C96F4F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  2. Materials &amp; Dimensions
                </button>
                <button
                  onClick={() => setActiveTab('craft')}
                  className={`pb-2.5 px-3 border-b-2 transition ${
                    activeTab === 'craft'
                      ? 'border-[#C96F4F] text-[#C96F4F]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  3. Studio Guarantee
                </button>
              </div>

              {/* TAB 1: CUSTOMIZE INPUTS */}
              {activeTab === 'customize' && (
                <div className="space-y-4 text-xs">
                  
                  {/* Quick Material & Dimension Spec Ribbon */}
                  {(selectedDimensionObj || selectedMaterialObj) && (
                    <div className="p-3 rounded-2xl bg-[#FAF5EE] border border-[#D9C9B2]/80 flex items-center justify-between gap-3 shadow-2xs">
                      <div className="min-w-0 space-y-0.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#C96F4F] block">
                          Format &amp; Material
                        </span>
                        <p className="text-xs font-semibold text-stone-900 truncate">
                          {selectedDimensionObj ? selectedDimensionObj.name : (product.dimensions || 'Standard')} • {selectedMaterialObj ? selectedMaterialObj.name : 'Master Finish'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('details')}
                        className="px-3 py-1.5 text-xs font-bold text-[#C96F4F] bg-white hover:bg-[#C96F4F]/10 rounded-xl border border-[#D9C9B2]/60 transition shrink-0 flex items-center gap-1 shadow-2xs"
                      >
                        <span>Change in Tab 2</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* 1. PRINT TYPE (Customized or Normal Print) */}
                  {product.customizationOptions.availablePrintTypes && product.customizationOptions.availablePrintTypes.length > 0 && (
                    <div className="space-y-2 p-3.5 rounded-2xl bg-[#F8F6EE] border border-stone-200">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-stone-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C96F4F]" />
                          <span>Print Selection:</span>
                        </label>
                        <span className="text-[10px] text-stone-500 font-medium">Customized vs Ready</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.customizationOptions.availablePrintTypes.map((pt) => {
                          const isSelected = selectedPrintType === pt.id;
                          return (
                            <button
                              key={pt.id}
                              type="button"
                              onClick={() => setSelectedPrintType(pt.id)}
                              className={`p-2.5 rounded-xl border text-left transition relative ${
                                isSelected
                                  ? 'bg-white border-[#C96F4F] ring-1 ring-[#C96F4F] shadow-xs'
                                  : 'bg-white/70 hover:bg-white border-stone-200 text-stone-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-stone-900">{pt.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#C96F4F]" />}
                              </div>
                              <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">
                                {pt.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2. T-SHIRT SIZE SELECTOR */}
                  {product.customizationOptions.availableSizes && product.customizationOptions.availableSizes.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-stone-800 flex items-center gap-1.5">
                          <Shirt className="w-3.5 h-3.5 text-[#C96F4F]" />
                          <span>T-Shirt Size:</span>
                          <span className="text-stone-400 font-normal">(Unisex Relaxed Fit)</span>
                        </label>
                        <span className="text-[11px] text-[#C96F4F] font-bold">Selected: {selectedSize}</span>
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        {product.customizationOptions.availableSizes.map((size) => {
                          const isSelected = selectedSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(size)}
                              className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${
                                isSelected
                                  ? 'bg-[#2E3A2F] text-white border-stone-900 shadow-xs ring-2 ring-[#C96F4F]/40'
                                  : 'bg-[#F8F6EE] hover:bg-white text-stone-700 border-stone-200'
                              }`}
                            >
                              <span>{size}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-stone-500 px-1">
                        <span>Standard relaxed fit • Pre-shrunk</span>
                        <span className="text-[#C96F4F] font-medium">XS to XXL available</span>
                      </div>
                    </div>
                  )}

                  {/* 3. TYPE OF CLOTH / FABRIC SELECTOR */}
                  {product.customizationOptions.availableFabrics && product.customizationOptions.availableFabrics.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-stone-800 flex items-center gap-1.5">
                          <span>Type of Cloth / Fabric:</span>
                        </label>
                        <span className="text-[10px] text-stone-500 font-medium">Bio-Washed &amp; Non-Shrink</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.customizationOptions.availableFabrics.map((fabric) => {
                          const isSelected = selectedFabric === fabric.id;
                          return (
                            <button
                              key={fabric.id}
                              type="button"
                              onClick={() => setSelectedFabric(fabric.id)}
                              className={`p-2.5 rounded-xl border text-left transition relative ${
                                isSelected
                                  ? 'bg-white border-[#C96F4F] ring-1 ring-[#C96F4F] shadow-xs'
                                  : 'bg-[#F8F6EE] hover:bg-white border-stone-200 text-stone-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-stone-900">{fabric.name}</span>
                                {fabric.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#C96F4F]/10 text-[#C96F4F]">
                                    {fabric.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">
                                {fabric.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Artwork / Graphic Style Preset */}
                  {product.customizationOptions.availableStyles && product.customizationOptions.availableStyles.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-stone-800 block">
                          Artwork / Design Motif:
                        </label>
                        <span className="text-[10px] text-stone-500 font-medium">DTG &amp; Screen Printed</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.customizationOptions.availableStyles.map((style) => {
                          const isSelected = selectedStyle === style.id;
                          return (
                            <button
                              key={style.id}
                              type="button"
                              onClick={() => setSelectedStyle(style.id)}
                              className={`p-2.5 rounded-xl border text-left transition ${
                                isSelected
                                  ? 'bg-white border-[#C96F4F] ring-1 ring-[#C96F4F] text-stone-900 shadow-xs'
                                  : 'bg-[#F8F6EE] hover:bg-white border-stone-200 text-stone-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-xs">{style.name}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#C96F4F]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Mode Banner if Normal / Catalog Print */}
                  {selectedPrintType === 'normal' && isTshirt && (
                    <div className="p-3 rounded-xl bg-stone-100/90 border border-stone-200 text-stone-700 flex items-start gap-2 text-xs">
                      <Sparkles className="w-4 h-4 text-[#C96F4F] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-stone-900">Normal / Catalog Print Mode</span>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Your t-shirt will be printed with our signature studio graphic design on your chosen size &amp; cloth type. To personalize your own headline, quote, or photo, choose <strong>Customized Print</strong> above.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Name or Headline Input */}
                  {product.customizationOptions.requiresName && (selectedPrintType !== 'normal' || !isTshirt) && (
                    <div className="space-y-1.5">
                      <label className="font-semibold text-stone-800 block">
                        {product.customizationOptions.nameLabel || 'Personalized Name or Heading'}
                      </label>
                      <input
                        type="text"
                        id="customizer-name-input"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder={product.customizationOptions.namePlaceholder || 'Enter name'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F] font-medium text-stone-900"
                        maxLength={40}
                      />
                    </div>
                  )}

                  {/* Message or Subtitle Input */}
                  {product.customizationOptions.requiresMessage && (selectedPrintType !== 'normal' || !isTshirt) && (
                    <div className="space-y-1.5">
                      <label className="font-semibold text-stone-800 block">
                        {product.customizationOptions.messageLabel || 'Personal Dedication / Coordinates / Subtitle'}
                      </label>
                      <input
                        type="text"
                        id="customizer-message-input"
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder={product.customizationOptions.messagePlaceholder || 'Enter message'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F] font-medium text-stone-900"
                        maxLength={80}
                      />
                    </div>
                  )}

                  {/* Special Date Input */}
                  {product.customizationOptions.requiresDate && (
                    <div className="space-y-1.5">
                      <label className="font-semibold text-stone-800 block">
                        {product.customizationOptions.dateLabel || 'Special Memorable Date'}
                      </label>
                      <input
                        type="date"
                        id="customizer-date-input"
                        value={specialDate}
                        onChange={(e) => setSpecialDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-[#F8F6EE] focus:bg-white focus:outline-none focus:border-[#C96F4F] font-medium text-stone-900"
                      />
                    </div>
                  )}

                  {/* Photo Upload button */}
                  {product.customizationOptions.requiresPhoto && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-semibold text-stone-800 block">
                          {product.customizationOptions.photoLabel || 'Custom Photograph'}
                        </label>
                        {photoUrl && (
                          <span className="text-[10px] text-[#15803d] font-bold inline-flex items-center gap-1 bg-[#E8F8EE] px-2 py-0.5 rounded-full border border-[#86EFAC]">
                            <CheckCircle2 className="w-3 h-3 text-[#25D366]" />
                            Photo Ready
                          </span>
                        )}
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />

                      {photoUrl ? (
                        <div className="p-3 rounded-2xl border border-stone-200 bg-white flex items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                              <img src={photoUrl} alt="Upload thumbnail" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-medium text-xs text-stone-900 truncate block">
                                {photoFileName || 'custom-photo-proof.jpg'}
                              </span>
                              <span className="text-[10px] text-stone-500 block">
                                Ready for 350 GSM Archival Printing
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={handleDownloadPhoto}
                              className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition text-[11px]"
                              title="Download photo"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-3 py-1.5 text-xs font-semibold text-[#C96F4F] bg-[#C96F4F]/10 hover:bg-[#C96F4F]/20 rounded-xl transition flex items-center gap-1"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Change</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-3 px-4 rounded-xl border border-dashed border-stone-300 hover:border-[#C96F4F] bg-[#F8F6EE] hover:bg-white text-stone-700 font-medium flex items-center justify-center gap-2 transition shadow-2xs"
                        >
                          <Upload className="w-4 h-4 text-[#C96F4F]" />
                          <span>Upload Your Photo (PNG, JPG, HEIC)</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Font Selector */}
                  {product.customizationOptions.availableFonts && product.customizationOptions.availableFonts.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="font-semibold text-stone-800 block">
                        Lettering Font Style:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {product.customizationOptions.availableFonts.map((font) => (
                          <button
                            key={font.id}
                            type="button"
                            onClick={() => setSelectedFont(font.id)}
                            style={{ fontFamily: font.cssFamily }}
                            className={`p-2 rounded-xl border text-center text-xs transition ${
                              selectedFont === font.id
                                ? 'bg-[#2E3A2F] text-white border-stone-900 shadow-xs'
                                : 'bg-[#F8F6EE] text-stone-700 border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            {font.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color / Foil Finish Selector */}
                  {product.customizationOptions.availableColors && product.customizationOptions.availableColors.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="font-semibold text-stone-800 block">
                        Foil &amp; Ink Finish:
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        {product.customizationOptions.availableColors.map((color) => {
                          const isSelected = selectedColor === color.hex;
                          return (
                            <button
                              key={color.name}
                              type="button"
                              onClick={() => setSelectedColor(color.hex)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                                isSelected
                                  ? 'border-[#C96F4F] bg-[#FAF5EE] text-[#A85338] ring-1 ring-[#C96F4F]'
                                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                              }`}
                            >
                              <span 
                                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" 
                                style={{ backgroundColor: color.hex }}
                              />
                              <span>{color.name}</span>
                              {isSelected && <Check className="w-3 h-3 text-[#C96F4F]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Gift Wrapping Toggle */}
                  <div className="pt-2 border-t border-stone-200">
                    <label className="flex items-start gap-3 p-3 rounded-2xl bg-[#F8F6EE] border border-stone-200 hover:border-[#D9C9B2] cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-[#C96F4F] rounded focus:ring-[#C96F4F]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between font-semibold text-stone-900">
                          <span className="flex items-center gap-1.5">
                            <Gift className="w-3.5 h-3.5 text-[#C96F4F]" />
                            <span>Add Boutique Gift Box &amp; Handwritten Note</span>
                          </span>
                          <span className="text-[#C96F4F]">+₹50</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Rigid magnetic keepsake box lined with tissue, tied with satin ribbon, and includes a fountain-pen calligraphy note.
                        </p>
                        {giftWrap && (
                          <div className="mt-2">
                            <textarea
                              rows={2}
                              value={giftCardMessage}
                              onChange={(e) => setGiftCardMessage(e.target.value)}
                              placeholder="Write your note for the recipient here (we handwrite this inside the card)..."
                              className="w-full text-xs p-2 rounded-lg bg-white border border-stone-200 focus:outline-none focus:border-[#C96F4F]"
                              maxLength={160}
                            />
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                </div>
              )}

              {/* TAB 2: DETAILS & DIMENSIONS */}
              {activeTab === 'details' && (
                <div className="space-y-5 text-xs">
                  
                  {/* 1. Interactive Dimensions & Sizing Options */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Ruler className="w-4 h-4 text-[#C96F4F]" />
                        <h5 className="font-bold text-stone-900 text-sm">Dimensions &amp; Sizing</h5>
                      </div>
                      {selectedDimensionObj && (
                        <span className="text-[10px] bg-[#FAF5EE] text-[#C96F4F] px-2.5 py-0.5 rounded-full font-bold border border-[#D9C9B2]/60">
                          Selected: {selectedDimensionObj.name}
                        </span>
                      )}
                    </div>

                    {product.customizationOptions.availableDimensions && product.customizationOptions.availableDimensions.length > 0 ? (
                      <div className="grid grid-cols-1 gap-2.5">
                        {product.customizationOptions.availableDimensions.map((dim) => {
                          const isSelected = selectedDimension === dim.id || (!selectedDimension && dim.id === product.customizationOptions.availableDimensions?.[0]?.id);
                          return (
                            <button
                              key={dim.id}
                              type="button"
                              id={`dimension-option-${dim.id}`}
                              onClick={() => setSelectedDimension(dim.id)}
                              className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-white border-[#C96F4F] ring-2 ring-[#C96F4F]/30 shadow-xs'
                                  : 'bg-stone-50/80 hover:bg-white border-stone-200 text-stone-700'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-xs text-stone-900">{dim.name}</span>
                                    {dim.badge && (
                                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C96F4F]/10 text-[#C96F4F]">
                                        {dim.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] font-mono text-[#C96F4F] font-semibold">
                                    {dim.measurements}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {dim.priceDelta && dim.priceDelta > 0 ? (
                                    <span className="text-[11px] font-bold text-[#C96F4F] bg-[#FAF5EE] px-2.5 py-0.5 rounded-full border border-[#D9C9B2]/60">
                                      +₹{dim.priceDelta.toFixed(0)}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-stone-400 font-medium">Included</span>
                                  )}
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                                    isSelected ? 'bg-[#C96F4F] border-[#C96F4F] text-white' : 'border-stone-300 bg-white text-transparent'
                                  }`}>
                                    <Check className="w-3 h-3" />
                                  </div>
                                </div>
                              </div>
                              {dim.description && (
                                <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                                  {dim.description}
                                </p>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
                        {product.dimensions || 'Standard boutique specifications. Sized perfectly for home display.'}
                      </p>
                    )}

                    {/* Sizing Pills for T-shirts or size-based products */}
                    {product.customizationOptions.availableSizes && (
                      <div className="p-3.5 rounded-2xl bg-[#F8F6EE] border border-stone-200 space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <label className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
                            <Shirt className="w-3.5 h-3.5 text-[#C96F4F]" />
                            <span>Select T-Shirt Wearable Size:</span>
                          </label>
                          <span className="text-[10px] text-stone-500 font-medium">Unisex standard cut</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.customizationOptions.availableSizes.map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => setSelectedSize(sz)}
                              className={`w-11 h-10 rounded-xl font-bold text-xs transition flex items-center justify-center border ${
                                selectedSize === sz
                                  ? 'bg-[#2E3A2F] text-white border-stone-800 shadow-xs'
                                  : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Interactive Materials, Paper Stock & Craft Finish */}
                  {product.customizationOptions.availableMaterials && product.customizationOptions.availableMaterials.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-[#C96F4F]" />
                          <h5 className="font-bold text-stone-900 text-sm">Materials &amp; Craft Finish</h5>
                        </div>
                        {selectedMaterialObj && (
                          <span className="text-[10px] bg-[#FAF5EE] text-[#C96F4F] px-2.5 py-0.5 rounded-full font-bold border border-[#D9C9B2]/60">
                            Selected: {selectedMaterialObj.name}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {product.customizationOptions.availableMaterials.map((mat) => {
                          const isSelected = selectedMaterial === mat.id || (!selectedMaterial && mat.id === product.customizationOptions.availableMaterials?.[0]?.id);
                          return (
                            <button
                              key={mat.id}
                              type="button"
                              id={`material-option-${mat.id}`}
                              onClick={() => setSelectedMaterial(mat.id)}
                              className={`p-3.5 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-white border-[#C96F4F] ring-2 ring-[#C96F4F]/30 shadow-xs'
                                  : 'bg-stone-50/80 hover:bg-white border-stone-200 text-stone-700'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-xs text-stone-900">{mat.name}</span>
                                    {mat.badge && (
                                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C96F4F]/10 text-[#C96F4F]">
                                        {mat.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-stone-600 font-medium flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C96F4F] shrink-0" />
                                    <span>{mat.spec}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {mat.priceDelta && mat.priceDelta > 0 ? (
                                    <span className="text-[11px] font-bold text-[#C96F4F] bg-[#FAF5EE] px-2.5 py-0.5 rounded-full border border-[#D9C9B2]/60">
                                      +₹{mat.priceDelta.toFixed(0)}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-stone-400 font-medium">Included</span>
                                  )}
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                                    isSelected ? 'bg-[#C96F4F] border-[#C96F4F] text-white' : 'border-stone-300 bg-white text-transparent'
                                  }`}>
                                    <Check className="w-3 h-3" />
                                  </div>
                                </div>
                              </div>
                              {mat.description && (
                                <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                                  {mat.description}
                                </p>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. Studio Craft Details Specifications */}
                  <div className="space-y-2 pt-2">
                    <h5 className="font-bold text-stone-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#42594D]" />
                      <span>Studio Craftsmanship &amp; Quality Specs</span>
                    </h5>
                    <div className="bg-stone-50/90 p-3.5 rounded-2xl border border-stone-200">
                      <ul className="space-y-1.5">
                        {product.craftDetails.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-stone-600">
                            <Check className="w-3.5 h-3.5 text-[#C96F4F] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: STUDIO GUARANTEE */}
              {activeTab === 'craft' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-stone-800">
                      <ShieldCheck className="w-4 h-4 text-[#42594D]" />
                      <span>100% Happiness Proof Guarantee</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Every personalized item is examined by our master printers before dispatch. If there is ever an error or defect, we reprint and express courier it immediately at no cost.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-stone-800">
                      <Truck className="w-4 h-4 text-[#B88728]" />
                      <span>Fast Dispatch &amp; Eco Protection</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Handcrafted and packed with recyclable crinkle paper and reinforced corrugated mailers to ensure pristine arrival.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Notice / Photo Guidance Banner */}
            {copiedNotice && (
              <div className="p-3 rounded-2xl bg-[#E8F8EE] border border-[#86EFAC] text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2 animate-fadeIn shadow-2xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>{copiedNotice}</span>
                </div>
                {photoUrl && (
                  <button
                    type="button"
                    onClick={handleDownloadPhoto}
                    className="underline text-[11px] hover:text-[#C96F4F] font-bold shrink-0"
                  >
                    Save Photo File
                  </button>
                )}
              </div>
            )}

            {/* Bottom Sticky Action Bar: Price and Add To Cart */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-stone-400 font-medium block">Total Investment</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-stone-900 font-serif">
                    ₹{finalPrice.toFixed(0)}
                  </span>
                  {giftWrap && (
                    <span className="text-[11px] text-stone-500">(inc. gift wrap)</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {/* Download Photo Button if photo exists */}
                {photoUrl && product.customizationOptions.requiresPhoto && (
                  <button
                    type="button"
                    onClick={handleDownloadPhoto}
                    className="p-3.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-full text-xs font-semibold transition shadow-2xs"
                    title="Download photo to attach manually"
                  >
                    <Download className="w-4 h-4 text-[#C96F4F]" />
                  </button>
                )}

                {/* Send on WhatsApp with Details & Photo */}
                <button
                  type="button"
                  id="whatsapp-send-photo-details-btn"
                  onClick={handleSendViaWhatsApp}
                  disabled={isUploadingPhoto}
                  className="flex-1 sm:flex-initial px-4 py-3.5 bg-[#E8F8EE] text-[#15803d] hover:bg-[#25D366] hover:text-white border border-[#A7F3D0] rounded-full text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition transform active:scale-95 group disabled:opacity-60"
                  title="Send details and photo directly to WhatsApp"
                >
                  {isUploadingPhoto ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#25D366]" />
                      <span>Preparing Photo Link...</span>
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                      <span>Send on WhatsApp with Photo</span>
                    </>
                  )}
                </button>

                {/* Add to Cart */}
                <button
                  type="button"
                  id="add-customized-item-btn"
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-initial px-5 py-3.5 bg-[#2E3A2F] text-white hover:bg-[#3B3432] rounded-full text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#E5BE72]" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
