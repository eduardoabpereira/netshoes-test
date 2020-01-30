import React from 'react';
import styled from 'styled-components';

const StyledInstallments = styled.h3`
  color: #999;
  font: 14px 'Open Sans';
`;
const WithBold = styled.strong`
  font-weight: bold;
`;

const Installment = ({ currencyCode, installment, price }) => (
  <StyledInstallments>
    {`ou ${installment}x `}
    <WithBold>{currencyCode} {Math.abs(price/installment).toFixed(2)}</WithBold>
  </StyledInstallments>
);

export default Installment;