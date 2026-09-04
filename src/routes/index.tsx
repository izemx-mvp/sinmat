import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
  { icon: ClipboardList, title: "1. Choisissez", text: "Parcourez plus de 1 200 références en achat ou en location." },
  { icon: CalendarCheck, title: "2. Réservez", text: "Sélectionnez vos dates de location ou validez votre commande." },
  { icon: Truck, title: "3. Livraison chantier", text: "Livraison sous 24 à 48h sur toutes les grandes villes." },
  { icon: ShieldCheck, title: "4. Suivi & retour", text: "Assistance technique, maintenance et reprise du matériel." },
];

const categoryIcons = { chantier: Building2, electroportatif: Wrench, jardinage: Leaf, epi: HardHat, industriel: Wrench };

const values = [
  { icon: BadgeCheck, title: "Matériel certifié", text: "Équipements contrôlés et conformes aux normes en vigueur." },
  { icon: Truck, title: "Livraison 24/48h", text: "Casablanca, Rabat, Marrakech, Tanger, Agadir et plus." },
  { icon: Wrench, title: "SAV & maintenance", text: "Techniciens dédiés et pièces détachées disponibles." },
  { icon: ShieldCheck, title: "Devis pro rapide", text: "Réponse en moins de 2h ouvrées pour les comptes pro." },
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

function Home() {
  const [subscribed, setSubscribed] = useState(false);
  const featured = products.filter((p) => p.featured);

  const submitNewsletter = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Chantier de construction au Maroc équipé par Sinmat SARL"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Vente & location · Maroc
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.05] text-steel-foreground sm:text-5xl lg:text-6xl">
            Le bon matériel, <span className="text-gradient-brand">sur votre chantier</span>, au bon moment
          </h1>
          <p className="mt-5 max-w-xl text-base text-steel-foreground/80 sm:text-lg">
            Matériel de chantier, outillage électroportatif, jardinage, EPI et outillage industriel. À l'achat ou à la
            location, livrés partout au Royaume.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary font-display text-base uppercase tracking-wide shadow-glow hover:bg-primary-light"
            >
              <Link to="/produits">Acheter du matériel</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-steel-foreground/60 bg-transparent font-display text-base uppercase tracking-wide text-steel-foreground hover:bg-steel-foreground/10 hover:text-steel-foreground"
            >
              <Link to="/location">Louer du matériel</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["1 200+", "références"],
              ["15 ans", "d'expérience"],
              ["24/48h", "livraison"],
              ["3 500+", "clients pro"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-bold text-primary">{v}</dt>
                <dd className="text-xs uppercase tracking-wide text-steel-foreground/70">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-3xl text-foreground">Comment ça marche</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Un parcours pensé pour les chefs de chantier : simple, rapide, sans paperasse inutile.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.title} className="rounded-lg border border-border bg-card p-6 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-accent">
                  <s.icon className="h-6 w-6 text-primary" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold uppercase text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="surface-grid bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <h2 className="section-title text-3xl text-foreground">Nos catégories</h2>
              <p className="mt-2 text-muted-foreground">Tout l'équipement du chantier sous un même toit.</p>
            </div>
            <Link
              to="/produits"
              className="hidden shrink-0 items-center gap-1 font-display text-sm font-semibold uppercase text-primary hover:underline sm:flex"
            >
              Voir le catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = categoryIcons[c.id];
              return (
                <Link
                  key={c.id}
                  to="/produits"
                  search={{ categorie: c.id }}
                  className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-steel text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold uppercase text-foreground">{c.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{c.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-3xl text-foreground">Matériel en vedette</h2>
          <p className="mt-2 text-muted-foreground">Les équipements les plus demandés par nos clients pro.</p>
          <Carousel opts={{ align: "start" }} className="mt-10">
            <CarouselContent>
              {featured.map((p) => (
                <CarouselItem key={p.id} className="sm:basis-1/2 lg:basis-1/4">
                  <ProductCard product={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      {/* MULTI-CHANTIER */}
      <section className="bg-steel py-16 text-steel-foreground lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">Espace Pro</p>
            <h2 className="mt-3 section-title text-3xl text-steel-foreground">
              Pilotez tous vos chantiers depuis une seule interface
            </h2>
            <p className="mt-4 text-steel-foreground/75">
              Commandes, locations en cours, dates de retour, budgets par chantier et facturation groupée : votre
              tableau de bord Sinmat centralise tout.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Suivi des commandes en temps réel",
                "Gestion multi-chantiers et affectation du matériel",
                "Historique complet et export comptable",
                "Facturation groupée mensuelle",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-steel-foreground/85">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 bg-primary font-display uppercase hover:bg-primary-light">
              <Link to="/espace-pro">Découvrir l'espace pro</Link>
            </Button>
          </div>
          <img
            src={dashboardImage}
            alt="Aperçu du tableau de bord multi-chantiers Sinmat"
            loading="lazy"
            width={1280}
            height={960}
            className="rounded-lg border border-steel-light/40 shadow-elevated"
          />
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-border p-6 text-center shadow-card">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent">
                  <v.icon className="h-7 w-7 text-primary" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold uppercase text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-3xl text-foreground">Ils travaillent avec Sinmat</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-card">
                <Quote className="h-8 w-8 text-primary/40" />
                <blockquote className="mt-4 flex-1 text-sm text-foreground/90">“{t.text}”</blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-steel font-display text-sm font-bold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
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

      {/* APP + NEWSLETTER */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg bg-steel p-8 text-steel-foreground shadow-elevated">
            <Smartphone className="h-10 w-10 text-primary" />
            <h2 className="mt-4 section-title text-2xl text-steel-foreground">L'appli Sinmat Chantier</h2>
            <p className="mt-2 text-sm text-steel-foreground/75">
              Commandez, prolongez une location et suivez vos livraisons directement depuis le chantier.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="bg-primary font-display uppercase hover:bg-primary-light">App Store</Button>
              <Button
                variant="outline"
                className="border-steel-foreground/40 bg-transparent font-display uppercase text-steel-foreground hover:bg-steel-foreground/10 hover:text-steel-foreground"
              >
                Google Play
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border p-8 shadow-card">
            {subscribed ? (
              <SuccessState
                title="Inscription confirmée"
                message="Merci ! Vous recevrez nos arrivages et offres location chaque mois."
              />
            ) : (
              <>
                <h2 className="section-title text-2xl text-foreground">Restez informé</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Promotions location, nouveaux arrivages et conseils chantier — un e-mail par mois, sans spam.
                </p>
                <form onSubmit={submitNewsletter} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Input type="email" required placeholder="votre@entreprise.ma" className="flex-1" />
                  <Button type="submit" className="bg-primary font-display uppercase hover:bg-primary-light">
                    S'inscrire
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
