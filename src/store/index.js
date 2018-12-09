import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; 
import thunk  from 'redux-thunk';
import reducers from '../reducers';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['savedTweets']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  {},
  compose(
    applyMiddleware(thunk,logger)
  )
);
const persistor = persistStore(store)
  
export default { store, persistor };
