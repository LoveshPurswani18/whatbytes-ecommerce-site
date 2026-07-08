# Technical Trade-offs & Decisions

During the development of this application, several technical decisions were made balancing best practices, time constraints, and the limitations of the provided mock API.

## 1. Hybrid Filtering (Client-Side Filtering)
**The Decision**: The filtering logic (category, search, price range) is performed on the client-side using `useFilteredProducts`, rather than relying on server-side queries.
**The Trade-off**: 
- *Why it was done*: The `Fake Store API` does not support complex querying natively (e.g., it cannot handle simultaneous category, price range, and search string queries via its endpoints). 
- *The consequence*: We must fetch the entire product catalog upfront (20 items in this mock scenario) and filter them in memory on the client. While perfectly fine for small datasets, this approach would not scale to an enterprise catalog with 10,000+ products, where server-side pagination and database-level querying would be mandatory.

## 2. Zustand vs. React Context
**The Decision**: Using Zustand for cart state instead of Next.js Context.
**The Trade-off**:
- *Why it was done*: Zustand offers a hook-based approach that doesn't require wrapping the `app/layout.tsx` in a Client Provider, preserving the Server Component architecture at the root level. It also handles `localStorage` persistence elegantly via middleware.
- *The consequence*: Introduces a small third-party dependency, though its footprint is minimal compared to alternatives like Redux Toolkit.

## 3. Custom UI Components vs. Component Libraries
**The Decision**: Building all UI elements (Toasts, Filters, Badges) from scratch using Tailwind CSS.
**The Trade-off**:
- *Why it was done*: To demonstrate raw CSS/Tailwind proficiency and maintain complete control over the design system, avoiding the "cookie-cutter" look often associated with out-of-the-box libraries. It also keeps the JavaScript bundle leaner.
- *The consequence*: Increased initial development time for UI primitives that could have been rapidly scaffolded using libraries like shadcn/ui or Chakra UI. Accessibility features (like ARIA roles for custom dropdowns/toasts) have to be managed manually.

## 4. Omission of a Database & Real Backend
**The Decision**: Relying entirely on a mock API (Fake Store API).
**The Trade-off**:
- *Why it was done*: This is a frontend-focused assignment designed to evaluate UI, state management, and Next.js integration.
- *The consequence*: The application lacks true data persistence, user authentication, and a real checkout flow. Inventory cannot be tracked, and cart contents are strictly isolated to the user's browser via `localStorage`.
