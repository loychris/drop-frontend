import * as actionTypes from '../actionTypes';

const initialState = {
    dropTargets: [
        {
          selected: false,
          type: 'group',
          name: 'Chris Loy',
          id: 1
        }
    ],
    selectedTargets: [
        
    ],
    StreamElements: [
        { position: 0, show: "left", id: "0", status: 'loading', commentsStatus: 'loading', comments: []},
        { 
            position: 1, 
            show: "show", 
            id: "1" , 
            status: 'loaded', 
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
                subComments: [{
                    author: "Chris Loy",
                    points: 100,
                    comment: "subcomment",
                    subComments: [{
                        author: "Chris Loy",
                        points: 100,
                        comment: "subcomment",
                        subComments: []
                    },{
                        author: "Chris Loy",
                        points: 100,
                        comment: "subcomment2",
                        subComments: []
                    }]
                },{
                    author: "Chris Loy",
                    points: 100,
                    comment: "subcomment",
                    subComments: []
                }]
            },{
                commentId: 12345678,
                author: 'user',
                points: 0,
                comment: "comment",
                subComments: [{
                    author: "Chris Loy",
                    points: 100,
                    comment: "subcomment",
                    subComments: [{
                        author: "Chris Loy",
                        points: 100,
                        comment: "subcomment",
                        subComments: []
                    },{
                        author: "Chris Loy",
                        points: 100,
                        comment: "subcomment2",
                        subComments: []
                    }]
                },{
                    author: "Chris Loy",
                    points: 100,
                    comment: "subcomment",
                    subComments: []
                }]
            },{
                commentId: 3543,
                author: 'user',
                points: 0,
                comment: "comment",
                subComments: []
            },{
                commentId: 23524,
                author: 'user',
                points: 0,
                comment: "comment",
                subComments: []
            },{
                commentId: 5342,
                author: 'user',
                points: 0,
                comment: "comment",
                subComments: []
            }]
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
    initialPageLoad: true,
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
        case actionTypes.ADD_COMMENT:
            const newComment = {
                commentId: 12345678,
                author: 'user',
                points: 0,
                comment: action.comment,
                subComments: []
            }
            console.log(`Add Comment ${action.comment} ${action.id}`)
        default: return state;
    }
}

export default reducer; 