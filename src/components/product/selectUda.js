import React from 'react';
import styled from 'styled-components';

const ChooseUda = styled.button`
  background: none;
  border: 1px solid black;
  color: black;
  width: 48px;
  height: 25px;
  line-height: 23px;
  text-align: center;
  cursor: pointer;
  margin: 10px 5px 0;
  &.selected {
    background: black;
    color: white;
  }
`;

const Uda = ({ children, className, selected, onClick, sku }) => (
  <ChooseUda
    onClick={onClick}
    value={children}
    skuproduct={sku}
    className={`${className} ${selected.size === children && selected.sku === sku && 'selected'}`}
  >
    {children}
  </ChooseUda>
);

export default Uda;