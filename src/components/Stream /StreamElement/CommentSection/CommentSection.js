import React, { Component } from 'react';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';
import comm from './comments';
//import axios from 'axios';

const SERVER_PORT = 3500;

class CommentSection extends Component {

    state = {
        CommentsShown: 10,
        loadedComments: null,
        comments: []
    }

    componentDidMount () {
        if(!this.state.loadedComments){
            this.setState({comments: comm});
            // axios.get('////////////////////////')
            //     .then( response => {
            //         console.log(response.data);
            //         this.setState( { comments: [{
            //             author: 'chris',
            //             points: 12,
            //             comment: response.data,
            //             path: '0',
            //             subComments: [] 
            //         }]}); 
            //     })

        }
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
        const commentsShownCount =  this.state.comments.length < this.state.CommentsShown ? this.state.comments.length : this.state.CommentsShown; 
        for(let i=0;i<commentsShownCount; i++){
            comments.push(
                <Comment
                    depth = {'0'}
                    key = {`${i}`}
                    path = { `${i}`}
                    selected = { false }
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