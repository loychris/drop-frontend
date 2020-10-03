import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import { setDropsNotLoaded } from './streamActions';

export const openAuth = (authReason) => {
    return {
        type: actionTypes.OPEN_AUTH,
        authReason
    }
}

export const closeAuth = () => {
    return {
        type: actionTypes.CLOSE_AUTH
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
}

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};


export const loginFail = (response) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: response ?? 'Something went wrong'
    }
}

export const login = (identifier, password) => {
    return dispatch => {
        dispatch(loginStart())
        axios.post(
            '/api/users/login', 
            JSON.stringify({
                identification: identifier,
                password: password
            }), 
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.userId);
            dispatch(authSuccess(res.data.userId, res.data.token));
            dispatch(checkAuthTimeout(res.data.expiresIn));
            dispatch(setDropsNotLoaded())
            dispatch(closeAuth());
        }).catch(err => {
            if(err.response && err.response.message){
                dispatch(loginFail(err.response.message));
            }else {
                dispatch(loginFail("Check your connection, Bro"))
            }
        })
    }
}

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const authSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId,
        token
    }
}

export const signupFail = (response) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: response.data.message ?? 'Something went wrong'
    }
}

export const signup = (name, email, handle, password) => {
    return dispatch => {
        dispatch(signupStart())
        axios.post(
            '/api/users/signup', 
            JSON.stringify({
                email: email,
                password: password,
                handle: handle,
                name: name
            }), 
            { headers: { 'Content-Type': 'application/json' } }
            ).then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.userId);
                dispatch(authSuccess(res.data.userId, res.data.token));
                dispatch(checkAuthTimeout(res.data.expiresIn));
                dispatch(closeAuth());
            }).catch(err => {
                console.log(err.response);
                dispatch(signupFail(err.response));
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationTime'));
            if(expirationDate > new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(userId, token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}