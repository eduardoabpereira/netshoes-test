import React from 'react';
import styled from 'styled-components';

const PrincipalPrice = styled.h2`
  font-size: 1.3em;
  font-weight: bold;
  border-top: 2px solid #dfbd00;
  display: inline-block;
  padding-top: 7px;
`;

const StyledSmall = styled.small`
  font-size: 0.8em;
`;

/**
 * @method Price
 * @param {*} currencyCode moeda do preço do produto
 * @param {*} principalPrice inteiro do preço do produto
 * @param {*} restPrice resto do preço do produto
 * @description componente do preço do produto
 */
const Price = ({ currencyCode, principalPrice, restPrice }) => (
  <>
    <StyledSmall>
      {currencyCode}
    </StyledSmall>
    <PrincipalPrice>
      {principalPrice}
    </PrincipalPrice>
    <StyledSmall>
      {`,${restPrice}`}
    </StyledSmall>
  </>
);

export default Price;