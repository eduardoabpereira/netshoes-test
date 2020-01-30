import React from 'react';
import styled from 'styled-components';
import Image from './product/image';
import Price from './product/price';
import Installment from './product/installment';
import ProductName from './product/productName';
import Uda from './product/selectUda';

const ProductWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  max-width: 250px;
  padding: 20px;
`;

const StyledImage = styled(Image)`
  margin-bottom: 10px;
  width: 100%;
`;
const StyledProductName = styled(ProductName)`
  margin-bottom: 10px;
  font: 14px 'Open Sans';
  color: #313135;
  height: 38px;
`;
const ButtonBuy = styled.button`
  width: 100%;
  margin: 10px auto;
  background: black;
  color: white;
  text-align: center;
  padding: 8px 0;
  text-transform: uppercase;
  border: none;
  outline: none;
  cursor: pointer;
  font: bold 14px 'Open Sans';
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const PriceWithInstallments = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  min-height: 45px;
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
  hasUda,
  udas,
  handleSelectUda,
  onClick,
  sku,
  udaSelected,
  ...props
}) => (
  <ProductWrapper {...props}>
    <StyledImage image={image} />
    <StyledProductName productName={productName} />
    <PriceWithInstallments>
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
    </PriceWithInstallments>
    <div>
      {hasUda && udas.map((uda, index) => (
        <Uda key={index} onClick={e => handleSelectUda(e, sku)} selected={udaSelected} sku={sku}>{uda}</Uda>
      ))}
    </div>
    <ButtonBuy onClick={onClick} disabled={!udaSelected.length}>Comprar</ButtonBuy>
  </ProductWrapper>
)

export default Product;