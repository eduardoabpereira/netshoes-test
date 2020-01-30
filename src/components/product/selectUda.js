import React from 'react';
import styled from 'styled-components';

const ChooseUda = styled.label`
  background: none;
  border: 1px solid black;
  color: black;
  width: 46px;
  height: 25px;
  line-height: 23px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  margin: 10px 2px 0;
  &.selected {
    background: black;
    color: white;
  }
`;

const InvisibleInput = styled.input`
  font-size: 0;
  visibility: hidden;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

const Uda = ({ children, className, selected, onClick, sku }) => {
  const selectedUda = selected.map(el => el.sku === sku && el.size === children && el).filter(filtered => filtered !== false);
  return (
  <ChooseUda htmlFor={`${sku}_${children}`} className={`${className} ${selectedUda.length && selectedUda[0].size === children && selectedUda[0].sku === sku && 'selected'}`}>
    {children}
    <InvisibleInput
      type="radio"
      onChange={onClick}
      value={children}
      checked={selectedUda.length && selectedUda[0].size === children && selectedUda[0].sku === sku}
      skuproduct={sku}
      name={sku}
      id={`${sku}_${children}`}
      className={className}
    />
  </ChooseUda>
)};

export default Uda;