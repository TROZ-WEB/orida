import 'react-toastify/dist/ReactToastify.css';

import ToastContainer from '@services/notifications/ToastContainer';
import createStore from '@store/index';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Router from './router/Router';

const App = () => (
    <StoreProvider store={createStore()}>
        <BrowserRouter>
            <Router />
            <ToastContainer />
        </BrowserRouter>
    </StoreProvider>
);

export default App;
