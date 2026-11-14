import { useEffect } from 'react';
import { formatCurrency } from '../../stores/use-cart-store';
import type { CartItem } from '../../types/ecommerce';

type DeleteConfirmModalProps = {
  item: CartItem | null;
  onCancel: () => void;
  onConfirm: () => void;
};

/**
 * Modal de confirmación preventiva (Regla RN-08 + Requisito 2 del profesor).
 * Construido 100% con HTML accesible y CSS usando tokens en :root.
 * - Si el usuario cancela (botón, backdrop o ESC): el ítem permanece intacto.
 * - Si el usuario confirma: el ítem se elimina y actualiza el subtotal.
 */
export function DeleteConfirmModal({
  item,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onCancel]);

  if (!item) return null;

  return (
    <div
      className="aty-modal-backdrop"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="aty-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aty-modal__header">
          <span className="aty-eyebrow">CONFIRMACIÓN PREVENTIVA // RN-08</span>
          <h2 id="delete-modal-title" className="aty-modal__title">
            ¿Eliminar prenda de tu bolsa?
          </h2>
        </div>

        <div className="aty-modal__body">
          <div className="aty-modal__preview">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="aty-modal__thumb"
            />
            <div>
              <p className="aty-modal__item-name">{item.name}</p>
              <p className="aty-modal__item-meta">
                Talla <strong>{item.size}</strong> · {item.color} · {item.quantity}{' '}
                {item.quantity === 1 ? 'unidad' : 'unidades'}
              </p>
              <p className="aty-modal__item-price">
                Subtotal línea: {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>

          <p className="aty-modal__warning">
            Si confirmas, esta prenda desaparecerá de tu bolsa y se recalculará el
            subtotal. Si cancelas, permanecerá conservada.
          </p>
        </div>

        <div className="aty-modal__actions">
          <button
            type="button"
            className="aty-btn aty-btn--outline"
            onClick={onCancel}
          >
            Cancelar (Conservar)
          </button>
          <button
            type="button"
            className="aty-btn aty-btn--danger"
            onClick={onConfirm}
          >
            Sí, eliminar prenda
          </button>
        </div>
      </div>
    </div>
  );
}
