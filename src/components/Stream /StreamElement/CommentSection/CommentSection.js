import React, { Component } from 'react';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';


class CommentSection extends Component {

    state = {
        comments: [
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 0",
                path: '0',
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "---------------- 0/0",
                        path: '0/0',
                        subComments: [
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 0/0/0",
                                path: '0/0/0',
                                subComments: [],
                            },
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 0/0/1",
                                path: '0/0/1',
                                subComments: [
                                    {
                                        author: "Chris 2",
                                        points: 12,
                                        comment: "---------------- 0/0/1/0",
                                        path: '0/0/1/0',
                                        subComments: [
                                            {
                                                author: "Cejbfqnkönwklqdhris 2",
                                                points: 12,
                                                comment: "---------------- 0/0/1/0/0",
                                                path: '0/0/1/0/0',
                                                subComments: [],
                                            },
                                            {
                                                author: "Chris 2",
                                                points: 12,
                                                comment: "---------------- 0/0/1/0/1",
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
                                comment: "---------------- 0/0/2",
                                path: '0/0/2',
                                subComments: [],
                            },
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 0/0/3",
                                path: '0/0/3',
                                subComments: [],
                            },
        
                        ],
                    },
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: "---------------- 0/1",
                        path: '0/1',
                        subComments: [
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "---------------- 0/1/0",
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
                comment: "---------------- 1",
                path: '1',
                subComments: []
            },
             
        ]
    }

    addCommentToTree = (content) => {
        let newComments = this.state.comments;
        newComments.push({
            author: 'chris',
            points: 0,
            comment: content,
            path: `${newComments.length}`,
            subComments: []
        });
        this.setState({comments: newComments});
    }


    getCommentfromRoute = (path) => {
        const pathArray = path.split('/').map(x => parseInt(x)); 
        let current = this.state.comments[pathArray[0]];        
        for(let i=1;i<pathArray.length;i++){        
            current = current.subComments[pathArray[i]];       
        }
        return current;
    }

    addSubCommentToTree = (parentPath, content) => {
        console.log('foweihfjpwefjpqwejfowpjfoe', parentPath);
        let comments = this.state.comments;
        const parentPathArray = parentPath.split('/').map(x => parseInt(x));
        let current = comments[parentPathArray[0]];
        if(parentPathArray.length>0){
            for(let i=1;i<parentPathArray.length;i++){
                current = current.subComments[parentPathArray[i]];

            }
        }
        current.subComments.push({
            author: 'chris',
            points: 0,
            comment: content,
            path: `${parentPath}/${current.subComments.length}`,
            subComments: []
        })
        this.setState({comments});
    }

    render(){
        let comments = [];
        for(let i=0;i<this.state.comments.length; i++){
            comments.push(
                <Comment
                    depth = {'0'}
                    key = {`${i}`}
                    path = { `${i}`}
                    author = { this.state.comments[i].author }
                    points = { this.state.comments[i].points }
                    actualComment = { this.state.comments[i].comment }
                    subComments = { this.state.comments[i].subComments }
                    addSubComment = { this.addSubCommentToTree }
                />
            )
        }

        if(this.props.showComments === 'false') comments = [];
        return(
            <div className={classes.CommentSection}>
                <button onClick={() => this.addCommentToTree('abc')}>Add Comment</button>
                {comments}
            </div>
        )
    }

}

export default CommentSection;