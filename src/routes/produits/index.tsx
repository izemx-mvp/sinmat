import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type CategoryId, type Product } from "@/data/products";

const categoryIds = categories.map((c) => c.id) as [CategoryId, ...CategoryId[]];

const sortOptions = ["popularite", "prix-asc", "prix-desc", "nouveaute"] as const;
type SortOption = (typeof sortOptions)[number];

const searchSchema = z.object({
  categorie: z.enum(categoryIds).optional(),
  mode: z.enum(["achat", "location"]).optional(),
  prixMax: z.coerce.number().optional(),
  dispo: z.coerce.boolean().optional(),
  tri: z.enum(sortOptions).optional(),
  page: z.coerce.number().optional(),
});

export const Route = createFileRoute("/produits/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Catalogue — Sinmat SARL" },
      {
        name: "description",
        content:
          "Parcourez notre catalogue de matériel de chantier, outillage, jardinage et EPI à l'achat ou à la location.",
      },
    ],
  }),
  component: ProduitsPage,
});

const PRICE_MAX = 20000;
const PAGE_SIZE = 6;
const sortLabels: Record<SortOption, string> = {
  popularite: "Popularité",
  "prix-asc": "Prix croissant",
  "prix-desc": "Prix décroissant",
  nouveaute: "Nouveauté",
};

function sortProducts(list: Product[], tri: SortOption): Product[] {
  const sorted = [...list];
  switch (tri) {
    case "prix-asc":
      return sorted.sort((a, b) => a.buyPrice - b.buyPrice);
    case "prix-desc":
      return sorted.sort((a, b) => b.buyPrice - a.buyPrice);
    case "nouveaute":
      return sorted.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew) || b.popularity - a.popularity,
      );
    case "popularite":
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
}

type FiltersProps = {
  categorie: CategoryId | undefined;
  mode: "tous" | "achat" | "location";
  prixMax: number;
  dispo: boolean;
  hasActiveFilters: boolean;
  onCategorie: (v: CategoryId | undefined) => void;
  onMode: (v: "achat" | "location" | undefined) => void;
  onPrixMax: (v: number | undefined) => void;
  onDispo: (v: true | undefined) => void;
  onClear: () => void;
};

function FiltersContent({
  categorie, mode, prixMax, dispo, hasActiveFilters,
  onCategorie, onMode, onPrixMax, onDispo, onClear,
}: FiltersProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-foreground">
          <Filter className="h-4 w-4 text-primary" /> Filtres
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary"
          >
            <X className="h-3 w-3" /> Réinitialiser
          </button>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Catégorie</h3>
        <RadioGroup
          value={categorie ?? "toutes"}
          onValueChange={(v) => onCategorie(v === "toutes" ? undefined : (v as CategoryId))}
          className="mt-3"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="toutes" id="cat-toutes" />
            <Label htmlFor="cat-toutes" className="cursor-pointer font-normal text-foreground">Toutes</Label>
          </div>
          {categories.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <RadioGroupItem value={c.id} id={`cat-${c.id}`} />
              <Label htmlFor={`cat-${c.id}`} className="cursor-pointer font-normal text-foreground">{c.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-6 border-t border-dashed border-border pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Achat / Location</h3>
        <RadioGroup
          value={mode}
          onValueChange={(v) => onMode(v === "tous" ? undefined : (v as "achat" | "location"))}
          className="mt-3"
        >
          {[
            ["tous", "Tous les produits"],
            ["achat", "Achat"],
            ["location", "Location disponible"],
          ].map(([value, label]) => (
            <div key={value} className="flex items-center gap-2">
              <RadioGroupItem value={value} id={`mode-${value}`} />
              <Label htmlFor={`mode-${value}`} className="cursor-pointer font-normal text-foreground">{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-6 border-t border-dashed border-border pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Gamme de prix</h3>
        <p className="mt-2 font-display text-sm font-semibold text-primary">
          Jusqu'à {prixMax.toLocaleString("fr-MA")} MAD
        </p>
        <Slider
          className="mt-3"
          min={0}
          max={PRICE_MAX}
          step={500}
          value={[prixMax]}
          onValueChange={([v]) => onPrixMax(v === PRICE_MAX ? undefined : v)}
        />
      </div>

      <div className="mt-6 border-t border-dashed border-border pt-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="dispo"
            checked={dispo}
            onCheckedChange={(v) => onDispo(v === true ? true : undefined)}
          />
          <Label htmlFor="dispo" className="cursor-pointer font-normal text-foreground">Disponible immédiatement</Label>
        </div>
      </div>
    </>
  );
}

function ProduitsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categorie = search.categorie;
  const mode = search.mode ?? "tous";
  const prixMax = search.prixMax ?? PRICE_MAX;
  const dispo = search.dispo ?? false;
  const tri = search.tri ?? "popularite";
  const page = search.page ?? 1;

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (categorie && p.category !== categorie) return false;
      if (mode === "location" && p.rentDay === null) return false;
      if (p.buyPrice > prixMax) return false;
      if (dispo && !p.available) return false;
      return true;
    });
    return sortProducts(list, tri);
  }, [categorie, mode, prixMax, dispo, tri]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const setSearch = (partial: Partial<z.infer<typeof searchSchema>>) => {
    navigate({ search: (prev) => ({ ...prev, ...partial, page: undefined }) });
  };

  const hasActiveFilters = Boolean(categorie) || mode !== "tous" || prixMax < PRICE_MAX || dispo;

  const clearFilters = () => {
    navigate({ search: {} });
    setMobileFiltersOpen(false);
  };

  const activeChips: { label: string; onRemove: () => void }[] = [
    ...(categorie ? [{ label: categories.find((c) => c.id === categorie)?.name ?? categorie, onRemove: () => setSearch({ categorie: undefined }) }] : []),
    ...(mode !== "tous" ? [{ label: mode === "achat" ? "Achat" : "Location disponible", onRemove: () => setSearch({ mode: undefined }) }] : []),
    ...(prixMax < PRICE_MAX ? [{ label: `≤ ${prixMax.toLocaleString("fr-MA")} MAD`, onRemove: () => setSearch({ prixMax: undefined }) }] : []),
    ...(dispo ? [{ label: "Disponible", onRemove: () => setSearch({ dispo: undefined }) }] : []),
  ];

  const filtersProps: FiltersProps = {
    categorie, mode, prixMax, dispo, hasActiveFilters,
    onCategorie: (v) => setSearch({ categorie: v }),
    onMode: (v) => setSearch({ mode: v }),
    onPrixMax: (v) => setSearch({ prixMax: v }),
    onDispo: (v) => setSearch({ dispo: v }),
    onClear: clearFilters,
  };

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="bg-secondary py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Plan des rayons
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="section-title text-2xl text-foreground sm:text-3xl">Catalogue matériel</h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {filtered.length} référence{filtered.length > 1 ? "s" : ""} disponible
                {filtered.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-border bg-card lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter className="h-4 w-4 text-primary" /> Filtres
                {hasActiveFilters && (
                  <span className="ml-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {activeChips.length}
                  </span>
                )}
              </Button>
              <Select value={tri} onValueChange={(v) => setSearch({ tri: v as SortOption })}>
                <SelectTrigger className="w-full sm:w-56">
                  <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>{sortLabels[opt]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  onClick={chip.onRemove}
                  className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20"
                >
                  {chip.label} <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className="h-1.5 w-full"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #E8792B 0 12px, #3A3A3C 12px 24px)" }}
        role="presentation"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden h-fit rounded-lg border border-dashed border-border bg-card p-6 shadow-card lg:sticky lg:top-24 lg:block">
            <FiltersContent {...filtersProps} />
          </aside>

          {/* GRID */}
          <div>
            {paginated.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-border p-12 text-center sm:p-16">
                <p className="font-display text-lg font-bold uppercase text-foreground">Aucun résultat</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Essayez d'élargir vos filtres pour voir plus de matériel.
                </p>
                <Button
                  onClick={clearFilters}
                  className="mt-6 bg-primary font-display uppercase hover:bg-primary-light"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {pageCount > 1 && (
              <Pagination className="mt-10">
                <PaginationContent>
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setSearch({ page: p === 1 ? undefined : p });
                        }}
                        href="#"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-steel/70 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-card p-6 shadow-elevated">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="font-display text-sm font-bold uppercase text-foreground">Filtres</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-primary"
                aria-label="Fermer les filtres"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <FiltersContent {...filtersProps} />
            </div>
            <Button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full bg-primary font-display uppercase hover:bg-primary-light"
            >
              Voir {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}