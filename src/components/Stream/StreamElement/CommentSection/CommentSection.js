import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'css-loader';

import * as actionTypes from '../../../../store/actionTypes';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';




class CommentSection extends Component {





    render(){
        const element = this.props.streamElements.find(e => e.id === this.props.postId);
        if(element.commentsStatus === 'loading'){
            return (
                <Loader 
                    className={classes.Spinner} 
                    type="Puff" 
                    color="#00BFFF" 
                    height={40} 
                    width={40}/>
            )      
        }
        console.log('ELEMENT', element);
        const comments = element.comments.length > 0 ? 
            element.comments.map(x => {
                return <Comment 
                        key={x.commentId} 
                        comment={x} 
                        postId={this.props.postId} 
                        commentId={x.commentId}
                        neuMorphism={this.props.neuMorphism}
                        />
            }) : [];

        let styleClasses = [classes.CommentSection];
        if(this.props.neuMorphism) styleClasses.push(classes.NeuMorphism);


        return(
            <div className={styleClasses.join(' ')} tabIndex='0'>
                <CommentForm id={this.props.postId}/>
                {comments}
            </div>
        )
    }

    

}

const mapStateToProps = state => {
    return {
      darkmode: state.ui.darkmode, 
      streamElements: state.stream.StreamElements
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onOpenModal: () => dispatch({type: actionTypes.OPEN_MODAL}),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);