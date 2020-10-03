import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loadedChats: true,    
    currentChatId: 0,
    chats: [
        {
            chatId: 0,
            name: 'Pokern',
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
        case actionTypes.SEND: 
            return {
                ...state,
            }
        case actionTypes.CHANGE_CHAT: 
            console.log('Changing chat');
            return {
                ...state,
                currentChatId: action.chatId,
            }
        default: return state;
    }
}

export default reducer; 