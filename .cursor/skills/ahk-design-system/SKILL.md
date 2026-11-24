---
name: ahk-design-system
description: Govern and evolve Atypico Studio's DESIGN.md specification and :root CSS custom properties while preserving WCAG AA contrast, brutalist streetwear styling, and zero external UI framework leakage.
---

## Provider Delegation Guidance

- Sequential: Consult this skill alongside `consultant` or `builder` whenever adding UI surfaces, tokens, components, typography, or layout changes.
- Verify After Edits: Always run `/ahk-ux-audit` (`custom:ux-auditor`) after updating `src/index.css` or `DESIGN.md`.

---

## Core Design System Rules — Atypico Studio

1. **Single Source of Truth (`DESIGN.md` ↔ `src/index.css`):**
   - Every custom property in `:root` inside `src/index.css` must match the palette, typography, spacing, border, and elevation contract documented in `DESIGN.md` and [the tokens contract](resources/tokens-contract.md).
2. **Pure CSS Architecture (Zero `@mantine/core`):**
   - Visual components use semantic `.aty-*` classes powered strictly by `var(--token)` references.
   - Never hardcode `#hex`, `rgb()`, or `rgba()` colors outside the `:root` block in `src/index.css`.
3. **Editorial Streetwear Brutalism Principles:**
   - Warm mineral canvas (`--bg-canvas`), high-contrast ink (`--bg-ink`), disciplined terracotta accents (`--accent-cta` for filled light-context CTAs, `--accent-primary` for dark-ink highlights and graphic borders).
   - Crisp `1px` / `1.5px` / `2px` borders, `tabular-nums` monospaced pricing, and generous editorial whitespace.
4. **Contract Protection:**
   - Do not modify `src/index.css` tokens in a way that drops any pair below WCAG 2.1 AA (`4.5:1` normal text, `3.0:1` UI borders/large text).
