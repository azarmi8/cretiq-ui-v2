# Cretiq v2 — Agent Instructions

## Stack
- Vite + React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- i18next (FA/EN, RTL/LTR)
- Lucide React

## Design System
Location: src/design-system/
Always use this. Never create new primitives inline.

### Primitives
GlassCard, StatusBadge, Kicker, MetricReadout, Button, PageHeader, DataTable, LiveNumber, Sparkline, KPIRow, KPICard, SectionTitle, EmptyState, CommandPalette

### Hooks
- usePersianNumber: .format(n), .formatFixed(n, d)
- useTimeAgo
- useDirection

## Colors
- Background: #0B1117, #111A22, #1A2328
- Glass: bg-white/[0.03] backdrop-blur-2xl
- Brand: #45D483
- Brand bright: #A3D941
- Cyan: #2DE2E6
- Warning: #F5B544
- Danger: #FF5C67
- Text: #E7F7F8, #94A3B8, #475569

## RULES
1. RTL-first: use ms-, me-, start, end. Never ml-, mr-, left, right.
2. No hardcoded strings: use t key via useTranslation.
3. No hardcoded numbers: use usePersianNumber.
4. Design System only for cards/badges/buttons.
5. Framer Motion for entrance animations.
6. Focus visible: focus-visible:ring-2 focus-visible:ring-[#45D483].
7. Never invent engineering values.
8. Every component: default, hover, focus, disabled, loading, error.
9. Add i18n keys to src/locales/fa/common.json and src/locales/en/common.json.
10. npm run dev must compile without errors.

## Directory Structure
- src/design-system/  (tokens, primitives, patterns, layout, hooks)
- src/components/     (feature components)
- src/data/           (mock data)
- src/locales/        (i18n)

## Adding a New Page
1. Create src/components/{feature}/{FeaturePage}.tsx
2. Use PageHeader at top
3. Wrap in SectionTitle sections
4. Use GlassCard for panels
5. Add i18n keys
6. Wire into App.tsx renderPage function

## Forbidden
- text-align left (use text-start)
- margin-left (use ms-)
- Hardcoded badge counts
- Direct text-white (use #E7F7F8)
