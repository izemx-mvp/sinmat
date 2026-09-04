import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartMode = "achat" | "location";

export interface CartItem {
  productId: string;
  mode: CartMode;
  quantity: number;
  days?: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (productId: string, mode: CartMode, quantity?: number, days?: number) => void;
  updateQuantity: (productId: string, mode: CartMode, quantity: number) => void;
  updateDays: (productId: string, mode: CartMode, days: number) => void;
  removeItem: (productId: string, mode: CartMode) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const lineTotal = (item: CartItem, product: Product) =>
  item.mode === "achat"
    ? product.buyPrice * item.quantity
    : (product.rentDay ?? 0) * item.quantity * (item.days ?? 1);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (productId: string, mode: CartMode, quantity = 1, days = 3) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === productId && i.mode === mode);
        if (existing) {
          return prev.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + quantity, days: mode === "location" ? days : undefined } : i,
          );
        }
        return [...prev, { productId, mode, quantity, days: mode === "location" ? days : undefined }];
      });
    },
    [],
  );

  const updateQuantity = useCallback((productId: string, mode: CartMode, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.mode === mode ? { ...i, quantity: Math.max(1, quantity) } : i)),
    );
  }, []);

  const updateDays = useCallback((productId: string, mode: CartMode, days: number) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.mode === mode ? { ...i, days: Math.max(1, days) } : i)),
    );
  }, []);

  const removeItem = useCallback((productId: string, mode: CartMode) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.mode === mode)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? sum + lineTotal(item, product) : sum;
    }, 0);
    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal,
      addItem,
      updateQuantity,
      updateDays,
      removeItem,
      clear,
    };
  }, [items, addItem, updateQuantity, updateDays, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
