import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { categoryName, formatMAD, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/produits/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>}
          {product.rentDay !== null && (
            <Badge className="bg-steel text-steel-foreground">Location dispo</Badge>
          )}
          {!product.available && <Badge variant="destructive">Sur commande</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {categoryName(product.category)}
        </p>
        <h3 className="mt-1 font-display text-base font-bold leading-tight text-foreground group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-auto pt-4">
          <p className="font-display text-lg font-bold text-primary">{formatMAD(product.buyPrice)}</p>
          <p className="text-xs text-muted-foreground">
            {product.rentDay !== null ? `ou ${formatMAD(product.rentDay)} / jour en location` : "Vente uniquement"}
          </p>
        </div>
      </div>
    </Link>
  );
}
