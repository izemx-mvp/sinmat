import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logo from "@/assets/sinmat-logo.png";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      to="/"
      className={cn("flex shrink-0 items-center", className)}
      aria-label="Sinmat SARL — Accueil"
    >
      <img
        src={logo}
        alt="Sinmat SARL"
        width={998}
        height={975}
        className={cn("w-auto object-contain", variant === "light" ? "h-16" : "h-12")}
      />
    </Link>
  );
}
