// ProductList.js

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import ProductCard from './ProductCard';

const ProductList = ({ products, fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
};

const mapStateToProps = state => ({ products: state.products });

const mapDispatchToProps = { fetchProducts };

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
