// ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <Link to={`/product/${product.id}`}>View Details</Link>
  </div>
);
