// =============================================================================
// 🧭 PASO 5B: Lógica de Formulario con @mantine/form + Zod v4
// =============================================================================
// Los campos HTML y mensajes de error visuales ya están maquetados con CSS puro.
//
// TUS TAREAS AQUÍ (// TODO PASO 5B):
//   1. Conecta `schemaResolver(checkoutSchema, { sync: true })` en `useForm` y
//      activa `validateInputOnChange: true` para validar en tiempo real.
//   2. Calcula `subtotal`, `shippingCost` (leyendo `SHIPPING_RATES[form.values.shippingZone]`)
//      y `total = subtotal + shippingCost`.
//   3. En `handleSubmit`: llama `const order = confirmOrder(validatedValues, shippingCost)`
//      y redirige con `navigate(\`/confirmacion/${order.orderId}\`)`.
// =============================================================================

import { useForm, schemaResolver } from '@mantine/form';
import { Link, useNavigate } from 'react-router';
import { LearningBanner } from '../components/common/LearningBanner';
import { checkoutSchema, SHIPPING_RATES } from '../schemas/checkout-schema';
import { formatCurrency, useCartStore } from '../stores/use-cart-store';
import type { CheckoutFormValues } from '../types/ecommerce';

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const confirmOrder = useCartStore((s) => s.confirmOrder);

  const form = useForm<CheckoutFormValues>({
    mode: 'controlled',
    initialValues: {
      fullName: '',
      phone: '',
      address: '',
      shippingZone: 'ESTANDAR',
      notes: '',
    },
    validate: schemaResolver(checkoutSchema, { sync: true }),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = SHIPPING_RATES[form.values.shippingZone];
  const total = subtotal + shippingCost;

  const handleSubmit = form.onSubmit((validatedValues) => {
    const order = confirmOrder(validatedValues, shippingCost);
    navigate(`/confirmacion/${order.orderId}`);
  });

  if (items.length === 0) {
    return (
      <div className="aty-container aty-page">
        <div className="aty-empty-box">
          <h2>Tu bolsa está vacía</h2>
          <p>
            Necesitas agregar al menos una prenda antes de completar tus datos
            de entrega en el checkout.
          </p>
          <Link to="/" className="aty-btn aty-btn--primary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="aty-container aty-page">
      <div className="aty-page-head">
        <div>
          <span className="aty-eyebrow">PASO FINAL // DATOS Y LIQUIDACIÓN</span>
          <h1>Checkout y Entrega</h1>
        </div>
        <Link to="/carrito" className="aty-btn aty-btn--outline aty-btn--sm">
          ← Editar bolsa
        </Link>
      </div>

      <LearningBanner
        step="PASO 7 · CHECKOUT (@mantine/form + Zod v4)"
        title="Validación en tiempo real con CSS puro en :root"
        tools={['useForm()', 'schemaResolver(checkoutSchema, { sync: true })', 'validateInputOnChange: true']}
        description="Mantine Form administra solo la lógica y errores del formulario (sin estilos de Mantine UI). Prueba escribir un nombre corto, un celular de menos de 10 dígitos o una dirección breve para ver el feedback rojo instantáneo."
      />

      <div className="aty-two-col">
        <form className="aty-form-card" onSubmit={handleSubmit} noValidate>
          <h2 className="aty-form-card__title">Datos del Comprador y Entrega</h2>

          {/* Campo 1: Nombre completo (>= 3 caracteres) */}
          <div className="aty-field">
            <label htmlFor="checkout-fullName" className="aty-label">
              Nombre completo *
            </label>
            <input
              id="checkout-fullName"
              type="text"
              placeholder="Ej. Fernando Mendoza"
              className={`aty-input ${
                form.errors.fullName ? 'aty-input--error' : ''
              }`}
              {...form.getInputProps('fullName')}
            />
            {form.errors.fullName && (
              <p className="aty-error-msg" role="alert">
                {form.errors.fullName}
              </p>
            )}
          </div>

          {/* Campo 2: Celular (exactamente 10 dígitos) */}
          <div className="aty-field">
            <label htmlFor="checkout-phone" className="aty-label">
              Celular de contacto (10 dígitos) *
            </label>
            <input
              id="checkout-phone"
              type="tel"
              inputMode="numeric"
              placeholder="Ej. 0991234567"
              maxLength={10}
              className={`aty-input ${
                form.errors.phone ? 'aty-input--error' : ''
              }`}
              {...form.getInputProps('phone')}
            />
            {form.errors.phone && (
              <p className="aty-error-msg" role="alert">
                {form.errors.phone}
              </p>
            )}
          </div>

          {/* Campo 3: Dirección (>= 5 caracteres) */}
          <div className="aty-field">
            <label htmlFor="checkout-address" className="aty-label">
              Dirección exacta de entrega *
            </label>
            <input
              id="checkout-address"
              type="text"
              placeholder="Ej. Av. Amazonas N24-102 y Colón, Edif. Studio"
              className={`aty-input ${
                form.errors.address ? 'aty-input--error' : ''
              }`}
              {...form.getInputProps('address')}
            />
            {form.errors.address && (
              <p className="aty-error-msg" role="alert">
                {form.errors.address}
              </p>
            )}
          </div>

          {/* Campo 4: Costo de envío (Estándar único $3.50 por defecto u opción nacional $5.00) */}
          <div className="aty-field">
            <label htmlFor="checkout-zone" className="aty-label">
              Cobertura y tarifa de envío (RN-10)
            </label>
            <select
              id="checkout-zone"
              className="aty-input"
              {...form.getInputProps('shippingZone')}
            >
              <option value="ESTANDAR">
                Envío Estándar / Local ($3.50)
              </option>
              <option value="NACIONAL">
                Envío Nacional Interprovincial ($5.00)
              </option>
            </select>
          </div>

          {/* Campo 5: Notas opcionales */}
          <div className="aty-field">
            <label htmlFor="checkout-notes" className="aty-label">
              Referencias o notas de entrega (opcional)
            </label>
            <textarea
              id="checkout-notes"
              rows={3}
              placeholder="Ej. Llamar al llegar a garita..."
              className={`aty-input ${
                form.errors.notes ? 'aty-input--error' : ''
              }`}
              {...form.getInputProps('notes')}
            />
            {form.errors.notes && (
              <p className="aty-error-msg" role="alert">
                {form.errors.notes}
              </p>
            )}
          </div>

          <div className="aty-payment-note">
            <strong>Método de pago (Demo Showcase):</strong> Transferencia
            bancaria directa y validación del pedido en pantalla (sin pasarela
            de tarjeta).
          </div>

          <button
            type="submit"
            className="aty-btn aty-btn--primary aty-btn--full"
          >
            Confirmar Pedido ({formatCurrency(total)}) →
          </button>
        </form>

        {/* Resumen financiero visible y claro */}
        <aside className="aty-summary-panel" aria-label="Resumen de liquidación">
          <h2>Resumen del Pedido</h2>

          <ul className="aty-mini-order-list">
            {items.map((item) => (
              <li key={item.id} className="aty-mini-order-item">
                <div>
                  <strong>{item.name}</strong>
                  <span>
                    Talla {item.size} · {item.color} × {item.quantity}
                  </span>
                </div>
                <strong className="aty-tabular">
                  {formatCurrency(item.price * item.quantity)}
                </strong>
              </li>
            ))}
          </ul>

          <div className="aty-summary-rows">
            <div className="aty-summary-line">
              <span>Subtotal</span>
              <strong className="aty-tabular">{formatCurrency(subtotal)}</strong>
            </div>
            <div className="aty-summary-line">
              <span>Envío</span>
              <strong className="aty-tabular">
                {formatCurrency(shippingCost)}
              </strong>
            </div>
          </div>

          <div className="aty-summary-total">
            <span>Total a pagar</span>
            <strong className="aty-tabular">{formatCurrency(total)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
