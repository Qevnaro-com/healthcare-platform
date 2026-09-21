# PULSE N CARE — BUSINESS CONTENT TRUTH AUDIT (V2.0)

**Product:** Pulse n Care — Nurse care at doorstep  
**Workspace:** `C:\Users\xshan\Desktop\healthcare-platform`  
**Document Purpose:** Source-of-Truth Content Audit, Service Capability Matrix, and Terminology Replacement Blueprint  

---

## 1. CORE BUSINESS POSITIONING

> **Pulse n Care is a managed home-care support company that provides families with qualified, in-house care staff at doorstep.**
> 
> When a patient returns home after hospitalization, surgery, illness, or age-related mobility decline, family members face constraints due to work and daily responsibilities. Pulse n Care solves this by deploying council-verified nurses, skilled bedside caregivers, and patient attendants to deliver structured daily care, post-operative nursing support, and regular bedside assistance at home.

### The Core Family Narrative
```
Hospital Discharge / Surgery / Illness
                  ↓
          Patient Comes Home
                  ↓
Family Has Work & Daily Responsibilities
                  ↓
   Patient Needs Continuous Care
                  ↓
  Pulse n Care Provides Managed Staff
                  ↓
 Structured Care at Home for Loved One
```

---

## 2. VERIFIED B2C SERVICE CATALOGUE

| Service ID | Service Name | Target Audience | Primary Scope of Support | Staff Qualification |
|---|---|---|---|---|
| `srv-nursing-post-op` | **Post-Operative Nursing Care** | Recovering patients post-surgery or post-hospitalization | Sterile wound dressing, vital signs charting, prescribed injection/IV administration, drain/catheter hygiene, surgeon discharge note compliance. | Registered Nurse (B.Sc / GNM) |
| `srv-nursing-elderly` | **Senior Skilled Nursing Visit** | Seniors with chronic health management needs (hypertension, diabetes) | Daily insulin/injection administration, blood sugar & vital tracking, Ryle's tube / PEG feeding assistance, bedsores preventative dressing. | Registered Nurse (GNM / B.Sc) |
| `srv-caregiver-12hr` | **12-Hour Day / Night Caregiver** | Bedridden, recovering, or elderly patients requiring daytime or overnight bedside help | Sponge/bed bath, oral hygiene, diaper changes, bed-to-wheelchair transfers, scheduled 2-hour position rotation, feeding & hydration, companionship. | Certified Caregiver / Attendant |
| `srv-caregiver-24hr` | **24-Hour Live-In Caregiver** | Total-dependency seniors or post-stroke patients requiring round-the-clock care | 24x7 continuous bedside assistance, overnight watchfulness, complete hygiene maintenance, medication reminders, fall prevention. | Senior Certified Caregiver |
| `srv-nursing-high-dependency` | **High-Dependency Nursing Care** *(Re-scoped from ICU)* | High-acuity recovering patients needing close nursing supervision | Continuous vital sign observation, airway & catheter hygiene, prescribed medication administration, shift progress logging. | B.Sc / GNM Registered Nurse |

---

## 3. AUDIT CLASSIFICATION & TERMINOLOGY SANITIZATION MATRIX

### A. PUBLIC B2C REMOVALS (IMMEDIATE DELETION FROM PUBLIC CONSUMER FLOWS)
* **`srv-doc-general` (General Physician Home Visit / Doctor Consultation / MBBS)**: Remove doctor consultation cards, doctor drop-down options, and doctor complaints from B2C wizard.
* **Hospital OPD / ER / Surgery / Telemedicine / Laboratory / Pharmacy / Ambulance**: Remove all claims of OPD clinics, lab sample testing, ambulance fleets, or hospital beds.
* **"Home ICU Setup"**: Re-scope to *"High-Dependency Nursing Care"*, focusing strictly on registered nurse bedside monitoring.

### B. LEGACY BRAND & MARKETPLACE CLEANUP
* **`WeCare` / `We Care`**: Verify 100% absence across metadata, titles, and components (Confirmed Clean).
* **`Freelancers` / `Gig Workers` / `Marketplace` / `Pros`**: Replace public references with *"In-House Verified Staff"*, *"Internal Caregivers"*, and *"Managed Clinical Team"*.

### C. TERMINOLOGY REPLACEMENT MAPPING

| Existing / Legacy Term | Audit Status | Replacement Pulse n Care Term | Context |
|---|---|---|---|
| `Book Doctor` | **INVALID B2C** | **Request Care** / **Request Home Care** | Primary action CTAs across public UI |
| `Doctor Appointment` | **INVALID B2C** | **Care Request** / **Care Booking** | Form headers and wizard titles |
| `Doctor Consultation` | **INVALID B2C** | **Professional Care Support** | Describing nursing assistance |
| `MBBS Doctor Visit` | **INVALID B2C** | *Remove from B2C catalog* | B2C service listings |
| `Hospital Treatment` | **INVALID B2C** | **Home Care Support** | Describing post-discharge recovery |
| `Medical Department` | **INVALID B2C** | **Care Category** / **Care Services** | Navigation and index titles |
| `Home ICU Setup` | **RE-SCOPE** | **High-Dependency Nursing Care** | Specialized nursing description |
| `Doctor Complaint` | **INVALID B2C** | **Patient Condition & Care Context** | Booking wizard Step 2 input label |
| `Freelancer / Pro` | **INVALID B2C** | **Internal Verified Care Staff** | Staff registry & trust badges |

---

## 4. CONTEXTUAL & VALID REFERENCES (KEPT IN APPROPRIATE CONTEXT)

* **"Post-Hospital Discharge"**: VALID contextual reference explaining when home care is needed.
* **"Surgeon / Attending Physician Notes"**: VALID clinical context for nurses following doctor's written instructions.
* **"ICU Registered Nurse (Hospital Staffing)"**: VALID B2B institutional context for hospital staffing requisitions.
* **"Minimum 3 Yrs Hospital ICU Experience"**: VALID internal HR/career qualification context for hiring registered nurses.

---

## 5. CAPABILITY TO SERVICE MAPPING

Instead of cluttering the UI with 15 standalone service cards, capabilities are mapped to the 4 core B2C services:

### Nursing Support Capabilities
* Vital signs monitoring (BP, Pulse, SpO2, Temp) -> *Senior Nursing & Post-Op Nursing*
* Wound dressing & suture care -> *Post-Operative Nursing Care*
* Prescribed injections & insulin -> *Senior Nursing & Post-Op Nursing*
* Ryle's tube / PEG feeding assistance -> *Senior Nursing & High-Dependency Nursing*
* Catheter & drain hygiene -> *Post-Operative Nursing Care*
* Nursing progress charting -> *All Nursing Services*

### Bedside & Personal Care Capabilities
* Sponge bath / bed bath assistance -> *12h & 24h Caregiver*
* Oral care & diaper changing -> *12h & 24h Caregiver*
* Bed-to-wheelchair transfers -> *12h & 24h Caregiver*
* 2-hour position rotation (bedsore prevention) -> *12h & 24h Caregiver*
* Feeding & hydration support -> *12h & 24h Caregiver*
* Companionship & fall prevention -> *12h & 24h Caregiver*

---

## 6. AMBIGUOUS BUSINESS ITEMS (CONFIRMATION REQUIRED)

1. **Physical Therapy (`srv-physio-ortho`, `srv-physio-neuro`)**: Verify whether internal BPT/MPT physiotherapists are available. If unconfirmed, keep hidden from public cards.
2. **Patient-Area Cleaning**: Clarified as *"Patient Hygiene & Room Maintenance"* (bedside table disinfection, bedsheet changes). Exclude general housekeeping.
3. **Children Activity**: Excluded from public B2C healthcare service catalogue.

---

## 7. PAGE-BY-PAGE RECONSTRUCTION BLUEPRINT

### Public Pages
* **HomePage (`src/pages/public/HomePage.tsx`)**: Reconstruct hero (eyebrow: *HOME CARE • DELHI NCR*, headline: *Nurse care at doorstep.*), 4-step real-life family story section, 4 verified service cards, 24/7 central desk operations panel.
* **ServicesPage (`src/pages/public/ServicesPage.tsx`)**: Organize service discovery by situation (*Post-Hospital Recovery*, *Skilled Nursing Visit*, *12h/24h Bedside Caregiver*). Remove doctor visit cards.
* **ServiceDetailPage (`src/pages/public/ServiceDetailPage.tsx`)**: Standard template (*Hero → When Needed → What Staff Helps With → Scope & Exclusions → How Request Works → CTA*).
* **OrgLandingPage (`src/pages/public/OrgLandingPage.tsx`)**: B2B institutional staff allocation for hospitals and care homes.
* **CareersPage (`src/pages/public/CareersPage.tsx`)**: Recruitment portal for registered nurses and certified caregivers.

### Booking & Client Workspace
* **BookingWizardPage (`src/pages/client/BookingWizardPage.tsx`)**: 4-step care request flow (*Step 1: Care Need → Step 2: Patient Info → Step 3: Schedule → Step 4: Review Request*). Replace doctor fields with *Patient Care Context*.
* **Client Pages (`src/pages/client/*`)**: Client dashboard, bookings list, and detail views focused on care request status, shift schedule, and assigned staff details.

### Admin & Staff Portals
* **Staff Pages (`src/pages/staff/*`)**: Duty-oriented portal (*Today's Duty*, *Shift Schedule*, *Check-In / Check-Out*, *Handover Notes*).
* **Admin Pages (`src/pages/admin/*`)**: Command center for reviewing care requests, verifying staff qualifications, and managing B2B roster allocations.

---

## 8. SEO COPY AUDIT

* **Page Title**: `Pulse n Care — Nurse Care at Doorstep | Home Healthcare Delhi NCR`
* **Meta Description**: `Professional home nursing, post-operative care, elderly assistance, and 12h/24h bedside caregivers delivered at home across Delhi NCR.`
* **Target Keywords**: `home nursing care`, `nurse care at doorstep`, `post operative nursing care at home`, `elderly caregiver at home`, `patient attendant Delhi NCR`.

---

## 9. IMPLEMENTATION PHASES

* **Phase 1**: Data Model & Service Registry Cleanup (`mockData.ts`, `visualAssets.ts`)
* **Phase 2**: Home Page & Navigation Header/Footer Cleanup (`HomePage.tsx`, `PublicLayout.tsx`)
* **Phase 3**: Services Index & Detail Templates (`ServicesPage.tsx`, `ServiceDetailPage.tsx`, `HomeNursingServicePage.tsx`)
* **Phase 4**: B2C Booking Wizard Copy Alignment (`BookingWizardPage.tsx`, `SearchPage.tsx`)
* **Phase 5**: Client Workspace Polish (`ClientDashboardPage.tsx`, `MyBookingsPage.tsx`, `BookingDetailPage.tsx`)
* **Phase 6**: B2B Organization Portal Alignment (`OrgLandingPage.tsx`, `OrgLayout.tsx`)
* **Phase 7**: Staff Duty Portal & Admin Command Center Label Cleanup
* **Phase 8**: E2E Search Audit & Production Build Verification (`npm run build`)
