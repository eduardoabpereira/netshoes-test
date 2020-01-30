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
  padding: 20px 3em 20px 0;
  margin-bottom: 30px;
  text-align: right;
  box-sizing: border-box;
`;

const HandleMiniCart = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  outline: none;
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
   * Função responsável pro adicionar o produto ao carrinho
   *  dentro dessa função há uma verificação de que se o produto já existe no carrinho
   *  caso o produto exista, a função irá apenas incrementar a quantidade do produto existente
   *  e se o produto não existir no carrinho, a função irá adicioná-lo.
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
   * Função responsável por remover o item do carrinho
   * Após clicar no X pra remover o produto do carrinho, essa função irá remover o item do array
   * e adicionar o itens remanescentes novamente ao carrinho, sendo assim, essa função remove os itens desejados
   * independente da quantidade que estiver adicionada do mesmo produto
   */
  removeItem = (sku) => {
    const { cart } = this.state;
    const remainedItems = cart.filter(item => item.sku !== sku); // mantém os produtos que possuem sku diferente do informado

    return this.setState({ cart: remainedItems }, () => this.updateCart('remove')); // após removido, é invocada a função de atualizar carrinho para atualizar o preço subtotal do carrinho
  }

  getMaxInstallments() {
    const { cart } = this.state;

    return Math.max.apply(Math, cart.map(item => item.installments))
  }

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
