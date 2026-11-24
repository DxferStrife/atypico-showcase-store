import { useState } from 'react';
import { Link } from 'react-router';
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

type SortOrder = 'featured' | 'price-asc' | 'price-desc';

const STUDIO_PILLARS: Array<{ code: string; title: string; text: string }> = [
  {
    code: '01',
    title: 'Algodón Heavyweight',
    text: 'Gramajes de 280 a 440 GSM pre-encogidos industrialmente para estructura duradera.',
  },
  {
    code: '02',
    title: 'Lotes por Talla',
    text: 'Stock trazable en tiempo real por cada variante sin sobreventa.',
  },
  {
    code: '03',
    title: 'Despacho Ágil',
    text: 'Envío local estándar desde $3.50 y cobertura nacional en 24–48 horas.',
  },
  {
    code: '04',
    title: 'Ingeniería Studio',
    text: 'Patronaje boxy propio junto con una experiencia web rápida y sin fricción.',
  },
];

export function CatalogPage() {
  const { data: products, isPending, isError, refetch } = useProductsCatalog();
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | Category>(
    'Todas'
  );
  const [selectedSize, setSelectedSize] = useState<'Todas' | Size>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('featured');

  const categoryFiltered = (products ?? []).filter((item) =>
    selectedCategory === 'Todas' ? true : item.category === selectedCategory
  );

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

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleProducts = categoryFiltered
    .filter((item) =>
      selectedSize === 'Todas' ? true : (item.stockBySize[selectedSize] ?? 0) > 0
    )
    .filter((item) =>
      normalizedQuery
        ? item.name.toLowerCase().includes(normalizedQuery) ||
          item.fit.toLowerCase().includes(normalizedQuery) ||
          item.category.toLowerCase().includes(normalizedQuery)
        : true
    )
    .slice()
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

  const featuredProduct =
    (products ?? []).find((item) => item.id === 'tee-boxy-obsidian') ??
    products?.[0];

  return (
    <div className="aty-container aty-page">
      {/* Hero Flagship Asimétrico */}
      <section className="aty-hero aty-hero--flagship">
        <div className="aty-hero__content">
          <span className="aty-hero__eyebrow">
            COLECCIÓN 03 // HEAVYWEIGHT SERIES
          </span>
          <h1 className="aty-hero__title">
            SILUETAS URBANAS DE ALTO GRAMAJE.
          </h1>
          <p className="aty-hero__subtitle">
            Prendas técnicas en ediciones acotadas, confeccionadas con tejidos de
            alto peso y presentadas en una experiencia de compra limpia, precisa y
            sin fricción.
          </p>

          <div className="aty-hero__actions">
            <a href="#catalogo" className="aty-btn aty-btn--primary">
              Explorar colección ↓
            </a>
            <Link
              to={`/producto/${featuredProduct?.id ?? 'tee-boxy-obsidian'}`}
              className="aty-btn aty-btn--hero-ghost"
            >
              Ver pieza insignia →
            </Link>
          </div>

          <div className="aty-hero__stats">
            <div className="aty-stat-box">
              <span className="aty-stat-box__num">280–440</span>
              <span className="aty-stat-box__label">Gramaje GSM</span>
            </div>
            <div className="aty-stat-box">
              <span className="aty-stat-box__num">
                {products ? `${products.length} Piezas` : '6 Piezas'}
              </span>
              <span className="aty-stat-box__label">Cápsula Drop 03</span>
            </div>
            <div className="aty-stat-box">
              <span className="aty-stat-box__num">$3.50</span>
              <span className="aty-stat-box__label">Envío estándar</span>
            </div>
          </div>
        </div>

        {featuredProduct && (
          <Link
            to={`/producto/${featuredProduct.id}`}
            className="aty-hero-feature"
            aria-label={`Ver pieza destacada: ${featuredProduct.name}`}
          >
            <div className="aty-hero-feature__media">
              <img
                src={featuredProduct.gallery[0]}
                alt={featuredProduct.name}
              />
              <span className="aty-hero-feature__tag">
                {featuredProduct.badge ?? 'DESTACADO'}
              </span>
            </div>
            <div className="aty-hero-feature__info">
              <div>
                <span className="aty-hero-feature__cat">PIEZA INSIGNIA</span>
                <strong>{featuredProduct.name}</strong>
              </div>
              <span className="aty-tabular aty-hero-feature__price">
                {formatCurrency(featuredProduct.price)}
              </span>
            </div>
          </Link>
        )}
      </section>

      {/* Pilares de marca */}
      <section className="aty-pillars" aria-label="Estándares de Atypico Studio">
        {STUDIO_PILLARS.map((pillar) => (
          <article key={pillar.code} className="aty-pillar-card">
            <span className="aty-pillar-card__num">{pillar.code}</span>
            <h2 className="aty-pillar-card__title">{pillar.title}</h2>
            <p className="aty-pillar-card__text">{pillar.text}</p>
          </article>
        ))}
      </section>

      {/* Catálogo filtrable */}
      <section id="catalogo" className="aty-catalog-section">
        <div className="aty-section-head">
          <div>
            <span className="aty-eyebrow">ARCHIVO ACTIVO // SERIES 03</span>
            <h2 className="aty-section-title">Colección Completa</h2>
          </div>
          <span className="aty-catalog-count aty-tabular">
            {visibleProducts.length}{' '}
            {visibleProducts.length === 1 ? 'pieza' : 'piezas'} disponibles
          </span>
        </div>

        <div className="aty-filter-bar" aria-label="Filtros de catálogo">
          <div className="aty-filter-bar__row">
            <div className="aty-filter-group">
              <span className="aty-filter-label">Categoría</span>
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
              <span className="aty-filter-label">Talla</span>
              <div className="aty-chip-row">
                <button
                  type="button"
                  className={`aty-chip-btn ${
                    selectedSize === 'Todas' ? 'is-active' : ''
                  }`}
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
                          ? `Sin disponibilidad en talla ${size}`
                          : `${units} unidades disponibles en talla ${size}`
                      }
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="aty-filter-bar__tools">
            <label className="aty-sr-only" htmlFor="catalog-search">
              Buscar prendas
            </label>
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar prenda o fit..."
              className="aty-input aty-search-input"
            />
            <label className="aty-sr-only" htmlFor="catalog-sort">
              Ordenar prendas
            </label>
            <select
              id="catalog-sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="aty-input aty-sort-select"
            >
              <option value="featured">Orden: Destacados</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
            </select>
          </div>
        </div>

        {isPending && (
          <div className="aty-product-grid" aria-label="Cargando colección">
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
            <p>No pudimos cargar las prendas en este momento.</p>
            <button
              type="button"
              className="aty-btn aty-btn--primary aty-btn--sm"
              onClick={() => refetch()}
            >
              Reintentar
            </button>
          </div>
        )}

        {!isPending && !isError && visibleProducts.length === 0 && (
          <div className="aty-empty-box">
            <h3>Sin coincidencias en esta selección</h3>
            <p>
              Ajusta la búsqueda o limpia los filtros para volver a ver toda la
              cápsula disponible.
            </p>
            <button
              type="button"
              className="aty-btn aty-btn--outline"
              onClick={() => {
                setSelectedCategory('Todas');
                setSelectedSize('Todas');
                setSearchQuery('');
                setSortOrder('featured');
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {!isPending && !isError && visibleProducts.length > 0 && (
          <div className="aty-product-grid" aria-label="Prendas del catálogo">
            {visibleProducts.map((product) => {
              const totalUnits = SIZES.reduce(
                (acc, s) => acc + (product.stockBySize[s] ?? 0),
                0
              );
              const isLowStock = totalUnits > 0 && totalUnits <= 9;

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
                      <span
                        className={`aty-product-card__stock ${
                          isLowStock ? 'is-low' : ''
                        }`}
                      >
                        {isLowStock ? 'Últimas piezas' : `${totalUnits} u.`}
                      </span>
                    </div>

                    <h3 className="aty-product-card__title">
                      <Link to={`/producto/${product.id}`}>{product.name}</Link>
                    </h3>

                    <p className="aty-product-card__fit">{product.fit}</p>

                    <div className="aty-size-dots" aria-label="Tallas disponibles">
                      {SIZES.map((s) => {
                        const count = product.stockBySize[s] ?? 0;
                        return (
                          <span
                            key={s}
                            className={`aty-size-dot ${
                              count === 0 ? 'is-out' : ''
                            }`}
                            title={
                              count === 0
                                ? `Talla ${s}: Agotada`
                                : `Talla ${s}: ${count} disponibles`
                            }
                          >
                            {s}
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
                        Ver prenda →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Bloque Editorial de Capacidades — Manifiesto Atypico Studio */}
      <section id="estudio" className="aty-studio-band">
        <div className="aty-studio-band__head">
          <div>
            <span className="aty-hero__eyebrow">ATYPICO STUDIO // CAPACIDADES</span>
            <h2 className="aty-studio-band__title">
              DISEÑO TEXTIL Y COMERCIO DIGITAL SIN PLANTILLAS GENÉRICAS.
            </h2>
          </div>
          <p className="aty-studio-band__lead">
            Construimos colecciones urbanas de alto gramaje y su infraestructura
            e-commerce completa: desde la dirección de arte y control estricto de
            variantes hasta la liquidación inmediata del pedido.
          </p>
        </div>

        <div className="aty-studio-band__grid">
          <article className="aty-studio-pillar">
            <span className="aty-studio-pillar__num">01 // IDENTIDAD</span>
            <h3>Dirección de Arte Brutalista</h3>
            <p>
              Sistema visual gobernado por tokens tipográficos, alto contraste WCAG y
              fotografía técnica enfocada en silueta y tejido.
            </p>
          </article>
          <article className="aty-studio-pillar">
            <span className="aty-studio-pillar__num">02 // CONVERSIÓN</span>
            <h3>Inventario Exacto por Variante</h3>
            <p>
              Validación por talla y color antes de añadir a la bolsa, vista rápida
              lateral, confirmación ante borrados y cross-selling contextual.
            </p>
          </article>
          <article className="aty-studio-pillar">
            <span className="aty-studio-pillar__num">03 // PRODUCCIÓN</span>
            <h3>Checkout Reactivo y Comprobante</h3>
            <p>
              Validación instantánea campo a campo, desglose transparente de envío y
              comprobante persistente listo para transferencia y WhatsApp.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
