# Pulse n Care — Full Visual Art Direction & Design System Specification

**Version:** 2.0.0 (Signature Art Direction Pass)  
**Author:** Antigravity AI  
**Date:** September 17, 2026  
**Ecosystem:** Pulse UI Healthcare Operations Design System  

---

## 01. Color System & Ratio

The Pulse n Care palette is designed to evoke **Care, Control, Trust, and Precision**.

### Color Ratio Architecture
- **70% Neutral Surfaces (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`)**: Clean, spacious canvas to prevent visual noise.
- **20% Typography & Borders (`#0F172A`, `#334155`, `#475569`, `#E2E8F0`)**: High contrast, legible typography and restrained 1px borders.
- **8% Brand Accents (`#0EA5A4`, `#0F766E`, `#2563EB`, `#0284C7`)**: Focused interactive triggers, key operational indicators, and pulse line highlights.
- **2% Semantic Accents (`#16A34A`, `#D97706`, `#DC2626`)**: Critical status badges, alerts, and verification tags.

---

## 02. Typography Hierarchy

- **Display / Hero**: Tight line-height, bold tracking, font-heading (`Space Grotesk` / `Inter`).
- **H1 / Workspace Headers**: 28px - 36px font-extrabold with micro eyebrow labels (`CARE OPERATIONS / 01`).
- **H2 / Section Titles**: 20px - 24px font-bold.
- **Body / Content**: 14px - 16px comfortable reading line-height (1.6).
- **Metadata / Tabular Data**: 11px - 12px tabular numerals (`tabular-nums`) for exact operational clarity.

---

## 03. Surface System (PulseSurface Tiers)

1. **Flat Surface**: `#FFFFFF`, no shadow, 1px `#E2E8F0` border. For standard content blocks.
2. **Raised Surface**: `#FFFFFF`, 1px `#E2E8F0` border, `shadow-card` (0 4px 16px -2px rgba(15, 23, 42, 0.04)). For interactive cards.
3. **Floating Surface**: `#FFFFFF`, `shadow-floating` (0 12px 32px -4px rgba(15, 23, 42, 0.08)). For dropdowns, drawers, and modal dialogs.
4. **Highlight Surface**: Subtle gradient tint (`from-teal-50/40 via-white to-blue-50/30`), border `#0EA5A4/30`. For active workflows.
5. **Feature Surface**: `#FFFFFF`, 1px `#0EA5A4/20` border, top accent gradient bar (`#0EA5A4` to `#2563EB`). For flagship highlights.

---

## 04. Procedural Texture System

Implemented as pure CSS background utilities with low opacity (0.025 – 0.08) to maintain calm professionalism:
- `bg-pulse-grid`: 28px teal grid lines.
- `bg-pulse-dots`: 18px indigo/blue radial dot field.
- `bg-pulse-cross-grid`: 32px crosshair intersection grid.
- `bg-pulse-radial`: Top radial ambient light glow.
- `bg-pulse-glow`: Dual corner gradient glow.
- `bg-pulse-blueprint`: 16px fine blueprint lines.
- `bg-pulse-soft-glow`: Center soft radial glow.
- `bg-pulse-surface`: 12px subtle surface stipple.
- `bg-pulse-paper`: 20px soft paper texture.

---

## 05. The Pulse Line Motif

The signature proprietary motif is an abstract SVG pulse/ECG curve (`PulseLine`) with animated signal flow:
- **Hero Variant**: Animated signal dot moving across gradient path (`#0EA5A4` to `#2563EB`).
- **Divider Variant**: Animated dashed stroke offset for section transitions.
- **Mini Variant**: Compact inline 48x12 SVG for status cards and badges.

---

## 06. Motion System Tokens

Standardized transition durations:
- **Fast (`120ms`)**: Button hover, badge status changes, dropdown toggles.
- **Normal (`180ms`)**: Card hover lift, modal backdrop fade-in.
- **Smooth (`240ms`)**: Slide-over drawer entrance, tab switches.
- **Slow (`400ms`)**: Progress bar fills, hero animated SVG pulse curves.

---

## 07. Page Visual Mapping & Asset Registry

| Page / Workspace | Composition Pattern | Primary Texture | Hero / Signature Feature |
| :--- | :--- | :--- | :--- |
| **HomePage** | Editorial Split Hero + Horizontal Journey | `medical-grid` / `pulse-dots` | Campaign Hero Banner + Floating Location Pill + Scope Pillars |
| **ServicesPage** | Category Filter + Feature Card + 3-Col Grid | `pulse-dots` / `care-pathway` | Featured Offering Card + 4-Step Care Pathway |
| **OrgDashboardPage** | Command Banner + KPI Strip + 2-Col Split | `soft-cell` / `pulse-glow` | Managed Workforce Command Banner + Live Roster Gaps |
| **AdminDashboardPage** | Header + SLA Health Strip + Metric Grid | `micro-dot-mesh` / `pulse-dots` | Operational Health Compliance Strip + Exception Alert |
| **AdminMatchingPage** | Queue Split + Eligibility Matrix | `canvas-primary` | Rule-based Conflict Checker & Super Admin Override Modal |
| **StaffDashboardPage** | Context Switcher + Duty Card + Quick Nav | `micro-dot-mesh` | Turn-by-turn Navigation Card + Shift Timesheet Log |

---

## 08. Responsive Rules & Viewport Adaptability

- **Mobile (375px – 430px)**: Single-column stack, compact bottom navigation bars, horizontal scrollable category pills, full-width touch targets.
- **Tablet (768px – 1024px)**: 2-column card grid, collapsible side drawers, condensed data table views.
- **Desktop (1280px – 1440px+)**: Multi-column editorial asymmetric layouts, sticky filter bars, split command view.

---

## 09. Accessibility & Reduced Motion

- **Keyboard Navigation**: Branded focus rings (`focus:ring-2 focus:ring-brand-teal/30`).
- **Screen Readers**: Semantic tags (`<section>`, `<h1-h4>`, `aria-hidden="true"` on decorative SVGs).
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by zeroing transition durations and animation iterations in `index.css`.

---

## 10. QA Findings & Verification

- **TypeScript Compilation**: Executed `tsc -b` — 0 errors.
- **Production Build**: Executed `vite build` — 2054 modules transformed cleanly into `dist/assets/`.
- **Browser Execution**: Verified rendering across Chrome/Firefox viewports.
