import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, CheckCircle2, Lock, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/se-connecter")({
  head: () => ({
    meta: [
      { title: "Se connecter — Sinmat SARL" },
      {
        name: "description",
        content: "Connectez-vous à votre compte Sinmat ou créez-en un pour suivre vos commandes et locations.",
      },
    ],
  }),
  component: ConnexionPage,
});

function ConnexionPage() {
  const [done, setDone] = useState<"login" | "signup" | null>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setDone("login");
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setDone("signup");
  };

  if (done) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </span>
        <h1 className="mt-4 section-title text-xl text-foreground sm:text-2xl">
          {done === "login" ? "Connexion réussie" : "Compte créé"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {done === "login"
            ? "Bienvenue ! Vous êtes maintenant connecté à votre compte Sinmat."
            : "Bienvenue chez Sinmat ! Votre compte a bien été créé."}
        </p>
        <Button asChild className="mt-8 bg-primary font-display uppercase hover:bg-primary-light">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-14 sm:py-20">
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent">
          <UserRound className="h-6 w-6 text-primary" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold uppercase text-foreground sm:text-3xl">Mon compte</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Suivez vos commandes, vos locations en cours et vos favoris.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-border bg-card p-6 shadow-card sm:p-8">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Se connecter</TabsTrigger>
            <TabsTrigger value="signup">Créer un compte</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="login-email">E-mail</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="login-email" type="email" required placeholder="votre@email.ma" className="pl-9" />
                </div>
              </div>
              <div className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Mot de passe</Label>
                  <a href="#" className="text-xs font-medium text-primary hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="login-password" type="password" required placeholder="••••••••" className="pl-9" />
                </div>
              </div>
              <Button
                type="submit"
                className="mt-2 bg-primary font-display uppercase transition-colors hover:bg-primary-light"
              >
                Se connecter
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <form onSubmit={handleSignup} className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="signup-name">Nom complet</Label>
                <Input id="signup-name" required placeholder="Votre nom" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="signup-email">E-mail</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="signup-email" type="email" required placeholder="votre@email.ma" className="pl-9" />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="signup-password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="signup-password" type="password" required placeholder="••••••••" className="pl-9" />
                </div>
              </div>
              <Button
                type="submit"
                className="mt-2 bg-primary font-display uppercase transition-colors hover:bg-primary-light"
              >
                Créer mon compte
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg border border-dashed border-border bg-secondary px-4 py-3 text-sm text-muted-foreground">
        <Building2 className="h-4 w-4 shrink-0 text-primary" />
        <span>
          Vous gérez plusieurs chantiers ?{" "}
          <Link to="/espace-pro" className="font-medium text-primary hover:underline">
            Créez un compte professionnel
          </Link>
        </span>
      </div>
    </div>
  );
}