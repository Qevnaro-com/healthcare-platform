# PULSE N CARE — DYNAMIC SERVICE CONFIGURATION & QUESTION BUILDER SPECIFICATION

**Workspace:** `C:\Users\xshan\Desktop\healthcare-platform`  
**Version:** 2.0  
**Document Status:** Admin Dynamic Registry Standard  

---

## 1. ADMIN SERVICE REGISTRY SCHEMA

Admin controls the dynamic service catalog through the following schema properties:

```typescript
export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  pricing: ServicePricing;
  requiredQualifications: string[];
  active: boolean;                  // Admin toggle (true = published, false = hidden)
  allowedShifts: string[];          // Allowed shift options
  allowedFrequencies: string[];      // Allowed schedule frequencies
  serviceQuestions: ConfigurableQuestion[]; // Service-specific questions
  dutyChecklist: string[];          // Operational staff duty checklist
}
```

---

## 2. CONFIGURABLE QUESTION ENGINE

Each service defines its own array of `serviceQuestions`:

```typescript
export interface ConfigurableQuestion {
  id: string;
  label: string;
  type: 'single_choice' | 'multi_choice' | 'yes_no' | 'text' | 'textarea' | 'number' | 'date';
  required: boolean;
  options?: string[];
  dependsOn?: { fieldId: string; value: string }; // Conditional visibility
  active: boolean;
  helpText?: string;
}
```

- **Dynamic Form Renderer (`DynamicFormRenderer.tsx`)**: Reusable component rendering configured questions in Step 1 of the client booking wizard. Evaluates `dependsOn` conditional logic dynamically.

---

## 3. VERIFIED B2C SERVICES CATALOGUE

1. **Post-Operative Nursing Care (`srv-nursing-post-op`)**:
   - Required Qualification: B.Sc Nursing / RN License
   - Questions: Surgery reason, Sterile wound dressing, Dressing type, Catheter/drain care, IV/IM injection administration.
   - Duty Checklist: Sterile dressing & incision check, Vitals charting, Injection administration, Catheter hygiene, Progress log entry.

2. **Senior Skilled Nursing Visit (`srv-nursing-elderly`)**:
   - Required Qualification: GNM / B.Sc Nursing
   - Questions: Primary care focus, Glucose monitoring, Insulin administration, Tube feeding.
   - Duty Checklist: BP & pulse measurement, Blood sugar testing, Insulin administration, Bedsores staging.

3. **12-Hour Day / Night Caregiver (`srv-caregiver-12hr`)**:
   - Required Qualification: Certified Attendant / Caregiver
   - Questions: Shift preference (Day/Night), Mobility level, Bathing assistance, Diaper changing, Position rotation.
   - Duty Checklist: Bath & hygiene, Wheelchair transfer, Diaper change, Feeding support, 2-hour position rotation.

4. **24-Hour Live-In Caregiver (`srv-caregiver-24hr`)**:
   - Required Qualification: Senior Certified Caregiver
   - Questions: Overall dependency level, Overnight supervision, Fall prevention, Meal feeding.
   - Duty Checklist: Complete morning & evening hygiene, Overnight supervision, Medication reminders, Fall prevention.

5. **High-Dependency Nursing Care (`srv-nursing-high-dependency`)**:
   - Required Qualification: B.Sc Nursing / High-Dependency Certified
   - Questions: Clinical context, Tracheostomy suctioning, Continuous vital monitoring, Feeding tube flushing.
   - Duty Checklist: Continuous vital charting, Tracheostomy suctioning, Tube flushing & nutrition, IV antibiotic administration.
