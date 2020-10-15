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

//--------- FETCH FRIEND REQUESTS -----------------------------------------------

export const fetchFriendRequests = (ids) => {
    return dispatch => {
        dispatch(fetchFriendRequestsStart());
        console.log(ids);
        axios.post(
            '/api/users/userdata',
            {userIds: ids}
        )
        .then(response => {
            console.log(response.data);
            dispatch(fetchFriendRequestsSuccess(response.data))
        }).catch(err => {
            dispatch(fetchFriendRequestsFailed())
        })
    }
}

export const fetchFriendRequestsStart = () => {
    return {
        type: actionTypes.FETCH_FIREND_REQUESTS_START,
    }
}

export const fetchFriendRequestsSuccess = (users) => {
    return {
        type: actionTypes.FETCH_FIREND_REQUESTS_SUCCESS,
        users
    }
}

export const fetchFriendRequestsFailed = () => {
    return {
        type: actionTypes.FETCH_FIREND_REQUESTS_FAILED
    }
}

//--------- FETCH FRIENDS ----------------------------------------------------------

export const fetchFriends = (ids) => {
    return dispatch => {
        dispatch(fetchFriendsStart());
        axios.post('/api/users/userdata')
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
        type: actionTypes.FETCH_FRIENDS_START,
    }
}

export const fetchFriendsSuccess = (friends) => {
    return {
        type: actionTypes.FETCH_FRIENDS_SUCCESS,
        friends
    }
}

export const fetchFriendsFailed = () => {
    return {
        type: actionTypes.FETCH_IDS_FAILED
    }
}

//--------- FETCH ALL USERS ---------------------------------------------------

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

//--------- SEND FRIEND REQUEST -------------------------------------------

export const sendFriendRequest = (friendId, token) => {
    return dispatch => {
        console.log('TOKEN', token);
        dispatch(sendFriendRequestStart(friendId))
        const headers = { headers: { authorization : `Bearer ${token}` } }
        axios.post('/api/users/addFriend', { friendId }, headers)
        .then(response => {
            console.log(response);
            dispatch(sendFriendRequestSuccess(friendId))
        }).catch(err => {
            console.log(err)
            dispatch(sendFriendRequestFailed(friendId))
        })
    }
}

export const sendFriendRequestStart = (friendId) => {
    return {
        type: actionTypes.SEND_FRIEND_REQUEST_START,
        friendId
    }
}

export const sendFriendRequestSuccess = (friendId) => {
    return {
        type: actionTypes.SEND_FRIEND_REQUEST_SUCCESS,
        friendId
    }
}

export const sendFriendRequestFailed = (friendId) => {
    return {
        type: actionTypes.SEND_FRIEND_REQUEST_FAILED,
        friendId
    }
}

//--------- ACCEPT FIREND REQUEST -----------------------------------------

export const acceptFriendRequest = (friendId, token) => {
    return dispatch => {
        console.log('TOKEN', token);
        dispatch(acceptFriendRequestStart(friendId))
        const headers = { headers: { authorization : `Bearer ${token}` } }
        axios.post('/api/users/addFriend', { friendId }, headers)
        .then(response => {
            console.log(response);
            dispatch(acceptFriendRequestSuccess(friendId))
        }).catch(err => {
            console.log(err)
            dispatch(acceptFriendRequestFailed(friendId))
        })
    }
}

export const acceptFriendRequestStart = (friendId) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_START,
        friendId
    }
}

export const acceptFriendRequestSuccess = (friendId) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_SUCCESS,
        friendId
    }
}

export const acceptFriendRequestFailed = (friendId) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_FAILED,
        friendId
    }
}

