import React, { useState } from 'react';
import { IconPlus } from './icons';

// Controlled form. Used for both "Add product" and "Edit product".
// When `initialProduct` is given, the form starts filled with its values.
function AddProductForm({ initialProduct, categories = [], onSubmit, onCancel }) {
  const isEditing = Boolean(initialProduct);

  const [formData, setFormData] = useState({
    name: initialProduct ? initialProduct.name : '',
    category: initialProduct ? initialProduct.category : '',
    price: initialProduct ? String(initialProduct.price) : '',
    quantity: initialProduct ? String(initialProduct.quantity) : '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required.';
    if (!formData.category.trim()) newErrors.category = 'Category is required.';

    if (formData.price === '') {
      newErrors.price = 'Price is required.';
    } else if (Number(formData.price) < 0) {
      newErrors.price = 'Price cannot be negative.';
    }

    if (formData.quantity === '') {
      newErrors.quantity = 'Quantity is required.';
    } else if (Number(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity cannot be negative.';
    } else if (!Number.isInteger(Number(formData.quantity))) {
      newErrors.quantity = 'Quantity must be a whole number.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label className="field field-full">
          <span>Product name</span>
          <input
            type="text"
            name="name"
            placeholder="e.g. Wireless Mouse"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
            autoFocus
          />
          {errors.name && <small className="error-text">{errors.name}</small>}
        </label>

        <label className="field field-full">
          <span>Category</span>
          <input
            type="text"
            name="category"
            placeholder="e.g. Electronics"
            list="category-options"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'input-error' : ''}
          />
          <datalist id="category-options">
            {categories.map((c) => (
              <option key={c.name} value={c.name} />
            ))}
          </datalist>
          {errors.category && <small className="error-text">{errors.category}</small>}
        </label>

        <label className="field">
          <span>Price ($)</span>
          <input
            type="number"
            name="price"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={errors.price ? 'input-error' : ''}
          />
          {errors.price && <small className="error-text">{errors.price}</small>}
        </label>

        <label className="field">
          <span>Quantity</span>
          <input
            type="number"
            name="quantity"
            placeholder="0"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            step="1"
            className={errors.quantity ? 'input-error' : ''}
          />
          {errors.quantity && <small className="error-text">{errors.quantity}</small>}
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <IconPlus />
          <span>{isEditing ? 'Save changes' : 'Add product'}</span>
        </button>
      </div>
    </form>
  );
}

export default AddProductForm;
