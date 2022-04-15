import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer as OriginalToastContainer } from 'react-toastify';

const ToastContainer = () => (
    <OriginalToastContainer
        autoClose={5000}
        newestOnTop={false}
        position="top-right"
        rtl={false}
        closeOnClick
        draggable
        hideProgressBar
        pauseOnFocusLoss
        pauseOnHover
    />
);

export default ToastContainer;
