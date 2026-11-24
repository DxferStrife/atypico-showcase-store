import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { DeleteConfirmModal } from '../components/cart/DeleteConfirmModal';
import { CheckoutStepper } from '../components/common/CheckoutStepper';
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
      <CheckoutStepper activeStep={1} />

      <div className="aty-page-head">
        <div>
          <span className="aty-eyebrow">BOLSA DE COMPRA // RESUMEN</span>
          <h1>Tu Bolsa ({totalUnits})</h1>
        </div>
        <Link to="/" className="aty-btn aty-btn--outline aty-btn--sm">
          ← Seguir explorando
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="aty-empty-box">
          <h2>Tu bolsa está vacía</h2>
          <p>
            Explora nuestras piezas heavyweight y selecciona tu talla para iniciar
            tu pedido en Atypico Studio.
          </p>
          <Link to="/" className="aty-btn aty-btn--primary">
            Ver colección completa
          </Link>
        </div>
      ) : (
        <div className="aty-two-col">
          <section className="aty-cart-list" aria-label="Prendas en tu bolsa">
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
                          Talla <strong>{item.size}</strong> · {item.color}
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
                          Unitario: {formatCurrency(item.price)} · Máx. {maxStock} u.
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

          <aside className="aty-summary-panel" aria-label="Resumen de bolsa">
            <h2>Resumen de Compra</h2>

            <div className="aty-summary-rows">
              <div className="aty-summary-line">
                <span>Prendas ({totalUnits})</span>
                <strong className="aty-tabular">{formatCurrency(subtotal)}</strong>
              </div>
              <div className="aty-summary-line">
                <span>Envío estándar</span>
                <span>Desde $3.50</span>
              </div>
            </div>

            <div className="aty-summary-total">
              <span>Subtotal</span>
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
