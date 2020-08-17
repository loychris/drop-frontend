import * as actionTypes from '../actions/actionTypes';

export const send = (msg) => {
    return {
        type: actionTypes.UNSELECT_COMMENT,
        msg: msg
    }
}

export const changeChat = (chatId) => {
    return {
        type: actionTypes.CHANGE_CHAT,
        chatId: chatId
    }
}