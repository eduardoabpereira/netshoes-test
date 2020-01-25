import React from 'react';

const Price = ({ currencyCode, price }) => (
  <h2>
    {`${currencyCode} ${price}`}
  </h2>
);

export default Price;