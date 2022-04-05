import React from 'react';
import Router from "./router/Router";
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import createStore from '@store';

function App() {
    return (
        <StoreProvider store={createStore()}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App;
