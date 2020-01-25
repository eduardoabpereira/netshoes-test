import React from 'react';
import styled from 'styled-components';
import Image from './image';
import Price from './price';
import Installment from './installment';
import ProductName from './productName';

const ProductWrapper = styled.div`
  width: 33%;
  box-sizing: border-box;
  display: inline-block;
`;

const Product = ({
  hasInstallment,
  price,
  image,
  installment,
  productName,
  currencyCode
}) => (
  <ProductWrapper>
    <Image image={image} />
    <ProductName productName={productName} />
    <Price price={price} currencyCode={currencyCode} />
    {hasInstallment && (
      <Installment
        price={price}
        installment={installment}
        currencyCode={currencyCode}
      />
    )}
  </ProductWrapper>
)

export default Product;