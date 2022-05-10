import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import EnvironmentProvider from '@contexts/appEnvironment';
import ToastContainer from '@services/notifications/ToastContainer';
import createStore from '@store/index';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Router from './router/Router';

const App = () => (
    <EnvironmentProvider>
        <StoreProvider store={createStore()}>
            <BrowserRouter>
                <Router />
                <ToastContainer />
            </BrowserRouter>
        </StoreProvider>
    </EnvironmentProvider>
);

export default App;
