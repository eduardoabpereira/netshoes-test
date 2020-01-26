import React from 'react';
import styled from 'styled-components';

const PrincipalPrice = styled.h2`
  font-size: 1.3em;
  font-weight: bold;
  border-top: 2px solid orange;
  display: inline-block;
  padding-top: 7px;
`;

const StyledSmall = styled.small`
  font-size: 0.8em;
`;

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