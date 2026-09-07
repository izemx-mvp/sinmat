import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Clock,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Truck,
  Wrench,
} from "lucide-react";
import heroImage from "@/assets/contact-hero.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SuccessState } from "@/components/SuccessState";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sinmat SARL" },
      {
        name: "description",
        content:
          "Contactez Sinmat SARL à Tanger pour toute question sur nos ventes, locations ou notre offre professionnelle.",
      },
    ],
  }),
  component: ContactPage,
});

// Quick-routing cards — sends people straight to the right place instead of
// funnelling every request (devis, location, SAV, pro account) through one generic form
const quickHelp = [
  {
    icon: FileText,
    title: "Devis chantier",
    text: "Décrivez votre besoin, réponse sous 2h ouvrées.",
    anchor: "#formulaire",
    subject: "devis",
  },
  {
    icon: Truck,
    title: "Question sur une location",
    text: "Disponibilité, dates, conditions de retour.",
    anchor: "#formulaire",
    subject: "location",
  },
  {
    icon: Wrench,
    title: "Service après-vente",
    text: "Maintenance, réparation, pièces détachées.",
    anchor: "#formulaire",
    subject: "sav",
  },
  {
    icon: Building2,
    title: "Compte professionnel",
    text: "Facturation groupée, suivi multi-chantiers.",
    to: "/espace-pro",
  },
];

const hours = [
  ["Lundi – Vendredi", "8h00 – 18h00"],
  ["Samedi", "8h30 – 13h00"],
  ["Dimanche", "Fermé"],
];

const faqs = [
  {
    q: "Quels sont vos délais de livraison ?",
    a: "Nous livrons sous 24 à 48h sur Tanger et sa région, et sous 48 à 72h dans le reste du Royaume.",
  },
  {
    q: "Comment obtenir un devis pour un chantier ?",
    a: "Utilisez le formulaire ci-dessous en sélectionnant le sujet « Devis chantier » : notre équipe commerciale vous répond en moins de 2h ouvrées.",
  },
  {
    q: "Proposez-vous un service après-vente ?",
    a: "Oui, nos techniciens interviennent sur site ou en atelier pour la maintenance et les réparations du matériel acheté ou loué.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Virement bancaire, chèque et espèces sont acceptés pour les particuliers comme pour les comptes professionnels, avec facturation groupée mensuelle pour ces derniers.",
  },
  {
    q: "Puis-je venir directement en magasin sans rendez-vous ?",
    a: "Oui, notre équipe vous accueille sans rendez-vous aux horaires d'ouverture. Pour un devis chantier complexe, un rendez-vous avec un conseiller technique est recommandé.",
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState("information");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Accueil et conseil client Sinmat SARL à Tanger"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-center px-4 py-16 sm:min-h-[440px] sm:py-20 lg:min-h-[560px] lg:px-8 lg:py-24">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">
            Contact
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-[1.05] text-steel-foreground sm:text-5xl">
            Parlons de votre <span className="text-gradient-brand">chantier</span>
          </h1>
          <p className="mt-4 max-w-md text-sm text-steel-foreground/80 sm:text-base">
            Réponse sous 2h ouvrées, du lundi au samedi.
          </p>
        </div>
      </section>

      <div
        className="h-1.5 w-full"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8792B 0 12px, #3A3A3C 12px 24px)" }}
        role="presentation"
      />

      {/* QUICK HELP — routes people to the right channel instead of one generic form */}
      <section className="bg-background py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-xl text-foreground sm:text-2xl">Comment pouvons-nous vous aider ?</h2>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickHelp.map((q) => {
              const card = (
                <div className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-accent text-primary">
                    <q.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-sm font-bold uppercase text-foreground group-hover:text-primary">
                    {q.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{q.text}</p>
                </div>
              );
              return q.to ? (
                <Link key={q.title} to={q.to}>{card}</Link>
              ) : (
                <a
                  key={q.title}
                  href={q.anchor}
                  onClick={() => q.subject && setSubject(q.subject)}
                >
                  {card}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="formulaire" className="bg-secondary py-14 sm:py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
          {/* FORM */}
          <div className="rounded-lg border border-dashed border-border bg-card p-6 shadow-card sm:p-8">
            {sent ? (
              <SuccessState
                title="Message envoyé"
                message="Merci de nous avoir contactés ! Notre équipe vous répond sous 2h ouvrées."
              />
            ) : (
              <>
                <h2 className="section-title text-xl text-foreground sm:text-2xl">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="nom">Nom complet</Label>
                      <Input id="nom" required placeholder="Votre nom" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input id="telephone" type="tel" required placeholder="+212 6 00 00 00 00" />
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" required placeholder="votre@entreprise.ma" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="sujet">Sujet</Label>
                    <Select required value={subject} onValueChange={setSubject}>
                      <SelectTrigger id="sujet">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="information">Demande d'information</SelectItem>
                        <SelectItem value="devis">Devis chantier</SelectItem>
                        <SelectItem value="location">Question sur une location</SelectItem>
                        <SelectItem value="sav">Service après-vente</SelectItem>
                        <SelectItem value="pro">Compte professionnel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" required rows={5} placeholder="Décrivez votre besoin…" />
                  </div>
                  <Button
                    type="submit"
                    className="mt-2 bg-primary font-display uppercase transition-colors hover:bg-primary-light"
                  >
                    Envoyer le message
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Réponse sous 2h ouvrées, du lundi au samedi.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <div className="rounded-lg border border-dashed border-border bg-card p-6 shadow-card">
              <h3 className="section-title text-lg text-foreground">Nos coordonnées</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Tanger, Maroc
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" /> +212 5 39 00 00 00
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-primary" /> contact@sinmat.ma
                </li>
              </ul>

              <div className="mt-5 border-t border-dashed border-border pt-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Horaires
                </p>
                <dl className="mt-2 space-y-1.5">
                  {hours.map(([day, hrs]) => (
                    <div key={day} className="flex items-center justify-between text-xs">
                      <dt className="text-muted-foreground">{day}</dt>
                      <dd className="font-medium text-foreground">{hrs}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.747112038668!2d-5.858387424209985!3d35.732437472570865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b878418c1c6ed%3A0x54a7dddfc406ada0!2sSINMAT%20SARL!5e0!3m2!1sfr!2sma!4v1788769147559!5m2!1sfr!2sma"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 200 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Localisation Sinmat SARL"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="surface-grid bg-background py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-accent">
              <MessageSquare className="h-6 w-6 text-primary" />
            </span>
            <h2 className="section-title text-xl text-foreground sm:text-2xl">Questions fréquentes</h2>
          </div>
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