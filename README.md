# Whatbytes E-Commerce Assignment

A modern, fully responsive frontend e-commerce application built for the Whatbytes frontend assignment. This project leverages the latest Next.js App Router, Tailwind CSS, and global state management to deliver a seamless shopping experience.

### 🔗 Links
- **Live Demo**: [https://whatbytes-ecommerce-site.vercel.app/](https://whatbytes-ecommerce-site.vercel.app/)
- **GitHub Repository**: [https://github.com/LoveshPurswani18/whatbytes-ecommerce-site.git](https://github.com/LoveshPurswani18/whatbytes-ecommerce-site.git)

---

## 🚀 Key Features Implemented

### 1. Home Page (Product Listing)
- **Responsive Layout**: A modern grid that gracefully scales from 3 columns (desktop) to 2 (tablet) and 1 (mobile).
- **Advanced Filtering Engine**: 
  - **Category Filters**: Real-time category selection (e.g., Electronics, Jewelery, Men's Clothing).
  - **Dynamic Price Slider**: Calculates absolute minimum and maximum bounds based on fetched products and lets users filter in real-time.
  - **Search**: Instant string matching against product titles.
  - **URL Synchronization**: All active filters and search states are synchronized directly to the URL parameters (`?category=...&price=...`), enabling link sharing and deep linking.
- **Empty States**: Beautiful conditional rendering when filters yield no results, including a "Reset Filters" action.

### 2. Product Detail Page
- **Dynamic Routing**: Individual product pages mapped via `/product/[id]`.
- **Rich Information**: Displays high-quality imagery, product title, detailed description, dynamic pricing, and category.
- **Robust Data Fetching**: Utilizes a dual-fetch fallback pattern. It attempts server-side data fetching first (for SEO and speed) and degrades gracefully to client-side fetching to ensure high availability.

### 3. Shopping Cart System (Bonus Feature)
- **Global State**: Managed via Zustand to ensure instant reactivity across the entire application without prop drilling.
- **Persistence**: Cart data automatically saves to `localStorage` using Zustand's persist middleware, allowing users to leave the site and return without losing their items.
- **Live Updates**:
  - Increase/decrease quantity directly from the Cart Page, instantly updating the order summary.
  - Remove individual items or clear the entire cart.
  - Real-time Subtotal and Estimated Tax calculations.
- **Custom Toast Notifications**: A bespoke, lightweight toast notification system built from scratch to give users immediate feedback for all cart interactions (Add, Remove, Update, Clear).

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first UI development.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for lightweight, predictable global state.
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, SVG-based icons.
- **Data Source**: [Fake Store API](https://fakestoreapi.com/) for mock e-commerce data.

### Architectural Decisions
- **Server vs Client Components**: The app leans heavily into React Server Components. Layouts, wrappers, and non-interactive blocks are rendered on the server to keep the JavaScript bundle tiny. Interactivity (like buttons, dropdowns, and state logic) is strictly encapsulated into "use client" leaf nodes.
- **Zero Third-Party Clutter**: Outside of the core framework and icons, no heavy UI component libraries (like Radix or MUI) were used. The UI components (Badges, Buttons, Toasts, Dropdowns) were crafted from scratch to demonstrate strong CSS/Tailwind proficiency.

---

## 💻 Running Locally

1. Clone the repository:
```bash
git clone https://github.com/LoveshPurswani18/whatbytes-ecommerce-site.git
cd whatbytes-ecommerce-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
# To test network interactions or mobile UI accurately:
npm run build && npm run start

# For standard local development with HMR:
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

*Designed and Developed for Whatbytes Assignment.*
