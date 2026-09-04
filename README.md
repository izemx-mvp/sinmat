# Sinmat Maroc Connect

Build a full multi-page website (not a single-page scroller) for Sinmat SARL, a Moroccan company that sells AND rents construction equipment, power tools, garden equipment, safety gear (EPI), and industrial tools — targeting construction site managers ("chefs de chantier"), contractors, and B2B/B2C buyers across Morocco.

BRAND IDENTITY

- Logo: stylized building/skyscraper silhouette in a teardrop/shield shape, dark charcoal gray (#3A3A3C to #58585A gradient) flanking a bold orange vertical pillar (#E8792B to #F2994A gradient), wordmark "SINMAT" in orange + "SARL" in charcoal gray, bold industrial uppercase sans-serif

- Logo file will be uploaded separately — use a placeholder logo slot in navbar/footer, do NOT generate or recreate the logo

- Color palette: primary orange (#E8792B / #F2994A) as accent/CTA color, charcoal/steel gray (#3A3A3C, #58585A) as dark base, white/light gray (#F5F5F5) backgrounds

- Typography: bold condensed/geometric sans-serif headings (industrial feel), clean readable sans body text

- All non-logo imagery (product photos, icons, illustrations, avatars) must be AI-generated/placeholder — do not use real Sinmat assets

LANGUAGE: French, professional B2B tone, Morocco-oriented (chantiers, livraison, etc.)

SITE STRUCTURE — separate routed pages, shared Navbar + Footer on all pages

1. HOME (/)

- Hero with dual CTA: "Acheter du matériel" / "Louer du matériel"

- How it works (3-4 steps)

- Category grid (5 categories, links to filtered catalog)

- Featured products carousel (links to product detail pages)

- Multi-chantier management pitch section

- Trust/value props (4-icon grid)

- Testimonials (3 cards)

- App download CTA

- Newsletter signup

2. CATALOG / PRODUITS (/produits)

- Sidebar filters: catégorie, achat/location, gamme de prix, disponibilité

- Grid of product cards (image, name, category, price achat + price/jour location, badges)

- Sort dropdown (prix, popularité, nouveauté)

- Pagination

3. PRODUCT DETAIL (/produits/:id)

- Image gallery (generated placeholders, 3-4 images)

- Name, category, description, specs table (poids, puissance, dimensions, etc.)

- Pricing block: "Acheter" price + "Louer" price/jour/semaine, quantity selector

- Two CTAs: "Ajouter au panier" (orange) / "Réserver pour location" (outlined)

- Tabs: Description, Caractéristiques techniques, Avis clients

- Related products carousel

4. LOCATION / RENTAL (/location)

- Dedicated page explaining the rental service in depth

- How rental works (steps: choisir dates, réserver, livraison, retour)

- Rental catalog subset (equipment available for rent, with daily/weekly pricing)

- Rental terms/FAQ accordion (caution, durée min, assurance)

5. MULTI-CHANTIER / ESPACE PRO (/espace-pro)

- B2B dashboard pitch page for contractors managing multiple job sites

- Generated abstract dashboard mockup illustration

- Feature list: suivi commandes temps réel, gestion multi-chantiers, historique, facturation groupée

- CTA: "Créer un compte professionnel"

6. À PROPOS (/a-propos)

- Company story, mission, values

- Team section (generated placeholder avatars)

- Stats block (années d'expérience, clients servis, chantiers livrés)

- Map/coverage area (Morocco regions served)

7. CONTACT (/contact)

- Contact form (nom, email, téléphone, sujet, message)

- Company info: address, phone, email, hours

- Embedded map placeholder

- FAQ accordion

8. CART / PANIER (/panier)

- Cart summary table (mixed achat + location items, quantities, dates for rentals)

- Order summary sidebar with totals

- "Passer commande" CTA leading to static checkout confirmation (see FORM & CHECKOUT BEHAVIOR below)

NAVBAR (all pages)

- Logo placeholder, links: Accueil, Produits, Location, Espace Pro, À propos, Contact

- Search icon, cart icon with item count, "Se connecter" button

FOOTER (all pages)

- Logo placeholder, category links, company info, contact details, social links, newsletter signup

- Dark charcoal background, orange accent links/hovers

FORM & CHECKOUT BEHAVIOR (static, no backend)

- Every form on the site (contact form, newsletter signup, "créer un compte professionnel", devis request) should, on submit, show a static success confirmation — either an inline success message/banner ("Merci, votre message a été envoyé avec succès !") or a simple success state replacing the form, with a checkmark icon

- CART / CHECKOUT (/panier): "Passer commande" should lead to a simple static checkout flow — an order summary + a "Confirmer la commande" button that, when clicked, shows a static order confirmation screen (order number placeholder, "Merci pour votre commande !", summary of items, estimated delivery message) — no real payment gateway, no real validation, just a clean confirmation state

- All success states should match the brand style (orange accent, charcoal text, clean industrial look) and feel like a real finished flow, not an obvious placeholder

- No actual data persistence or backend calls needed — local component state is enough to simulate the full journey end to end

TECHNICAL

- React + TypeScript + Tailwind CSS + React Router for multi-page navigation

- Fully responsive, mobile-first

- Shared Navbar/Footer components, one component/page per route as listed above

- Placeholder/generated product data (8-10 items minimum) with achat + location pricing fields, reused across catalog, product detail, and rental pages

- Icon set: lucide-react, industrial/construction/safety themed

- No real backend/payment integration yet — cart and forms are stubbed with local state, this is a design/UX MVP for validation before backend work

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2a21ced6-41a9-4f63-853a-d1678c4d0200).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
