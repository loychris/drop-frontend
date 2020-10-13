import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null,
    authOpen: true, 
    authReason: null
}

const loginStart = ( state) => {
    return { ...state, loading: true }
}

const loginFail = (state, action) => {
    return { ...state, loading: false, error: action.error }
}

const signupStart = ( state) => {
    return { ...state, loading: true }
}

const signupFail = (state, action) => {
    return { ...state, loading: false, error: action.error }
}

const authSuccess = (state, action) => {
    console.log('##############################')
    console.log(action)
    console.log('##############################')
    return { ...state, loading: false, error: null, userId: action.userId, token: action.token }
}

const openAuth = (state, action) => {
    return { ...state, authOpen: true, authReason: action.authReason }
}

const closeAuth = (state) => {
    return { ...state, authOpen: false }
}

const logout = (state) => {
    return { ...state, token: null, userId: null }
}

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.LOGOUT: return logout(state);
        case actionTypes.LOGIN_START: return loginStart(state);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.SIGNUP_START: return signupStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);
        case actionTypes.OPEN_AUTH: return openAuth(state, action);
        case actionTypes.CLOSE_AUTH: return closeAuth(state);
        default: return state;
    }
}

export default reducer; 