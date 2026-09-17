# PULSE N CARE — FULL EXISTING UI DESIGN AUDIT

**Audit Date**: September 17, 2026  
**Target Platform**: Pulse n Care Healthcare Operations Platform (`C:\Users\xshan\Desktop\healthcare-platform`)  
**Scope**: All 3 Operational Panels (Public + Client + B2B Organization, Admin Operations Command Center, Staff Employee Duty Portal), Primitives, Layouts, Design System Tokens, Tables, Forms, Navigation, Textures, Typography.

---

## 1. Executive Summary & Design System Taxonomy

The platform currently possesses robust functional foundations (state management, router architecture, leaflet real maps, domain data matrices). However, the visual identity presents inconsistencies across typography scales, card density, border radius tokens, color palettes, and operational data displays.

### Classification Categories:
- **KEEP**: Architecturally sound, visually aligned, retain as-is.
- **POLISH**: High structural value, requires token alignment, spacing/font refinement.
- **REDESIGN**: Functional but visually outdated, requires layout, color, and hierarchy overhaul.
- **REBUILD**: Complex control requiring enterprise component replacement (e.g. DataTables, Status System, Form Inputs).
- **REMOVE**: Deprecated placeholders, non-standard cards, or dead UI patterns.
- **MISSING**: Crucial institutional UI elements required for operational excellence (e.g. Texture system, Tabular numbers, Unified Eligibility UI, Progressive Form Disclosure).

---

## 2. Panel 1 — Public Website, Client B2C & B2B Organization Workspace

### 2.1 Public Website & Service Showcase
| UI Area / Component | Current File Location | Audit Classification | Diagnosis & Action Plan |
| :--- | :--- | :--- | :--- |
| Public Header & Nav | `src/components/layout/PublicLayout.tsx` | **POLISH** | Refine navigation bar typography, clear border delineation, align CTA button hierarchy, add subtle backdrop blur. |
| Home Page Hero | `src/pages/public/HomePage.tsx` | **REDESIGN** | Transform to light-first institutional hero with subtle Healthcare Grid texture (`linear-gradient`), clean typography, eyebrow badge, clear B2C/B2B CTAs. |
| Clinical Care Grid | `src/components/domain/pulse-n-care/ClinicalCareGrid.tsx` | **POLISH** | Align card hover elevation (`shadow-subtle`), standardize icon container sizes (40x40px), ensure 14-16px body text. |
| Home Nursing Service Page | `src/pages/public/HomeNursingServicePage.tsx` | **POLISH** | Editorial section layout, preserve Leaflet `RealDelhiNCRMap.tsx`, refine service capability badges and FAQ accordions. |
| Service Detail Page | `src/pages/public/ServiceDetailPage.tsx` | **POLISH** | Standardize hero header, capabilities list, pricing summary sidebar, and CTA buttons. |
| B2B Organization Landing | `src/pages/public/OrgLandingPage.tsx` | **REDESIGN** | Institutional presentation for hospital/clinic partners, metrics banner, workforce SLA grid, B2B intake button. |
| Careers Page | `src/pages/public/CareersPage.tsx` | **POLISH** | Clean job listing cards, filtering bar, HR application modal entrypoint. |

### 2.2 Client / B2C Booking & Self-Service Experience
| UI Area / Component | Current File Location | Audit Classification | Diagnosis & Action Plan |
| :--- | :--- | :--- | :--- |
| Guided Booking Wizard | `src/pages/client/BookingWizardPage.tsx` | **REDESIGN** | Convert into a calm, 8-step guided care intake experience (Service → Care Req → Patient → Location → Schedule → Prefs → Review → Submit). Add desktop summary sidebar. |
| Client Dashboard | `src/pages/client/ClientDashboardPage.tsx` | **POLISH** | Clean metric cards, active booking tracker, quick re-book actions, upcoming care schedule. |
| My Bookings List | `src/pages/client/MyBookingsPage.tsx` | **POLISH** | Filter tabs (Active, Completed, Cancelled), structured booking summary cards with status timelines. |
| Booking Detail View | `src/pages/client/BookingDetailPage.tsx` | **POLISH** | Step-by-step care timeline, assigned staff card, care notes, downloadable summary. |
| Saved Addresses | `src/pages/client/SavedAddressesPage.tsx` | **POLISH** | Address cards with default badges, integrated `LocationPicker.tsx` modal with Leaflet map. |
| Saved Patients | `src/pages/client/SavedPatientsPage.tsx` | **POLISH** | Patient profile cards, medical history notes, quick select for booking intake. |

### 2.3 B2B Organization Workspace (`/organization/*`)
| UI Area / Component | Current File Location | Audit Classification | Diagnosis & Action Plan |
| :--- | :--- | :--- | :--- |
| Organization Layout | `src/components/layout/OrgLayout.tsx` | **REBUILD** | Implement institutional 256px left sidebar (white, subtle right border, soft teal active states) + quiet top bar (breadcrumbs, org switcher, notification drawer). |
| B2B Dashboard | `src/pages/organization/OrgDashboardPage.tsx` | **REDESIGN** | Header with Blueprint Dot texture, KPI Row, Today's Facility Workforce Timeline/Shift Grid, "Needs Your Attention" alert strip, Active Requests table. |
| Request Builder (6-Step) | `src/pages/organization/OrgRequestBuilderPage.tsx` | **REBUILD** | 6-Step Wizard (Basics → Requirements → Schedule → Qualifications → Facility → Review) with multi-line `RequirementLineCard` component & live summary sidebar. |
| Request Detail View | `src/pages/organization/OrgRequestDetailPage.tsx` | **REDESIGN** | Fulfillment progress bar (e.g. 8/10 assigned), requirement status table, visual lifecycle timeline (Submitted → Under Review → Assigned → Shift → Billing). |
| Organization Roster | `src/pages/organization/OrgRosterPage.tsx` | **REBUILD** | Enterprise DataTable with filters (Facility, Dept, Role, Shift, Status). Privacy-protected staff detail modal (no private phone/address leakage). |
| Organization Schedule | `src/pages/organization/OrgSchedulePage.tsx` | **REDESIGN** | Operational timeline/calendar view (Day/Week/Month) displaying staff, role, shift time, and status. |
| Timesheets Approval | `src/pages/organization/OrgTimesheetsPage.tsx` | **REBUILD** | Enterprise DataTable with tabs (Pending, Approved, Rejected). Rejection reason drawer requiring supervisor comment. |
| Invoices & Billing | `src/pages/organization/OrgInvoicesPage.tsx` | **REBUILD** | Configurable tax/business setting table (Subtotal, Tax, Total, Due Date, Status) + professional invoice detail modal. |
| Organization Profile | `src/pages/organization/OrgProfilePage.tsx` | **POLISH** | Structured editable sections (Details, Facilities, Departments, Authorized Contacts). |
| Support Desk | `src/pages/organization/OrgSupportPage.tsx` | **POLISH** | Ticket list, category selector, thread conversation drawer. |

---

## 3. Panel 2 — Admin Operations Command Center (`/admin/*`)

| UI Area / Component | Current File Location | Audit Classification | Diagnosis & Action Plan |
| :--- | :--- | :--- | :--- |
| Admin Layout & Nav | `src/components/layout/AdminLayout.tsx` | **REBUILD** | Structured 8-section command sidebar (COMMAND, CARE, WORKFORCE, B2B, TALENT, FINANCE, QUALITY, SYSTEM) with dark/light high-contrast operational styling. |
| Operations Command Dashboard | `src/pages/admin/AdminDashboardPage.tsx` | **REDESIGN** | Operations Overview header, Top Metric Cards, Operations Pulse status strips (Assignments %, Attendance %, Timesheets %), Today's Duty Board, Exceptions/Needs Attention panel. |
| Unified Staffing & Eligibility | `src/pages/admin/AdminMatchingPage.tsx` | **REBUILD** | Replace generic scores with explicit eligibility criteria badges (ICU qualified, BLS verified, Available, Rest window satisfied, License valid, Conflict, Rest violation). |
| Organization Requests Oversight | `src/pages/admin/AdminOrganizationRequestsPage.tsx` | **REDESIGN** | 3-column desktop layout (Request Info \| Fulfillment & Requirements \| Actions & Assignment), status lifecycle management, audit log. |
| Workforce Management & Roster | `src/pages/admin/AdminStaffPage.tsx` | **REBUILD** | Enterprise DataTable, status badges, eligibility filters, direct staff creation wizard trigger. |
| Add Staff Wizard | `src/pages/admin/AdminAddStaffWizardPage.tsx` | **POLISH** | HR onboarding draft form with qualification verification, document upload, council license check. |
| Staff Detail & Audit View | `src/pages/admin/AdminStaffDetailPage.tsx` | **POLISH** | Complete professional profile, duty history, assigned facilities, compliance status. |
| Candidate HR Pipeline | `src/pages/admin/AdminCareersPage.tsx` | **REDESIGN** | Kanban/Pipeline stages (Applied → Screening → Interview → Shortlisted → Offer → Onboarding → Verification → Active Staff). |
| Finance & Billing Management | `src/pages/admin/AdminPaymentsPage.tsx` | **POLISH** | Payment transaction ledger, invoice generation, payout approvals. |
| Settings & Config | `src/pages/admin/AdminSettingsPage.tsx` | **POLISH** | Operational policies (e.g. 10-hour rest window rule, tax rates, dispatch SLA timeouts). |

---

## 4. Panel 3 — Staff Employee Duty Portal (`/staff/*`)

| UI Area / Component | Current File Location | Audit Classification | Diagnosis & Action Plan |
| :--- | :--- | :--- | :--- |
| Staff Layout & Mobile Nav | `src/components/layout/StaffLayout.tsx` | **REBUILD** | Mobile-first bottom navigation bar (Home, Duties, Availability, Leave, Security) + clean top header with shift alert. |
| Staff Duty Dashboard | `src/pages/staff/StaffDashboardPage.tsx` | **REDESIGN** | "Duty-First" UI: Highlight Next Duty card (Facility, Dept, Role, Time, Action Button), Upcoming Shift list, Attendance status, Timesheet shortcuts. |
| Duty Detail & Actions | `src/pages/staff/StaffDutyDetailPage.tsx` | **REDESIGN** | Contextual action buttons (Acknowledge Duty → Check In → Start Shift → Check Out → Submit Timesheet), reporting location map pin, facility contact. |
| Shift Schedule & History | `src/pages/staff/StaffSchedulePage.tsx` | **POLISH** | Duty calendar list, status filter tabs, quick view drawer. |
| Attendance & Clock-In | `src/pages/staff/StaffAvailabilityPage.tsx` | **POLISH** | Clear shift timestamp timeline (Scheduled vs Actual), availability toggle matrix. |
| Mobile Timesheet Submission | `src/pages/staff/StaffLeavePage.tsx` | **POLISH** | Simple mobile form (Scheduled vs Actual hours, Break time, Notes, Submit state). Rejection feedback viewer. |

---

## 5. Primitives, Design System Tokens & Infrastructure Audit

| Design Token / Primitive | Current Status | Required Action |
| :--- | :--- | :--- |
| Global Color Palette | Mixed hex codes in JSX | Centralize in `src/index.css` (`@theme`) with semantic CSS variables (`--color-bg`, `--color-surface`, `--color-primary`, `--color-border`). |
| Texture System | Handcrafted SVGs | Implement lightweight CSS `HealthcareTexture` (Healthcare Grid, Blueprint Dot, Soft Wave). |
| Button Component | `src/components/common/Button.tsx` | Upgrade to support Primary, Secondary, Tertiary, Danger, Success, Icon variants with non-shifting loading states. |
| Form Input Component | `src/components/common/Input.tsx` | Standardize 42-46px height, visible labels, helper text, focus rings, error states, and keyboard accessibility. |
| Card System | Generic `Card.tsx` | Create specialized card primitives: `MetricCard`, `OperationalCard`, `ProfileCard`, `SummaryCard`, `AlertCard`. |
| Status Badge System | Basic span tags | Create `StatusBadge.tsx` supporting 8 B2B states, 6 Duty states, 4 Invoice states with semantic colors + icons. |
| Enterprise DataTable | Basic HTML tables | Create `DataTable.tsx` with sticky headers, sorting, density controls, pagination, responsive cards fallback. |
| Skeletons & Loading | Basic spinners | Create `Skeleton.tsx` supporting table rows, metric cards, profile forms, shift timelines. |
| Empty & Error States | Inconsistent divs | Standardize `EmptyState.tsx` and `ErrorState.tsx` with actionable CTA buttons. |
| Feedback & Toasts | Standard alert() calls | Create `Toast.tsx` notification stack with auto-dismiss and action handlers. |

---

## 6. Implementation Roadmap & Execution Plan

- **Phase 1 (Complete)**: Full Existing UI Design Audit (`p1_full_ui_design_audit.md`).
- **Phase 2**: Global Design Tokens & Tailwind CSS Theme Expansion in `src/index.css`.
- **Phase 3**: Upgrade Primitive Components (`Button`, `Input`, `Card`, `StatusBadge`, `DataTable`, `Skeleton`, `EmptyState`, `Toast`).
- **Phase 4**: Panel 1 — Redesign Public Website, Client Intake, and B2B Organization Workspace (`/organization/*`).
- **Phase 5**: Panel 2 — Redesign Admin Operations Command Center (`/admin/*`).
- **Phase 6**: Panel 3 — Redesign Staff Employee Duty Portal (`/staff/*`).
- **Phase 7**: Responsive & Micro-interaction Polish.
- **Phase 8**: Verification, Browser QA & `p1_full_ui_design_qa.md`.
