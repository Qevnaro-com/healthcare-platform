import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Languages,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppButton';
import { openWhatsApp } from '../../utils/whatsapp';

export interface LeaderData {
  id: 'sachin' | 'ishwari' | 'alka';
  nameEn: string;
  nameHi: string;
  roleEn: string;
  roleHi: string;
  shortNameEn: string;
  shortNameHi: string;
  qualificationsEn: string;
  qualificationsHi: string;
  experienceBadgeEn: string;
  experienceBadgeHi: string;
  photoUrl: string;
  tagEn: string;
  tagHi: string;
  quoteEn: string;
  quoteHi: string;
  bioEn: string;
  bioHi: string;
  directivesTitleEn: string;
  directivesTitleHi: string;
  directives: {
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
    tag: string;
  }[];
  whatsAppMsgEn: string;
  whatsAppMsgHi: string;
  actionEn: string;
  actionHi: string;
}

export const LEADERS: LeaderData[] = [
  {
    id: 'sachin',
    nameEn: 'Sachin Gautam',
    nameHi: 'सचिन गौतम',
    shortNameEn: 'Sachin Gautam',
    shortNameHi: 'सचिन गौतम',
    roleEn: 'Founder & Chief Executive Officer (CEO)',
    roleHi: 'संस्थापक एवं मुख्य कार्यकारी अधिकारी (CEO)',
    qualificationsEn: 'BA · Technical Training in ITI Electrical Engineering',
    qualificationsHi: 'बीए (BA) · तकनीकी प्रशिक्षण आईटीआई इलेक्ट्रिकल इंजीनियरिंग',
    experienceBadgeEn: 'Visionary Leadership & Operational Rigour',
    experienceBadgeHi: 'रणनीतिक नेतृत्व एवं परिचालन अनुशासन',
    photoUrl: '/assets/images/team/sachin-gautam-founder-ceo.jpg',
    tagEn: 'FOUNDER & CEO · STRATEGIC LEADERSHIP',
    tagHi: 'संस्थापक एवं मुख्य कार्यकारी अधिकारी',
    quoteEn:
      'Driven by a vision to transform nursing care through uncompromising professionalism, continuous patient safety, and compassionate bedside care across Delhi NCR.',
    quoteHi:
      'दिल्ली एनसीआर में व्यावसायिकता, अटूट मरीज सुरक्षा और संवेदनशील नर्सिंग केयर के माध्यम से गृह स्वास्थ्य सेवा में एक नया मानक स्थापित करने के लिए समर्पित।',
    bioEn:
      'Sachin Gautam is the Founder and CEO of Pulse n Care Private Limited, driven by a vision to transform nursing care through professionalism, quality and compassion. With an academic background in BA and technical training in ITI Electrical Engineering, he brings strong leadership, strategic thinking and operational discipline to the organisation. He focuses on business growth, service excellence, patient safety and building Pulse n Care into a trusted name in nursing care services.',
    bioHi:
      'सचिन गौतम पल्स एन केयर प्राइवेट लिमिटेड (Pulse n Care Private Limited) के संस्थापक एवं मुख्य कार्यकारी अधिकारी (CEO) हैं। वे व्यावसायिकता, गुणवत्ता और संवेदनशीलता के माध्यम से नर्सिंग केयर सेवाओं में सकारात्मक बदलाव लाने के विजन के साथ संस्था का नेतृत्व कर रहे हैं। बीए और आईटीआई इलेक्ट्रिकल इंजीनियरिंग की तकनीकी पृष्ठभूमि के साथ, वे संगठन में मजबूत नेतृत्व, रणनीतिक सोच और परिचालन अनुशासन का संचार करते हैं। उनका मुख्य ध्यान व्यावसायिक विकास, सेवा उत्कृष्टता, मरीज सुरक्षा और पल्स एन केयर को एक विश्वसनीय नाम बनाने पर है।',
    directivesTitleEn: "Founder's 4 Core Leadership Directives:",
    directivesTitleHi: 'संस्थापक के 4 मुख्य संगठनात्मक सिद्धांत:',
    directives: [
      {
        titleEn: 'Patient Safety & Clinical Zero-Harm',
        titleHi: 'मरीज सुरक्षा व शून्य-जोखिम नीति',
        descEn: 'Strict verification of clinical credentials, doctor prescription adherence, and sterile bedside hygiene protocols for every home deployment.',
        descHi: 'प्रत्येक होम केयर पोस्टिंग पर क्लिनिकल क्रेडेंशियल्स का सत्यापन, डॉक्टर की पर्ची का सटीक पालन और सेप्टिक हाइजीन प्रोटोकॉल।',
        tag: 'Directive 01'
      },
      {
        titleEn: 'Operational Discipline & Accountability',
        titleHi: 'परिचालन अनुशासन व जवाबदेही',
        descEn: 'Punctual shift handovers, daily digital vitals reporting, and engineering-grade discipline in dispatch timelines.',
        descHi: 'समयबद्ध शिफ्ट हैंडओवर, दैनिक डिजिटल वाइटल्स रिपोर्टिंग और 24/7 ड्यूटी डेस्क के माध्यम से सटीक परिचालन निगरानी।',
        tag: 'Directive 02'
      },
      {
        titleEn: 'Compassionate & Dignified Care',
        titleHi: 'गरिमापूर्ण व करुणामयी देखभाल',
        descEn: 'Treating every bedridden senior, post-operative patient, and mother with utmost empathy, respect, and emotional reassurance.',
        descHi: 'हर बुजुर्ग, सर्जरी उपरांत मरीज और नई माता को अपने परिवार के सदस्य की भांति पूर्ण सम्मान, संवेदनशीलता और आत्मीयता देना।',
        tag: 'Directive 03'
      },
      {
        titleEn: 'Sustainable Growth & Service Excellence',
        titleHi: 'निरंतर विकास व सेवा उत्कृष्टता',
        descEn: 'Building Pulse n Care into Delhi NCR’s most trusted home nursing institution with transparent pricing and zero hidden costs.',
        descHi: 'पारदर्शी दरों, बिना किसी छिपे शुल्क और अटूट सेवा गुणवत्ता के साथ पल्स एन केयर को दिल्ली एनसीआर का शीर्ष ब्रांड बनाना।',
        tag: 'Directive 04'
      }
    ],
    whatsAppMsgEn:
      'Hello Sachin Gautam and Pulse n Care Team, I would like to consult regarding home nursing assistance for my family member.',
    whatsAppMsgHi:
      'नमस्ते सचिन गौतम जी एवं Pulse n Care टीम, मुझे अपने मरीज/परिवार के सदस्य की होम नर्सिंग सेवा के लिए परामर्श चाहिए।',
    actionEn: 'Consult with Sachin Gautam on WhatsApp',
    actionHi: 'व्हाट्सएप पर संस्थापक से परामर्श लें'
  },
  {
    id: 'ishwari',
    nameEn: 'Smt. Ishwari',
    nameHi: 'श्रीमती ईश्वरी',
    shortNameEn: 'Smt. Ishwari',
    shortNameHi: 'श्रीमती ईश्वरी',
    roleEn: 'Co-Founder & Chief Care Specialist',
    roleHi: 'सह-संस्थापक एवं मुख्य देखभाल विशेषज्ञ',
    qualificationsEn: '20+ Years Bedside Nursing & Caregiving · Hospice & Palliative Care',
    qualificationsHi: '20 से अधिक वर्षों का समर्पित क्लिनिकल केयरगिविंग · पैलिएटिव व हॉस्पिस विशेषज्ञ',
    experienceBadgeEn: '20+ Years Dedicated Bedside Care',
    experienceBadgeHi: '20+ वर्ष समर्पित बेडसाइड देखभाल',
    photoUrl: '/assets/images/founder/smt-ishwari-ceo-portrait.webp',
    tagEn: 'CO-FOUNDER · BEDSIDE & HOSPICE SPECIALIST',
    tagHi: 'सह-संस्थापक एवं मुख्य देखभाल विशेषज्ञ',
    quoteEn:
      'A highly experienced specialist with two decades of excellence in palliative, hospice, special needs, and mother-and-newborn care, ensuring comfort, safety, and peace of mind for every family.',
    quoteHi:
      'पैलिएटिव केयर, हॉस्पिस केयर, विशेष देखभाल वाले मरीजों और नवजात शिशु एवं माता की देखभाल में 20 से अधिक वर्षों के अनुभव के साथ एक समर्पित विशेषज्ञ, जो हर परिवार को सुरक्षा व निश्चिंतता देती हैं।',
    bioEn:
      'Smt. Ishwari brings two decades of compassionate bedside caregiving and clinical empathy to Pulse n Care. Under her personal guidance, our caregivers, nurses, and attendants are trained in her time-tested principles of patient dignity, meticulous bed-bath hygiene, fall prevention, and respectful communication. She oversees hospice care, palliative comfort, and post-partum mother and infant recovery across Delhi NCR.',
    bioHi:
      'श्रीमती ईश्वरी पल्स एन केयर में दो दशकों का आत्मीय एवं करुणामयी बेडसाइड देखभाल का अनुभव प्रदान करती हैं। उनके व्यक्तिगत मार्गदर्शन में, संस्था का प्रत्येक केयरगिवर और नर्स मरीज की गरिमा, व्यक्तिगत स्वच्छता (स्पंज बाथ), बेड-सोर से पूर्ण बचाव, और सम्मानजनक व्यवहार के सिद्धांतों में प्रशिक्षित किया जाता है। वे दिल्ली एनसीआर में हॉस्पिस, पैलिएटिव और प्रसवोपरांत माता-शिशु देखभाल की मुख्य संरक्षक हैं।',
    directivesTitleEn: "Bedside Clinical Directives (20+ Yrs Standards):",
    directivesTitleHi: 'बेडसाइड देखभाल के 4 मुख्य नैदानिक सिद्धांत:',
    directives: [
      {
        titleEn: 'Aseptic Bed-Bath & Zero Bed-Sore Routine',
        titleHi: 'व्यक्तिगत स्वच्छता व स्पंज बाथ प्रोटोकॉल',
        descEn: 'Meticulous 2-hour repositioning routines and daily anti-septic sponge baths to maintain skin integrity and prevent bed-sores in bedridden patients.',
        descHi: 'बेडरिडन मरीजों में बेड-सोर से पूर्ण बचाव के लिए हर 2 घंटे में करवट बदलना, नियमित स्पंज बाथ और त्वचा की वैज्ञानिक सुरक्षा।',
        tag: 'Standard 01'
      },
      {
        titleEn: 'Palliative Comfort & Vitals Escalation',
        titleHi: 'पैलिएटिव पीड़ा निवारण व वाइटल्स मॉनिटरिंग',
        descEn: 'Doctor-synced symptom relief and continuous digital monitoring of BP, SpO2, and glucose, ensuring immediate medical escalation if readings deviate.',
        descHi: 'डॉक्टर की पर्ची अनुसार समय पर दवाइयों का प्रबंधन, वाइटल्स (बीपी, शुगर, ऑक्सीजन) की निगरानी और इमरजेंसी में तुरंत डॉक्टर से संपर्क।',
        tag: 'Standard 02'
      },
      {
        titleEn: 'Senior Fall Prevention & Mobility Support',
        titleHi: 'बुजुर्गों की सुरक्षा व गिरने से बचाव',
        descEn: 'Dedicated companion support during every bathroom visit and walking routine, eliminating slip hazards and restoring senior movement confidence.',
        descHi: 'शौचालय जाने व चलने में सहारा, फिसलने के जोखिम को खत्म करना और बुजुर्गों के साथ सम्मानजनक व आत्मीय साथी की तरह रहना।',
        tag: 'Standard 03'
      },
      {
        titleEn: 'Infant Massage & Postpartum Recovery',
        titleHi: 'शिशु मालिश व प्रसवोपरांत माता की सेवा',
        descEn: 'Traditional yet scientifically guided infant massage, gentle baby bathing, feeding posture guidance, and soothing care for new mothers.',
        descHi: 'नवजात शिशु की वैज्ञानिक व पारंपरिक मालिश, सुरक्षित स्नान, फीडिंग में मदद और नई माता की प्रसवोपरांत रिकवरी में विशेष देखभाल।',
        tag: 'Standard 04'
      }
    ],
    whatsAppMsgEn:
      'Hello Smt. Ishwari and Pulse n Care Team, I would like to consult regarding bedside caregiving assistance for my family member.',
    whatsAppMsgHi:
      'नमस्ते श्रीमती ईश्वरी जी एवं Pulse n Care टीम, मुझे अपने मरीज/परिवार के सदस्य की होम केयर के लिए परामर्श चाहिए।',
    actionEn: 'Consult with Smt. Ishwari on WhatsApp',
    actionHi: 'व्हाट्सएप पर ईश्वरी जी से सलाह लें'
  },
  {
    id: 'alka',
    nameEn: 'Alka Suman',
    nameHi: 'अलका सुमन',
    shortNameEn: 'Alka Suman',
    shortNameHi: 'अलका सुमन',
    roleEn: 'Operations & Business Development Manager',
    roleHi: 'ऑपरेशंस एवं बिजनेस डेवलपमेंट मैनेजर',
    qualificationsEn: 'MBA in Hospital Administration · Clinical Healthcare Background',
    qualificationsHi: 'एमबीए (हॉस्पिटल एडमिनिस्ट्रेशन) · क्लिनिकल हेल्थकेयर पृष्ठभूमि',
    experienceBadgeEn: '~4 Years Hospital Admin & Healthcare Operations',
    experienceBadgeHi: '~4 वर्ष अस्पताल प्रबंधन व स्वास्थ्य सेवा संचालन',
    photoUrl: '/assets/images/team/alka-suman-operations-manager.jpg',
    tagEn: 'OPERATIONS & BD · HEALTHCARE MANAGEMENT',
    tagHi: 'प्रचालन एवं व्यवसाय विकास प्रबंधन',
    quoteEn:
      'Specialising in hospital partnerships, structured patient counselling, and rigorous caregiver recruitment to deliver institutional-grade bedside care in home settings.',
    quoteHi:
      'अस्पताल साझेदारियों, मरीज काउंसलिंग और पारदर्शी स्टाफ चयन प्रणाली द्वारा अस्पताल स्तर की गुणवत्तापूर्ण सेवाएं घर पर उपलब्ध कराने में समर्पित।',
    bioEn:
      'Alka Suman is a healthcare management professional with nearly four years of experience in hospital administration, healthcare operations and quality management. With an MBA in Hospital Administration and a background in clinical healthcare, she specialises in patient counselling, client relationship management, institutional meetings, hospital partnerships, business development, staff recruitment and operational coordination. At Pulse n Care, she focuses on strengthening healthcare partnerships, developing efficient operational systems and ensuring professional, compassionate and quality-driven nursing care services.',
    bioHi:
      'अलका सुमन एक समर्पित हेल्थकेयर मैनेजमेंट प्रोफेशनल हैं, जिन्हें हॉस्पिटल एडमिनिस्ट्रेशन, हेल्थकेयर ऑपरेशंस और क्वालिटी मैनेजमेंट में लगभग 4 वर्षों का अनुभव है। हॉस्पिटल एडमिनिस्ट्रेशन में एमबीए और क्लिनिकल हेल्थकेयर की पृष्ठभूमि के साथ, वे पेशेंट काउंसलिंग, क्लाइंट रिलेशनशिप मैनेजमेंट, इंस्टीट्यूशनल मीटिंग्स, अस्पताल साझेदारियों, बिजनेस डेवलपमेंट, स्टाफ रिक्रूटमेंट और ऑपरेशनल कोऑर्डिनेशन में विशेषज्ञता रखती हैं। पल्स एन केयर में उनका मुख्य फोकस हेल्थकेयर पार्टनरशिप्स को मजबूत करने, कुशल परिचालन प्रणाली विकसित करने और गुणवत्तापूर्ण व करुणामयी नर्सिंग सेवाएं सुनिश्चित करने पर है।',
    directivesTitleEn: "Operational & Partnership Directives:",
    directivesTitleHi: 'प्रचालन एवं अस्पताल साझेदारी के मुख्य आधार:',
    directives: [
      {
        titleEn: 'Hospital Partnerships & Institutional Coordination',
        titleHi: 'अस्पताल व संस्थागत साझेदारियां',
        descEn: 'Fostering seamless discharge handovers with leading hospitals, ensuring patients transition from ICU to home recovery without procedural delays.',
        descHi: 'अग्रणी अस्पतालों के साथ सुचारू डिस्चार्ज समन्वय, जिससे मरीज बिना किसी रुकावट के आईसीयू से होम रिकवरी में ट्रांसफर हो सकें।',
        tag: 'Pillar 01'
      },
      {
        titleEn: 'Patient Counselling & Clinical Assessment',
        titleHi: 'मरीज काउंसलिंग व जरूरत का मूल्यांकन',
        descEn: 'In-depth pre-deployment consultations with family members and attending doctors to craft tailored 12h/24h nursing plans.',
        descHi: 'मरीज की स्थिति और डॉक्टर के निर्देशों के अनुसार परिवार से विस्तृत परामर्श कर उपयुक्त 12h/24h नर्सिंग योजना तैयार करना।',
        tag: 'Pillar 02'
      },
      {
        titleEn: 'Rigorous Staff Recruitment & Vetting',
        titleHi: 'सख्त स्टाफ चयन व पृष्ठभूमि सत्यापन',
        descEn: 'Multi-stage recruitment verifying nursing council registration, clinical bedside competency, and background police verification.',
        descHi: 'नर्सिंग काउंसिल पंजीकरण, क्लिनिकल दक्षता और बैकग्राउंड वेरिफिकेशन के साथ बहु-स्तरीय कठोर चयन प्रक्रिया।',
        tag: 'Pillar 03'
      },
      {
        titleEn: 'Quality Assurance & Escalation Protocol',
        titleHi: 'गुणवत्ता आश्वासन व त्वरित समाधान प्रणाली',
        descEn: 'Active monitoring of staff punctuality, patient feedback loops, and 24x7 immediate replacement guarantees if needs evolve.',
        descHi: 'स्टाफ की समयबद्धता, नियमित फीडबैक कॉल और किसी भी समस्या की स्थिति में 24/7 तत्काल स्टाफ रिप्लेसमेंट की व्यवस्था।',
        tag: 'Pillar 04'
      }
    ],
    whatsAppMsgEn:
      'Hello Alka Suman and Pulse n Care Operations Team, I would like to discuss hospital partnership / patient nursing requirements.',
    whatsAppMsgHi:
      'नमस्ते अलका सुमन जी एवं Pulse n Care टीम, मुझे अस्पताल साझेदारी / पेशेंट केयर आवश्यकताओं पर चर्चा करनी है।',
    actionEn: 'Connect with Alka Suman for Hospital Tie-ups',
    actionHi: 'अस्पताल साझेदारी व प्रचालन हेतु संपर्क करें'
  }
];

export const FounderCeoSpotlight: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedLeaderId, setSelectedLeaderId] = useState<'sachin' | 'ishwari' | 'alka'>('sachin');
  const [activeDirective, setActiveDirective] = useState<number>(0);

  const activeLeader = LEADERS.find((l) => l.id === selectedLeaderId) || LEADERS[0];

  const handleLeaderChange = (id: 'sachin' | 'ishwari' | 'alka') => {
    setSelectedLeaderId(id);
    setActiveDirective(0);
  };

  return (
    <section id="founder-ceo" className="py-8 sm:py-16 bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] border-b border-slate-200/90 text-left relative overflow-hidden">
      {/* Background Spatial Atmosphere */}
      <div className="hidden sm:block absolute top-0 right-1/4 w-[480px] h-[480px] bg-sky-100/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 left-1/4 w-[420px] h-[420px] bg-rose-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        
        {/* Top Header & Bilingual Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#015498] text-[11px] sm:text-xs font-black uppercase tracking-wider border border-blue-200">
              <Award className="w-3.5 h-3.5 text-[#015498]" />
              <span>LEADERSHIP &amp; CLINICAL DIRECTIVES · PULSE N CARE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-[-0.02em] leading-tight">
              {language === 'en' ? (
                <>
                  Care with Heart. Led by <span className="text-[#015498]">Experience &amp; Discipline.</span>
                </>
              ) : (
                <>
                  समर्पण, अनुशासन और अनुभव से सिंचित <span className="text-[#015498]">सच्ची देखभाल।</span>
                </>
              )}
            </h2>
            <p className="text-slate-600 text-xs sm:text-base font-medium max-w-2xl leading-relaxed">
              {language === 'en'
                ? 'Meet the core leadership and clinical management team steering Pulse n Care Private Limited—uniting strategic vision, 20+ years of bedside caregiving mastery, and hospital-grade operations.'
                : 'पल्स एन केयर प्राइवेट लिमिटेड के मुख्य नेतृत्व व देखभाल विशेषज्ञों से मिलें—रणनीतिक सोच, 20+ वर्षों का व्यावहारिक अनुभव और अस्पताल स्तर का परिचालन अनुशासन।'}
            </p>
          </div>

          {/* Bilingual Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs self-start md:self-auto shrink-0">
            <span className="text-[11px] font-bold text-slate-500 pl-2 pr-1 flex items-center gap-1">
              <Languages className="w-3 h-3 text-[#015498]" />
              <span>Lang:</span>
            </span>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#015498] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#C31725] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* 3 Executive Leader Selector Tabs — Sleek Mobile-First Segmented Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3">
          {LEADERS.map((leader) => {
            const isSelected = leader.id === selectedLeaderId;
            return (
              <button
                key={leader.id}
                type="button"
                onClick={() => handleLeaderChange(leader.id)}
                className={`flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-3.5 rounded-2xl border transition-all cursor-pointer text-left shrink-0 sm:shrink min-w-[210px] sm:min-w-0 ${
                  isSelected
                    ? 'bg-white border-[#015498] shadow-md ring-2 ring-[#015498]/20'
                    : 'bg-slate-50/80 border-slate-200 hover:bg-white text-slate-600'
                }`}
              >
                <img
                  src={leader.photoUrl}
                  alt={language === 'en' ? leader.nameEn : leader.nameHi}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover object-top border border-slate-200 shadow-2xs shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      {language === 'en' ? leader.shortNameEn : leader.shortNameHi}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#015498] shrink-0" />}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 truncate">
                    {language === 'en' ? leader.roleEn : leader.roleHi}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Leader Spotlight Card — Zero Clutter, 100% Clean Portrait */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLeader.id + '-' + language}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start lg:items-center bg-white rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden"
          >
            {/* Left Column: Clean Unoccluded Portrait & Credentials (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center w-full">
              <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto space-y-3">
                {/* Portrait Container without dark blocking overlay */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900 aspect-[4/5] w-full">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={activeLeader.photoUrl}
                    alt={language === 'en' ? activeLeader.nameEn : activeLeader.nameHi}
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Clean Subtle Top Floating Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200/80 shadow-xs flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                    <span className="text-[10px] font-black tracking-wider text-[#015498]">
                      PULSE N CARE · VERIFIED
                    </span>
                  </div>

                  {/* Mini Brand Emblem */}
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md p-1 rounded-lg border border-slate-200/80 shadow-xs">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/assets/brand/pulse-n-care/pulse-n-care-favicon-32.png"
                      alt="Pulse n Care"
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                </div>

                {/* Experience & Credentials Card Cleanly Positioned OUTSIDE the Photo */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                      {activeLeader.id === 'ishwari' ? (
                        <Heart className="w-4 h-4" />
                      ) : (
                        <ShieldCheck className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900 truncate">
                        {language === 'en' ? activeLeader.experienceBadgeEn : activeLeader.experienceBadgeHi}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {activeLeader.id === 'sachin'
                          ? 'Pulse n Care Private Limited'
                          : activeLeader.id === 'ishwari'
                          ? 'Palliative, Hospice & Newborn Care'
                          : 'Hospital Admin & Partnerships'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 flex items-start gap-1.5 text-[11px] text-slate-600">
                    <GraduationCap className="w-3.5 h-3.5 text-[#015498] shrink-0 mt-0.5" />
                    <span className="leading-tight font-medium">
                      {language === 'en' ? activeLeader.qualificationsEn : activeLeader.qualificationsHi}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Directives, Contact (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left w-full">
              
              {/* Title & Role */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-md bg-emerald-50 text-emerald-800 text-[10px] sm:text-xs font-black border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{language === 'en' ? activeLeader.tagEn : activeLeader.tagHi}</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {language === 'en' ? activeLeader.nameEn : activeLeader.nameHi}
                </h3>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#015498]">
                  <Briefcase className="w-3.5 h-3.5 text-[#015498] shrink-0" />
                  <span>{language === 'en' ? activeLeader.roleEn : activeLeader.roleHi}</span>
                </div>
              </div>

              {/* Official Review / Bio Quote */}
              <div className="space-y-3">
                <blockquote className="text-slate-800 text-xs sm:text-base leading-relaxed font-medium bg-blue-50/50 p-3.5 sm:p-5 rounded-2xl border-l-4 border-[#015498]">
                  “{language === 'en' ? activeLeader.quoteEn : activeLeader.quoteHi}”
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {language === 'en' ? activeLeader.bioEn : activeLeader.bioHi}
                </p>
              </div>

              {/* 4 Core Directives / Pillars with Clean Mobile Selector */}
              <div className="space-y-2 sm:space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="flex items-center gap-1.5 text-[#015498] text-[11px] sm:text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#015498] shrink-0" />
                    <span>
                      {language === 'en'
                        ? activeLeader.directivesTitleEn
                        : activeLeader.directivesTitleHi}
                    </span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">
                    {activeDirective + 1} / 4
                  </span>
                </div>

                {/* Directive Selector Pills — Touch-Friendly & Clean */}
                <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
                  {activeLeader.directives.map((d, dIdx) => {
                    const isActive = dIdx === activeDirective;
                    return (
                      <button
                        key={d.tag}
                        type="button"
                        onClick={() => setActiveDirective(dIdx)}
                        className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer text-[10px] sm:text-xs font-bold ${
                          isActive
                            ? 'bg-[#015498] text-white border-[#015498] shadow-xs'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/70'
                        }`}
                      >
                        <span className="block">{d.tag.replace('Directive ', 'Dir ').replace('Standard ', 'Std ').replace('Pillar ', 'Pillar ')}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Directive Display Card */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-white to-slate-50 border border-blue-200/70 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-extrabold text-[#015498] text-xs sm:text-sm">
                      {language === 'en'
                        ? activeLeader.directives[activeDirective].titleEn
                        : activeLeader.directives[activeDirective].titleHi}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                      {activeLeader.directives[activeDirective].tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {language === 'en'
                      ? activeLeader.directives[activeDirective].descEn
                      : activeLeader.directives[activeDirective].descHi}
                  </p>
                </div>
              </div>

              {/* Direct Executive Contact Strip — Mobile Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700">
                <a
                  href="tel:+919211765429"
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200 font-black text-slate-900 hover:text-[#015498] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span className="truncate">+91 921 176 5429</span>
                </a>

                <a
                  href="mailto:pulsencare@gmail.com"
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:text-[#C31725] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">pulsencare@gmail.com</span>
                </a>
              </div>

              {/* Action Buttons — Thumb Friendly Stack on Mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      language === 'en' ? activeLeader.whatsAppMsgEn : activeLeader.whatsAppMsgHi
                    )
                  }
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 btn-emerald-aura btn-shimmer text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl cursor-pointer shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white shrink-0" />
                  <span className="text-center">
                    {language === 'en' ? activeLeader.actionEn : activeLeader.actionHi}
                  </span>
                </button>

                <a
                  href="#core-services"
                  className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all cursor-pointer text-center"
                >
                  <span>{language === 'en' ? 'View 5 Core Services' : '5 प्रमुख सेवाएं देखें'}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                </a>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
