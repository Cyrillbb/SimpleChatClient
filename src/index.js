import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import io from "socket.io-client";
import { ErrorBoundary } from './ErrorBoundary';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
//const socket = io.connect('http://localhost:5000');
const socket = io.connect('https://cyrils-simple-chat.herokuapp.com/');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App socket={socket} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
