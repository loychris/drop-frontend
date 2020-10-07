import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loadedChats: true,    
    currentChatId: 0,
    height: 42,
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
            chatId: 2,
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
            chatId: 3,
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
            chatId: 4,
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
            chatId: 5,
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
            chatId: 7,
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
            chatId: 8,
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
            chatId: 9,
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
            chatId: 10,
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
            chatId: 11,
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
            chatId: 12,
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
            chatId: 13,
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
            chatId: 14,
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




const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SEND_MESSAGE: 
            return send(state, action);
    
        case actionTypes.CHANGE_CHAT: 
            console.log('Changing chat');
            console.log(action.inputValue);
            const chatsNew2 = state.chats.map(c => {
                if(c.chatId === state.currentChatId){
                    return {
                        ...c,
                        inputValue: action.inputValue
                    }
                }else {
                    return c
                }
            })
            return {
                ...state,
                chats: chatsNew2,
                currentChatId: action.chatId,
            }
        case actionTypes.SET_CHAT_FORM_HEIGHT: 
            console.log('Action: ', action.height, 'State: ', state.height)
            return {
                ...state,
                height: action.height,
            }
        case actionTypes.SET_CHAT_INPUT: 
            const chatsNew = state.chats.map(c => {
                if(c.chatId === state.currentChatId){
                    return {

                    }
                }
            })
        default: return state;
    }
}

export default reducer; 