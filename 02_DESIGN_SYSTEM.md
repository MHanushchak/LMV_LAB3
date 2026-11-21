# SmartBasket — Design System & Style Guide

## 1. Visual Direction: "Calm & Reliable"

The visual language uses a muted blue and slate palette to project precision, financial transparency, and reliability. Highly readable numerical data, clear grid layouts, and explicit status labels take priority over graphic decorations.

## 2. Web Viewport & Layout Constraints

- **Mobile-only Container:** Use the full device height without simulated phone chrome. Keep a centered wrapper (`width: 100%; max-width: 430px`) on every viewport, including desktop browsers. All screens and store comparisons stay in one column. Narrow screens use the available width without horizontal scrolling.
- **Fixed Navigation:** The app header, screen action slot, and bottom navigation stay outside the scrolling `<main>`. Screen changes reset main scroll; browser history restores its previous position. Dialogs block main scrolling and keep confirmation actions visible.
- **Touch & Mouse Adaptations:** Prevent user text selection on interactive elements (`user-select: none`) and disable touch delay (`touch-action: manipulation`).

## 3. Typography Scale (Inter Font Family)

| Style       | Size (px) | Line Height (px) | Weight         | Usage                                         |
| :---------- | :-------- | :--------------- | :------------- | :-------------------------------------------- |
| **H1**      | 32        | 40               | Bold (700)     | Screen headers, main basket grand totals      |
| **H2**      | 28        | 36               | Bold (700)     | Template details header                       |
| **H3**      | 24        | 32               | SemiBold (600) | Section headers, store price totals           |
| **H4**      | 20        | 28               | SemiBold (600) | Card titles, modal headers                    |
| **H5**      | 18        | 24               | SemiBold (600) | Store brand names (Silpo, ATB, Varus)         |
| **H6**      | 16        | 24               | SemiBold (600) | Form field labels, list group headers         |
| **Body**    | 16        | 24               | Regular (400)  | Main text content, product names              |
| **Body S**  | 14        | 20               | Regular (400)  | Secondary metadata, item counts, stock status |
| **Caption** | 12        | 16               | Regular (400)  | Tab bar titles, helper tooltips               |
| **Button**  | 16        | 24               | SemiBold (600) | Button labels                                 |

## 4. Color Tokens & Palette

- `primary-700` (`#1D4ED8`): Primary actions, links, focus rings, active controls.
- `primary-100` (`#DBEAFE`): Active chip background, selected state fills.
- `secondary-700` (`#0F766E`): "Best Value" highlight badge.
- `neutral-900` (`#0F172A`): Primary headings, main body text, prices.
- `neutral-600` (`#475569`): Secondary labels, subtexts.
- `neutral-500` (`#64748B`): Input borders, placeholder text, icon default fill.
- `neutral-300` (`#CBD5E1`): Structural dividers, subtle card borders.
- `neutral-50` (`#F8FAFC`): Application page background.
- `white` (`#FFFFFF`): Card containers, modal backgrounds, text on dark buttons.
- `success` (`#15803D`): "In Stock" status badge.
- `error` (`#B91C1C`): "Out of Stock" status badge, error states.
- `warning` (`#B45309`): "Low Stock" status badge.
- `info` (`#0369A1`): System update notifications.

## 5. Accessibility Rules (WCAG 2.1 AA Compliance)

- **Contrast Ratios:** Text to background contrast must be at least 4.5:1. Interface element borders must be at least 3:1 (e.g., input borders use `neutral-500` `#64748B` at 4.76:1).
- **Dual-Coding for Statuses:** Never rely solely on color. Status indicators MUST combine text labels + color indicators (e.g., Green checkmark + "In Stock").
- **Touch Targets:** Interactive controls (Buttons, Switches, Checkboxes) must have an absolute minimum hit target area of 44×44 px.

## 6. Component Library Guidelines

- **Buttons:** Height 48px, border-radius 10px. Variants: Primary (`primary-700`), Secondary (Outlined `primary-700`), Text. Must support mouse `:hover` and `:active` states and maintain stable width during `Loading`.
- **Inputs:** Height 52px, border-radius 10px. Labels must remain permanently visible above the input field.
- **Icons:** Lucide Vector Icon set (24×24px grid, 2px stroke width).
