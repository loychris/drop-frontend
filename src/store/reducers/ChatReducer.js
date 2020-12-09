import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentChatFormInput: '',
    currentChatId: 5,
    formHeight: 53,
    allUsers: [],
    allUsersStatus: 'not loaded',

    sendingFriendRequests: [],
    sentFriendRequests: [],
    failedFriendRequests: [],

    receivedFriendRequests: [],
    acceptingFriendRequests: [],
    receivedFriendRequestsStatus: 'not loaded',

    friends: [],
    friendsStatus: 'not loaded',
    chats: [
        {
            chatId: 5,
            name: 'Elon Musk',
            members: ['4', '42069'],
            inputValue: '',
            messages: [
                {
                    text: 'Whats poppin\' Elon?',
                    time: '14:32', 
                    type: 'text',
                    sender: 'chris',
                    id: 1,
                    sent: true 
                },
                {
                    text: 'Rocket goes Brrrrrt',
                    time: '14:32', 
                    type: 'text',
                    sender: 'Elon',
                    id: 2,
                    sent: false 
                }
            ]
        },
        {
            chatId: '3', 
            name: 'Felix Lauenroth',
            members: ['123', '456'],
            inputValue: '', 
            messages: [
                                {
                    text: 'Fuck you Felix. Your code sucks',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                },
                {
                    text: 'I know',
                    time: '14:32', 
                    sender: 'Elon',
                    id: 2,
                    sent: false 
                }
            ]
        }
    ], 
    users: [{name: 'Elon Musk', userId: '42069', handle: '@elon'}],
    chatsStatus: 'not loaded',
    currentChatLoaded: false, 
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CHAT_STATE_ON_LOGIN: return setChatStateOnLogin(state, action);
        case actionTypes.ADD_NEW_USERS: return addNewUsers(state, action);

        case actionTypes.SEND_MESSAGE_START: return sendMessageStart(state, action);
        case actionTypes.SEND_MESSAGE_SUCCESS: return sendMessageSuccess(state, action);
        case actionTypes.SEND_MESSAGE_FAILED: return sendMessageFailed(state, action);

        case actionTypes.CHANGE_CHAT: return changeChat(state, action);
        case actionTypes.CHANGE_FORM_HEIGHT: return changeChatFormHeight(state, action);
        case actionTypes.CHANGE_CHAT_INPUT: return chatInputChangeHandler(state, action);
        
        case actionTypes.FETCH_ALL_USERS_START: return fetchAllUsersStart(state, action);
        case actionTypes.FETCH_ALL_USERS_SUCCESS: return fetchAllUsersSuccess(state, action);
        case actionTypes.FETCH_ALL_USERS_FAILED: return fetchAllUsersFailed(state, action);

        case actionTypes.SEND_FRIEND_REQUEST_START: return sendFriendRequestStart(state, action);
        case actionTypes.SEND_FRIEND_REQUEST_SUCCESS: return sendFriendRequestSuccess(state, action);
        case actionTypes.SEND_FRIEND_REQUEST_FAILED: return sendFriendRequestFailed(state, action);

        case actionTypes.ACCEPT_FRIEND_REQUEST_START: return acceptFriendRequestStart(state, action);
        case actionTypes.ACCEPT_FRIEND_REQUEST_SUCCESS: return acceptFriendRequestSuccess(state, action);
        case actionTypes.ACCEPT_FRIEND_REQUEST_FAILED: return acceptFriendRequestFailed(state, action);

        case actionTypes.FETCH_FIREND_REQUESTS_START: return fetchFriendRequestsStart(state, action);
        case actionTypes.FETCH_FIREND_REQUESTS_SUCCESS: return fetchFriendRequestsSuccess(state, action);
        case actionTypes.FETCH_FIREND_REQUESTS_FAILED: return fetchFriendRequestsFailed(state, action);

        case actionTypes.FETCH_FRIENDS_START: return fetchFriendsStart(state, action);
        case actionTypes.FETCH_FRIENDS_SUCCESS: return fetchFriendsSuccess(state, action);
        case actionTypes.FETCH_FRIENDS_FAILED: return fetchFriendsFailed(state, action);

        case actionTypes.FETCH_CHATS_START: return fetchChatsStart(state, action);
        case actionTypes.FETCH_CHATS_SUCCESS: return fetchChatsSuccess(state, action);
        case actionTypes.FETCH_CHATS_FAILED: return fetchChatsFailed(state, action);

        case actionTypes.CREATE_DUMMY_CHAT: return createDummyChat(state, action);
        default: return state;
    }
}


//----- LOG IN / OUT -----------------------------------------------------

const setChatStateOnLogin = (state, action) => {
    return {
        ...state, 
        receivedFriendRequests: action.userdata.friendRequests, 
        sentFriendRequests: action.userdata.sentFriendRequests,
        friends: action.userdata.friends,
    }
}

//-------------------------------------------------------

const changeChat = (state, action) => {
    return {
        ...state,
        currentChatId: action.chatId,
    }
}

const chatInputChangeHandler = (state, action) => {
    const chatsNew = state.streams.map(chat => {
        if(chat.chatId === state.currentChatId){
            return {
                ...chat,
                inputValue: action.value
            }
        } else {
            return chat
        }
    })
    return {
        ...state,
        chats: chatsNew,
    }
}

const changeChatFormHeight = (state, action) => {
    return {
        ...state,
        formHeight: action.height,
    }
}

//----- SEND MESSAGE  -------------------------------------------------


const sendMessageStart = (state, action) => {
    const chatsNew = state.streams.map(chat => {
        if(chat.chatId === state.currentChatId){
            const message = action.message;
            console.log(chat);
            return {
                ...chat,
                inputValue: '',
                latestMessages: [...chat.latestMessages, {
                    message,
                    time: new Date().getTime(),
                    sender: "Chris", 
                    id: Math.random(),
                    sent: true
                }]
            }
        }else{
            return chat
        }
    })
    return {
        ...state,
        chats: chatsNew
    }
}

const sendMessageSuccess = (state, action) => {
    return {
        ...state
    }
}

const sendMessageFailed = (state, action) => {
    return {
        ...state
    }
}

//----- FETCH ALL USERS -------------------------------------------------

const fetchAllUsersStart = (state, aciton) => {
    return {
        ...state,
        allUsersStatus: 'loading'
    }
}

const fetchAllUsersSuccess = (state, action) => {
    return {
        ...state,
        allUsersStatus: 'loaded',
        allUsers: action.users, 
    }
}

const fetchAllUsersFailed = (state, action) => {
    return {
        ...state,
        allUsersStatus: 'failed'
    }
}

//----- FETCH FRIEND REQUESTS --------------------------------------------------

const fetchFriendRequestsStart = (state, action) => {
    return {
        ...state,
        receivedFriendRequestsStatus: 'loading'
    }
}

const fetchFriendRequestsSuccess = (state, action) => {
    return {
        ...state,
        receivedFriendRequests: action.users,
        receivedFriendRequestsStatus: 'loaded',
    }
}

const fetchFriendRequestsFailed = (state, action) => {
    return {
        ...state,
    }
}

//----- SEND FRIEND REQUEST --------------------------------------------------

const sendFriendRequestStart = (state, action) => {
    const sendingFriendRequestsNew = [...state.sentFriendRequests, action.friendId]
    return {
        ...state,
        sendingFriendRequests: sendingFriendRequestsNew,
    }
}

const sendFriendRequestSuccess = (state, action) => {
    const sendingFriendRequestsNew = state.sentFriendRequests.filter(id => {
        return id !== action.friendId
    });
    const sentFriendRequestsNew = [...state.sentFriendRequests, action.friendId];
    return {
        ...state,
        sendingFriendRequests: sendingFriendRequestsNew,
        sentFriendRequests: sentFriendRequestsNew, 
    }
}

const sendFriendRequestFailed = (state, action) => {
    const sendingFriendRequestsNew = state.sentFriendRequests.filter(id => {
        return id !== action.friendId
    });
    const failedFriendRequestsNew = [...state.failedFriendRequests, action.friendId]
    return {
        ...state,
        sendingFriendRequests: sendingFriendRequestsNew,
        failedFriendRequests: failedFriendRequestsNew
    }
}

//----- ACCEPT FRIEND REQUEST --------------------------------------------------


const acceptFriendRequestStart = (state, action) => {
    const acceptingFriendRequestsNew = [...state.acceptingFriendRequests, action.userId]; 
    return {
        ...state, 
        acceptingFriendRequests: acceptingFriendRequestsNew
    }
}

const acceptFriendRequestSuccess = (state, action) => {
    const acceptingFriendRequestsNew = state.acceptingFriendRequests.filter(id => id !== action.userId);
    const receivedFriendRequestsNew = state.receivedFriendRequests.filter(action.userId);
    const newFriend = {
        userId: action.userId, 
        name: action.name, 
        handle: action.handle
    }
    const friendsNew = [...state.friends, newFriend]
    return {
        ...state,
        receivedFriendRequests: receivedFriendRequestsNew,
        friends: friendsNew,
        acceptingFriendRequests: acceptingFriendRequestsNew
    }
}

const acceptFriendRequestFailed = (state, action) => {
    return {
        ...state,
    }
}

//----- FETCH CHATS --------------------------------------------------

const fetchChatsStart = (state, action) => {
    return {
        ...state, 
        chatsStatus: 'loading'
    }
}

const fetchChatsSuccess = (state, action) => {
    console.log(action);
    const chatsNew = action.chats.map(chat => {
        return {
            ...chat,
            inputValue: '',
        }
    })
    const currentChatId = chatsNew.length > 0 ? chatsNew[0].chatId : null ;
    return {
        ...state,
        chats: chatsNew,
        currentChatId: currentChatId,
        chatsStatus: 'loaded'
    }
}

const fetchChatsFailed = (state, action) => {
    return {
        ...state, 
        chatStatus: 'failed'
    }
}

//----- FETCH FRIENDS --------------------------------------------------

const fetchFriendsStart = (state, action) => {
    return {
        ...state,
        friendsStatus: 'loading'

    }
}

const fetchFriendsSuccess = (state, action) => {
    return {
        ...state,
        friends: action.friends,
        friendsStatus: 'loaded',
    }
}

const fetchFriendsFailed = (state, action) => {
    return {
        ...state
    }
}

// ------------------------------------------------------

const createDummyChat = (state, action) => {
    const dummyChatId = 'dummy'+action.userId;
    const alreadyExists = state.streams.some(chat => chat.chatId === dummyChatId) 
    const dummyChatNew = {
        chatId: dummyChatId, 
        name: action.name,
        latestMessages: []
    }
    const chatsNew = alreadyExists ? state.streams : [...state.streams, dummyChatNew];
    return {
        ...state,
        chats: chatsNew
    }
}

const addNewUsers = (state, action) => {
    console.log('##############################')
    console.log(action.users);
    console.log('##############################')
    const personsNew = [...state.users, ...action.users];
    return {
        ...state,
        users: personsNew
    }
}


export default reducer;