import React, { useState } from 'react';
import { Card } from '../../common/Card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

export const PulseNCareFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is 24×7 home nursing?',
      a: 'Pulse n Care 24×7 home nursing provides qualified, background-checked nursing support delivered at the patient’s home. This includes vital monitoring, medication administration, surgical dressing, tube feeding, and personal hygiene support based on the attending physician’s prescribed care plan.'
    },
    {
      q: 'What is the difference between 12-hour and 24-hour care?',
      a: 'A 12-hour shift covers continuous day or night care. 24-hour rotational care is delivered by two 12-hour rotating nurses to maintain round-the-clock clinical observation without nurse fatigue.'
    },
    {
      q: 'How is the nurse arranged for my patient?',
      a: 'Pulse n Care operates an internal managed care workforce. When you submit your care request, our Operations Desk reviews your patient’s clinical requirements and assigns suitable internal staff active in your Delhi NCR locality.'
    },
    {
      q: 'Can I request night nursing care?',
      a: 'Yes. Night care runs from 10:00 PM to 08:00 AM (10 Hours). Our booking system automatically calculates date rollover for overnight shifts.'
    },
    {
      q: 'What happens during a shift handover?',
      a: 'When care is arranged in rotational shifts, the outgoing nurse provides a structured 15-minute clinical briefing to the incoming nurse, handing over vitals logs, medication schedules, and pending care tasks.'
    },
    {
      q: 'What clinical support can the nurse provide?',
      a: 'Nurses administer oral and IV/IM medications as prescribed, perform sterile wound dressings, manage Ryle’s tube and PEG feeding, handle urinary catheters and stoma bags, and monitor respiratory equipment.'
    },
    {
      q: 'Can I book multiple consecutive days of home nursing?',
      a: 'Yes. You can select single visits, contiguous date ranges (e.g. 7 days post-surgery), or weekly recurring schedules in our booking wizard.'
    },
    {
      q: 'How is service availability verified?',
      a: 'We operate an internal managed clinical workforce. Address pincodes are validated during booking to allocate duty staff.'
    },
    {
      q: 'What information is required before booking?',
      a: 'We require basic patient details, medical history notes, home address, preferred shift duration, and any specific clinical requirements (e.g. wound dressing or tube feeding).'
    },
    {
      q: 'How do I contact the Pulse n Care team during care?',
      a: 'Our Operations Desk hotline is active 24/7 at +91 92117 65429 or email pulsencare@gmail.com. You can also connect directly with us on WhatsApp.'
    },
    {
      q: 'Are the nurses council-verified?',
      a: 'Yes. All Pulse n Care nurses hold B.Sc Nursing or GNM qualifications and are registered with state nursing councils with verified background checks.'
    },
    {
      q: 'What is the cancellation and rescheduling policy?',
      a: 'Bookings are 100% refundable if cancelled up to 2 hours before the scheduled shift start time. You can also reschedule your visit directly from your client dashboard.'
    }
  ];

  return (
    <section className="py-12 bg-canvas-secondary border-b border-border-default">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">
            Clinical & Service FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-text-muted">
            Clear answers about Pulse n Care 24×7 home nursing support in Delhi NCR.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Card
                key={idx}
                className={clsx(
                  'p-5 border transition-all cursor-pointer bg-white shadow-2xs',
                  isOpen ? 'border-brand-teal ring-1 ring-brand-teal/20' : 'border-border-default'
                )}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-extrabold text-text-primary text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-teal shrink-0" /> {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-brand-teal shrink-0" /> : <ChevronDown className="w-5 h-5 text-text-muted shrink-0" />}
                </div>

                {isOpen && (
                  <p className="text-xs text-text-secondary mt-3 pt-3 border-t border-border-light leading-relaxed font-medium">
                    {faq.a}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
