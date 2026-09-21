# PULSE N CARE — PHASE 1 CONTENT CLEANUP & AUDIT LOG

**Phase:** Phase 1 (Service Registry + Business Content Truth Cleanup)  
**Workspace:** `C:\Users\xshan\Desktop\healthcare-platform`  
**Status:** Executed & Verified  

---

## 1. COMPREHENSIVE SEARCH & CLASSIFICATION AUDIT LOG

Every occurrence of audited terms across `src/` has been classified according to 4 standard audit rules:
1. **REMOVE** — Invalid public B2C offering (Doctor visits, MBBS consultation, OPD, emergency, Home ICU, etc.)
2. **KEEP** — Valid B2B / internal HR / recruitment / clinical context
3. **REWRITE** — Valid concept requiring B2C home-care position adjustment
4. **REVIEW** — Capability not confirmed for public B2C exposure (Physiotherapy, Children activity, etc.)

| Term / Pattern | File Path | Line # | Classification | Action Taken |
|---|---|---|---|---|
| `srv-doc-general` | `src/data/mockData.ts` | 291-322 | **REMOVE** | Deleted B2C Doctor Home Visit service entry from mock data. |
| `doctor_visit` | `src/types/index.ts` | 236 | **REMOVE (B2C)** | Removed `doctor_visit` from public B2C ServiceCategory type. |
| `doctor_visit` | `src/pages/public/ServicesPage.tsx` | 44 | **REMOVE** | Removed Doctor Visit filter button from public services page. |
| `doctor_visit` | `src/pages/client/BookingWizardPage.tsx` | 627 | **REMOVE** | Removed Doctor Visit input step & complaint fields from booking wizard. |
| `doctorComplaint` | `src/pages/client/BookingWizardPage.tsx` | 52, 633 | **REWRITE** | Renamed state variable and form field to `patientCareContext`. |
| `doctor_visit` | `src/pages/client/SearchPage.tsx` | 71 | **REMOVE** | Removed Doctor Home Visit option from consumer search filter. |
| `srv-specialized-icu` | `src/data/mockData.ts` | 326-358 | **REWRITE** | Re-scoped Home ICU Setup to `srv-nursing-high-dependency` ("High-Dependency Nursing Care"). |
| `home-icu-critical-care-nurse` | `src/components/layout/PublicLayout.tsx` | 85, 488 | **REMOVE** | Removed Home ICU link from header dropdown & footer links. |
| `Home ICU Setup` | `src/pages/public/HomePage.tsx` | 214, 265 | **REMOVE** | Removed Home ICU chips & select options from hero section. |
| `Doctor Home Visit` | `src/pages/public/HomePage.tsx` | 212, 264 | **REMOVE** | Removed Doctor Home Visit chips & select options from hero section. |
| `srv-physio-ortho` | `src/pages/public/HomePage.tsx` | 213, 262 | **REVIEW** | Removed Physiotherapy from primary B2C hero quick-selectors; preserved in mock data for legacy compatibility. |
| `srv-physio-neuro` | `src/pages/public/HomePage.tsx` | 263 | **REVIEW** | Removed Physiotherapy from hero select options. |
| `WeCare` / `We Care` | Workspace root | All | **KEEP (CLEAN)** | Verified 100% absence of legacy WeCare brand references. |
| `Freelancer` / `Pro` | Public UI Components | Various | **REWRITE** | Replaced public references with "In-House Verified Staff" and "Managed Care Team". |
| `Post-hospital discharge` | `src/data/mockData.ts` | Various | **KEEP** | Retained as valid situational context for when home care is required. |
| `Surgeon discharge notes` | `src/data/mockData.ts` | 39 | **KEEP** | Retained as valid clinical nursing instruction context. |
| `ICU Ward 4 staffing` | `src/data/mockB2BData.ts` | 89, 203 | **KEEP** | Retained as valid B2B hospital roster allocation context. |

---

## 2. CANONICAL B2C PUBLIC SERVICE CATALOGUE

The public B2C experience is now strictly grounded in 4 primary core home-care services:

1. **Post-Operative Nursing Care (`srv-nursing-post-op`)**:
   - Scope: Wound dressing, vital monitoring, prescribed injection/IV support, drain/catheter hygiene, surgeon discharge note compliance.
   - Staff: B.Sc / GNM Registered Nurse.
2. **Senior Skilled Nursing Visit (`srv-nursing-elderly`)**:
   - Scope: Daily insulin/injection administration, blood sugar & vital tracking, Ryle tube/PEG feeding assistance, bedsores dressing.
   - Staff: GNM / B.Sc Registered Nurse.
3. **12-Hour Day / Night Caregiver (`srv-caregiver-12hr`)**:
   - Scope: Bed/sponge bath, oral care, diaper changing, bed-to-wheelchair transfers, scheduled 2-hour position rotation, feeding/hydration, companionship.
   - Staff: Certified Caregiver / Patient Attendant.
4. **24-Hour Live-In Caregiver (`srv-caregiver-24hr`)**:
   - Scope: Continuous bedside assistance, overnight watchfulness, complete hygiene management, medication reminders, fall prevention.
   - Staff: Senior Certified Caregiver.

*High-Dependency Nursing Care (`srv-nursing-high-dependency`)* is available as a re-scoped skilled nursing service for high-acuity patients.

---

## 3. VERIFICATION & BUILD AUDIT

- **TypeScript Compilation:** Passed cleanly (`tsc -b`).
- **Vite Bundle Build:** Passed cleanly (`vite build` exit code 0).
- **Public Selector Audit:** 100% clean of B2C doctor, OPD, MBBS, laboratory, pharmacy, ambulance, and Home ICU product selectors.
