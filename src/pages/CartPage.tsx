// =============================================================================
// 🧭 PASO 4C: Lógica de Bolsa (`/carrito`) + Modal Preventivo (`RN-08`)
// =============================================================================
// Toda la vista de ítems, resumen y DeleteConfirmModal ya está maquetada abajo.
//
// TUS TAREAS AQUÍ (// TODO PASO 4C):
//   1. Calcula `subtotal` (`price * quantity`) y `totalUnits` (`quantity`) con `.reduce(...)`.
//   2. En `handleDecrease(item)`: si `item.quantity <= 1`, abre el modal con
//      `setItemPendingDelete(item)`; si no, llama `updateQuantity(item.id, item.quantity - 1)`.
//   3. En `handleIncrease(item)`: llama `updateQuantity(item.id, item.quantity + 1)`.
//      Si retorna `!res.ok`, muestra `res.reason` con `showToast(...)`.
//   4. En `DeleteConfirmModal` (`onConfirm`): elimina con `removeItem(itemPendingDelete.id)`.
// =============================================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { DeleteConfirmModal } from '../components/cart/DeleteConfirmModal';
import { LearningBanner } from '../components/common/LearningBanner';
import { getStockByVariant } from '../data/mock-catalog';
import { formatCurrency, useCartStore } from '../stores/use-cart-store';
import type { CartItem } from '../types/ecommerce';

export function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const showToast = useCartStore((s) => s.showToast);

  const [itemPendingDelete, setItemPendingDelete] = useState<CartItem | null>(
    null
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      setItemPendingDelete(item);
      return;
    }
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = (item: CartItem) => {
    const res = updateQuantity(item.id, item.quantity + 1);
    if (!res.ok && res.reason) {
      showToast(res.reason);
    }
  };

  return (
    <div className="aty-container aty-page">
      <div className="aty-page-head">
        <div>
          <span className="aty-eyebrow">AUDITORÍA DE COMPRA // ZUSTAND</span>
          <h1>Tu Bolsa de Compras ({totalUnits})</h1>
        </div>
        <Link to="/" className="aty-btn aty-btn--outline aty-btn--sm">
          ← Seguir explorando
        </Link>
      </div>

      <LearningBanner
        step="PASO 6 · BOLSA Y MODAL PREVENTIVO"
        title="Store Zustand + DeleteConfirmModal (Regla RN-08)"
        tools={['useCartStore', 'getStockByVariant()', 'DeleteConfirmModal']}
        description="Si incrementas cantidades, se valida contra el diccionario de stock. Si presionas 'Eliminar' o reduces de 1 a 0, aparece el modal de confirmación: cancelar conserva el ítem y confirmar lo borra actualizando el subtotal."
      />

      {items.length === 0 ? (
        <div className="aty-empty-box">
          <h2>Tu bolsa está vacía</h2>
          <p>
            Añade prendas desde el catálogo para probar las variaciones de talla,
            el control de inventario y el checkout.
          </p>
          <Link to="/" className="aty-btn aty-btn--primary">
            Ver catálogo de prendas
          </Link>
        </div>
      ) : (
        <div className="aty-two-col">
          {/* Lista de ítems en bolsa */}
          <section className="aty-cart-list" aria-label="Prendas en la bolsa">
            {items.map((item) => {
              const maxStock = getStockByVariant(item.productId, item.size);
              const atLimit = item.quantity >= maxStock;

              return (
                <article key={item.id} className="aty-cart-row">
                  <Link
                    to={`/producto/${item.productId}`}
                    className="aty-cart-row__img-wrap"
                  >
                    <img src={item.imageUrl} alt={item.name} />
                  </Link>

                  <div className="aty-cart-row__details">
                    <div className="aty-cart-row__top">
                      <div>
                        <h2 className="aty-cart-row__title">
                          <Link to={`/producto/${item.productId}`}>
                            {item.name}
                          </Link>
                        </h2>
                        <p className="aty-cart-row__meta">
                          Talla: <strong>{item.size}</strong> · Color:{' '}
                          <strong>{item.color}</strong>
                        </p>
                      </div>
                      <strong className="aty-cart-row__line-price aty-tabular">
                        {formatCurrency(item.price * item.quantity)}
                      </strong>
                    </div>

                    <div className="aty-cart-row__bottom">
                      <div className="aty-qty-row">
                        <div className="aty-qty-control">
                          <button
                            type="button"
                            onClick={() => handleDecrease(item)}
                            aria-label={`Disminuir cantidad de ${item.name}`}
                          >
                            −
                          </button>
                          <span className="aty-tabular">{item.quantity}</span>
                          <button
                            type="button"
                            disabled={atLimit}
                            onClick={() => handleIncrease(item)}
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        <span className="aty-muted-xs">
                          Unitario: {formatCurrency(item.price)} · Stock máx:{' '}
                          <strong>{maxStock}</strong>
                        </span>
                      </div>

                      <div className="aty-cart-row__actions">
                        <Link
                          to={`/producto/${item.productId}`}
                          className="aty-link-subtle"
                        >
                          Agregar otra talla
                        </Link>
                        <button
                          type="button"
                          className="aty-link-danger"
                          onClick={() => setItemPendingDelete(item)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* Resumen financiero lateral */}
          <aside className="aty-summary-panel" aria-label="Resumen de bolsa">
            <h2>Resumen de la Bolsa</h2>

            <div className="aty-summary-rows">
              <div className="aty-summary-line">
                <span>Prendas ({totalUnits})</span>
                <strong className="aty-tabular">{formatCurrency(subtotal)}</strong>
              </div>
              <div className="aty-summary-line">
                <span>Envío estimado</span>
                <span>Desde $3.50 (en checkout)</span>
              </div>
            </div>

            <div className="aty-summary-total">
              <span>Subtotal neto</span>
              <strong className="aty-tabular">{formatCurrency(subtotal)}</strong>
            </div>

            <button
              type="button"
              className="aty-btn aty-btn--primary aty-btn--full"
              onClick={() => navigate('/checkout')}
            >
              Continuar al Checkout →
            </button>
          </aside>
        </div>
      )}

      <DeleteConfirmModal
        item={itemPendingDelete}
        onCancel={() => setItemPendingDelete(null)}
        onConfirm={() => {
          if (itemPendingDelete) removeItem(itemPendingDelete.id);
          setItemPendingDelete(null);
        }}
      />
    </div>
  );
}
