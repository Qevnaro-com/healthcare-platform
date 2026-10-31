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
        <p className="mt-3 inline-block rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800">
          Official Clinical Governance &amp; Legal Policies · Pulse &amp; Care Private Limited · Effective Date: November 2026
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
    title="Privacy Notice (DPDP Act, 2023)"
    intro="Under the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025. Pulse & Care Private Limited is committed to transparent, lawful, and secure processing of personal data."
    sections={[
      {
        heading: '1. Who We Are (Data Fiduciary)',
        body: (
          <div className="space-y-3">
            <p>
              <strong>Pulse & Care Private Limited</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;, or the &ldquo;Company&rdquo;) is the Data Fiduciary under the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;) and the Digital Personal Data Protection Rules, 2025 (&ldquo;DPDP Rules&rdquo;).
            </p>
            <p>
              We provide home-based non-medical healthcare and hospital support services, including nursing care, palliative care, hospice care, newborn care, and related doorstep bedside assistance.
            </p>
            <p className="text-slate-600">
              This Privacy Notice is provided in clear and plain language and stands independently of any other document. It explains what personal data we collect, for what specific purposes we process it, how we protect it, with whom we share it, how long we retain it, and how you (the Data Principal) can exercise your statutory rights.
            </p>
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-1 text-slate-700">
              <p><strong>Corporate Identity:</strong> Pulse &amp; Care Private Limited</p>
              <p><strong>Registered Office:</strong> Aarza Square-1, Shop No-204, Second Floor, Greater Noida West Sec-4 (UP) 201013, India</p>
              <p><strong>Effective Date:</strong> 1 November 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> 30 October 2026</p>
            </div>
          </div>
        ),
      },
      {
        heading: '2. Personal Data We Collect',
        body: (
          <div className="space-y-4">
            <p>
              We collect only such personal data as is strictly necessary for the specified purposes stated in this Notice, adhering to the data minimisation principle under the DPDP Act.
            </p>
            <div className="space-y-2">
              <p className="font-bold text-slate-800">A. General Personal Data:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Full name, age, gender, date of birth.</li>
                <li>Contact details (mobile number, email address, residential / care delivery address).</li>
                <li>Emergency contact details (name, relationship, verified phone number).</li>
                <li>Service inquiry, booking details, and communication records.</li>
                <li>Technical data (IP address, device identifiers, browser type, cookies, and browsing patterns on our website/app).</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-slate-800">B. Health and Medical Data (High-Risk Personal Data):</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Medical diagnoses, prescriptions, treatment history, nursing charts, vital signs, physical condition notes.</li>
                <li>Dietary requirements, allergies, mobility status, and physician-directed care plans.</li>
                <li>Government-issued identity documents (Aadhaar, Voter ID, Passport, or other valid ID) for patient verification, safety, and background-checked caregiver deployment.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-slate-800">C. Billing &amp; Transactional Data:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Payment, invoicing, and refund transaction references (processed via PCI-DSS compliant payment gateways).</li>
                <li>Customer feedback, care logs, and service dispute communications.</li>
              </ul>
            </div>
            <p className="text-xs italic bg-blue-50 border border-blue-200 text-blue-900 p-2.5 rounded-lg">
              <strong>Protection of Minors:</strong> We do not collect or process personal data of children under 18 years without verifiable consent of the parent or lawful guardian.
            </p>
          </div>
        ),
      },
      {
        heading: '3. Purposes of Processing and Lawful Basis',
        body: (
          <div className="space-y-4">
            <p>
              We process personal data only for the following specified purposes and on the designated lawful bases under Section 4 and Section 7 of the DPDP Act:
            </p>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 border-b border-slate-200 font-bold">
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Lawful Basis</th>
                    <th className="p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-semibold">Delivery of care services</td>
                    <td className="p-3 text-[#015498] font-medium">Consent + Legitimate Use</td>
                    <td className="p-3">To provide, coordinate, dispatch nurses, and monitor home clinical care.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Patient safety &amp; emergency response</td>
                    <td className="p-3 text-[#015498] font-medium">Consent + Legitimate Use</td>
                    <td className="p-3">To contact designated emergency contacts and treating physicians promptly.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Identity verification &amp; safety</td>
                    <td className="p-3 text-[#015498] font-medium">Consent</td>
                    <td className="p-3">To verify identity of patient/care recipient and clinical caregivers.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Billing, invoicing &amp; payment processing</td>
                    <td className="p-3 text-[#015498] font-medium">Consent + Contractual Necessity</td>
                    <td className="p-3">To raise advance payment invoices, process receipts, and execute refunds.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Customer updates &amp; reminders</td>
                    <td className="p-3 text-[#015498] font-medium">Consent</td>
                    <td className="p-3">To send appointment reminders, care updates, and service-related alerts.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Statutory &amp; regulatory compliance</td>
                    <td className="p-3 text-[#015498] font-medium">Legal Obligation / Legitimate Use</td>
                    <td className="p-3">To comply with non-medical healthcare norms, taxation, and legal orders.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Quality improvement &amp; clinical audits</td>
                    <td className="p-3 text-[#015498] font-medium">Consent (Anonymised)</td>
                    <td className="p-3">To improve service delivery and conduct internal caregiver training.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="font-semibold text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-lg text-xs">
              Strict Non-Commercial Guarantee: We do NOT use personal data for marketing, advertising, profiling, or sale to third parties.
            </p>
          </div>
        ),
      },
      {
        heading: '4. Consent and Withdrawal of Consent',
        body: (
          <div className="space-y-3">
            <p>
              Consent under the DPDP Act must be free, specific, informed, unconditional, and unambiguous, signified by a clear affirmative action.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>By submitting a service inquiry, booking form, or signing a care agreement, you provide explicit affirmative consent for processing your personal data for the specified purposes.</li>
              <li>You may withdraw your consent at any time by writing to our designated Grievance Officer at <a className="text-[#015498] font-semibold" href={`mailto:${OFFICIAL_EMAIL}`}>{OFFICIAL_EMAIL}</a>.</li>
              <li>Withdrawal of consent will not affect the lawfulness of processing carried out prior to withdrawal. However, withdrawal may impact or terminate our ability to continue providing healthcare services.</li>
              <li>Upon valid withdrawal of consent (or when the specified purpose is fulfilled), we will securely erase your personal data unless statutory retention is required by Indian law.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '5. Sharing of Personal Data',
        body: (
          <div className="space-y-3">
            <p>
              We do not sell, rent, or trade personal data. Personal data is shared solely on a strict need-to-know basis with:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Assigned Caregivers &amp; Registered Nurses:</strong> Directly engaged in delivering patient care.</li>
              <li><strong>Treating Physicians &amp; Hospitals:</strong> For clinical coordination, discharge planning, and emergency escalation.</li>
              <li><strong>Authorised Cloud &amp; Technical Processors:</strong> IT infrastructure hosts, website developers, and payment gateways bound by written Data Processing Agreements (DPAs) and Non-Disclosure Agreements with strict statutory obligations under the DPDP Act.</li>
              <li><strong>Law Enforcement Authorities:</strong> Solely when formally mandated under applicable law or court orders.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '6. Security Safeguards (Section 8(5) & Rule 6)',
        body: (
          <div className="space-y-3">
            <p>
              We implement reasonable security safeguards as mandated under Section 8(5) of the DPDP Act and Rule 6 of the DPDP Rules, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>End-to-end encryption in transit (HTTPS / TLS 1.3) and secure encrypted cloud storage at rest.</li>
              <li>Strict role-based access control (RBAC) and multi-factor authentication for care staff.</li>
              <li>Comprehensive access logging, audit trails, and monitoring.</li>
              <li>Automated daily encrypted backups and disaster recovery protocols.</li>
              <li>Mandatory privacy and patient confidentiality training for all nursing attendants.</li>
            </ul>
            <p className="text-xs bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-lg">
              <strong>Breach Notification Protocol:</strong> In the event of a personal data breach, we will notify the Data Protection Board of India and affected Data Principals without undue delay, including submitting a comprehensive report to the Board within 72 hours where required under the DPDP Rules.
            </p>
          </div>
        ),
      },
      {
        heading: '7. Data Retention & Mandatory Erasure',
        body: (
          <div className="space-y-3">
            <p>
              We retain personal data only for as long as necessary to fulfil the specified care delivery purpose or as mandated by applicable healthcare and taxation regulations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Clinical Care Records:</strong> Retained for the statutory duration required by healthcare guidelines and continuity of care.</li>
              <li><strong>General Inquiries &amp; Technical Logs:</strong> Retained for a limited operational window after inquiry resolution.</li>
              <li><strong>Secure Erasure:</strong> Upon fulfilment of purpose or valid consent withdrawal, data is permanently and securely erased from our active databases and processors.</li>
            </ul>
          </div>
        ),
      },
      {
        heading: '8. Your Statutory Rights as a Data Principal',
        body: (
          <div className="space-y-3">
            <p>Under the DPDP Act, you (or your lawful nominee) hold the following statutory rights:</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700">
              <li><strong>Right to Access:</strong> Request a summary of personal data held and processing activities performed.</li>
              <li><strong>Right to Correction &amp; Completion:</strong> Request prompt rectification of misleading, inaccurate, or incomplete information.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of personal data when purpose is fulfilled or consent is withdrawn.</li>
              <li><strong>Right to Grievance Redressal:</strong> Lodge a formal grievance with our designated Grievance Officer.</li>
              <li><strong>Right to Nominate:</strong> Nominate an individual to exercise your data principal rights in the event of death or incapacity.</li>
            </ol>
            <p className="text-xs text-slate-500">
              To exercise any of these rights, submit a written request to our Grievance Officer. We will acknowledge and address verified requests within 30 days. You also have the statutory right to escalate complaints to the Data Protection Board of India after exhausting our internal grievance mechanism.
            </p>
          </div>
        ),
      },
      {
        heading: '9. Grievance Redressal Officer & Contact Details',
        body: (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs text-slate-700">
            <p className="font-bold text-sm text-slate-900">Privacy &amp; Grievance Redressal Officer</p>
            <p><strong>Company:</strong> Pulse &amp; Care Private Limited</p>
            <p><strong>Registered Address:</strong> Aarza Square-1, Shop No-204, Second Floor, Greater Noida West Sec-4 (UP) 201013, India</p>
            <p><strong>Official Email:</strong> <a className="text-[#015498] font-bold" href="mailto:pulsencare@gmail.com">pulsencare@gmail.com</a></p>
            <p><strong>Care Desk Hotline:</strong> <a className="text-[#015498] font-bold" href="tel:+919211765429">+91 921 176 5429</a></p>
            <p className="text-slate-500 pt-1">Grievances are acknowledged promptly and resolved within 30 days as prescribed by law.</p>
          </div>
        ),
      },
      {
        heading: '10. Cross-Border Data Transfers',
        body: (
          <p>
            All personal data is stored and processed on secure cloud data centres located within the territory of India. Any cross-border data transfer, if necessitated for specialised cloud processing, will strictly comply with Section 16 of the DPDP Act and Central Government notifications.
          </p>
        ),
      },
      {
        heading: '11. Notice Modifications & Affirmative Consent',
        body: (
          <div className="space-y-3">
            <p>
              We reserve the right to update this Privacy Notice to maintain alignment with the DPDP Rules, judicial directives, and technological updates. Material revisions will be highlighted on this portal with updated &ldquo;Effective Date&rdquo; timestamps.
            </p>
            <p className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-900 p-3 rounded-lg font-medium">
              By using Pulse n Care services, browsing our website, or submitting your contact/clinical details, you acknowledge that you have read, understood, and provided your free, specific, informed, and unambiguous affirmative consent to the processing of your personal data in accordance with this Privacy Notice.
            </p>
          </div>
        ),
      },
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
            Founded in Delhi NCR, Pulse n Care is a trusted home non-medical healthcare and doorstep nursing care provider. We deploy verified, qualified, and compassionate healthcare professionals to bridge the gap between hospital discharge and complete home recovery under the direction of the patient&apos;s treating physician.
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
