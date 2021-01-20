import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentChatId: '1',
    formHeight: 53,
    chatInput: '',  
    allUsers: [],
    allUsersStatus: 'not loaded',
    shouldDeleteInput: false,

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
            group: false,
            chatId: '1',
            members: [
                { userId: '1', name: 'Username' }, 
                { userId: '42069', name: 'Elon Musk', handle: 'elon', profilePic: false }
            ],
            inputValue: '',
            messages: [
                {
                    text: 'Whats poppin\' Elon?',
                    time: '14:32', 
                    type: 'text',
                    sender: '1',
                    id: '1',
                },
                {
                    text: 'Rocket goes brrrrrt',
                    time: '14:32', 
                    type: 'text',
                    sender: '5',
                    id: '2',
                    new: true
                }
            ]
        },
        {
            chatId: '2',
            group: false,
            members: [
                { userId: '1'}, 
                { userId: '12', name: 'Tonald Drump', handle: 'donald', profilePic: false}
            ],            
            inputValue: '', 
            messages: [
                {
                    text: 'I won. By a lot.',
                    time: '14:32', 
                    type: 'text',
                    sender: '12',
                    id: '1',
                    new: true,
                }
            ],        
        },
        {
            chatId: '3',
            members: [
                { userId: '1'}, 
                { userId: '12345', name: 'Shrek', profilePic: false}
            ],             inputValue: '', 
            messages: [
                {
                    text: 'Get out of my swamp!',
                    time: '14:32', 
                    type: 'text',
                    sender: '12345',
                    id: '1',
                    new: true
                }
            ],        
        },
        {
            chatId: '4',
            members: [
                { userId: '1'}, 
                { userId: '123456', name: 'Keano Reeeeeeeee', profilePic: false}
            ], 
            inputValue: '', 
            messages: [
                {
                    text: 'I can do total sellout and they still love me lol',
                    time: '14:32', 
                    type: 'text',
                    sender: '123456',
                    id: '1',
                }
            ],
        },
        {
            chatId: '5',
            name: 'Rick Astley',
            members: [
                { userId: '1'}, 
                { userId: '42069', name: 'Rick Astley', profilePic: false}
            ],            inputValue: '', 
            messages: [
                {
                    text: 'Never gonna give you up!',
                    time: '14:32', 
                    type: 'text',
                    sender: '12345',
                    id: '1',
                },
            ],        },
        {
            chatId: '6',
            name: '',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: '',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],        },
        {
            chatId: '7',
            name: 'Tonald Drump',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: '',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],        },
        {
            chatId: '8',
            name: '',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: '',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],        },
        {
            chatId: '9',
            name: '',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: '',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],        },
        {
            chatId: '10',
            name: 'Tonald Drump',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: '',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],        },
        {
            chatId: '11',
            name: '',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: '',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],
        }
    ], 
    seenUpdatesChats: [],

    sendingMessages: [],
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
        case actionTypes.CHANGE_SHOULD_DELETE_INPUT: return changeShouldDeleteInput(state, action);
        default: return state;
    }
}


//----- LOG IN / OUT -----------------------------------------------------

const setChatStateOnLogin = (state, action) => {
    const newTextMessagesNotifications = action.userdata.notifications.filter(n => n.type === 'TEXT_MESSAGE');
    console.log('#TEXT_NOTIFICATIONS', newTextMessagesNotifications.length);
    const chats = action.userdata.chats.map(chat => {
        const messages = chat.messages.map(message => {
            if(newTextMessagesNotifications.some(n => n.chatId === chat.chatId && n.messageId === message.id)){
                console.log('FOUND MESSAGE FROM NOTIFICATION');
                return {
                    ...message,
                    new: true
                }
            }else {
                return message
            }
        })
        return {
            ...chat,
            messages
        }
    })
    return {
        ...state, 
        receivedFriendRequests: action.userdata.receivedFriendRequests, 
        sentFriendRequests: action.userdata.sentFriendRequests,
        friends: action.userdata.friends,
        chats,
        currentChatId: action.userdata.chats.length > 0 ? action.userdata.chats[0].chatId : null,
    }
}

//-------------------------------------------------------

const changeChat = (state, action) => {
    let chatInputNew;
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === state.currentChatId){
            const messages = chat.messages.map(message => {
                if(message.new){
                    return {
                        ...message,
                        new: false
                    }
                }else {
                    return message;
                }
            })
            return {
                ...chat,
                messages,
                inputValue: state.chatInput
            }
        } else if(chat.chatId === action.chatId){
            chatInputNew = chat.inputValue; 
            return chat;
        } else {
            return chat
        }
    })
    const seenUpdatesChatsNew = [...state.seenUpdatesChats, action.chatId]

    return {
        ...state,
        chats: chatsNew, 
        inputValue: chatInputNew, 
        currentChatId: action.chatId,
        seenUpdatesChats: seenUpdatesChatsNew, 
    }
}

const chatInputChangeHandler = (state, action) => {
    const chatInputNew = action.value;
    return {
        ...state,
        chatInput: chatInputNew,
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
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === state.currentChatId){
            return {
                ...chat, 
                messages: [
                    ...chat.messages,
                    {
                        new: true,
                        received: [],
                        seen: [],
                        liked: [],
                        deleted: [],
                        text: action.text, 
                        sender: action.userId,
                        time: new Date(),
                        id: action.randId,
                        type: 'text', 
                        sending: true
                    }
                ]
            }
        }
        else {
            return chat
        }
    })
    const sendingMessagesNew = [...state.sendingMessages, {chatId: state.currentChatId, randId: action.randId}]
    return {
        ...state,
        chats: chatsNew,
        sendingMessages: sendingMessagesNew,
        chatInput: '',
        shouldDeleteInput: true
    }
}

const sendMessageSuccess = (state, action) => {
    const sendingMessage = state.sendingMessages.find(m => m.randId === action.randId);
    const sendingMessagesNew = state.sendingMessages.filter(m => m.randId !== action.randId);
    const chatsNew = state.chats.map(chat => {

        if(chat.chatId === sendingMessage.chatId){
            console.log(`
                currentChatId:            ${state.currentChatId}
                chat.chatId:              ${chat.chatId}
                sendingMessage.chatId:    ${sendingMessage.chatId}
                sendingMessage.randId:    ${sendingMessage.randId}
                state.caht.messages.ids:  ${chat.messages.map(m => m.id)}        
            `)
            const messagesNew = chat.messages.map(message => {
                if(message.id === sendingMessage.randId){
                    console.log('FOUND MESSAGE')
                    console.log(action.message);
                    return action.message;
                }else{
                    return message
                }
            })
            return {
                ...chat,
                messages: messagesNew
            }
        }else {
            return chat
        }
    })
    return {
        ...state,
        chats: chatsNew,
        sendingMessages: sendingMessagesNew,
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
    const acceptingFriendRequestsNew = state.acceptingFriendRequests.filter(id => id !== action.friend.userId);
    const receivedFriendRequestsNew = state.receivedFriendRequests.filter(action.friend.userId);

    const friendsNew = [...state.friends, action.friend]
    const chatsNew = [action.chat, ...state.chats]
    return {
        ...state,
        receivedFriendRequests: receivedFriendRequestsNew,
        friends: friendsNew,
        chats: chatsNew,
        acceptingFriendRequests: acceptingFriendRequestsNew,
        currentChatId: action.chat.chatId,
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
    const personsNew = [...state.users, ...action.users];
    return {
        ...state,
        users: personsNew
    }
}

const changeShouldDeleteInput = (state, action) => {
    return {
        ...state,
        shouldDeleteInput: action.value
    }
}


export default reducer;