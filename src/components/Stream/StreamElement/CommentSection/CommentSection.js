import React, { Component } from 'react';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';


//import axios from 'axios';

//const SERVER_PORT = 3500;

class CommentSection extends Component {

    state = {
        CommentsShown: 10,
        loadedComments: null,
        comments: [],
        highlightedComment: false
    }

    componentDidUpdate() {
        console.log('updated CommentSection');
    }

    someCommentHighlighted(path){
        this.setState({highlightedComment: path})
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

    swipeLeft = () => {
        
    }

    render(){
        let loadMoreCommentsButton = [];
        if(this.state.comments.length > this.state.CommentsShown){
            loadMoreCommentsButton = <div onClick={this.loadMoreComments} className={classes.ShowMoreComments}>Load More Comments</div>
        }
       // if(!this.props.showComments) comments = [];

        return(
            <div className={classes.CommentSection} tabIndex='0'>
                <h3>Comments: </h3>
                <Comment path='1'/>
                <Comment path='2'/>
                <Comment path='3'/>
                {loadMoreCommentsButton}
            </div>
        )
    }

    

}

export default CommentSection;