import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose  } from 'redux';

import axios from 'axios';

import StreamReducer from './store/reducers/StreamReducer'
import ChatReducer from './store/reducers/ChatReducer'
import UIReducer from './store/reducers/UIReducer'

axios.defaults.baseURL = 'http://localhost:5000';

const rootReducer = combineReducers({
    stream: StreamReducer,
    chat: ChatReducer,
    ui: UIReducer
});

const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
    rootReducer, /* preloadedState, */
    enhancers
  );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
