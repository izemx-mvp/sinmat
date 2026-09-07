import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Beaker,
  HandHeart,
  KeyRound,
  MapPin,
  PaintBucket,
  Phone,
  ShieldCheck,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/about-hero.png";
import quoteImage from "@/assets/about-cta.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Sinmat SARL" },
      {
        name: "description",
        content:
          "Sinmat SARL, référence BTP, droguerie professionnelle et outillage de qualité à Tanger depuis plus de 5 ans.",
      },
    ],
  }),
  component: AProposPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Fiabilité",
    text: "Une sélection rigoureuse de fournisseurs reconnus, pour garantir fiabilité, durabilité et performance.",
  },
  {
    icon: HandHeart,
    title: "Proximité",
    text: "Un service réactif et personnalisé, avec des conseillers techniques à l'écoute de chaque projet.",
  },
  {
    icon: Target,
    title: "Exigence",
    text: "Une expertise pointue des matériaux, des normes de sécurité et des contraintes du chantier professionnel.",
  },
];

const domains = [
  { icon: Wrench, title: "Matériel de chantier", text: "Équipements pour tous vos projets BTP." },
  { icon: PaintBucket, title: "Peinture", text: "Gamme professionnelle et particuliers." },
  { icon: Zap, title: "Outillage électroportatif", text: "Marques reconnues, usage intensif." },
  { icon: KeyRound, title: "Quincaillerie", text: "Visserie, fixations, accessoires." },
  { icon: Beaker, title: "Droguerie industrielle", text: "Produits techniques et professionnels." },
];

const ticker = [
  "Matériel de chantier", "Peinture", "Visserie", "Outillage électroportatif",
  "Quincaillerie", "Droguerie industrielle", "Conseil technique", "Tanger",
];

/** Hazard-stripe divider — nods to construction-site barrier tape */
function HazardStripe() {
  return (
    <div
      className="h-2 w-full"
      style={{
        backgroundImage: "repeating-linear-gradient(135deg, #E8792B 0 14px, #3A3A3C 14px 28px)",
      }}
      role="presentation"
    />
  );
}

/** Blueprint-style corner marks — technical-drawing framing on a card */
function CornerMarks({ className = "" }: { className?: string }) {
  return (
    <>
      <span className={`pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-primary/70 transition-opacity ${className}`} />
      <span className={`pointer-events-none absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-primary/70 transition-opacity ${className}`} />
      <span className={`pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-primary/70 transition-opacity ${className}`} />
      <span className={`pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-primary/70 transition-opacity ${className}`} />
    </>
  );
}

function AProposPage() {
  return (
    <div>
      <style>{`
        @keyframes ap-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .ap-anim { opacity: 0; animation: ap-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .ap-anim-1 { animation-delay: 0.05s; } .ap-anim-2 { animation-delay: 0.15s; } .ap-anim-3 { animation-delay: 0.25s; }
        @keyframes ap-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ap-marquee-track { animation: ap-marquee 26s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ap-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .ap-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* HERO — photo background */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Rayon de matériel de chantier et droguerie Sinmat SARL à Tanger"
          width={1920}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 lg:px-8 lg:py-32">
          <p className="ap-anim ap-anim-1 font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
            Depuis plus de 5 ans
          </p>
          <h1 className="ap-anim ap-anim-2 mt-4 max-w-3xl font-display text-3xl font-bold uppercase leading-[1.05] text-steel-foreground sm:text-5xl lg:text-6xl">
            Une référence <span className="text-gradient-brand">BTP, droguerie & outillage</span> à Tanger
          </h1>
          <p className="ap-anim ap-anim-3 mt-6 max-w-xl text-sm text-steel-foreground/80 sm:text-lg">
            Animés par la passion du bâtiment et le souci d'excellence, nous accompagnons artisans, entreprises du
            bâtiment et particuliers dans tous leurs projets de construction et de rénovation.
          </p>
          <dl className="ap-anim ap-anim-3 mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["5+", "ans d'expertise"],
              ["5", "domaines couverts"],
              ["100%", "conseil personnalisé"],
            ].map(([v, l]) => (
              <div key={l} className="group relative rounded-md border border-steel-foreground/15 bg-steel/40 px-4 py-3 backdrop-blur">
                <CornerMarks className="opacity-0 group-hover:opacity-100" />
                <dt className="font-display text-2xl font-bold text-primary">{v}</dt>
                <dd className="text-[10px] uppercase tracking-wide text-steel-foreground/70">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ticker strip */}
        <div className="relative z-10 overflow-hidden border-t border-steel-foreground/10 bg-steel-light/40 py-3">
          <div className="ap-marquee-track flex w-max gap-10 whitespace-nowrap">
            {[...ticker, ...ticker].map((item, i) => (
              <span key={i} className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-steel-foreground/60">
                <span className="h-1 w-1 rounded-full bg-primary" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <HazardStripe />

      {/* MISSION / VALUES — spec-sheet layout, not cards */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">Cahier des charges</p>
              <h2 className="section-title mt-2 text-2xl text-foreground sm:text-3xl">Notre mission</h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Notre force réside dans une expertise pointue des matériaux de construction, des normes de sécurité
                et des contraintes propres aux chantiers professionnels. Implantés au cœur de Tanger, nous offrons
                un service de proximité, réactif et personnalisé, avec des conseillers techniques à votre écoute.
              </p>
            </div>
            <div className="divide-y divide-dashed divide-border rounded-lg border border-dashed border-border bg-card/60 px-6">
              {values.map((v, i) => (
                <div key={v.title} className="flex items-start gap-5 py-6 first:pt-6 last:pb-6">
                  <span className="font-display text-3xl font-bold leading-none text-primary/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md bg-accent text-primary">
                    <v.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase text-foreground">{v.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HazardStripe />

      {/* DOMAINS OF EXPERTISE — blueprint grid background, pegboard feel */}
      <section
        className="relative bg-background py-16 lg:py-24"
        style={{
          backgroundImage:
            "linear-gradient(rgba(58,58,60,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(58,58,60,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">Plan des rayons</p>
          <h2 className="section-title mt-2 text-2xl text-foreground sm:text-3xl">Nos domaines</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Tout ce qu'il faut pour construire, rénover et équiper — sous un même toit.
          </p>
          <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-4 sm:mt-10 lg:grid-cols-5">
            {domains.map((d, i) => (
              <div
                key={d.title}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-md border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated ${
                  i === 0 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <CornerMarks className="opacity-0 group-hover:opacity-100" />
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-dashed border-primary/40 text-primary">
                  <d.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold uppercase leading-tight text-foreground">{d.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED PULL-QUOTE — with inspection-stamp badge */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <img src={quoteImage} alt="" role="presentation" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-steel/85" />
        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          <div className="mx-auto mb-6 flex h-20 w-20 rotate-[-10deg] items-center justify-center rounded-full border-2 border-dashed border-primary/70 font-display text-[10px] font-bold uppercase leading-tight tracking-widest text-primary">
            Qualité<br />contrôlée
          </div>
          <p className="font-display text-2xl font-bold uppercase leading-snug text-steel-foreground sm:text-4xl">
            "Chaque produit proposé est issu d'une <span className="text-gradient-brand">sélection rigoureuse</span>{" "}
            de fournisseurs reconnus."
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-steel-foreground/60">Sinmat SARL — Tanger</p>
        </div>
      </section>

      <HazardStripe />

      {/* CONSEILLERS */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative flex flex-col items-start gap-6 rounded-lg bg-steel p-8 text-steel-foreground shadow-elevated sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-md bg-steel-foreground/10 text-primary">
                <Phone className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold uppercase sm:text-2xl">
                Des conseillers techniques à votre écoute
              </h2>
              <p className="mt-2 max-w-xl text-sm text-steel-foreground/70">
                Que ce soit en peinture, visserie, outillage électroportatif, quincaillerie ou droguerie
                industrielle, notre équipe vous oriente vers les solutions les plus adaptées à votre projet.
              </p>
            </div>
            <Button asChild size="lg" className="shrink-0 bg-primary font-display uppercase hover:bg-primary-light">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-lg bg-steel p-7 text-steel-foreground shadow-elevated">
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <span className="grid h-12 w-12 place-items-center rounded-md bg-steel-foreground/10 text-primary">
                <MapPin className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold uppercase sm:text-2xl">Où nous trouver</h2>
              <p className="mt-2 text-sm text-steel-foreground/70">
                Implantés au cœur de Tanger, pour un service de proximité, réactif et personnalisé.
              </p>
              <p className="mt-6 flex items-center gap-2 text-xs text-steel-foreground/60">
                <Award className="h-4 w-4 shrink-0 text-primary" />
                Une expertise locale du terrain marocain.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-border shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.747112038668!2d-5.858387424209985!3d35.732437472570865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b878418c1c6ed%3A0x54a7dddfc406ada0!2sSINMAT%20SARL!5e0!3m2!1sfr!2sma!4v1788769147559!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 320 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Localisation Sinmat SARL"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}