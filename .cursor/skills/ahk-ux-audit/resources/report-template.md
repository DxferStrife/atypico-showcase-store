# Plantilla de Informe — UX Auditor (`custom:ux-auditor`)

```markdown
# UX/UI Audit Report — Atypico Studio

- **Veredicto:** APPROVED | BLOCKED
- **Puntaje Global:** XX / 100
- **Alcance auditado:** <archivos / rutas>

## 1. Matriz de Contraste WCAG 2.1
| Par evaluado (Texto / Superficie) | Tokens | Ratio | Mínimo requerido | Estado |
| :--- | :--- | :---: | :---: | :--- |
| Texto primario / Canvas | `--text-primary` / `--bg-canvas` | X.XX:1 | 4.5:1 | PASS / FAIL |
| CTA primario blanco / Fondo CTA | `--text-inverse` / `--accent-cta` | X.XX:1 | 4.5:1 | PASS / FAIL |
| Texto muted / Surface | `--text-muted` / `--bg-surface` | X.XX:1 | 4.5:1 | PASS / FAIL |

## 2. Disciplina de Tokens `:root` y Reglas de Stack
- `@mantine/core` en UI: 0 usos (PASS/FAIL)
- Valores de color hardcodeados fuera de `:root`: N (PASS/FAIL)
- Clases `.aty-*` sin estilo o huérfanas: lista / 0

## 3. Hallazgos por Severidad
### CRITICAL (Bloqueantes)
- Ninguno | `[archivo:línea]` Descripción exacta + remediación.

### MAJOR
- Ninguno | `[archivo:línea]` Descripción exacta + remediación.

### MINOR
- Ninguno | Recomendación opcional.

## 4. Evaluación de Marca y Flujo E-Commerce
- Artefactos académicos/bootcamp detectados: 0 (PASS/FAIL)
- Cobertura responsive (desktop / tablet / mobile) y accesibilidad: resumen breve.
```
