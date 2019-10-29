import React, { Component } from 'react';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';

const commentContent = [
    {
        author: "Chris",
        points: 2443334,
        comment: "gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn jbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
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
        points: 2120,
        comment: "gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: []
    },
    {
        author: "Chris",
        points: 200,
        comment: "gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: [
            {
                author: "Chris",
                points: 200,
                comment: "gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
                subComments: []
            },
            {
                author: "Chris",
                points: 200,
                comment: "gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
                subComments: []
            },
        ]
    },
    {
        author: "Chris",
        points: 200,
        comment: "gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: []
    },
    {
        author: "Chris",
        points: 200,
        comment: "gjbrwognwpeg nwkegok wengokwengow nweokgn woe kfn",
        subComments: []
    },
]


class CommentSection extends Component {



    render(){
        let comments = [];
        commentContent.forEach( content => {
            comments.push(
                <Comment
                    author = { content.author }
                    points = { content.points }
                    actualComment = { content.comment }
                    subComments = { content.subComments }
                />
            )
        })
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