// =============================================================================
// 🧭 PASO 3: Store Global del Cliente con Zustand
// =============================================================================

import { create } from 'zustand';
import { getStockByVariant } from '../data/mock-catalog';
import type {
  CartItem,
  CheckoutFormValues,
  OrderSnapshot,
  Product,
  Size,
} from '../types/ecommerce';

type AddItemResult = {
  ok: boolean;
  reason?: string;
};

type CartStoreState = {
  items: CartItem[];
  isDrawerOpen: boolean;
  showLearningGuides: boolean;
  toastMessage: string | null;
  lastConfirmedOrder: OrderSnapshot | null;

  setDrawerOpen: (open: boolean) => void;
  toggleLearningGuides: () => void;
  clearToast: () => void;
  showToast: (message: string) => void;

  addItem: (
    product: Product,
    size: Size,
    color: string,
    quantity: number
  ) => AddItemResult;
  updateQuantity: (itemId: string, nextQuantity: number) => AddItemResult;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  confirmOrder: (customer: CheckoutFormValues, shippingCost: number) => OrderSnapshot;
};

export function buildCartItemId(productId: string, size: Size, color: string): string {
  return `${productId}__${size}__${color}`;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  items: [],
  isDrawerOpen: false,
  showLearningGuides: true,
  toastMessage: null,
  lastConfirmedOrder: null,

  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  toggleLearningGuides: () =>
    set((state) => ({ showLearningGuides: !state.showLearningGuides })),
  clearToast: () => set({ toastMessage: null }),
  showToast: (message) => set({ toastMessage: message }),

  addItem: (product, size, color, quantity) => {
    const availableStock = getStockByVariant(product.id, size);
    if (availableStock <= 0) {
      return {
        ok: false,
        reason: `La talla ${size} está agotada en el diccionario de stock.`,
      };
    }

    const itemId = buildCartItemId(product.id, size, color);
    const currentItems = get().items;
    const existing = currentItems.find((entry) => entry.id === itemId);
    const currentQtyInCart = existing ? existing.quantity : 0;
    const targetQty = currentQtyInCart + quantity;

    if (targetQty > availableStock) {
      const remaining = Math.max(0, availableStock - currentQtyInCart);
      return {
        ok: false,
        reason:
          remaining === 0
            ? `Ya tienes el máximo disponible (${availableStock} u.) de talla ${size} en tu bolsa.`
            : `Solo quedan ${remaining} unidades disponibles adicionales en talla ${size} (stock total: ${availableStock}).`,
      };
    }

    const updatedItems = existing
      ? currentItems.map((entry) =>
          entry.id === itemId ? { ...entry, quantity: targetQty } : entry
        )
      : [
          ...currentItems,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            size,
            color,
            quantity,
            imageUrl: product.gallery[0],
          },
        ];

    set({
      items: updatedItems,
      toastMessage: `Añadiste ${quantity}x ${product.name} (Talla ${size}) a la bolsa.`,
    });

    return { ok: true };
  },

  updateQuantity: (itemId, nextQuantity) => {
    const target = get().items.find((entry) => entry.id === itemId);
    if (!target) {
      return { ok: false, reason: 'Prenda no encontrada en la bolsa.' };
    }

    const maxStock = getStockByVariant(target.productId, target.size);
    if (nextQuantity > maxStock) {
      return {
        ok: false,
        reason: `Stock máximo disponible para talla ${target.size}: ${maxStock} unidades.`,
      };
    }

    if (nextQuantity < 1) {
      return {
        ok: false,
        reason: 'Usa el modal de confirmación preventiva para eliminar la prenda.',
      };
    }

    set({
      items: get().items.map((entry) =>
        entry.id === itemId ? { ...entry, quantity: nextQuantity } : entry
      ),
    });
    return { ok: true };
  },

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((entry) => entry.id !== itemId),
      toastMessage: 'Prenda eliminada de la bolsa y subtotal actualizado.',
    })),

  clearCart: () => set({ items: [] }),

  confirmOrder: (customer, shippingCost) => {
    const items = get().items;
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const snapshot: OrderSnapshot = {
      orderId: `ATY-${randomCode}`,
      createdAt: new Date().toLocaleString('es-EC', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      items: [...items],
      customer: { ...customer },
      subtotal,
      shippingCost,
      total: subtotal + shippingCost,
    };

    // RN-12: Vaciamos la bolsa al confirmar, pero conservamos lastConfirmedOrder
    set({
      lastConfirmedOrder: snapshot,
      items: [],
      isDrawerOpen: false,
    });

    return snapshot;
  },
}));
