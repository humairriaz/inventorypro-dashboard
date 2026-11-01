import React from 'react';

function Footer({ totalProducts }) {
  return (
    <footer className="footer">
      <span>
        &copy; {new Date().getFullYear()} InventoryPro &middot; Product &amp; Inventory Dashboard
      </span>
      <span className="footer-right">
        {totalProducts} products tracked &middot; Built with React
      </span>
    </footer>
  );
}

export default Footer;
