    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { Provider } from 'react-redux';
    import store from './store/index';
    import App from './App';
    import './css/main.scss'
    import { BrowserRouter } from 'react-router-dom';

    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
