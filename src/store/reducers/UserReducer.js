import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    name: null,
    handle: null,
    userId: '1',
    error: null,
    loading: null,
    authOpen: false, 
    authReason: null,
    hasProfilePic: false,
    profilePicSrc: null,
}

const loginStart = (state) => {
    return { 
        ...state, 
        loading: true 
    }
}

const loginSuccess = (state, action) => {
    return { 
        ...state, 
        loading: false, 
        error: null, 
        hasProfilePic: action.profilePic,
        name: action.name,
        handle: action.handle,
        userId: action.userId, 
        token: action.token,
        email: action.email,
        friends: action.friends,
        friendRequests: action.friendRequests
    }
}

const loginFail = (state, action) => {
    return { 
        ...state, 
        loading: false, 
        error: action.error 
    }
}

const signupStart = ( state) => {
    return { 
        ...state, 
        loading: true 
    }
}

const signupFail = (state, action) => {
    return { 
        ...state, 
        loading: false, 
        error: action.error 
    }
}

const signupSuccess = (state, action) => {
    return { 
        ...state, 
        loading: false, 
        error: null, 
        hasProfilePic: action.profilePic,
        name: action.name,
        handle: action.handle,
        userId: action.userId, 
        token: action.token,
        email: action.email,
        profilePicSrc: action.profilePicSrc,
        friends: action.friends,
        friendRequests: action.friendRequests
    }
}

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.LOGIN_START: return loginStart(state);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);

        case actionTypes.SIGNUP_START: return signupStart(state);
        case actionTypes.SIGNUP_SUCCESS: return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL: return signupFail(state, action);

        default: return state;
    }
}

export default reducer; 