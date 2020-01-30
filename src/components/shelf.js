import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 760px;
  margin: 0 auto 0;
  display: block;
  width: 100%;
  padding-top: 50px;
`;

const Shelf = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)

export default Shelf;