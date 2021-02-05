import * as actionTypes from '../actions/actionTypes';


const initialState = {
    dropTargets: [],
    selectedTargets: [],
    dropIds: [],
    currentIds: [],
    streamStatus: 'nothing loaded',
    streamElements: [
        { position: 0, show: "left", id: "0", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
        { position: 1, show: "show", id: "1", dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'},
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
    timeStampLastSwipe: 0,
    currentlyLoadingMemeId: '', 
    selectedComment: null,
    sending: [],
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
        return {...s, show: i === 0 ? 'left' : 'show', id: `${i}`, status: 'not loaded', dropStatus: 'not loaded', comments: [], memeStatus: 'not loaded'}
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
        if(s.position === 0){
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
        currentIds: action.ids.slice(0,21),
        currentlyLoadingMemeId: streamElementsNew[1].id,
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
            return { position: 0, show: "left", id: "0", dropStatus: 'loaded', comments: [], memeStatus: 'loading'}
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

// ----- SWIPE -----------------------------------------------------------------------

const swipe = (state, action) => {
    const timestamp  = Date.now();
    scrollToTop();
    if(state.selectedComment){
        return {
            ...state,
            selectedComment: null
        }
    }else{
        let [nextId, ...idsNew] = state.dropIds;
        if(!nextId){ nextId = 'no more' + Math.random() }

        let currentIdsNew = state.currentIds.filter(id => state.streamElements[1].id === id);
        currentIdsNew.push(nextId);

        let streamElementsNew = state.streamElements.map(s => {
            return {
                ...s, 
                position: s.position - 1,
                show: s.position-1 === 0 ? action.dir : 'show'
            }
        })
        .filter(s => {
            return s.position >= 0
        })
        streamElementsNew.push({
            position: 21,
            show: 'show',
            id: nextId,
            status: 'id loaded',
            dropStatus: 'not loaded',
            comments: []
        })
        return {
            ...state,
            streamElements: streamElementsNew,
            timeStampLastSwipe: timestamp,
            dropIds: idsNew, 
            currentIds: currentIdsNew,
            dropTargets: [],
        }
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

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SELECT_DROPTARGET: return selectDropTarget(state, action);
        case actionTypes.UNSELECT_DROPTARGET: return unselectDropTarget(state, action);
        case actionTypes.RESET_DROP_TARGETS: return resetDropTargets(state, action);

        case actionTypes.SWIPE: return swipe(state, action);

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

        case actionTypes.SEND_SUBCOMMENT_START: return sendSubCommentStart(state, action);
        case actionTypes.SEND_SUBCOMMENT_SUCCESS: return sendSubCommentSuccess(state, action);
        case actionTypes.SEND_SUBCOMMENT_FAILED: return sendSubCommentFailed(state, action);
    
        default: return state;
    }
}








export default reducer; 