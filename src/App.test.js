import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import App from './App';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

it('renders App correctly', () => {
  const tree = TestRenderer
    .create(<Provider store={store}>
      <App />
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});