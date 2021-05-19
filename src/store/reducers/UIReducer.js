import * as actionTypes from '../actions/actionTypes';

const initialState = {
    darkmode: true,
    dropModalOpen: false,
    currentTab: 'stream',
    menu: {
        open: false,
        menuStack: ['AUTH'],
        currentDepth: 0,
        shouldMoveRight: false,
    },
    newChatModalOpen: false,
    windowWidth: 1080,
    loginOrSignup: 'login',
}

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 10);
    }
};

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
            scrollToTop()
            return {
                ...state,
                currentTab: action.tab
            }
        case actionTypes.OPEN_DROP_MODAL: 
            return {
                ...state,
                dropModalOpen: true
            }
        case actionTypes.CLOSE_DROP_MODAL: 
            return {
                ...state,
                dropModalOpen: false
            }
        case actionTypes.OPEN_MENU: 
            return {
                ...state,
                menu: {
                    ...state.menu,
                    open: true
                }
            }
        case actionTypes.CLOSE_MENU: 
            return {
                ...state,
                menu: {
                    ...state.menu,
                    open: false
                }
            }
        case actionTypes.OPEN_NEW_CHAT_MODAL: 
            return {
                ...state,
                newChatModalOpen: true
            }
        case actionTypes.CLOSE_NEW_CHAT_MODAL: 
            return {
                ...state,
                newChatModalOpen: false
            }
        case actionTypes.SET_WINDOW_WIDTH: 
            return {
                ...state, 
                windowWidth: action.width
            }
        case actionTypes.SET_UI_STATE_ON_LOGIN: 
            return {
                ...state, 
                menu: {
                    open: false,
                    menuStack: ['USER_MENU'],
                    currentDepth: 0,
                },
            }
        // case actionTypes.SET_UI_STATE_ON_LOGOUT: 
        //     return {
        //         ...state, 
        //         menu: {
        //             open: true,
        //             menuStack: ['AUTH'],
        //             currentDepth: 0,
        //         }
        //     }
        case actionTypes.ADD_TO_MENU_STACK: 
            return {
                ...state,
                menu: {
                    ...state.menu,
                    shouldMoveRight: true, 
                    menuStack: [...state.menu.menuStack, action.next]
                    
                }
            }
        case actionTypes.POP_FROM_MENU_STACK: 
            return {
                ...state, 
                menu: {
                    ...state.menu,
                    currentDepth: state.menu.currentDepth-1,
                    menuStack: state.menu.menuStack.slice(0, state.menu.menuStack.length-1)
                }
            }
        case actionTypes.MOVE_MENU_RIGHT: 
            return {
                ...state, 
                menu: {
                    ...state.menu,
                    shouldMoveRight: false, 
                    currentDepth: state.menu.currentDepth + 1 
                }
            }
        default: return state;
    }
}

export default reducer;