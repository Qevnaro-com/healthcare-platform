# PULSE N CARE — ROLE VISIBILITY & DATA ISOLATION SPECIFICATION

**Workspace:** `C:\Users\xshan\Desktop\healthcare-platform`  
**Version:** 2.0  
**Document Status:** Permission & Data Isolation Standard  

---

## 1. PRODUCT PANEL STRUCTURE

The application is structured into **3 distinct product panels**:

1. **PANEL 1 — Client Portal & Public Website**: Public service catalog, care request wizard, active requests tracker, assigned staff summary, invoice, offline payment ledger, and tax receipts.
2. **PANEL 2 — Operations Admin Control**: Service registry & question configurator, staff eligibility matching engine, request dispatch, duty roster monitor, timesheets, and financial ledger.
3. **PANEL 3 — Staff Duty Portal**: Today's assigned duty roster, patient name, location, shift, care context summary, dynamic duty checklist, and care completion logging.

---

## 2. ROLE PERMISSION & DATA ACCESS MATRIX

| Feature / Data Entity | Client Portal | Staff Duty Portal | Admin Operations | B2B Org Portal |
|---|---|---|---|---|
| **Public Services Catalog** | ✅ Published Services Only | ❌ No Access | ✅ Full Registry Control | ❌ (Custom Retainers) |
| **Care Request Wizard** | ✅ Own Requests | ❌ No Access | ✅ On Behalf of Client | ❌ (Staffing Requests) |
| **Request Status View** | ✅ Customer Lifecycle Terms | ❌ No Access | ✅ Operational State Machine | ❌ No Access |
| **Assigned Nurse Summary** | ✅ Name, Cert & Photo | ❌ Self Profile Only | ✅ Full HR / KYC File | ❌ Roster Allocated Staff |
| **Rule-Based Matching Matrix** | ❌ Hidden | ❌ Hidden | ✅ Eligibility & Rest Window | ❌ Hidden |
| **Duty Execution Checklist** | ❌ Hidden | ✅ Dynamic Task Checklist | ✅ Duty Audit Monitor | ❌ Hidden |
| **Handover Notes & Vitals** | ❌ Hidden | ✅ Log Care Observations | ✅ Verified Notes Log | ❌ Hidden |
| **Invoices & Commercials** | ✅ Personal Invoices | ❌ No Financial Access | ✅ Full Financial Ledger | ✅ Institutional Invoices |
| **Payment Receipts** | ✅ Printable PDF Receipt | ❌ No Access | ✅ Manual Payment Logger | ❌ B2B Receipts |

---

## 3. TENANCY ISOLATION RULES

- **B2C Client Isolation**: `clientId === currentUser.clientId`. Clients can view only their own patient profiles, care requests, and invoices.
- **Staff Isolation**: `staffId === currentUser.staffId`. Staff members can view only duties assigned to them.
- **B2B Organization Isolation**: `organizationId === currentUser.organizationId`. Hospital users manage facility staffing requests (`mockB2BData.ts`) and ward rosters. B2B data is completely isolated from B2C consumer data.
