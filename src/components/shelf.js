import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: block;
  width: 100%;
`;

const Shelf = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)

export default Shelf;