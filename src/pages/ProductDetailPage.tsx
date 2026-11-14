// =============================================================================
// 🧭 PASO 4B: Lógica de Detalle de Prenda, Stock Restante y Acción Dual
// =============================================================================
// Toda la interfaz visual (carrusel, tallas, cantidad, botones y popup de
// prendas que combinan) ya está maquetada en el JSX de abajo.
//
// TUS TAREAS AQUÍ (// TODO PASO 4B):
//   1. Calcular `stockForSelectedSize`, `alreadyInCartQty` y `remainingAvailable`
//      descontando las unidades que ya están en Zustand (`items`).
//   2. Implementar `handleSelectSize(size)` para cambiar talla y reiniciar `quantity` a 1.
//   3. Implementar `handleAdd(goDirectToCheckout)` validando talla y stock restante,
//      llamando `addItem(...)`, y navegando a `/checkout` o mostrando `setShowComplementaryPopup(true)`.
//   4. Calcular `complementaryProducts` buscando en `PRODUCTS_LIST` los IDs de `product.complementaryIds`.
// =============================================================================

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { LearningBanner } from '../components/common/LearningBanner';
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
  const [showComplementaryPopup, setShowComplementaryPopup] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  if (isPending) {
    return (
      <div className="aty-container aty-page">
        <div className="aty-detail-skeleton">Cargando ficha de prenda...</div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="aty-container aty-page">
        <div className="aty-empty-box">
          <h2>Prenda no encontrada</h2>
          <p>El identificador "{id}" no existe en el catálogo actual.</p>
          <Link to="/" className="aty-btn aty-btn--primary">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const activeColor = selectedColor ?? product.defaultColor;

  // Cálculo del stock disponible restante descontando lo que ya está en Zustand
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
        `No puedes agregar ${quantity} unidades. Solo quedan ${remainingAvailable} disponibles para la talla ${selectedSize}.`
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
      setShowComplementaryPopup(true);
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
        <Link to="/">← Volver al catálogo</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <LearningBanner
        step="PASO 5B · DETALLE Y STOCK"
        title="useParams() + Diccionario de Stock + Acción Zustand"
        tools={['useProductDetail(id)', 'PRODUCT_STOCK_DICTIONARY[id][size]', 'useCartStore.addItem']}
        description="El selector de cantidad nunca te dejará elegir ni agregar más unidades de las disponibles en el diccionario para la talla elegida (incluso si ya tienes unidades previas en la bolsa)."
      />

      <div className="aty-detail-layout">
        {/* Columna izquierda: Carrusel de imágenes */}
        <section className="aty-carousel" aria-label="Galería de la prenda">
          <div className="aty-carousel__stage">
            <img
              src={product.gallery[safeImageIdx]}
              alt={`${product.name} vista ${safeImageIdx + 1}`}
            />
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

        {/* Columna derecha: Ficha técnica y compra */}
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
              <dt>Corte / Fit</dt>
              <dd>{product.fit}</dd>
            </div>
            <div>
              <dt>Composición</dt>
              <dd>{product.composition}</dd>
            </div>
          </dl>

          {/* Selector de color */}
          <div className="aty-selector-block">
            <span className="aty-selector-label">
              Color: <strong>{activeColor}</strong>
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

          {/* Selector de talla con lectura del diccionario clave-valor */}
          <div className="aty-selector-block">
            <div className="aty-selector-head">
              <span className="aty-selector-label">
                Elige tu talla (Regla RN-05):
              </span>
              {selectedSize && (
                <span className="aty-stock-pill">
                  Stock talla {selectedSize}: {stockForSelectedSize} u.
                  {alreadyInCartQty > 0
                    ? ` (${alreadyInCartQty} ya en bolsa · ${remainingAvailable} disp.)`
                    : ''}
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
          </div>

          {/* Selector de cantidad con bloqueo al stock máximo */}
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
                        `Límite alcanzado: máximo ${remainingAvailable} unidades para talla ${selectedSize}.`
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
                  Máximo agregable ahora: <strong>{remainingAvailable}</strong>{' '}
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

          {/* Botones duales lado a lado: Comprar ahora + Añadir a la bolsa */}
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

      {/* Tarjeta emergente de sugerencias que combinan tras añadir al carrito */}
      {showComplementaryPopup && complementaryProducts.length > 0 && (
        <section
          className="aty-complementary-card"
          aria-label="Prendas sugeridas que combinan"
        >
          <div className="aty-complementary-card__head">
            <div>
              <span className="aty-eyebrow">CROSS-SELLING // COMPLETA TU FIT</span>
              <h3>Prendas que combinan con {product.name}</h3>
            </div>
            <div className="aty-complementary-card__actions">
              <Link to="/carrito" className="aty-btn aty-btn--primary aty-btn--sm">
                Ir a la bolsa →
              </Link>
              <button
                type="button"
                className="aty-icon-btn"
                onClick={() => setShowComplementaryPopup(false)}
                aria-label="Cerrar sugerencias"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="aty-complementary-grid">
            {complementaryProducts.map((comp) => (
              <Link
                key={comp.id}
                to={`/producto/${comp.id}`}
                onClick={() => {
                  setShowComplementaryPopup(false);
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
