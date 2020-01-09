import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { Provider } from 'react-redux';
// import store from './store';
import { HashRouter, BrowserRouter } from 'react-router-dom';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;

render(
    // <Provider store={store}>
    <Router>
        <App />
    </Router>
    // </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
