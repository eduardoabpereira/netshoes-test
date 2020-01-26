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
  text-align: center;
  margin-bottom: 3em;
  vertical-align: top;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  margin-bottom: 10px;
`;
const StyledProductName = styled(ProductName)`
  margin-bottom: 10px;
`;

const Product = ({
  hasInstallment,
  price,
  principalPrice,
  restPrice,
  image,
  installment,
  productName,
  currencyCode,
  ...props
}) => (
  <ProductWrapper {...props}>
    <StyledImage image={image} />
    <StyledProductName productName={productName} />
    <Price
      currencyCode={currencyCode}
      principalPrice={principalPrice}
      restPrice={restPrice}
    />
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