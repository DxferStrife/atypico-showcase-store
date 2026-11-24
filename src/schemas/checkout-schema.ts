import { z } from 'zod/v4';

export const SHIPPING_RATES: { ESTANDAR: number; NACIONAL: number } = {
  ESTANDAR: 3.5,
  NACIONAL: 5.0,
};

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres.'),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'El celular debe tener exactamente 10 dígitos numéricos.'),
  address: z
    .string()
    .trim()
    .min(5, 'La dirección debe tener al menos 5 caracteres.'),
  shippingZone: z.enum(['ESTANDAR', 'NACIONAL']),
  notes: z
    .string()
    .trim()
    .max(150, 'Las notas no pueden superar los 150 caracteres.')
    .optional()
    .default(''),
});

export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;
