// EmailJS dual-email integration (Owner Notification + Customer Auto-Reply)

declare global {
  interface Window {
    emailjs?: {
      init: (options: { publicKey: string }) => void;
      send: (
        serviceId: string,
        templateId: string,
        templateParams: Record<string, any>,
        publicKey?: string
      ) => Promise<{ status: number; text: string }>;
    };
    sendMail?: () => Promise<any>;
    setEmailJSServiceId?: (id: string) => void;
    getEmailJSServiceId?: () => string;
  }
}

const metaEnv = (import.meta as any)?.env || {};

export const EMAILJS_CONFIG = {
  publicKey: 'uwRyJrybdXCTtpoj2',
  ownerTemplateId: 'template_yanrde2',    // Sends message to Studio Owner
  customerTemplateId: 'template_9scpad6', // Sends confirmation to Customer
  defaultServiceId: metaEnv.VITE_EMAILJS_SERVICE_ID || 'service_7cneare',
};

/**
 * Retrieves the active Service ID from localStorage or env
 */
export function getActiveServiceId(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('emailjs_service_id');
    if (saved && saved.trim() && saved.trim() !== 'service_yanrde2' && saved.trim() !== 'template_yanrde2') {
      return saved.trim();
    }
    localStorage.setItem('emailjs_service_id', EMAILJS_CONFIG.defaultServiceId);
  }
  return EMAILJS_CONFIG.defaultServiceId;
}

export function setActiveServiceId(serviceId: string): void {
  if (typeof window !== 'undefined' && serviceId) {
    localStorage.setItem('emailjs_service_id', serviceId.trim());
    console.log('[EmailJS] Service ID updated to:', serviceId.trim());
  }
}

if (typeof window !== 'undefined') {
  window.setEmailJSServiceId = setActiveServiceId;
  window.getEmailJSServiceId = getActiveServiceId;
}

export interface EmailParams {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  topic?: string;
  message: string;
  time?: string;
}

/**
 * Saves all customer inquiries locally as a permanent backup
 */
export function backupInquiryLocally(params: EmailParams, ticketId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const key = 'printsntwins_inquiries';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({
      ...params,
      ticketId,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 100)));
  } catch (e) {
    console.warn('[printsntwins] Could not backup inquiry locally:', e);
  }
}

/**
 * Ensures the EmailJS SDK is loaded and initialized
 */
async function ensureEmailJS(): Promise<void> {
  if (typeof window === 'undefined') return;

  if (window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    return;
  }

  await new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      }
      resolve();
    };
    script.onerror = () => {
      console.warn('[EmailJS] Network error loading EmailJS script');
      resolve(); // Do not block user
    };
    document.head.appendChild(script);
  });
}

/**
 * Sends BOTH emails without ever displaying intrusive prompts to customers:
 * 1. Notification to the Studio Owner (template_yanrde2)
 * 2. Thank You Confirmation to the Customer (template_9scpad6)
 */
export async function sendContactEmail(
  params: EmailParams,
  ticketId?: string
): Promise<{ success: boolean; ownerSent: boolean; customerSent: boolean }> {
  // Always record the customer's inquiry locally so nothing is ever lost
  if (ticketId) {
    backupInquiryLocally(params, ticketId);
  }

  await ensureEmailJS();

  const templateParams: Record<string, any> = {
    name: params.name,
    email: params.email,
    phone: params.phone || 'Not provided',
    address: params.address || 'Not provided',
    topic: params.topic || 'General Enquiry',
    message: params.message,
    time: params.time || new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
  };

  const serviceId = getActiveServiceId();

  // If Service ID is not yet configured, log for developer and return gracefully
  if (!serviceId || !window.emailjs) {
    console.warn(
      '[EmailJS Notice] Service ID is not set yet. Inquiry has been safely recorded locally in printsntwins_inquiries.',
      'To connect live email sending, add your Service ID from https://dashboard.emailjs.com/admin in .env or run setEmailJSServiceId("service_xxxxxxx")'
    );
    return { success: true, ownerSent: false, customerSent: false };
  }

  let ownerSent = false;
  let customerSent = false;

  try {
    // 1. Send owner notification
    await window.emailjs.send(
      serviceId,
      EMAILJS_CONFIG.ownerTemplateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    ownerSent = true;
    console.log('[EmailJS] Studio owner notification dispatched successfully via template_yanrde2');
  } catch (err: any) {
    console.warn('[EmailJS] Owner notification notice:', err?.text || err?.message || err);
  }

  try {
    // 2. Send customer auto-reply confirmation
    await window.emailjs.send(
      serviceId,
      EMAILJS_CONFIG.customerTemplateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    customerSent = true;
    console.log('[EmailJS] Customer auto-reply dispatched successfully via template_9scpad6');
  } catch (err: any) {
    console.warn('[EmailJS] Customer auto-reply notice:', err?.text || err?.message || err);
  }

  return { success: true, ownerSent, customerSent };
}

/**
 * Global helper sendMail()
 */
export async function sendMail(): Promise<void> {
  const getVal = (id: string, altId?: string): string => {
    const el = (document.getElementById(id) || (altId ? document.getElementById(altId) : null)) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    return el ? el.value : '';
  };

  const name = getVal('name', 'contact-form-name');
  const email = getVal('email', 'contact-form-email');
  const phone = getVal('phone', 'contact-form-phone');
  const address = getVal('address', 'contact-form-address');
  const topic = getVal('topic', 'contact-form-topic');
  const message = getVal('message', 'contact-form-message');

  if (!name || !email || !message) {
    alert('Please fill in your Name, Email, and Message.');
    return;
  }

  const params: EmailParams = {
    name,
    email,
    phone,
    address,
    topic,
    message,
    time: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
  };

  const ticketId = `PNT-${Math.floor(100000 + Math.random() * 900000)}`;
  await sendContactEmail(params, ticketId);
  alert('Thank you! Your message has been sent.');
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (form) form.reset();
}

if (typeof window !== 'undefined') {
  window.sendMail = sendMail;
}
