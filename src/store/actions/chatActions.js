import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const sendMessage = (message) => {
    return {
        type: actionTypes.SEND_MESSAGE,
        message
    }
}

export const changeChat = (chatId) => {
    return {
        type: actionTypes.CHANGE_CHAT,
        chatId,
    }
}

export const saveChatInput = (chatId, value) => {
    return {
        type: actionTypes.SAVE_CHAT_INPUT,
        chatId,
        value
    }
}

export const setChatFormHeight = (height) => {
    return {
        type: actionTypes.SET_CHAT_FORM_HEIGHT,
        height
    }
}

export const setChatInput = (value) => {
    return {
        type: actionTypes.SET_CHAT_INPUT,
        value
    }
}

//--------- ALL USERS ---------------------------------------------------

export const fetchAllUsers = () => {
    return dispatch => {
        dispatch(fetchAllUsersStart());
        axios.get('/api/users')
        .then(response => {
            console.log(response.data);
            dispatch(fetchAllUsersSuccess(response.data))
        }).catch(err => {
            dispatch(fetchAllUsersFailed())
        })
    }
}

export const fetchAllUsersStart = () => {
    return {
        type: actionTypes.FETCH_ALL_USERS_START,
    }
}

export const fetchAllUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users
    }
}

export const fetchAllUsersFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_USERS_FAILED
    }
}

//--------- FRIENDS -----------------------------------------------------

export const fetchFriends = () => {
    return dispatch => {
        dispatch(fetchFriendsStart());
        axios.get('/api/users/friends')
        .then(response => {
            console.log(response.data);
            dispatch(fetchFriendsSuccess(response.data))
        }).catch(err => {
            dispatch(fetchFriendsFailed())
        })
    }
}

export const fetchFriendsStart = () => {
    return {
        type: actionTypes.FETCH_ALL_USERS_START,
    }
}

export const fetchFriendsSuccess = (users) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users
    }
}

export const fetchFriendsFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_USERS_FAILED
    }
}

//--------------------------------------------------------------

export const changeFormHeight = (height) => {
    return {
        type: actionTypes.CHANGE_FORM_HEIGHT,
        height
    }
}

export const createDummyChat = (userId) => {
    return {
        type: actionTypes.CREATE_DUMMY_CHAT,
        userId
    }
}

export const chatInputChangeHandler = (value) => {
    return {
        type: actionTypes.CHANGE_CHAT_INPUT,
        value
    }
}

//--------------------------------------------------------------


export const addFriend = (friendId, token) => {
    return dispatch => {
        console.log('TOKEN', token);
        dispatch(addFriendStart(friendId))
        const headers = { headers: { Authorisation: `Bearer ${token}` } }
        axios.post('/api/users/addFriend', { friendId }, headers)
        .then(response => {
            console.log(response);
            dispatch(addFriendSuccess(friendId))
        }).catch(err => {
            console.log(err)
            dispatch(addFriendFailed(friendId))
        })
    }
}

export const addFriendStart = (friendId) => {
    return {
        type: actionTypes.ADD_FRIEND_START,
        friendId
    }
}

export const addFriendSuccess = (friendId) => {
    return {
        type: actionTypes.ADD_FRIEND_SUCCESS,
        friendId
    }
}

export const addFriendFailed = (friendId) => {
    return {
        type: actionTypes.ADD_FRIEND_FAILED,
        friendId
    }
}