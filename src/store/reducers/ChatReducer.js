import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentChatFormInput: '',
    loadedChats: true,     
    currentChatId: 0,
    formHeight: 53,
    allUsers: null,
    allUsersStatus: 'not loaded',
    dummyChats: [],
    sentFriendRequests: [],
    failedFriendRequests: [],
    chats: [
        {
            chatId: 0,
            name: 'Pokern',
            inputValue: '',
            latestMessages: [
            {
                message: 'First message chat 1',
                time: '14:32', 
                sender: "chris",
                id: 1,
                sent: true 
            },
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                id: 2,
                sent: false 
            }
            ]
        },
        {
            chatId: 1,
            name: 'Rasselbande',
            inputValue: '',
            latestMessages: [
            {
                message: 'First message chat 1',
                time: '14:32', 
                sender: "chris",
                id: 1,
                sent: true 
            },
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                id: 2,
                sent: false 
            }
            ]
        },
        {
            chatId: 2,
            name: 'Hüdde',
            inputValue: '',
            latestMessages: [
            {
                message: 'First message chat 1',
                time: '14:32', 
                sender: "chris",
                id: 1,
                sent: true 
            },
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                id: 2,
                sent: false 
            }
            ]
        },
        {
            chatId: 3,
            name: 'felix',
            inputValue: '',
            latestMessages: [
            {
                message: 'First message chat 1',
                time: '14:32', 
                sender: "chris",
                id: 1,
                sent: true 
            },
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                id: 2,
                sent: false 
            }
            ]
        },
        {
            chatId: 4,
            name: 'Kirill',
            inputValue: '',
            latestMessages: [
            {
                message: 'First message chat 1',
                time: '14:32', 
                sender: "chris",
                id: 1,
                sent: true 
            },
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                id: 2,
                sent: false 
            }
            ]
        },
        {
            chatId: 5,
            name: 'Nico',
            inputValue: '',
            latestMessages: [
            {
                message: 'First message chat 1',
                time: '14:32', 
                sender: "chris",
                id: 1,
                sent: true 
            },
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                id: 2,
                sent: false 
            }
            ]
        },
        {
            chatId: 6,
            name: 'Pokern',
            inputValue: '',
            latestMessages: [
            {
                message: 'First message chat 1',
                time: '14:32', 
                sender: "chris",
                id: 1,
                sent: true 
            },
            {
                message: 'THis is a chat message',
                time: '14:32', 
                sender: "chris",
                id: 2,
                sent: false 
            }
            ]
        },
        {
            chatId: 15,
            name: 'Pokern',
            inputValue: '',
            latestMessages: [
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    id: 1,
                    sent: true 
                },
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    id: 2,
                    sent: false 
                },
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    id: 3,
                    sent: true 
                },
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    id: 4,
                    sent: false 
                },
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    id: 5,
                    sent: true 
                },
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    id: 6,
                    sent: false 
                },
                {
                    message: 'THis is a chat message',
                    time: '14:32', 
                    sender: "chris",
                    id: 7,
                    sent: true 
                },
                {
                    message: 'THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. ',
                    time: '14:32', 
                    sender: "chris",
                    id: 8,
                    sent: false 
                },
                {
                    message: 'THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. ',
                    time: '14:32', 
                    sender: "chris",
                    id: 9,
                    sent: false 
                },
                {
                    message: 'THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. ',
                    time: '14:32', 
                    sender: "chris",
                    id: 10,
                    sent: false 
                },
                {
                    message: 'THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. THis is a chat message. ',
                    time: '14:32', 
                    sender: "chris",
                    id: 11,
                    sent: false 
                }
            ]
        }
    ]
}

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SEND_MESSAGE: return send(state, action);
        case actionTypes.CHANGE_CHAT: return changeChat(state, action);
        case actionTypes.CHANGE_FORM_HEIGHT: return changeChatFormHeight(state, action);
        case actionTypes.FETCH_ALL_USERS_START: return fetchAllUsersStart(state, action);
        case actionTypes.FETCH_ALL_USERS_SUCCESS: return fetchAllUsersSuccess(state, action);
        case actionTypes.FETCH_ALL_USERS_FAILED: return fetchAllUsersFailed(state, action);
        case actionTypes.CREATE_DUMMY_CHAT: return createDummyChat(state, action);
        case actionTypes.REPLACE_DUMMY_CHAT: return replaceDummyChat(state, action);
        case actionTypes.CHANGE_CHAT_INPUT: return chatInputChangeHandler(state, action);
        case actionTypes.ADD_FRIEND_START: return addFriendStart(state, action);
        case actionTypes.ADD_FRIEND_SUCCESS: return addFriendSuccess(state, action);
        case actionTypes.ADD_FRIEND_FAILED: return addFriendFailed(state, action);
        default: return state;
    }
}

//-------------------------------------------------------


const send = (state, action) => {
    const chatsNew = state.chats.map(chat => {
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

//-------------------------------------------------------


const changeChat = (state, action) => {
    return {
        ...state,
        currentChatId: action.chatId,
    }
}

const chatInputChangeHandler = (state, action) => {
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === state.currentChatId){
            return {
                ...chat,
                inputValue: action.value
            }
        } else {
            return chat
        }
    })
    const dummyChatsNew = state.dummyChats.map(chat => {
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
        dummyChats: dummyChatsNew
    }
}

const changeChatFormHeight = (state, action) => {
    return {
        ...state,
        formHeight: action.height,
    }
}

//-------------------------------------------------------

const fetchAllUsersStart = (state, aciton) => {
    return {
        ...state,
        allUsersStatus: 'loading'
    }
}

const fetchAllUsersSuccess = (state, action) => {
    const allUsers = action.users.map(user => {
        return {
            name: user.name,
            userId: user._id,
            handle: user.handle
        }
    })
    return {
        ...state,
        allUsersStatus: 'loaded',
        allUsers
    }
}

const fetchAllUsersFailed = (state, action) => {
    return {
        ...state,
        allUsersStatus: 'failed'
    }
}

//-------------------------------------------------------

const createDummyChat = (state, action) => {
    let dummyChatsNew
    if(state.dummyChats.some(chat => chat.chatId === action.userId)){
        console.log('Using existing Dummy chat')
        dummyChatsNew = state.dummyChats
    } else {
        console.log('Creating new Dummy Chat');
        const newDummyChat = {
            chatId: action.userId,
            inputValue: '',
            latestMessages: []
        }
        dummyChatsNew = [...state.dummyChats, newDummyChat]
    }
    return {
        ...state, 
        dummyChats: dummyChatsNew,
        currentChatId: action.userId
    }
}

const replaceDummyChat = (state, action) => {
    const dummyChatsNew = state.dummyChats.filter(chat => {
        return chat.chatId !== action.userId
    })
    return {
        ...state,
        dummyChats: dummyChatsNew
    }
}

//-------------------------------------------------------

const addFriendStart = (state, action) => {
    const sentFriendRequests = [...state.sentFriendRequests, action.friendId]
    return {
        ...state,
        sentFriendRequests
    }
}

const addFriendSuccess = (state, action) => {
    const sentFriendRequests = state.sentFriendRequests.filter(id => {
        return id !== action.friendId
    });
    return {
        ...state,
        sentFriendRequests
    }
}

const addFriendFailed = (state, action) => {
    const sentFriendRequests = state.sentFriendRequests.filter(id => {
        return id !== action.friendId
    });
    const failedFriendRequests = [...state.failedFriendRequests, action.friendId]
    return {
        ...state,
        sentFriendRequests,
        failedFriendRequests
    }
    
}


export default reducer; 