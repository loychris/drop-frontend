import React, { Component } from 'react';
import axios from 'axios';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';


//import axios from 'axios';

//const SERVER_PORT = 3500;

class CommentSection extends Component {

    state = {
        highlightedComment: false,
        commentsLoaded: false,
        comments: []
    }

    componentDidMount() {
        if(!this.state.commentsLoaded){
            axios.get(`http://localhost:5000/post/${this.props.postId}/comments`)
                .then(response => {
                    console.log('FETCHING COMMENTS', response.data);
                    this.setState({commentsLoaded: true, comments: response.data});
                });
        }
    }

    componentDidUpdate() {
        console.log('updated CommentSection');
    }


    render(){
       let comments = this.state.comments.length > 0 ? 
            this.state.comments.map(x => {
                return <Comment key={x.commentId} comment={x}/>
            }) : [];

        return(
            <div className={classes.CommentSection} tabIndex='0'>
                <h3>Comments: </h3>
                {comments}
            </div>
        )
    }

    

}

export default CommentSection;