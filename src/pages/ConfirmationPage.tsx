// =============================================================================
// 🧭 PASO 6: Resumen Persistente Tras Vaciar Bolsa + Botón Copiar
// =============================================================================
// La tarjeta de comprobante y los datos ya están maquetados abajo.
//
// TUS TAREAS AQUÍ (// TODO PASO 6):
//   1. Calcula `cartItemsCount` desde `s.items` (debe quedar en 0 tras confirmar).
//   2. Arma el string `orderSummaryText` con el ID, datos de entrega, prendas,
//      subtotal, envío y total.
//   3. En `handleCopySummary`: copia `orderSummaryText` usando
//      `await navigator.clipboard.writeText(orderSummaryText)`, pon `setCopied(true)`
//      y vuelve a `false` tras 2.5 segundos con `setTimeout`.
// =============================================================================

import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { LearningBanner } from '../components/common/LearningBanner';
import { formatCurrency, useCartStore } from '../stores/use-cart-store';

export function ConfirmationPage() {
  const { orderId } = useParams();
  const lastConfirmedOrder = useCartStore((s) => s.lastConfirmedOrder);
  const cartItemsCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [copied, setCopied] = useState(false);

  if (!lastConfirmedOrder) {
    return (
      <div className="aty-container aty-page">
        <div className="aty-empty-box">
          <h2>No hay un pedido confirmado activo en esta sesión</h2>
          <p>
            Completa el recorrido desde el catálogo y el checkout para visualizar
            tu comprobante generado.
          </p>
          <Link to="/" className="aty-btn aty-btn--primary">
            Ir al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const orderSummaryText = [
    `ATYPICO STUDIO — RESUMEN DE PEDIDO #${lastConfirmedOrder.orderId}`,
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
      <LearningBanner
        step="PASO 7B · CONFIRMACIÓN PERSISTENTE"
        title="Snapshot inmutable en Zustand (lastConfirmedOrder)"
        tools={['useCartStore.lastConfirmedOrder', 'items.length === 0', 'navigator.clipboard']}
        description={`La bolsa activa quedó vacía (${cartItemsCount} prendas en cabecera) siguiendo RN-12, pero este comprobante sigue visible en pantalla mientras no recargues la pestaña.`}
      />

      <section className="aty-confirm-card">
        <div className="aty-confirm-card__banner">
          <div>
            <span className="aty-status-badge">PEDIDO CONFIRMADO</span>
            <h1>Orden #{orderId ?? lastConfirmedOrder.orderId}</h1>
            <p className="aty-muted-xs">
              Emitido el {lastConfirmedOrder.createdAt} · Estado de bolsa actual:{' '}
              <strong>{cartItemsCount} ítems</strong>
            </p>
          </div>
          <div className="aty-confirm-card__actions">
            <button
              type="button"
              className="aty-btn aty-btn--outline"
              onClick={handleCopySummary}
            >
              {copied ? '✓ ¡Resumen copiado!' : '📋 Copiar resumen'}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="aty-btn aty-btn--primary"
            >
              Abrir en WhatsApp (Opcional)
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
            <h2>Datos de Entrega</h2>
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
              <strong>Datos para Transferencia (Demo):</strong>
              <p>
                Banco Pichincha · Cuenta Corriente #2100-448899 · Atypico Studio
              </p>
            </div>
          </div>
        </div>

        <div className="aty-confirm-card__footer">
          <Link to="/" className="aty-btn aty-btn--outline">
            ← Volver al catálogo para otra prueba
          </Link>
        </div>
      </section>
    </div>
  );
}
