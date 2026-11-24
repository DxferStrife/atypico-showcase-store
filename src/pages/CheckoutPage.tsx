import { useForm, schemaResolver } from '@mantine/form';
import { Link, useNavigate } from 'react-router';
import { CheckoutStepper } from '../components/common/CheckoutStepper';
import { checkoutSchema, SHIPPING_RATES } from '../schemas/checkout-schema';
import { formatCurrency, useCartStore } from '../stores/use-cart-store';
import type { CheckoutFormValues } from '../types/ecommerce';

const SHIPPING_OPTIONS: Array<{
  value: 'ESTANDAR' | 'NACIONAL';
  title: string;
  eta: string;
  price: number;
}> = [
  {
    value: 'ESTANDAR',
    title: 'Envío Estándar Urbano',
    eta: 'Entrega 24–48 horas',
    price: SHIPPING_RATES.ESTANDAR,
  },
  {
    value: 'NACIONAL',
    title: 'Envío Nacional Courier',
    eta: 'Entrega 48–72 horas',
    price: SHIPPING_RATES.NACIONAL,
  },
];

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
        <CheckoutStepper activeStep={2} />
        <div className="aty-empty-box">
          <h1>Tu bolsa está vacía</h1>
          <p>
            Añade al menos una prenda de la colección antes de completar tus datos
            de envío.
          </p>
          <Link to="/" className="aty-btn aty-btn--primary">
            Explorar colección
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="aty-container aty-page">
      <CheckoutStepper activeStep={2} />

      <div className="aty-page-head">
        <div>
          <span className="aty-eyebrow">FINALIZAR COMPRA // ENVÍO</span>
          <h1>Datos de Entrega</h1>
        </div>
        <Link to="/carrito" className="aty-btn aty-btn--outline aty-btn--sm">
          ← Editar bolsa
        </Link>
      </div>

      <div className="aty-two-col">
        <form className="aty-form-card" onSubmit={handleSubmit} noValidate>
          <h2 className="aty-form-card__title">Información de Contacto y Envío</h2>

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

          {/* Radio cards seleccionables para cobertura de envío */}
          <div className="aty-field">
            <span className="aty-label">Método y tarifa de envío</span>
            <div className="aty-shipping-cards" role="radiogroup" aria-label="Método de envío">
              {SHIPPING_OPTIONS.map((opt) => {
                const isSelected = form.values.shippingZone === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`aty-shipping-card ${
                      isSelected ? 'is-active' : ''
                    }`}
                    onClick={() => form.setFieldValue('shippingZone', opt.value)}
                  >
                    <div>
                      <strong>{opt.title}</strong>
                      <span>{opt.eta}</span>
                    </div>
                    <strong className="aty-tabular">
                      {formatCurrency(opt.price)}
                    </strong>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="aty-field">
            <label htmlFor="checkout-notes" className="aty-label">
              Referencias de entrega (opcional)
            </label>
            <textarea
              id="checkout-notes"
              rows={3}
              placeholder="Ej. Llamar al llegar a recepción..."
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
            <strong>Pago por transferencia bancaria directa</strong>
            <p>
              Al confirmar recibirás el número de orden, las coordenadas bancarias y
              tu comprobante listo para enviar por WhatsApp.
            </p>
          </div>

          <button
            type="submit"
            className="aty-btn aty-btn--primary aty-btn--full"
          >
            Confirmar Pedido ({formatCurrency(total)}) →
          </button>
        </form>

        {/* Resumen financiero lateral */}
        <aside className="aty-summary-panel" aria-label="Resumen de pedido">
          <h2>Tu Selección</h2>

          <ul className="aty-mini-order-list">
            {items.map((item) => (
              <li key={item.id} className="aty-mini-order-item">
                <div className="aty-mini-order-item__lead">
                  <img src={item.imageUrl} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      Talla {item.size} · {item.color} × {item.quantity}
                    </span>
                  </div>
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
