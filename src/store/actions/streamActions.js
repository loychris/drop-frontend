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

export const selectComment = (id) => {
    return {
        type: actionTypes.SELECT_COMMENT,
        id: id
    }
}

export const unSelectComment = (id) => {
    return {
        type: actionTypes.UNSELECT_COMMENT,
        id: id
    }
}

export const initStream = () => {
    return dispatch => {
        axios.get('/api/drop')
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
}