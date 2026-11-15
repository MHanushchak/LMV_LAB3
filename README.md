# SmartBasket

Mobile-first Next.js App Router application with Tailwind CSS v4, Inter, and Lucide icons.

## Product documentation

Read these in order before implementing features:

1. [Project overview and architecture](00-INDEX.md)
2. [Product requirements and user flows](01_PRODUCT_REQUIREMENTS.md)
3. [Design system and accessibility](02_DESIGN_SYSTEM.md)
4. [Screens, states, and interaction patterns](03_SCREENS_AND_PATTERNS.md)
5. [AI implementation constraints](04_AI_PROMPT_GUIDELINE.md)

The overview's actual filename uses a hyphen: `00-INDEX.md`.

## Local development

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
```

Tailwind v4 runs through `@tailwindcss/postcss` in `postcss.config.mjs`, supporting
both Next.js bundlers. `app/globals.css` explicitly loads `tailwind.config.ts` using
`@config`. This config defines all product colors and the Inter typography scale.
Status utilities are `text-status-success`, `text-status-error`,
`text-status-warning`, and `text-status-info`. Inter is bundled locally through
`@fontsource-variable/inter`; builds and page views do not fetch Google Fonts.

## Initial layout

`app/layout.tsx` mounts `components/layout/mobile-shell.tsx` once for every route.
The shell uses a 430px centered device frame with an 8px slate border, 48px
corners, a deep shadow, a decorative 9:41 status bar and Dynamic Island, and a
home indicator below the sticky bottom navigation. The desktop surround centers
the device with 32px vertical padding. Frame height is capped at 884px and adapts
to the dynamic viewport height; only the main landmark scrolls inside it. On
very short viewports the outer page can scroll to preserve a usable frame.

Navigation has five destinations: Home (`/`), My Sets (`/sets`), Where Cheaper
(`/compare`), Cart (`/cart`), and Settings (`/settings`). My Sets supports local
CRUD, catalog search, mock comparison, and saved demo baskets; live retailer
checkout remains a future module. The active
destination uses `aria-current="page"`, a tinted background,
and a heavier label. Controls have at least 44px touch targets and visible
keyboard focus. Icons use Lucide's 24px grid and 2px strokes.

Header, navigation, and shell modules export state collections with `Default`,
`Loading`, `Error`, `Disabled`, and `Empty` components. Empty and error states
retain navigation so users can recover. Loading and disabled chrome replace
links with noninteractive labels. Main content also has standalone state exports
in `components/layout/screen-states.tsx`.

```tsx
import { MobileShellStates } from "@/components/layout/mobile-shell";

// Standalone previews; do not nest inside the root layout's existing shell.
<MobileShellStates.Loading />
<MobileShellStates.Error />
<MobileShellStates.Empty />
<MobileShellStates.Disabled />
```

App Router's `loading.tsx` and `error.tsx` render content-level fallbacks within
the persistent shell. The error boundary's Retry button invokes Next.js's retry
callback. No absolute positioning is used in the application layout.

## My Sets milestone

Dedicated App Router pages now live at `app/sets`, `app/compare`, `app/cart`, and
`app/settings`. The header and five-tab navigation follow the current pathname.
Settings provides language, city, and store preferences. Comparison directs users
without templates to My Sets; prices, stock, and city coverage are demo data.

Reusable atoms live in `src/components/ui`: Button/ButtonLink, Input,
StatusBadge, EmptyState, and ErrorState. Styles share design tokens and centralized
focus, field, and panel classes. Buttons preserve their width and accessible name
while loading. State collections provide explicit preview variations.

`src/features/sets` contains the model, external React store, CRUD forms, and undo
notifications. `useSets` uses `useSyncExternalStore` with a stable server snapshot,
then reads versioned `smartbasket.sets.v1` storage after hydration. A first visit
seeds “Weekly Diet”; a deliberately emptied list stays empty. Storage failures
show Retry and never silently replace malformed records. Storage events refresh
other open tabs, and each mutation reads the latest stored value.

Set names are trimmed, require 2–40 characters, and are unique ignoring case.
Items support kg, L, and pcs, quantities to three decimal places, and editable
estimated UAH prices to two decimal places. Totals use integer minor units and
round each line before summing. Editing an item previews its subtotal and the
new set total immediately; Save item persists the change.

Deleting removes the set/item from the visible list and creates a persisted undo
record. Notifications remain above the tab bar across navigation and reloads.
Undo restores the record; Dismiss makes removal permanent. There is no time limit
on recovery. Restoring an item whose parent set is also deleted updates the
parent's recovery record. Set-name collisions on restore receive a numeric suffix
instead of overwriting a newer set.

Run business-rule tests with `npm test` (Node 22.18+ or Node 24). Validate the full
app with `npm run lint` and `npm run build -- --webpack`.


## Catalog and comparison milestone

`src/features/catalog` provides a searchable ten-product demo catalog with pack
sizes, explicit product IDs, and per-store sample availability. Product search
updates immediately and supports ATB/Silpo/Varus availability filters and a Reset
Filters empty state. Item entry defaults to catalog search; Manual entry remains
available. Catalog-matched names and units stay fixed to protect product mapping.
Manual entries have no inferred SKU, even if they share a catalog product name.
The original starter records without product IDs are recognized by their exact
legacy item ID, name, and unit; existing local storage remains compatible.

`src/features/compare/model.ts` computes whole-pack baskets and sorts stores by
price. Partial totals exclude missing items and are explicitly marked. Only the
cheapest complete original basket receives Best Value (ties are eligible).
Duplicate rows resolving to one SKU share packs and are charged once. Pack
rounding and extra supplied quantity are disclosed in the item breakdown.

The native basket-review dialog traps keyboard focus, supports Escape, and fits
inside the device frame. Missing catalog items offer compatible demo substitutes
or explicit exclusion; unmapped manual items can only be excluded or matched in
My Sets. Every missing item must be resolved, and at least one available item must
remain. Substitutions never silently alter the saved meal template. The review
shows an adjusted total immediately; adjusted baskets are not re-awarded the
original comparison's Best Value badge.

Confirm demo basket stores a source-set snapshot, store ID, and explicit choices
at `smartbasket.demo-cart.v1`, then navigates to Cart. Cart survives reloads and
warns if the source set has since changed. `src/lib/local-store.ts` provides its
hydration-safe store and recoverable storage errors. This is a local prototype:
no live stock requests, retailer redirects, payments, or orders occur.

Business tests in `tests/comparison.test.mjs` cover catalog filtering, explicit
mapping, availability-aware ranking, pack rounding, shared packs, substitutes,
exclusions, and persisted cart validation.

## Interface languages

Settings → Interface language provides Українська and English. The language
preference is saved separately at `smartbasket.locale.v1`, synchronizes across
open tabs, and changes the interface immediately without rewriting sets, catalog
IDs, quantities, or confirmed baskets. When storage is unavailable, switching
still works for the current session and Settings explains that it was not saved.

`src/i18n/messages.ts` contains the English-to-Ukrainian dictionary and template
interpolation. `src/i18n/locale.tsx` provides a hydration-safe language store,
localized currency/number formatting, product display names, HTML language, and
page titles. The existing Inter font includes Cyrillic. Catalog search accepts
Ukrainian and English names; user-created set names and manual products retain
the original text. English remains the default for existing users without a saved
language preference.


## Set details, drafts, preferences, and cart quantities

Each set has a bookmarkable local detail route at `/sets/[id]`, reached with Open
set. It supports renaming, item CRUD, duplication, and comparison of that exact
set. Unknown/deleted local IDs show a recovery state; Undo can restore the set on
that page. Dynamic params, navigation pathname hooks, and comparison query params
use Suspense boundaries for Next.js Cache Components.

Duplicate creates an independent set and fresh item IDs, keeps quantities and
catalog mappings, generates a unique name within 40 characters, and opens the
copy's detail page. Copies of the original legacy starter retain SKU mappings.

`smartbasket.drafts.v1` stores unfinished set/item forms per page, including item
entry mode, product selection, quantities, prices, search queries, and store
filters. Navigation and reload restore the editor. Save or Cancel clears that
page's draft; Cancel explicitly discards it. Invalid/incomplete text is retained
as a draft and never written into a saved set. If storage fails, drafts remain in
memory and a Retry banner explains the limitation.

Cart quantity fields accept comma or dot decimals to three places. Valid changes
save immediately, recompute shared whole packs, extra supplied quantity, line
prices, and the basket total. Invalid input preserves the last valid total and
survives navigation/reload as a quantity draft. Quantity edits affect only the
cart snapshot; the original set is unchanged. The original source baseline is
preserved separately so a cart edit does not incorrectly report a changed set.

`smartbasket.preferences.v1` stores the selected city and stores. Lviv, Kyiv, and
Dnipro use explicitly fictional demo coverage. Changing a city selects its demo
stores; users may then toggle individual stores. Comparison filters eligible
stores before calculating Best Value. With no stores selected it routes users to
Settings. Cart review cannot confirm a store excluded by changed preferences.
Existing confirmed baskets keep their saved city/store and show a notice when
preferences change. No real geographic coverage or live retailer availability
is implied.

ProductImage provides a consistent accessible 64px image placeholder in catalog
results, set items, item forms, comparison details, and the cart. These are vector
placeholders; no remote product image requests are made.


## Compact set list and design handoff

`/sets` now renders name-only summaries with Open set, Rename, Duplicate, and
Delete actions. Product rows, prices, quantities, catalog forms, and Add item live
on `/sets/[id]`. A legacy item draft previously stored for `/sets` stays intact:
the list offers Continue draft, and the matching detail page resumes and clears
that original draft on Save or Cancel.

`design/figma-import` contains self-contained HTML for html.to.design, four
Ukrainian screen snapshots, preview PNGs, and import instructions. On November
14, the official html.to.design plugin successfully imported all four current
Ukrainian screens through its Editor tab, plus the deployed comparison, empty
cart, and settings routes as separate English screens. The Figma file was
updated; the Ukrainian composition is node `198:4244`. Imports use editable
layers, Auto Layout, and generated/reused styles; the plugin reported no missing
fonts. Comparison and settings content clipping was repaired after import.
The deployed `/sets` still includes products in the list, unlike the current
local app. Existing design ideas and the user's homepage import were preserved.
See `design/figma-import/IMPORT_UK.md` for frame links and validation details.
Explicit navigation between the new Ukrainian screens, full style/component
reconciliation, and Present-mode behavior checks remain unfinished.


## Lab 3 prototype update

The web prototype follows the current Figma structure: Home → My Sets → Set
Details → Add Product → Compare → Basket Review → Cart. Home shows a real saved
set with its estimated total and direct detail link. The list keeps compact
name-only cards; item editing happens on the detail page. Comparison's empty-set
recovery opens that exact set. Primary button hover/pressed states darken using
the existing neutral token overlay, matching the Figma library.

Current design: [seven component-based screens](https://www.figma.com/design/K9H9c4FOZBzi3KgMQGYYMT/LMV_lab3?node-id=215-4644).
[Component inventory and UI patterns for the report](design/lab3/COMPONENTS_REPORT_UK.md)
include 35 component sets, 207 variants, 26 icons, and three patterns. Earlier
`design/figma-import` snapshots and the original Scripter launcher are historical
handoff artifacts; they are not the current screen source. Documentation is kept
in the repository/report rather than on the Figma component canvas.

Manual acceptance flows:

1. Open the saved set from Home → add a catalog product → enter an invalid
   quantity and verify inline feedback → save a valid quantity → compare stores →
   review a complete basket → confirm → verify the persisted cart after reload.
2. My Sets → rename or duplicate a set → open its details → delete an item → Undo.
   Compare ATB's partial basket → explicitly exclude or substitute the missing
   milk → confirm the adjusted basket. Search for a missing product and reset
   filters to verify the alternative empty-search path.

Pushing this branch does not merge it into `main` or update the production URL.
A Vercel preview is available only if branch deployments are configured for the
repository. Full Present-mode Figma prototype verification remains separate from
the working web prototype.
