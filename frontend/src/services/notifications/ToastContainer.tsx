import React from "react";
import { ToastContainer as OriginalToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastContainer() {
    return (
        <OriginalToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}

export default ToastContainer;
