import axios from 'axios';

import * as actionTypes from './actionTypes';

export const swipe = (dir) => {
    return {
        type: actionTypes.SWIPE,
        dir: dir
    }
}

export const selectDropTarget = (id) => {
    return {
        type: actionTypes.SELECT_DROPTARGET,
        id: id
    }
}

export const unSelectDropTarget = (id) => {
    return {
        type: actionTypes.UNSELECT_DROPTARGET,
        id: id
    }
}

//-------- ADD COMMENT -------------------------------------------------------------------

export const addComment = (comment, randId, userId) => {
    return {
        type: actionTypes.ADD_COMMENT,
        comment,
        randId,
        userId
    }
}

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

//-------- FETCH IDS  -----------------------------------------------------------------

export const fetchIds = (token) => {
    return dispatch => {
        dispatch(fetchIdsStart())
        const headers = token ? { authorisation: 'Bearer ' + token } : null
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



export const memeLoaded = (dropId) => {
    return {
        type: actionTypes.MEME_LOADED,
        dropId
    }
}

export const postCommentFailed = () => {
    return {
        type: actionTypes.POST_COMMENT_FAILED
    }
}

export const commentSaved = (dropId, comment, path, randId) => {
    return {
        type: actionTypes.COMMENT_SAVED,
        dropId, comment, path, randId
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

export const addSubComment = (comment, randId) => {
    return {
        type: actionTypes.ADD_SUBCOMMENT,
        comment,
        randId
    }
}

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
        const headers = token ? { authorisation: 'Bearer ' + token } : null;
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

// -------- FETCH DROP ----------------------------------------------------------

export const fetchDrop = (dropId) => {
    return dispatch => {
        dispatch(fetchDropStart(dropId))
        const url = `/api/drop/${dropId}`;
        axios.get(url)
        .then(res => {
            dispatch(fetchDropSuccess(dropId, res.data))
        }).catch(err => {
            console.log(err);
            dispatch(fetchDropFailed(dropId))
        })
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