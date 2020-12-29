import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentChatFormInput: '',
    currentChatId: '1',
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
            group: false,
            chatId: '1',
            members: [
                { userId: '1', name: 'Username' }, 
                { userId: '42069', name: 'Elon Musk', handle: 'Elon', profilePic: false }
            ],
            inputValue: '',
            messages: [
                {
                    text: 'Whats poppin\' Elon?',
                    time: '14:32', 
                    type: 'text',
                    sender: '1',
                    id: 1,
                },
                {
                    text: 'Rocket goes brrrrrt',
                    time: '14:32', 
                    type: 'text',
                    sender: '5',
                    id: 2,
                },
                // {
                //     src: 'whatever',
                //     type: 'image',
                //     sender: 'chris',
                //     id: 3,
                // },
                // {
                //     type: 'drop',
                //     id: 4, 
                //     sender: 'chris',
                //     dropId: '5fac3586eb20d00a220cc693',
                // }
            ]
        },
        {
            chatId: '2',
            group: false,
            members: [
                { userId: '1'}, 
                { userId: '42069', name: 'Tonald Drump', profilePic: false}
            ],            
            inputValue: '', 
            messages: [
                {
                    text: 'I won. By a lot.',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],        
        },
        {
            chatId: '3',
            name: 'Shrek',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: 'Get out of my swamp!',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],        
        },
        {
            chatId: '4',
            name: 'Keanu Reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: 'I can do total sellout and the still love me, lol',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],
        },
        {
            chatId: '5',
            name: 'Rick Astley',
            members: ['4', '42069'],
            inputValue: '', 
            messages: [
                {
                    text: 'Never gonna give you up.',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
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
        chats: action.userdata.chats,
        currentChatId: action.userdata.chats.length > 0 ? action.userdata.chats[0].chatId : null,
    }
}

//-------------------------------------------------------

const changeChat = (state, action) => {

    const inputValue = action.inputRef ? action.inputRef.current.value : '';
    console.log('inputValue: ', inputValue);

    // Chat already selected
    if(state.currentChatId === action.chatId){
        const chatsNew = state.chats.map(chat => {
            if(chat.chatId === state.currentChatId){
                return {
                    ...chat,
                    inputValue
                }
            } else {
                return chat
            }
        })
        action.inputRef.current.focus();
        return {
            ...state,
            chats: chatsNew
        }
    } 

    // Select a different Chat

    let nextChat = state.chats.find(chat => {
        return chat.chatId === action.chatId
    })

    let dummyChat;
    
    if(!nextChat){
    
        // Chat doesn't yet exist
    
        if(action.chatId.startsWith('friend')){
            const friendId = action.chatId.substring(6, action.chatId.length)
            nextChat = state.chats
                .filter(chat => chat.members.length === 2)
                .find(chat => {
                    chat.members.some(user => user.userId === friendId)
                })
            if(!nextChat) {
                dummyChat = {
                    messages: [],
                    chatId: 'dummy' + friendId,
                    members: [action.self, action.user],
                    inputValue: ''                
                }
                nextChat = dummyChat;
            }
        }
    
        if(action.chatId.startsWith('stranger')){
            // TODO: same shit for strangers
        }
    }

    // TODO create dummyChat

    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === state.currentChatId){
            return {
                ...chat,
                inputValue
            }
        }else if(chat.chatId === action.chatId){
            //////////////////////////////////////////
            action.inputRef.current.value = chat.inputValue
            //////////////////////////////////////////
        }
    })
    action.inputRef.current.focus();
    return {
        ...state,
        chats: dummyChat ? [...chatsNew, dummyChat] : chatsNew,
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
    console.log(action);
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === action.chatId){
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
    return {
        ...state,
        chats: chatsNew
    }
}

const sendMessageSuccess = (state, action) => {
    console.log(action.message)
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === action.chatId){
            console.log('Found Chat');
            return {
                ...chat, 
                messages: chat.messages.map(m => {
                    if(m.id === action.randId){
                        console.log('found message');
                        return {
                            ...action.message,
                            new: true
                        }
                    }else {
                        return m
                    }
                })
            }
        }else{
            return chat;
        }
    })
    return {
        ...state,
        chats: chatsNew
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


export default reducer;