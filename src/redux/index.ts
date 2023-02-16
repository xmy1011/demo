import { combineReducers, Store, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import auth from './modules/auth/reducer';
import global from './modules/golbal/reducer';
import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({auth, global});

// redux 持久配置
const persistConfig = {
  key: 'redux-state',
  storage: storage
};

const  persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);
// 创建 store
const store: Store = createStore(persistReducerConfig, middleWares)
// 创建持久化 store
const persistor =  persistStore(store);

export {store, persistor};