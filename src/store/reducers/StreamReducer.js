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
    currentDropId: "1",
    selectedComment: null,
    sending: [],
}


const insertSubComment = (parentPath, subComments, comment) => {
    return subComments.map(s => {
        if(s.path === parentPath) return { ...s, subComments: [...s.subComments, comment] } 
        if(parentPath.startsWith(s.path)) return {...s, subComments: insertSubComment(parentPath, s.subComments, comment) }
        else return s 
    })
}

const replaceSubCommentId = (subComments, randPath, comment) => {
    return subComments.map(s => {
        if(s.path === randPath){ return { ...s, path: comment.path} }
        else{ return {...s, subComments: replaceSubCommentId(s.subComments, randPath, comment)}}
    })
}



const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 10);
    }
  };

const selectDropTarget = (state, action) => {
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
}

const unselectDropTarget = (state, action) => {
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
}

const swipe = (state, action) => {
    const timestamp  = Date.now();
    scrollToTop();
    let StreamElementsNew;
    if(state.selectedComment){
        StreamElementsNew = state.StreamElements.map(s => {
            if(s.position === 1){
                return {
                    ...s,
                    comments: s.comments.map(c => {
                        return { ...c, selected: false }
                    })
                }
            }else { return s }
        })
        return {
            ...state,
            StreamElements: StreamElementsNew,
            selectedComment: null

        }
    }else{
        let ids = state.ids;
        StreamElementsNew = state.StreamElements.map(s => {
            return {
                ...s, 
                position: s.position - 1,
                show: s.position-1 === 0 ? action.dir : 'show'
            }
        })
        .filter(s => {
            return s.position >= 0
        })
        StreamElementsNew.push({
            position: 20,
            show: 'show',
            id: ids.pop(),
            status: 'id loaded',
            commentsStatus: 'not loaded',
            comments: []
        })
        return {
            ...state,
            StreamElements: StreamElementsNew,
            timeStampLastSwipe: timestamp,
            currentDropId: StreamElementsNew[1].id,
            ids
        }
    }
}

const setIds = (state, action) => {
    let { ids } = action;
    const StreamElementsNew = state.StreamElements.map((s, i) => {
        const memeStatus = s.position === 1 ? 'loading' : 'not loaded'
        if(s.position > ids.length-1){
            return {...s, id: 'no more' + Math.random(), status: 'no more', memeStatus} 
        }else {
            return { ...s, id: ids.pop(), status:'id loaded', memeStatus}
        }
    })
    return {
        ...state,
        ids,
        StreamElements: StreamElementsNew
    }
}

const fetchIdsFailed = (state, action) => {
    return { ...state, initialStreamLoad: 'Fetch ids failed' }
}

const selectComment = (state, action) => {
    return { ...state, selectedComment: action.commentId }
}

const unselectComment = (state, acitpon) => {
    return { ...state, selectedComment: null }
}

const selectSubComment = (state, action) => {
    return { ...state, selectedComment: action.path }
}

const unselectSubComment = (state) => {
    return { ...state, selectedComment: null }
}

const setDrop = (state, action) => {
    const StreamElementsNew = state.StreamElements.map(s => {
        if(s.id === action.dropId){
            return {
                ...s,
                ...action.drop,
                comments: action.drop.comments.map(c => {return {...c, path:'0'}}),
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
        currentDropId: StreamElementsNew[1].id,
        StreamElements: StreamElementsNew
    }
}

const memeLoaded = (state, action) => {
    let currentPosition;
    const StreamElementsNew = state.StreamElements.map(s => {
        if(s.id === action.dropId){
            currentPosition = s.position
            return {
                ...s,
                memeStatus: 'loaded'
            }
        }
        else if(s.position === currentPosition+1){
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
        StreamElements: StreamElementsNew
    }
}

const commentSaved = (state, action) => {
    const { dropId, comment, path, randId } = action
    console.log(comment)
    const randPath = path ? `${path}/${randId}` : randId
    //replace all paths that contain randId with real path from Server
    const sendingNew = state.sending.filter(p => {
        return !(p.includes(randId))
    })
    const StreamElementsNew = state.StreamElements.map(s => {
        if(s.id !== dropId){
            return s
        } else {
            return {
                ...s,
                comments: s.comments.map(c => {
                    if(randPath.startsWith(c.id)){
                        if(path){
                            return {
                                ...c,
                                subComments: replaceSubCommentId(c.subComments, randPath, comment)
                            }
                        } else {
                            return {...c, id: comment.id}
                        }
                    }else {
                        return c
                    }

                })
            }
        }
    })
    return {
        ...state,
        StreamElements: StreamElementsNew,
        sending: sendingNew
    }
}


const addSubComment = (state, action) => {
    const randId = action.randId;
    const newPath = `${state.selectedComment}/${randId}`;
    const sending = [...state.sending, newPath];
    const newSubComment = {
        id: action.randID,
        author: "5f5538d269ae656e859629be",
        path: newPath,
        points: 0,
        comment: action.comment,
        subComments: [],
    }
    const StreamElementsNew = state.StreamElements.map(s => {
        if(s.position === 1){
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
        StreamElements: StreamElementsNew,
        selectedComment: null,
        sending 
    }
}

const addComment = (state, action) => {
    console.log(`Adding Comment`)
    const newComment = {
        id: action.randId,
        author: action.userId,
        points: 0,
        comment: action.comment,
        subComments: [],
    }
    const StreamElementsNew = state.StreamElements.map(s => {
        if(s.position === 1){
            const commentsNew = [newComment, ...s.comments]
            console.log(s.comments.length, commentsNew.length)
            return {
                ...s,
                comments: commentsNew
            }
        }else { return s }
    })
    return {
        ...state,
        StreamElements: StreamElementsNew,
        sending: [...state.sending, action.randId]
    }
}

const setDropsNotLoaded = (state, action) => {
    const StreamElementsNew = state.StreamElements.map(s => {
        return {...s, status: 'id loaded', commentsStatus: 'not loaded'}
    })
    return {
        ...state, 
        StreamElements: StreamElementsNew
    }
}

const reducer = (state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SELECT_DROPTARGET: return selectDropTarget(state, action);
        case actionTypes.UNSELECT_DROPTARGET: return unselectDropTarget(state, action);
        case actionTypes.SWIPE: return swipe(state, action);
        case actionTypes.SET_IDS: return setIds(state, action);
        case actionTypes.FETCH_IDS_FAILED: return fetchIdsFailed(state, action);
        case actionTypes.SELECT_COMMENT: return selectComment(state, action);
        case actionTypes.UNSELECT_COMMENT: return unselectComment(state, action);
        case actionTypes.SELECT_SUBCOMMENT: return selectSubComment(state, action);
        case actionTypes.UNSELECT_SUBCOMMENT: return unselectSubComment(state);
        case actionTypes.SET_DROP: return setDrop(state, action);
        case actionTypes.MEME_LOADED: return memeLoaded(state, action); 
        case actionTypes.COMMENT_SAVED: return commentSaved(state, action);
        case actionTypes.ADD_SUBCOMMENT: return addSubComment(state, action);
        case actionTypes.ADD_COMMENT: return addComment(state, action);
        case actionTypes.SET_DROPS_NOT_LOADED: return setDropsNotLoaded(state, action)
        default: return state;
    }
}

export default reducer; 