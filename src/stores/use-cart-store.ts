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
  toastMessage: string | null;
  lastConfirmedOrder: OrderSnapshot | null;

  setDrawerOpen: (open: boolean) => void;
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
  toastMessage: null,
  lastConfirmedOrder: null,

  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  clearToast: () => set({ toastMessage: null }),
  showToast: (message) => set({ toastMessage: message }),

  addItem: (product, size, color, quantity) => {
    const availableStock = getStockByVariant(product.id, size);
    if (availableStock <= 0) {
      return {
        ok: false,
        reason: `La talla ${size} se encuentra temporalmente agotada.`,
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
            ? `Alcanzaste el límite de inventario disponible (${availableStock} u.) para la talla ${size}.`
            : `Solo quedan ${remaining} unidades adicionales disponibles en talla ${size}.`,
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
      toastMessage: `${quantity}× ${product.name} (Talla ${size}) añadido a tu bolsa.`,
    });

    return { ok: true };
  },

  updateQuantity: (itemId, nextQuantity) => {
    const target = get().items.find((entry) => entry.id === itemId);
    if (!target) {
      return { ok: false, reason: 'No encontramos esa prenda en tu bolsa.' };
    }

    const maxStock = getStockByVariant(target.productId, target.size);
    if (nextQuantity > maxStock) {
      return {
        ok: false,
        reason: `Disponibilidad máxima para la talla ${target.size}: ${maxStock} unidades.`,
      };
    }

    if (nextQuantity < 1) {
      return {
        ok: false,
        reason: 'Confirma si deseas retirar esta prenda de tu bolsa.',
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
      toastMessage: 'Prenda retirada de la bolsa.',
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

    set({
      lastConfirmedOrder: snapshot,
      items: [],
      isDrawerOpen: false,
    });

    return snapshot;
  },
}));
