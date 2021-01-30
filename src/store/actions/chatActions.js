import axios from 'axios';

import { closeNewChatModal } from './UIActions'


import * as actionTypes from '../actions/actionTypes';

export const setChatStateOnLogin = (userdata) => {
    return {
        type: actionTypes.SET_CHAT_STATE_ON_LOGIN,
        userdata
    }
}

//--------- FETCH CHAT -----------------------------------------

export const fetchChat = (chatId, token) => {
    return dispatch => {
        dispatch(fetchChatStart())
        const headers = { headers: { authorization : `Bearer ${token}` } }
        axios.get(`/api/chat/${chatId}`, headers)
        .then(response => {
            console.log(response);
            dispatch(fetchChatSuccess(response.data.chat))
        }).catch(err => {
            console.log(err)
            dispatch(fetchChatFailed())
        })
    }
}

export const fetchChatStart = () => {
    return {
        type: actionTypes.FETCH_CHAT_START,
    }
}

export const fetchChatSuccess = () => {
    return {
        type: actionTypes.FETCH_CHAT_SUCCESS,
    }
}

export const fetchChatFailed = () => {
    return {
        type: actionTypes.FETCH_CHAT_FAILED,
    }
}

//--------- FETCH CHATS -----------------------------------------

export const fetchChats = (token, userId) => {
    return dispatch => {
        dispatch(fetchChatsStart())
        const headers = { headers: { authorization : `Bearer ${token}` } }
        axios.get(`/api/chat/chats`, headers)
        .then(response => {
            dispatch(fetchChatsSuccess(response.data, userId))
        }).catch(err => {
            console.log(err)
            dispatch(fetchChatsFailed())
        })
    }
}

export const fetchChatsStart = () => {
    return {
        type: actionTypes.FETCH_CHATS_START,
    }
}

export const fetchChatsSuccess = (chats, userId) => {
    return {
        type: actionTypes.FETCH_CHATS_SUCCESS,
        chats, 
        userId
    }
}

export const fetchChatsFailed = () => {
    return {
        type: actionTypes.FETCH_CHATS_FAILED,
    }
}

//--------- FETCH FRIENDS ----------------------------------------------------------

export const fetchFriends = (ids, token) => {
    return dispatch => {
        dispatch(fetchFriendsStart());
        const body = { userIds: ids }
        const headers = { headers: { authorization : `Bearer ${token}` } }
        axios.post('/api/users/userdata', body, headers)
        .then(response => {
            dispatch(addNewUsers(response.data));
            dispatch(fetchFriendsSuccess(response.data));
        }).catch(err => {
            dispatch(fetchFriendsFailed(err))
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
            dispatch(addNewUsers(response.data));
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
        users, 
    }
}

export const fetchAllUsersFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_USERS_FAILED
    }
}

//--------- SEND MESSAGE -------------------------------------------------------

export const sendTextMessage = (chatId, text, userId) => {
    return dispatch => {
        const randId = `${Date.now()}`;
        dispatch(sendMessageStart(chatId, text, randId, userId));
        const token = localStorage.getItem('token');
        const headers = { headers: { authorization : `Bearer ${token}` } }
        const url = `/api/chat/${chatId}/textMessage`;
        const body = { message: text };
        axios.post(url, body, headers)
        .then(response => {
            dispatch(sendMessageSuccess(chatId, response.data, randId));
        })
        .catch(err => {
            console.log(err);
            dispatch(sendMessageFailed(chatId, randId))
        })
    }
}

export const sendMessageStart = (chatId, text, randId, userId) => {
    return {
        type: actionTypes.SEND_MESSAGE_START,
        chatId, 
        text, 
        randId,
        userId
    }
}

export const sendMessageSuccess = (chatId, message, randId) => {
    return {
        type: actionTypes.SEND_MESSAGE_SUCCESS,
        chatId,
        message, 
        randId
    }
}

export const sendMessageFailed = (chatId, randId) => {
    return {
        type: actionTypes.SEND_MESSAGE_FAILED,
        chatId,
        randId
    }
}

//--------- SEND FIRST MESSAGE IN NEW CHAT --------------------------------

export const sendFirstMessageNewChat = (dummyChatId, self, chatPartner, text) => {
    return dispatch => {
        const randId = Date.now();
        dispatch(sendFirstMessageNewChatStart(dummyChatId, randId, text, self));
        const token = localStorage.getItem('token');
        const headers = { headers: { authorization : `Bearer ${token}` } }
        const body = {
             members: [self.userId, chatPartner.userId],
            message: text
        }
        axios.post('/api/chat', body, headers)
        .then(res => {
            console.log(res.data);
            dispatch(sendFirstMessageNewChatSuccess(dummyChatId, randId, res.data, self, chatPartner))
        }).catch(err => {
            console.log("FIRST MESSAGE NEW CAHT ERROR");
            console.log(err);
            dispatch(sendFirstMessageNewChatFailed())
        })
    }
}

export const sendFirstMessageNewChatStart = (dummyChatId, randId, message, self) => {
    return {
        type: actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_START,
        dummyChatId,
        randId,
        message,
        self,
    }
}

export const sendFirstMessageNewChatSuccess = (dummyChatId, randId, createdChat, self, chatPartner) => {
    return {
        type: actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_SUCCESS,
        dummyChatId,
        randId,
        createdChat,
        self,
        chatPartner
    }
}

export const sendFirstMessageNewChatFailed = () => {
    return {
        type: actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_FAILED,
    }
}


//--------- SEND FRIEND REQUEST -------------------------------------------

export const sendFriendRequest = (user) => {
    return dispatch => {
        console.log("Sending Friend Request");
        dispatch(sendFriendRequestStart(user))
        const token = localStorage.getItem('token');
        const headers = { headers: { authorization : `Bearer ${token}` } }
        axios.post('/api/users/addFriend', { friendId: user.userId }, headers)
        .then(response => {
            dispatch(sendFriendRequestSuccess(user))
        }).catch(err => {
            console.log(err)
            dispatch(sendFriendRequestFailed(user))
        })
    }
}

export const sendFriendRequestStart = (user) => {
    return {
        type: actionTypes.SEND_FRIEND_REQUEST_START,
        user
    }
}

export const sendFriendRequestSuccess = (user) => {
    return {
        type: actionTypes.SEND_FRIEND_REQUEST_SUCCESS,
        user
    }
}

export const sendFriendRequestFailed = (user) => {
    return {
        type: actionTypes.SEND_FRIEND_REQUEST_FAILED,
        user
    }
}

//--------- ACCEPT FIREND REQUEST -----------------------------------------

export const acceptFriendRequest = (user) => {
    return dispatch => {
        dispatch(acceptFriendRequestStart(user));
        const token = localStorage.getItem('token');
        const headers = { headers: { authorization : `Bearer ${token}` } }
        const body = { friendId: user.userId };
        axios.post('/api/users/acceptFriendRequest', body, headers)
        .then(res => {
            dispatch(acceptFriendRequestSuccess(res.data.friend, res.data.chat))
        }).catch(err => {
            console.log(err)
            dispatch(acceptFriendRequestFailed(user))
        })
    }
}

export const acceptFriendRequestStart = (user) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_START,
        user
    }
}

export const acceptFriendRequestSuccess = (friend, chat) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_SUCCESS,
        friend, 
        chat
    }
}

export const acceptFriendRequestFailed = (user) => {
    return {
        type: actionTypes.ACCEPT_FRIEND_REQUEST_FAILED,
        user
    }
}

//---- CHAT FORM INPUT ----------------------------------------------------

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

export const changeFormHeight = (height) => {
    return {
        type: actionTypes.CHANGE_FORM_HEIGHT,
        height
    }
}

export const chatInputChangeHandler = (value) => {
    return {
        type: actionTypes.CHANGE_CHAT_INPUT,
        value
    }
}


//--------- NEW CHAT -----------------------------------------------------------

// export const sendNewChat = (friendId, message) => {
//     return dispatch => {
//         dispatch(sendNewChatStart());
//         const body = {
//             group: false,
//             members: [friendId],
//             message: message
//         };
//         const token = localStorage.getItem('token');
//         const headers = { headers: { authorization: `Bearer ${token}` } }  
//         axios.post('api/chat', body, headers)
//         .then(res => {
//             dispatch(sendNewChatSuccess());
//         }).catch(err => {
//             dispatch(sendNewChatFailed());
//             console.log(err)
//         })
//     }
// }

// export const sendNewChatStart = () => {
//     return {
//         type: actionTypes.SEND_NEW_CHAT_START,
//     }
// }

// export const sendNewChatSuccess = () => {
//     return {
//         type: actionTypes.SEND_MESSAGE_SUCCESS,
//     }
// }

// export const sendNewChatFailed = () => {
//     return {
//         type: actionTypes.SEND_NEW_CHAT_FAILED,
//     }
// }

//--------- ADD DUMMY CAHT -----------------------------------------------------

export const newChat = (chatId, chatPartner, self) => {
    return dispatch => {
        if(chatId){
            dispatch(changeChat(chatId));
        } else {
            dispatch(createDummyChat(chatPartner, self));
        }
        dispatch(closeNewChatModal())
    }
}

export const changeChat = (chatId) => {
    localStorage.setItem('currentChatId', chatId);
    return {
        type: actionTypes.CHANGE_CHAT,
        chatId, 
    }
}

export const createDummyChat = (chatPartner, self) => {
    const dummyChatId = 'dummy' + chatPartner.userId
    localStorage.setItem('currentChatId', dummyChatId);
    return {
        type: actionTypes.CREATE_DUMMY_CHAT,
        chatPartner, 
        self
    }
}



//--------- RESET CHAT -----------------------------------------------------


export const addNewUsers = (users) => {
    return {
        type: actionTypes.ADD_NEW_USERS,
        users
    }
}


//--------- FETCH NEW MESSAGES -----------------------------------------------------

export const fetchNewMessages = () => {
    return dispatch => {
        dispatch(fetchNewMessagesStart());
        axios.get()
        .then(res => {
            dispatch(fetchNewMessagesSuccess());
        }).catch(err => {
            dispatch(fetchNewMessagesFailed());
        })
    }
}

export const fetchNewMessagesStart = () => {
    return {
        type: actionTypes.FETCH_NEW_MESSAGES_START,
    }
}

export const fetchNewMessagesSuccess = () => {
    return {
        type: actionTypes.FETCH_NEW_MESSAGES_SUCCESS,
    }
}

export const fetchNewMessagesFailed = () => {
    return {
        type: actionTypes.FETCH_NEW_MESSAGES_FAILED,
    }
}


export const checkAndAddNewMessages = (notifications) => {
    return {
        type: actionTypes.CHECK_AND_ADD_NEW_MESSAGES, 
        notifications
    }
}