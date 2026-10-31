import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MOCK_JOB_POSTINGS } from '../../data/mockCareersData';
import { WhatsAppIcon } from '../../components/common/WhatsAppButton';
import { openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../../utils/whatsapp';
import {
  Briefcase,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  Heart,
  Users,
  Sparkles,
  MessageCircle,
  FileCheck2,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredJobs = selectedCategory === 'all'
    ? MOCK_JOB_POSTINGS
    : MOCK_JOB_POSTINGS.filter((j) => j.roleCategory === selectedCategory);

  const handleApplyViaWhatsApp = (jobTitle: string, jobCode: string, salary: string, exp: string) => {
    const text = `Hello Pulse n Care HR Team,\n\nI am applying for the position of: *${jobTitle}* (Job Code: ${jobCode}).\n- Expected Salary: ${salary}\n- Required Experience: ${exp}\n- Sign-In Bonus: ₹10,000\n\nPlease find my qualifications and experience attached. Kindly let me know the interview schedule for Delhi NCR.`;
    openWhatsApp(text);
  };

  return (
    <div className="space-y-12 pb-20 text-left relative max-w-7xl mx-auto px-4 sm:px-6 bg-transparent">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-teal-900/40">
        <div className="hidden sm:block absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            NRI FDI Backed Healthcare Startup · Direct WhatsApp Hiring
          </div>
          <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Build Your Clinical Nursing Career with <span className="text-teal-400">Pulse n Care</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg font-medium leading-relaxed">
            Join North India's fastest-growing home healthcare ecosystem. We offer guaranteed on-time salaries, ₹10,000 sign-in bonus, shift flexibility, comprehensive health coverage, and zero agency middlemen.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              <p className="text-slate-400 font-semibold text-[11px]">Sign-In Bonus</p>
              <p className="text-amber-400 font-extrabold text-sm sm:text-base">₹10,000 Flat</p>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              <p className="text-slate-400 font-semibold text-[11px]">Monthly Payroll</p>
              <p className="text-white font-extrabold text-sm sm:text-base">1st of Month</p>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              <p className="text-slate-400 font-semibold text-[11px]">Shifts Available</p>
              <p className="text-white font-extrabold text-sm sm:text-base">12h & 24h Live-In</p>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              <p className="text-slate-400 font-semibold text-[11px]">Hiring Process</p>
              <p className="text-teal-400 font-extrabold text-sm sm:text-base">Direct WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step WhatsApp Hiring Guide */}
      <section className="bg-emerald-50/80 border border-emerald-200/90 rounded-3xl p-6 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                100% Hassle-Free Recruitment
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                No Lengthy Forms — Apply Directly on WhatsApp in 3 Easy Steps
              </h2>
            </div>
            <button
              onClick={() => openWhatsApp('Hello Pulse n Care HR, I am looking for a nursing job in Delhi NCR. Please guide me on open positions.')}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
              <span>Message HR Desk ({WHATSAPP_DISPLAY_PHONE})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 text-sm">
                1
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Select Your Role</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Browse open positions below (GNM/B.Sc Nurse, ICU Nurse, Bedside Attendant) and tap <strong>"Apply on WhatsApp"</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 text-sm">
                2
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Share Resume & Nursing Reg.</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  WhatsApp will open with a pre-filled draft. Attach your CV or Nursing Council Registration photo.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 text-sm">
                3
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Interview within 24 Hours</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Our HR & Clinical Lead will verify your credentials and arrange an in-person or video interview right away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Healthcare Professionals Choose Us */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Why Nurses & Caregivers Love Pulse n Care</h2>
          <p className="text-slate-600 text-sm">
            We prioritize clinical safety, dignity, transparent earnings, and professional growth for every care team member.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3 border-slate-200 hover:shadow-lg transition-all rounded-3xl bg-white">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Top Industry Pay & On-Time Payroll</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guaranteed 1st-of-month direct bank transfer. Extra night-shift allowances, emergency overtime incentives, and ₹10,000 joining bonus.
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-slate-200 hover:shadow-lg transition-all rounded-3xl bg-white">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Health Insurance & Clinical Dignity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Medical insurance coverage for you and family, sterile medical PPE supply kits, and 24x7 Doctor On-Call escalation support.
            </p>
          </Card>

          <Card className="p-6 space-y-3 border-slate-200 hover:shadow-lg transition-all rounded-3xl bg-white">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Flexible Shift Rosters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose between 12-hour day shifts, 12-hour night shifts, or high-earning 24/7 live-in deployments across Delhi, Gurgaon, Noida, and Faridabad.
            </p>
          </Card>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Current Job Openings (Delhi NCR)</h2>
            <p className="text-xs text-slate-500">Tap below to apply directly via WhatsApp</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'all', label: 'All Openings' },
              { id: 'registered_nurse', label: 'Home Healthcare Nurse' },
              { id: 'icu_nurse', label: 'ICU / Critical Care' },
              { id: 'caregiver_attendant', label: 'Bedside Caregiver' },
              { id: 'physiotherapist', label: 'Physiotherapist' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-5">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="p-6 sm:p-7 border-slate-200 hover:border-teal-400 hover:shadow-xl transition-all space-y-5 rounded-3xl bg-white"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="info" className="uppercase font-bold text-[10px] tracking-wider">
                      {job.jobCode}
                    </Badge>
                    <Badge variant="success" className="capitalize font-semibold text-[11px]">
                      {job.employmentType.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs font-black text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                      💰 {job.salaryRange}
                    </span>
                    <span className="text-xs font-black text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      ₹10,000 Sign-In Bonus
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">{job.title}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                      Experience: {job.experienceRequired}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      Immediate Joining in Delhi NCR
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp Action Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyViaWhatsApp(
                        job.title,
                        job.jobCode,
                        job.salaryRange,
                        job.experienceRequired
                      )
                    }
                    className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-black flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:scale-[1.02] cursor-pointer transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Apply on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 text-emerald-200" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                {job.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                  <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-teal-600" /> Required Skills & Qualifications:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 pl-1">
                    {job.qualifications.map((q, idx) => (
                      <li key={idx} className="leading-snug">{q}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                  <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Benefits & Perks:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 pl-1">
                    {job.benefits.map((b, idx) => (
                      <li key={idx} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instant WhatsApp note */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <FileCheck2 className="w-3.5 h-3.5" /> No registration charges · 100% Free Candidate Application
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  Direct Response within 24 Hours
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Direct HR Support Card */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-4 h-4 text-teal-400" /> HR Helpdesk & Candidate Helpline
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Have Questions About Shifts, Salaries, or Relocation?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            Speak directly with our Nursing Recruitment Lead on WhatsApp. We provide accommodation guidance for outstation nurses coming to Delhi NCR.
          </p>
        </div>
        <button
          onClick={() => openWhatsApp('Hello Pulse n Care HR Team, I have a query regarding nursing recruitment in Delhi NCR.')}
          className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm flex items-center gap-2.5 shadow-lg shadow-emerald-500/20 hover:scale-105 cursor-pointer transition-all shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Chat with HR Lead</span>
        </button>
      </section>
    </div>
  );
};
