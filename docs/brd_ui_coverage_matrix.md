# Pulse n Care — BRD to UI Coverage Matrix (V6 Product Flow Architecture)

This document provides a comprehensive mapping of all product actors, intake flows, core entities, routes, UI surfaces, required/conditional fields, permissions, semantic states, and data realities across the Pulse n Care platform.

---

## 1. Product Actor & Panel Architecture Matrix

| Actor | Flow Type | Primary Panel | Entry Point & Route | UI Surface Type | Permission & Isolation Scope | Real vs Mock / Sim |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **B2C Client (Individual / Family)** | 4-Step Care Intake | Panel 1 | CTA: `I Need Care`<br/>`/client/booking/wizard` | Short 4-Step Progressive Intake | Sees own care requests, patient profiles, bookings, and invoices only. Zero access to other clients or orgs. | Frontend State + `BookingContext` |
| **B2B Organization (Hospital / Clinic)** | 4-Section Staffing Intake | Panel 1 | CTA: `For Organizations`<br/>`/organization/requests/new` | Multi-Line Staffing Intake & Workspace | Sees own facility staffing requests, roster, schedule, timesheets, and invoices only. Strict Org A ≠ Org B isolation. | Frontend State + `mockB2BData.ts` |
| **Admin Operations Manager** | Command Operations | Panel 2 | `/admin/dashboard` | Dense Operations Command Center | Full access across all B2C client requests, B2B staffing requests, staff eligibility, duty boards, timesheets, and billing. | Frontend State + Rules Engine (`checkStaffConflict`) |
| **Internal Staff Employee (Nurse / Attendant)** | Duty Execution | Panel 3 | `/staff/dashboard` | Mobile-First Operational Duty Portal | Sees own profile, assigned duties, schedule, timesheets, and duty-necessary patient info only. | Frontend State + `mockStaffData.ts` |

---

## 2. Detailed B2C & B2B Field & Flow Coverage

| Actor & Flow | Entity | Target Route | Required Fields | Optional / Conditional Fields | Semantic State Lifecycle | Data Source | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **B2C Intake**<br/>Step 01: Care | `Service` | `/client/booking/wizard?step=1` | Selected Service ID (`srv-nursing-post-op`) | Contextual Tasks (Surgical dressing, vitals, catheter); Physio joint/mobility; Doctor complaint | `draft` | `services` catalog | **Active V6** |
| **B2C Intake**<br/>Step 02: Patient & Location | `PatientProfile`, `LocationData` | `/client/booking/wizard?step=2` | Relationship (`parent`), First Name, Age, Gender, City, Pincode, Address Line 1 | Saved Patient ID, Medical Notes, Allergies, Saved Address ID, Landmark, Access Notes | `draft` | `SavedPatientSelector`, `LocationPicker` | **Active V6** |
| **B2C Intake**<br/>Step 03: Schedule & Needs | `BookingSchedule` | `/client/booking/wizard?step=3` | Start Date, Frequency (`single`/`range`/`recurring`), Shift Type (`12h_night`) | End Date, Recurring Days, Time Slot, Special Instructions, Medical Equipment | `draft` | `BookingContext` | **Active V6** |
| **B2C Intake**<br/>Step 04: Review & Request | `Booking` | `/client/booking/wizard?step=4` | Confirmation of Care, Patient, Location, Schedule | Inline `[Edit]` changes | `submitted` → Status: **REQUEST RECEIVED** | `createBooking()` | **Active V6** |
| **B2B Intake**<br/>Section 01: Request | `OrganizationStaffingRequest` | `/organization/requests/new` | Request Title, Facility Name, Department, Contact Name, Contact Phone | Priority, Request Type (`monthly_retainer`/`per_shift`), Contact Email | `draft` | `mockB2BData.ts` | **Active V6** |
| **B2B Intake**<br/>Section 02: Requirements | `StaffingRequirementLine[]` | `/organization/requests/new` | Role Category (`icu_nurse`), Quantity (`4`), Shift Type (`12h_night`) | Required Qualifications (`ACLS`), Gender Pref, Agreed Daily Rate (`₹3,400`), `[+ Add Line]` | `draft` | `OrgRequestBuilderPage.tsx` | **Active V6** |
| **B2B Intake**<br/>Section 03: Location & Schedule | `OrganizationLocation` | `/organization/requests/new` | Start Date, Facility Address, Reporting Office | End Date, Supervisor Name, Scrub Requirements, Special Instructions | `draft` | `OrgRequestBuilderPage.tsx` | **Active V6** |
| **B2B Intake**<br/>Section 04: Review & Submit | `OrganizationStaffingRequest` | `/organization/requests/new` | Confirmation of Multi-Line Requirements | Summary verification | `submitted` → Status: **AWAITING OPS REVIEW** | `MOCK_B2B_REQUESTS` | **Active V6** |
| **Admin Operations**<br/>Dual Request Queue | `Booking`, `OrganizationStaffingRequest` | `/admin/dashboard`, `/admin/organization-requests` | Request ID, Status, Required Staffing Count | Client Patient vs Org Facility Context | `under_review` → `assignment_pending` → `assigned` | `useBookings()`, `MOCK_B2B_REQUESTS` | **Active V6** |
| **Admin Matching**<br/>Eligibility Engine | `StaffProfile`, `Duty` | `/admin/matching` | Staff ID, Booking ID, Rule Checks (Role, Skill, Location, Rest Window) | Admin Override Rationale | `assigned` | `checkStaffConflict()` engine | **Active V6** |
| **Staff Duty Portal**<br/>Shift Execution | `Duty` | `/staff/dashboard`, `/staff/duties/:id` | Duty ID, Staff ID, Current State | Checklist task toggles, Shift Handover Notes | `ASSIGNED` → `TRAVELLING` → `ARRIVED` → `IN_CARE` → `COMPLETED` | `MOCK_DUTIES` | **Active V6** |

---

## 3. Unified Semantic Status Language Across Panels

| Status Key | Visual Badge Style | Applicable Entities | Panel Visibility | Description |
| :--- | :--- | :--- | :--- | :--- |
| `draft` | Neutral Gray Pill | Booking, Staffing Request, Invoice | B2C, B2B | Intake form drafting state |
| `submitted` | Blue Info Pill | Booking, Staffing Request, Timesheet | B2C, B2B, Admin | Submitted by client/org, pending ops review |
| `under_review` | Amber Warning Pill | Booking, Staffing Request | Admin Ops | Ops evaluating clinical requirements or roster availability |
| `needs_clarification` | Orange Alert Pill | Staffing Request, Timesheet | B2B, Admin | Ops requested clarification from hospital/client |
| `approved` | Teal Success Pill | Staffing Request, Timesheet | B2B, Admin | Request or timesheet approved by superintendent/ops |
| `assignment_pending` | Purple Action Pill | Roster Slot, Requirement Line | Admin Ops | Approved requirement line waiting for staff dispatch |
| `assigned` | Indigo Info Pill | Booking, Roster Slot, Duty | B2C, B2B, Admin, Staff | Internal staff member assigned to shift |
| `acknowledged` | Cyan Info Pill | Duty | Staff, Admin Ops | Staff acknowledged shift assignment |
| `active` / `in_care` | Emerald Pulse Pill | Duty, Shift | Staff, Admin Ops | Staff member checked in and active on duty |
| `completed` | Green Solid Pill | Duty, Booking, Timesheet | B2C, B2B, Admin, Staff | Shift completed and verified |
| `rejected` | Red Danger Pill | Timesheet, Candidate | B2B, Admin | Timesheet rejected with mandatory reason recorded |
| `payment_pending` | Amber Warning Pill | Invoice | B2C, B2B, Admin | Invoice generated, awaiting payment settlement |
| `paid` | Teal Solid Pill | Invoice | B2C, B2B, Admin | Invoice payment settled and reconciled |

---

*Document updated for Pulse n Care V6 Product Flow Architecture.*
