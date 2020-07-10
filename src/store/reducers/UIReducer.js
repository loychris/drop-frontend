import * as actionTypes from '../actionTypes';

const initialState = {
    darkmode: true,
    openTab: 'stream'
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
                openTab: action.tab
            }

        default: return state;
    }
}

export default reducer;