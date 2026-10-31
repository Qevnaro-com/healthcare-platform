import { getWhatsAppUrl } from './whatsapp';
import { track } from './track';

export interface CallbackLead {
  name: string;
  phone: string;
  notes?: string;
  source: string;
}

/**
 * Delivers a callback request so it is never silently dropped.
 * - If VITE_LEAD_ENDPOINT is set, the lead is POSTed there as JSON (Formspree, a serverless function, etc.).
 * - Otherwise the lead is sent to the Duty Desk as a prefilled WhatsApp message.
 * Call this synchronously from the submit handler so the browser allows the WhatsApp tab to open.
 */
export function submitCallbackLead(lead: CallbackLead): void {
  track('callback_request', { source: lead.source });
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;

  if (endpoint) {
    void fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
    }).catch(() => {
      // Network failure: fall back to WhatsApp so the lead still reaches the desk.
      window.open(getWhatsAppUrl(buildMessage(lead)), '_blank', 'noopener,noreferrer');
    });
    return;
  }

  window.open(getWhatsAppUrl(buildMessage(lead)), '_blank', 'noopener,noreferrer');
}

function buildMessage(lead: CallbackLead): string {
  return [
    'Hello Pulse n Care, please call me back.',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.notes ? `Care needed: ${lead.notes}` : '',
    `Page: ${lead.source}`,
  ]
    .filter(Boolean)
    .join('\n');
}
