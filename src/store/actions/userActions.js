import axios from 'axios';

import * as actionTypes from './actionTypes';
import { setDropsNotLoaded } from './streamActions';
import { closeMenu } from './UIActions';
import { 
    setChatStateOnLogin } from './chatActions';

export const logout = () => {
    localStorage.clear()
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
    }
}


//------ LOGIN -----------------------------------------------------------------------


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
            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch(loginSuccess(res.data));
            dispatch(setDropsNotLoaded());
            dispatch(setChatStateOnLogin(res.data))
            dispatch(closeMenu());
        }).catch(err => {
            if(err.response && err.response.data && err.response.data.message){
                dispatch(loginFail(err.response.data.message));
            }else {
                dispatch(loginFail("Check your connection, bro"))
            }
        })
    }
}

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (responseData) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        ...responseData
    }
}

export const loginFail = (message) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: message ? message : 'Something went wrong'
    }
}

//------ SIGNUP ----------------------------------------------------------------------

export const signup = (name, email, handle, password, profilePic, src) => {
    console.log('SRCSRCSRC', src);
    return dispatch => {
        dispatch(signupStart())
        const url = '/api/users/signup';
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('handle', handle);
        formData.append('password', password);
        formData.append('profilePic', profilePic)
        axios({
            method: 'post',
            url: url, 
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
            console.log(res.data);
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('user', JSON.stringify(res.data));                
            dispatch(signupSuccess(res.data, src));
            dispatch(setDropsNotLoaded());
            dispatch(setChatStateOnLogin(res.data))
            dispatch(closeMenu());
        }).catch(err => {
            console.log(err)
            dispatch(signupFail(err.response));
        })
    }
}

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

export const signupSuccess = (responseData, profilePicSrc) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        profilePicSrc,
        ...responseData
    }
}

export const signupFail = (response) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: response && response.data && response.data.message ? response.data.message : 'Something went wrong'
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const user = JSON.parse(localStorage.getItem('user'));
                dispatch(loginSuccess(user));
                dispatch(setDropsNotLoaded());
                dispatch(setChatStateOnLogin(user));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
                const url = '/api/users/refresh';
                const headers =  { headers: {authorization: 'Bearer ' + token }};
                axios.get(url, headers)
                .then(res => {
                    dispatch(loginSuccess(res.data));
                    dispatch(setDropsNotLoaded());
                    dispatch(setChatStateOnLogin(res.data))
                    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('user', JSON.stringify(res.data)); 
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    };
};
