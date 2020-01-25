import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from './actions/products';
import { Reset } from 'styled-reset';
import Shelf from './components/shelf';
import Product from './components/product';
import cat from './cat.jpg';

class App extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getProducts())
  }
  render() {
    const { products } = this.props;
    if (!Object.keys(products).length) {
      return 'Carregando...';
    }

    return (
      <div className="App">
        <Reset />
        <Shelf>
          {products.products.map(product => (
            <Product
              key={product.id}
              image={cat}
              productName={product.title}
              hasInstallment={!!product.installments}
              installment={product.installments}
              price={product.price}
              currencyCode={product.currencyFormat}
            />
          ))}
        </Shelf>
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
