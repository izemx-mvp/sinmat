import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  Check,
  ClipboardCheck,
  History,
  Receipt,
  UserCheck,
  X,
} from "lucide-react";
import dashboardImage from "@/assets/dashboard-pro.jpg";
import suiviCommandesImage from "@/assets/Suivi-commandes.png";
import multiChantiersImage from "@/assets/multi-chantiers.png";
import historiqueImage from "@/assets/Historique.png";
import facturationImage from "@/assets/Facturation.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuccessState } from "@/components/SuccessState";

export const Route = createFileRoute("/espace-pro")({
  head: () => ({
    meta: [
      { title: "Espace Pro — Sinmat SARL" },
      {
        name: "description",
        content:
          "Créez votre compte professionnel Sinmat et pilotez vos commandes multi-chantiers depuis un seul espace.",
      },
    ],
  }),
  component: EspaceProPage,
});

const features = [
  {
    icon: BarChart3,
    title: "Suivi commandes temps réel",
    text: "Visualisez l'état de chaque commande, livraison et retour depuis un tableau de bord unique.",
    image: suiviCommandesImage,
  },
  {
    icon: Building2,
    title: "Gestion multi-chantiers",
    text: "Affectez le matériel par chantier et suivez les budgets de chaque site en un coup d'œil.",
    image: multiChantiersImage,
  },
  {
    icon: History,
    title: "Historique complet",
    text: "Retrouvez tout l'historique de vos achats et locations, exportable pour votre comptabilité.",
    image: historiqueImage,
  },
  {
    icon: Receipt,
    title: "Facturation groupée",
    text: "Une facture mensuelle unique pour l'ensemble de vos chantiers, sans paperasse dispersée.",
    image: facturationImage,
  },
];

const withoutPro = [
  "Commandes passées séparément par chantier, par téléphone ou en agence",
  "Factures dispersées, à rassembler manuellement chaque mois",
  "Aucune vue d'ensemble sur les locations en cours",
];

const withPro = [
  "Toutes les commandes centralisées dans un seul tableau de bord",
  "Une facture mensuelle unique pour tous vos chantiers",
  "Suivi en temps réel de chaque location et de sa date de retour",
];

const activation = [
  { icon: ClipboardCheck, title: "Créez votre compte", text: "Renseignez les informations de votre entreprise ci-dessous." },
  { icon: UserCheck, title: "Un conseiller confirme", text: "Validation de votre compte pro sous 2h ouvrées." },
  { icon: Building2, title: "Commandez sur tous vos chantiers", text: "Accès immédiat au suivi multi-chantiers et à la facturation groupée." },
];

const included = [
  "Accès illimité au tableau de bord",
  "Facturation mensuelle groupée",
  "Conseiller technique dédié",
  "Sans engagement, résiliable à tout moment",
];

function EspaceProPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <style>{`
        @keyframes ep-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .ep-anim { opacity: 0; animation: ep-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .ep-anim-1 { animation-delay: 0.05s; } .ep-anim-2 { animation-delay: 0.15s; } .ep-anim-3 { animation-delay: 0.25s; }
        @keyframes ep-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ep-marquee-track { animation: ep-marquee 24s linear infinite; }
        @keyframes ep-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .ep-float { animation: ep-float 4.5s ease-in-out infinite; }
        .ep-float-delayed { animation: ep-float 4.5s ease-in-out infinite; animation-delay: 1.1s; }
        @media (prefers-reduced-motion: reduce) {
          .ep-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .ep-marquee-track, .ep-float, .ep-float-delayed { animation: none !important; }
        }
      `}</style>

      {/* HERO — dashboard image breaks out to the hard right, floating stat chips */}
      <section className="relative overflow-hidden bg-steel text-steel-foreground">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative z-10 max-w-xl py-14 sm:py-16 lg:min-h-[560px] lg:py-24">
            <p className="ep-anim ep-anim-1 font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
              Espace Pro
            </p>
            <h1 className="ep-anim ep-anim-2 mt-3 font-display text-3xl font-bold uppercase leading-[1.05] text-steel-foreground sm:text-5xl">
              Pilotez tous vos chantiers <span className="text-gradient-brand">depuis un seul écran</span>
            </h1>
            <p className="ep-anim ep-anim-3 mt-4 max-w-md text-sm text-steel-foreground/75 sm:text-base">
              Sinmat Pro centralise vos commandes, vos locations en cours et votre facturation pour toutes vos
              équipes, sur tous vos chantiers, partout au Maroc.
            </p>
            <Button
              asChild
              size="lg"
              className="ep-anim ep-anim-3 mt-8 bg-primary font-display uppercase shadow-glow hover:bg-primary-light"
            >
              <a href="#creer-compte">Créer un compte professionnel</a>
            </Button>
          </div>

          {/* mobile/tablet image */}
          <div className="relative mb-10 lg:hidden">
            <img
              src={dashboardImage}
              alt="Aperçu du tableau de bord multi-chantiers Sinmat Pro"
              className="w-full rounded-lg border border-steel-light/40 shadow-elevated"
            />
          </div>
        </div>

        {/* desktop hard-right image */}
        <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
          <img
            src={dashboardImage}
            alt="Aperçu du tableau de bord multi-chantiers Sinmat Pro"
            className="h-full w-full object-cover [clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
          />
          <div className="ep-float absolute left-10 top-10 rounded-lg border border-border bg-card/95 p-3 shadow-elevated backdrop-blur">
            <p className="font-display text-lg font-bold text-primary">1 tableau</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">tous vos chantiers</p>
          </div>
          <div className="ep-float-delayed absolute bottom-10 right-10 rounded-lg border border-border bg-card/95 p-3 shadow-elevated backdrop-blur">
            <p className="font-display text-lg font-bold text-primary">1 facture</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">par mois</p>
          </div>
        </div>

        {/* ticker */}
        <div className="relative z-10 overflow-hidden border-t border-steel-foreground/10 bg-steel-light/40 py-3">
          <div className="ep-marquee-track flex w-max gap-10 whitespace-nowrap">
            {[...features.map((f) => f.title), ...features.map((f) => f.title)].map((t, i) => (
              <span key={i} className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-steel-foreground/60">
                <span className="h-1 w-1 rounded-full bg-primary" /> {t}
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

      {/* FEATURES — bento */}
      <section className="bg-background py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-2xl text-foreground sm:text-3xl">Tout ce dont votre entreprise a besoin</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Conçu pour les chefs de chantier, directeurs travaux et responsables d'achats.
          </p>
          <div className="mt-8 grid auto-rows-[170px] grid-cols-2 gap-4 sm:mt-10 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-xl text-steel-foreground shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated ${
                  i === 0 ? "col-span-2 row-span-1 sm:row-span-2" : "col-span-2 sm:col-span-1"
                }`}
              >
                <img
                  src={f.image}
                  alt=""
                  role="presentation"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-all group-hover:bg-primary/35" />
                <div className="relative flex h-full flex-col justify-between p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-steel-foreground/15 text-primary backdrop-blur-sm">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold uppercase leading-tight sm:text-base">{f.title}</p>
                    {i === 0 && <p className="mt-1 text-xs text-steel-foreground/70 sm:text-sm">{f.text}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT / APRÈS */}
      <section className="surface-grid bg-secondary py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-2xl text-foreground sm:text-3xl">Sans compte pro vs avec Sinmat Pro</h2>
          <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-2">
            <div className="rounded-xl border border-dashed border-border bg-card p-6 sm:p-7">
              <p className="font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Sans compte pro
              </p>
              <ul className="mt-4 space-y-3">
                {withoutPro.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-steel p-6 text-steel-foreground shadow-elevated sm:p-7">
              <p className="font-display text-xs font-bold uppercase tracking-wide text-primary">Avec Sinmat Pro</p>
              <ul className="mt-4 space-y-3">
                {withPro.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-steel-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVATION FLOW */}
      <section className="bg-background py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-2xl text-foreground sm:text-3xl">Activer votre espace pro</h2>
          <div className="relative mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3">
            <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent sm:block" />
            {activation.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground shadow-glow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <s.icon className="h-5 w-5 text-primary/60" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold uppercase text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNUP — form + included checklist */}
      <section id="creer-compte" className="surface-grid bg-secondary py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
            <div className="rounded-xl bg-steel p-6 text-steel-foreground shadow-elevated sm:p-7">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">Inclus</p>
              <h3 className="mt-2 font-display text-lg font-bold uppercase sm:text-xl">Dans votre espace pro</h3>
              <ul className="mt-5 space-y-3">
                {included.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-steel-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-dashed border-border bg-card p-6 shadow-elevated sm:p-8">
              {submitted ? (
                <SuccessState
                  title="Demande envoyée"
                  message="Merci ! Un conseiller Sinmat Pro vous contacte sous 2h ouvrées pour finaliser la création de votre compte professionnel."
                />
              ) : (
                <>
                  <h2 className="section-title text-xl text-foreground sm:text-2xl">Créer un compte professionnel</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Renseignez vos informations, notre équipe commerciale vous recontacte rapidement.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-1.5">
                        <Label htmlFor="societe">Raison sociale</Label>
                        <Input id="societe" required placeholder="Nom de l'entreprise" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="ice">ICE</Label>
                        <Input id="ice" required placeholder="000000000000000" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-1.5">
                        <Label htmlFor="contact">Nom du contact</Label>
                        <Input id="contact" required placeholder="Prénom et nom" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="telephone-pro">Téléphone</Label>
                        <Input id="telephone-pro" type="tel" required placeholder="+212 6 00 00 00 00" />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="email-pro">E-mail professionnel</Label>
                      <Input id="email-pro" type="email" required placeholder="contact@entreprise.ma" />
                    </div>
                    <Button
                      type="submit"
                      className="mt-2 bg-primary font-display uppercase transition-colors hover:bg-primary-light"
                    >
                      Créer un compte professionnel
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Réponse sous 2h ouvrées, sans engagement.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}