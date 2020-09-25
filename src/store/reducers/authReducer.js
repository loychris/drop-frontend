import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null,
    authOpen: false, 
    authReason: null
}

const loginStart = ( state) => {
    return { ...state, loading: true }
}

const loginSuccess = (state, action) => {
    return { ...state, loading: false, error: null, userId: action.userId, token: action.token }
}

const loginFail = (state, action) => {
    return { ...state, loading: false, error: action.error }
}

const signupStart = ( state) => {
    return { ...state, loading: true }
}

const signupSuccess = (state, action) => {
    return { ...state, loading: false, error: null, userId: action.userId, token: action.token }
}

const signupFail = (state, action) => {
    return { ...state, loading: false, error: action.error }
}

const openAuth = (state, action) => {
    return { ...state, authOpen: true, authReason: action.authReason }
}

const closeAuth = (state) => {
    return { ...state, authOpen: false }
}

const logout = (state) => {
    return {...state, userId: null, token: null}
}

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.LOGIN_START: return loginStart(state);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.SIGNUP_START: return signupStart(state);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        case actionTypes.OPEN_AUTH: return openAuth(state, action);
        case actionTypes.CLOSE_AUTH: return closeAuth(state);
        case actionTypes.LOGOUT: return logout(state);
        default: return state;
    }
}

export default reducer; 