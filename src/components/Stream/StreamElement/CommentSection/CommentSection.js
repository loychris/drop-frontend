import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import * as streamActions from '../../../../store/actions/index';
import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';




class CommentSection extends Component {


    componentDidUpdate = () => {
        // if(this.props.dropLoaded && this.props.commentStatus === 'not loaded'){
        //     this.props.onFetchComments(this.props.postId);
        // }
    }


    render(){
        let comments = null;
        if(this.props.position <= 2){
            if(this.props.commentStatus === 'not loaded'){
                comments = <Loader 
                            className={classes.Spinner} 
                            type="ThreeDots" 
                            color="#00BFFF" 
                            height={30} 
                            width={30}/>
            }else{
                comments = this.props.comments.map(x => {
                    return(
                        <Comment 
                            {...x}
                            key={x._id} 
                            comment={x} 
                            postId={this.props.postId} 
                        />
                    )
                }) 
            }
        }

        return(
            <div className={classes.CommentSection} tabIndex='0'>
                <CommentForm postId={this.props.postId}/>
                <div className={classes.comments}>
                    {comments}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
//        onFetchComments: (dropId) => dispatch(streamActions.fetchComments(dropId))
    }
}

const mapStateToProps = state => {
    return {
      darkmode: state.ui.darkmode, 
    }
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);