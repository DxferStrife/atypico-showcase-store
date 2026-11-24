import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { PRODUCTS_LIST } from '../data/mock-catalog';
import { useProductDetail } from '../hooks/use-products';
import {
  buildCartItemId,
  formatCurrency,
  useCartStore,
} from '../stores/use-cart-store';
import type { Product, Size } from '../types/ecommerce';

const SIZES: Size[] = ['S', 'M', 'L', 'XL'];

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isPending, isError } = useProductDetail(id);

  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useCartStore((s) => s.showToast);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAddedToCart, setJustAddedToCart] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  if (isPending) {
    return (
      <div className="aty-container aty-page">
        <div className="aty-detail-skeleton" aria-label="Cargando ficha de prenda" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="aty-container aty-page">
        <div className="aty-empty-box">
          <span className="aty-eyebrow">COLECCIÓN 03</span>
          <h1>Prenda no disponible</h1>
          <p>
            No encontramos la pieza solicitada en nuestro catálogo activo. Explora
            las siluetas disponibles en tienda.
          </p>
          <Link to="/" className="aty-btn aty-btn--primary">
            ← Volver a la colección
          </Link>
        </div>
      </div>
    );
  }

  const activeColor = selectedColor ?? product.defaultColor;

  const stockForSelectedSize = selectedSize
    ? product.stockBySize[selectedSize] ?? 0
    : 0;

  const alreadyInCartQty = selectedSize
    ? items.find(
        (entry) =>
          entry.id === buildCartItemId(product.id, selectedSize, activeColor)
      )?.quantity ?? 0
    : 0;

  const remainingAvailable = Math.max(
    0,
    stockForSelectedSize - alreadyInCartQty
  );

  const handleSelectSize = (size: Size) => {
    setSelectedSize(size);
    setQuantity(1);
    setFeedbackError(null);
  };

  const handleAdd = (goDirectToCheckout: boolean) => {
    if (!selectedSize) {
      setFeedbackError('Selecciona una talla disponible antes de continuar.');
      return;
    }

    if (quantity > remainingAvailable) {
      setFeedbackError(
        `Solo quedan ${remainingAvailable} unidades disponibles para la talla ${selectedSize}.`
      );
      return;
    }

    const result = addItem(product, selectedSize, activeColor, quantity);
    if (!result.ok) {
      setFeedbackError(result.reason ?? 'No fue posible añadir la prenda.');
      return;
    }

    setFeedbackError(null);
    setQuantity(1);

    if (goDirectToCheckout) {
      navigate('/checkout');
    } else {
      setJustAddedToCart(true);
    }
  };

  const complementaryProducts: Product[] = product.complementaryIds
    .map((compId) => PRODUCTS_LIST.find((p) => p.id === compId))
    .filter((p): p is Product => Boolean(p));

  const safeImageIdx =
    activeImageIdx >= product.gallery.length ? 0 : activeImageIdx;

  return (
    <div className="aty-container aty-page">
      <div className="aty-breadcrumb">
        <Link to="/">← Colección</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <div className="aty-detail-layout">
        {/* Galería carrusel protagonista */}
        <section className="aty-carousel" aria-label="Galería de la prenda">
          <div className="aty-carousel__stage">
            <img
              src={product.gallery[safeImageIdx]}
              alt={`${product.name} vista ${safeImageIdx + 1}`}
            />
            <span className="aty-carousel__counter aty-tabular">
              0{safeImageIdx + 1} / 0{product.gallery.length}
            </span>
            {product.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className="aty-carousel__arrow is-prev"
                  aria-label="Imagen anterior"
                  onClick={() =>
                    setActiveImageIdx((prev) =>
                      prev === 0 ? product.gallery.length - 1 : prev - 1
                    )
                  }
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="aty-carousel__arrow is-next"
                  aria-label="Imagen siguiente"
                  onClick={() =>
                    setActiveImageIdx(
                      (prev) => (prev + 1) % product.gallery.length
                    )
                  }
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="aty-carousel__thumbs">
            {product.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                className={`aty-thumb-btn ${
                  idx === safeImageIdx ? 'is-active' : ''
                }`}
                onClick={() => setActiveImageIdx(idx)}
                aria-label={`Ver ángulo ${idx + 1}`}
              >
                <img src={imgUrl} alt="" />
              </button>
            ))}
          </div>
        </section>

        {/* Ficha técnica y selector de variante */}
        <section className="aty-detail-info">
          <div className="aty-detail-info__meta">
            <span className="aty-eyebrow">{product.category}</span>
            {product.badge && (
              <span className="aty-badge-accent">{product.badge}</span>
            )}
          </div>

          <h1 className="aty-detail-info__title">{product.name}</h1>
          <p className="aty-detail-info__price aty-tabular">
            {formatCurrency(product.price)}
          </p>

          <p className="aty-detail-info__desc">{product.description}</p>

          <dl className="aty-specs-list">
            <div>
              <dt>Corte</dt>
              <dd>{product.fit}</dd>
            </div>
            <div>
              <dt>Tejido</dt>
              <dd>{product.composition}</dd>
            </div>
            <div>
              <dt>Envío</dt>
              <dd>Despacho en 24–48h · Estándar $3.50</dd>
            </div>
          </dl>

          {/* Color */}
          <div className="aty-selector-block">
            <span className="aty-selector-label">
              Acabado: <strong>{activeColor}</strong>
            </span>
            <div className="aty-chip-row">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`aty-chip-btn ${
                    activeColor === color ? 'is-active' : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Talla */}
          <div className="aty-selector-block">
            <div className="aty-selector-head">
              <span className="aty-selector-label">Talla:</span>
              {selectedSize && (
                <span
                  className={`aty-stock-pill ${
                    remainingAvailable === 0 ? 'is-empty' : ''
                  }`}
                >
                  {remainingAvailable === 0
                    ? `Sin cupo restante en ${selectedSize}`
                    : `Disponible · ${stockForSelectedSize} u.${
                        alreadyInCartQty > 0
                          ? ` (${alreadyInCartQty} en bolsa)`
                          : ''
                      }`}
                </span>
              )}
            </div>

            <div className="aty-size-grid">
              {SIZES.map((size) => {
                const totalStock = product.stockBySize[size] ?? 0;
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={totalStock === 0}
                    className={`aty-size-btn ${isSelected ? 'is-active' : ''}`}
                    onClick={() => handleSelectSize(size)}
                  >
                    <strong>{size}</strong>
                    <span>
                      {totalStock === 0 ? 'Agotado' : `${totalStock} disp.`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Guía de medidas técnica */}
            <details className="aty-size-guide">
              <summary>Ver guía de medidas (cm)</summary>
              <table className="aty-size-table">
                <thead>
                  <tr>
                    <th>Talla</th>
                    <th>Ancho</th>
                    <th>Largo</th>
                    <th>Hombro / Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map((size) => {
                    const row = product.measurements[size];
                    return (
                      <tr key={size}>
                        <td>{size}</td>
                        <td className="aty-tabular">{row.chestCm} cm</td>
                        <td className="aty-tabular">{row.lengthCm} cm</td>
                        <td className="aty-tabular">{row.shoulderCm} cm</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </details>
          </div>

          {/* Cantidad */}
          <div className="aty-selector-block">
            <span className="aty-selector-label">Cantidad:</span>
            <div className="aty-qty-row">
              <div className="aty-qty-control">
                <button
                  type="button"
                  disabled={!selectedSize || quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="aty-tabular">{quantity}</span>
                <button
                  type="button"
                  disabled={
                    !selectedSize ||
                    remainingAvailable === 0 ||
                    quantity >= remainingAvailable
                  }
                  onClick={() => {
                    if (quantity >= remainingAvailable) {
                      showToast(
                        `Límite de inventario alcanzado: máximo ${remainingAvailable} u. en talla ${selectedSize}.`
                      );
                      return;
                    }
                    setQuantity((q) => q + 1);
                  }}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
              {selectedSize && (
                <span className="aty-muted-xs">
                  Disponible para agregar:{' '}
                  <strong>{remainingAvailable}</strong>{' '}
                  {remainingAvailable === 1 ? 'unidad' : 'unidades'}
                </span>
              )}
            </div>
          </div>

          {feedbackError && (
            <div className="aty-inline-error" role="alert">
              {feedbackError}
            </div>
          )}

          {/* Dual CTA de conversión */}
          <div className="aty-dual-cta">
            <button
              type="button"
              className="aty-btn aty-btn--outline"
              disabled={Boolean(selectedSize && remainingAvailable === 0)}
              onClick={() => handleAdd(false)}
            >
              Añadir a la bolsa
            </button>
            <button
              type="button"
              className="aty-btn aty-btn--primary"
              disabled={Boolean(selectedSize && remainingAvailable === 0)}
              onClick={() => handleAdd(true)}
            >
              Comprar ahora →
            </button>
          </div>
        </section>
      </div>

      {/* Confirmación contextual al agregar + Completa el look */}
      {complementaryProducts.length > 0 && (
        <section
          className={`aty-complementary-card ${
            justAddedToCart ? 'is-highlighted' : ''
          }`}
          aria-label="Completa el look"
        >
          <div className="aty-complementary-card__head">
            <div>
              <span className="aty-eyebrow">
                {justAddedToCart
                  ? 'AÑADIDO A TU BOLSA // CURADURÍA DE ESTILO'
                  : 'CURADURÍA // COMPLETA EL LOOK'}
              </span>
              <h2>Piezas que combinan con {product.name}</h2>
            </div>
            {justAddedToCart && (
              <div className="aty-complementary-card__actions">
                <Link to="/carrito" className="aty-btn aty-btn--primary aty-btn--sm">
                  Ir a mi bolsa →
                </Link>
                <button
                  type="button"
                  className="aty-icon-btn"
                  onClick={() => setJustAddedToCart(false)}
                  aria-label="Minimizar aviso"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="aty-complementary-grid">
            {complementaryProducts.map((comp) => (
              <Link
                key={comp.id}
                to={`/producto/${comp.id}`}
                onClick={() => {
                  setJustAddedToCart(false);
                  setSelectedSize(null);
                  setSelectedColor(null);
                  setActiveImageIdx(0);
                  setQuantity(1);
                }}
                className="aty-mini-card"
              >
                <img src={comp.gallery[0]} alt={comp.name} />
                <div>
                  <strong>{comp.name}</strong>
                  <span>{formatCurrency(comp.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
