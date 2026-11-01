import React from 'react';
import { IconBox, IconDollar, IconAlert, IconTag, IconEdit } from './icons';
import { categoryHue, formatCurrency, getStockStatus } from '../utils';

function StatCard({ icon, label, value, hint, tone }) {
  return (
    <div className="stat-card">
      <span className={`stat-icon stat-icon-${tone}`}>{icon}</span>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        <p className="stat-hint">{hint}</p>
      </div>
    </div>
  );
}

// Dashboard top section: 4 summary cards, a category chart and low-stock alerts.
function Overview({ products, categories, totalValue, lowStockProducts, onEdit }) {
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);
  const maxValue = Math.max(1, ...categories.map((c) => c.value));
  const alerts = [...lowStockProducts].sort((a, b) => a.quantity - b.quantity).slice(0, 4);

  return (
    <section className="overview">
      <div className="stat-grid">
        <StatCard
          tone="indigo"
          icon={<IconBox />}
          label="Total products"
          value={products.length}
          hint={`${totalUnits} units in stock`}
        />
        <StatCard
          tone="green"
          icon={<IconDollar />}
          label="Inventory value"
          value={formatCurrency(totalValue)}
          hint="price x quantity"
        />
        <StatCard
          tone="amber"
          icon={<IconAlert />}
          label="Low stock items"
          value={lowStockProducts.length}
          hint="below 20 units"
        />
        <StatCard
          tone="pink"
          icon={<IconTag />}
          label="Categories"
          value={categories.length}
          hint="distinct groups"
        />
      </div>

      <div className="panel-grid">
        <div className="panel">
          <h3 className="panel-title">Value by category</h3>
          {categories.length === 0 ? (
            <p className="panel-empty">No data yet.</p>
          ) : (
            <ul className="bar-list">
              {categories.map((c) => (
                <li key={c.name}>
                  <div className="bar-row">
                    <span>{c.name}</span>
                    <span>{formatCurrency(c.value)}</span>
                  </div>
                  <div className="bar-track">
                    <span
                      className="bar-fill"
                      style={{
                        width: `${Math.max(3, (c.value / maxValue) * 100)}%`,
                        background: `hsl(${categoryHue(c.name)} 70% 58%)`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel">
          <h3 className="panel-title">Needs restocking</h3>
          {alerts.length === 0 ? (
            <p className="panel-empty">Everything is well stocked.</p>
          ) : (
            <ul className="alert-list">
              {alerts.map((p) => (
                <li key={p.id}>
                  <div>
                    <p className="alert-name">{p.name}</p>
                    <p className="alert-meta">
                      {p.quantity} units &middot; {getStockStatus(p.quantity).label}
                    </p>
                  </div>
                  <button type="button" className="btn btn-soft btn-sm" onClick={() => onEdit(p)}>
                    <IconEdit />
                    <span>Restock</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Overview;
