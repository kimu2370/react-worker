import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './modules';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(logger))
);
export default store;
