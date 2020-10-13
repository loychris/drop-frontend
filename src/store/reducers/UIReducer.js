import * as actionTypes from '../actions/actionTypes';

const initialState = {
    darkmode: true,
    modalOpen: false,
    currentTab: 'stream',
    menuOpen: false,
}

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.GO_DARK: 
            console.log('Bravo 6 going dark')
            return {
                ...state,
                darkmode: true
            }
        case actionTypes.GO_LIGHT: 
            return {
                ...state,
                darkmode: false
            }
        case actionTypes.SWITCH_TAB: 
            return {
                ...state,
                currentTab: action.tab
            }
        case actionTypes.OPEN_MODAL: 
            return {
                ...state,
                modalOpen: true
            }
        case actionTypes.CLOSE_MODAL: 
            return {
                ...state,
                modalOpen: false
            }
        case actionTypes.OPEN_MENU: 
            return {
                ...state,
                menuOpen: true
            }
        case actionTypes.CLOSE_MENU: 
            return {
                ...state,
                menuOpen: false
            }
        default: return state;
    }
}

export default reducer;