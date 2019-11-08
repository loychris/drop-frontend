import React, { Component } from 'react';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';


class CommentSection extends Component {

    state = {
        comments: [
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 1",
                path: '0',
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "---------------- 1.1",
                        path: '0/0',
                        subComments: [
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 1.1.1",
                                path: '0/0/0',
                                subComments: [],
                            },
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 1.1.2",
                                path: '0/0/1',
                                subComments: [
                                    {
                                        author: "Chris 2",
                                        points: 12,
                                        comment: "---------------- 1.1.2.1",
                                        path: '0/0/1/0',
                                        subComments: [
                                            {
                                                author: "Cejbfqnkönwklqdhris 2",
                                                points: 12,
                                                comment: "---------------- 1.1.2.1.1",
                                                path: '0/0/1/0/0',
                                                subComments: [],
                                            },
                                            {
                                                author: "Chris 2",
                                                points: 12,
                                                comment: "---------------- 1.1.2.1.2",
                                                path: '0/0/1/0/1',
                                                subComments: [],
                                            },
                                        ],
                                    },
                                ]
                            },
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 1.1.1",
                                path: '0/0/2',
                                subComments: [],
                            },
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 1.1.1",
                                path: '0/0/3',
                                subComments: [],
                            },
        
                        ],
                    },
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "---------------- 1.2",
                        path: '0/1',
                        subComments: [
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 1.2.1",
                                path: '0/1/0',
                                subComments: [],
                            },
                        ],
                    }
                ]
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 2",
                path: '1',
                subComments: []
            },
             
        ]
    }


    getCommentfromRoute = (path) => {
        const pathArray = path.split('/').map(x => parseInt(x)); 
        let current = this.state.comments[pathArray[0]];        
        for(let i=1;i<pathArray.length;i++){        
            current = current.subComments[pathArray[i]];       
        }
        return current;
    }

    addSubComment(parentPath, content) {
        let currentComments = {
            ...this.state.comments
        }
        const pathArray = parentPath.split('/').map(x => parseInt(x)); 
        let current = currentComments[pathArray[0]];        
        for(let i=1;i<pathArray.length-1;i++){        
            current = current.subComments[pathArray[i]];       
        }
        const parent = current;
        current = current.subComments[pathArray[pathArray.length-1]]
        current.subComments.push(
            <Comment 
                depth = {pathArray.length-1}
                key = {`${parentPath}/${parent.subComments.length}`}
                path = {`${parentPath}/${parent.subComments.length}`}
                points = { 0 }
                actualComment = { content }
                subComments = { [] }
                addSubComment = { this.addSubComment }
            />
        )
        this.setState({comments: currentComments});
    }

    render(){
        let comments = [];
        for(let i=0;i<this.state.comments.length; i++){
            comments.push(
                <Comment
                    depth = {'0'}
                    key = {`CommentNo${i}`}
                    author = { this.state.comments[i].author }
                    points = { this.state.comments[i].points }
                    actualComment = { this.state.comments[i].comment }
                    subComments = { this.state.comments[i].subComments }
                    addSubComment = { this.addSubComment }
                />
            )
        }

        if(this.props.showComments === 'false') comments = [];

        return(
            <div className={classes.CommentSection}>
                <button>write Comment</button>
                {comments}
            </div>
        )
    }

}

export default CommentSection;