import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="aty-container aty-page">
      <div className="aty-empty-box">
        <span className="aty-eyebrow">ERROR 404 // RUTA NO ENCONTRADA</span>
        <h1>Esta ruta no existe en el catálogo</h1>
        <p>
          Verifica la URL o regresa a la colección principal de Atypico Showcase
          Store.
        </p>
        <Link to="/" className="aty-btn aty-btn--primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
