import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const openAuth = () => {
    return {
        type: actionTypes.OPEN_AUTH
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
    return {
        type: actionTypes.LOGOUT
    }
}

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (userId, token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userId,
        token
    }
}

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
            dispatch(loginSuccess(res.data.userId, res.data.token));
            dispatch(checkAuthTimeout(res.data.expiresIn));
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

export const signupSuccess = (userId, token) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
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
                dispatch(signupSuccess(res.data.userId, res.data.token));
                dispatch(checkAuthTimeout(res.data.expiresIn));
                dispatch(closeAuth());
            }).catch(err => {
                console.log(err.response);
                dispatch(signupFail(err.response));
            })
    }
}

