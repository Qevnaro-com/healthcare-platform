# PULSE N CARE — QA & TEST SCENARIO LOG

**Workspace:** `C:\Users\xshan\Desktop\healthcare-platform`  
**Version:** 2.0  
**Document Status:** Quality Assurance Verification Matrix  

---

## 1. END-TO-END TEST SCENARIOS (SCENARIOS A – J)

### Scenario A — Post-Operative Nursing Request Lifecycle
1. Client selects *Post-Operative Nursing Care* in 4-step wizard.
2. Dynamic questions render: Wound care = Yes, Incision Dressing = Yes, Catheter care = No.
3. Client selects 12-Hour Day Shift for 3 days starting 2026-03-25 in Defence Colony, Delhi NCR.
4. Review screen calculates estimated total (`PriceSnapshot`). Client clicks **"Request Care at Home"**. Status = `REQUEST_SUBMITTED`.
5. Admin opens Operations Control; checks rule-based eligibility. Assigns Nurse Karthik Rao. Status = `CONFIRMED`. 3 `CareDuty` records generated.
6. Nurse Karthik opens Staff Portal. Clicks `[Acknowledge]` ➔ `[En Route]` ➔ `[Arrived]` ➔ `[In Care]`. Executes duty checklist.
7. Nurse logs vitals (BP 120/80, SpO2 98%) and clicks `[Complete Duty]`. Status = `COMPLETED`. `CareTimesheet` created.
8. Admin views invoice `PNC-INV-2026-XXXX` generated from frozen snapshot. Admin records UPI manual payment. Payment status = `PAID`.
9. Client views printable tax receipt in portal.

### Scenario B — Admin Service Toggle (Public Visibility)
- Admin toggles *High-Dependency Nursing Care* to `active: false` in Admin Dynamic Service Registry.
- Client opens booking wizard; verifies service is hidden from B2C selection.

### Scenario C — Admin Dynamic Question Builder
- Admin adds a new question: *"Is patient on blood thinners?"* to *Senior Skilled Nursing Visit*.
- Client selects Senior Nursing; verifies new question immediately appears in Step 1.

### Scenario D — Dynamic Duty Checklist
- Admin adds task: *"Aseptic drain tube flushing"* to *Post-Op Nursing* checklist.
- Staff opens active duty; verifies task appears in operational checklist during `IN_CARE` phase.

### Scenario E — Price Freeze Guarantee
- Admin edits service base rate in Admin settings after a request is submitted.
- Existing request invoice total remains unchanged, retaining the original `PriceSnapshot` value.

### Scenario F — Tenancy & Access Isolation
- Verify Client A cannot access Client B's care requests.
- Verify Staff A cannot view Client billing data or other staff rosters.
- Verify B2B hospital staffing requests remain isolated inside `mockB2BData.ts`.

---

## 2. FINAL REALITY CLASSIFICATION REPORT

| Architectural Layer | Implementation Reality Classification | Notes |
|---|---|---|
| **Data Persistence** | `FRONTEND STATE / LOCALSTORAGE` | React Context (`BookingContext`) + `localStorage` for demo persistence. |
| **Data Models** | `REAL / PERSISTED IN STATE` | Canonical `CareRequest`, `CareDuty`, `PriceSnapshot`, `CareInvoice` schemas. |
| **Dynamic Forms** | `REAL FRONTEND` | `DynamicFormRenderer` driven by Admin `serviceQuestions` config. |
| **Duty Checklist** | `REAL FRONTEND` | Staff portal loads `dutyChecklist` configured by Admin per service. |
| **Pricing Engine** | `REAL FRONTEND` | Unified `calculatePricing()` & `PriceSnapshot` freeze. |
| **Payment Gateway** | `NOT IMPLEMENTED (MANUAL LEDGER)` | Admin logs offline payments (Cash, UPI, NEFT) creating `PaymentRecord`. |
| **GPS / Live Map** | `FRONTEND HELPER ONLY` | Browser Geolocation API used as optional location picker helper. |
| **SMS / WebPush** | `SIMULATED / IN-MEMORY` | In-memory toast notifications and UI alerts. |
