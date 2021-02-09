import axios from 'axios';

import { closeDropModal, switchTab } from './UIActions';
import { sendDropStart, sendDropSuccess, sendDropFailed} from './chatActions';

import * as actionTypes from './actionTypes';

//-------- SWIPE  -----------------------------------------------------------------

export const swipe = (dir, dropId, anonymousId ) => {
    console.log('dir' , dir);
    console.log('anonymousId', anonymousId);
    return dispatch => {
        dispatch(swipeStart(dir)); 
        if(!dropId.startsWith('no more')){
            const url = `/api/drop/${dropId}/swipe`;
            const token = localStorage.getItem('token');
            const body = { like: dir === 'right', anonymousId };
            const headers = token ? { headers: { authorisation : `Bearer ${token}` } } : null;
            console.log(headers);
            axios.post(url, body, headers )
            .then(res => {
                console.log(res);
                dispatch(swipeSuccess()); 
            })
            .catch(err => {
                console.log(err);
                dispatch(swipeFailed());
            })
        }

    }
}

export const swipeStart = (dir) => {
    return {
        type: actionTypes.SWIPE_START,
        dir: dir
    }
}

export const swipeSuccess = () => {
    return {
        type: actionTypes.SWIPE_SUCCESS
    }
}

export const swipeFailed = () => {
    return {
        type: actionTypes.SWIPE_FAILED
    }
}

//-------- FETCH IDS -----------------------------------------------------------------

export const fetchIds = (token) => {
    return dispatch => {
        dispatch(fetchIdsStart())
        const headers = token ? { authorization: 'Bearer ' + token } : null
        axios.get('/api/drop/ids', headers )
        .then(res => {
            dispatch(setIds(res.data))
            dispatch(fetchDrops(res.data))
        })
        .catch(err => {
            dispatch(fetchIdsFailed())
        })
    }
}

export const fetchIdsStart = () => {
    return {
        type: actionTypes.FETCH_IDS_START
    }
}

export const setIds = (ids) => {
    return {
        type: actionTypes.SET_IDS,
        ids: ids
    }
}

export const fetchIdsFailed = () => {
    return {
        type: actionTypes.FETCH_IDS_FAILED
    }
}

//-------- FETCH DROPS -----------------------------------------------------------------

export const fetchDrops = (ids) => {
    return dispatch => {
        dispatch(fetchDropsStart())
        const headers = {};
        const body = { ids: ids }
        axios.post('/api/drop/drops', body, headers)
        .then(res => {
            dispatch(setDrops(res.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchDropsFailed())
        })
    }
}

export const fetchDropsStart  = () => {
    return {
        type: actionTypes.FETCH_DROPS_START
    }
}

export const setDrops  = (drops) => {
    return {
        type: actionTypes.SET_DROPS,
        drops
    }
}

export const fetchDropsFailed  = (drops) => {
    return {
        type: actionTypes.FETCH_DROP_FAILED
    }
}

//-------- SELECT COMMENT -------------------------------------------------------------------

export const selectComment = (commentId, path) => {
    return {
        type: actionTypes.SELECT_COMMENT,
        commentId,
        path
    }
}

export const unSelectComment = () => {
    return {
        type: actionTypes.UNSELECT_COMMENT
    }
}

export const selectSubComment = (commentId, path) => {
    return {
        type: actionTypes.SELECT_SUBCOMMENT,
        commentId,
        path
    }
}

export const unSelectSubComment = () => {
    return {
        type: actionTypes.UNSELECT_SUBCOMMENT,
    }
}
 
//-------- SEND COMMENT -----------------------------------------------------------------

export const sendComment = ( dropId, comment ) => {
    return dispatch => {
        dispatch(sendCommentStart(dropId, comment))
        const token = localStorage.getItem('token');
        const headers = { headers: { authorization : `Bearer ${token}` } }
        const url = `/api/drop/${dropId}/comment`;
        const body = { comment: comment.comment };
        axios.post(url, body, headers)
        .then(res => {
            dispatch(sendCommentSuccess(dropId, comment.id, res.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(sendCommentFailed(dropId, err))
        })
    }
}

export const sendCommentStart = (dropId, comment) => {
    return {
        type: actionTypes.SEND_COMMENT_START,
        dropId,
        comment
    }
}

export const sendCommentSuccess = (dropId, randId, comment) => {
    return {
        type: actionTypes.SEND_COMMENT_SUCCESS,
        dropId, 
        randId,
        comment
    }
}

export const sendCommentFailed = (dropId, err) => {
    return {
        type: actionTypes.SEND_COMMENT_FAILED,
        dropId, 
        err
    }
}   

//-------- SEND SUBCOMMENT -----------------------------------------------------------------


export const sendSubComment = ( dropId, subComment, token ) => {
    return dispatch => {
        const commentId = subComment.parentPath.split('/')[0];
        const randPath = subComment.parentPath + '/' + subComment.id;
        dispatch(sendSubCommentStart(dropId, subComment));
        const url = `/api/comment/${commentId}/sub`;
        const headers = { headers: { authorization: `Bearer ${token}` } };
        const body = { 
            actualComment: subComment.comment,
            parentPath: subComment.parentPath
        };
        axios.post(url, body, headers)
        .then(res => {
            dispatch(sendSubCommentSuccess(dropId, randPath, res.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(sendSubCommentFailed(dropId, err))
        })
    }
}

export const sendSubCommentStart = (dropId, subComment) => {
    return {
        type: actionTypes.SEND_SUBCOMMENT_START,
        dropId,
        subComment
    }
}

export const sendSubCommentSuccess = (dropId, randPath, subComment) => {
    return {
        type: actionTypes.SEND_SUBCOMMENT_SUCCESS,
        dropId,
        randPath, 
        subComment
    }
}

export const sendSubCommentFailed = (dropId, err) => {
    return {
        type: actionTypes.SEND_SUBCOMMENT_FAILED,
        dropId, 
        err
    }
}   

//---------------------------------------------------------------------------------------

export const setDropsNotLoaded = () => {
    return {
        type: actionTypes.SET_DROPS_NOT_LOADED
    }
}

//-------- DELETE COMMENT -------------------------------------------------------------------

export const deleteComment = (dropId, commentId, path, token ) => {
    return dispatch => {
        dispatch(deleteCommentStart(dropId, commentId, path))
        const url = path ? `/comment/${commentId}` : null
        const headers = token ? { authorization: 'Bearer ' + token } : null;
        const body = path ? { path } : null;
        axios.delete(url, headers, body)
        .then(() => {
            dispatch(deleteCommentSuccess())
        })
        .catch(err => {
            dispatch(deleteCommentFailed())
        });
    }
}

export const deleteCommentStart = (dropId, commentId, path) => {
    return {
        type: actionTypes.DELETE_COMMENT_START,
        dropId,
        commentId,
        path
    }
}

export const deleteCommentSuccess = (dropId, commentId, path) => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS,
        dropId,
        commentId,
        path
    }
}

export const deleteCommentFailed = () => {
    return {
        type: actionTypes.DELETE_COMMENT_FAILED
    }
}


// -------- FETCH DROP ----------------------------------------------------------

export const fetchDrop = (dropId, token) => {
    return dispatch => {
        dispatch(fetchDropStart(dropId))
        if(dropId.startsWith('no')){
            dispatch(fetchDropSuccess(dropId, { dropId, title: "", creatorId: "5fe08af76cece946855c16c9", comments: []}))
        }else{
            const url = dropId.startsWith('no more') ? 'apidrop/nomore' : `/api/drop/${dropId}`;
            const headers = token ? { headers: { authorization: `Bearer ${token}` } } : null 
            axios.get(url, headers)
            .then(res => {
                dispatch(fetchDropSuccess(dropId, res.data))
            }).catch(err => {
                dispatch(fetchDropFailed(dropId))
            })
        }

    }
}

export const fetchDropStart = (dropId) => {
    return {
        type: actionTypes.FETCH_DROP_START,
        dropId
    }
}

export const fetchDropSuccess = (dropId, drop) => {
    return {
        type: actionTypes.FETCH_DROP_SUCCESS,
        dropId, 
        drop
    }
}

export const fetchDropFailed = (dropId) => {
    return {
        type: actionTypes.FETCH_DROP_FAILED, 
        dropId
    }
}

//-------- FETCH MEME -----------------------------------------------------------------


export const fetchMemeStart = (dropId) => {
    return {
        type: actionTypes.FETCH_MEME_START,
        dropId
    }
}

export const fetchMemeSuccess = (dropId) => {
    return {
        type: actionTypes.FETCH_MEME_SUCCESS,
        dropId, 
    }
}

//--------- SELECT DROP TARGET -------------------------------------------------------


export const selectDropTarget = (chatId) => {
    return {
        type: actionTypes.SELECT_DROPTARGET,
        chatId
    }
}

export const unSelectDropTarget = (chatId) => {
    return {
        type: actionTypes.UNSELECT_DROPTARGET,
        chatId
    }
}

//--------- SEND DROP ----------------------------------------------------------------

export const sendDrop = (targets, dropId, title, userId) => {
    return dispatch => {
        const randId = `${Date.now()}`;
        const message = {
            id: randId, 
            type: 'drop',
            sender: userId,
            sentTime: Date.now(),  
            liked: [],
            title,
            dropId
        }   
        dispatch(closeDropModal());
        dispatch(switchTab('chat'));
        dispatch(resetDropTargets());
        dispatch(sendDropStart(targets, message)); 
        const url = `/api/chat/dropMessage`;
        const token = localStorage.getItem('token');
        const headers = { headers: { authorization : `Bearer ${token}` } };
        const body = { 
            chatIds: targets,
            dropId
        };
        axios.post(url, body, headers)
        .then(res => {
            console.log(res.data);
            dispatch(sendDropSuccess(res.data.messageReplacements, res.data.chatReplacements, randId));
        }).catch(err => {
            console.log(err);
            dispatch(sendDropFailed());
        })
    }
}

export const resetDropTargets = () => {
    return {
        type: actionTypes.RESET_DROP_TARGETS, 
    }
}