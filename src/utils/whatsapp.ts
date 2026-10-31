/**
 * WhatsApp & Direct Contact Integration
 * Connects prospective clients and patients directly to Pulse n Care operations desk
 */

import { track } from './track';

export const WHATSAPP_PHONE = '919211765429';
export const WHATSAPP_DISPLAY_PHONE = '+91 921 176 5429';
export const OFFICIAL_PHONE = '+91 921 176 5429';
export const OFFICIAL_PHONE_RAW = '+919211765429';
export const OFFICIAL_EMAIL = 'pulsencare@gmail.com';

export function getWhatsAppUrl(message?: string): string {
  const defaultMsg = 'Hello Pulse n Care, I would like to inquire about home healthcare and nurse care services.';
  const text = message && message.trim() ? message.trim() : defaultMsg;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(message?: string): void {
  const url = getWhatsAppUrl(message);
  track('whatsapp_click', { page: window.location.pathname });
  window.open(url, '_blank', 'noopener,noreferrer');
}
