import React from 'react';
import { IconEdit, IconTrash } from './icons';
import { categoryHue, formatCurrency, getStockStatus, LOW_STOCK_THRESHOLD } from '../utils';

function ProductCard({ product, onEdit, onDelete }) {
  const status = getStockStatus(product.quantity);
  const hue = categoryHue(product.category);
  const fill = Math.min(100, Math.round((product.quantity / (LOW_STOCK_THRESHOLD * 5)) * 100));

  return (
    <article className="product-card">
      <div className="product-tile" style={{ '--h': hue }} aria-hidden="true">
        {product.name.charAt(0).toUpperCase()}
      </div>

      <div className="product-info">
        <div className="product-top">
          <span className="category-tag" style={{ '--h': hue }}>
            {product.category}
          </span>
          <span className={`status status-${status.key}`}>{status.label}</span>
        </div>
        <h3>{product.name}</h3>
        <div className="stock-bar" aria-hidden="true">
          <span className={`stock-fill stock-fill-${status.key}`} style={{ width: `${fill}%` }} />
        </div>
      </div>

      <div className="product-numbers">
        <span className="price">{formatCurrency(product.price)}</span>
        <span className="quantity">{product.quantity} units</span>
      </div>

      <div className="product-actions">
        <button
          type="button"
          className="btn btn-soft btn-sm"
          onClick={() => onEdit(product)}
          aria-label={`Edit ${product.name}`}
        >
          <IconEdit />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm delete-btn"
          onClick={() => onDelete(product.id)}
          aria-label={`Delete ${product.name}`}
        >
          <IconTrash />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
