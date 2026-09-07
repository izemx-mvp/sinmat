import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMAD, getProduct } from "@/data/products";
import { lineTotal, useCart, type CartItem } from "@/lib/cart";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [{ title: "Mon panier — Sinmat SARL" }],
  }),
  component: PanierPage,
});

const DELIVERY_ESTIMATE_DAYS = "24 à 48h";

function orderNumber() {
  return `SIN-${Math.floor(100000 + Math.random() * 900000)}`;
}

function PanierPage() {
  const cart = useCart();
  const [confirmation, setConfirmation] = useState<{
    number: string;
    items: CartItem[];
    total: number;
  } | null>(null);

  const enrichedItems = useMemo(
    () =>
      cart.items
        .map((item) => {
          const product = getProduct(item.productId);
          return product ? { item, product } : null;
        })
        .filter(
          (v): v is { item: CartItem; product: NonNullable<ReturnType<typeof getProduct>> } =>
            v !== null,
        ),
    [cart.items],
  );

  const handleCheckout = () => {
    setConfirmation({ number: orderNumber(), items: cart.items, total: cart.subtotal });
    cart.clear();
  };

  if (confirmation) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 sm:py-16 lg:px-8 lg:py-24">
        <div className="relative flex flex-col items-center overflow-hidden rounded-lg border border-dashed border-primary/30 bg-accent px-6 py-12 text-center">
          <div
            className="absolute inset-x-0 top-0 h-1.5"
            style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8792B 0 10px, #3A3A3C 10px 20px)" }}
            role="presentation"
          />
          <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary/15">
            <CheckCircle2 className="h-9 w-9 text-primary" />
          </span>
          <h1 className="section-title text-xl text-foreground sm:text-2xl">Merci pour votre commande !</h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Votre commande{" "}
            <span className="font-semibold text-foreground">#{confirmation.number}</span> a bien été
            enregistrée. Un conseiller Sinmat vous contactera pour confirmer les modalités de livraison.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-md border border-dashed border-border bg-background px-4 py-2 text-sm text-foreground shadow-card">
            <Truck className="h-4 w-4 text-primary" /> Livraison estimée sous {DELIVERY_ESTIMATE_DAYS}
          </div>
          <p className="mt-6 font-display text-lg font-bold text-primary">{formatMAD(confirmation.total)}</p>
          <p className="text-xs text-muted-foreground">
            {confirmation.items.reduce((n, i) => n + i.quantity, 0)} article(s) commandé(s)
          </p>
          <Button asChild className="mt-8 bg-primary font-display uppercase hover:bg-primary-light">
            <Link to="/produits">Continuer mes achats</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (enrichedItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:py-16 lg:px-8 lg:py-24">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent">
          <ShoppingBag className="h-8 w-8 text-primary" />
        </span>
        <h1 className="mt-4 section-title text-xl text-foreground sm:text-2xl">Votre panier est vide</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Parcourez notre catalogue pour ajouter du matériel à l'achat ou à la location.
        </p>
        <Button asChild className="mt-6 bg-primary font-display uppercase hover:bg-primary-light">
          <Link to="/produits">Voir le catalogue</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
      <h1 className="section-title text-2xl text-foreground sm:text-3xl">Mon panier</h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{cart.count} article(s) dans votre panier</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* DESKTOP TABLE */}
        <div className="hidden overflow-hidden rounded-lg border border-border bg-card shadow-card md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrichedItems.map(({ item, product }) => (
                <TableRow key={`${item.productId}-${item.mode}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-md object-cover"
                      />
                      <div className="min-w-0">
                        <Link
                          to="/produits/$id"
                          params={{ id: product.id }}
                          className="line-clamp-2 font-display text-sm font-bold uppercase text-foreground hover:text-primary"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {item.mode === "achat"
                            ? formatMAD(product.buyPrice)
                            : `${formatMAD(product.rentDay ?? 0)} / jour`}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.mode === "location" ? "secondary" : "outline"}>
                      {item.mode === "achat" ? "Achat" : "Location"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        aria-label="Diminuer la quantité"
                        onClick={() => cart.updateQuantity(item.productId, item.mode, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        aria-label="Augmenter la quantité"
                        onClick={() => cart.updateQuantity(item.productId, item.mode, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.mode === "location" ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          aria-label="Diminuer la durée"
                          onClick={() => cart.updateDays(item.productId, item.mode, (item.days ?? 1) - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-14 text-center text-sm text-muted-foreground">{item.days ?? 1} jour(s)</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          aria-label="Augmenter la durée"
                          onClick={() => cart.updateDays(item.productId, item.mode, (item.days ?? 1) + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-display font-bold text-primary">
                    {formatMAD(lineTotal(item, product))}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Retirer l'article"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => cart.removeItem(item.productId, item.mode)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE/TABLET CARDS */}
        <div className="grid gap-3 md:hidden">
          {enrichedItems.map(({ item, product }) => (
            <div
              key={`${item.productId}-${item.mode}-mobile`}
              className="rounded-lg border border-border bg-card p-4 shadow-card"
            >
              <div className="flex items-start gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to="/produits/$id"
                      params={{ id: product.id }}
                      className="line-clamp-2 font-display text-sm font-bold uppercase text-foreground hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Retirer l'article"
                      className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => cart.removeItem(item.productId, item.mode)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Badge variant={item.mode === "location" ? "secondary" : "outline"} className="mt-1">
                    {item.mode === "achat" ? "Achat" : "Location"}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border pt-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Qté</p>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    aria-label="Diminuer la quantité"
                    onClick={() => cart.updateQuantity(item.productId, item.mode, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-5 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    aria-label="Augmenter la quantité"
                    onClick={() => cart.updateQuantity(item.productId, item.mode, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {item.mode === "location" && (
                  <div className="flex items-center gap-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Jours</p>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      aria-label="Diminuer la durée"
                      onClick={() => cart.updateDays(item.productId, item.mode, (item.days ?? 1) - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center text-sm text-muted-foreground">{item.days ?? 1}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      aria-label="Augmenter la durée"
                      onClick={() => cart.updateDays(item.productId, item.mode, (item.days ?? 1) + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                <p className="ml-auto font-display text-sm font-bold text-primary">
                  {formatMAD(lineTotal(item, product))}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="h-fit rounded-lg border border-dashed border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="section-title text-lg text-foreground">Récapitulatif</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Sous-total</dt>
              <dd className="font-medium text-foreground">{formatMAD(cart.subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Livraison</dt>
              <dd className="font-medium text-foreground">Calculée à la confirmation</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-display text-sm font-bold uppercase text-foreground">Total</span>
            <span className="font-display text-xl font-bold text-primary">{formatMAD(cart.subtotal)}</span>
          </div>
          <Button
            onClick={handleCheckout}
            className="mt-6 w-full bg-primary font-display uppercase tracking-wide transition-colors hover:bg-primary-light"
          >
            Passer commande
          </Button>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-3.5 w-3.5 shrink-0 text-primary" /> Livraison estimée sous {DELIVERY_ESTIMATE_DAYS}
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Un conseiller Sinmat confirme les modalités avant expédition.
          </p>
        </div>
      </div>
    </div>
  );
}