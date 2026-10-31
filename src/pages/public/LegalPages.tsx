import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { OFFICIAL_EMAIL, OFFICIAL_PHONE } from '../../utils/whatsapp';

interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

const LegalLayout: React.FC<{ title: string; intro: string; sections: LegalSection[] }> = ({ title, intro, sections }) => {
  usePageMeta(title, intro);
  return (
    <div className="bg-gradient-to-b from-[#F4F8FB] to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#015498] mb-3">Pulse n Care · Legal</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">{title}</h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{intro}</p>
        <p className="mt-3 inline-block rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-800">
          Draft for review. Last updated: 2026. Please have this checked by a legal professional before relying on it.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-semibold text-slate-900 tracking-[-0.01em]">{s.heading}</h2>
              <div className="mt-2 text-sm sm:text-[15px] text-slate-600 leading-relaxed space-y-2">{s.body}</div>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#015498]">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/medical-disclaimer">Medical Disclaimer</Link>
          <Link to="/">Back to home</Link>
        </div>
      </div>
    </div>
  );
};

const contactLine = (
  <p>
    Questions? Email <a className="text-[#015498] font-semibold" href={`mailto:${OFFICIAL_EMAIL}`}>{OFFICIAL_EMAIL}</a> or call{' '}
    <a className="text-[#015498] font-semibold" href="tel:+919211765429">{OFFICIAL_PHONE}</a>.
  </p>
);

export const PrivacyPolicyPage: React.FC = () => (
  <LegalLayout
    title="Privacy Policy"
    intro="How Pulse n Care collects, uses and protects the personal information you share when you ask for a callback, chat with us on WhatsApp or book care."
    sections={[
      {
        heading: 'What we collect',
        body: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name and phone number when you request a callback or message us.</li>
            <li>Care requirements you choose to share (for example the patient&apos;s condition, shift type and area).</li>
            <li>Basic technical data such as pages visited, to keep the website working.</li>
          </ul>
        ),
      },
      {
        heading: 'Why we use it',
        body: <p>Only to respond to your enquiry, understand the care needed, match a suitable nurse or attendant, share quotes and schedules, and follow up on service quality. We do not sell your information.</p>,
      },
      {
        heading: 'WhatsApp and phone contact',
        body: <p>When you tap a WhatsApp or call button, or submit a callback form, your message reaches our Central Care Desk through WhatsApp or phone. WhatsApp is a third-party service with its own privacy terms.</p>,
      },
      {
        heading: 'Health information',
        body: <p>Please share only what is needed to arrange care. Medical details you provide are used by our care team and the assigned clinician for that purpose and are kept confidential.</p>,
      },
      {
        heading: 'Storage and retention',
        body: <p>We keep enquiry and service records only as long as needed to provide care, meet legal obligations and resolve disputes, and then delete or anonymise them.</p>,
      },
      {
        heading: 'Your choices',
        body: <p>You may ask to see, correct or delete the personal data we hold about you, or withdraw consent to be contacted, at any time. We will respond within a reasonable period.</p>,
      },
      { heading: 'Contact', body: contactLine },
    ]}
  />
);

export const TermsPage: React.FC = () => (
  <LegalLayout
    title="Terms of Service & Refund Policy"
    intro="Terms governing the booking, advance payment, cancellations, refunds, and replacement guarantees for home nursing and bedside attendant care arranged through Pulse n Care across Delhi NCR."
    sections={[
      {
        heading: '1. About Our Service',
        body: (
          <p>
            Founded in Delhi NCR, Pulse n Care is a trusted home non-medical healthcare and doorstep nursing care provider funded by an NRI through Foreign Direct Investment (FDI). We deploy verified, qualified, and compassionate healthcare professionals to bridge the gap between hospital discharge and complete home recovery under the direction of the patient&apos;s treating physician.
          </p>
        ),
      },
      {
        heading: '2. Advance Payment Policy',
        body: (
          <p>
            All home healthcare services, including 12-hour nursing shifts, 24/7 live-in care, post-operative support, short-visit clinical procedures, and physiotherapy, operate on an <strong>Advance Payment</strong> model. Service fees must be received in advance prior to staff deployment to confirm your schedule and reserve assigned clinical personnel.
          </p>
        ),
      },
      {
        heading: '3. Refund & Cancellation Policy',
        body: (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900 text-sm">Advance Cancellation (100% Full Refund)</p>
              <p className="text-xs text-slate-600 mt-1">
                Full refund will be issued if the service is canceled at least 24 hours prior to the scheduled staff deployment.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900 text-sm">Mid-Service Discontinuation (Pro-Rata Refund)</p>
              <p className="text-xs text-slate-600 mt-1">
                If care is discontinued midway through an active booking, a pro-rata refund will be calculated for the unutilized days, minus a standard 2-day administrative transition fee.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900 text-sm">Free 24-Hour Replacement Guarantee</p>
              <p className="text-xs text-slate-600 mt-1">
                Free replacement will be dispatched within 24 hours if a client is unsatisfied with the performance, compatibility, or conduct of the assigned nurse or attendant.
              </p>
            </div>
          </div>
        ),
      },
      {
        heading: '4. Non-Medical Care Boundaries & Responsibilities',
        body: (
          <p>
            Our nurses and attendants provide supportive bedside nursing adhering strictly to medical prescriptions provided by the patient&apos;s treating doctor or hospital discharge summary. Pulse n Care does not alter prescriptions or diagnose medical conditions independently.
          </p>
        ),
      },
      {
        heading: '5. Limits of Liability',
        body: (
          <p>
            To the extent permitted by law, Pulse n Care is not liable for clinical outcomes arising from withheld or inaccurate medical history, or conditions outside our reasonable caregiving scope.
          </p>
        ),
      },
      { heading: 'Contact & Billing Desk', body: contactLine },
    ]}
  />
);

export const MedicalDisclaimerPage: React.FC = () => (
  <LegalLayout
    title="Medical Disclaimer"
    intro="Important information about what this website and our services are, and are not."
    sections={[
      {
        heading: 'Not for emergencies',
        body: (
          <p>
            Pulse n Care is a home-care arrangement service, not an emergency service. In an emergency call <strong>112</strong> or your nearest hospital immediately. Do not wait for a callback or a WhatsApp reply.
          </p>
        ),
      },
      {
        heading: 'Information is general',
        body: <p>Content on this website is for general information and is not medical advice, diagnosis or treatment. Always follow the advice of the patient&apos;s treating doctor.</p>,
      },
      {
        heading: 'Illustrative visuals',
        body: <p>Charts, vital-sign readings and similar visuals on this website are illustrative examples of our documentation process and are not real patient data.</p>,
      },
      {
        heading: 'Care at home',
        body: <p>Our nurses and caregivers provide care as per the doctor&apos;s prescription and their scope of training. Outcomes vary from patient to patient and cannot be guaranteed.</p>,
      },
      { heading: 'Contact', body: contactLine },
    ]}
  />
);
