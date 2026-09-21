# PULSE N CARE — BUSINESS POSITIONING & CONTENT ARCHITECTURE BLUEPRINT (V1.0)

**Target Product:** Pulse n Care — Nurse Care at Doorstep  
**Primary Business Context:** Managed Home-Care Service Provider in Delhi NCR  
**Document Status:** Approved Strategic Architecture Plan (Pre-Implementation Audit)  

---

## A. BUSINESS POSITIONING STATEMENT

> **Pulse n Care is a managed home-care operations company that provides families and recovering patients with qualified, in-house care staff at doorstep.**
> 
> When a patient returns home after hospitalization, surgery, illness, or age-related mobility decline, family members are often constrained by work and daily responsibilities. Pulse n Care bridges this gap by deploying council-verified nurses, skilled bedside caregivers, and patient attendants to deliver dignified daily care, post-operative nursing support, and regular assistance in the safety and comfort of home.

---

## B. WHAT PULSE N CARE DOES NOT DO (EXPLICIT EXCLUSIONS)

Pulse n Care is **NOT** a hospital, clinic, doctor consultation platform, diagnostic provider, or open freelancer marketplace.

The platform and public website strictly **DO NOT** claim or offer:
1. **MBBS / Doctor Consultations & Appointments**: Pulse n Care does not provide OPD appointments, physician house calls, or telemedicine.
2. **Medical Diagnosis & Prescriptions**: Staff do not diagnose diseases or issue medical prescriptions.
3. **Emergency Medical & Surgical Procedures**: No emergency ER response, hospital admissions, or home surgical procedures.
4. **Laboratory & Radiology Testing**: No blood testing labs, X-Ray, ultrasound, or diagnostic sample collection services.
5. **Pharmacy & Ambulance Services**: No direct drug sales, pharmacy dispatch, or ambulance fleet operations.
6. **"Home ICU" / Medical Intensive Care**: No intensive medical care or ventilator treatment claims.
7. **Open Freelancer Marketplace**: Caregivers and nurses are not unverified gig workers; all staff are managed, council-verified internal employees.

---

## C. VERIFIED SERVICE CATALOGUE

Based on verified platform capabilities and confirmed home-care operations, the official B2C service taxonomy consists of 4 primary service offerings:

| Service ID | Service Name | Target Audience | Primary Scope of Support | Staff Qualification |
|---|---|---|---|---|
| `srv-nursing-post-op` | **Post-Operative Nursing Care** | Patients recovering at home after surgery or hospitalization | Sterile wound dressing, vital signs charting, prescribed injection/IV administration, drain/catheter hygiene, surgeon discharge note compliance. | Registered Nurse (B.Sc / GNM) |
| `srv-nursing-elderly` | **Senior Skilled Nursing Visit** | Seniors with chronic health management needs (hypertension, diabetes) | Daily insulin/injection administration, blood sugar & vital tracking, Ryle's tube / PEG feeding assistance, bedsores preventative dressing. | Registered Nurse (GNM / B.Sc) |
| `srv-caregiver-12hr` | **12-Hour Day / Night Caregiver** | Bedridden, recovering, or elderly patients requiring daytime or overnight bedside help | Sponge/bed bath, oral hygiene, diaper changes, bed-to-wheelchair transfers, scheduled 2-hour position rotation, feeding & hydration, companionship. | Certified Caregiver / Attendant |
| `srv-caregiver-24hr` | **24-Hour Live-In Caregiver** | Total-dependency seniors or post-stroke patients requiring round-the-clock care | 24x7 continuous bedside assistance, overnight watchfulness, complete hygiene maintenance, medication reminders, fall prevention. | Senior Certified Caregiver |

---

## D. SERVICES REQUIRING BUSINESS CONFIRMATION (AUDIT CLASSIFICATION)

The handwritten business notes and legacy codebase contain several features that require explicit business validation before public exposure:

| Candidate Concept | Source | Classification | Recommendation & Context |
|---|---|---|---|
| **Doctor / MBBS Visit (`srv-doc-general`)** | Legacy Codebase | `REMOVE` | Pulse n Care is a home-care/nursing provider. Remove doctor consultation cards to eliminate hospital/OPD confusion. |
| **Home ICU Setup (`srv-specialized-icu`)** | Legacy Codebase | `REWRITE / VERIFY` | Remove "Home ICU" hospital branding. If high-dependency nursing is offered, rename to "High-Dependency Nursing Care" focused strictly on nursing assistance. |
| **Physical Therapy (`srv-physio-ortho`, `srv-physio-neuro`)** | Legacy Codebase | `KEEP ONLY IF SUPPORTED` | Verify whether BPT/MPT physiotherapists are on internal payroll. If confirmed, position as "Home Mobility & Rehabilitation Exercises". |
| **Patient-Area Housekeeping ("Cleaning")** | Handwritten Notes | `REWRITE (SCOPE SCOPED)` | Clarify as "Patient Hygiene & Room Maintenance" (disinfecting bedside table, changing patient bedsheets). Exclude general house cleaning. |
| **Children Activity / Support** | Handwritten Notes | `BUSINESS VERIFICATION REQUIRED` | Do not publish as a healthcare service. Flag for business review as a potential specialized family support offering. |
| **Companionship & Senior Engagement** | Handwritten Notes | `VERIFIED / INTEGRATE` | Incorporate as a core human pillar within Elder Care & 24h Live-in Caregiver descriptions. |

---

## E. PUBLIC WEBSITE SITEMAP (CURRENT VS. PROPOSED)

### Current Architecture (Convoluted Marketplace & Medical Jargon)
* `/` (Home Page — Light-First vs Dark Anchor clash, Doctor/ICU listings)
* `/services` (Services Index — Generic hospital department categories)
* `/services/home-nursing` (Landing page with heavy regional hub references)
* `/services/:id` (Service Detail — Contains Doctor & ICU listings)
* `/organizations` (B2B Landing Page — Open staffing marketplace tone)
* `/careers` (Staff Recruitment Page)
* `/search` & `/pros/:id` (Exposes individual staff profiles like an open marketplace)

### Proposed Architecture (Clean, Human, B2C Home Care Focus)
* `/` (**Home Page** — Problem-solution narrative: Hospital Discharge → Home Recovery → Family Work → Pulse n Care Support)
* `/services` (**Care Services Index** — Categorized by real-life care situations: Post-Hospital, Senior Support, Daily Attendant, Skilled Nursing)
* `/services/:slug` (**Service Detail Pages** — Clear human scope, inclusions, exclusions, and request workflow)
* `/organizations` (**For Organizations** — B2B institutional staff allocation for hospitals & care homes)
* `/careers` (**Join Our Care Team** — Recruitment portal for nurses and caregivers)
* `/book` (**Request Care Wizard** — Step 1: Care Need → Step 2: Patient Info → Step 3: Schedule → Step 4: Request Review)
* `/client/*` (**Client Workspace** — Request tracking, assigned care staff details, care notes, support)

---

## F. PAGE-BY-PAGE CONTENT BLUEPRINT (FULL ROUTE AUDIT)

### 1. PUBLIC ROUTES

#### `/` — Home Page
* **Purpose:** Immediately communicate what Pulse n Care does, who it helps, and how to request care at home.
* **Narrative Arc:** Problem (Family busy/working) → Realization (Patient discharged/needs care) → Solution (Pulse n Care managed staff) → Action (Request Care).
* **Current Issues:** Doctor consultation options, "Home ICU" hospital framing, location hub overlays on images.
* **Recommended Fix:** Restore clean full-bleed hero banner, present 4 verified services, explain 4-step request process.

#### `/services` — Services Index Page
* **Purpose:** Help families discover the right care support based on their real-life situation.
* **Current Issues:** Contains "Doctor Visit" and "Home ICU" cards.
* **Recommended Fix:** Group by situation: *Post-Hospital Recovery*, *Skilled Nursing*, *Elderly & Bedside Care*, *Daily Attendant*.

#### `/services/:slug` — Service Detail Template
* **Purpose:** Provide complete transparency on what staff will do, what is excluded, and what the family needs to prepare.
* **Content Sections:** Hero, When You Need This, What Staff Helps With, Inclusions vs Exclusions, How Request Works, Request Care CTA.

#### `/organizations` — B2B Healthcare Facilities
* **Purpose:** Enable hospitals, nursing homes, and senior living facilities to request managed nursing/caregiver rosters.
* **Current Issues:** Sounds like a freelancer job board.
* **Recommended Fix:** Re-position as "Institutional Clinical Roster & Care Workforce Management".

#### `/book` & `/client/booking/wizard` — Care Request Flow
* **Purpose:** 4-step friction-free care request wizard.
* **Terminology Fix:** Change all instances of "Book Doctor / Book Appointment / Consultation" to **"Request Care at Home"**.

---

### 2. CLIENT PORTAL ROUTES (`/client/*`)

* `/client/dashboard`: Overview of active care requests, assigned nurse/caregiver status, upcoming shift schedules.
* `/client/bookings`: Complete history of past and active care requests.
* `/client/bookings/:id`: Detailed view of duty logs, shift handovers, and assigned staff details.
* `/client/patients`: Manage family member profiles (age, care preferences, discharge notes).
* `/client/addresses`: Saved home care locations.
* **Audit Rule:** Strip all internal admin matching logic, staff performance scores, or HR notes from client view.

---

### 3. B2B ORGANIZATION WORKSPACE (`/organization/*`)

* `/organization/dashboard`: Overview of facility staffing requisitions and deployed shift rosters.
* `/organization/requests/new`: Form to request 8h/12h ICU & Ward nurse allocations.
* `/organization/roster` & `/organization/schedule`: Duty shifts and verified staff credentials.
* **Audit Rule:** Maintain strict institutional B2B tone separate from consumer home-care copy.

---

### 4. STAFF DUTY PORTAL (`/staff/*`)

* `/staff/dashboard`: Today's assigned duty, patient address, reporting time, and shift status (Check-In / Check-Out).
* `/staff/duties`: Monthly duty schedule and shift history.
* `/staff/availability` & `/staff/leave`: Manage duty availability and leave requests.
* **Audit Rule:** Focus on operational duty clarity, safety guidelines, and clinical reporting.

---

### 5. ADMIN OPERATIONS COMMAND CENTER (`/admin/*`)

* `/admin/dashboard`: Real-time central operations console (Active shifts, pending care requests, staff dispatch).
* `/admin/bookings` & `/admin/matching`: Review incoming care requests and assign internal verified staff.
* `/admin/staff`: Managed employee directory (DNC/INC licenses, background checks, duty status).
* **Audit Rule:** Replace legacy marketplace labels ("Pros", "Freelancers", "Doctors") with "Internal Care Workforce" and "Staff Employees".

---

## G. HOME PAGE FULL SECTION PLAN

| Section | Business Purpose | User Question Answered | Content & Visual Direction | CTA |
|---|---|---|---|---|
| **01. Hero Banner** | Define business scope immediately | *"What is Pulse n Care and how can they help my family?"* | Full-bleed campaign banner showing nurse & caregiver team. Clear headline: *"Nurse care at doorstep."* | **Request Care at Home** |
| **02. The Real-Life Problem** | Build emotional empathy with family | *"Why is arranging home care after hospital discharge so stressful?"* | Illustrated 4-step scenario: Hospital Discharge → Patient at Home → Family Working → Care Needed. | Explore Services |
| **03. Flagship Home Care** | Highlight core nursing & attendant capabilities | *"What specific care support can I get right now?"* | Interactive feature card showcasing Post-Op Nursing & 24h Attendant support. | View Service Details |
| **04. Human Care & Rigor** | Establish trust and reliability | *"Is the staff verified and trustworthy to enter my home?"* | Clean portrait of internal nurse. Key facts: 100% In-House Staff, Council Verified, 24/7 Supervision. | Arrange Home Care |
| **05. How It Works** | Demystify the request process | *"How do I arrange care for my parent or patient?"* | 4-step process cards: 1. Request Care → 2. Review Requirement → 3. Staff Assignment → 4. Care Begins. | Request Care Now |
| **06. Verified Care Services** | Provide comprehensive service overview | *"Which service fits my patient's condition?"* | Grid of 4 verified service cards (Post-Op, Senior Care, 12h/24h Attendant). | Select Service |
| **07. Operational Rigor** | Explain background operations | *"How does Pulse n Care ensure staff quality?"* | Dark navy feature panel detailing 24/7 central desk, digital shift handovers, and council audits. | For Organizations |
| **08. Service Availability** | Provide pincode coverage reassurance | *"Is service available for my home address?"* | Clean coverage widget with pincode input and auto-detection. | Check Availability |
| **09. Final Action Banner** | Drive final care request conversion | *"How do I get started right now?"* | Warm invitation: *"Let’s arrange the right care for your home."* | **Book Home Care Now** |

---

## H. TERMINOLOGY REPLACEMENT MATRIX

| Legacy / Incorrect Term | Problem | Preferred Pulse n Care Term | Context / Usage |
|---|---|---|---|
| `Book Doctor` | Implies medical OPD app | **Request Care** / **Request Home Care** | Primary action CTAs across site |
| `Doctor Appointment` | Implies clinic consultation | **Care Request** / **Care Booking** | Form headers and confirmation titles |
| `Doctor Consultation` | Implies diagnosis service | **Professional Care Support** | Explaining nursing assistance |
| `Hospital Treatment` | Implies inpatient medical care | **Home Care Support** | Explaining post-discharge care |
| `Medical Department` | Implies hospital structure | **Care Service** / **Care Category** | Navigation and index titles |
| `Home ICU Setup` | Implies hospital ICU unit | **High-Dependency Nursing Care** | Specialized nursing description |
| `OPD / Clinic` | Irrelevant hospital term | *Remove completely* | Site copy and routing |
| `Freelancers / Gig Pros` | Undermines staff trust | **In-House Verified Staff** / **Internal Caregivers** | Staff registry and trust badges |
| `MBBS Doctor` | Unconfirmed service | *Remove from B2C listings* | Service catalogue |

---

## I. RECOMMENDED VISUAL DIRECTION

* **Color Palette:** Trustworthy Healthcare Teal (`#0D9488`), Deep Institutional Navy (`#050F33`), Warm Canvas (`#F8FAFC`), Soft Mint Accents (`#E6FFFA`).
* **Photography Style:** Real Indian home environments, warm family interactions, dignified senior care, verified nurses in clean branded scrubs.
* **Visual Elements to Avoid:** Cold hospital hallways, emergency ambulances, surgical operating rooms, scary medical needles, generic stock photos of foreign doctors.

---

## J. IMPLEMENTATION ROADMAP (POST-APPROVAL)

```text
Phase 1 — Data Model & Service Registry Cleanup (mockData.ts & visualAssets.ts)
Phase 2 — Home Page & Header/Footer Copy Sanitization (HomePage.tsx, PublicLayout.tsx)
Phase 3 — Services Index & Service Detail Pages (ServicesPage.tsx, ServiceDetailPage.tsx)
Phase 4 — B2C Booking Wizard Copy Alignment (BookingWizardPage.tsx)
Phase 5 — Client Workspace Polish (ClientDashboardPage.tsx, MyBookingsPage.tsx)
Phase 6 — B2B Organization Portal Alignment (OrgLandingPage.tsx, OrgLayout.tsx)
Phase 7 — Staff Duty Portal & Admin Command Center Label Cleanup
Phase 8 — Final E2E Verification & Build Audit (npm run build)
```

> **CONFIRMATION:** This document represents the complete pre-implementation content architecture plan. No application source code or component files were modified during this planning step.
