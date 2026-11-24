import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { formatCurrency, useCartStore } from '../../stores/use-cart-store';
import type { CartItem } from '../../types/ecommerce';
import { DeleteConfirmModal } from '../cart/DeleteConfirmModal';

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = useCartStore((s) => s.items);
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const toastMessage = useCartStore((s) => s.toastMessage);
  const clearToast = useCartStore((s) => s.clearToast);
  const showToast = useCartStore((s) => s.showToast);

  const [itemPendingDelete, setItemPendingDelete] = useState<CartItem | null>(
    null
  );

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => clearToast(), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, setDrawerOpen]);

  const handleGoToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 90);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDrawerDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      setItemPendingDelete(item);
      return;
    }
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleDrawerIncrease = (item: CartItem) => {
    const res = updateQuantity(item.id, item.quantity + 1);
    if (!res.ok && res.reason) {
      showToast(res.reason);
    }
  };

  return (
    <div className="aty-shell">
      {/* Barra de anuncio superior de marca */}
      <div className="aty-announcement">
        <div className="aty-container aty-announcement__inner">
          <span>DROP 03 // HEAVYWEIGHT SERIES</span>
          <span>ENVÍO ESTÁNDAR DESDE $3.50 · DESPACHO EN 24–48H</span>
        </div>
      </div>

      {/* Cabecera editorial sticky */}
      <header className="aty-header">
        <div className="aty-container aty-header__inner">
          <Link to="/" className="aty-brand">
            <span className="aty-brand__mark">A</span>
            <div>
              <span className="aty-brand__name">ATYPICO STUDIO</span>
              <span className="aty-brand__sub">HEAVYWEIGHT APPAREL</span>
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
              Colección
            </NavLink>
            <button
              type="button"
              className="aty-nav__link aty-nav__btn"
              onClick={() => handleGoToSection('estudio')}
            >
              Estudio
            </button>
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                `aty-nav__link ${isActive ? 'is-active' : ''}`
              }
            >
              Bolsa
            </NavLink>
          </nav>

          <div className="aty-header__actions">
            <button
              type="button"
              className="aty-cart-trigger"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Abrir bolsa de compra (${totalCount} prendas)`}
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

      {/* Footer insignia de estudio */}
      <footer className="aty-footer">
        <div className="aty-container aty-footer__grid">
          <div className="aty-footer__brand-col">
            <div className="aty-brand">
              <span className="aty-brand__mark">A</span>
              <div>
                <span className="aty-brand__name">ATYPICO STUDIO</span>
                <span className="aty-brand__sub">DISEÑO TEXTIL &amp; DIGITAL</span>
              </div>
            </div>
            <p className="aty-footer__muted">
              Prendas urbanas de alto gramaje confeccionadas en lotes controlados y
              experiencias e-commerce construidas a medida.
            </p>
          </div>

          <div className="aty-footer__col">
            <h3>Colección</h3>
            <ul className="aty-footer__links">
              <li>
                <Link to="/producto/tee-boxy-obsidian">Camiseta Boxy Obsidian</Link>
              </li>
              <li>
                <Link to="/producto/hoodie-heavy-concrete">Hoodie Heavyweight 440g</Link>
              </li>
              <li>
                <Link to="/producto/cargo-tactical-slate">Cargo Tactical Slate</Link>
              </li>
              <li>
                <Link to="/producto/bag-crossbody-nylon">Crossbody Utility Ripstop</Link>
              </li>
            </ul>
          </div>

          <div className="aty-footer__col">
            <h3>Despacho &amp; Atención</h3>
            <ul className="aty-footer__links">
              <li>Envío local estándar: $3.50 (24–48h)</li>
              <li>Envío nacional interprovincial: $5.00</li>
              <li>Pagos por transferencia directa verificada</li>
              <li>
                <Link to="/carrito">Revisar mi bolsa ({totalCount})</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="aty-container aty-footer__bottom">
          <span>© 2026 ATYPICO STUDIO. Todos los derechos reservados.</span>
          <span className="aty-footer__badge">SERIES 03 // PRODUCTION STOREFRONT</span>
        </div>
      </footer>

      {/* Drawer lateral de bolsa */}
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
            aria-label="Vista rápida de bolsa de compra"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aty-drawer__header">
              <div>
                <span className="aty-eyebrow">ATYPICO STUDIO // CARRITO</span>
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
                  <p>Tu bolsa está vacía en este momento.</p>
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
                  Costo de envío estándar desde $3.50 calculado al finalizar.
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
                    Ver bolsa completa
                  </button>
                  <button
                    type="button"
                    className="aty-btn aty-btn--primary"
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/checkout');
                    }}
                  >
                    Finalizar compra →
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
