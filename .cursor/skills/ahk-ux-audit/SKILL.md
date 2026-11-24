---
name: ahk-ux-audit
description: Run a systematic 8-dimension UX/UI, WCAG contrast, :root token, spacing, border, and brand-polish audit aligned with DESIGN.md using the ux-auditor agent (`custom:ux-auditor`).
---

## Provider Delegation Guidance

- Sequential: Delegate to a named custom subagent with `/ux-auditor` (or request `ux-auditor` naturally) after `builder` completes UI changes and before `reviewer` closes the task.
- Context Transfer: Pass the target files/routes, `DESIGN.md`, and whether the run is pipeline mode (`taskId` provided) or lightweight read-only mode.
- Wait For Completion: Wait for `ux-auditor`'s verdict (`APPROVED` or `BLOCKED`) before invoking `reviewer` or closing a task.

---

## Objective & Scope

You are running the **Atypico Studio UX/UI & Design System Audit**. Target: `$ARGUMENTS`.

If `$ARGUMENTS` is empty, audit the full storefront (`DESIGN.md`, `src/index.css`, `src/components/`, and `src/pages/`).

---

## Execution Modes

### 1. Pipeline Mode (tracked in `.harness/harness.db`)
Use when auditing changes as part of an active AHK task:
1. Ensure `builder` has completed its action.
2. Read `DESIGN.md` and [the tokens contract](../ahk-design-system/resources/tokens-contract.md).
3. Invoke `ux-auditor` to evaluate every dimension in [the audit checklist](resources/checklist.md).
4. Record the action in AHK using actor **`custom:ux-auditor`**:
   - `actions.start(taskId, 'custom:ux-auditor')`
   - `actions.write(actionId, 'result', ...)` formatted per [the report template](resources/report-template.md)
   - If `BLOCKED`, `actions.write(actionId, 'blockers', ...)` with exact CSS selector/component fixes
   - `actions.complete(actionId, summary)`
5. Only hand off to `reviewer` once `ux-auditor` returns `APPROVED`.

### 2. Lightweight Preview Mode (no harness mutations)
Use when the user runs `/ahk-ux-audit` for a design review without creating tasks:
- Do **NOT** call `tasks.*` or `actions.*`.
- Inspect `DESIGN.md`, `src/index.css`, and relevant TSX files read-only.
- Return the exact report formatted with [the report template](resources/report-template.md).

---

## Severity & Gate Rules

- **CRITICAL:** WCAG text contrast `< 4.5:1` (or `< 3.0:1` large/UI component), `@mantine/core` UI dependency introduced, hardcoded colors outside `:root`, broken responsive overflow, missing keyboard/modal accessibility, or internal/bootcamp debug copy exposed on storefront.
- **MAJOR:** Missing `:focus-visible`, inconsistent spacing rhythm, orphaned grid slots, unstyled `.aty-*` classes, broken list/dl resets, or misaligned flex/grid summaries.
- **MINOR:** Micro-copy refinements, subtle visual hierarchy opportunities, or optional `prefers-reduced-motion` enhancements.
- **Gate:** Any `CRITICAL` or `>= 2` `MAJOR` findings → **`BLOCKED`**. Zero `CRITICAL` and `< 2` `MAJOR` → **`APPROVED`**.
