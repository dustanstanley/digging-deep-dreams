
# Myers Underground Utilities — One-Page Site Plan

A single-page, classic & professional website that mirrors the trust and credibility of the existing brochure while modernizing presentation, navigation, and contact flow.

## Brand Foundation

- **Primary Blue:** `#252355` (RGB 37, 35, 85) — headers, navigation, footer, accents
- **Accent Red:** `#DC3232` (RGB 220, 50, 50) — CTAs, the logo "swoop," subtle dividers
- **Neutrals:** warm off-white background, dark slate body text, light gray section dividers
- **Typography:** Garamond (or EB Garamond from Google Fonts) for headings and pull quotes; a clean sans-serif (Inter) for body and UI for legibility on screens
- **Logo:** the supplied color-matched SVG, used in the header (and a larger treatment in the footer)
- **Tone:** restrained, confident, brochure-inspired — generous whitespace, structured layout, traditional contractor feel without looking dated

## Page Structure (top → bottom)

```text
┌───────────────────────────────────────────────────┐
│  Sticky Header: Logo · About · Services · Projects │
│                 Testimonials · Careers · Contact   │
├───────────────────────────────────────────────────┤
│  HERO                                              │
│  "Water, Sewer and Gas Lines"                      │
│  Commercial / Industrial · Subdivisions            │
│  Sitework · Road Bores · Concrete                  │
│  [ Request a Quote ]   [ Call (601) 544-4188 ]     │
├───────────────────────────────────────────────────┤
│  ABOUT                                             │
│  Mississippi-based · Licensed, insured, bonded     │
│  Mission statement · Experienced · Ready           │
├───────────────────────────────────────────────────┤
│  FOUNDER HIGHLIGHT                                 │
│  Photo of Bill & Peyton Myers (bg-removed)         │
│  Third-generation story + Peyton Myers pull quote  │
├───────────────────────────────────────────────────┤
│  SERVICES (icon grid, ~13 items)                   │
├───────────────────────────────────────────────────┤
│  PROJECTS — Categorized highlights                 │
│  Tabs / cards: Municipal · Commercial · Subdivisions│
│  · Industrial   +  "View full project list" toggle │
├───────────────────────────────────────────────────┤
│  TESTIMONIALS (3 client quotes, brochure-style)    │
├───────────────────────────────────────────────────┤
│  CAREERS — "Careers at Myers Underground" blurb    │
│  + Apply CTA (mailto with subject line)            │
├───────────────────────────────────────────────────┤
│  CONTACT                                           │
│  Left: phone / fax / email / address (click-to)    │
│  Right: contact form → emails the office           │
│  Below: embedded Google Map of 408 Ryan Road       │
├───────────────────────────────────────────────────┤
│  FOOTER: large logo, address, phone, © year        │
└───────────────────────────────────────────────────┘
```

Smooth in-page scroll for nav links; sticky header collapses to a hamburger menu on mobile.

## Section Details

**Hero.** Full-width photo of the home office (`home office.png`), darkened with a subtle blue overlay for legibility. Garamond display headline with the brochure tagline. Two CTAs: primary red "Request a Quote" (scrolls to contact form), secondary outlined "Call (601) 544-4188" (tel: link). Small "Serving Mississippi & Alabama since [year]" line.

**About.** Two-column layout. Left: the brochure About copy condensed into a tight intro + the Mission paragraph. Right: three small stat/value cards — *Experienced*, *Ready*, *Safety-First* (no lost-time accidents).

**Founder Highlight.** Side-by-side layout. Photo of Bill & Peyton Myers (background-removed version) on one side. On the other: short narrative about Peyton as third-generation contractor, plus the Peyton Myers pull quote in Garamond italic.

**Services.** Clean grid of 13 services from the brochure (Water, Sanitary Sewer, Fire Protection, Force Mains, Storage Tanks, Treatment Plants, Pump Stations, Rural Water, Storm Drainage, Road Building, Site Work, Clearing & Grubbing, Boring & Tunneling). Each item: small line icon + label, no fluff.

**Projects.** Categorized into four buckets, with the full list available behind a "View all projects" expander:
- *Municipal & Public Works* (CDBG projects, city water/sewer, pump stations, airports)
- *Commercial & Institutional* (Walmart sites, hospitals, schools, JCJC)
- *Subdivisions & Residential* (Woods, West Lake Manor, Oak Hill, mobile home villages)
- *Industrial* (Cooper Power, Dart Container, Nordan Smith, Camp Shelby)
Each card shows 4–6 marquee project names with location. Expander reveals the complete brochure list in a clean two-column layout.

**Testimonials.** Three brochure quotes (Ned Hogg, Kyle Wallace, Arthur Henderson) presented as Garamond italic pull quotes with attribution and company. Subtle red accent rule under each.

**Careers.** Short headline "Careers at Myers Underground" with the supplied paragraph and a single CTA: "Email Us About Opportunities" (mailto with prefilled subject "Careers Inquiry").

**Contact.** Two columns:
- *Left:* tappable phone, fax, email, and address with small icons; hours if you want to add them later
- *Right:* contact form — Name, Company (optional), Phone, Email, Project Type (select), Message — that emails myersunderground@att.net
Below both columns: embedded Google Map of 408 Ryan Road, Hattiesburg, MS 39401.

**Footer.** Large logo treatment, address, phone, email, "© [year] Myers Underground Utilities, LLC. Licensed · Insured · Bonded." A small "Site by [credit]" line if you want one.

## Assets to Import

From your repo and uploads, copied into the project:
- `logo/Myers Underground Logo color matched.svg` → header & footer
- `brochure/home office.png` → hero background
- `brochure/dad son myers background removed.png` → founder section
- (Optional) selected brochure scans as decorative texture/section dividers
- Google Font: EB Garamond (headings), Inter (body)

## Technical Notes

- React + Vite + Tailwind + shadcn/ui (existing stack), single route at `/`
- Design tokens added to `index.css` and `tailwind.config.ts`: brand blue, brand red, surface neutrals, Garamond + Inter font families, semantic tokens (no hardcoded colors in components)
- One section component per block (`Hero`, `About`, `Founder`, `Services`, `Projects`, `Testimonials`, `Careers`, `Contact`, `Footer`) for clean iteration later
- **Contact form delivery:** enable Lovable Cloud and add an edge function that uses Resend to email the office; form validated client- and server-side with zod (name, company, phone, email, project type, message; length limits, email format). A `RESEND_API_KEY` secret will need to be added when we wire it up.
- Google Map: standard `<iframe>` embed of the Hattiesburg address — no API key required
- Responsive: mobile-first, hamburger nav under `md`, single-column stacks for About / Founder / Contact on mobile
- Subtle, restrained motion only (fade-in on scroll for section headers); no flashy animations, in keeping with the classic & professional direction
- SEO basics: page title, meta description, OpenGraph tags, semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), descriptive alt text on every image
- Accessibility: AA contrast on blue/red against background, focus states on all interactive elements, form labels properly associated

## Out of Scope (for now)

- Multi-page architecture, blog, or CMS
- Online project gallery with photos beyond what's provided
- Drone shot of the home office (you mentioned this as a possible future add — easy to swap into the hero later)
- Authentication, admin panel, or content editing UI
