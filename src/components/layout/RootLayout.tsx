import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { formatCurrency, useCartStore } from '../../stores/use-cart-store';
import type { CartItem } from '../../types/ecommerce';
import { DeleteConfirmModal } from '../cart/DeleteConfirmModal';


export function RootLayout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const toastMessage = useCartStore((s) => s.toastMessage);
  const clearToast = useCartStore((s) => s.clearToast);
  const showToast = useCartStore((s) => s.showToast);
  const showLearningGuides = useCartStore((s) => s.showLearningGuides);
  const toggleLearningGuides = useCartStore((s) => s.toggleLearningGuides);

  const [itemPendingDelete, setItemPendingDelete] = useState<CartItem | null>(
    null
  );

  // Calcula el total de unidades y el subtotal desde `items`
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Auto-cierre del toast informativo tras 3.2 segundos (ya listo)
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => clearToast(), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  // Decrementa cantidad o abre el modal si la cantidad es 1
  const handleDrawerDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      setItemPendingDelete(item);
      return;
    }
    updateQuantity(item.id, item.quantity - 1);
  };

  // Incrementa cantidad validando el stock en Zustand
  const handleDrawerIncrease = (item: CartItem) => {
    const res = updateQuantity(item.id, item.quantity + 1);
    if (!res.ok && res.reason) {
      showToast(res.reason);
    }
  };

  return (
    <div className="aty-shell">
      <header className="aty-header">
        <div className="aty-container aty-header__inner">
          <Link to="/" className="aty-brand">
            <span className="aty-brand__mark">A</span>
            <div>
              <span className="aty-brand__name">ATYPICO STUDIO</span>
              <span className="aty-brand__sub">URBAN SHOWCASE STORE</span>
            </div>
          </Link>

          <nav className="aty-nav" aria-label="Navegación principal">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `aty-nav__link ${isActive ? 'is-active' : ''}`
              }
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                `aty-nav__link ${isActive ? 'is-active' : ''}`
              }
            >
              Bolsa ({totalCount})
            </NavLink>
            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                `aty-nav__link ${isActive ? 'is-active' : ''}`
              }
            >
              Checkout
            </NavLink>
          </nav>

          <div className="aty-header__actions">
            <button
              type="button"
              className={`aty-chip-btn ${showLearningGuides ? 'is-active' : ''}`}
              onClick={toggleLearningGuides}
              title="Mostrar u ocultar pistas paso a paso del stack React"
            >
              {showLearningGuides ? '🧭 Pistas ON' : '🧭 Pistas OFF'}
            </button>

            <button
              type="button"
              className="aty-cart-trigger"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Abrir vista rápida de bolsa (${totalCount} prendas)`}
            >
              <span>Bolsa</span>
              <span className="aty-cart-badge">{totalCount}</span>
            </button>
          </div>
        </div>
      </header>

      {toastMessage && (
        <div className="aty-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
          <button
            type="button"
            className="aty-toast__close"
            onClick={clearToast}
            aria-label="Cerrar aviso"
          >
            ✕
          </button>
        </div>
      )}

      <main className="aty-main">
        <Outlet />
      </main>

      <footer className="aty-footer">
        <div className="aty-container aty-footer__inner">
          <div>
            <strong>ATYPICO STUDIO // SHOWCASE E-COMMERCE</strong>
            <p className="aty-footer__muted">
              Prototipo técnico MVP · CSS puro con tokens en <code>:root</code> + React Router + TanStack Query + Zustand + Mantine Form &amp; Zod.
            </p>
          </div>
          <span className="aty-footer__badge">MODO DEMOSTRACIÓN BOOTCAMP</span>
        </div>
      </footer>

      {/* Drawer lateral de vista previa rápida de la bolsa */}
      {isDrawerOpen && (
        <div
          className="aty-drawer-backdrop"
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          <aside
            className="aty-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa de bolsa de compras"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aty-drawer__header">
              <div>
                <span className="aty-eyebrow">ZUSTAND STORE // VISTA RÁPIDA</span>
                <h2 className="aty-drawer__title">Tu Bolsa ({totalCount})</h2>
              </div>
              <button
                type="button"
                className="aty-icon-btn"
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar panel de bolsa"
              >
                ✕
              </button>
            </div>

            <div className="aty-drawer__body">
              {items.length === 0 ? (
                <div className="aty-empty-box">
                  <p>Tu bolsa está vacía todavía.</p>
                  <button
                    type="button"
                    className="aty-btn aty-btn--primary"
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/');
                    }}
                  >
                    Explorar colección
                  </button>
                </div>
              ) : (
                <ul className="aty-drawer-list">
                  {items.map((item) => (
                    <li key={item.id} className="aty-drawer-item">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="aty-drawer-item__img"
                      />
                      <div className="aty-drawer-item__info">
                        <strong>{item.name}</strong>
                        <span className="aty-drawer-item__meta">
                          Talla {item.size} · {item.color}
                        </span>
                        <span className="aty-drawer-item__price">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <div className="aty-qty-control aty-qty-control--sm">
                          <button
                            type="button"
                            onClick={() => handleDrawerDecrease(item)}
                            aria-label={`Reducir cantidad de ${item.name}`}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleDrawerIncrease(item)}
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="aty-link-danger"
                        onClick={() => setItemPendingDelete(item)}
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="aty-drawer__footer">
                <div className="aty-summary-line">
                  <span>Subtotal prendas</span>
                  <strong className="aty-tabular">{formatCurrency(subtotal)}</strong>
                </div>
                <p className="aty-muted-xs">
                  El costo de envío ($3.50 estándar) se suma en el checkout.
                </p>
                <div className="aty-drawer__cta-stack">
                  <button
                    type="button"
                    className="aty-btn aty-btn--outline"
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/carrito');
                    }}
                  >
                    Ver carrito completo (/carrito)
                  </button>
                  <button
                    type="button"
                    className="aty-btn aty-btn--primary"
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/checkout');
                    }}
                  >
                    Ir al Checkout →
                  </button>
                </div>
              </div>
            )}
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
