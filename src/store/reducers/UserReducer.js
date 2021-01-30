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
    receivedFriendRequests: [],
    notifications: [
        {
            type: 'TEXT_MESSAGE',
            chatId: '2',
            messageId: '1'
        },
        {
            type: 'TEXT_MESSAGE',
            chatId: '3',
            messageId: '1'
        },
    ]
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
        receivedFriendRequests: action.receivedFriendRequests,
        notifications: action.notifications
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
        receivedFriendRequests: [],
        notifications: [],
    }
}

const messagesReadStart = (state, action) => {
    console.log('BEFORE', state.notifications.length);
    const notificationsNew = state.notifications
        .filter(n => !(n.type === 'TEXT_MESSAGE' && n.chatId === action.chatId))
    console.log('AFTER', notificationsNew.length)
    return {
        ...state,
        notifications: notificationsNew
    }
}

const messagesReadSuccess = (state, action) => {
    return state
}

const messagesReadFailed = (state, action) => {
    return state
}

const checkAndAddNewMessages = (state, action) => {
    return state
}

const refreshNotificationsSuccess = (state, action) => {
    return {
        ...state,
        notifications: action.notifications
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

        case actionTypes.MESSAGES_READ_START: return messagesReadStart(state, action);
        case actionTypes.MESSAGES_READ_SUCCESS: return messagesReadSuccess(state, action);
        case actionTypes.MESSAGES_READ_FAILED: return messagesReadFailed(state, action);

        case actionTypes.CHECK_AND_ADD_NEW_MESSAGES: return checkAndAddNewMessages(state, action);

        case actionTypes.REFRESH_NOTIFICATIONS_SUCCESS: return refreshNotificationsSuccess(state, action);

        default: return state;
    }
}

export default reducer; 