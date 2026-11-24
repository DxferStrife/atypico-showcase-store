# Contrato Oficial de Tokens `:root` — Atypico Studio

## 1. Superficies y Fondos
| Token | Valor | Uso principal |
| :--- | :--- | :--- |
| `--bg-canvas` | `#F7F6F2` | Fondo mineral principal de la tienda |
| `--bg-surface` | `#FFFFFF` | Tarjetas de producto, paneles, modales y formularios |
| `--bg-surface-muted` | `#EFECE6` | Fondos secundarios, hovers suaves y thumbnails |
| `--bg-ink` | `#0D0D0D` | Hero editorial, anuncio superior, banda de estudio, estados activos |
| `--bg-ink-soft` | `#1A1A19` | Tarjetas internas sobre fondos oscuros (`--bg-ink`) |
| `--bg-header-glass` | `rgba(247, 246, 242, 0.94)` | Header sticky translúcido |
| `--bg-backdrop` | `rgba(13, 13, 13, 0.62)` | Fondo oscuro detrás de Drawer y Modal |
| `--bg-shimmer` | `#E5E1D8` | Brillo intermedio para skeletons de carga |

## 2. Texto y Contraste Garantizado (WCAG 2.1 AA)
| Token | Valor | Sobre `--bg-canvas` | Sobre `--bg-surface` | Sobre `--bg-ink` |
| :--- | :--- | :---: | :---: | :---: |
| `--text-primary` | `#111111` | ~17.4:1 | ~18.9:1 | — |
| `--text-secondary` | `#55534E` | ~7.1:1 | ~7.7:1 | — |
| `--text-muted` | `#636058` | ~5.7:1 | ~6.2:1 | — |
| `--text-inverse` | `#FFFFFF` | — | — | ~19.5:1 |
| `--text-inverse-muted` | `#C8C4BC` | — | — | ~11.4:1 |

## 3. Acentos de Marca Atypico
| Token | Valor | Regla de uso |
| :--- | :--- | :--- |
| `--accent-primary` | `#E35336` | Textos/cifras sobre `--bg-ink` (~5.15:1), focus rings, bordes y acentos SVG |
| `--accent-cta` | `#BF381D` | Botones primarios con `--text-inverse` (~5.49:1) y eyebrows/etiquetas sobre fondo claro (~5.08:1) |
| `--accent-cta-hover` | `#9E2C15` | Estado `:hover` de botones primarios (~7.1:1 con blanco) |
| `--accent-soft` | `#FBECE8` | Fondo suave de badges acento (emparejado con `--accent-cta`) |

## 4. Estados Semánticos
- `--status-success: #166E46` / `--status-success-bg: #E9F7EF`
- `--status-error: #B91C1C` / `--status-error-bg: #FEF2F2`
- `--status-warning: #92400E` / `--status-warning-bg: #FEF3C7`

## 5. Bordes, Radios, Elevación y Escala
- `--border-subtle: #DDD9CF`, `--border-strong: #0D0D0D`, `--border-inverse: rgba(255, 255, 255, 0.16)`
- `--shadow-sm: 0 2px 8px rgba(13, 13, 13, 0.05)`
- `--shadow-md: 0 12px 32px rgba(13, 13, 13, 0.10)`
- `--shadow-modal: 0 24px 48px rgba(13, 13, 13, 0.22)`
- `--shadow-brutal: 4px 4px 0px #0D0D0D`
- `--container-max: 1240px`, `--space-xs: 0.25rem` .. `--space-2xl: 4rem`
