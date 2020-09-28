import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import classes from './CommentSection.module.css';
import Comment from './Comment/Comment';
import CommentForm from './CommentForm/CommentForm';




class CommentSection extends Component {


    componentDidUpdate = () => {
    }

    getComments = () => {
        return this.props.comments.map(x => {
            return(
                <Comment 
                    {...x}
                    key={x.id} 
                    comment={x} 
                    dropId={this.props.dropId} 
                />
            )
        })
    }

    getLoader = () => {
        return(
            <Loader 
                className={classes.Spinner} 
                type="ThreeDots" 
                color="#00BFFF" 
                height={30} 
                width={30}
            />
        )
    }

    render(){
        if(this.props.position > 1) return null
        return(
            <div className={classes.CommentSection} tabIndex='0'>
                <CommentForm dropId={this.props.dropId} />
                <div className={classes.comments}>
                    { this.props.commentStatus === 'not loaded' ? this.getLoader() : this.getComments()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const mapStateToProps = state => {
    return {
      darkmode: state.ui.darkmode, 
    }
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);