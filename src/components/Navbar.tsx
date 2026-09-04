import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/produits", label: "Produits" },
  { to: "/location", label: "Location" },
  { to: "/espace-pro", label: "Espace Pro" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
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
                className="font-display text-sm font-semibold uppercase tracking-wide text-steel transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Rechercher"
            onClick={() => setSearchOpen((v) => !v)}
            className="text-steel hover:text-primary"
          >
            <Search className="h-5 w-5" />
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
          <Button className="hidden bg-primary font-display uppercase tracking-wide hover:bg-primary-light sm:inline-flex">
            <UserRound className="mr-1 h-4 w-4" /> Se connecter
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-steel lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-secondary px-4 py-3 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input placeholder="Rechercher un matériel, une référence…" className="border-0 bg-background" />
          </div>
        </div>
      )}

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="block border-b border-border py-3 font-display text-sm font-semibold uppercase tracking-wide text-steel"
            >
              {l.label}
            </Link>
          ))}
          <Button className="mt-4 w-full bg-primary font-display uppercase hover:bg-primary-light">
            <UserRound className="mr-1 h-4 w-4" /> Se connecter
          </Button>
        </nav>
      )}
    </header>
  );
}
