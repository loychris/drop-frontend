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

export const openDropModal = () => {
    return {
        type: actionTypes.OPEN_DROP_MODAL
    }
}

export const closeDropModal = () => {
    return {
        type: actionTypes.CLOSE_DROP_MODAL
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

export const openSignup = () => {
    return {
        type: actionTypes.OPEN_SIGNUP
    }
}

export const openLogin = () => {
    return {
        type: actionTypes.OPEN_LOGIN
    }
}

export const setUIStateonLogin = () => {
    return {
        type: actionTypes.SET_UI_STATE_ON_LOGIN
    }
}

export const setUIStateonLogout = () => {
    return {
        type: actionTypes.SET_UI_STATE_ON_LOGOUT
    }
}

export const addToMenuStack = (next) => {
    return {
        type: actionTypes.ADD_TO_MENU_STACK, 
        next
    }
}

export const popFromMenuStack = () => {
    return {
        type: actionTypes.POP_FROM_MENU_STACK
    }
}

export const moveRight = () => {
    return {
        type: actionTypes.MOVE_MENU_RIGHT
    }
}