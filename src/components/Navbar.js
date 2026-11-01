import React from 'react';
import { IconBox, IconMenu, IconPlus, IconSun, IconMoon } from './icons';
import { formatCurrency } from '../utils';

// Top header: brand, product summary counts and the main actions.
function Navbar({
  totalProducts,
  filteredCount,
  totalValue,
  lowStockCount,
  theme,
  onToggleTheme,
  onToggleSidebar,
  onAddClick,
}) {
  const isFiltered = filteredCount !== totalProducts;

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="icon-btn menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
        >
          <IconMenu />
        </button>
        <div className="brand">
          <span className="brand-mark">
            <IconBox />
          </span>
          <span className="brand-text">
            Inventory<strong>Pro</strong>
          </span>
        </div>
      </div>

      <div className="navbar-stats" aria-label="Summary counts">
        <span className="pill pill-neutral">{totalProducts} products</span>
        <span className="pill pill-neutral">{formatCurrency(totalValue)} value</span>
        <span className={`pill ${lowStockCount > 0 ? 'pill-warn' : 'pill-neutral'}`}>
          {lowStockCount} low stock
        </span>
        {isFiltered && <span className="pill pill-accent">{filteredCount} showing</span>}
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>
        <button type="button" className="btn btn-primary" onClick={onAddClick}>
          <IconPlus />
          <span>Add Product</span>
        </button>
        <span className="avatar" title="Admin">AD</span>
      </div>
    </header>
  );
}

export default Navbar;
