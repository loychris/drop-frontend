import React, { Component } from 'react';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';

const commentContent = [
    {
        author: "Chris",
        points: 99999999,
        comment: "Comment 1 gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn jbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn jbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: [
            {
                author: "Chris 2",
                points: 12,
                comment: "SubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "SubSubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                        subComments: [],
                    },
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "SubSubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                        subComments: [],
                    }
                ],
            },
            {
                author: "Chris 2",
                points: 12,
                comment: "SubComment 2 iewfipwe wio ngfiweon fowfn weonwo ef ",
                subComments: [],
            }
        ]
    },
    {
        author: "Chris",
        points: 99999999,
        comment: "Comment 1 gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn jbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn jbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: [
            {
                author: "Chris 2",
                points: 12,
                comment: "SubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "SubSubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                        subComments: [],
                    },
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "SubSubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                        subComments: [],
                    }
                ],
            },
            {
                author: "Chris 2",
                points: 12,
                comment: "SubComment 2 iewfipwe wio ngfiweon fowfn weonwo ef ",
                subComments: [],
            }
        ]
    },
    {
        author: "Chris",
        points: 99999999,
        comment: "Comment 1 gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn jbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn jbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: [
            {
                author: "Chris 2",
                points: 12,
                comment: "SubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "SubSubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                        subComments: [],
                    },
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "SubSubComment 1 iewfipwe wio ngfiweon fowfn weonwo ef ",
                        subComments: [],
                    }
                ],
            },
            {
                author: "Chris 2",
                points: 12,
                comment: "SubComment 2 iewfipwe wio ngfiweon fowfn weonwo ef ",
                subComments: [],
            }
        ]
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

        return(
            <div className={classes.CommentSection}>
                <button>write Comment</button>
                {comments}
            </div>
        )
    }

}

export default CommentSection;