import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Overview from './components/Overview';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import Modal from './components/Modal';
import Toast from './components/Toast';
import { IconGrid, IconList } from './components/icons';
import { LOW_STOCK_THRESHOLD, exportProductsToCsv } from './utils';
import './App.css';

// Starting data (5 dummy products)
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', price: 25.99, quantity: 50 },
  { id: 2, name: 'Office Chair', category: 'Furniture', price: 120.0, quantity: 15 },
  { id: 3, name: 'Notebook', category: 'Stationery', price: 2.5, quantity: 200 },
  { id: 4, name: 'Bluetooth Speaker', category: 'Electronics', price: 45.0, quantity: 30 },
  { id: 5, name: 'Desk Lamp', category: 'Furniture', price: 18.75, quantity: 40 },
];

const PRODUCTS_KEY = 'inventorypro-products';
const THEME_KEY = 'inventorypro-theme';

// Read saved products from the browser (falls back to the dummy list).
function loadProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
    if (Array.isArray(saved) && saved.every((p) => p && p.name && p.category)) {
      return saved;
    }
  } catch (e) {
    // ignore: storage blocked or invalid JSON
  }
  return DEFAULT_PRODUCTS;
}

function loadTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {
    // ignore
  }
  return 'light';
}

function App() {
  const [products, setProducts] = useState(loadProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [view, setView] = useState('all'); // 'all' | 'low'
  const [sortBy, setSortBy] = useState('newest');
  const [layout, setLayout] = useState('grid'); // 'grid' | 'list'
  const [modal, setModal] = useState(null); // null | { mode: 'add' } | { mode: 'edit', product }
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(loadTheme);

  // Save products and theme in the browser so a page refresh does not lose them.
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  // ---------- actions ----------

  const showToast = (message, action) => {
    setToast({ id: Date.now(), message, ...action });
  };

  const addProduct = (data) => {
    const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { ...data, id }]);
    setModal(null);
    showToast(`"${data.name}" added to the catalog.`);
  };

  const updateProduct = (id, data) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...data } : p)));
    setModal(null);
    showToast(`"${data.name}" updated.`);
  };

  const deleteProduct = (id) => {
    const index = products.findIndex((p) => p.id === id);
    const removed = products[index];
    setProducts(products.filter((p) => p.id !== id));
    showToast(`"${removed.name}" deleted.`, {
      actionLabel: 'Undo',
      onAction: () =>
        setProducts((current) => {
          const copy = [...current];
          copy.splice(Math.min(index, copy.length), 0, removed);
          return copy;
        }),
    });
  };

  const resetData = () => {
    if (window.confirm('Reset all products back to the 5 demo products?')) {
      setProducts(DEFAULT_PRODUCTS);
      setSearchTerm('');
      setActiveCategory('All');
      setView('all');
      showToast('Demo data restored.');
    }
  };

  const dismissToast = useCallback(() => setToast(null), []);

  const goToView = (nextView) => {
    setView(nextView);
    setActiveCategory('All');
    setSidebarOpen(false);
  };

  const goToCategory = (name) => {
    setView('all');
    setActiveCategory(name);
    setSidebarOpen(false);
  };

  // ---------- derived data ----------

  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      const key = p.category.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, { name: p.category.trim(), count: 0, value: 0 });
      }
      const entry = map.get(key);
      entry.count += 1;
      entry.value += p.price * p.quantity;
    });
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // If the chosen category disappeared (its last product was deleted), fall back to All.
  const category = categories.some((c) => c.name.toLowerCase() === activeCategory.toLowerCase())
    ? activeCategory
    : 'All';

  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const lowStockProducts = products.filter((p) => p.quantity < LOW_STOCK_THRESHOLD);

  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const list = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
      const matchesCategory =
        category === 'All' || p.category.trim().toLowerCase() === category.toLowerCase();
      const matchesView = view === 'all' || p.quantity < LOW_STOCK_THRESHOLD;
      return matchesSearch && matchesCategory && matchesView;
    });

    const sorters = {
      newest: (a, b) => b.id - a.id,
      name: (a, b) => a.name.localeCompare(b.name),
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'stock-asc': (a, b) => a.quantity - b.quantity,
      'stock-desc': (a, b) => b.quantity - a.quantity,
    };
    return list.sort(sorters[sortBy]);
  }, [products, searchTerm, category, view, sortBy]);

  const pageTitle =
    view === 'low' ? 'Low Stock' : category === 'All' ? 'All Products' : `${category} Products`;

  return (
    <div className="app">
      <Navbar
        totalProducts={products.length}
        filteredCount={visibleProducts.length}
        totalValue={totalValue}
        lowStockCount={lowStockProducts.length}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onAddClick={() => setModal({ mode: 'add' })}
      />

      <Sidebar
        open={sidebarOpen}
        view={view}
        onViewChange={goToView}
        categories={categories}
        activeCategory={category}
        onCategoryChange={goToCategory}
        totalProducts={products.length}
        lowStockCount={lowStockProducts.length}
        onExport={() => exportProductsToCsv(products)}
        onReset={resetData}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main">
        {view === 'all' && category === 'All' && (
          <Overview
            products={products}
            categories={categories}
            totalValue={totalValue}
            lowStockProducts={lowStockProducts}
            onEdit={(product) => setModal({ mode: 'edit', product })}
          />
        )}

        <section className="catalog">
          <div className="catalog-head">
            <div>
              <h2>{pageTitle}</h2>
              <p className="catalog-sub">
                Showing {visibleProducts.length} of {products.length} products
              </p>
            </div>

            <div className="toolbar">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <select
                className="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="newest">Newest first</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="stock-asc">Stock: low to high</option>
                <option value="stock-desc">Stock: high to low</option>
              </select>
              <div className="segmented" role="group" aria-label="Layout">
                <button
                  type="button"
                  className={layout === 'grid' ? 'is-active' : ''}
                  onClick={() => setLayout('grid')}
                  aria-label="Grid layout"
                >
                  <IconGrid />
                </button>
                <button
                  type="button"
                  className={layout === 'list' ? 'is-active' : ''}
                  onClick={() => setLayout('list')}
                  aria-label="List layout"
                >
                  <IconList />
                </button>
              </div>
            </div>
          </div>

          <ProductList
            products={visibleProducts}
            layout={layout}
            hasAnyProducts={products.length > 0}
            onEdit={(product) => setModal({ mode: 'edit', product })}
            onDelete={deleteProduct}
          />
        </section>
      </main>

      <Footer totalProducts={products.length} />

      {modal && (
        <Modal
          title={modal.mode === 'edit' ? 'Edit product' : 'Add a new product'}
          onClose={() => setModal(null)}
        >
          <AddProductForm
            initialProduct={modal.mode === 'edit' ? modal.product : null}
            categories={categories}
            onSubmit={
              modal.mode === 'edit'
                ? (data) => updateProduct(modal.product.id, data)
                : addProduct
            }
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
