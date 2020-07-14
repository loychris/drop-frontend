import * as actionTypes from '../actionTypes';

const initialState = {
    loadedChats: true,    
    currentChatId: 0,
    chats: [{
        chatId: 0,
        latestMessages: [
          {
            message: 'THis is a chat message',
            time: '14:32', 
            sender: "chris",
            sent: true 
          }
        ]
      }]
}



const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SEND: 
            return {
                ...state,
            }
        case actionTypes.CHANGE_CHAT: 
            return {
                ...state,
            }
        default: return state;
    }
}

export default reducer; 