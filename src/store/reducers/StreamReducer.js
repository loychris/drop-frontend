import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dropTargets: [],
    selectedTargets: [],
    ids: [],
    StreamElements: [
        { position: 0, show: "left", id: "0", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 1, show: "show", id: "1" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 2, show: "show", id: "2" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 3, show: "show", id: "3" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 4, show: "show", id: "4" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 5, show: "show", id: "5" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 6, show: "show", id: "6" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 7, show: "show", id: "7" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 8, show: "show", id: "8" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 9, show: "show", id: "9" , status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 10, show: "show", id: "10", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 11, show: "show", id: "11", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 12, show: "show", id: "12", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 13, show: "show", id: "13", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 14, show: "show", id: "14", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 15, show: "show", id: "15", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 16, show: "show", id: "16", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 17, show: "show", id: "17", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 18, show: "show", id: "18", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 19, show: "show", id: "19", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 20, show: "show", id: "20", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 21, show: "show", id: "21", status: 'not loaded', commentsStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
    ],
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
                let ids = state.ids;
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
                    id: ids.pop(),
                    status: 'id loaded',
                    commentsStatus: 'not loaded',
                    comments: []
                })
                return {
                    ...state,
                    StreamElements: newElements,
                    timeStampLastSwipe: timestamp,
                    ids
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
            let ids = action.ids;

            const streamElementsWithIds = state.StreamElements.map((s, i) => {
                const memeStatus = s.position === 1 ? 'loading' : 'not loaded'
                if(s.position > action.ids.length-1){
                    return {...s, id: 'no more' + Math.random(), status: 'no more', memeStatus} 
                }else {
                    return { ...s, id: ids.pop(), status:'id loaded', memeStatus}
                }
            })
            return {
                ...state,
                ids,
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
                            if(c.id === action.commentId){
                                if(action.path === '/'){
                                    return { ...c, selected: true }
                                }
                                else {
                                    console.log('TODO: find subcomment')
                                    return null
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
        case actionTypes.SET_DROP: 
            const streamElementsWithDrop = state.StreamElements.map(s => {
                if(s.id === action.dropId){
                    return {
                        ...s,
                        ...action.drop,
                        // title: action.drop.title ? action.drop.title : null,
                        // source: action.drop.source ? action.drop.source : null,
                        status: 'drop loaded',
                        commentsStatus: 'loaded'
                    }
                }else {
                    return s
                }
            })
            return {
                ...state,
                StreamElements: streamElementsWithDrop
            }


        // Comments currently get fetched directly with populate in drop
        // Maybe change back when comments allow pics

        // case actionTypes.SET_COMMENTS: 
        //     const streamElementsWithComments = state.StreamElements.map(s => {
        //         if(s.id === action.dropId){
        //             return {
        //                 ...s,
        //                 commentsStatus: 'loaded',
        //                 comments: action.comments
        //             }
        //         } else {
        //             return s;
        //         }
        //     }) 
        //     return {
        //         ...state,
        //         StreamElements: streamElementsWithComments
        //     }

        case actionTypes.MEME_LOADED: 
            let currentPosition;
            const StreamElementWithMeme = state.StreamElements.map(s => {
                if(s.id === action.dropId){
                    currentPosition = s.position
                    return {
                        ...s,
                        memeStatus: 'loaded'
                    }
                }
                else if(s.position === currentPosition + 1 ){
                    return {
                        ...s,
                        memeStatus: 'loading'
                    }
                }else {
                    return s
                }
            })
            return {
                ...state,
                StreamElements: StreamElementWithMeme
            }

        case actionTypes.COMMENT_SAVED: 
            const StreamElementsWithSavedComment = state.StreamElements.map(s => {
                if(s.id === action.dropId){
                    return {
                        ...s,
                        comments: [...s.comments, action.comment]
                    }
                }
                else {
                    return s
                }
            })

            return {
                ...state,
                StreamElements: StreamElementsWithSavedComment
            }
        default: return state;
    }
}

export default reducer; 