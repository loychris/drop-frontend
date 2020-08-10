import * as actionTypes from '../actionTypes';

const initialState = {
    dropTargets: [
        {
          selected: false,
          type: 'group',
          name: 'Chris Loy',
          id: 1
        }
    ],
    selectedTargets: [
        
    ],
    StreamElements: [
        { position: 0, show: "left", id: "0", status: 'loading'},
        { position: 1, show: "show", id: "1" , status: 'loaded', post: {source: "facebook.com", title: "Title of the post"}},
        { position: 2, show: "show", id: "2" , status: 'loading'},
        { position: 3, show: "show", id: "3" , status: 'loading'},
        { position: 4, show: "show", id: "4" , status: 'loading'},
        { position: 5, show: "show", id: "5" , status: 'loading'},
        { position: 6, show: "show", id: "6" , status: 'loading'},
        { position: 7, show: "show", id: "7" , status: 'loading'},
        { position: 8, show: "show", id: "8" , status: 'loading'},
        { position: 9, show: "show", id: "9" , status: 'loading'},
        { position: 10, show: "show", id: "10", status: 'loading'},
        { position: 11, show: "show", id: "11", status: 'loading'},
        { position: 12, show: "show", id: "12", status: 'loading'},
        { position: 13, show: "show", id: "13", status: 'loading'},
        { position: 14, show: "show", id: "14", status: 'loading'},
        { position: 15, show: "show", id: "15", status: 'loading'},
        { position: 16, show: "show", id: "16", status: 'loading'},
        { position: 17, show: "show", id: "17", status: 'loading'},
        { position: 18, show: "show", id: "18", status: 'loading'},
        { position: 19, show: "show", id: "19", status: 'loading'},
        { position: 20, show: "show", id: "20", status: 'loading'},
        { position: 21, show: "show", id: "21", status: 'loading'},
    ],
    initialPageLoad: true,
    timeStampLastSwipe: 0,
    nextId: '22'
}



const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SELECT_DROPTARGET: 
            return {
                ...state,
                dropTargets: state.dropTargets.map(x => {
                    if(x.id === action.id){
                        state.selectedTargets.push({ ...x, selected: true });
                        return { ...x, selected: true }
                    } 
                    return x;
                })
            }
        case actionTypes.UNSELECT_DROPTARGET:
            return {
                ...state,
                selectedTargets: state.selectedTargets.filter(x => x.id !== action.id),
                dropTargets: state.dropTargets.map(x => {
                    if(x.id === action.id){
                        return { ...x, selected: false }
                    } 
                    return x;
                })
            }
        case actionTypes.SWIPE: 
            const timestamp  = Date.now();
            let newElements = state.StreamElements.map(s => {
                return {
                    ...s, 
                    position: s.position - 1,
                    show: s.position-1 === 0 ? action.dir : 'show'
                }
            })
            .filter(s => {
                return s.position >= 0
            })
            newElements.push({
                position: 20,
                show: 'show',
                id: state.nextId,
                status: 'loading'
            })
            const nextId = `${state.timeStampLastSwipe}`;
            return {
                ...state,
                nextId: nextId,
                StreamElements: newElements,
                timeStampLastSwipe: timestamp,
            }
        default: return state;
    }
}

export default reducer; 