import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, Quote, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/ProductCard";
import { categoryName, formatMAD, getProduct, products } from "@/data/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produits/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Sinmat SARL` },
          { name: "description", content: loaderData.shortDescription },
        ]
      : [],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const product = Route.useLoaderData();
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rentDays, setRentDays] = useState(3);
  const [added, setAdded] = useState<"achat" | "location" | null>(null);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = (mode: "achat" | "location") => {
    addItem(product.id, mode, quantity, mode === "location" ? rentDays : undefined);
    setAdded(mode);
    window.setTimeout(() => setAdded(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Accueil</Link>
        <span>/</span>
        <Link to="/produits" className="hover:text-primary">Produits</Link>
        <span>/</span>
        <span className="truncate text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* GALLERY */}
        <div>
          <div className="group relative aspect-square overflow-hidden rounded-lg border border-dashed border-border bg-secondary">
            <img
              src={product.gallery[activeImage] ?? product.image}
              alt={product.name}
              width={900}
              height={900}
              className="h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-primary/70 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-primary/70 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
            {product.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "aspect-square overflow-hidden rounded-md border-2 bg-secondary transition-colors",
                  i === activeImage ? "border-primary" : "border-transparent hover:border-border",
                )}
              >
                <img src={img} alt={`${product.name} vue ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{categoryName(product.category)}</Badge>
            {product.isNew && <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>}
            {!product.available && <Badge variant="destructive">Sur commande</Badge>}
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold uppercase text-foreground sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Marque {product.brand}</p>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-primary text-primary" : "text-border")}
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">
              {product.rating.toFixed(1)} ({product.reviews.length} avis)
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">{product.shortDescription}</p>

          <div className="mt-6 rounded-lg border border-border bg-card p-5 shadow-card sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Prix à l'achat</p>
                <p className="font-display text-2xl font-bold text-primary">{formatMAD(product.buyPrice)}</p>
              </div>
              {product.rentDay !== null && (
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Location</p>
                  <p className="font-display text-lg font-bold text-foreground">
                    {formatMAD(product.rentDay)} / jour
                  </p>
                  <p className="text-xs text-muted-foreground">ou {formatMAD(product.rentWeek ?? 0)} / semaine</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-dashed border-border pt-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Quantité</p>
                <div className="mt-1 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-8 text-center font-display font-semibold text-foreground">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {product.rentDay !== null && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Jours de location</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRentDays((d) => Math.max(1, d - 1))}
                      aria-label="Diminuer la durée"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-8 text-center font-display font-semibold text-foreground">{rentDays}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setRentDays((d) => d + 1)}
                      aria-label="Augmenter la durée"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                onClick={() => handleAdd("achat")}
                className="flex-1 bg-primary font-display uppercase tracking-wide transition-colors hover:bg-primary-light"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {added === "achat" ? "Ajouté au panier !" : "Ajouter au panier"}
              </Button>
              {product.rentDay !== null && (
                <Button
                  onClick={() => handleAdd("location")}
                  variant="outline"
                  className="flex-1 font-display uppercase tracking-wide transition-colors"
                >
                  {added === "location" ? "Réservé !" : "Réserver pour location"}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:gap-4">
            <div className="flex items-center gap-2 rounded-md border border-dashed border-border px-3 py-2">
              <Truck className="h-4 w-4 shrink-0 text-primary" /> Livraison 24/48h
            </div>
            <div className="flex items-center gap-2 rounded-md border border-dashed border-border px-3 py-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" /> Matériel certifié
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-14 h-1.5 w-full rounded-full sm:mt-16"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8792B 0 10px, #3A3A3C 10px 20px)" }}
        role="presentation"
      />

      {/* TABS */}
      <div className="mt-8">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specs">Caractéristiques</TabsTrigger>
            <TabsTrigger value="avis">Avis ({product.reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {product.description}
          </TabsContent>
          <TabsContent value="specs" className="mt-6">
            <dl className="grid max-w-2xl divide-y divide-dashed divide-border rounded-lg border border-dashed border-border">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-4 px-4 py-3">
                  <dt className="text-sm font-medium text-foreground">{s.label}</dt>
                  <dd className="text-sm text-muted-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>
          <TabsContent value="avis" className="mt-6">
            {product.reviews.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {product.reviews.map((r, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-card">
                    <Quote className="absolute -right-2 -top-2 h-14 w-14 text-primary/5" />
                    <div className="relative flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={cn("h-3.5 w-3.5", s < r.rating ? "fill-primary text-primary" : "text-border")}
                        />
                      ))}
                    </div>
                    <p className="relative mt-2 text-sm text-foreground/90">"{r.comment}"</p>
                    <p className="relative mt-3 font-display text-sm font-bold uppercase text-foreground">{r.author}</p>
                    <p className="relative text-xs text-muted-foreground">{r.role}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucun avis pour ce produit pour le moment.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="section-title text-xl text-foreground sm:text-2xl">Produits similaires</h2>
          <Carousel opts={{ align: "start" }} className="mt-8">
            <CarouselContent>
              {related.map((p) => (
                <CarouselItem key={p.id} className="basis-[80%] xs:basis-1/2 lg:basis-1/4">
                  <ProductCard product={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      )}
    </div>
  );
}