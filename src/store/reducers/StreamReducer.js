import * as actionTypes from '../actions/actionTypes';


const initialState = {
    dropTargets: [],
    selectedTargets: [],
    dropIds: [],
    streamStatus: 'nothing loaded',
    streamElements: [
        { position: -4, show: "hidden", id: "-4", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded' },
        { position: -3, show: "hidden", id: "-3", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded' },
        { position: -2, show: "hidden", id: "-2", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded' },
        { position: -1, show: "hidden", id: "-1", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded' },
        { position: 0, show: "hidden", id: "0", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded' },
        { position: 1, show: "show", id: "1", dropStatus: 'loaded', 
            comments: [
                {"id":"6299e12bbe4e51241f85b9ac","comment":"fipw efojpw e","author":{"userId":"602627eac021720012a01948"},"posted":"2022-06-03T10:23:39.669Z","points":0,"subComments":[
                    {"id":"629a004ebb58d226aba80031","path":"6299e12bbe4e51241f85b9ac/0","points":0,"comment":"grw","subComments":[
                        {"id":"629a0051bb58d226aba80033","path":"6299e12bbe4e51241f85b9ac/0/0","points":0,"comment":"reg","subComments":[]},
                        {"id":"629a0054bb58d226aba80035","path":"6299e12bbe4e51241f85b9ac/0/1","points":0,"comment":"erger","subComments":[
                            {"id":"629a0058bb58d226aba80037","path":"6299e12bbe4e51241f85b9ac/0/1/0","points":0,"comment":"gerger","subComments":[
                                {"id":"629a005cbb58d226aba80039","path":"6299e12bbe4e51241f85b9ac/0/1/0/0","points":0,"comment":"gregerger","subComments":[
                                    {"id":"629a005fbb58d226aba8003b","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0","points":0,"comment":"ergergerg","subComments":[
                                        {"id":"629a0062bb58d226aba8003d","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0","points":0,"comment":"egrergerg","subComments":[
                                            {"id":"629a0065bb58d226aba8003f","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0","points":0,"comment":"gegerg","subComments":[
                                                {"id":"629a0067bb58d226aba80041","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0","points":0,"comment":"ergerge","subComments":[
                                                    {"id":"629a006bbb58d226aba80043","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0","points":0,"comment":"gergeger","subComments":[
                                                        {"id":"629a006ebb58d226aba80045","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0","points":0,"comment":"gerger","subComments":[
                                                            {"id":"629a0071bb58d226aba80047","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0","points":0,"comment":"ergergerg","subComments":[
                                                                {"id":"629a0074bb58d226aba80049","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0/0","points":0,"comment":"ergerg","subComments":[
                                                                    {"id":"629a0077bb58d226aba8004b","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0/0/0","points":0,"comment":"rgerg","subComments":[
                                                                        {"id":"629a007abb58d226aba8004d","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0/0/0/0","points":0,"comment":"greger","subComments":[
                                                                            {"id":"629a007ebb58d226aba8004f","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0/0/0/0/0","points":0,"comment":"ererg","subComments":[
                                                                                {"id":"629a0081bb58d226aba80051","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0/0/0/0/0/0","points":0,"comment":"gre","subComments":[
                                                                                    {"id":"629a0084bb58d226aba80053","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0","points":0,"comment":"erergerg","subComments":[
                                                                                        {"id":"629a0089bb58d226aba80055","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0","points":0,"comment":"regerg","subComments":[
                                                                                            {"id":"629a008fbb58d226aba80057","path":"6299e12bbe4e51241f85b9ac/0/1/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0","points":0,"comment":"ergerg","subComments":[]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        {"id":"6299e12fbe4e51241f85b9ad","comment":" fwlejkn f","author":{"userId":"602627eac021720012a01948"},"posted":"2022-06-03T10:23:43.861Z","points":0,"subComments":[]},
        {"id":"629a0f82bb58d226aba8010c","comment":"qd qiwo ","author":{"userId":"602627eac021720012a01948"},"posted":"2022-06-03T13:41:22.145Z","points":0,"subComments":[]},
        {"id":"629a1495bb58d226aba8010d","comment":"oiwef eiowjfoi wje","author":{"userId":"602627eac021720012a01948"},"posted":"2022-06-03T14:03:01.953Z","points":0,"subComments":[]}
            ], 
            memeStatus: 'not loaded'
        },
        { position: 2, show: "show", id: "2", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 3, show: "show", id: "3", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 4, show: "show", id: "4", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 5, show: "show", id: "5", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 6, show: "show", id: "6", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 7, show: "show", id: "7", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 8, show: "show", id: "8", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 9, show: "show", id: "9", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 10, show: "show", id: "10", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 11, show: "show", id: "11", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 12, show: "show", id: "12", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 13, show: "show", id: "13", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 14, show: "show", id: "14", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 15, show: "show", id: "15", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 16, show: "show", id: "16", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 17, show: "show", id: "17", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 18, show: "show", id: "18", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 19, show: "show", id: "19", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 20, show: "show", id: "20", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 21, show: "show", id: "21", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
    ],
    timeStampLastScroll: 0,
    currentlyLoadingMemeId: '', 
    selectedComment: null,
    sending: [],
    timeStampLastScroll: 0,
    mouseOverComments: false,
}

// ----- UTIL --------------------------------------------------------------------

const insertSubComment = (parentPath, subComments, comment) => {
    return subComments.map(s => {
        if(s.path === parentPath) return { ...s, subComments: [...s.subComments, comment] } 
        if(parentPath.startsWith(s.path)) return {...s, subComments: insertSubComment(parentPath, s.subComments, comment) }
        else return s 
    })
}

const replaceSubCommentId = (subComments, randPath, subComment) => {
    return subComments.map(s => {
        if(s.path === randPath){ 
            console.log("Reached SubComment")
            return { ...s, path: subComment.path} 
        }
        else{
            console.log('Going Deepa') 
            return {...s, subComments: replaceSubCommentId(s.subComments, randPath, subComment)}
        }
    })
}

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 10);
    }
};

const setDropsNotLoaded = (state, action) => {
    const streamElementsNew = state.streamElements.map((s,i) => {
        return {
            ...s, 
            // show: i === 0 ? 'hidden' : 'show', 
            id: `${i}-${Date.now()}`, 
            status: 'not loaded', 
            dropStatus: 'not loaded', 
            comments: [], 
            memeStatus: 'not loaded'
        }
    })
    return {
        ...state, 
        streamElements: streamElementsNew,
        streamStatus: 'nothing loaded'
    }
}

// ----- FETCH IDS -----------------------------------------------------------

const fetchIdsStart = (state, action) => {
    return {
        ...state,
        streamStatus: 'loading ids'
    }
}

const setIds = (state, action) => {
    let activeIds = action.ids.slice(0, 21);
    const ids = action.ids.slice(21, action.ids.length)
    const streamElementsNew = state.streamElements.map((s, i) => {
        if(s.position < 1){
            return s
        }else if(activeIds.length === 0){
            return {...s, id: 'no more' + Math.random(), status: 'no more', memeStatus: 'not loaded'} 
        } else {
            return { ...s, id: activeIds.pop(), status:'id loaded', memeStatus: 'not loaded'}
        }
    })
    return {
        ...state,
        dropIds: ids,
        currentlyLoadingMemeId: streamElementsNew[5].id,
        streamElements: streamElementsNew,
        streamStatus: 'ids loaded'
    }
}

const fetchIdsFailed = (state, action) => {
    return { ...state, streamStatus: 'ids failed' }
}


// ----- FETCH DROPS ----------------------------------------------------------

const fetchDropsStart = (state, action) => {
    return state;
}

const setDrops = (state, action) => {
    const streamElementsNew = state.streamElements.map(s => {
        if(s.position === 0){
            return { position: 0, show: "hidden", id: "0", dropStatus: 'loaded', comments: [], memeStatus: 'loading'}
        }
        const drop = action.drops.find(d => d.dropId === s.id); 
        if(drop){
            return {
                ...s,
                comments: drop.comments.map(c => {return {...c, path:'0'}}),
                title: drop.title ? drop.title : null,
                source: drop.source ? drop.source : null,
                dropStatus: 'loaded',
            }
        }else {
            return s
        }
    })
    
    return {
        ...state,
        streamElements: streamElementsNew,
        streamStatus: 'drops loaded'
    }
}

const fetchDropsFailed = (state, action) => {
    return state;
}

// ----- FETCH MEME ----------------------------------------------------------


const fetchMemeSuccess = (state, action) => {
    let nextPos; 
    let nextId = 'no more';
    const streamElementsNew = state.streamElements.map(s => {
        if(action.dropId === s.id){
            nextPos = s.position + 1 
            return {
                ...s, 
                memeStatus: 'loaded'
            }
        } else if(s.position === nextPos) {
            nextId = s.id
            return s
        } else {
            return s
        }
    })
    return {
        ...state,
        streamElements: streamElementsNew,
        currentlyLoadingMemeId: nextId
    }
}

const fetchMemeFailed = (state, action) => {
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === action.dropId){
            return {
                ...s,
                memeStatus: 'failed'
            }
        } else { return s }
    })
    return {
        ...state, 
        streamElements: streamElementsNew
    }
}

// ----- FETCH DROP ----------------------------------------------------------

const fetchDropStart = (state, action) => {
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === action.dropId){
            return {
                ...s,
                dropStatus: 'loading',
            }
        }else {
            return s
        }
    })
    return {
        ...state,
        streamElements: streamElementsNew
    }
}

const fetchDropSuccess = (state, action) => {
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === action.dropId){
            return {
                ...s,
                ...action.drop,
                comments: action.drop.comments ? action.drop.comments.map(c => {return {...c, path:'0'}}) : [],
                title: action.drop.title ? action.drop.title : null,
                source: action.drop.source ? action.drop.source : null,
                dropStatus: 'loaded'
            }
        }else {
            return s
        }
    })
    return {
        ...state,
        streamElements: streamElementsNew
    }
}

const fetchDropFailed = (state, action) => {
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === action.dropId){
            return {
                ...s,
                dropStatus: 'failed',
            }
        }else {
            return s
        }
    })
    return {
        ...state,
        streamElements: streamElementsNew
    }
}


// ----- SEND COMMENT ---------------------------------------------------------------------

const sendCommentStart = (state, action) => {
    const sendingObject = { dropId: action.dropId, randId: action.comment.id }
    const sendingNew = [...state.sending, sendingObject];
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === action.dropId){
            const commentsNew = [action.comment, ...s.comments];
            return {
                ...s,
                comments: commentsNew
            }
        }else {
            return s 
        }
    })
    return {
        ...state,
        sending: sendingNew, 
        streamElements: streamElementsNew,
    }
}

const sendCommentSuccess = (state, action) => {
    console.log(action);
    const sendingNew = state.sending.filter(c => c.randId !== action.randId);
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === action.dropId){
            const commentsNew = s.comments.map(c => {
                if(c.id === action.comment.randId){
                    return action.comment
                }else {
                    return c 
                }
            })
            return {
                ...s, 
                comments: commentsNew
            }
        }else {
            return s
        }
    })
    return {
        ...state,
        streamElements: streamElementsNew,
        sending: sendingNew,
    }
}

const sendCommentFailed = (state, action) => {
    console.log(action.err);
    return {
        ...state
    }
}

// ----- SELECT DROP TARGET ------------------------------------------------------

const selectDropTarget = (state, action) => {
    const dropTargetsNew = [...state.dropTargets, action.chatId]
    return {
        ...state,
        dropTargets: dropTargetsNew
    }
}

const unselectDropTarget = (state, action) => {
    const dropTargetsNew = state.dropTargets.filter(id => id !== action.chatId)
    return {
        ...state, 
        dropTargets: dropTargetsNew
    }
}

const resetDropTargets = (state, action) => {
    return {
        ...state,
        dropTargets: []
    }
}

// ----- SCROLL UP -----------------------------------------------------------------------

const scrollUpStart = (state, action) => {
    //scrollToTop();
    if(state.selectedComment){
        return {
            ...state,
        selectedComment: null
        }
    } else {
        if(state.dropIds.length > 0) console.log('##################');
        const nextId = state.dropIds.length !== 0 ? state.dropIds[0] : 'no more' + Date.now();
        const dropIdsNew = state.dropIds.slice(1, state.dropIds.length); 
        const streamElementsNew = [
            ...state.streamElements.map(s => {
                return {
                    ...s, 
                    position: s.position - 1,
                    show: s.position-1 < 1 ? 'hidden' : 'show'
                }
            })
            .filter(s => {
                return s.position >= -4
            }),
            {
                position: 21,
                show: 'show',
                id: nextId,
                status: 'id loaded',
                dropStatus: 'not loaded',
                comments: []
            }
        ]
        return {
            ...state,
            streamElements: streamElementsNew,
            dropIds: dropIdsNew, 
            dropTargets: [],
            timeStampLastScroll: Date.now()
        }
    }
}

const scrollUpSuccess = (state, action) => {
    return {
        ...state,
    }
}

const scrollUpFailed = (state, action) => {
    return {
        ...state,
    }
}

// ----- SCROLL UP -----------------------------------------------------------------------

const scrollDownStart = (state, action) => {
    //scrollToTop();
    if(state.selectedComment){
        return {
            ...state,
        selectedComment: null
        }
    } else {
        if(state.dropIds.length > 0) console.log('##################');
        const nextId = state.dropIds.length !== 0 ? state.dropIds[0] : 'no more' + Date.now();
        const dropIdsNew = state.dropIds.slice(1, state.dropIds.length); 
        const streamElementsNew = [
            ...state.streamElements.map(s => {
                return {
                    ...s, 
                    position: s.position - 1,
                    show: s.position-1 < 1 ? 'hidden' : 'show'
                }
            })
            .filter(s => {
                return s.position >= -4
            }),
            {
                position: 21,
                show: 'show',
                id: nextId,
                status: 'id loaded',
                dropStatus: 'not loaded',
                comments: []
            }
        ]
        return {
            ...state,
            streamElements: streamElementsNew,
            dropIds: dropIdsNew, 
            dropTargets: [],
            timeStampLastScroll: Date.now()
        }
    }
}

const scrollDownSuccess = (state, action) => {
    return {
        ...state,
    }
}

const scrollDownFailed = (state, action) => {
    return {
        ...state,
    }
}

// ----- SELECT COMMENT ---------------------------------------------------------------------


const selectComment = (state, action) => {
    return { ...state, selectedComment: action.commentId }
}

const unselectComment = (state, action) => {
    return { ...state, selectedComment: null }
}

const selectSubComment = (state, action) => {
    return { ...state, selectedComment: action.path }
}

const unselectSubComment = (state) => {
    return { ...state, selectedComment: null }
}

// ----- SEND SUBCOMMENT -------------------------------------------------------------------------

const sendSubCommentStart = (state, action) => {
    const { dropId, subComment } = action; 
    const newPath = `${state.selectedComment}/${subComment.id}`;
    const sendingNew = [...state.sending, {dropId: dropId, path: newPath}]
    const newSubComment = {
        id: subComment.id,
        comment: subComment.comment,
        path: newPath,
        points: 0,
        subComments: []
    }
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === dropId){
            const comments = s.comments.map(c => {
                if(state.selectedComment.split('/')[0] === c.id){
                    if(state.selectedComment.split('/').length > 1){
                        return {...c, subComments: insertSubComment(state.selectedComment, c.subComments, newSubComment)}
                    }else{

                        return {...c, subComments: [...c.subComments, newSubComment]}
                    }
                }else {
                    return c;
                }
            });
            return {
                ...s,
                comments: comments
            }
        } else {
            return s
        }
    })
    return {
        ...state, 
        streamElements: streamElementsNew, 
        sending: sendingNew,
        selectedComment: null,
    }
}

const sendSubCommentSuccess = (state, action) => {
    const { dropId, randPath, subComment } = action;
    const sendingNew = state.sending.filter(s => {
        return !(s.dropId === dropId && s.path === randPath)
    })
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === dropId){
            const commentsNew = s.comments.map(c => {
                if(randPath.startsWith(c.id)){
                    return {
                        ...c, 
                        subComments: replaceSubCommentId(c.subComments, randPath, subComment)
                    }
                }else {
                    return c
                }
            })
            return {
                ...s,
                comments: commentsNew
            }
        }else {
            return s
        }
    })
    return {
        ...state,
        sending: sendingNew,
        streamElements: streamElementsNew
    }
}

const sendSubCommentFailed = (state, action) => {
    return {
        ...state
    }
}

const deleteCommentStart = (state, action) => {
    const { dropId, commentId } = action;
    const streamElementsNew = state.streamElements.map(s => {
        if(s.id === dropId){
            const commentsNew = s.comments.filter(c => c.id !== commentId);
            return {
                ...s,
                comments: commentsNew
            }
        } else {
            return s
        }
    })
    return {
        ...state, 
        streamElements: streamElementsNew, 
        selectedComment: null,
    }
}

const deleteCommentSuccess = (state, action) => {
    return state
}

const deleteCommentFailed = (state, action) => {
    return state
}

const setMouseOverComments = (state, action) => {
    return {
        ...state,
        mouseOverComments: action.value
    }
}

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SELECT_DROPTARGET: return selectDropTarget(state, action);
        case actionTypes.UNSELECT_DROPTARGET: return unselectDropTarget(state, action);
        case actionTypes.RESET_DROP_TARGETS: return resetDropTargets(state, action);

        case actionTypes.SCROLL_UP_START: return scrollUpStart(state, action);
        case actionTypes.SCROLL_UP_SUCCESS: return scrollUpSuccess(state, action);
        case actionTypes.SCROLL_UP_FAILED: return scrollUpFailed(state, action);

        case actionTypes.SCROLL_DOWN_START: return scrollDownStart(state, action);
        case actionTypes.SCROLL_DOWN_SUCCESS: return scrollDownSuccess(state, action);
        case actionTypes.SCROLL_DOWN_FAILED: return scrollDownFailed(state, action);

        case actionTypes.FETCH_IDS_START: return fetchIdsStart(state, action);
        case actionTypes.SET_IDS: return setIds(state, action);
        case actionTypes.FETCH_IDS_FAILED: return fetchIdsFailed(state, action);

        case actionTypes.SELECT_COMMENT: return selectComment(state, action);
        case actionTypes.UNSELECT_COMMENT: return unselectComment(state, action);
        case actionTypes.SELECT_SUBCOMMENT: return selectSubComment(state, action);
        case actionTypes.UNSELECT_SUBCOMMENT: return unselectSubComment(state);

        case actionTypes.SET_DROPS_NOT_LOADED: return setDropsNotLoaded(state, action);

        case actionTypes.FETCH_DROPS_START: return fetchDropsStart(state, action);
        case actionTypes.SET_DROPS: return setDrops(state, action);
        case actionTypes.FETCH_DROPS_FAILED: return fetchDropsFailed(state, action);

        case actionTypes.FETCH_DROP_START: return fetchDropStart(state, action);
        case actionTypes.FETCH_DROP_SUCCESS: return fetchDropSuccess(state, action);
        case actionTypes.FETCH_DROP_FAILED: return fetchDropFailed(state, action);

        case actionTypes.FETCH_MEME_SUCCESS: return fetchMemeSuccess(state, action);
        case actionTypes.FETCH_MEME_FAILED: return fetchMemeFailed(state, action);
 
        case actionTypes.SEND_COMMENT_START: return sendCommentStart(state, action);
        case actionTypes.SEND_COMMENT_SUCCESS: return sendCommentSuccess(state, action);
        case actionTypes.SEND_COMMENT_FAILED: return sendCommentFailed(state, action);

        case actionTypes.DELETE_COMMENT_START: return deleteCommentStart(state, action);
        case actionTypes.DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state, action);
        case actionTypes.DELETE_COMMENT_FAILED: return deleteCommentFailed(state, action);

        case actionTypes.SEND_SUBCOMMENT_START: return sendSubCommentStart(state, action);
        case actionTypes.SEND_SUBCOMMENT_SUCCESS: return sendSubCommentSuccess(state, action);
        case actionTypes.SEND_SUBCOMMENT_FAILED: return sendSubCommentFailed(state, action);

        case actionTypes.SET_MOUSE_OVER_COMMENTS: return setMouseOverComments(state, action);
    
        default: return state;
    }
}








export default reducer; 