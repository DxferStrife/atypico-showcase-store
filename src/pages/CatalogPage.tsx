// =============================================================================
// 🧭 PASO 4A: Lógica de Catálogo y Filtros Reactivos (React Básico + TanStack Query)
// =============================================================================
// La maquetación de tarjetas, skeleton, badges de stock y filtros ya está lista.
//
// TUS TAREAS AQUÍ (// TODO PASO 4A):
//   1. Filtrar `products` según `selectedCategory` (`categoryFiltered`).
//   2. Calcular `stockCountPerSize` sumando cuántas unidades tiene cada talla
//      en el diccionario `prod.stockBySize[size]` para deshabilitar tallas en 0.
//   3. En `handleSelectCategory`: si cambias de categoría y la talla elegida
//      ya no tiene stock ahí, resetea `selectedSize` a `'Todas'`.
//   4. Filtrar `categoryFiltered` según `selectedSize` (`visibleProducts`).
// =============================================================================

import { useState } from 'react';
import { Link } from 'react-router';
import { LearningBanner } from '../components/common/LearningBanner';
import { useProductsCatalog } from '../hooks/use-products';
import { formatCurrency } from '../stores/use-cart-store';
import type { Category, Size } from '../types/ecommerce';

const CATEGORIES: Array<'Todas' | Category> = [
  'Todas',
  'Camisetas Oversize',
  'Pantalones Cargo',
  'Accesorios',
];

const SIZES: Size[] = ['S', 'M', 'L', 'XL'];

export function CatalogPage() {
  const { data: products, isPending, isError, refetch } = useProductsCatalog();
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | Category>(
    'Todas'
  );
  const [selectedSize, setSelectedSize] = useState<'Todas' | Size>('Todas');

  // Cálculo puro (sin useEffect): productos filtrados por categoría activa
  const categoryFiltered = (products ?? []).filter((item) =>
    selectedCategory === 'Todas' ? true : item.category === selectedCategory
  );

  // Regla RN-02: Calculamos qué tallas tienen al menos 1 unidad en el diccionario
  const stockCountPerSize = SIZES.reduce<{ S: number; M: number; L: number; XL: number }>(
    (acc, size) => {
      acc[size] = categoryFiltered.reduce(
        (sum, prod) => sum + (prod.stockBySize[size] ?? 0),
        0
      );
      return acc;
    },
    { S: 0, M: 0, L: 0, XL: 0 }
  );

  // Al cambiar categoría, si la talla activa ya no tiene stock disponible, la reseteamos
  const handleSelectCategory = (cat: 'Todas' | Category) => {
    setSelectedCategory(cat);
    if (selectedSize !== 'Todas') {
      const nextCatItems = (products ?? []).filter((item) =>
        cat === 'Todas' ? true : item.category === cat
      );
      const hasStockForSelectedSize = nextCatItems.some(
        (prod) => (prod.stockBySize[selectedSize] ?? 0) > 0
      );
      if (!hasStockForSelectedSize) {
        setSelectedSize('Todas');
      }
    }
  };

  const visibleProducts = categoryFiltered.filter((item) =>
    selectedSize === 'Todas' ? true : (item.stockBySize[selectedSize] ?? 0) > 0
  );

  return (
    <div className="aty-container aty-page">
      <LearningBanner
        step="PASO 5 · CATÁLOGO"
        title="Consulta remota con TanStack Query + Diccionario de Stock"
        tools={['useQuery(["products"])', 'useState (filtros)', 'React Router <Link>']}
        description="El catálogo llega desde useProductsCatalog() combinando la lista de prendas con el diccionario de stock por talla. Las tallas sin unidades se deshabilitan automáticamente (Regla RN-02)."
      />

      {/* Hero Editorial Streetwear */}
      <section className="aty-hero">
        <div className="aty-hero__content">
          <span className="aty-eyebrow">DROP 03 // ATYPICO STUDIO SHOWCASE</span>
          <h1 className="aty-hero__title">
            Siluetas Urbanas Heavyweight diseñadas para convertir clics.
          </h1>
          <p className="aty-hero__subtitle">
            Explora la colección, verifica el stock real por talla desde nuestro
            diccionario clave-valor y recorre el circuito completo de compra en React.
          </p>
        </div>
        <div className="aty-hero__stats">
          <div className="aty-stat-box">
            <span className="aty-stat-box__num">
              {products ? products.length : '—'}
            </span>
            <span className="aty-stat-box__label">Prendas activas</span>
          </div>
          <div className="aty-stat-box">
            <span className="aty-stat-box__num">$3.50</span>
            <span className="aty-stat-box__label">Envío estándar</span>
          </div>
        </div>
      </section>

      {/* Barra de Filtros */}
      <section className="aty-filter-bar" aria-label="Filtros de catálogo">
        <div className="aty-filter-group">
          <span className="aty-filter-label">Categoría (RN-01):</span>
          <div className="aty-chip-row">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`aty-chip-btn ${
                  selectedCategory === category ? 'is-active' : ''
                }`}
                onClick={() => handleSelectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="aty-filter-group">
          <span className="aty-filter-label">Talla disponible (RN-02):</span>
          <div className="aty-chip-row">
            <button
              type="button"
              className={`aty-chip-btn ${selectedSize === 'Todas' ? 'is-active' : ''}`}
              onClick={() => setSelectedSize('Todas')}
            >
              Todas
            </button>
            {SIZES.map((size) => {
              const units = stockCountPerSize[size];
              return (
                <button
                  key={size}
                  type="button"
                  disabled={!isPending && units === 0}
                  className={`aty-chip-btn ${
                    selectedSize === size ? 'is-active' : ''
                  }`}
                  onClick={() => setSelectedSize(size)}
                  title={
                    units === 0
                      ? `Sin stock disponible en talla ${size}`
                      : `${units} unidades disponibles en talla ${size}`
                  }
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Estados de TanStack Query: Loading / Error / Empty / Success */}
      {isPending && (
        <div className="aty-product-grid" aria-label="Cargando catálogo">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="aty-skeleton-card">
              <div className="aty-skeleton-media" />
              <div className="aty-skeleton-line" />
              <div className="aty-skeleton-line is-short" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="aty-error-banner" role="alert">
          <p>No pudimos cargar el catálogo de prendas.</p>
          <button
            type="button"
            className="aty-btn aty-btn--primary aty-btn--sm"
            onClick={() => refetch()}
          >
            Reintentar carga
          </button>
        </div>
      )}

      {!isPending && !isError && visibleProducts.length === 0 && (
        <div className="aty-empty-box">
          <p>No hay prendas que coincidan con los filtros seleccionados.</p>
          <button
            type="button"
            className="aty-btn aty-btn--outline"
            onClick={() => {
              setSelectedCategory('Todas');
              setSelectedSize('Todas');
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {!isPending && !isError && visibleProducts.length > 0 && (
        <section className="aty-product-grid" aria-label="Lista de prendas">
          {visibleProducts.map((product) => {
            const totalUnits = SIZES.reduce(
              (acc, s) => acc + (product.stockBySize[s] ?? 0),
              0
            );

            return (
              <article key={product.id} className="aty-product-card">
                <Link
                  to={`/producto/${product.id}`}
                  className="aty-product-card__media"
                >
                  <img src={product.gallery[0]} alt={product.name} />
                  {product.badge && (
                    <span className="aty-product-card__badge">
                      {product.badge}
                    </span>
                  )}
                </Link>

                <div className="aty-product-card__body">
                  <div className="aty-product-card__top">
                    <span className="aty-product-card__cat">
                      {product.category}
                    </span>
                    <span className="aty-product-card__stock">
                      {totalUnits} u. en stock
                    </span>
                  </div>

                  <h2 className="aty-product-card__title">
                    <Link to={`/producto/${product.id}`}>{product.name}</Link>
                  </h2>

                  <p className="aty-product-card__fit">{product.fit}</p>

                  {/* Mini badges de disponibilidad por talla leyendo del diccionario */}
                  <div className="aty-size-dots" aria-label="Stock por talla">
                    {SIZES.map((s) => {
                      const count = product.stockBySize[s] ?? 0;
                      return (
                        <span
                          key={s}
                          className={`aty-size-dot ${
                            count === 0 ? 'is-out' : ''
                          }`}
                          title={`Talla ${s}: ${count} disponibles`}
                        >
                          {s}:{count}
                        </span>
                      );
                    })}
                  </div>

                  <div className="aty-product-card__footer">
                    <strong className="aty-product-card__price aty-tabular">
                      {formatCurrency(product.price)}
                    </strong>
                    <Link
                      to={`/producto/${product.id}`}
                      className="aty-btn aty-btn--primary aty-btn--sm"
                    >
                      Elegir talla →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
