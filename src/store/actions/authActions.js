import * as actionTypes from '../actions/actionTypes';

export const login = (username, password) => {
    return {
        type: actionTypes.LOGIN,
        username: username,
        password: password
    }
}

export const signup = (username, password, handle, email) => {
    return {
        type: actionTypes.SINGUP,
        username: username,
        password: password,
        handle: handle,
        email: email
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkEmail = (email) => {
    return {
        type: actionTypes.CHECK_EMAIL,
        email: email
    }
}

export const checkHandle = (handle) => {
    return {
        type: actionTypes.CHECK_HANDLE,
        handle: handle
    }
}