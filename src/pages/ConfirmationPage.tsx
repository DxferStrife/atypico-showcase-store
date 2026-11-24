import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { CheckoutStepper } from '../components/common/CheckoutStepper';
import { formatCurrency, useCartStore } from '../stores/use-cart-store';

export function ConfirmationPage() {
  const { orderId } = useParams();
  const lastConfirmedOrder = useCartStore((s) => s.lastConfirmedOrder);
  const [copied, setCopied] = useState(false);

  if (!lastConfirmedOrder) {
    return (
      <div className="aty-container aty-page">
        <CheckoutStepper activeStep={3} />
        <div className="aty-empty-box">
          <h1>No hay un pedido activo en esta sesión</h1>
          <p>
            Completa tu selección desde el catálogo y confirma tus datos de entrega
            para consultar tu comprobante de orden.
          </p>
          <Link to="/" className="aty-btn aty-btn--primary">
            Explorar colección
          </Link>
        </div>
      </div>
    );
  }

  const orderSummaryText = [
    `ATYPICO STUDIO — COMPROBANTE DE PEDIDO #${lastConfirmedOrder.orderId}`,
    `Fecha: ${lastConfirmedOrder.createdAt}`,
    ``,
    `DATOS DE ENTREGA:`,
    `- Nombre: ${lastConfirmedOrder.customer.fullName}`,
    `- Celular: ${lastConfirmedOrder.customer.phone}`,
    `- Dirección: ${lastConfirmedOrder.customer.address}`,
    lastConfirmedOrder.customer.notes
      ? `- Notas: ${lastConfirmedOrder.customer.notes}`
      : null,
    ``,
    `PRENDAS SOLICITADAS:`,
    ...lastConfirmedOrder.items.map(
      (item) =>
        `• ${item.quantity}x ${item.name} (Talla ${item.size} · ${item.color}) — ${formatCurrency(item.price * item.quantity)}`
    ),
    ``,
    `Subtotal: ${formatCurrency(lastConfirmedOrder.subtotal)}`,
    `Envío: ${formatCurrency(lastConfirmedOrder.shippingCost)}`,
    `TOTAL: ${formatCurrency(lastConfirmedOrder.total)}`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(orderSummaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const whatsappUrl = `https://wa.me/593990000000?text=${encodeURIComponent(
    orderSummaryText
  )}`;

  return (
    <div className="aty-container aty-page">
      <CheckoutStepper activeStep={3} />

      <section className="aty-confirm-card">
        <div className="aty-confirm-card__banner">
          <div>
            <span className="aty-status-badge aty-status-badge--success">
              PEDIDO CONFIRMADO
            </span>
            <h1>Orden #{orderId ?? lastConfirmedOrder.orderId}</h1>
            <p className="aty-muted-xs">
              Emitido el {lastConfirmedOrder.createdAt} · Reservado para validación
              por transferencia
            </p>
          </div>
          <div className="aty-confirm-card__actions">
            <button
              type="button"
              className="aty-btn aty-btn--outline"
              onClick={handleCopySummary}
            >
              {copied ? '✓ Resumen copiado' : 'Copiar resumen'}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="aty-btn aty-btn--primary"
            >
              Enviar comprobante por WhatsApp →
            </a>
          </div>
        </div>

        <div className="aty-confirm-grid">
          <div className="aty-confirm-block">
            <h2>Prendas del Pedido</h2>
            <ul className="aty-confirm-items">
              {lastConfirmedOrder.items.map((item) => (
                <li key={item.id} className="aty-confirm-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      Talla <strong>{item.size}</strong> · {item.color} · Cantidad:{' '}
                      <strong>{item.quantity}</strong>
                    </span>
                  </div>
                  <strong className="aty-tabular">
                    {formatCurrency(item.price * item.quantity)}
                  </strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="aty-confirm-block">
            <h2>Datos de Entrega y Pago</h2>
            <dl className="aty-specs-list">
              <div>
                <dt>Nombre</dt>
                <dd>{lastConfirmedOrder.customer.fullName}</dd>
              </div>
              <div>
                <dt>Celular</dt>
                <dd>{lastConfirmedOrder.customer.phone}</dd>
              </div>
              <div>
                <dt>Dirección</dt>
                <dd>{lastConfirmedOrder.customer.address}</dd>
              </div>
              {lastConfirmedOrder.customer.notes && (
                <div>
                  <dt>Notas</dt>
                  <dd>{lastConfirmedOrder.customer.notes}</dd>
                </div>
              )}
            </dl>

            <div className="aty-summary-rows">
              <div className="aty-summary-line">
                <span>Subtotal</span>
                <strong className="aty-tabular">
                  {formatCurrency(lastConfirmedOrder.subtotal)}
                </strong>
              </div>
              <div className="aty-summary-line">
                <span>Envío</span>
                <strong className="aty-tabular">
                  {formatCurrency(lastConfirmedOrder.shippingCost)}
                </strong>
              </div>
            </div>
            <div className="aty-summary-total">
              <span>Total confirmado</span>
              <strong className="aty-tabular">
                {formatCurrency(lastConfirmedOrder.total)}
              </strong>
            </div>

            <div className="aty-bank-box">
              <strong>Cuenta para Transferencia Directa:</strong>
              <p>
                Banco Pichincha · Cuenta Corriente #2100-448899 · Atypico Studio
              </p>
            </div>
          </div>
        </div>

        <div className="aty-confirm-card__footer">
          <Link to="/" className="aty-btn aty-btn--outline">
            ← Volver a la colección
          </Link>
        </div>
      </section>
    </div>
  );
}
