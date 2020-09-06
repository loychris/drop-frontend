import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dropTargets: [
        // {
        //   selected: false,
        //   type: 'group',
        //   name: 'Chris Loy',
        //   id: 1
        // }
    ],
    selectedTargets: [],
    ids: [],
    StreamElements: [
        { position: 0, show: "left", id: "0", status: 'loading', commentsStatus: 'loading', comments: []},
        { 
            position: 1, show: "show", id: "1" , status: 'loaded', 
            post: { 
                source: "facebook.com", 
                title: "Title of the post"
            },
            commentsStatus: 'loaded',
            comments: [{
                commentId: 12345678,
                author: 'user',
                points: 0,
                comment: "comment",
                selected: false,
                subComments: [{
                    author: "Chris Loy",
                    points: 100,
                    comment: "subcomment",
                    subComments: []
                }]
            }], 
            selectedComment: null
        },
        { position: 2, show: "show", id: "2" , status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 3, show: "show", id: "3" , status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 4, show: "show", id: "4" , status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 5, show: "show", id: "5" , status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 6, show: "show", id: "6" , status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 7, show: "show", id: "7" , status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 8, show: "show", id: "8" , status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 9, show: "show", id: "9" , status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 10, show: "show", id: "10", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 11, show: "show", id: "11", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 12, show: "show", id: "12", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 13, show: "show", id: "13", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 14, show: "show", id: "14", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 15, show: "show", id: "15", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 16, show: "show", id: "16", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 17, show: "show", id: "17", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 18, show: "show", id: "18", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 19, show: "show", id: "19", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 20, show: "show", id: "20", status: 'loading', commentsStatus: 'loading', comments: []},
        { position: 21, show: "show", id: "21", status: 'loading', commentsStatus: 'loading', comments: []},
    ],
    initialStreamLoad: 'not loaded',
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
            if(state.StreamElements[1].selectedComment){
                console.log('UNSELECTING COMMENT')
                const streamElementsUnselectedComments = state.StreamElements.map(s => {
                    if(s.position === 1){
                        return {
                            ...s,
                            comments: s.comments.map(c => {
                                return { ...c, selected: false }
                            }),
                            selectedComment: null
                        }
                    }else { return s }
                })
                return {
                    ...state,
                    StreamElements: streamElementsUnselectedComments
                }
            }else{
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
                    status: 'loading',
                    commentsStatus: 'loading',
                    comments: []
                })
                const nextId = `${state.timeStampLastSwipe}`;
                return {
                    ...state,
                    nextId: nextId,
                    StreamElements: newElements,
                    timeStampLastSwipe: timestamp,
                }
            }
            

        case actionTypes.ADD_COMMENT:
            const newComment = {
                commentId: Math.random(),
                author: 'user',
                points: 0,
                comment: action.comment,
                subComments: [],
                status: 'sending'
            }
            const streamElementsNew = state.StreamElements.map(s => {
                if(s.id === action.id){
                    const commentsNew = [...s.comments, newComment]
                    return {
                        ...s,
                        comments: commentsNew
                    }
                }else { return s }
            })
            return {
                ...state,
                StreamElements: streamElementsNew
            }

        case actionTypes.SET_IDS: 
            console.log('IDS: ', action.ids); 
            const streamElementsWithIds = state.StreamElements.map((element, i) => {
                if(element.position > action.ids.length-1){
                    return {...element, id: 'no more' + Math.random(), status: 'no more' } 
                }else {
                    return { ...element, id: action.ids[element.position], status:'id loaded'}
                }
            })
            return {
                ...state,
                StreamElements: streamElementsWithIds
            }

        case actionTypes.FETCH_IDS_FAILED: 
            return {
                ...state,
                initialStreamLoad: 'Fetch ids failed'
            }

        case actionTypes.SELECT_COMMENT: 
            const StreamElementsCommentSelected = state.StreamElements.map(s => {
                if(s.position === 1){
                    return {
                        ...s,
                        comments: s.comments.map(c => {
                            if(c.commentId === action.commentId){
                                if(action.path === '/'){
                                    return { ... c, selected: true }
                                }
                                else {
                                    console.log('TODO: find subcomment')
                                }
                            } else { return c }
                        }),
                        selectedComment: action.commentId
                    }
                }else { return s }
                    
            });
            return {
                ...state,
                StreamElements: StreamElementsCommentSelected
            }

        case actionTypes.UNSELECT_COMMENT: 
            console.log('UNSELECTING COMMENT')
            const streamElementsUnselectedComments = state.StreamElements.map(s => {
                if(s.position === 1){
                    return {
                        ...s,
                        comments: s.comments.map(c => {
                            return {
                                ...c,
                                selected: false
                            }
                        }),
                        selectedComment: null
                    }
                }else { 
                    return s 
                }
            })
            return {
                ...state,
                StreamElements: streamElementsUnselectedComments
            }
        default: return state;
    }
}

export default reducer; 