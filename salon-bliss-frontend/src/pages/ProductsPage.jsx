import React from 'react';
import ProductList from '../components/Products/ProductList';

const ProductsPage = () => {
  return (
    <div className="container mt-3">
      <h1>Our Products</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;