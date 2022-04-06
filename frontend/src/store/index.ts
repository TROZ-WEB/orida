import { AnyAction, applyMiddleware, combineReducers, compose, createStore as createReduxStore, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage'

import { SIGN_OUT } from './auth/types';
import authReducer from './auth/reducer';
import { useSelector } from 'react-redux';

// import logger from 'redux-logger';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose; // connect redux dev tools in browser
    }
}

const appReducer = combineReducers({
    auth: authReducer,
});

export type AppState = ReturnType<typeof appReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: AnyAction): AppState => {
    if (action.type === SIGN_OUT) {
        storage.removeItem('persist:root');
        state = undefined;
    }

    return appReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user', 'shoppingCart'],
};

interface ReturnTypeConfigStore {
    store: Store;
    persistor: Persistor;
}

export const createStore = (): ReturnTypeConfigStore => {
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const middlewares = [
        thunkMiddleware,
        // logger, // remove temporarily redux-logger to avoid flooding the console
    ];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

    const store = createReduxStore(persistedReducer, composeEnhancers(middlewareEnhancer));

    const persistor = persistStore(store);

    return { store, persistor };
};

const preloadedState = (): Store => {
    return createStore().store;
};

export default preloadedState;
