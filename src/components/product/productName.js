import React from 'react';

/**
 * @method ProductName
 * @param {*} productName nome do produto
 * @param {*} className class de estilos do componente
 */
const ProductName = ({ productName, className })=> (
  <h2 className={className}>{productName}</h2>
)

export default ProductName;