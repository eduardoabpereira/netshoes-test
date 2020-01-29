/**
 * TODO:
 * DONE Implementar incremento de quantidade ao clicar no produto
 *    Verificar se id adicionado já existe no cart e caso positivo, adicionar chave de quantidade.
 * + Implementar visual do carrinho
 * DONE Deixar carrinho fixed
 * DONE Implementar subtotal
 * + Implementar botão pra visualizar carrinho (header?)
 * + Implementar persistência do carrinho (localstorage)
 * DONE Implementar remove from cart
 * + Implementar testes
 * + Documentação
 */
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { getProducts } from './actions/products';
import { Reset } from 'styled-reset';
import Shelf from './components/shelf';
import Product from './components/product';
import MiniCart from './components/minicart';
import cat from './cat.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    position: relative;
  }
`;
const Close = styled.p`
  color: white;
  font: bold 14px Arial;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
`;

const Header = styled.div`
  width: 100%;
  display: block;
  background: black;
  color: white;
  padding: 20px 0;
  margin-bottom: 30px;
`;

const HandleMiniCart = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
`;

class App extends React.PureComponent {
  state = {
    open: false,
    cart: [],
    subTotalCart: 0,
    selectedUda: {}
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getProducts())
  }

  updateCart = (action) => {
    const { cart } = this.state;

    let subtotal = 0;

    if (action === 'remove') {
      for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantidade;
      }
      return this.setState({ subTotalCart: subtotal });
    }

    for (let i = 0; i < cart.length; i++) {
      subtotal += cart[i].price * cart[i].quantidade;
    }
    return this.setState({ subTotalCart: subtotal });
  }


  addProduct = (sku) => {
    const { products } = this.props;
    const { cart } = this.state;
    const fromProduct = products.products.filter(product => product.sku === sku);
    fromProduct[0].quantidade = 1;
    const add = cart.length ?
      cart.map(item => item.sku === sku ? {...item, quantidade: item.quantidade + 1} : item) : fromProduct[0];
    const hasInCart = cart.some(el => el.sku === sku)
    const newCart = hasInCart ? [...add] : [...cart, ...fromProduct]

    if (!cart.length) {
      return this.setState({ cart: [...cart, { ...add, quantidade: 1 }], open: true }, () => this.updateCart('add'))
    }

    return this.setState({ cart: [...newCart], open: true }, () => this.updateCart('add'))
  }

  removeItem = (sku) => {
    const { cart } = this.state;
    const remainedItems = cart.filter(item => item.sku !== sku);

    return this.setState({ cart: remainedItems }, () => this.updateCart('remove'));
  }

  getMaxInstallments() {
    const { cart } = this.state;

    return Math.max.apply(Math, cart.map(item => item.installments))
  }

  // handleSelectUda(e, sku) {
  //   const { products } = this.props;
  //   const { selectedUda } = this.state;
  //   return products.products.map(product => {
  //     console.log('teste: ', selectedUda)
  //     return product.sku === sku && product.availableSizes.includes(e.target.value) && this.setState({ selectedUda: { sku, size: e.target.value } })
  //   });
  // }

  render() {
    const { products } = this.props;
    const { cart, open, subTotalCart, selectedUda } = this.state;

    if (!Object.keys(products).length) {
      return 'Carregando...';
    }

    return (
      <div className="App">
        <Reset />
        <GlobalStyle />
        <Header>
          <HandleMiniCart onClick={() => this.setState({ open: !open })} qty={cart.length}>{`Sacola(${cart.length})`}</HandleMiniCart>
        </Header>
        <Shelf>
          {products.products.map(product => {
            const principalPrice = Math.floor(product.price);
            const restPrice = (product.price % 1).toFixed(2).substring(2);
            return (
              <Product
                key={product.sku}
                image={cat}
                productName={product.title}
                hasInstallment={!!product.installments}
                installment={product.installments}
                price={product.price}
                principalPrice={principalPrice}
                restPrice={restPrice}
                currencyCode={product.currencyFormat}
                onClick={() => this.addProduct(product.sku)}
                // hasUda={product.availableSizes.length}
                // udas={product.availableSizes}
                // handleSelectUda={this.handleSelectUda.bind(this)}
                // udaSelected={selectedUda}
                // sku={product.sku}
              />
            )
          })}
        </Shelf>
        <MiniCart
          isOpen={open}
          close={<Close onClick={() => this.setState({ open: false })}>X</Close>}
          items={cart}
          removeItem={this.removeItem}
          subTotalCart={subTotalCart}
          maxInstallments={this.getMaxInstallments()}
          totalByInstallments={subTotalCart / this.getMaxInstallments()}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
  ...state,
  products: state.products,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
