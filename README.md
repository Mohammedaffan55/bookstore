# Pagewise Books – Interactive Bookstore (ReactJS)

A single-page bookstore built with React. Browse and search books, view details, manage a shopping cart and place an order.

**Live demo:** _add your deployed URL here_

## Features
- **Pages:** Home, Book Listing, Book Details, Shopping Cart, Checkout, Order Confirmation, Sign in / Create account, 404
- **Search, filter, sort:** search by title or author, filter by category and max price, sort by price, rating or title (filters are kept in the URL)
- **Cart:** add, remove, change quantity (max 10 per book), free shipping above ₹999, cart saved in `localStorage`
- **Checkout:** form validation with clear messages, order saved and confirmation page shown
- **Error handling:** book-not-found, empty cart/search states, error boundary, safe storage access, 404 page
- **Bonus:** demo user authentication, unit tests (Vitest), GitHub Pages deployment workflow

## Tech stack
React 18 · React Router 6 (HashRouter) · Context API + `useReducer` · plain CSS · Vite · Vitest · Git/GitHub

## Getting started
```bash
git clone https://github.com/<your-username>/interactive-bookstore.git
cd interactive-bookstore
npm install
npm run dev        # http://localhost:5173
```

Other commands:
```bash
npm test           # run unit tests
npm run build      # production build into dist/
npm run preview    # preview the production build
```

## Project structure
```
src/
  components/   Navbar, BookCard, BookCover, ErrorBoundary
  context/      CartContext + cartReducer (state), AuthContext
  data/         books.js (sample catalogue)
  pages/        Home, BookListing, BookDetails, Cart, Checkout, OrderSuccess, Login, NotFound
  utils/        filterBooks, storage helpers, price formatting (+ tests)
```

## How to use
1. Browse from the home page or open **Browse** and use the search box, category, sort and price controls.
2. Click a book to read its details and add it to the cart.
3. Open **Cart** to change quantities or remove books.
4. Go to **Checkout**, fill in the delivery form and place the order.
5. Optional: create an account from **Sign in** so checkout pre-fills your name and email.

## Notes
- The catalogue is local sample data (`src/data/books.js`). Swap it for an API using `fetch` in a `useEffect` if needed.
- Authentication is a **demo only**: accounts are stored in the browser and passwords are not hashed. Do not use real passwords.
- `HashRouter` is used so deep links work on static hosts like GitHub Pages without extra configuration.

## Deployment (GitHub Pages)
1. Push the code to the `main` branch of your GitHub repository.
2. In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) runs the tests, builds and publishes the site on every push.

You can also deploy the `dist/` folder to Netlify or Vercel (build command `npm run build`, output directory `dist`).
