import { applyMiddleware, createStore, compose } from 'redux';
import reducers from './modules';
import logger from 'redux-logger';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(logger)));
export default store;
