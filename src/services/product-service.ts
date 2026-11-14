// 🧭 PASO 2: Servicio Asíncrono de Catálogo (Simulación limpia de fuente remota)
// -----------------------------------------------------------------------------
// Combina la lista de productos (PRODUCTS_LIST) con el diccionario de stock
// (PRODUCT_STOCK_DICTIONARY) para que TanStack Query administre la carga, caché
// y estados de la interfaz sin duplicar estos datos en Zustand.

import { PRODUCT_STOCK_DICTIONARY, PRODUCTS_LIST } from '../data/mock-catalog';
import type { ProductWithStock } from '../types/ecommerce';

const SIMULATED_NETWORK_DELAY_MS = 180;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProductsCatalog(): Promise<ProductWithStock[]> {
  await sleep(SIMULATED_NETWORK_DELAY_MS);
  return PRODUCTS_LIST.map((product) => ({
    ...product,
    stockBySize: PRODUCT_STOCK_DICTIONARY[product.id] ?? {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    },
  }));
}

export async function fetchProductById(productId: string): Promise<ProductWithStock> {
  await sleep(SIMULATED_NETWORK_DELAY_MS);
  const found = PRODUCTS_LIST.find((item) => item.id === productId);
  if (!found) {
    throw new Error(`No se encontró la prenda con identificador "${productId}".`);
  }

  return {
    ...found,
    stockBySize: PRODUCT_STOCK_DICTIONARY[found.id] ?? {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    },
  };
}
