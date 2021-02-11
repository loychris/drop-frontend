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
    creatingChats: [],
    messageBuffer: [],

    friends: [
        { userId: '42069',  name: 'Elon Musk',        handle: 'elon',    profilePic: false},
        { userId: '12',     name: 'Tonald Drump',     handle: 'donald',  profilePic: false},
        { userId: '12345',  name: 'Shrek',            handle: 'shrek',   profilePic: false},
        { userId: '42069',  name: 'Rick Astley',      handle: 'rick',    profilePic: false},
        { userId: '123456', name: 'Keano Reeeeeeeee', handle: 'Keano',   profilePic: false},
        { userId: '122',    name: 'Michael Jordan',   handle: 'michael', profilePic: false},


    ],
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
                { userId: '122', name: 'Michael Jordan', handle: 'michael', profilePic: false},
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

        case actionTypes.SEND_DROP_START: return sendDropStart(state, action);
        case actionTypes.SEND_DROP_SUCCESS: return sendDropSuccess(state, action);
        case actionTypes.SEND_DROP_FAILED: return sendDropFailed(state, action);

        case actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_START: return sendFirstMessageNewChatStart(state, action);
        case actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_SUCCESS: return sendFirstMessageNewChatSuccess(state, action);
        case actionTypes.SEND_FIRST_MESSAGE_NEW_CHAT_FAILED: return sendFirstMessageNewChatFailed(state, action);

        case actionTypes.ADD_MESSAGE_TO_BUFFER: return addMessageToBuffer(state, action);
        case actionTypes.SEND_MESSAGE_FROM_BUFFER_START: return sendMessageFromBufferStart(state, action);
        case actionTypes.SEND_MESSAGE_FROM_BUFFER_SUCCESS: return sendMessageFromBufferSuccess(state, action);
        case actionTypes.SEND_MESSAGE_FROM_BUFFER_FAILED: return sendMessageFromBufferFailed(state, action);
         

        case actionTypes.CHANGE_CHAT: return changeChat(state, action);
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

        case actionTypes.FETCH_CHATS_START: return fetchChatsStart(state, action);
        case actionTypes.FETCH_CHATS_SUCCESS: return fetchChatsSuccess(state, action);
        case actionTypes.FETCH_CHATS_FAILED: return fetchChatsFailed(state, action);

        case actionTypes.FETCH_NEW_CHAT_START: return fetchNewChatStart(state, action);
        case actionTypes.FETCH_NEW_CHAT_SUCCESS: return fetchNewChatSuccess(state, action);
        case actionTypes.FETCH_NEW_CHAT_FAILED: return fetchNewChatFailed(state, action);

        case actionTypes.CREATE_DUMMY_CHAT: return createDummyChat(state, action);
        case actionTypes.CHECK_AND_ADD_NEW_MESSAGES: return checkAndAddNewMessages(state, action);
        case actionTypes.OPEN_CHRIS_CHAT: return openChrisChat(state, action);


        default: return state;
    }
}


//----- LOG IN / OUT -----------------------------------------------------

const setChatStateOnLogin = (state, action) => {
    console.log(action.userdata.receivedFriendRequests);
    const newTextMessagesNotifications = action.userdata.notifications.filter(n => n.type.startsWith('NEW_MESSAGE'));
    const dummyChatsFromRequests = action.userdata.receivedFriendRequests
    .filter(user => !action.userdata.chats.some(c => c.members.some(m => m.userId === user.userId)))
    .map(user => {
        console.log(user);
        const self = {
            userId: action.userdata.userId,
            name: action.userdata.name,
            handle: action.userdata.handle,
            profilePic: action.userdata.profilePic,
        }
        const dummyChatId = `dummy${user.userId}`
        return {
            group: false,
            messages: [],
            chatId: dummyChatId,
            members: [self, user],
            name: user.name,
            lastInteraction: Date.now(),
        }
    })
    console.log(dummyChatsFromRequests);
    const chatsNew = [
        ...action.userdata.chats.map(chat => {
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
        }),
        ...dummyChatsFromRequests
    ]
    return {
        ...state, 
        receivedFriendRequests: action.userdata.receivedFriendRequests, 
        sentFriendRequests: action.userdata.sentFriendRequests,
        friends: action.userdata.friends,
        chats: chatsNew,
        currentChatId: action.userdata.chats.length > 0 ? action.userdata.chats[0].chatId : null,
    }
}



//----- CHANGE CHAT ------------------------------------------------------

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

//----- SEND MESSAGE  -------------------------------------------------

const sendMessageStart = (state, action) => {
    const { randId, text, userId } = action;
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
                        text: text, 
                        sender: userId,
                        time: new Date(),
                        id: randId,
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

const sendDropStart = (state, action) => {
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
        sendingMessages: sendingMessagesNew,
        currentChatId: action.chatIds[0],
    }
}

const sendDropSuccess = (state, action) => {
    
    const { messageReplacements, chatReplacements, randId } = action;
    let currentChatIdNew = state.currentChatLoaded;
    console.log(action)
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId.startsWith('dummy')){
            console.log('FOUND DUMMY CHAT');
            const chatReplacement = chatReplacements.find(r => `dummy${r.userId}` === chat.chatId); 
            if(chatReplacement){
                console.log('FOUND A MATCHING REPLACEMENT');
                currentChatIdNew = chatReplacement.chat.chatId;
                return chatReplacement.chat;
            }
        }
        const messageReplacement = messageReplacements.find(r => r.chatId === chat.chatId);
        if(messageReplacement){
            const messagesNew = chat.messages.map(message => {
                if(message.id === randId){
                    return messageReplacement.message
                }else {
                    return message
                }
            })
            return {
                ...chat,
                messages: messagesNew
            }
        } else {
            return chat
        }
    })
    return {
        ...state,
        chats: chatsNew,
        currentChatId: currentChatIdNew, 
    }
}

const sendDropFailed = (state, action) => {
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
    const creatingChatsNew = [...state.creatingChats, dummyChatId];
    return {
        ...state,
        chats: chatsNew,
        creatingChats: creatingChatsNew
    }
}

const sendFirstMessageNewChatSuccess = (state, action) => {
    const { dummyChatId, createdChat, self, chatPartner } = action;
    const currentChatIdNew = state.currentChatId === dummyChatId ? createdChat.chatId : state.currentChatId;
    const dummyChatMessages = state.chats.find(c => c.chatId === dummyChatId).messages;
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === dummyChatId){
            console.log('FOUND DUMMY CHAT');
            return {
                ...createdChat, 
                messages: [...createdChat.messages, ...dummyChatMessages.slice(1, dummyChatMessages.length)],
                members: [self, chatPartner],
            }
        } else {
            return chat
        }
    })
    const messageBufferNew = state.messageBuffer.map(message => {
        if(message.dummyChatId === dummyChatId){
            return {
                ...message, 
                dummyChatId: createdChat.chatId
            }
        }else {
            return message
        }
    })
    const creatingChatsNew = state.creatingChats.filter(id => id !== dummyChatId);
    return {
        ...state, 
        chats: chatsNew,
        currentChatId: currentChatIdNew,
        messageBuffer: messageBufferNew, 
        creatingChats: creatingChatsNew,
    }
}

const sendFirstMessageNewChatFailed = (state, action) => {
    return {
        ...state, 
    }
}

//----- ADD_MESSAGE_TO_BUFFER ------------------------------------------

const addMessageToBuffer = (state, action) => {
    const { dummyChatId, dummyMessageId, text, userId } = action; 
    const messageBufferNew = [...state.messageBuffer, {
        dummyChatId,
        dummyMessageId, 
        text, 
        id: `${Date.now()}`
    }]
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
                        text: text, 
                        sender: userId,
                        time: new Date(),
                        id: dummyMessageId,
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
        messageBuffer: messageBufferNew,
        chats: chatsNew
    }
}

const sendMessageFromBufferStart = (state, action) => {
    const { id } = action;
    const messageBufferNew = state.messageBuffer.map(m => {
        if(m.id === id){
            return {
                ...m, 
                sending: true
            }
        }else {
            return m; 
        }
    })
    return {
        ...state, 
        messageBuffer: messageBufferNew
    }
}

//////////////////////////////////////////////////////////////////////

const sendMessageFromBufferSuccess = (state, action) => {
    const { id, response } = action;;
    const bufferMessage = state.messageBuffer.find(m => m.id === id);
    console.log(bufferMessage);
    const chatsNew = state.chats.map(chat => {
        if(chat.chatId === bufferMessage.dummyChatId){
            const messagesNew = chat.messages.map(m => {
                if(m.id === bufferMessage.dummyMessageId){
                    return response
                }else{
                    return m
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
    const messageBufferNew = state.messageBuffer.filter(m => m.id !== id)
    return {
        ...state,
        chats: chatsNew,
        messageBuffer: messageBufferNew 
    }
}

///////////////////////////////////////////////////////////////////////

const sendMessageFromBufferFailed = (state, action) => {
    const { id } = action;
    const messageBufferNew = state.messageBuffer.map(m => {
        if(m.id === id){
            return {
                ...m, 
                sending: false
            }
        }else {
            return m; 
        }
    })
    return {
        ...state, 
        messageBuffer: messageBufferNew
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
    const sentFriendRequestsNew = action.chat ? state.sentFriendRequests : [...state.sentFriendRequests, action.user];
    let chatsNew = state.chats;
    let currentChatIdNew = state.currentChatId;
    let friendsNew = state.friends;
    if(action.chat){
        chatsNew = [
            ...state.chats.filter(chat => chat.chatId !== action.chat.chatId && chat.chatId !== `dummy${action.user.userId}`),
            action.chat
        ]
        currentChatIdNew = action.chat.chatId;
        friendsNew = [...state.friends, action.user]
    }
    return {
        ...state,
        sentFriendRequests: sentFriendRequestsNew,
        sendingFriendRequests: sendingFriendRequestsNew, 
        chats: chatsNew,
        currentChatId: currentChatIdNew,
        friends: friendsNew,
    }
}

const sendFriendRequestFailed = (state, action) => {
    const sendingFriendRequestsNew = state.sendingFriendRequests.filter(user => user.userId !== action.user.userId);
    const failedFriendRequestsNew = [...state.failedFriendRequests, action.user];

    return {
        ...state, 
        sendingFriendRequests: sendingFriendRequestsNew, 
        failedFriendRequests: failedFriendRequestsNew, 
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
    const { friend, chat } = action;
    const acceptingFriendRequestsNew = state.acceptingFriendRequests.filter(user => user.userId !== friend.userId);
    const friendsNew = [...state.friends, friend]; 
    const dummyId = `dummy${friend.userId}`
    const chatsNew = [
        ...state.chats.filter(c => c.chatId !== dummyId && c.chatId !== chat.chatId), 
        chat
    ]
    const currentChatIdNew = chat.chatId;
    return {
        ...state,
        friends: friendsNew,
        chats: chatsNew,
        acceptingFriendRequests: acceptingFriendRequestsNew,
        currentChatId: currentChatIdNew,
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
            name: action.chatPartner.name,
            lastInteraction: Date.now()
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

//------ FETCH NEW CHAT ------------------------------------------------------------

const fetchNewChatStart = (state, action) => {
    return {
        ...state, 
    }
}

const fetchNewChatSuccess = (state, action) => {
    
    const chatsNew = [...state.chats.filter(chat => chat.chatId !== action.chat.chatId), action.chat]
    return {
        ...state, 
        chats: chatsNew
    }
}

const fetchNewChatFailed = (state, action) => {
    return {
        ...state, 
    }
}

//------ OPEN CHRIS CHAT -----------------------------------------------------------

const openChrisChat = (state, action) => {
    const existingChrisChat = state.chats
        .find(chat => chat.chatId === 'dummy6022396f28d69d22509a5d46' 
           || chat.members.some(m => m.userId === '6022396f28d69d22509a5d46')); 
    const currentChatIdNew = existingChrisChat ? existingChrisChat.chatId : 'dummy6022396f28d69d22509a5d46';
    const chatsNew = existingChrisChat ? state.chats : [...state.chats, {
        group: false,
        name: 'Chris Loy',
        messages: [],
        chatId: 'dummy6022396f28d69d22509a5d46',
        members: [action.self, {
            name: 'Chris Loy',
            handle: 'chris',
            userId: '6022396f28d69d22509a5d46', 
            profilePic: true
        }],
        lastInteraction: Date.now(),
    }]
    return {
        ...state, 
        chats: chatsNew, 
        currentChatId: currentChatIdNew,
    }
}


export default reducer;