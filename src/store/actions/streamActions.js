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

export const addComment = (comment, id) => {
    return {
        type: actionTypes.ADD_COMMENT,
        comment: comment,
        id: id
    }
}

export const deleteComment = (id) => {
    return {
        type: actionTypes.DELETE_COMMENT,
        id: id
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

export const fetchIds = () => {
    return dispatch => {
        axios.get('/api/drop/ids')
        .then(res => {
            dispatch(setIds(res.data))
        })
        .catch(err => {
            dispatch(fetchIdsFailed())
        })
    }
}

export const setComments = (dropId, comments) => {
    return {
        type: actionTypes.SET_COMMENTS,
        dropId,
        comments
    }
}

export const fetchCommentsFailed = () => {
    return {
        type: actionTypes.FETCH_COMMENTS_FAILED
    }
}

export const fetchComments = (dropId) => {
    return dispatch => {
        axios.get(`/api/drop/${dropId}/comment`)
        .then(res => {
            if(res.data.comments.length > 0){
                console.log(dropId);
                console.log(res.data);
            }
            dispatch(setComments(dropId, res.data.comments));
        })
        .catch(err => {
            dispatch(fetchCommentsFailed())
        })
    }
}

export const setDrop = (dropId, drop) => {
    return {
        type: actionTypes.SET_DROP,
        dropId,
        drop
    }
}

