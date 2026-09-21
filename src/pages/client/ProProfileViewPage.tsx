import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Star, MapPin, CheckCircle2, ArrowLeft, Stethoscope 
} from 'lucide-react';
import { MOCK_PROFESSIONALS, MOCK_REVIEWS } from '../../data/mockData';
import { Button } from '../../components/common/Button';
import type { ProfessionalProfile, Review } from '../../types';

export const ProProfileViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'reviews' | 'credentials' | 'availability'>('overview');

  const pro: ProfessionalProfile = MOCK_PROFESSIONALS.find((p) => p.id === id) || MOCK_PROFESSIONALS[0];
  const proReviews: Review[] = MOCK_REVIEWS.filter((r: Review) => r.professionalId === pro.id);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-teal-600 via-teal-700 to-blue-700 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          </div>

          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-12 mb-6">
              <div className="flex items-end gap-5">
                <img
                  src={pro.profilePhoto}
                  alt={pro.displayName}
                  className="w-28 h-28 rounded-2xl border-4 border-white object-cover shadow-md bg-white"
                />
                <div className="mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-bold text-slate-900">{pro.displayName}</h1>
                    {pro.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Verified Clinical Pro
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 font-medium text-sm flex items-center gap-2 mt-1">
                    <Stethoscope className="w-4 h-4 text-teal-600" /> {pro.qualification} • {pro.experienceYears} Years Experience
                  </p>
                  <p className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {pro.location?.addressName || 'Delhi NCR'} ({pro.serviceRadius} km coverage)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Starting From</span>
                  <span className="text-2xl font-bold text-teal-700">₹{pro.hourlyRate}</span>
                  <span className="text-xs text-slate-500">/hr</span>
                </div>
                <Button
                  onClick={() => navigate(`/client/booking/wizard?proId=${pro.id}`)}
                  className="bg-brand-teal hover:bg-brand-teal-hover text-white font-extrabold px-6 py-3 rounded-xl shadow-sm cursor-pointer"
                >
                  Book This Care Professional
                </Button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block">Rating Score</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-base font-bold text-slate-900">{pro.rating}</span>
                  <span className="text-xs text-slate-500">({pro.reviewCount} reviews)</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Completed Care Visits</span>
                <span className="text-base font-bold text-slate-900 mt-0.5 block">{pro.totalVisits}+ Visits</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Council Registration</span>
                <span className="text-sm font-semibold text-teal-800 mt-0.5 block truncate">{pro.registrationNumber}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Vaccination Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fully Vaccinated
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 space-x-6">
          {(['overview', 'reviews', 'credentials', 'availability'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-colors cursor-pointer ${
                selectedTab === tab
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">About Professional</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{pro.bio}</p>

                <h4 className="text-sm font-bold text-slate-900 pt-2">Clinical Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {pro.specializations.map((spec: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-medium rounded-lg border border-teal-100">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Languages Spoken</h3>
                <div className="flex gap-2">
                  {pro.languages.map((lang: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">Trust & Verification</h3>
                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> State Nursing Council Verified
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Government Identity Document Verified
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Police Background Verification Clear
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CPR & BLS Certification Valid
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'reviews' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Patient & Family Reviews</h3>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-xl font-bold text-slate-900">{pro.rating}</span>
                <span className="text-xs text-slate-500">out of 5.0 ({proReviews.length} total)</span>
              </div>
            </div>

            <div className="space-y-4">
              {proReviews.length > 0 ? (
                proReviews.map((r: Review) => (
                  <div key={r.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-900">{r.clientName}</span>
                      <span className="text-xs text-slate-400">{r.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">No public reviews written yet for this professional.</p>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'credentials' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Medical Credentials, Licensing & Education</h3>
            
            <div className="p-5 bg-teal-50 border border-teal-200 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-teal-950 text-base">{pro.qualification}</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black">Verified Active</span>
              </div>
              <p className="text-xs text-teal-900 font-bold">Registration Number: {pro.registrationNumber}</p>
              <p className="text-xs text-teal-800">Delhi Nursing Council (DNC) & Indian Nursing Council (INC)</p>
              <p className="text-xs text-teal-700">Educational Degree: B.Sc in Nursing (University of Delhi, 2017)</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Past Hospital & Clinical Work History</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block">Max Super Speciality Hospital, Saket</span>
                  <span className="text-slate-600 block">Senior ICU Staff Nurse (4 Years)</span>
                  <span className="text-slate-500 text-[11px]">Post-operative recovery & critical care unit.</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block">Fortis Healthcare, Vasant Kunj</span>
                  <span className="text-slate-600 block">Clinical Home Care Nurse (3 Years)</span>
                  <span className="text-slate-500 text-[11px]">Tracheostomy, Ryle's tube & IV infusions.</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Certifications & Clearances</h4>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl border border-slate-200">
                  ✓ Basic Life Support (BLS) — AHA Certified
                </span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl border border-slate-200">
                  ✓ Advanced Cardiovascular Life Support (ACLS)
                </span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl border border-slate-200">
                  ✓ Delhi Police Background Check Passed
                </span>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl border border-slate-200">
                  ✓ Annual Physical & Medical Fitness Clear
                </span>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'availability' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Shift Availability</h3>
            <p className="text-xs text-slate-500">Professional is available for immediate home-care bookings in Delhi NCR Care Areas.</p>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold py-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                  <span className="block font-bold">{day}</span>
                  <span className="text-[10px] text-emerald-600">Available</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
