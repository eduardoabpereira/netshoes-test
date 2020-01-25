import React from 'react';

const Installment = ({ currencyCode, installment, price }) => (
  <h3>{`ou ${installment}x ${currencyCode} ${Math.abs(price/installment).toFixed(2)}`}</h3>
);

export default Installment;