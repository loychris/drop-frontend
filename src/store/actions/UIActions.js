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

export const openAuth = () => {
    return {
        type: actionTypes.OPEN_AUTH
    }
}

export const closeAuth = () => {
    return {
        type: actionTypes.CLOSE_AUTH
    }
}