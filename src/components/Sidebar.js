import React from 'react';
import { IconGrid, IconAlert, IconTag, IconDownload, IconReset, IconClose } from './icons';
import { categoryHue } from '../utils';

// Left sidebar: page navigation, category filter and utility actions.
function Sidebar({
  open,
  view,
  onViewChange,
  categories,
  activeCategory,
  onCategoryChange,
  totalProducts,
  lowStockCount,
  onExport,
  onReset,
  onClose,
}) {
  const showingAll = view === 'all' && activeCategory === 'All';

  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Sidebar">
        <button type="button" className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
          <IconClose />
        </button>

        <nav className="sidebar-section">
          <p className="sidebar-label">Menu</p>
          <button
            type="button"
            className={`nav-item ${showingAll ? 'is-active' : ''}`}
            onClick={() => onViewChange('all')}
          >
            <IconGrid />
            <span>Dashboard</span>
            <span className="nav-count">{totalProducts}</span>
          </button>
          <button
            type="button"
            className={`nav-item ${view === 'low' ? 'is-active' : ''}`}
            onClick={() => onViewChange('low')}
          >
            <IconAlert />
            <span>Low Stock</span>
            <span className={`nav-count ${lowStockCount > 0 ? 'nav-count-warn' : ''}`}>
              {lowStockCount}
            </span>
          </button>
        </nav>

        <nav className="sidebar-section">
          <p className="sidebar-label">Categories</p>
          {categories.length === 0 && <p className="sidebar-empty">No categories yet</p>}
          {categories.map((category) => (
            <button
              type="button"
              key={category.name}
              className={`nav-item ${
                view === 'all' && activeCategory.toLowerCase() === category.name.toLowerCase()
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => onCategoryChange(category.name)}
            >
              <IconTag style={{ color: `hsl(${categoryHue(category.name)} 70% 62%)` }} />
              <span className="nav-text">{category.name}</span>
              <span className="nav-count">{category.count}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-section sidebar-bottom">
          <p className="sidebar-label">Tools</p>
          <button type="button" className="nav-item" onClick={onExport}>
            <IconDownload />
            <span>Export CSV</span>
          </button>
          <button type="button" className="nav-item" onClick={onReset}>
            <IconReset />
            <span>Reset demo data</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
