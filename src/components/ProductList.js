import React from 'react';
import ProductCard from './ProductCard';
import { IconEmptyBox } from './icons';

function ProductList({ products, layout, hasAnyProducts, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <IconEmptyBox className="empty-icon" />
        <p className="empty-title">
          {hasAnyProducts ? 'No products match your filters' : 'No products yet'}
        </p>
        <p className="empty-text">
          {hasAnyProducts
            ? 'Try a different search word, category or view.'
            : 'Click "Add Product" to create your first item.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`product-list product-list-${layout}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ProductList;
