import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import * as actionTypes from '../../../../store/actionTypes';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';




class CommentSection extends Component {





    render(){
        let comments;
        const element = this.props.streamElements.find(e => e.id === this.props.postId);
        if(element.commentsStatus === 'loading'){
            comments = <Loader 
                        className={classes.Spinner} 
                        type="ThreeDots" 
                        color="#00BFFF" 
                        height={30} 
                        width={30}/>
        }else{
            comments = 
                element.comments.length > 0 ? 
                element.comments.map(x => {
                    return <Comment 
                            key={x.commentId} 
                            comment={x} 
                            postId={this.props.postId} 
                            commentId={x.commentId}
                            neuMorphism={this.props.neuMorphism}
                            />
                }) 
                : null;
        }
        let styleClasses = [classes.CommentSection];
        if(this.props.neuMorphism) styleClasses.push(classes.NeuMorphism);


        return(
            <div className={styleClasses.join(' ')} tabIndex='0'>
                <CommentForm id={this.props.postId}/>
                <div className={classes.comments}>
                    {comments}
                </div>

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