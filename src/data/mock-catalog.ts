// 🧭 PASO 1: Datos Moqueados — Lista de Productos + Diccionario Clave-Valor de Stock
// -----------------------------------------------------------------------------
// Este archivo separa explícitamente el catálogo descriptivo (PRODUCTS_LIST)
// del inventario disponible por talla (PRODUCT_STOCK_DICTIONARY), siguiendo el
// patrón clave-valor pedido para practicar consultas por ID y control de stock.

import type { Product, Size, StockDictionary } from '../types/ecommerce';

/**
 * Crea ilustraciones SVG urbanas en data-URI limpias y de alto contraste
 * para garantizar que las imágenes del prototipo carguen 100% offline y rápido.
 */
function createEditorialArtwork(
  label: string,
  subtitle: string,
  bgHex: string,
  accentHex: string,
  silhouette: 'hoodie' | 'tee' | 'cargo' | 'cap' | 'bag'
): string {
  const shapes: {
    hoodie: string;
    tee: string;
    cargo: string;
    cap: string;
    bag: string;
  } = {
    hoodie: `<path d="M130 120 L185 95 L215 110 L245 95 L300 120 L340 210 L300 228 L278 175 L278 360 L152 360 L152 175 L130 228 L90 210 Z" fill="${accentHex}" opacity="0.92"/><rect x="175" y="240" width="80" height="48" rx="6" fill="none" stroke="${bgHex}" stroke-width="4"/><circle cx="215" cy="96" r="24" fill="none" stroke="${accentHex}" stroke-width="10"/>`,
    tee: `<path d="M125 115 L175 95 Q215 122 255 95 L305 115 L345 188 L302 208 L278 165 L278 355 L152 355 L152 165 L128 208 L85 188 Z" fill="${accentHex}" opacity="0.92"/><line x1="168" y1="205" x2="262" y2="205" stroke="${bgHex}" stroke-width="4"/>`,
    cargo: `<path d="M148 95 L282 95 L298 365 L235 365 L215 215 L195 365 L132 365 Z" fill="${accentHex}" opacity="0.92"/><rect x="132" y="200" width="38" height="62" rx="3" fill="${bgHex}" opacity="0.35"/><rect x="260" y="200" width="38" height="62" rx="3" fill="${bgHex}" opacity="0.35"/>`,
    cap: `<path d="M120 230 C120 140 310 140 310 230 L345 255 C280 272 150 270 115 245 Z" fill="${accentHex}" opacity="0.92"/><line x1="145" y1="225" x2="295" y2="225" stroke="${bgHex}" stroke-width="4"/>`,
    bag: `<rect x="130" y="150" width="170" height="190" rx="14" fill="${accentHex}" opacity="0.92"/><path d="M165 150 C165 90 265 90 265 150" fill="none" stroke="${accentHex}" stroke-width="12"/><rect x="155" y="215" width="120" height="75" rx="6" fill="none" stroke="${bgHex}" stroke-width="4"/>`,
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 480">
    <rect width="430" height="480" fill="${bgHex}"/>
    <rect x="18" y="18" width="394" height="444" fill="none" stroke="${accentHex}" stroke-opacity="0.22" stroke-width="1.5"/>
    ${shapes[silhouette]}
    <text x="34" y="54" font-family="monospace" font-size="13" font-weight="700" fill="${accentHex}" letter-spacing="2">ATYPICO // STUDIO</text>
    <text x="34" y="424" font-family="sans-serif" font-size="18" font-weight="800" fill="${accentHex}">${label}</text>
    <text x="34" y="446" font-family="monospace" font-size="12" fill="${accentHex}" opacity="0.72">${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * 1) LISTA DE PRODUCTOS (Información descriptiva, precios y variantes)
 */
export const PRODUCTS_LIST: Product[] = [
  {
    id: 'tee-boxy-obsidian',
    name: 'Camiseta Boxy Fit Obsidian 280g',
    category: 'Camisetas Oversize',
    price: 34.0,
    fit: 'Boxy Fit · Hombro caído',
    composition: '100% Algodón peinado pesado 280 GSM',
    description:
      'Silueta cuadrada de caída estructurada con cuello ribeteado grueso de 3 cm y pre-encogido industrial para conservar el volumen urbano lavado tras lavado.',
    colors: ['Negro Tinta', 'Hueso Mineral'],
    defaultColor: 'Negro Tinta',
    badge: 'TOP DROP',
    gallery: [
      createEditorialArtwork('OBSIDIAN BOXY TEE', 'FRONT // 280 GSM HEAVYWEIGHT', '#121212', '#F7F6F2', 'tee'),
      createEditorialArtwork('DETALLE TEXTIL', 'CUELLO RIB 3CM + COSTURA DOBLE', '#E35336', '#0D0D0D', 'tee'),
      createEditorialArtwork('BACK PRINT EDITION', 'SILUETA CUADRADA URBANA', '#242320', '#E35336', 'tee'),
    ],
    measurements: {
      S: { chestCm: 56, lengthCm: 67, shoulderCm: 52 },
      M: { chestCm: 59, lengthCm: 70, shoulderCm: 55 },
      L: { chestCm: 62, lengthCm: 73, shoulderCm: 58 },
      XL: { chestCm: 65, lengthCm: 76, shoulderCm: 61 },
    },
    complementaryIds: ['cargo-tactical-slate', 'cap-distressed-raw'],
  },
  {
    id: 'hoodie-heavy-concrete',
    name: 'Hoodie Heavyweight Concrete',
    category: 'Camisetas Oversize',
    price: 68.0,
    fit: 'Oversize Estructurado · Sin cordón',
    composition: '85% Algodón French Terry 440 GSM / 15% Poliéster',
    description:
      'Sudadera de alto gramaje con capucha de doble capa autoportante, bolsillo canguro reforzado y puños acanalados de recuperación elástica.',
    colors: ['Gris Concreto', 'Negro Carbón'],
    defaultColor: 'Gris Concreto',
    badge: 'LIMITED',
    gallery: [
      createEditorialArtwork('CONCRETE HOODIE', '440 GSM FRENCH TERRY', '#2B2A27', '#F7F6F2', 'hoodie'),
      createEditorialArtwork('CAPUCHA DOBLE', 'SIN CORDONES · ESTÉTICA LIMPIA', '#0D0D0D', '#E35336', 'hoodie'),
      createEditorialArtwork('FIT STUDIO', 'CAÍDA RELAJADA DE HOMBROS', '#EAE6DC', '#111111', 'hoodie'),
    ],
    measurements: {
      S: { chestCm: 60, lengthCm: 68, shoulderCm: 56 },
      M: { chestCm: 63, lengthCm: 71, shoulderCm: 59 },
      L: { chestCm: 66, lengthCm: 74, shoulderCm: 62 },
      XL: { chestCm: 69, lengthCm: 77, shoulderCm: 65 },
    },
    complementaryIds: ['cargo-wide-olive', 'bag-crossbody-nylon'],
  },
  {
    id: 'cargo-tactical-slate',
    name: 'Pantalón Cargo Tactical Slate',
    category: 'Pantalones Cargo',
    price: 58.0,
    fit: 'Relaxed Wide Leg · Ajuste en tobillo',
    composition: '100% Twill Ripstop Antidesgarro 310 GSM',
    description:
      'Pantalón utilitario con seis bolsillos funcionales de fuelle lateral, pinzas articuladas en rodilla y cordón tensor interno en los bajos para estilizar sobre sneakers.',
    colors: ['Pizarra Oscuro', 'Arena'],
    defaultColor: 'Pizarra Oscuro',
    badge: 'BESTSELLER',
    gallery: [
      createEditorialArtwork('TACTICAL CARGO', 'RIPSTOP 310 GSM · 6 BOLSILLOS', '#1D2024', '#F7F6F2', 'cargo'),
      createEditorialArtwork('FUELLE LATERAL', 'PINZAS ARTICULADAS EN RODILLA', '#E35336', '#0D0D0D', 'cargo'),
      createEditorialArtwork('AJUSTE TOBILLO', 'CORDÓN TENSOR DE BAJOS', '#EFECE6', '#111111', 'cargo'),
    ],
    measurements: {
      S: { chestCm: 39, lengthCm: 101, shoulderCm: 29 },
      M: { chestCm: 42, lengthCm: 103, shoulderCm: 31 },
      L: { chestCm: 45, lengthCm: 105, shoulderCm: 33 },
      XL: { chestCm: 48, lengthCm: 107, shoulderCm: 35 },
    },
    complementaryIds: ['tee-boxy-obsidian', 'bag-crossbody-nylon'],
  },
  {
    id: 'cargo-wide-olive',
    name: 'Pantalón Cargo Wide Olive',
    category: 'Pantalones Cargo',
    price: 62.0,
    fit: 'Baggy Urbano · Cintura elástica oculta',
    composition: '98% Algodón Gabardina Lavada / 2% Elastano',
    description:
      'Corte ancho contemporáneo con lavado enzimático vintage, solapas con broche metálico oculto y caída amplia para combinar con prendas boxy fit.',
    colors: ['Verde Oliva', 'Negro Lavado'],
    defaultColor: 'Verde Oliva',
    gallery: [
      createEditorialArtwork('WIDE OLIVE CARGO', 'BAGGY FIT · LAVADO VINTAGE', '#353C2C', '#F7F6F2', 'cargo'),
      createEditorialArtwork('BROCHE OCULTO', 'GABARDINA DE ALTO TRÁFICO', '#111111', '#E35336', 'cargo'),
    ],
    measurements: {
      S: { chestCm: 40, lengthCm: 102, shoulderCm: 30 },
      M: { chestCm: 43, lengthCm: 104, shoulderCm: 32 },
      L: { chestCm: 46, lengthCm: 106, shoulderCm: 34 },
      XL: { chestCm: 49, lengthCm: 108, shoulderCm: 36 },
    },
    complementaryIds: ['hoodie-heavy-concrete', 'cap-distressed-raw'],
  },
  {
    id: 'cap-distressed-raw',
    name: 'Gorra Distressed Studio 01',
    category: 'Accesorios',
    price: 24.0,
    fit: '6 Paneles · Visera pre-curvada',
    composition: '100% Lona de Algodón Lavado 12 oz',
    description:
      'Gorra desestructurada con desgaste sutil en visera, bordado frontal en alto relieve y hebilla metálica trasera para ajuste personalizado.',
    colors: ['Carbón Lavado', 'Terracota'],
    defaultColor: 'Carbón Lavado',
    gallery: [
      createEditorialArtwork('STUDIO CAP 01', 'BORDADO 3D · LONA 12 OZ', '#1A1917', '#E35336', 'cap'),
      createEditorialArtwork('HEBILLA METÁLICA', 'CORONA BAJA DESESTRUCTURADA', '#EFECE6', '#0D0D0D', 'cap'),
    ],
    measurements: {
      S: { chestCm: 55, lengthCm: 11, shoulderCm: 16 },
      M: { chestCm: 57, lengthCm: 12, shoulderCm: 17 },
      L: { chestCm: 59, lengthCm: 12, shoulderCm: 18 },
      XL: { chestCm: 61, lengthCm: 13, shoulderCm: 19 },
    },
    complementaryIds: ['tee-boxy-obsidian', 'bag-crossbody-nylon'],
  },
  {
    id: 'bag-crossbody-nylon',
    name: 'Bolso Crossbody Utility Ripstop',
    category: 'Accesorios',
    price: 39.0,
    fit: 'Correa ajustable · Mosquetón táctico',
    composition: 'Nylon Balístico 600D repelente al agua',
    description:
      'Bandolera compacta con compartimento principal sellado, bolsillo frontal de acceso rápido y correa ancha con identidad Atypico Studio.',
    colors: ['Negro Técnico'],
    defaultColor: 'Negro Técnico',
    badge: 'NEW',
    gallery: [
      createEditorialArtwork('UTILITY CROSSBODY', 'NYLON BALÍSTICO REPELENTE', '#0D0D0D', '#F7F6F2', 'bag'),
      createEditorialArtwork('CIERRE SELLADO', 'BOLSILLO DE ACCESO RÁPIDO', '#E35336', '#0D0D0D', 'bag'),
    ],
    measurements: {
      S: { chestCm: 22, lengthCm: 16, shoulderCm: 7 },
      M: { chestCm: 24, lengthCm: 18, shoulderCm: 8 },
      L: { chestCm: 24, lengthCm: 18, shoulderCm: 8 },
      XL: { chestCm: 26, lengthCm: 20, shoulderCm: 9 },
    },
    complementaryIds: ['cargo-tactical-slate', 'tee-boxy-obsidian'],
  },
];

/**
 * 2) DICCIONARIO CLAVE-VALOR DE STOCK (productId -> { S, M, L, XL })
 * Incluye intencionalmente tallas en 0 y tallas con pocas unidades (1, 2, 3)
 * para probar el bloqueo preventivo tanto en el catálogo como en detalle y bolsa.
 */
export const PRODUCT_STOCK_DICTIONARY: StockDictionary = {
  'tee-boxy-obsidian': { S: 3, M: 5, L: 2, XL: 0 },
  'hoodie-heavy-concrete': { S: 0, M: 4, L: 3, XL: 1 },
  'cargo-tactical-slate': { S: 2, M: 6, L: 4, XL: 2 },
  'cargo-wide-olive': { S: 1, M: 0, L: 5, XL: 3 },
  'cap-distressed-raw': { S: 4, M: 8, L: 2, XL: 0 },
  'bag-crossbody-nylon': { S: 2, M: 5, L: 3, XL: 1 },
};

/**
 * Helper puro para consultar cuántas unidades existen para una prenda y talla.
 */
export function getStockByVariant(productId: string, size: Size): number {
  return PRODUCT_STOCK_DICTIONARY[productId]?.[size] ?? 0;
}

/**
 * Helper puro para sumar el stock total disponible de una prenda en todas sus tallas.
 */
export function getTotalProductStock(productId: string): number {
  const sizesMap = PRODUCT_STOCK_DICTIONARY[productId];
  if (!sizesMap) return 0;
  return Object.values(sizesMap).reduce((sum, count) => sum + count, 0);
}
