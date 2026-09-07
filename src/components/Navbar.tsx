import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Home,
  Info,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/produits", label: "Produits", icon: Package },
  { to: "/location", label: "Location", icon: Truck },
  { to: "/espace-pro", label: "Espace Pro", icon: Building2 },
  { to: "/a-propos", label: "À propos", icon: Info },
  { to: "/contact", label: "Contact", icon: Phone },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <style>{`
        @keyframes nav-slide-down { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .nav-slide-down { animation: nav-slide-down 0.18s ease-out; }
        @media (prefers-reduced-motion: reduce) { .nav-slide-down { animation: none !important; } }
      `}</style>

      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Logo />
          <nav className="hidden min-w-0 items-center gap-6 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="group relative py-1 font-display text-sm font-semibold uppercase tracking-wide text-steel transition-colors hover:text-primary"
              >
                {l.label}
                <span className="absolute -bottom-[1px] left-0 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full [.text-primary_&]:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={searchOpen ? "Fermer la recherche" : "Rechercher"}
            onClick={() => setSearchOpen((v) => !v)}
            className="text-steel hover:text-primary"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative text-steel hover:text-primary">
            <Link to="/panier" aria-label="Panier">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild className="hidden bg-primary font-display uppercase tracking-wide hover:bg-primary-light sm:inline-flex">
            <Link to="/se-connecter">
              <UserRound className="mr-1 h-4 w-4" /> Se connecter
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-steel lg:hidden"
            aria-label={open ? "Fermer le menu" : "Menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="nav-slide-down border-t border-border bg-secondary px-4 py-3 lg:px-8"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Rechercher un matériel, une référence…"
              className="border-0 bg-background"
            />
          </div>
        </form>
      )}

      {open && (
        <nav className="nav-slide-down border-t border-border bg-background px-4 pb-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "border-l-primary text-primary" }}
              className="flex items-center gap-3 border-b border-border border-l-2 border-l-transparent py-3 pl-3 font-display text-sm font-semibold uppercase tracking-wide text-steel transition-colors"
            >
              <l.icon className="h-4 w-4 shrink-0 text-primary/70" />
              {l.label}
            </Link>
          ))}
          <Button asChild className="mt-4 w-full bg-primary font-display uppercase hover:bg-primary-light">
            <Link to="/se-connecter" onClick={() => setOpen(false)}>
              <UserRound className="mr-1 h-4 w-4" /> Se connecter
            </Link>
          </Button>
        </nav>
      )}

      <div
        className="h-1 w-full"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8792B 0 8px, #3A3A3C 8px 16px)" }}
        role="presentation"
      />
    </header>
  );
}