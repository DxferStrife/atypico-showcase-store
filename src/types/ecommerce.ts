/**
 * Tipos de dominio de Atypico Showcase Store.
 * Define las estructuras exactas que conectan el catálogo, el diccionario de stock,
 * el store de Zustand y el formulario de checkout.
 */

export type Size = 'S' | 'M' | 'L' | 'XL';

export type Category =
  | 'Camisetas Oversize'
  | 'Pantalones Cargo'
  | 'Accesorios';

export type GarmentMeasurement = {
  chestCm: number;
  lengthCm: number;
  shoulderCm: number;
};

export type SizeMeasurements = {
  S: GarmentMeasurement;
  M: GarmentMeasurement;
  L: GarmentMeasurement;
  XL: GarmentMeasurement;
};

export type SizeStock = {
  S: number;
  M: number;
  L: number;
  XL: number;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  fit: string;
  composition: string;
  description: string;
  colors: string[];
  defaultColor: string;
  gallery: string[];
  badge?: string;
  measurements: SizeMeasurements;
  complementaryIds: string[];
};

/**
 * Diccionario clave-valor de stock por prenda y talla.
 * Clave externa: productId
 * Valor interno: mapa de existencias { S, M, L, XL }
 */
export type StockDictionary = {
  [productId: string]: SizeStock;
};

export type ProductWithStock = Product & {
  stockBySize: SizeStock;
};

export type CartItem = {
  id: string; // Clave compuesta única: `${productId}__${size}__${color}`
  productId: string;
  name: string;
  price: number;
  size: Size;
  color: string;
  quantity: number;
  imageUrl: string;
};

export type CheckoutFormValues = {
  fullName: string;
  phone: string;
  address: string;
  shippingZone: 'ESTANDAR' | 'NACIONAL';
  notes: string;
};

export type OrderSnapshot = {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  customer: CheckoutFormValues;
  subtotal: number;
  shippingCost: number;
  total: number;
};
