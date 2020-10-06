import * as actionTypes from '../actions/actionTypes';

export const send = (msg) => {
    return {
        type: actionTypes.UNSELECT_COMMENT,
        msg: msg
    }
}

export const changeChat = (chatId, inputValue) => {
    return {
        type: actionTypes.CHANGE_CHAT,
        chatId,
        inputValue
    }
}

export const setChatFormHeight = (height) => {
    return {
        type: actionTypes.SET_CHAT_FORM_HEIGHT,
        height
    }
}

export const setChatInput = (value) => {
    return {
        type: actionTypes.SET_CHAT_INPUT,
        value
    }
}