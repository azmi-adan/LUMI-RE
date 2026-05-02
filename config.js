/* ============================================================
   config.js  —  SWAP THIS FILE TO REUSE THE AD TEMPLATE
   ============================================================
   ✅ Deploy-safe — all fictional brand, no trademarked names.
   ============================================================ */

const AD_CONFIG = {

  /* ── Brand ─────────────────────────────────────────── */
  brand: {
    name:     "LUMIÈRE PARIS",
    tagline:  "Reveal Your Light",
    website:  "lumiere-paris.com",
    country:  "Paris, France",
    copyright:"2025 Lumière Paris. All rights reserved.",
  },

  /* ── Product ────────────────────────────────────────── */
  product: {
    badge:       "NEW 2025 FORMULA",
    titleLine1:  "GLOSS",
    titleLine2:  "Lumineuse",
    titleLine3:  "36H PLUMP",
    description: "A revolutionary lip gloss that delivers mirror-shine hydration for up to <strong>36 hours.</strong>",
    price:       "€14.99",
    priceLabel:  "from",
    ctaPrimary:  "SHOP NOW",
    ctaGhost:    "Explore Shades →",
    ctaFinal:    "DISCOVER THE COLLECTION",
    availability:"Available now at all Lumière stockists and",
    tubeLabel: {
      brand: "LUMIÈRE",
      name:  "GLOSS",
      sub:   "LUMINEUSE",
    },
  },

  /* ── Colour palette ─────────────────────────────────── */
  palette: {
    rose:       "#C94060",
    roseLight:  "#E87C8A",
    rosePale:   "#F4A9B8",
    crimson:    "#9B1A3F",
    gold:       "#E8C97A",
    goldLight:  "#F5E09A",
    ink:        "#0E0509",
    inkMid:     "#1A0A10",
    inkSoft:    "#2A1020",
  },

  /* ── Shades ─────────────────────────────────────────── */
  shades: [
    { name: "Rouge Éclat",   hex: "#C94060" },
    { name: "Rose Poudré",   hex: "#E87C8A" },
    { name: "Cerise Velours",hex: "#9B2250" },
    { name: "Pétale Nude",   hex: "#F4A9B8" },
    { name: "Prune Mystère", hex: "#7D1B3C" },
    { name: "Corail Soleil", hex: "#E84E78" },
  ],

  /* ── Stats ──────────────────────────────────────────── */
  stats: [
    { value: "36", unit: "H",  desc: "Long-lasting shine"  },
    { value: "8",  unit: "×",  desc: "More hydration"      },
    { value: "+2", unit: "mm", desc: "Plumping effect"      },
  ],

  /* ── Ingredients ────────────────────────────────────── */
  ingredients: ["Hyaluronic Acid", "Rose Extract", "Ceramides"],

  /* ── Rating ─────────────────────────────────────────── */
  rating: {
    score: "4.9",
    outOf: "5",
    count: "12,840",
  },

  /* ── Nav ────────────────────────────────────────────── */
  nav: ["Collection", "Shades", "Ritual"],

  /* ── Ticker ─────────────────────────────────────────── */
  tickerItems: [
    "GLOSS LUMINEUSE",
    "36H SHINE",
    "PLUMPING FORMULA",
    "LUMIÈRE PARIS",
    "MIRROR FINISH",
    "HYDRATION BOOST",
    "6 SHADES",
  ],

  /* ── Features ───────────────────────────────────────── */
  features: {
    bgWord: "GLOSS",
    items: [
      {
        icon:  "💋",
        title: "Mirror Shine",
        body:  "Ultra-reflective formula that catches every light for camera-ready lips.",
      },
      {
        icon:  "💧",
        title: "36H Hydration",
        body:  "Hyaluronic acid complex locks in moisture through every hour of the day.",
      },
      {
        icon:  "🌹",
        title: "Rose Extract",
        body:  "Wild rose oil softens and conditions for lips that feel as good as they look.",
      },
      {
        icon:  "✨",
        title: "Plump Effect",
        body:  "Peptide complex visibly plumps and defines the lip line instantly.",
      },
    ],
  },

  /* ── Shades section ─────────────────────────────────── */
  shadesSection: {
    eyebrow:    "THE COLLECTION",
    titleLine1: "Six Shades.",
    titleLine2: "One Obsession.",
  },

  /* ── Final CTA ──────────────────────────────────────── */
  finalCta: {
    eyebrow:   "REVEAL YOUR LIGHT",
    headLine1: "Your lips.",
    headLine2: "Unforgettable.",
  },

};