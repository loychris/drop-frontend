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


const addSubComment = (parentPath, subComments, comment) => {
    return subComments.map(s => {
        if(s.path === parentPath){ console.log(`FOUND PARENT ${s.path}, INSERTING SUBCOMMENT`); return { ...s, subComments: [...s.subComments, comment] } }
        else if(parentPath.startsWith(s.path)){ return {...s, subComments: addSubComment(parentPath, s.subComments, comment) } }
        else { return s }
    })
}

const replaceId = () => {}



const reducer = (state = initialState, action ) => {
    let StreamElementsNew = [];
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
            if(state.selectedComment.split('/')[0]){
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

        case actionTypes.SET_IDS: 
            let { ids } = action;
            StreamElementsNew = state.StreamElements.map((s, i) => {
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

        case actionTypes.FETCH_IDS_FAILED: 
            return {
                ...state,
                initialStreamLoad: 'Fetch ids failed'
            }

        case actionTypes.SELECT_COMMENT: 
            const { commentId } = action;
            return {
                ...state,
                selectedComment: commentId
            }
        

        case actionTypes.UNSELECT_COMMENT: 
            return {
                ...state,
                selectedComment: null

            }

        case actionTypes.SELECT_SUBCOMMENT:   
            return {
                ...state,
                selectedComment: action.path

            }
        
            case actionTypes.UNSELECT_SUBCOMMENT: 
            return {
                ...state,
                selectedComment: null
            }
        

        case actionTypes.SET_DROP: 
            StreamElementsNew = state.StreamElements.map(s => {
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
            StreamElementsNew = state.StreamElements.map(s => {
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
                StreamElements: StreamElementsNew
            }

        case actionTypes.COMMENT_SAVED: 
            console.log('COMMENT SAVED')
            StreamElementsNew = state.StreamElements.map(s => {
                // if(s.position === 1){
                //     return {
                //         ...s,
                //         comments:  [...s.comments, action.comment]
                //     }
                // }
                // else {
                    return s
                //}
            })
            console.log('SENDING ', state.sending)
            console.log('RAND ID ', action.randPath)
            console.log('sending ', state.sending.filter(id => id !== action.randPath ))
            return {
                ...state,
                StreamElements: StreamElementsNew,
                sending: state.sending.filter(path => path !== action.randPath )
            }


        case actionTypes.ADD_SUBCOMMENT: 
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
            StreamElementsNew = state.StreamElements.map(s => {
                if(s.position === 1){
                    const comments = s.comments.map(c => {
                        if(state.selectedComment.split('/')[0] === c.id){
                            if(state.selectedComment.split('/').length > 1){
                                return {...c, subComments: addSubComment(state.selectedComment, c.subComments, newSubComment)}
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


            case actionTypes.ADD_COMMENT:

                console.log(`Adding Comment`)
                const newComment = {
                    id: action.randId,
                    author: 'user',
                    points: 0,
                    comment: action.comment,
                    subComments: [],
                }
                StreamElementsNew = state.StreamElements.map(s => {
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
        default: return state;
    }
}

export default reducer; 