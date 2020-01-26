import React from 'react';
import styled, { keyframes } from 'styled-components';
import ProductName from './productName';
import cat from '../cat.jpg';
import Image from './image';

const openMiniCart = (props) => keyframes`
  from {
    width: 0;
    display: none;
  }

  to {
    width: ${props.isOpen ? '40%' : '0'};
    display: ${props.isOpen ? 'block' : 'none'};
  }
`;

const MiniCartWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  color: white;
  background: #333;
  height: 100%;
  padding-top: 3em;
  width: ${p => p.isOpen ? '40%' : '0'};
  display: ${p => p.isOpen ? 'block' : 'none'};
  animation: ${p => openMiniCart(p)} 1s ease-in-out;
  animation-fill-mode: forwards;
`;

const CartTitle = styled.p`
  text-transform: uppercase;
  display: inline-block;
  font: bold 18px Arial;
`;

const CartHeader = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

const CartIco = styled.p`
  display: inline-block;
  background: yellow;
  color: black;
  text-align: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 15px;
`;

const CartBody = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  font: 13px Arial;
  overflow: auto;
  height: 207px;
  padding-right: 10px;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #000;
    border-radius: 5px;
  }
`;

const CartFooter = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 3em;
`;

const CartContent = styled.div`
  position: fixed;
  width: inherit;
  padding: 0 1em;
  box-sizing: border-box;
`;

const CartClose = styled.div`
  position: fixed;
  top: 0;
`;

const ProductItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid black;
  text-align: left;
  h2 {
    display: inline-block;
  }
`;

const CartImage = styled(Image)`
  display: inline-block;
  vertical-align: middle;
  margin-right: 1em;
`;

const Button = styled.button`
  background: black;
  color: white;
  text-align: center;
  padding: 15px 0;
  text-transform: uppercase;
  font: 14px Arial;
  border: none;
  width: 100%;
  margin: 0 auto;
  cursor: pointer;
  outline: none;
`;


class MiniCart extends React.Component {
  renderCart() {
    const { items } = this.props;

    return items.map(item => (
      <ProductItem>
        <CartImage image={cat} width={48} height={48} />
        <ProductName productName={item.title} />
      </ProductItem>
    ))
  }

  render() {
    const { isOpen, close, items } = this.props;
    console.log('cart => ', items)
    return (
      <MiniCartWrapper isOpen={isOpen}>
        <CartClose>{close}</CartClose>
        <CartContent>
        <CartHeader>
          <CartIco>3</CartIco>
          <CartTitle>Sacola</CartTitle>
        </CartHeader>
        <CartBody>
          {!items.length && 'Sua sacola está vazia!'}
          {this.renderCart()}
        </CartBody>
        <CartFooter>
          <Button>Comprar</Button>
        </CartFooter>
        </CartContent>
      </MiniCartWrapper>
    )
  }
}

export default MiniCart;