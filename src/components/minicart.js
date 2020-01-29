import React from 'react';
import styled, { keyframes } from 'styled-components';
import ProductName from './product/productName';
import cat from '../cat.jpg';
import Image from './product/image';

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
  background: orange;
  color: black;
  text-align: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 15px;
`;

const CartBody = styled.div`
  display: ${p => !p.hasItems ? 'flex' : 'block'};
  ${p => !p.hasItems && (
    `flex-direction: column;
    justify-content: center;
    align-items: center;
  `)}
  width: 100%;
  text-align: center;
  font: 13px Arial;
  overflow: auto;
  height: 228px;
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
  display: flex;
  width: 100%;
`;

const CartImage = styled(Image)`
  display: inline-flex;
  vertical-align: middle;
  margin-right: 1em;
`;

const BuyButton = styled.button`
  display: ${p => p.hasItems ? 'block' : 'none'};
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

const ProductLeft = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 80%;
`;

const ProductDescription = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const ProductRight = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  width: 20%;
`;

const ProductSku = styled.span`
  display: block;
  margin: 5px 0;
`;

const ProductQty = styled.span`
  display: block;
`;

const ProductRemove = styled.button`
  display: block;
  background: none;
  border: none;
  color: black;
  font: bold 12px Arial;
  cursor: pointer;
  padding: 0;
  outline: none;
  &:hover {
    color: white;
  }
`;

const ProductPriceWrapper = styled.div`
  display: block;
  color: orange;
  font: 16px Arial;
`;

const ProductCurrency = styled.span`
  display: initial;
`;

const ProductPrincipalPrice = styled.span`
  display: inline-block;
  font-weight: bold;
`;

const ProductRestPrice = styled.span`
  display: inline-block;
`;

const SubtotalPriceWrapper = styled(ProductPriceWrapper)`
  font-size: 24px;
  text-align: right;
`;
const SubtotalCurrency = styled(ProductCurrency)``;
const SubtotalPrincipalPrice = styled(ProductPrincipalPrice)``;
const SubtotalRestPrice = styled(ProductRestPrice)``;
const SubtotalTitle = styled.span`
  text-transform: uppercase;
  color: lightgrey;
`;

const SubtotalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3em;
`;

const SubtotalInstallments = styled.span``;

const SubtotalWithInstallments = styled.div``;

class MiniCart extends React.Component {
  renderCart() {
    const { items, removeItem } = this.props;

    return items.map((item, index) => {
      const principalPrice = Math.floor(item.price);
      const restPrice = (item.price % 1).toFixed(2).substring(2);
      return (
        <ProductItem key={index}>
          <ProductLeft>
            <CartImage image={cat} width={48} height={48} />
            <ProductDescription>
              <ProductName productName={item.title} />
              <ProductSku>{`GGG | ${item.style}`}</ProductSku>
              <ProductQty>Quantidade: {item.quantidade}</ProductQty>
            </ProductDescription>
          </ProductLeft>
          <ProductRight>
            <ProductRemove onClick={() => removeItem(item.sku)}>X</ProductRemove>
            <ProductPriceWrapper>
              <ProductCurrency>{`R$ `}</ProductCurrency>
              <ProductPrincipalPrice>{principalPrice}</ProductPrincipalPrice>
              <ProductRestPrice>{`,${restPrice}`}</ProductRestPrice>
            </ProductPriceWrapper>
          </ProductRight>
        </ProductItem>
      )
    })
  }

  render() {
    const {
      isOpen,
      close,
      items,
      subTotalCart,
      maxInstallments,
      totalByInstallments
    } = this.props;

    const subtotalPrincipalPrice = subTotalCart.toFixed(2).toString().split('.')[0];
    const subtotalRestPrice = (subTotalCart % 1).toFixed(2).substring(2);
    return (
      <MiniCartWrapper isOpen={isOpen}>
        <CartClose>{close}</CartClose>
        <CartContent>
        <CartHeader>
          <CartIco>{items.length}</CartIco>
          <CartTitle>Sacola</CartTitle>
        </CartHeader>
        <CartBody hasItems={items.length}>
          {!items.length && 'Sua sacola está vazia!'}
          {this.renderCart()}
        </CartBody>
        {items.length ? (
          <CartFooter>
            <SubtotalWrapper>
              <SubtotalTitle>Subtotal</SubtotalTitle>
              <SubtotalWithInstallments>
                <SubtotalPriceWrapper>
                  <SubtotalCurrency>{`R$ `}</SubtotalCurrency>
                  <SubtotalPrincipalPrice>{subtotalPrincipalPrice}</SubtotalPrincipalPrice>
                  <SubtotalRestPrice>{`,${subtotalRestPrice}`}</SubtotalRestPrice>
                </SubtotalPriceWrapper>
                <SubtotalInstallments>{`ou em até ${maxInstallments > 0 ? maxInstallments : 1}x R$ ${maxInstallments > 0 ? totalByInstallments.toFixed(2).replace('.', ',') : subTotalCart.toFixed(2).replace('.', ',')}`}</SubtotalInstallments>
              </SubtotalWithInstallments>
            </SubtotalWrapper>
            <BuyButton hasItems={items.length}>Comprar</BuyButton>
          </CartFooter>
        ) : null}
        </CartContent>
      </MiniCartWrapper>
    )
  }
}

export default MiniCart;