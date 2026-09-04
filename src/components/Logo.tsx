import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Placeholder logo slot — the official Sinmat SARL logo file will be dropped in later.
 * Replace the <span> mark below with <img src={logo} /> once the asset is uploaded.
 */
export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)} aria-label="Sinmat SARL — Accueil">
      <span
        data-logo-slot="sinmat"
        className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-md bg-steel"
      >
        <span className="absolute inset-y-1 left-2 w-1.5 rounded-sm bg-steel-light" />
        <span className="absolute inset-y-0.5 left-1/2 w-2 -translate-x-1/2 rounded-sm bg-gradient-to-b from-primary to-primary-light" />
        <span className="absolute inset-y-1 right-2 w-1.5 rounded-sm bg-steel-light" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold uppercase tracking-wide text-primary">Sinmat</span>
        <span
          className={cn(
            "font-display text-[0.65rem] font-semibold uppercase tracking-[0.35em]",
            variant === "light" ? "text-steel-foreground/70" : "text-steel-light",
          )}
        >
          Sarl
        </span>
      </span>
    </Link>
  );
}
