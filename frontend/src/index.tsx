import '@styles/base.css';
import '@styles/tailwind.css';
import '@translations/i18n'; // initialize language settings

import * as Sentry from '@sentry/browser';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import version from './version';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Missing root element');
}

const { environmentName, sentryDsn, ...props } = container.dataset;

Sentry.init({
    dsn: sentryDsn,
    environment: environmentName,
    release: version ? `orida-frontend@${version}` : undefined,
});

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App {...props} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
