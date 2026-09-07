import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, ClipboardCheck, PackageCheck, Truck } from "lucide-react";
import heroImage from "@/assets/location-hero.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { categoryName, formatMAD, products } from "@/data/products";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location de matériel — Sinmat SARL" },
      {
        name: "description",
        content: "Louez du matériel de chantier au jour ou à la semaine, livré partout au Maroc.",
      },
    ],
  }),
  component: LocationPage,
});

const steps = [
  { icon: CalendarCheck, title: "Choisissez vos dates", text: "La période de location adaptée à votre chantier." },
  { icon: ClipboardCheck, title: "Réservez en ligne", text: "Un conseiller confirme sous 2h ouvrées." },
  { icon: Truck, title: "Livraison sur chantier", text: "Livré et installé sous 24 à 48h." },
  { icon: PackageCheck, title: "Retour simplifié", text: "Récupéré à la date convenue, sans frais cachés." },
];

const faqs = [
  {
    q: "Une caution est-elle demandée ?",
    a: "Oui, une caution est demandée à la réservation selon le type de matériel loué. Elle est restituée intégralement après contrôle du retour, sous réserve d'absence de dommages.",
  },
  {
    q: "Quelle est la durée minimum de location ?",
    a: "La durée minimum est d'une journée. Des tarifs dégressifs s'appliquent automatiquement à partir d'une semaine de location.",
  },
  {
    q: "Le matériel est-il assuré pendant la location ?",
    a: "Une assurance de base contre le vol et la casse accidentelle est incluse. Une extension d'assurance tous risques est disponible en option.",
  },
  {
    q: "Puis-je prolonger ma location en cours de chantier ?",
    a: "Oui, contactez votre conseiller ou utilisez l'application Sinmat Chantier pour prolonger votre location avant l'échéance, sous réserve de disponibilité.",
  },
];

const ticker = [
  "Bétonnières", "Échafaudages", "Groupes électrogènes", "Outillage électroportatif",
  "Compacteurs", "Nacelles", "Tarifs dégressifs", "Livraison chantier",
];

function LocationPage() {
  const rentable = products.filter((p) => p.rentDay !== null);

  return (
    <div>
      <style>{`
        @keyframes loc-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .loc-anim { opacity: 0; animation: loc-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .loc-anim-1 { animation-delay: 0.05s; } .loc-anim-2 { animation-delay: 0.15s; } .loc-anim-3 { animation-delay: 0.25s; }
        @keyframes loc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .loc-marquee-track { animation: loc-marquee 26s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .loc-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .loc-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* HERO — photo background, consistent with Home / À propos */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Matériel de chantier disponible en location chez Sinmat SARL"
          width={1920}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8 lg:py-28">
          <p className="loc-anim loc-anim-1 font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
            Location de matériel
          </p>
          <h1 className="loc-anim loc-anim-2 mt-3 max-w-2xl font-display text-3xl font-bold uppercase leading-[1.05] text-steel-foreground sm:text-5xl">
            Louez au jour ou à la semaine, <span className="text-gradient-brand">sans engagement</span>
          </h1>
          <p className="loc-anim loc-anim-3 mt-4 max-w-xl text-sm text-steel-foreground/80 sm:text-lg">
            Bétonnières, échafaudages, groupes électrogènes, outillage électroportatif : tout le matériel de
            chantier disponible en location, livré et repris sur site.
          </p>
          <Button
            asChild
            size="lg"
            className="loc-anim loc-anim-3 mt-8 bg-primary font-display uppercase shadow-glow hover:bg-primary-light"
          >
            <Link to="/produits" search={{ mode: "location" }}>
              Voir tout le matériel en location
            </Link>
          </Button>
        </div>

        {/* ticker strip */}
        <div className="relative z-10 overflow-hidden border-t border-steel-foreground/10 bg-steel-light/40 py-3">
          <div className="loc-marquee-track flex w-max gap-10 whitespace-nowrap">
            {[...ticker, ...ticker].map((item, i) => (
              <span key={i} className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-steel-foreground/60">
                <span className="h-1 w-1 rounded-full bg-primary" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div
        className="h-1.5 w-full"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8792B 0 12px, #3A3A3C 12px 24px)" }}
        role="presentation"
      />

      {/* HOW IT WORKS — numbered flow, matches Home */}
      <section className="bg-background py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-2xl text-foreground sm:text-3xl">Comment fonctionne la location</h2>
          <div className="relative mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon className="h-5 w-5 text-primary/60" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold uppercase text-foreground sm:text-lg">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section className="surface-grid bg-secondary py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-2xl text-foreground sm:text-3xl">Matériel disponible en location</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Tarifs journaliers et hebdomadaires, matériel révisé avant chaque départ.
          </p>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {rentable.map((p) => (
              <Link
                key={p.id}
                to="/produits/$id"
                params={{ id: p.id }}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
              >
                <span className="pointer-events-none absolute left-2 top-2 z-10 h-3 w-3 border-l-2 border-t-2 border-primary/70 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-3 w-3 border-b-2 border-r-2 border-primary/70 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={900}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!p.available && (
                    <Badge variant="destructive" className="absolute left-3 top-3">Sur commande</Badge>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {categoryName(p.category)}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold leading-tight text-foreground group-hover:text-primary">
                    {p.name}
                  </h3>
                  <div className="mt-auto grid grid-cols-2 gap-2 border-t border-dashed border-border pt-4 text-center">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Par jour</p>
                      <p className="font-display text-sm font-bold text-primary">{formatMAD(p.rentDay ?? 0)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Par semaine</p>
                      <p className="font-display text-sm font-bold text-primary">{formatMAD(p.rentWeek ?? 0)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Conditions de location
          </p>
          <h2 className="section-title mt-2 text-2xl text-foreground sm:text-3xl">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="mt-8 rounded-lg border border-dashed border-border px-4 sm:px-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-display text-sm font-semibold uppercase text-foreground sm:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground sm:text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}