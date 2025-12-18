// src/data/projects/nomad.ts
import type { Project } from "../types";

export const pNomad: Project = {
  id: "nomad-wynwood",
  slug: "/proyectos/nomad",
  name: "NoMad Residences Wynwood",
  city: "Wynwood, Miami",

  // Pricing & basics (brochures do not publish official base price)
  priceFromUsd: 680000,
  pricePerSfApprox: 1250,
  hoa: "$1.40/sf",
  delivery: "Q4 2025",
  furnished: true, // fully finished & furnished

  // STR policy — flexible ownership / no rental restrictions (Airbnb‑friendly). Local permits required.
  rentalPolicyEs:
    "Sin restricciones de alquiler; permite renta diaria (Airbnb). Requiere Certificado de Uso de Miami, licencia estatal (DBPR) e impuestos turísticos.",
  rentalPolicyEn:
    "No rental restrictions; daily Airbnb‑type rentals allowed. City of Miami Certificate of Use and Florida DBPR license required, plus tourist taxes.",

  image: "https://ik.imagekit.io/devrodri/Nomad/1.jpeg",
  images: [
    { src: "https://ik.imagekit.io/devrodri/Nomad/2.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Nomad/3.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Nomad/4.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Nomad/5.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Nomad/6.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Nomad/7.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Nomad/8.jpeg" },
    { src: "https://ik.imagekit.io/devrodri/Nomad/9.jpeg" }
  ],

  // Micro‑claims
  microClaimsEs: [
    "Residencias amobladas y curadas por NoMad & DesignAgency",
    "Airbnb‑friendly (sin restricciones de alquiler)"
  ],
  microClaimsEn: [
    "Residences furnished & curated by NoMad & DesignAgency",
    "Airbnb‑friendly (no rental restrictions)"
  ],

  // Highlights (amenities principales)
  highlights: [
    "Rooftop con piscina estilo resort, cabañas y NoMad Bar",
    "Casa Tua Cucina en planta baja",
    "Biblioteca, coworking y fitness & wellness center",
    "Conserjería 24/7, valet y garaje en el edificio",
    "Arte curado de nivel museo y paisajismo impecable"
  ],
  highlightsEn: [
    "Rooftop resort‑style pool, cabanas and the iconic NoMad Bar",
    "Casa Tua Cucina at ground level",
    "Extensive library, co‑working and fitness & wellness center",
    "24/7 concierge, valet and in‑building garage",
    "Museum‑quality curated art and inspired landscaping"
  ],

  // Unit mix (purchaser guide)
  unitMixEs: [
    "Studios y 1-2 dormitorios · ~464-931 ft² (43-86 m²)"
  ],
  unitMixEn: [
    "Studios and 1-2 BR · ~464-931 sq ft (43-86 m²)"
  ],

  // Features (residencias)
  featuresEs: [
    "Puertas corredizas de piso a techo y balcones privados",
    "Cocinas modernas con electrodomésticos Bosch",
    "Mobiliario y carpintería italiana; encimeras de piedra",
    "Duchas tipo spa; lavadora/secadora en unidad"
  ],
  featuresEn: [
    "Floor‑to‑ceiling sliders and private balconies",
    "Streamlined kitchens with Bosch appliances",
    "Italian cabinetry & woodwork; stone countertops",
    "Spa‑style showers; in‑residence washer/dryer"
  ],

  // Deposit schedule (Purchaser's Guide)
  paymentPlanEs: [
    "20% al contrato",
    "10% a los 60 días",
    "70% al cierre"
  ],
  paymentPlanEn: [
    "20% at contract",
    "10% 60 days later",
    "70% at closing"
  ],

  faqsEs: [
    { q: "¿Precios desde?", a: "Studios desde la franja media de ~US$600.000; 2 dormitorios cerca de ~US$1.0M (sujeto a inventario)." },
    { q: "¿HOA estimada?", a: "Aprox. US$1.40/ft² por mes (incluye operación de amenities, seguridad 24h, conserjería y valet)." },
    { q: "¿Entrega?", a: "Q4 2025 (estructura ‘topped off’ en oct‑2024; obra en acabados)." },
    { q: "¿Política de rentas?", a: "Sin restricciones; alquiler diario (Airbnb) permitido. Requiere CU de Miami, licencia DBPR e impuestos turísticos." },
    { q: "¿Amoblamiento?", a: "Sí, residencias completamente amobladas y curadas por NoMad & DesignAgency (turn‑key)." },
    { q: "¿Plan de depósitos?", a: "20% contrato · 10% a 60 días · 70% cierre (plan vigente)." }
  ],
  faqsEn: [
    { q: "Starting prices?", a: "Studios currently from the mid‑$600Ks; 2‑bedrooms around ~$1.0M (subject to inventory)." },
    { q: "HOA estimate?", a: "Approx. US$1.40/sq ft per month (includes amenity operations, 24/7 security, concierge and valet)." },
    { q: "Completion?", a: "Q4 2025 (structure topped off Oct‑2024; interiors underway)." },
    { q: "Rental policy?", a: "No restrictions; daily Airbnb‑type rentals allowed. CU (City of Miami), DBPR license and tourist taxes required." },
    { q: "Furnishing?", a: "Yes—fully furnished and curated by NoMad & DesignAgency (turn‑key)." },
    { q: "Deposit schedule?", a: "20% at contract · 10% in 60 days · 70% at closing (current plan)." }
  ]
};

export default pNomad;