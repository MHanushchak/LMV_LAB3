# SmartBasket — Product Requirements Document (PRD)

## 1. Product Scope

### In-Scope (MVP Capabilities)

- Creation, editing, and storage of multi-item shopping templates with fixed quantities/units.
- Cross-retailer SKU mapping and total price/availability comparison (ATB, Silpo, Varus).
- Final basket generation and 1-click cart transfer/export via web redirect or deep link to the chosen supermarket checkout.

### Out-of-Scope (Non-MVP / Future Iterations)

- Native delivery logistics or courier management.
- In-app payment processing (all financial transactions occur on the retailer's web/app side).
- In-app barcode scanner and live support chat.
- Offline service workers (MVP requires an active internet connection for web API calls).

## 2. User Persona Profile

- **Name / Age:** Andriy, 25 years old.
- **Occupation / Role:** Professional Bodybuilder / Athlete (Lviv, Ukraine).
- **Context:** Trains 5 times a week, adheres strictly to daily macro/calorie goals. Orders groceries weekly via web/mobile.
- **Core Pain Point:** Re-entering 15–20 items manually every week takes 35–45 minutes; minor weight/quantity errors ruin meal plans; out-of-stock items force him to abandon carts and restart on another site.
- **Primary Goal:** Select a saved meal template and place an accurate order in under 2 minutes.

## 3. MoSCoW Prioritized Modules

| Module                             | Priority    | Description                                            | VPC / Pain Point Addressed                         |
| :--------------------------------- | :---------- | :----------------------------------------------------- | :------------------------------------------------- |
| **My Sets** (`SavedSets`)          | Must Have   | Create and manage fixed-quantity meal templates        | Replaces weekly manual item list creation          |
| **Where Cheaper** (`StoreCompare`) | Must Have   | Compare total basket price & stock across stores       | Eliminates lack of total basket price transparency |
| **Cart & Export** (`CartExport`)   | Must Have   | Finalize quantities and export to supermarket checkout | Eliminates manual item-by-item cart additions      |
| **Home Screen** (`Dashboard`)      | Should Have | Quick access to recent sets and price alerts           | Reduces navigation time to active templates        |
| **Settings** (`UserProfile`)       | Should Have | Location/city selection and store preferences          | Filters comparisons by geographic coverage         |

## 4. User Flow & State Machine Specifications

### 4.1 Module 1: "My Sets" (Create & Edit Template)

- **Happy Path:** Open Module → New Set → Enter Name → Search Item → Select SKU & Set Quantity → Save Template → Success Confirmation.
- **Alternative & Error Branches:**
  - _Empty Name:_ Display inline field validation error ("Enter 2–40 characters").
  - _Item Not Found:_ Render empty search state with query reset option.
  - _Network Error on Save:_ Render inline error banner with "Retry" action button.

### 4.2 Module 2: "Where Cheaper" (Cross-Store Comparison)

- **Happy Path:** Select Template → Fetch Live Prices/Stock → Render Comparison Matrix → Select Store → Confirm Basket → Proceed to Export.
- **Alternative & Error Branches:**
  - _No Saved Sets:_ Redirect to "My Sets" with onboarding state.
  - _Network Failure:_ Display connection error with a manual refresh button.
  - _Partial Availability (Missing Items):_ Open "Missing Items Modal". Allow user to pick store-suggested substitutes or exclude missing SKUs, then recalculate totals dynamically.

### 4.3 Module 3: "Cart & Export" (Final Checkout Transfer)

- **Happy Path:** Review Cart Items → Adjust Quantities → Verify Real-time Prices → Trigger 1-Click Export → Redirect via Deep Link / URL to Retailer Checkout.
- **Alternative & Error Branches:**
  - _Empty Cart:_ Render empty state with CTA to select a set.
  - _Price/Stock Change Detected:_ Display prompt showing old vs. new price/availability with "Accept Changes" or "Change Store" options.
  - _Export Failure:_ Display error modal and allow saving local cart state.
