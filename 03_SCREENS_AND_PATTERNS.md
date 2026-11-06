# SmartBasket — Screens, States & UI Patterns

## 1. Core Screen Definitions

1. **Catalog Search (`Screen / Search`):** Product search bar, store filter chips, list of matching SKUs.
2. **Product Details (`Screen / Product`):** SKU specifications, pack size, availability across stores.
3. **My Sets (`Screen / SetList`):** List of saved user templates with item count and estimated total.
4. **Store Comparison (`Screen / Comparison`):** Detailed breakdown comparing total prices across ATB, Silpo, and Varus.
5. **Empty Search State (`Screen / SearchEmpty`):** Rendered when search returns 0 results; contains reset filter CTA.
6. **Network Error State (`Screen / NetworkError`):** Rendered upon connection failure; contains retry CTA.

## 2. Component State Matrix

Every interactive component must explicitly handle and declare the following state representations:

- `Default`: Rest state.
- `Hover`: Desktop pointer hover overlay (transparency tint).
- `Pressed`: Active press state (scaled or darker background).
- `Focus`: Visible keyboard/screen-reader outline ring (`primary-700` 2px ring with offset).
- `Disabled`: Inactive state (`neutral-300` background, pointer-events disabled).
- `Loading`: Operational state (Primary button locks width and displays centered vector spinner).

## 3. Key Interaction Patterns

### Pattern A: Search & Filter Behavior

- User typing updates results dynamically.
- Toggling a filter chip updates the active dataset immediately.
- If no matches exist, display `SearchEmpty` layout with a single-click "Reset Filters" action.

### Pattern B: Template Editing & Input Validation

- Inline real-time validation for Set Name (Must be 2–40 characters).
- Quantity updates immediately recalculate the subtotal.
- Item deletion requires an explicit action row with an "Undo" snackbar trigger.

### Pattern C: Store Comparison Logic

- Stores are sorted automatically with the lowest total price highlighted via the "Best Value" badge.
- **Rule:** A store with missing items MUST NOT be marked as "Best Value" solely due to a lower total numerical cost. Missing items are explicitly flagged in red text.

### Pattern D: Modal Operations (`Modal / SaveSet`)

- Contains 3 explicit UI states: `Default` (Form input), `Error` (Inline red text below input), `Loading` (Disabled primary button with spinner).
