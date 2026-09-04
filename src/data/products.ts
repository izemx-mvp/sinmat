import betonniere from "@/assets/p-betonniere.jpg";
import marteau from "@/assets/p-marteau.jpg";
import echafaudage from "@/assets/p-echafaudage.jpg";
import groupe from "@/assets/p-groupe.jpg";
import perceuse from "@/assets/p-perceuse.jpg";
import tondeuse from "@/assets/p-tondeuse.jpg";
import epi from "@/assets/p-epi.jpg";
import compresseur from "@/assets/p-compresseur.jpg";
import nettoyeur from "@/assets/p-nettoyeur.jpg";
import meuleuse from "@/assets/p-meuleuse.jpg";

export type CategoryId =
  | "chantier"
  | "electroportatif"
  | "jardinage"
  | "epi"
  | "industriel";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "chantier",
    name: "Matériel de chantier",
    description: "Bétonnières, échafaudages, groupes électrogènes et engins de chantier.",
  },
  {
    id: "electroportatif",
    name: "Outillage électroportatif",
    description: "Perceuses, meuleuses, marteaux-piqueurs et accessoires.",
  },
  {
    id: "jardinage",
    name: "Matériel de jardinage",
    description: "Tondeuses, débroussailleuses et entretien d'espaces verts.",
  },
  { id: "epi", name: "EPI & Sécurité", description: "Casques, gants, harnais et protection du personnel." },
  {
    id: "industriel",
    name: "Outillage industriel",
    description: "Compresseurs, nettoyeurs haute pression et équipements d'atelier.",
  },
];

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  brand: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  buyPrice: number;
  rentDay: number | null;
  rentWeek: number | null;
  available: boolean;
  featured: boolean;
  isNew: boolean;
  popularity: number;
  rating: number;
  specs: { label: string; value: string }[];
  reviews: { author: string; role: string; rating: number; comment: string }[];
}

const rev = (author: string, role: string, rating: number, comment: string) => ({
  author,
  role,
  rating,
  comment,
});

export const products: Product[] = [
  {
    id: "betonniere-350l",
    name: "Bétonnière professionnelle 350L",
    category: "chantier",
    brand: "Sinmat Pro",
    image: betonniere,
    gallery: [betonniere, echafaudage, groupe, compresseur],
    shortDescription: "Cuve 350 litres, moteur robuste, idéale pour gros œuvre.",
    description:
      "Conçue pour les chantiers exigeants, cette bétonnière 350L offre un malaxage homogène et rapide. Châssis renforcé galvanisé, roues de transport tout-terrain et moteur protégé contre la poussière : elle supporte une utilisation intensive sous le climat marocain.",
    buyPrice: 14900,
    rentDay: 320,
    rentWeek: 1750,
    available: true,
    featured: true,
    isNew: false,
    popularity: 98,
    rating: 4.8,
    specs: [
      { label: "Capacité de cuve", value: "350 L" },
      { label: "Puissance moteur", value: "2,2 kW / 230 V" },
      { label: "Poids", value: "185 kg" },
      { label: "Dimensions", value: "165 x 90 x 145 cm" },
      { label: "Rendement", value: "≈ 4 m³ / heure" },
    ],
    reviews: [
      rev("Youssef B.", "Chef de chantier, Casablanca", 5, "Utilisée 6 mois sans panne, rendement excellent."),
      rev("Hicham A.", "Entrepreneur, Rabat", 4, "Robuste, un peu lourde à déplacer seul."),
    ],
  },
  {
    id: "marteau-piqueur-1700w",
    name: "Marteau-piqueur électrique 1700W",
    category: "electroportatif",
    brand: "Sinmat Force",
    image: marteau,
    gallery: [marteau, meuleuse, perceuse, epi],
    shortDescription: "Démolition intensive, système anti-vibration SDS-Max.",
    description:
      "Marteau-piqueur 1700W pour la démolition de dalles, cloisons et enrobés. Poignée anti-vibration, variateur de puissance et graissage automatique pour une durée de vie prolongée.",
    buyPrice: 4290,
    rentDay: 180,
    rentWeek: 950,
    available: true,
    featured: true,
    isNew: false,
    popularity: 92,
    rating: 4.6,
    specs: [
      { label: "Puissance", value: "1700 W" },
      { label: "Énergie de frappe", value: "45 J" },
      { label: "Poids", value: "16,5 kg" },
      { label: "Emmanchement", value: "SDS-Max" },
      { label: "Frappes / min", value: "1 400" },
    ],
    reviews: [
      rev("Karim E.", "Artisan maçon, Fès", 5, "Puissant et bien équilibré, livraison rapide."),
      rev("Said M.", "Chef d'équipe, Tanger", 4, "Bon rapport qualité/prix en location."),
    ],
  },
  {
    id: "echafaudage-modulaire",
    name: "Échafaudage modulaire 6m",
    category: "chantier",
    brand: "Sinmat Steel",
    image: echafaudage,
    gallery: [echafaudage, betonniere, epi, groupe],
    shortDescription: "Structure acier galvanisé, montage rapide sans outils.",
    description:
      "Échafaudage modulaire jusqu'à 6 mètres de hauteur de travail. Plateaux antidérapants, garde-corps conformes et stabilisateurs réglables. Livré et monté sur chantier sur demande.",
    buyPrice: 18500,
    rentDay: 260,
    rentWeek: 1400,
    available: true,
    featured: true,
    isNew: true,
    popularity: 85,
    rating: 4.7,
    specs: [
      { label: "Hauteur de travail", value: "6 m" },
      { label: "Charge admissible", value: "240 kg / plateau" },
      { label: "Matériau", value: "Acier galvanisé" },
      { label: "Poids total", value: "210 kg" },
      { label: "Montage", value: "Sans outils, 2 personnes" },
    ],
    reviews: [rev("Rachid T.", "Promoteur, Marrakech", 5, "Montage vraiment rapide, normes respectées.")],
  },
  {
    id: "groupe-electrogene-5kva",
    name: "Groupe électrogène 5 kVA",
    category: "chantier",
    brand: "Sinmat Power",
    image: groupe,
    gallery: [groupe, compresseur, betonniere, marteau],
    shortDescription: "Autonomie 10h, démarrage électrique, faible bruit.",
    description:
      "Groupe électrogène essence 5 kVA pour alimenter un chantier isolé. Régulation AVR pour protéger l'outillage sensible, réservoir 25L et châssis roulant.",
    buyPrice: 11900,
    rentDay: 240,
    rentWeek: 1300,
    available: true,
    featured: false,
    isNew: false,
    popularity: 88,
    rating: 4.5,
    specs: [
      { label: "Puissance", value: "5 kVA / 4 kW" },
      { label: "Carburant", value: "Essence – réservoir 25 L" },
      { label: "Autonomie", value: "≈ 10 h à 70 % charge" },
      { label: "Poids", value: "82 kg" },
      { label: "Niveau sonore", value: "68 dB à 7 m" },
    ],
    reviews: [rev("Nabil O.", "Chef de chantier, Agadir", 4, "Stable, alimente sans souci nos outils.")],
  },
  {
    id: "perceuse-percussion-18v",
    name: "Perceuse à percussion 18V",
    category: "electroportatif",
    brand: "Sinmat Force",
    image: perceuse,
    gallery: [perceuse, meuleuse, marteau, epi],
    shortDescription: "2 batteries lithium, couple 65 Nm, mandrin auto-serrant.",
    description:
      "Perceuse-visseuse à percussion sans fil 18V livrée avec deux batteries 4 Ah, chargeur rapide et coffret. Idéale pour la finition et le second œuvre.",
    buyPrice: 1690,
    rentDay: 70,
    rentWeek: 380,
    available: true,
    featured: true,
    isNew: true,
    popularity: 95,
    rating: 4.9,
    specs: [
      { label: "Tension", value: "18 V" },
      { label: "Couple max", value: "65 Nm" },
      { label: "Batteries", value: "2 x 4,0 Ah Li-ion" },
      { label: "Poids", value: "1,7 kg" },
      { label: "Mandrin", value: "13 mm auto-serrant" },
    ],
    reviews: [
      rev("Imane K.", "Architecte d'intérieur, Casablanca", 5, "Légère et puissante, parfaite au quotidien."),
      rev("Mohamed L.", "Électricien, Meknès", 5, "Excellente autonomie."),
    ],
  },
  {
    id: "tondeuse-thermique-46",
    name: "Tondeuse thermique 46 cm",
    category: "jardinage",
    brand: "Sinmat Garden",
    image: tondeuse,
    gallery: [tondeuse, nettoyeur, epi, perceuse],
    shortDescription: "Moteur 4 temps, bac 60L, hauteur de coupe réglable.",
    description:
      "Tondeuse thermique tractée pour les espaces verts de 500 à 2000 m². Carter acier, 7 hauteurs de coupe et fonction mulching pour l'entretien des résidences et lotissements.",
    buyPrice: 5490,
    rentDay: 150,
    rentWeek: 780,
    available: true,
    featured: false,
    isNew: false,
    popularity: 72,
    rating: 4.4,
    specs: [
      { label: "Largeur de coupe", value: "46 cm" },
      { label: "Moteur", value: "4 temps – 139 cm³" },
      { label: "Bac de ramassage", value: "60 L" },
      { label: "Poids", value: "31 kg" },
      { label: "Hauteurs de coupe", value: "7 positions (25-75 mm)" },
    ],
    reviews: [rev("Otmane R.", "Gestionnaire résidence, Rabat", 4, "Efficace sur grandes surfaces.")],
  },
  {
    id: "kit-epi-chantier",
    name: "Kit EPI chantier complet",
    category: "epi",
    brand: "Sinmat Safety",
    image: epi,
    gallery: [epi, echafaudage, marteau, betonniere],
    shortDescription: "Casque, lunettes, gants, gilet HV et protections auditives.",
    description:
      "Kit de protection individuelle conforme aux normes EN. Livré en sac de transport, disponible en commande groupée pour équiper une équipe complète.",
    buyPrice: 390,
    rentDay: null,
    rentWeek: null,
    available: true,
    featured: true,
    isNew: false,
    popularity: 90,
    rating: 4.7,
    specs: [
      { label: "Casque", value: "EN 397, réglable" },
      { label: "Gants", value: "EN 388, cuir renforcé" },
      { label: "Gilet", value: "Haute visibilité EN 20471" },
      { label: "Lunettes", value: "Anti-buée EN 166" },
      { label: "Poids du kit", value: "1,9 kg" },
    ],
    reviews: [rev("Fatima Z.", "Responsable HSE, Casablanca", 5, "Bon niveau de qualité pour équiper nos équipes.")],
  },
  {
    id: "compresseur-100l",
    name: "Compresseur d'air 100L",
    category: "industriel",
    brand: "Sinmat Industry",
    image: compresseur,
    gallery: [compresseur, groupe, nettoyeur, meuleuse],
    shortDescription: "Cuve 100L, 8 bar, alimentation d'outils pneumatiques.",
    description:
      "Compresseur bicylindre à courroie pour atelier ou chantier. Débit constant pour cloueurs, pistolets et clés à chocs, avec sécurité thermique intégrée.",
    buyPrice: 8900,
    rentDay: 190,
    rentWeek: 990,
    available: false,
    featured: false,
    isNew: false,
    popularity: 68,
    rating: 4.3,
    specs: [
      { label: "Capacité cuve", value: "100 L" },
      { label: "Pression max", value: "8 bar" },
      { label: "Débit", value: "330 L/min" },
      { label: "Puissance", value: "3 CV / 2,2 kW" },
      { label: "Poids", value: "76 kg" },
    ],
    reviews: [rev("Anas D.", "Atelier mécanique, Kénitra", 4, "Bonne montée en pression.")],
  },
  {
    id: "nettoyeur-haute-pression",
    name: "Nettoyeur haute pression 180 bar",
    category: "industriel",
    brand: "Sinmat Industry",
    image: nettoyeur,
    gallery: [nettoyeur, compresseur, tondeuse, groupe],
    shortDescription: "180 bar, flexible 10m, usage professionnel intensif.",
    description:
      "Nettoyeur haute pression professionnel pour le décapage de façades, engins et sols de chantier. Pompe à pistons céramiques et enrouleur intégré.",
    buyPrice: 6790,
    rentDay: 170,
    rentWeek: 890,
    available: true,
    featured: false,
    isNew: true,
    popularity: 79,
    rating: 4.6,
    specs: [
      { label: "Pression", value: "180 bar" },
      { label: "Débit", value: "600 L/h" },
      { label: "Flexible", value: "10 m renforcé" },
      { label: "Puissance", value: "3,1 kW" },
      { label: "Poids", value: "38 kg" },
    ],
    reviews: [rev("Zakaria H.", "Entreprise de nettoyage, Tanger", 5, "Puissance au rendez-vous.")],
  },
  {
    id: "meuleuse-230mm",
    name: "Meuleuse d'angle 230 mm",
    category: "electroportatif",
    brand: "Sinmat Force",
    image: meuleuse,
    gallery: [meuleuse, perceuse, marteau, epi],
    shortDescription: "2400W, démarrage progressif, carter de protection.",
    description:
      "Meuleuse d'angle 230 mm pour la découpe de béton, métal et carrelage. Démarrage progressif, protection contre le redémarrage et poignée orientable.",
    buyPrice: 2190,
    rentDay: 90,
    rentWeek: 460,
    available: true,
    featured: false,
    isNew: false,
    popularity: 83,
    rating: 4.5,
    specs: [
      { label: "Puissance", value: "2400 W" },
      { label: "Diamètre disque", value: "230 mm" },
      { label: "Vitesse à vide", value: "6 500 tr/min" },
      { label: "Poids", value: "5,4 kg" },
      { label: "Sécurité", value: "Frein moteur + anti-redémarrage" },
    ],
    reviews: [rev("Brahim S.", "Ferronnier, Salé", 4, "Coupe nette, bonne prise en main.")],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categoryName = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.name ?? id;

export const formatMAD = (value: number) =>
  new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(value) + " MAD";
