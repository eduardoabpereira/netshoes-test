/**
 * TODO:
 * DONE Implementar incremento de quantidade ao clicar no produto
 *    Verificar se id adicionado já existe no cart e caso positivo, adicionar chave de quantidade.
 * DONE Implementar visual do carrinho
 * DONE Deixar carrinho fixed
 * DONE Implementar subtotal
 * + Implementar botão pra visualizar carrinho (header?)
 * DONE Implementar persistência do carrinho (localstorage)
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
const assetsPath = `${process.env.PUBLIC_URL}/assets/`;

const GlobalStyle = createGlobalStyle`
  body {
    position: relative;
    font-family: 'Open Sans', Arial;
  }
`;

const Header = styled.div`
  width: 100%;
  display: block;
  background: black;
  color: white;
  padding: 10px 3em 15px 0;
  margin-bottom: 30px;
  text-align: right;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const HandleMiniCart = styled.button`
  background: url(${p => p.icoCart}) no-repeat center bottom;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
  position: relative;
  width: 33px;
  height: 30px;
  display: inline-block;
  background-size: 75%;
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

const BlockContentCart = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: ${p => p.isOpen ? 'block' : 'none'};
`;

class App extends React.PureComponent {
  state = {
    open: false,
    cart: JSON.parse(window.localStorage.getItem('cart')) || [],
    subTotalCart: 0,
    selectedUda: []
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getProducts());
    if (window && window.localStorage && window.localStorage.getItem('cart')) {
      this.setState({ cart: JSON.parse(window.localStorage.getItem('cart')) }, () => this.updateCart())
    }
  }

  /**
   * @method updateCart
   * @param action recebe a ação executada no carrinho (add ou remove)
   * @description atualiza o subtotal e adiciona o carrinho no localStorage para persistência
   */
  updateCart = (action) => {
    const { cart } = this.state;

    let subtotal = 0;

    if (action === 'remove') {
      for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantidade;
      }
      this.setState({ subTotalCart: subtotal });
      return window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    for (let i = 0; i < cart.length; i++) {
      subtotal += cart[i].price * cart[i].quantidade;
    }
    this.setState({ subTotalCart: subtotal });

    return window.localStorage.setItem('cart', JSON.stringify(cart));
  }

  /**
   * @method addProduct
   * @param {*} sku sku do produto
   * @description adiciona ou atualiza o produto no carrinho se já existir
   */
  addProduct = (sku) => {
    const { products } = this.props;
    const { cart, selectedUda } = this.state;
    const fromProduct = products.products.filter(product => product.sku === sku);
    fromProduct[0].quantidade = 1;
    fromProduct[0].selectedSize = selectedUda[0].size;
    const add = cart.length ?
      cart.map(item => item.sku === sku ? {...item, quantidade: item.quantidade + 1, selectedSize: selectedUda[0].size} : item) : fromProduct[0];
    const hasInCart = cart.some(el => el.sku === sku)
    const newCart = hasInCart ? [...add] : [...cart, ...fromProduct]

    if (!cart.length) {
      return this.setState({ cart: [...cart, { ...add, quantidade: 1 }], open: true }, () => this.updateCart('add'))
    }

    return this.setState({ cart: [...newCart], open: true }, () => this.updateCart('add'))
  }

  /**
   * @method removeItem
   * @param {*} sku sku do produto
   * @description remove o item especificado pelo sku informado no parâmetro
   */
  removeItem = (sku) => {
    const { cart } = this.state;
    const remainedItems = cart.filter(item => item.sku !== sku);

    return this.setState({ cart: remainedItems }, () => this.updateCart('remove'));
  }

  /**
   * @method getMaxInstallments
   * @description Verifica em cada item do carrinho qual a maior parcela disponível para exibir no subtotal
   */
  getMaxInstallments() {
    const { cart } = this.state;

    return Math.max.apply(Math, cart.map(item => item.installments))
  }

  /**
   * @method handleSelectUda
   * @param {*} e event
   * @param {*} sku sku do produto
   */
  handleSelectUda(e, sku) {
    const { selectedUda } = this.state;

    const changeUda = selectedUda.map(uda => uda.sku === sku ? {...uda, size: e.target.value } : uda);
    const hasUda = selectedUda.some(el => el.sku === sku);
    const newUda = hasUda ? [...changeUda] : [...selectedUda, { sku, size: e.target.value }]

    return this.setState({ selectedUda: [...newUda] }, () => console.log('teste', selectedUda))
  }

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
          <HandleMiniCart icoCart={`${assetsPath}ico-cart.png`} onClick={() => this.setState({ open: !open })} qty={cart.length}>
            <span>{cart.length}</span>
          </HandleMiniCart>
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
                hasUda={product.availableSizes.length}
                udas={product.availableSizes}
                handleSelectUda={this.handleSelectUda.bind(this)}
                udaSelected={selectedUda}
                sku={product.sku}
              />
            )
          })}
        </Shelf>
        <BlockContentCart onClick={() => this.setState({ open: false })} isOpen={open} />
        <MiniCart
          isOpen={open}
          items={cart}
          removeItem={this.removeItem}
          subTotalCart={subTotalCart}
          maxInstallments={this.getMaxInstallments()}
          totalByInstallments={subTotalCart / this.getMaxInstallments()}
          icoCart={`${assetsPath}ico-cart.png`}
          icoCartClose={`${assetsPath}ico-close.png`}
          icoCartCloseInverse={`${assetsPath}ico-close-inverse.png`}
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
