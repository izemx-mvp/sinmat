import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/products";

export function Footer() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer className="bg-steel text-steel-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-steel-foreground/70">
            Vente et location de matériel de chantier, outillage et EPI partout au Maroc. Votre partenaire équipement
            depuis 2009.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Réseau social Sinmat"
                className="grid h-9 w-9 place-items-center rounded-md bg-steel-light/40 text-steel-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="section-title text-sm text-primary">Catégories</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/produits"
                  search={{ categorie: c.id }}
                  className="text-steel-foreground/75 transition-colors hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="section-title text-sm text-primary">Société</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/a-propos", label: "À propos" },
              { to: "/location", label: "Service location" },
              { to: "/espace-pro", label: "Espace professionnel" },
              { to: "/contact", label: "Nous contacter" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-steel-foreground/75 transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-steel-foreground/75">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Zone Industrielle Sidi Maârouf, Casablanca
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" /> +212 5 22 00 00 00
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" /> contact@sinmat.ma
            </li>
          </ul>
        </div>

        <div>
          <h4 className="section-title text-sm text-primary">Newsletter</h4>
          <p className="mt-4 text-sm text-steel-foreground/70">
            Nouveaux arrivages, promos location et conseils chantier, une fois par mois.
          </p>
          {sent ? (
            <p className="mt-4 flex items-center gap-2 rounded-md bg-steel-light/40 px-3 py-3 text-sm text-steel-foreground">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              Merci, votre inscription est confirmée !
            </p>
          ) : (
            <form onSubmit={submit} className="mt-4 flex flex-col gap-2">
              <Input
                type="email"
                required
                placeholder="Votre e-mail professionnel"
                className="border-steel-light/50 bg-steel-light/25 text-steel-foreground placeholder:text-steel-foreground/50"
              />
              <Button type="submit" className="bg-primary font-display uppercase hover:bg-primary-light">
                S'inscrire
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-steel-light/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-steel-foreground/60 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Sinmat SARL. Tous droits réservés.</p>
          <p>RC Casablanca · ICE 000000000000000 · Livraison partout au Maroc</p>
        </div>
      </div>
    </footer>
  );
}
