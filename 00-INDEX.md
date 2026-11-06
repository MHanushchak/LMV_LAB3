# SmartBasket — Project Overview & Architecture Guide

## 1. Executive Summary

SmartBasket is a mobile-first web application (PWA) designed for users with fixed or strict nutritional routines (athletes, individuals following diet plans, families). The platform allows users to create reusable, meal-plan-based shopping templates with exact quantities, automatically compare product availability and total basket costs across major supermarket chains (e.g., ATB, Silpo, Varus), and transfer the complete cart to the selected retailer's checkout via direct web links in a single click.

## 2. Core Value Proposition

- **Automated Routine:** Eliminates manual weekly searches for 15–20 recurring food items.
- **Cross-Store Price & Availability Comparison:** Displays total basket cost and out-of-stock items side-by-side per retailer.
- **One-Click Cart Export:** Instantly moves pre-configured item sets and exact quantities to the chosen retailer's web checkout.

## 3. Project Deliverables (Deliverable Scope)

1. **Interactive Figma UI/UX Prototype:** Mobile-first web interface centered in a desktop viewport container based on the "Calm & Reliable" design direction.
2. **Design System Library:** Tokens, typography scale, atomic UI components, and WCAG AA accessibility matrix.
3. **Product Requirements Document (PRD):** Personas, CJM, Value Proposition Canvas, and MoSCoW-prioritized module matrix.
4. **User Flow Schematics:** Step-by-step interaction diagrams including happy paths, edge cases, and error states.

## 4. Documentation Index

- `00_INDEX.md`: Project passport, architecture, and technology guide (this document).
- `01_PRODUCT_REQUIREMENTS.md`: Business logic, user personas, CJM, VPC, and detailed User Flows.
- `02_DESIGN_SYSTEM.md`: Color tokens, typography, WCAG compliance, viewport constraints, and component specifications.
- `03_SCREENS_AND_PATTERNS.md`: Screen definitions, state matrices, and core UI interaction patterns.
- `04_AI_PROMPT_GUIDELINE.md`: System prompt and developer instructions for AI web code generation agents.

## 5. Technical Environment & Constraints

- **Target Platform:** Mobile-first Web Application (React / Next.js / Vite + Tailwind CSS).
- **Viewport Layout:** Centered mobile container on desktop (Viewport width 390px–430px) with fixed top app header and bottom navigation bar.
- **Primary Data Integration:** Retailer catalog API mapping (SKU mapping, pricing updates, availability flags).
- **Design System Rules:** Inter font family, 8pt spacing grid, strict WCAG AA contrast compliance.
