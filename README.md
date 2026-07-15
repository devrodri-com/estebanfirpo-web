# 🏙️ Esteban Firpo Real Estate - Web

## Overview
A professional real‑estate website built with **Next.js (App Router)** focused on **Miami pre‑construction** and related investment verticals (financing and storages). The design language is **minimal, Apple‑inspired**, with strong hierarchy, accessibility and performance to convert leads.

---

## 🔧 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** `next-intl` (ES / EN)
- **Deploy:** Vercel
- **UI Pattern:** Reusable React components with a brand system (Navy + Gold)

---

## 📁 Project Structure

### Pages
| Route | Description |
| --- | --- |
| `/[locale]` | Home (multilingual: ES / EN) |
| `/[locale]/proyectos` | Projects listing |
| `/[locale]/proyectos/[slug]` | Individual project page |
| `/[locale]/miami` | *Why invest in Miami?* |
| `/[locale]/precon` | *Why pre‑construction?* |
| `/[locale]/financiacion` | Financing section |
| `/[locale]/storages` | Self‑storage investment section |
| `/[locale]/sobre-mi` | About Esteban Firpo |

### Core Components
- **NavBar.tsx** — Responsive top navigation with ES/EN switch and gold active underline.
- **Footer.tsx** — Global footer with brand links and contact.
- **FeaturedProjects.tsx** — Curated projects band.
- **SectionWhyPrecon.tsx** — “Why Pre‑construction” module.
- **SectionWhyStorages.tsx** — Storages rationale and CTAs.
- **HighlightsBlock.tsx** — Key highlights as compact list/cards.
- **PaymentPlan.tsx** — Editorial payment plan with numbered steps.
- **FaqsBlock.tsx** — Accessible accordion for FAQs.
- **ProjectsFilters.tsx** — Filters + sort (A→Z, Z→A, price), mobile‑friendly.

### Data
- Each project lives in `/src/data/projects/` as a typed module (`*.ts`).
  - `unitMix*`, `features*`, `paymentPlan*`, `highlights*`, `faqs*`, `rentalPolicy*`, pricing, hero + gallery URLs, map metadata, etc.
- Storages data: `/src/data/storages/` (e.g., **Callaway** case).

### SEO & Social
- Every project page exports `generateMetadata` (ES/EN): dynamic `title/description`, **Open Graph** images, **Twitter card**, and **canonical alternates** to guarantee correct previews across WhatsApp/Instagram/LinkedIn.

---

## 🎨 Brand System

**Palette**

| Role | Name | Hex |
|---|---|---|
| Primary | Navy | `#0A2540` |
| Accent | Gold | `#D4AF37` |
| Soft background | Sand | `#F9FAFB` |
| Text | Ink | `#0E1624` |

**Guidelines**
- Minimal, content‑first; consistent spacing and typographic rhythm.
- **Navy cards** with a subtle **gold hairline** act as premium anchors.
- **Solid** buttons for primary actions and **ghost/outline** for secondary.
- Mobile‑first; accessible focus states and ARIA labels.

---

## 🧱 Folder Map
```
src/
 ├─ app/
 │   ├─ [locale]/
 │   │   ├─ page.tsx            # Home
 │   │   ├─ proyectos/
 │   │   ├─ proyectos/[slug]/
 │   │   ├─ miami/
 │   │   ├─ precon/
 │   │   ├─ financiacion/
 │   │   ├─ storages/
 │   │   └─ sobre-mi/
 │
 ├─ components/
 │   ├─ NavBar.tsx
 │   ├─ Footer.tsx
 │   ├─ FeaturedProjects.tsx
 │   ├─ SectionWhyPrecon.tsx
 │   ├─ SectionWhyStorages.tsx
 │   ├─ HighlightsBlock.tsx
 │   ├─ PaymentPlan.tsx
 │   ├─ FaqsBlock.tsx
 │   └─ ProjectsFilters.tsx
 │
 └─ data/
     ├─ projects/
     └─ storages/
```

---

## ✅ Authoring Guide (projects)
1. **Create** `src/data/projects/<slug>.ts` using the typed template.
2. **Fill** basics: `id/slug/name/city` (prefer full address for accurate map) and optional `lat/lng`.
3. **Pricing**: `priceFromUsd`, `pricePerSfApprox`, `hoa`, `delivery` (**ES:** Entrega · **EN:** Completion), `furnished`.
4. **Rental policy** (ES/EN): include **Certificate of Use / Certificado de Uso**, **DBPR**, tourist taxes when STR applies.
5. **Images**: 1 hero + ~8 gallery images (ImageKit URLs recommended).
6. **Short copy**: two `microClaims*` max; keep to one line on mobile.
7. **Content**: `highlights*`, `unitMix*`, `features*`, `paymentPlan*` (must add up to **100%**; fixed reservation is **not** an extra %), and `faqs*` (3-6).
8. **Register** in `src/data/projects/index.ts` (import and append to `INCOMING`).
9. **Build & QA**: `npm run build && npm run start`. Check cards, map, OG preview.

**Common pitfalls**
- **Hydration mismatch**: do not branch on `window` during SSR; prefer CSS media queries or `useEffect`.
- **Terminology**: *Completion* in EN, *Entrega* in ES (don’t mix).
- **Plan de pagos**: reservation amounts should be described, not added to the % total.

---

## 🧪 Accessibility & Performance
- Semantic HTML, labeled controls, and visible focus rings.
- Image weight discipline and accurate `sizes` attributes.
- Avoid long truncations in mobile cards; keep bullets to one line.

---

## 📣 Credits
- **Design & Engineering:** Rodrigo Opalo — [devrodri.com](https://www.devrodri.com)
- **Client:** Esteban Firpo · Miami Real Estate — [estebanfirpo.com](https://www.estebanfirpo.com)

---

## 📬 Contact
**Esteban Firpo · Miami Real Estate**  
Miami, FL — 📧 [esteban@miamiliferealty.com](mailto:esteban@miamiliferealty.com)
