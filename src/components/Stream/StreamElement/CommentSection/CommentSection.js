import React, { Component } from 'react';
import axios from 'axios';

import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';




class CommentSection extends Component {

    state = {
        highlightedComment: false,
        commentsLoaded: false,
        someCommentSelected: false,
        comments: []
    }

    componentDidMount() {
        if(!this.state.commentsLoaded){
            axios.get(`/post/${this.props.postId}/comments`)
                .then(response => {
                    this.setState({commentsLoaded: true, comments: response.data});
                });
        }
    }

    componentDidUpdate() {
        console.log('updated CommentSection');
    }

    addComment(comment){
        const newComment = {
            commentId: 12345678,
            author: 'user',
            points: 0,
            comment: comment,
            subComments: []
        }
        axios.post(`/post/${this.props.postId}/comment`, newComment);
        const commentsNew = [newComment, ...this.state.comments]
        this.setState({comments: commentsNew});
    }


    render(){
       let comments = this.state.comments.length > 0 ? 
            this.state.comments.map(x => {
                return <Comment key={x.commentId} comment={x} postId={this.props.postId} commentId={x.commentId}/>
            }) : [];

        return(
            <div className={classes.CommentSection} tabIndex='0'>
                <h3>Comments: </h3>
                <CommentForm id={this.props.postId} addComment={this.addComment.bind(this)}/>
                {comments}
            </div>
        )
    }

    

}

export default CommentSection;