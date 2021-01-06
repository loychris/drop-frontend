import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from './store/actions/actionTypes';
import StreamReducer from './store/reducers/StreamReducer';
import ChatReducer from './store/reducers/ChatReducer';
import UserReducer from './store/reducers/UserReducer';
import UIReducer from './store/reducers/UIReducer'

axios.defaults.baseURL = 'http://localhost:5000';

const appReducer = combineReducers({
    user: UserReducer,
    chat: ChatReducer,
    stream: StreamReducer,
    ui: UIReducer,
});

const rootReducer = (state, action) => {
    if(action.type === actions.LOGOUT){
        console.log('logging out in index.js');
        state = undefined;
    }
    return appReducer(state, action);
}

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


const store = createStore(
    rootReducer, /* preloadedState, */
    composeEnhancers(
        applyMiddleware(thunk)
    )
  );

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
