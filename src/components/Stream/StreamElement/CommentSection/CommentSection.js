import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import * as actions from '../../../../store/actions/index';

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
        if(this.props.position !== 1) return <div className={classes.hidden}></div>
        return(
            <div 
                style={{width: this.props.windowWidth/2 - 350}}
                className={classes.CommentSection} 
                onMouseEnter={() => this.props.onSetMouseOverComments(true)} 
                onMouseLeave={() => this.props.onSetMouseOverComments(false)}
                tabIndex='0'>
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
        onSetMouseOverComments: (overComments) => dispatch(actions.setMouseOverComments(overComments)),
    }
}

const mapStateToProps = state => {
    return {
      darkmode: state.ui.darkmode, 
      windowWidth: state.ui.windowWidth,
    }
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);