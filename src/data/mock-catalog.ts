import type { Product, Size, StockDictionary } from '../types/ecommerce';

/**
 * Genera láminas lookbook vectoriales de alto contraste con retícula técnica,
 * marcas de registro y detalles de confección para la galería del catálogo.
 */
function createEditorialArtwork(
  label: string,
  subtitle: string,
  bgHex: string,
  accentHex: string,
  silhouette: 'hoodie' | 'tee' | 'cargo' | 'cap' | 'bag',
  editionCode = 'SERIES 03'
): string {
  const shapes: {
    hoodie: string;
    tee: string;
    cargo: string;
    cap: string;
    bag: string;
  } = {
    hoodie: `<path d="M126 122 L184 94 L215 112 L246 94 L304 122 L346 212 L302 232 L280 176 L280 356 L150 356 L150 176 L128 232 L84 212 Z" fill="${accentHex}" fill-opacity="0.94"/><path d="M150 176 L150 356 M280 176 L280 356 M184 94 Q215 130 246 94" fill="none" stroke="${bgHex}" stroke-width="2.5" opacity="0.55"/><rect x="173" y="238" width="84" height="52" rx="6" fill="none" stroke="${bgHex}" stroke-width="3.5"/><path d="M178 102 C188 70 242 70 252 102" fill="none" stroke="${accentHex}" stroke-width="11" stroke-linecap="round"/>`,
    tee: `<path d="M122 116 L174 94 Q215 124 256 94 L308 116 L348 188 L304 210 L280 166 L280 354 L150 354 L150 166 L126 210 L82 188 Z" fill="${accentHex}" fill-opacity="0.94"/><path d="M168 100 Q215 132 262 100" fill="none" stroke="${bgHex}" stroke-width="4"/><line x1="164" y1="196" x2="266" y2="196" stroke="${bgHex}" stroke-width="3" opacity="0.7"/><line x1="150" y1="336" x2="280" y2="336" stroke="${bgHex}" stroke-width="2" stroke-dasharray="6 4" opacity="0.5"/>`,
    cargo: `<path d="M146 94 L284 94 L302 362 L236 362 L215 212 L194 362 L128 362 Z" fill="${accentHex}" fill-opacity="0.94"/><rect x="128" y="196" width="40" height="66" rx="4" fill="${bgHex}" fill-opacity="0.34" stroke="${bgHex}" stroke-width="2"/><rect x="262" y="196" width="40" height="66" rx="4" fill="${bgHex}" fill-opacity="0.34" stroke="${bgHex}" stroke-width="2"/><line x1="148" y1="120" x2="282" y2="120" stroke="${bgHex}" stroke-width="2.5" opacity="0.5"/>`,
    cap: `<path d="M118 232 C118 136 312 136 312 232 L348 256 C282 276 148 274 112 246 Z" fill="${accentHex}" fill-opacity="0.94"/><path d="M166 154 L215 224 L264 154" fill="none" stroke="${bgHex}" stroke-width="2.5" opacity="0.45"/><line x1="142" y1="226" x2="298" y2="226" stroke="${bgHex}" stroke-width="3.5"/>`,
    bag: `<rect x="128" y="150" width="174" height="190" rx="14" fill="${accentHex}" fill-opacity="0.94"/><path d="M164 150 C164 88 266 88 266 150" fill="none" stroke="${accentHex}" stroke-width="11"/><rect x="154" y="212" width="122" height="78" rx="6" fill="none" stroke="${bgHex}" stroke-width="3.5"/><line x1="154" y1="234" x2="276" y2="234" stroke="${bgHex}" stroke-width="2.5" opacity="0.6"/>`,
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 480">
    <defs>
      <pattern id="aty-grid" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="${accentHex}" stroke-opacity="0.06" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="430" height="480" fill="${bgHex}"/>
    <rect width="430" height="480" fill="url(#aty-grid)"/>
    <rect x="18" y="18" width="394" height="444" fill="none" stroke="${accentHex}" stroke-opacity="0.24" stroke-width="1.2"/>
    <path d="M18 32 L18 18 L32 18 M398 18 L412 18 L412 32 M18 448 L18 462 L32 462 M398 462 L412 462 L412 448" fill="none" stroke="${accentHex}" stroke-opacity="0.55" stroke-width="2"/>
    ${shapes[silhouette]}
    <text x="34" y="52" font-family="monospace" font-size="12" font-weight="700" fill="${accentHex}" letter-spacing="2.2">ATYPICO // STUDIO</text>
    <text x="396" y="52" text-anchor="end" font-family="monospace" font-size="11" font-weight="700" fill="${accentHex}" opacity="0.72" letter-spacing="1.5">${editionCode}</text>
    <line x1="34" y1="392" x2="396" y2="392" stroke="${accentHex}" stroke-opacity="0.22" stroke-width="1"/>
    <text x="34" y="422" font-family="sans-serif" font-size="18" font-weight="800" fill="${accentHex}" letter-spacing="-0.3">${label}</text>
    <text x="34" y="444" font-family="monospace" font-size="11" fill="${accentHex}" opacity="0.78" letter-spacing="0.8">${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Catálogo oficial de prendas de la cápsula actual.
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
      createEditorialArtwork('OBSIDIAN BOXY TEE', 'FRONT // 280 GSM HEAVYWEIGHT', '#121212', '#F7F6F2', 'tee', '280 GSM'),
      createEditorialArtwork('DETALLE TEXTIL', 'CUELLO RIB 3CM + COSTURA DOBLE', '#BF381D', '#FFFFFF', 'tee', '02 / 03'),
      createEditorialArtwork('BACK EDITION', 'SILUETA CUADRADA URBANA', '#242320', '#E35336', 'tee', '03 / 03'),
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
      createEditorialArtwork('CONCRETE HOODIE', '440 GSM FRENCH TERRY', '#2B2A27', '#F7F6F2', 'hoodie', '440 GSM'),
      createEditorialArtwork('CAPUCHA DOBLE', 'SIN CORDONES · ESTÉTICA LIMPIA', '#0D0D0D', '#E35336', 'hoodie', '02 / 03'),
      createEditorialArtwork('STUDIO FIT', 'CAÍDA RELAJADA DE HOMBROS', '#EAE6DC', '#111111', 'hoodie', '03 / 03'),
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
      createEditorialArtwork('TACTICAL CARGO', 'RIPSTOP 310 GSM · 6 BOLSILLOS', '#1D2024', '#F7F6F2', 'cargo', '310 GSM'),
      createEditorialArtwork('FUELLE LATERAL', 'PINZAS ARTICULADAS EN RODILLA', '#BF381D', '#FFFFFF', 'cargo', '02 / 03'),
      createEditorialArtwork('AJUSTE TOBILLO', 'CORDÓN TENSOR DE BAJOS', '#EFECE6', '#111111', 'cargo', '03 / 03'),
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
      createEditorialArtwork('WIDE OLIVE CARGO', 'BAGGY FIT · LAVADO VINTAGE', '#353C2C', '#F7F6F2', 'cargo', 'SERIES 03'),
      createEditorialArtwork('BROCHE OCULTO', 'GABARDINA DE ALTO TRÁFICO', '#111111', '#E35336', 'cargo', '02 / 02'),
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
      createEditorialArtwork('STUDIO CAP 01', 'BORDADO 3D · LONA 12 OZ', '#1A1917', '#E35336', 'cap', '12 OZ'),
      createEditorialArtwork('HEBILLA METÁLICA', 'CORONA BAJA DESESTRUCTURADA', '#EFECE6', '#0D0D0D', 'cap', '02 / 02'),
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
      createEditorialArtwork('UTILITY CROSSBODY', 'NYLON BALÍSTICO REPELENTE', '#0D0D0D', '#F7F6F2', 'bag', '600D'),
      createEditorialArtwork('CIERRE SELLADO', 'BOLSILLO DE ACCESO RÁPIDO', '#BF381D', '#FFFFFF', 'bag', '02 / 02'),
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
 * Inventario por prenda y talla (`productId -> { S, M, L, XL }`).
 */
export const PRODUCT_STOCK_DICTIONARY: StockDictionary = {
  'tee-boxy-obsidian': { S: 3, M: 5, L: 2, XL: 0 },
  'hoodie-heavy-concrete': { S: 0, M: 4, L: 3, XL: 1 },
  'cargo-tactical-slate': { S: 2, M: 6, L: 4, XL: 2 },
  'cargo-wide-olive': { S: 1, M: 0, L: 5, XL: 3 },
  'cap-distressed-raw': { S: 4, M: 8, L: 2, XL: 0 },
  'bag-crossbody-nylon': { S: 2, M: 5, L: 3, XL: 1 },
};

export function getStockByVariant(productId: string, size: Size): number {
  return PRODUCT_STOCK_DICTIONARY[productId]?.[size] ?? 0;
}

export function getTotalProductStock(productId: string): number {
  const sizesMap = PRODUCT_STOCK_DICTIONARY[productId];
  if (!sizesMap) return 0;
  return Object.values(sizesMap).reduce((sum, count) => sum + count, 0);
}
