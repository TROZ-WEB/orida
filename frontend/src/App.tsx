import createStore from '@store/index';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Router from './router/Router';

function App() {
    return (
        <StoreProvider store={createStore()}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;
