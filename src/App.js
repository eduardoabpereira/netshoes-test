/**
 * TODO:
 * + Implementar incremento de quantidade ao clicar no produto
 *    Verificar se id adicionado já existe no cart e caso positivo, adicionar chave de quantidade.
 * + Implementar visual do carrinho
 * + Deixar carrinho fixed
 * + Implementar subtotal
 * + Implementar botão pra visualizar carrinho (header?)
 * + Implementar persistência do carrinho (localstorage)
 * + Implementar testes
 * + Documentação
 * + Implementar remove from cart
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
  right: 100%;
  top: 0;
  background: #333;
`;

class App extends React.PureComponent {
  state = {
    open: false,
    cart: []
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getProducts())
  }


  addProduct = (id) => {
    const { products } = this.props;
    const { cart } = this.state;
    const add = products.products.filter(product => product.id === id)[0];
    const pushing = [...cart];
    pushing.push(add);

    this.setState({ cart: pushing, open: true }, () => console.log('product added to cart!'));
  }

  render() {
    const { products } = this.props;
    const { cart, open } = this.state;

    if (!Object.keys(products).length) {
      return 'Carregando...';
    }

    return (
      <div className="App">
        <Reset />
        <GlobalStyle />
        <Shelf>
          {products.products.map(product => {
            const principalPrice = Math.floor(product.price);
            const restPrice = (product.price % 1).toFixed(2).substring(2);
            return (
              <Product
                key={product.id}
                image={cat}
                productName={product.title}
                hasInstallment={!!product.installments}
                installment={product.installments}
                price={product.price}
                principalPrice={principalPrice}
                restPrice={restPrice}
                currencyCode={product.currencyFormat}
                onClick={() => this.addProduct(product.id)}
              />
            )
          })}
        </Shelf>
        <MiniCart
          isOpen={open}
          close={<Close onClick={() => this.setState({ open: false })}>X</Close>}
          items={cart}
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
