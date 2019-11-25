import React, { Component } from 'react';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';


class CommentSection extends Component {

    state = {
        CommentsShown: 10,
        comments: [
            {
                author: "Chris",
                points: 99999999,
                comment: "That's what your Mom saied last night", //105
                path: '0',
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        path: '0/0',
                        comment: 'No u',
                        subComments: [
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: 'No u',
                                path: '0/0/0',
                                subComments: [
                                    {
                                        author: "Chris 2",
                                        points: 12,
                                        comment: 'No u',
                                        path: '0/0/0',
                                        subComments: [],
                                    },
                                ],
                            },  
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: 'No u',
                                path: '0/0/0',
                                subComments: [],
                            },      
                        ],
                    },
                    {
                        author: "Chris 2",
                        points: 12,
                        comment: 'No u',
                        path: '0/0/0',
                        subComments: [],
                    },
                ]
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '1',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", //105
                path: '2',
                subComments: [
                    {
                        author: "Chris 2",
                        points: 12,
                        path: '0/0',
                        comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt",
                        subComments: [
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt",
                                path: '0/0/0',
                                subComments: [],
                            },
                            {
                                author: "Chris 2",
                                points: 12,
                                comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ",
                                path: '0/0/1/0/1',
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
                comment: "---------------- 5",
                path: '3',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '4',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '5',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '6',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '7',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '8',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '9',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '10',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '11',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '12',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '13',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '14',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '15',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '16',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '17',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '18',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '19',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '20',
                subComments: []
            },
            {
                author: "Chris",
                points: 99999999,
                comment: "---------------- 5",
                path: '15',
                subComments: []
            }  
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

    deleteSubCommentFromTree = (path) => {
        const pathArray = path.split('/');
        let currentComments = this.state.comments;
        let current = currentComments[pathArray[0]];
        if(pathArray.length>1){
            for(let i=1;i<pathArray.length-1;i++){
                current = current.subComments[pathArray[i]];
            }
            const last = pathArray.pop();
            current.subComments.splice(last, 1);
            this.setState({currentComments});
        } else {
            currentComments.splice(pathArray[0],1);
            this.setState({currentComments});
        }
    }

    loadMoreComments = () => {
        const oldCount = this.state.CommentsShown;
        this.setState({CommentsShown: oldCount + 10});
    }

    render(){
        let comments = [];
        const commentsShownCount = this.state.comments.length < this.state.CommentsShown ? this.state.comments.length : this.state.CommentsShown; 
        for(let i=0;i<commentsShownCount; i++){
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
                    deleteSubComment = { this.deleteSubCommentFromTree }
                />
            )
        }
        let loadMoreCommentsButton = [];

        if(this.state.comments.length > this.state.CommentsShown){
            loadMoreCommentsButton = <div onClick={this.loadMoreComments} className={classes.ShowMoreComments}>Load More Comments</div>
            console.log("LOAD MORE COMMENTS");
        }
        if(this.props.showComments === false){
            comments = [];
        }

        return(
            <div className={classes.CommentSection}>
                {comments}
                {loadMoreCommentsButton}
            </div>
        )
    }

}

export default CommentSection;