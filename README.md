# InventoryPro: Product & Inventory Dashboard

React.js assignment: a Product Catalog & Inventory Dashboard built with functional components and `useState`.

## Features

**Assignment requirements**
- Component-based: `Navbar`, `ProductList`, `ProductCard`, `AddProductForm`, `SearchBar`
- 5 dummy products stored with `useState`
- Add a product with a controlled form (appears instantly, no reload)
- Delete button on every product card
- Live search by product name or category

**Extra features**
- Layout: top header, left sidebar and footer (sidebar becomes a slide-in menu on mobile)
- Edit a product (same form, pre-filled)
- Delete with an **Undo** option
- Form validation with inline error messages
- Category filter from the sidebar, plus a **Low Stock** view
- Sorting (name, price, stock) and grid / list layout toggle
- Dashboard cards: total products, inventory value, low stock, categories
- "Value by category" chart and "Needs restocking" list
- Dark mode, saved in the browser
- Products are saved in `localStorage`, so a refresh does not lose them
- Export products to CSV

## Project structure

```
src/
  App.js              state + logic (products, search, filters, sort, modal)
  App.css             all styling (light + dark theme)
  utils.js            helper functions (currency, stock status, CSV export)
  components/
    Navbar.js         top header with summary counts
    Sidebar.js        left menu, categories, tools
    Footer.js         bottom footer
    Overview.js       stat cards, category chart, low stock list
    SearchBar.js      live search input
    ProductList.js    list / grid of products
    ProductCard.js    one product
    AddProductForm.js controlled form (add + edit)
    Modal.js          dialog wrapper
    Toast.js          message with Undo
    icons.js          SVG icons
```

## Run locally

```bash
npm install
npm start
```

Opens at `http://localhost:3000`.

## Deploy to GitHub Pages (optional)

A workflow is included in `.github/workflows/deploy.yml`. On GitHub open **Settings > Pages**, set **Source** to **GitHub Actions**, then push to `main`.
