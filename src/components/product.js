import React from 'react';
import styled from 'styled-components';
import Image from './product/image';
import Price from './product/price';
import Installment from './product/installment';
import ProductName from './product/productName';
// import Uda from './product/selectUda';

const ProductWrapper = styled.div`
  width: 33%;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  margin-bottom: 3em;
  vertical-align: top;
`;

const StyledImage = styled(Image)`
  margin-bottom: 10px;
`;
const StyledProductName = styled(ProductName)`
  margin-bottom: 10px;
`;
const ButtonBuy = styled.button`
  width: 80%;
  margin: 10px auto;
  background: black;
  color: white;
  text-align: center;
  padding: 8px 0;
  text-transform: uppercase;
  border: none;
  outline: none;
  cursor: pointer;
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
    {/* {hasUda && udas.map((uda, index) => (
      <Uda key={index} onClick={e => handleSelectUda(e, sku)} selected={udaSelected} sku={sku}>{uda}</Uda>
    ))} */}
    <ButtonBuy onClick={onClick}>Comprar</ButtonBuy>
  </ProductWrapper>
)

export default Product;