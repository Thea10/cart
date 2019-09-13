import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {displayList, searchProducts, filterSize} from './reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';

const logger = createLogger();
const rootReducer = combineReducers ({displayList, searchProducts, filterSize});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, /*logger*/));


ReactDOM.render(
  <Provider store={store}>
    <App  strings={[
      'Some <i>strings</i> are slanted',
      'Some <strong>strings</strong> are bold',
      'HTML characters &times; &copy;'
    ]} />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
