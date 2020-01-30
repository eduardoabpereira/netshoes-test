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
  z-index: 20;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  color: white;
  background: #202025;
  height: 100%;
  padding-top: 3em;
  width: ${p => p.isOpen ? '40%' : '0'};
  display: ${p => p.isOpen ? 'block' : 'none'};
  animation: ${p => openMiniCart(p)} 1s ease-in-out;
  animation-fill-mode: forwards;
  box-sizing: border-box;
`;

const CartTitle = styled.p`
  text-transform: uppercase;
  display: inline-block;
  font: bold 18px 'Open Sans';
  vertical-align: top;
  height: 40px;
  line-height: 40px;
  margin-left: 1em;
`;

const CartHeader = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

const CartIco = styled.p`
  background: url(${p => p.icoCart}) no-repeat center bottom;
  position: relative;
  width: 33px;
  height: 40px;
  display: inline-block;
  > span {
    font: bold 12px 'Open Sans';
    background: #dfbd00;
    display: inline-block;
    color: black;
    text-align: center;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 15px;
    position: absolute;
    top: 70%;
    left: 60%;
  }
`;

const TitleEmptyCart = styled.span`
  text-transform: uppercase;
  font: bold 16px 'Open Sans';
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
  font: 13px 'Open Sans';
  overflow: auto;
  height: 270px;
  padding-right: 10px;
  margin-top: 40px;
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

const ProductItem = styled.div`
  padding: 15px 0 25px;
  border-bottom: 2px solid #131316;
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
  font: bold 14px 'Open Sans';
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
  color: #999;
  font: 12px/12px 'Open Sans';
`;

const ProductQty = styled.span`
  display: block;
  color: #999;
  font: 12px/12px 'Open Sans';
`;

const ProductRemove = styled.button`
  display: block;
  background: url(${p => p.icoCartClose}) no-repeat center;
  width: 14px;
  height: 14px;
  border: none;
  color: transparent;
  cursor: pointer;
  padding: 0;
  outline: none;
  &:hover {
    background: url(${p => p.icoCartCloseInverse}) no-repeat center;
  }
`;

const ProductPriceWrapper = styled.div`
  display: block;
  color: #dfbd00;
  font: 16px 'Open Sans';
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
  color: #999;
  font: 14px 'Open Sans';
`;

const SubtotalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3em;
`;

const StyledProductName = styled(ProductName)`
  font: bold 14px/14px 'Open Sans';
`;

const SubtotalInstallments = styled.span`
  color: #999;
  font: 12px 'Open Sans';
  text-transform: uppercase;
`;

const SubtotalWithInstallments = styled.div``;

class MiniCart extends React.Component {
  renderCart() {
    const {
      items,
      removeItem,
      icoCartClose,
      icoCartCloseInverse
    } = this.props;

    return items.map((item, index) => {
      const principalPrice = Math.floor(item.price);
      const restPrice = (item.price % 1).toFixed(2).substring(2);
      return (
        <ProductItem key={index}>
          <ProductLeft>
            <CartImage image={cat} width={48} height={48} />
            <ProductDescription>
              <StyledProductName productName={item.title} />
              <ProductSku>{`${item.selectedSize} | ${item.style}`}</ProductSku>
              <ProductQty>Quantidade: {item.quantidade}</ProductQty>
            </ProductDescription>
          </ProductLeft>
          <ProductRight>
            <ProductRemove icoCartClose={icoCartClose} icoCartCloseInverse={icoCartCloseInverse} onClick={() => removeItem(item.sku)}>X</ProductRemove>
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
      totalByInstallments,
      icoCart
    } = this.props;

    const subtotalPrincipalPrice = subTotalCart.toFixed(2).toString().split('.')[0];
    const subtotalRestPrice = (subTotalCart % 1).toFixed(2).substring(2);
    return (
      <MiniCartWrapper isOpen={isOpen}>
        <CartContent>
        <CartHeader>
          <CartIco icoCart={icoCart}>
            <span>{items.length}</span>
          </CartIco>
          <CartTitle>Sacola</CartTitle>
        </CartHeader>
        <CartBody hasItems={items.length}>
          {!items.length && <TitleEmptyCart>Sua sacola está vazia!</TitleEmptyCart>}
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