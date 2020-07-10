import * as actionTypes from '../actionTypes';

const initialState = {
    StreamElements: [
        { position: 0, show: "left", id: "0" },
        { position: 1, show: "show", id: "1" },
        { position: 2, show: "show", id: "2" },
        { position: 3, show: "show", id: "3" },
        { position: 4, show: "show", id: "4" },
        { position: 5, show: "show", id: "5" },
        { position: 6, show: "show", id: "6" },
        { position: 7, show: "show", id: "7" },
        { position: 8, show: "show", id: "8" },
        { position: 9, show: "show", id: "9" },
        { position: 10, show: "show", id: "10" },
        { position: 11, show: "show", id: "11" },
        { position: 12, show: "show", id: "12" },
        { position: 13, show: "show", id: "13" },
        { position: 14, show: "show", id: "14" },
        { position: 15, show: "show", id: "15" },
        { position: 16, show: "show", id: "16" },
        { position: 17, show: "show", id: "17" },
        { position: 18, show: "show", id: "18" },
        { position: 19, show: "show", id: "19" },
        { position: 20, show: "show", id: "20" },
    ],
    currentlyDropping: false,
    initialPageLoad: true,
    timeStampLastSwipe: 0,
    currentPostId: 4
}

const swipe = () => {

}

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SWIPE_LEFT: return state;
        case actionTypes.SWIPE_RIGHT: return state; 
        default: return state;
    }
}

export default reducer; 