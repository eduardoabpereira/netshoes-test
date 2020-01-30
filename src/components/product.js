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


/**
 * @method Product
 * @param {*} hasInstallment verifica se existe parcela pra esse produto
 * @param {*} price preço do produto
 * @param {*} principalPrice inteiro do preço do produto
 * @param {*} restPrice resto do preço do produto
 * @param {*} image imagem do produto
 * @param {*} installment quantidade de parcelas
 * @param {*} productName nome do produto
 * @param {*} currencyCode moeda do preço do produto
 * @param {*} hasUda verifica se o produto possui variação
 * @param {*} udas variações do produto
 * @param {*} handleSelectUda seleciona variação do produto
 * @param {*} onClick muda a variação do produto
 * @param {*} sku sku do produto
 * @param {*} udaSelected variação do produto selecionada
 * @param {*} props rest props
 * @description componente do produto
 */
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
    <ButtonBuy onClick={onClick}>Comprar</ButtonBuy>
  </ProductWrapper>
)

export default Product;