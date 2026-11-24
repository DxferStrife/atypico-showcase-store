import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="aty-container aty-page">
      <div className="aty-empty-box">
        <span className="aty-eyebrow">ERROR 404 // RUTA NO ENCONTRADA</span>
        <h1>Esta página no existe en Atypico Studio</h1>
        <p>
          Es posible que el enlace haya cambiado o que la pieza haya salido de
          temporada. Regresa a la colección principal para seguir explorando.
        </p>
        <Link to="/" className="aty-btn aty-btn--primary">
          Explorar colección
        </Link>
      </div>
    </div>
  );
}
