// Small helper functions shared by several components.

export const LOW_STOCK_THRESHOLD = 20;

export function getStockStatus(quantity) {
  if (quantity === 0) return { key: 'out', label: 'Out of stock' };
  if (quantity < LOW_STOCK_THRESHOLD) return { key: 'low', label: 'Low stock' };
  return { key: 'ok', label: 'In stock' };
}

export function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// Picks a colour (hue) for a category name from a fixed palette, so the same
// category always gets the same colour everywhere in the app.
const CATEGORY_HUES = [255, 160, 25, 335, 200, 285, 45, 0];

export function categoryHue(name) {
  let hash = 5381;
  for (const ch of name.toLowerCase()) {
    hash = (hash * 33 + ch.charCodeAt(0)) >>> 0;
  }
  return CATEGORY_HUES[hash % CATEGORY_HUES.length];
}

export function exportProductsToCsv(products) {
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const rows = [
    ['ID', 'Name', 'Category', 'Price', 'Quantity', 'Total Value'],
    ...products.map((p) => [p.id, p.name, p.category, p.price, p.quantity, (p.price * p.quantity).toFixed(2)]),
  ];
  const csv = rows.map((row) => row.map(escape).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'inventory.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
