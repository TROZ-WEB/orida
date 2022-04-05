import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import version from './version';
import '@styles/base.scss';
import "@translations/i18n"; // initialize language settings

const root = document.getElementById('root');

if (!root) {
    throw new Error('Missing root element');
}

const { environmentName, sentryDsn, ...props } = root.dataset;

Sentry.init({
    dsn: sentryDsn,
    environment: environmentName,
    release: version ? `orida-frontend@${version}` : undefined,
});

ReactDOM.render(
    <React.StrictMode>
        <App {...props} />
    </React.StrictMode>,
    root,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
