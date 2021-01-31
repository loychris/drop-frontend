import * as actionTypes from './actionTypes';

export const goDark = () => {
    return {
        type: actionTypes.GO_DARK
    }
}

export const goLight = () => {
    return {
        type: actionTypes.GO_LIGHT
    }
}

export const switchTab = (tab) => {
    return {
        type: actionTypes.SWITCH_TAB,
        tab: tab
    }
}

export const openModal = () => {
    return {
        type: actionTypes.OPEN_MODAL
    }
}

export const closeModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL
    }
}

export const openMenu = () => {
    return {
        type: actionTypes.OPEN_MENU
    }
}

export const closeMenu = () => {
    return {
        type: actionTypes.CLOSE_MENU
    }
}

export const openBackdrop = (zIndex) => {
    return {
        type: actionTypes.OPEN_BACKDROP,
        zIndex: zIndex
    }
}

export const closeBackdrop = () => {
    return {
        type: actionTypes.CLOSE_BACKDROP
    }
}

export const closeNewChatModal = () => {
    return {
        type: actionTypes.CLOSE_NEW_CHAT_MODAL
    }
}

export const openNewChatModal = () => {
    return {
        type: actionTypes.OPEN_NEW_CHAT_MODAL
    }
}

export const setWindowWidth = (width) => {
    return {
        type: actionTypes.SET_WINDOW_WIDTH,
        width
    }
}