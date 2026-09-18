/**
 * Central WhatsApp Configuration & Utility Services
 * printsntwins Official Direct Chat / Click-to-Chat Integration
 *
 * Requirements:
 * - Centralized configuration for business WhatsApp number and default messages
 * - Validation: digits only, contains country code (91 for India), no '+', spaces, hyphens, brackets
 * - Dynamic context-aware messaging (General, Contact page, Product/Service context, Form enquiries)
 * - Safe URL-encoding and cross-platform handling (Desktop WhatsApp Web / Mobile WhatsApp App)
 */

// 1. Central Configuration Variables
export const WHATSAPP_NUMBER = "916304938528";
export const WHATSAPP_DISPLAY_PHONE = "+91 63049 38528";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi! I'm interested in your products and services. I would like to know more.";

export const WHATSAPP_CONTACT_PAGE_MESSAGE =
  "Hi! I would like to know more about your custom crafts and printing services.";

/**
 * Validates the WhatsApp number according to strict rules:
 * - Digits only
 * - Contains country code
 * - No +, spaces, hyphens, or brackets
 */
export function validateWhatsAppNumber(num: string): { isValid: boolean; sanitized: string; error?: string } {
  const hasForbiddenChars = /[+\s\-()[\]]/.test(num);
  const sanitized = num.replace(/[^0-9]/g, '');

  if (hasForbiddenChars) {
    return {
      isValid: false,
      sanitized,
      error: "WhatsApp number must not contain '+', spaces, hyphens, or brackets."
    };
  }

  if (!/^\d{10,15}$/.test(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: "WhatsApp number must contain valid digits with country code (e.g. 916304938528)."
    };
  }

  return { isValid: true, sanitized };
}

// Ensure the configured number is valid at runtime
const validation = validateWhatsAppNumber(WHATSAPP_NUMBER);
if (!validation.isValid && typeof console !== 'undefined') {
  console.warn(`[WhatsApp Config Warning]: ${validation.error} Using sanitized: ${validation.sanitized}`);
}

const CLEAN_WHATSAPP_NUMBER = validation.sanitized || "916304938528";

/**
 * Generates the official WhatsApp Click-to-Chat URL
 * Format: https://wa.me/YOUR_WHATSAPP_NUMBER?text=YOUR_PRE_FILLED_MESSAGE
 */
export function buildWhatsAppUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  const trimmedMsg = message.trim();
  const encodedText = encodeURIComponent(trimmedMsg);
  return `https://wa.me/${CLEAN_WHATSAPP_NUMBER}?text=${encodedText}`;
}

/**
 * Pre-filled message for general inquiries or floating button
 */
export function getGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE);
}

/**
 * Pre-filled message for Contact Page direct chat button
 */
export function getContactPageWhatsAppUrl(): string {
  return buildWhatsAppUrl(WHATSAPP_CONTACT_PAGE_MESSAGE);
}

/**
 * Dynamic message when clicked from a product or service context
 * Example:
 * “Hi! I'm interested in [PRODUCT NAME].
 * Please share the price, availability, and customization details.”
 */
export function getProductWhatsAppUrl(productName: string, productPrice?: number): string {
  const priceSnippet = productPrice ? ` (Catalog Price: ₹${productPrice.toFixed(0)})` : '';
  
  const message = [
    `Hi! I'm interested in ${productName}${priceSnippet}.`,
    `Please share the price, availability, and customization details.`
  ].join('\n');

  return buildWhatsAppUrl(message);
}

/**
 * Detailed Customization Enquiry with Image & Personalization Details
 */
export interface CustomProductEnquiry {
  productName: string;
  recipientName?: string;
  customMessage?: string;
  specialDate?: string;
  fontName?: string;
  colorName?: string;
  size?: string;
  fabric?: string;
  printType?: string;
  dimension?: string;
  material?: string;
  giftWrap?: boolean;
  finalPrice: number;
  photoUrl?: string;
  photoFileName?: string;
}

export function getCustomProductWhatsAppUrl(data: CustomProductEnquiry): string {
  const lines = [
    `Hi! I would like to order ${data.productName} with my personalized details:`,
    ``,
    `📋 *Customization Details:*`,
    ...(data.dimension ? [`• *Dimensions / Size:* ${data.dimension}`] : (data.size ? [`• *T-Shirt Size:* ${data.size}`] : [])),
    ...(data.material ? [`• *Material / Craft Finish:* ${data.material}`] : (data.fabric ? [`• *Cloth / Fabric:* ${data.fabric}`] : [])),
    ...(data.printType ? [`• *Print Selection:* ${data.printType}`] : []),
    ...(data.recipientName ? [`• *Header / Headline:* ${data.recipientName}`] : []),
    ...(data.customMessage ? [`• *Memory / Subtitle:* ${data.customMessage}`] : []),
    ...(data.specialDate ? [`• *Date:* ${data.specialDate}`] : []),
    ...(data.fontName ? [`• *Lettering Style:* ${data.fontName}`] : []),
    ...(data.colorName ? [`• *Foil / Color:* ${data.colorName}`] : []),
    `• *Gift Wrap:* ${data.giftWrap ? 'Yes (Luxury Keepsake Box & Note - +₹50)' : 'Standard packaging'}`,
    `• *Total Price:* ₹${data.finalPrice.toFixed(0)}`,
    ``,
    `📸 *Photo / Artwork Attachment:*`,
    data.photoUrl && data.photoUrl.startsWith('http') && !data.photoUrl.startsWith('blob:')
      ? `• View Photo Online:\n${data.photoUrl}\n(Tap link to view & download customer's photo/artwork)`
      : `• Photo: ${data.photoFileName || 'Custom Uploaded Photo/Design'}\n• (I am sending my photo/artwork in this chat)`,
    ``,
    `Please confirm my order and share the digital proof!`
  ];

  return buildWhatsAppUrl(lines.join('\n'));
}

export interface OrderWhatsAppSummary {
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: {
    productName: string;
    quantity: number;
    recipientName?: string;
    customMessage?: string;
    size?: string;
    fabric?: string;
    printType?: string;
    dimension?: string;
    material?: string;
    photoFileName?: string;
    photoUrl?: string;
  }[];
}

export function getOrderWhatsAppUrl(order: OrderWhatsAppSummary): string {
  const itemLines = order.items.map((it, idx) => {
    return [
      `${idx + 1}. *${it.productName}* (Qty: ${it.quantity})`,
      it.dimension ? `   - Dimensions: ${it.dimension}` : (it.size ? `   - Size: ${it.size}` : ''),
      it.material ? `   - Material: ${it.material}` : (it.fabric ? `   - Fabric: ${it.fabric}` : ''),
      it.printType ? `   - Print Type: ${it.printType}` : '',
      it.recipientName ? `   - Header / Names: ${it.recipientName}` : '',
      it.customMessage ? `   - Caption / Date: ${it.customMessage}` : '',
      it.photoUrl ? `   - Photo: ${it.photoFileName || 'Photo Card Image Attached'}` : ''
    ].filter(Boolean).join('\n');
  }).join('\n\n');

  const lines = [
    `Hi! I have placed an order and want to send the details & photos:`,
    ``,
    `🧾 *Order ID:* ${order.orderId}`,
    `👤 *Customer:* ${order.customerName} (${order.customerEmail})`,
    `💰 *Total:* ₹${order.total.toFixed(0)}`,
    ``,
    `📦 *Items & Customizations:*`,
    itemLines,
    ``,
    `📸 I am also attaching/sending the uploaded photos for these items in this chat!`,
    `Please review and let me know the status.`
  ];

  return buildWhatsAppUrl(lines.join('\n'));
}

/**
 * Contact Form Enquiry -> WhatsApp formatter
 * When user fills in Name, Phone, Email, Product/Service, and Message
 */
export interface ContactEnquiryData {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  productOrService?: string;
  message: string;
}

export function getContactEnquiryWhatsAppUrl(enquiry: ContactEnquiryData): string {
  const lines = [
    "Hi! I would like to make an enquiry.",
    `Name: ${enquiry.name || 'Visitor'}`,
    `Phone: ${enquiry.phone || 'Not provided'}`,
    `Email: ${enquiry.email || 'Not provided'}`,
    ...(enquiry.address ? [`Address: ${enquiry.address}`] : []),
    `Product/Service: ${enquiry.productOrService || 'General Inquiry'}`,
    `Message: ${enquiry.message || 'I would like to inquire about your custom print offerings.'}`
  ];

  return buildWhatsAppUrl(lines.join('\n'));
}

/**
 * Helper to open WhatsApp URL in a new tab / window safely
 */
export function openWhatsApp(url: string): void {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
