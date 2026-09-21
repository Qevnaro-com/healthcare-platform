# PULSE N CARE — PRICING, BILLING & INVOICING MODEL

**Workspace:** `C:\Users\xshan\Desktop\healthcare-platform`  
**Version:** 2.0  
**Document Status:** Commercial Calculation & Invoicing Standard  

---

## 1. CANONICAL PRICING CALCULATION ENGINE

All application panels consume a single pricing calculation formula:

$$\text{Base Charge} = \text{Service Base Rate} \times \text{Duration Units (Days / Visits)}$$

$$\text{Shift Surcharge} = \begin{cases} \text{Base Charge} \times 0.20 & \text{if Night Shift} \\ \text{Base Charge} \times 0.80 & \text{if 24-Hour Live-In} \\ 0 & \text{otherwise} \end{cases}$$

$$\text{Subtotal} = \text{Base Charge} + \text{Shift Surcharge}$$

$$\text{Tax Amount (GST 18\%)} = \text{Subtotal} \times 0.18$$

$$\text{Estimated Total} = \text{Subtotal} + \text{Tax Amount}$$

---

## 2. FROZEN PRICE SNAPSHOT RULE

When a client submits a care request, the system freezes the calculated pricing into a `PriceSnapshot` record:

```typescript
export interface PriceSnapshot {
  snapshotId: string;
  serviceId: string;
  basePrice: number;
  priceUnit: 'per_visit' | 'per_day' | 'per_shift' | 'per_hour' | 'per_session';
  durationUnits: number;
  shiftMultiplier: number;
  subtotal: number;
  taxRate: number; // 0.18 for 18% GST
  taxAmount: number;
  totalAmount: number;
  snapshotTimestamp: string;
}
```

- **Price Freeze Guarantee**: Modifying service catalog rates in Admin settings updates only **future new requests**. Existing bookings and generated invoices derive strictly from their saved `PriceSnapshot`.

---

## 3. INVOICING & PAYMENT LEDGER REALITY

1. **Invoice Timing**: Invoices are generated at the conclusion of duty execution or upon booking confirmation based on frozen snapshot details.
2. **Offline Payment Ledger**: Online payment gateways are explicitly classified as **NOT IMPLEMENTED**. Invoices are issued with status `ISSUED`.
3. **Manual Payment Recording**: Operations Admins log received payments (UPI UTR, Bank Transfer NEFT/RTGS, Cash, Cheque) creating a `PaymentRecord` and updating status to `PAID`.
4. **Tax Receipts**: Clients can view and print official tax invoice receipts directly from their client portal (`/client/bookings/:id`).
