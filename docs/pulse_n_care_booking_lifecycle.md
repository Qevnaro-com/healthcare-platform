# PULSE N CARE — BOOKING & DUTY LIFECYCLE SPECIFICATION

**Workspace:** `C:\Users\xshan\Desktop\healthcare-platform`  
**Version:** 2.0  
**Document Status:** Approved Operational Lifecycle Standard  

---

## 1. OVERVIEW

Pulse n Care provides managed home-care nursing and attendant support. A B2C transaction begins with a family submitting a **Care Request**, which is operationally reviewed by Admin, assigned to internal qualified care staff, executed as individual **Care Duties**, and billed via a frozen **Price Snapshot**.

---

## 2. CANONICAL STATE MACHINE LIFECYCLE (20 STATES)

```text
DRAFT
  ↓
REQUEST_SUBMITTED (Client submits care request in 4-step wizard)
  ↓
UNDER_OPERATIONS_REVIEW (Admin checks clinical context & location)
  ↓
CLARIFICATION_REQUIRED (Optional: Ops requests additional patient details)
  ↓
STAFF_ASSIGNMENT_PENDING (Awaiting qualified nurse/caregiver matching)
  ↓
STAFF_ASSIGNED (Internal staff allocated to care request)
  ↓
CLIENT_CONFIRMATION_REQUIRED (Optional: Client reviews assigned staff details)
  ↓
CONFIRMED (Request locked & shift schedule generated)
  ↓
UPCOMING (Care duty scheduled on staff roster)
  ↓
STAFF_EN_ROUTE (Staff traveling to patient doorstep)
  ↓
STAFF_ARRIVED (Staff arrived at patient home)
  ↓
CARE_IN_PROGRESS (Staff executing duty checklist & patient care)
  ↓
CARE_COMPLETED (Shift completed; vitals & handover notes logged)
  ↓
TIMESHEET_PENDING (Awaiting ops timesheet verification)
  ↓
INVOICE_GENERATED (Invoice created from frozen PriceSnapshot)
  ↓
PAYMENT_PENDING (Awaiting client payment receipt)
  ↓
PAID (Offline payment logged by admin)
  ↓
CLOSED (Transaction lifecycle finalized)
```

### Exception & Side Paths
- `CANCELLED`: Controlled cancellation prior to shift execution.
- `REJECTED`: Declined by Operations (out of service area or unfulfilled clinical requirements).

---

## 3. REQUEST VS. DUTY SEPARATION

```text
Parent Level:  CareRequest (Schedule: 5 Days, 12-Hour Shift)
                    │
                    ├── CareDuty #1 (Day 1: 08:00 - 20:00) ➔ Completed
                    ├── CareDuty #2 (Day 2: 08:00 - 20:00) ➔ Completed
                    ├── CareDuty #3 (Day 3: 08:00 - 20:00) ➔ In Progress
                    ├── CareDuty #4 (Day 4: 08:00 - 20:00) ➔ Scheduled
                    └── CareDuty #5 (Day 5: 08:00 - 20:00) ➔ Scheduled
```

- A **CareRequest** represents the commercial agreement and schedule.
- A **CareDuty** represents the operational shift executed by an assigned nurse/caregiver.
