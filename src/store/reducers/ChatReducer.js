import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentChatId: '1',
    formHeight: 53,
    chatInput: '',  
    allUsers: [],
    allUsersStatus: 'not loaded',

    sendingFriendRequests: [],
    sentFriendRequests: [],
    failedFriendRequests: [],

    receivedFriendRequests: [],
    acceptingFriendRequests: [],

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
            lastInteraction: 1611673082511,
            messages: [
                {
                    dropId: '5fe7c5a1a72a1a1e8445cd68',
                    title: 'Title',
                    time: '14:33',
                    type: 'drop', 
                    sender: '5',
                    id: '3',
                },
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
                },
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
            lastInteraction: 1611673082510,
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
            ],             
            inputValue: '', 
            lastInteraction: 1611673082509,
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
            lastInteraction: 1611673082508,

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
            ],        
        },
        {
            chatId: '6',
            members: [
                { userId: '1'}, 
                { userId: '123456', name: 'Michael Jordan', profilePic: false }
            ],
            inputValue: '', 
            lastInteraction: 1611673082507,
            messages: [
                {
                    text: 'And I took that personally.',
                    time: '14:32', 
                    sender: 'chris',
                    id: 1,
                    sent: true 
                }
            ],        
        },
    ], 
    seenUpdatesChats: [],
    users: [],
    sendingMessages: [],
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

        case actionTypes.SEND_MESSAGES_START: return sendMessagesStart(state, action);
        case actionTypes.SEND_MESSAGES_SUCCESS: return sendMessagesSuccess(state, action);
        case actionTypes.SEND_MESSAGES_FAILED: return sendMessagesFailed(state, action);

        case actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_START: return sendFirstMessageNewChatStart(state, action);
        case actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_SUCCESS: return sendFirstMessageNewChatSuccess(state, action);
        case actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_FAILED: return sendFirstMessageNewChatFailed(state, action);

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

        case actionTypes.FETCH_FRIENDS_START: return fetchFriendsStart(state, action);
        case actionTypes.FETCH_FRIENDS_SUCCESS: return fetchFriendsSuccess(state, action);
        case actionTypes.FETCH_FRIENDS_FAILED: return fetchFriendsFailed(state, action);

        case actionTypes.FETCH_CHATS_START: return fetchChatsStart(state, action);
        case actionTypes.FETCH_CHATS_SUCCESS: return fetchChatsSuccess(state, action);
        case actionTypes.FETCH_CHATS_FAILED: return fetchChatsFailed(state, action);

        case actionTypes.CREATE_DUMMY_CHAT: return createDummyChat(state, action);
        case actionTypes.CHECK_AND_ADD_NEW_MESSAGES: return checkAndAddNewMessages(state, action);
        default: return state;
    }
}


//----- LOG IN / OUT -----------------------------------------------------

const setChatStateOnLogin = (state, action) => {
    const newTextMessagesNotifications = action.userdata.notifications.filter(n => n.type === 'TEXT_MESSAGE');
    const chats = action.userdata.chats.map(chat => {
        const messages = chat.messages.map(message => {
            if(newTextMessagesNotifications.some(n => n.chatId === chat.chatId && n.messageId === message.id)){
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
                        received: [],
                        seen: [],
                        liked: [],
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
            const messagesNew = chat.messages.map(message => {
                if(message.id === sendingMessage.randId){
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

//----- SEND FIRST MESSAGE NEW CHAT -------------------------------------

const sendMessagesStart = (state, action) => {

    const chatsNew = state.chats.map(chat => {
        if(action.chatIds.some(id => id === chat.chatId)){
            const messagesNew = [...chat.messages, action.message]
            return {
                ...chat,
                messages: messagesNew
            } 
        }else {
            return chat
        }
    })
    const sendingM = action.chatIds.map(chatId => { return { randId: action.message.id, chatId}})
    const sendingMessagesNew = [...state.sendingMessages, ...sendingM]
    return {
        ...state,
        chats: chatsNew,
        sendingMessages: sendingMessagesNew
    }
}

const sendMessagesSuccess = (state, action) => {
    return {
        ...state, 
    }
}

const sendMessagesFailed = (state, action) => {
    return {
        ...state
    }
}


//----- SEND FIRST MESSAGE NEW CHAT -------------------------------------

const sendFirstMessageNewChatStart = (state, action) => {
    const { dummyChatId, randId, message, self } = action;
    console.log(action);
    const newMessage = {
        received: [],
        seen: [],
        liked: [],
        text: message, 
        sender: self.userId,
        time: new Date(),
        id: randId,
        type: 'text', 
        sent: true, 
        sending: true
    }
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === dummyChatId){
            return {
                ...chat,
                messages: [newMessage],
            }
        }else{
            return chat
        }
    });
    return {
        ...state,
        chats: chatsNew
    }
}

const sendFirstMessageNewChatSuccess = (state, action) => {
    console.log(action);

    const { dummyChatId, randId, createdChat, self, chatPartner } = action;

    const currentChatIdNew = state.currentChatId === dummyChatId ? createdChat.chatId : state.currentChatId;
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === dummyChatId){
            console.log('FOUND DUMMY CHAT');
            return {
                ...createdChat, 
                members: [self, chatPartner]
            }
        } else {
            return chat
        }
    })
    return {
        ...state, 
        chats: chatsNew,
        currentChatId: currentChatIdNew
    }
}

const sendFirstMessageNewChatFailed = (state, action) => {
    return {
        ...state, 
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

//----- SEND FRIEND REQUEST --------------------------------------------------

const sendFriendRequestStart = (state, action) => {
    const sendingFriendRequestsNew = [...state.sendingFriendRequests, action.user];
    return {
        ...state,
        sendingFriendRequests: sendingFriendRequestsNew
    }
}

const sendFriendRequestSuccess = (state, action) => {
    const sendingFriendRequestsNew = state.sendingFriendRequests.filter(user => user.userId !== action.user.userId);
    const sentFriendRequestsNew = [...state.sentFriendRequests, action.user];
    return {
        ...state,
        sendingFriendRequests: sendingFriendRequestsNew,
        sentFriendRequests: sentFriendRequestsNew,
    }
}

const sendFriendRequestFailed = (state, action) => {
    const sendingFriendRequestsNew = state.sendingFriendRequests.filter(user => user.userId !== action.user.userId);
    const failedFriendRequestsNew = [...state.failedFriendRequests, action.user];
    return {
        ...state,
        failedFriendRequests: failedFriendRequestsNew,
        sendingFriendRequests: sendingFriendRequestsNew, 
    }
}

//----- ACCEPT FRIEND REQUEST --------------------------------------------------


const acceptFriendRequestStart = (state, action) => {
    console.log('USER', action.user);
    const receivedFriendRequestsNew = state.receivedFriendRequests.filter(user => user.userId !== action.user.userId);
    const acceptingFriendRequestsNew = [...state.acceptingFriendRequests, action.user]; 
    return {
        ...state, 
        receivedFriendRequests: receivedFriendRequestsNew,
        acceptingFriendRequests: acceptingFriendRequestsNew
    }
}

const acceptFriendRequestSuccess = (state, action) => {
    const acceptingFriendRequestsNew = state.acceptingFriendRequests.filter(user => user.userId !== action.friend.userId);
    const friendsNew = [...state.friends, action.friend]; 
    const chatsNew = [action.chat, ...state.chats];
    return {
        ...state,
        friends: friendsNew,
        chats: chatsNew,
        acceptingFriendRequests: acceptingFriendRequestsNew,
    }
}

const acceptFriendRequestFailed = (state, action) => {
    const receivedFriendRequestsNew = [...state.receivedFriendRequests, action.user]
    return {
        ...state,
        receivedFriendRequests: receivedFriendRequestsNew,
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
    const dummyChatId = 'dummy' + action.chatPartner.userId
    const alreadyExists = state.chats.some(chat => chat.chatId === dummyChatId);
    const chatsNew = alreadyExists ? state.chats : [
        {
            group: false,
            messages: [],
            chatId: dummyChatId,
            members: [action.self, action.chatPartner],
            name: action.chatPartner.name
        }, 
        ...state.chats]
    return {
        ...state,
        chats: chatsNew,
        currentChatId: dummyChatId
    }
}

const addNewUsers = (state, action) => {
    const personsNew = [...state.users, ...action.users];
    return {
        ...state,
        users: personsNew
    }
}

const removeDuplicateMessages = (messages) => {
    let messageSet = [];
    messages.forEach(message => {
        if(!messageSet.some(m => m.id === message.id)){
            messageSet.push(message);
        }
    })
    return messageSet;
}

const checkAndAddNewMessages = (state, action) => {
    const chatsNew = state.chats.map(chat => {
        const newMessagesThisChat = action.notifications
            .filter(n => n.chatId === chat.chatId)
            .map(n => {return {...n.message, new: true}})
        if(newMessagesThisChat.length > 0){
            const messagesNew = removeDuplicateMessages([...chat.messages, ...newMessagesThisChat]);
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
        chats: chatsNew 
    }
}





export default reducer;