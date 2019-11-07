import React, { Component } from 'react';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';

const commentContent = [
    {
        author: "Chris",
        points: 99999999,
        comment: "---------------- 1",
        subComments: [
            {
                author: "Chris 2",
                points: 12,
                comment: "---------------- 1.1",
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "---------------- 1.1.1",
                        subComments: [],
                    },
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "---------------- 1.1.2",
                        subComments: [
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 1.1.2.1",
                                subComments: [
                                    {
                                        author: "Chris 2",
                                        points: 12,
                                        comment: "---------------- 1.1.2.1.1",
                                        subComments: [],
                                    },
                                    {
                                        author: "Chris 2",
                                        points: 12,
                                        comment: "---------------- 1.1.2.1.2",
                                        subComments: [],
                                    },
                                ],
                            },
                        ]
                    },

                ],
            },
            {
                author: "Chris 2",
                points: 12,
                comment: "---------------- 1.2",
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "---------------- 1.2.1",
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
        subComments: []
    },
     
]


class CommentSection extends Component {


    render(){
        let comments = [];
        for(let i=0;i<commentContent.length; i++){
            comments.push(
                <Comment
                    depth = {'0'}
                    key = {`CommentNo${i}`}
                    author = { commentContent[i].author }
                    points = { commentContent[i].points }
                    actualComment = { commentContent[i].comment }
                    subComments = { commentContent[i].subComments }
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