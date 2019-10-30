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
                comment: "iewfipwe wio ngfiweon fowfn weonwo ef ",
                subComments: [],
            }
        ]
    },
    {
        author: "Chris",
        points: 999,
        comment: "Comment 2 nwkegjlrwlg wlkenwl kefwle kfnwlek nwelkgok wengokwengow nweokgn woe kfn",
        subComments: []
    },
    {
        author: "Chris",
        points: 200,
        comment: "Comment 3 gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: [
            {
                author: "Chris",
                points: 200,
                comment: "Subcomment 1 gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
                subComments: []
            },
            {
                author: "Chris",
                points: 200,
                comment: "Subcomment 2 gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
                subComments: []
            },
        ]
    },
    {
        author: "Chris",
        points: 200,
        comment: "Comment 4 gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: []
    },
    {
        author: "Chris",
        points: 200,
        comment: "Comment 5 gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: []
    },
]


class CommentSection extends Component {



    render(){
        let comments = [];
        for(let i=0;i<commentContent.length; i++){
            comments.push(
                <Comment
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
                <form>
                    <imput type='text'></imput>
                    <input type='submit'></input>
                </form>
                {comments}
            </div>
        )
    }

}

export default CommentSection;