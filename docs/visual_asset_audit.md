# Pulse n Care — Visual Asset Audit & Redesign Specification

## 1. Executive Summary
This document records the visual asset audit and complete redesign executed across the **Pulse n Care** healthcare operating platform.

### Objectives Achieved:
1. **Zero Duplicate Visuals**: Enforced absolute visual asset uniqueness across all public marketing pages, client dashboards, B2B organization workspaces, admin operations, staff portals, and mock data.
2. **SVG Illustration Elimination**: Removed large generic SVG character models and vector illustration templates in favor of photorealistic editorial photography, documentary close-ups, and real UI compositions.
3. **Lottie Animation Preservation**: Maintained existing high-performance Lottie animations (`LottieAnimation.tsx`) without unnecessary churn.
4. **Central Visual Registry**: Created `src/data/visualAssets.ts` as the single source of truth for all primary visual assets with strict `reuseAllowed = false`.

---

## 2. Visual Differentiation Matrix

| Page / Section | Visual Concept | Visual Type | Asset ID | Subject / Composition |
|---|---|---|---|---|
| **Home (Hero)** | Care at Home + Human Connection | Editorial Photography | `homeHeroCare` | Senior nurse checking patient vitals at home in Delhi NCR |
| **Home (Flagship Nursing)** | 24x7 Skilled Post-Op Nursing | Editorial Photography | `homeFlagshipNursing` | Nurse monitoring post-op recovery equipment at bedside |
| **Home (Ops & Protocols)** | Operational Precision & Quality | Editorial Photography | `homePrinciplesOps` | Nurse organizing clinical logs & stethoscope |
| **About** | Documentary Preparation & Trust | Documentary Close-Up | `aboutCarePrep` | Hands-on setup of sterile medical kit & stethoscope |
| **Home Nursing** | In-Home Clinical Procedure | Editorial Photography | `homeNursingHero` | Nurse administering post-operative dressing |
| **Elder Care** | Dignified Senior Support | Lifestyle Photography | `serviceElderlyNursingCard` | Senior patient receiving routine blood pressure check |
| **Recovery Care** | Structured Post-Op Recovery | Storytelling Photography | `servicePostOpCard` | Sterile surgical dressing & vitals monitoring |
| **Attendant Care** | Daily Living Assistance | Lifestyle Photography | `serviceAttendant24x7Card` | Attendant helping senior with comfortable positioning |
| **B2B Organization** | Institutional Workforce Planning | Data / UI Composition | N/A (UI Roster) | Roster timeline, shift coverage, and fulfillment matrix |
| **Careers** | Team Collaboration | Workplace Photography | `careersTeam` | Nursing staff & care coordinators in clinical briefing |
| **Support / Concierge** | Attentive Communication | Abstract / Editorial | `supportConnection` | Care coordinator answering client inquiry |
| **Admin Operations** | Operations Control Center | Data Visualization | N/A (UI Matrix) | Live duty matrix, staffing heatmaps, exception logs |
| **Staff Portal** | Calm Duty Execution | Functional UI | N/A (Duty Check) | Duty progress bar, patient care checklist, visit route |

---

## 3. SVG Illustration Elimination Log

- **Large SVG Vector Character Models**: ELIMINATED (Replaced with high-resolution photorealistic editorial visuals).
- **Generic Doctor/Nurse Vector Templates**: ELIMINATED.
- **Functional UI Icons (Lucide React)**: RETAINED (Lucide icons are lightweight functional interface elements).
- **Brand SVG Logos**: RETAINED (`pulse-n-care-logo.svg`, `pulse-n-care-mark.svg`, `pulse-n-care-logo-dark.svg` are retained for header & layout brand identity).

---

## 4. Lottie Animation Preservation Log

- `components/common/LottieAnimation.tsx`: RETAINED (Fully operational for status indicators and micro-interactions).
- `components/domain/pulse-n-care/PulseNCareHeroVisual.tsx`: RETAINED.
- `components/domain/RealDelhiNCRMap.tsx`: RETAINED.
- `pages/public/HomeNursingServicePage.tsx`: RETAINED.

---

## 5. Asset Registry Inventory & Duplicate Elimination

All 11 services in `MOCK_SERVICES`, all 12 staff profiles in `MOCK_PROFESSIONALS`, and all hero cards are now mapped to distinct visual entries in `src/data/visualAssets.ts`:

- **Services**: 11 unique `cardMedia` and 11 unique `heroMedia` (22 unique URLs).
- **Staff Profiles**: 12 unique headshots for Aarti, Rajesh, Sunita, Vikram, Pooja, Amit, Meena, Suresh, Kavita, Deepak, Ananya, and Rohan.
- **Clinical Care Grid**: 4 unique procedure photos (Vitals, Medication, Wound Care, Handover).
- **Personal Care Grid**: 2 unique lifestyle photos (Bedside Support, Mobility).

Zero duplicate visual URLs remain in the codebase (`DUPLICATE IMAGE URLS: 0`).
