import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  ClipboardList,
  HardHat,
  Leaf,
  Quote,
  ShieldCheck,
  Smartphone,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import heroImage from "@/assets/hero-chantier.jpg";
import dashboardImage from "@/assets/dashboard-pro.jpg";
import catChantierImage from "@/assets/chantier.png";
import catElectroportatifImage from "@/assets/electroportatif.png";
import catJardinageImage from "@/assets/jardinage.png";
import catEpiImage from "@/assets/securite.png";
import catIndustrielImage from "@/assets/industriel.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { SuccessState } from "@/components/SuccessState";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sinmat SARL — Vente & location de matériel de chantier au Maroc" },
      {
        name: "description",
        content:
          "Achetez ou louez du matériel de chantier, outillage électroportatif, jardinage et EPI. Livraison rapide sur vos chantiers partout au Maroc.",
      },
      { property: "og:title", content: "Sinmat SARL — Vente & location de matériel de chantier" },
      {
        property: "og:description",
        content: "Matériel de chantier, outillage et EPI à l'achat ou à la location partout au Maroc.",
      },
    ],
  }),
  component: Home,
});

const steps = [
  { icon: ClipboardList, title: "Choisissez", text: "Plus de 1 200 références en achat ou en location." },
  { icon: CalendarCheck, title: "Réservez", text: "Vos dates de location ou votre commande, en 2 clics." },
  { icon: Truck, title: "Livraison chantier", text: "Sous 24 à 48h sur toutes les grandes villes." },
  { icon: ShieldCheck, title: "Suivi & retour", text: "Assistance, maintenance, reprise du matériel." },
];

const categoryIcons = { chantier: Building2, electroportatif: Wrench, jardinage: Leaf, epi: HardHat, industriel: Wrench };
const categoryImages: Record<string, string> = {
  chantier: catChantierImage,
  electroportatif: catElectroportatifImage,
  jardinage: catJardinageImage,
  epi: catEpiImage,
  industriel: catIndustrielImage,
};
const categoryModes: Record<string, "Achat" | "Location" | "Achat & Location"> = {
  chantier: "Achat & Location",
  electroportatif: "Achat & Location",
  jardinage: "Achat",
  epi: "Achat",
  industriel: "Location",
};

const values = [
  { icon: BadgeCheck, title: "Matériel certifié", text: "Contrôlé et conforme aux normes en vigueur." },
  { icon: Truck, title: "Livraison 24/48h", text: "Casablanca, Rabat, Marrakech, Tanger, Agadir…" },
  { icon: Wrench, title: "SAV & maintenance", text: "Techniciens dédiés, pièces disponibles." },
  { icon: ShieldCheck, title: "Devis pro rapide", text: "Réponse en moins de 2h ouvrées." },
];

const testimonials = [
  {
    name: "Youssef Benali",
    role: "Chef de chantier — Casablanca",
    text: "Sinmat nous livre en 24h sur trois chantiers simultanés. Le suivi des locations nous fait gagner un temps fou.",
  },
  {
    name: "Salma Idrissi",
    role: "Directrice travaux — Rabat",
    text: "Le matériel est fiable et bien entretenu. La facturation groupée simplifie vraiment notre comptabilité.",
  },
  {
    name: "Omar Chraibi",
    role: "Entrepreneur BTP — Marrakech",
    text: "Bon rapport qualité/prix et une équipe qui connaît le terrain. Nos EPI viennent tous de chez eux.",
  },
];

const marqueeItems = [
  "Matériel de chantier", "Outillage électroportatif", "Location à la journée",
  "EPI certifiés", "Livraison 24/48h", "Outillage industriel", "Facturation pro",
];

function Home() {
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState(false);
  const featured = products.filter((p) => p.featured);
  const spotlight = featured[0];
  const rest = featured.slice(1, 5);

  const submitNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!email) return setNewsletterError(true);
    setNewsletterError(false);
    setSubscribed(true);
  };

  return (
    <>
      <style>{`
        @keyframes sinmat-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .sinmat-marquee-track { animation: sinmat-marquee 28s linear infinite; }

        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-anim { opacity: 0; animation: hero-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .hero-anim-1 { animation-delay: 0.05s; }
        .hero-anim-2 { animation-delay: 0.18s; }
        .hero-anim-3 { animation-delay: 0.32s; }
        .hero-anim-4 { animation-delay: 0.46s; }

        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .hero-float { animation: hero-float 4.5s ease-in-out infinite; }
        .hero-float-delayed { animation: hero-float 4.5s ease-in-out infinite; animation-delay: 1.2s; }

        @keyframes hero-kenburns {
          from { transform: scale(1.08) translateX(0); }
          to { transform: scale(1.16) translateX(-1.5%); }
        }
        .hero-kenburns { animation: hero-kenburns 16s ease-in-out infinite alternate; }

        @keyframes hero-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(3%, -4%) scale(1.08); }
          66% { transform: translate(-2%, 3%) scale(0.95); }
        }
        .hero-blob-a { animation: hero-blob 12s ease-in-out infinite; }
        .hero-blob-b { animation: hero-blob 14s ease-in-out infinite reverse; }

        @media (prefers-reduced-motion: reduce) {
          .hero-anim, .hero-float, .hero-float-delayed, .hero-kenburns, .hero-blob-a, .hero-blob-b {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* HERO — animated: staggered reveal, drifting blobs, Ken Burns image, floating stat cards */}
      <section className="relative overflow-hidden bg-steel">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-primary/20 blur-[100px] hero-blob-a" />
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-primary/10 blur-[90px] hero-blob-b" />

        {/* text column — stays constrained to the normal container */}
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative z-10 flex flex-col justify-center py-16 sm:py-20 lg:min-h-[640px] lg:max-w-xl lg:py-28">
            <span className="hero-anim hero-anim-1 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Vente & location · Maroc
            </span>
            <h1 className="hero-anim hero-anim-2 mt-6 font-display text-4xl font-bold uppercase leading-[0.98] text-steel-foreground sm:text-6xl lg:text-7xl">
              Équipez
              <br />
              votre <span className="text-gradient-brand">chantier.</span>
            </h1>
            <p className="hero-anim hero-anim-3 mt-6 max-w-md text-sm text-steel-foreground/70 sm:text-base">
              Matériel de chantier, outillage électroportatif, jardinage, EPI et outillage industriel — à l'achat ou
              à la location, livrés partout au Royaume.
            </p>
            <div className="hero-anim hero-anim-4 mt-8 flex flex-col gap-3 xs:flex-row">
              <Button
                asChild
                size="lg"
                className="group bg-primary font-display text-base uppercase tracking-wide shadow-glow hover:bg-primary-light"
              >
                <Link to="/produits" className="flex items-center justify-center gap-2">
                  Acheter
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-steel-foreground/30 bg-transparent font-display text-base uppercase tracking-wide text-steel-foreground hover:bg-steel-foreground/10"
              >
                <Link to="/location">Louer</Link>
              </Button>
            </div>
          </div>

          {/* mobile/tablet image — stays in normal flow, full width */}
          <div className="relative mt-10 min-h-[280px] overflow-hidden rounded-lg lg:hidden">
            <img
              src={heroImage}
              alt="Chantier de construction au Maroc équipé par Sinmat SARL"
              width={1200}
              height={1400}
              className="hero-kenburns h-full w-full object-cover"
            />
            <div className="hero-float absolute left-2 top-4 rounded-lg border border-border bg-card/95 p-3 shadow-elevated backdrop-blur">
              <p className="font-display text-xl font-bold text-primary">1 200+</p>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">références</p>
            </div>
            <div className="hero-float-delayed absolute bottom-4 right-2 rounded-lg border border-border bg-card/95 p-3 shadow-elevated backdrop-blur">
              <p className="font-display text-xl font-bold text-primary">24/48h</p>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">livraison chantier</p>
            </div>
          </div>
        </div>

        {/* desktop image — breaks out of the container, sits flush against the true right edge */}
        <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
          <div className="h-full w-full [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
            <img
              src={heroImage}
              alt="Chantier de construction au Maroc équipé par Sinmat SARL"
              width={1200}
              height={1400}
              className="hero-kenburns h-full w-full object-cover"
            />
          </div>
          {/* floating stat cards */}
          <div className="hero-float absolute left-8 top-8 rounded-lg border border-border bg-card/95 p-4 shadow-elevated backdrop-blur">
            <p className="font-display text-2xl font-bold text-primary">1 200+</p>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">références</p>
          </div>
          <div className="hero-float-delayed absolute bottom-8 right-8 rounded-lg border border-border bg-card/95 p-4 shadow-elevated backdrop-blur">
            <p className="font-display text-2xl font-bold text-primary">24/48h</p>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">livraison chantier</p>
          </div>
        </div>

        {/* marquee strip */}
        <div className="relative z-10 overflow-hidden border-t border-steel-foreground/10 bg-steel-light/40 py-3">
          <div className="sinmat-marquee-track flex w-max gap-10 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-steel-foreground/60">
                <span className="h-1 w-1 rounded-full bg-primary" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — numbered horizontal flow */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-2xl text-foreground sm:text-3xl">De la commande au chantier</h2>
          <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon className="h-5 w-5 text-primary/60" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold uppercase text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES — bento grid */}
      <section className="surface-grid bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="section-title text-2xl text-foreground sm:text-3xl">Nos catégories</h2>
            <Link to="/produits" className="flex items-center gap-1 font-display text-sm font-semibold uppercase text-primary hover:underline">
              Catalogue complet <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-4 sm:mt-10 lg:grid-cols-4">
            {categories.map((c, i) => {
              const Icon = categoryIcons[c.id];
              const mode = categoryModes[c.id] ?? "Achat & Location";
              const big = i === 0;
              return (
                <Link
                  key={c.id}
                  to="/produits"
                  search={{ categorie: c.id }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-xl text-steel-foreground transition-all hover:-translate-y-1 hover:shadow-elevated ${
                    big ? "col-span-2 row-span-2" : "col-span-2 sm:col-span-1"
                  }`}
                >
                  <img
                    src={categoryImages[c.id]}
                    alt=""
                    role="presentation"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="relative flex h-full flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-md bg-steel-foreground/15 text-primary backdrop-blur-sm">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-steel-foreground/20 bg-steel/40 px-2 py-0.5 text-[10px] font-display font-bold uppercase tracking-wide text-steel-foreground/90 backdrop-blur-sm">
                        {mode}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-lg font-bold uppercase leading-tight">{c.name}</p>
                      {big && <p className="mt-1 text-sm text-steel-foreground/70">{c.description}</p>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED — editorial spotlight */}
      {spotlight && (
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="section-title text-2xl text-foreground sm:text-3xl">Matériel en vedette</h2>
            <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-[1.3fr_1fr_1fr] lg:grid-rows-2">
              <div className="lg:row-span-2">
                <ProductCard product={spotlight} />
              </div>
              {rest.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MULTI-CHANTIER — dark split with floating glass card */}
      <section className="relative overflow-hidden bg-steel py-16 text-steel-foreground lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative">
            <img
              src={dashboardImage}
              alt="Aperçu du tableau de bord multi-chantiers Sinmat"
              loading="lazy"
              width={1280}
              height={960}
              className="rounded-xl border border-steel-foreground/10 shadow-elevated"
            />
            <div className="absolute -bottom-6 -right-4 hidden w-52 rounded-lg border border-border bg-card p-4 text-foreground shadow-elevated sm:block">
              <p className="font-display text-xs font-bold uppercase text-primary">Facturation groupée</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Un seul récap mensuel pour tous vos chantiers.</p>
            </div>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">Espace Pro</p>
            <h2 className="mt-3 section-title text-2xl text-steel-foreground sm:text-3xl">
              Pilotez tous vos chantiers, un seul écran
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "Suivi des commandes en temps réel",
                "Gestion multi-chantiers et affectation du matériel",
                "Historique complet et export comptable",
                "Facturation groupée mensuelle",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-steel-foreground/85">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {t}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 bg-primary font-display uppercase hover:bg-primary-light">
              <Link to="/espace-pro">Découvrir l'espace pro</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* VALUES — diagonal ticker strip */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="group bg-card p-6 transition-colors hover:bg-accent">
                <v.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 font-display text-base font-bold uppercase text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — horizontal scroll-snap */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-2xl text-foreground sm:text-3xl">Ils travaillent avec Sinmat</h2>
          <div className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:mt-10 md:grid md:grid-cols-3 md:overflow-visible">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="relative flex w-[80vw] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card sm:w-auto"
              >
                <Quote className="absolute -right-2 -top-2 h-20 w-20 text-primary/5" />
                <blockquote className="relative flex-1 text-sm text-foreground/90">"{t.text}"</blockquote>
                <div className="relative mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-steel font-display text-sm font-bold text-primary">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <figcaption className="min-w-0">
                    <p className="truncate font-display text-sm font-bold uppercase text-foreground">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                  </figcaption>
                  <span className="ml-auto flex shrink-0 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </span>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* APP + NEWSLETTER — bold CTA banner */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-steel via-steel to-primary/20 p-1 sm:gap-8 lg:grid-cols-2">
            <div className="rounded-xl p-7 text-steel-foreground sm:p-9">
              <Smartphone className="h-9 w-9 text-primary" />
              <h2 className="mt-4 font-display text-xl font-bold uppercase sm:text-2xl">L'appli Sinmat Chantier</h2>
              <p className="mt-2 text-sm text-steel-foreground/70">
                Commandez, prolongez une location et suivez vos livraisons depuis le chantier.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-primary font-display uppercase hover:bg-primary-light">App Store</Button>
                <Button variant="outline" className="border-steel-foreground/30 bg-transparent font-display uppercase text-steel-foreground hover:bg-steel-foreground/10">
                  Google Play
                </Button>
              </div>
            </div>

            <div className="rounded-xl bg-card p-7 sm:p-9">
              {subscribed ? (
                <SuccessState title="Inscription confirmée" message="Merci ! Vous recevrez nos arrivages et offres location chaque mois." />
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold uppercase text-foreground sm:text-2xl">Restez informé</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Un e-mail par mois, sans spam.</p>
                  <form onSubmit={submitNewsletter} className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Input type="email" name="email" required placeholder="votre@entreprise.ma" aria-invalid={newsletterError} className="flex-1" />
                    <Button type="submit" className="bg-primary font-display uppercase hover:bg-primary-light">S'inscrire</Button>
                  </form>
                  {newsletterError && <p className="mt-2 text-xs text-destructive">Adresse e-mail requise.</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}