import React, { Component } from "react";
import { connect } from 'react-redux';

import SubCommentWrapper from './SubCommentWrapper/SubCommentWrapper';
import Voting from "./Voting/Voting";
import AuthorPic from "../AuthorPic/AuthorPic";
import Backdrop from '../../../../UI/Backdrop/Backdrop';
import CommentForm from '../CommentForm/CommentForm';
import CommentMenu from './CommentMenu/CommentMenu';
import * as streamActions from '../../../../../store/actions/index';

import classes from "./Comment.module.css";

//import content from './Comment.js';

export const COLOR_COMMENT_BACKGROUND = 'rgba(0, 2, 10, 0.6)';
export const COLOR_COMMENT_BACKGORUND_HIGHLIGHTED = 'rgba(100, 0, 0, 0.6)';
const COLOR_COMMENT_SELECTED = 'rgba(87, 122, 161, 0.6)'


class Comment extends Component {
  
  state = {
    height: 0
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }
  
  componentDidUpdate() {
    const height = this.divElement.clientHeight;
    if(this.state.height !== height){
      this.setState({ height });
    }
  }

  getRoot(selected) {
      if((this.props.comment.subComments && this.props.comment.subComments.length > 0) || selected){
        return (
          <svg 
            key={1000} 
            className={classes.Root} 
            width={"2px"} 
            height={`${this.state.height}px`} 
            viewBox={`0 0 2 ${this.state.height}`} 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={`M0 0H2V${this.state.height}H0V0Z`} fill="#ffffff" />
          </svg>
        )
       } else {
         return null
       } 
  }

  createSubComments = (selected) => {
      const subComments = this.props.comment.subComments.map((s, i) => {
        const lastProp = i === this.props.comment.subComments.length - 1 && !selected ? true : false;
        return(
          <SubCommentWrapper
            {...s}
            parentSelected={selected}
            tree={['I']}
            last={lastProp}
            depth={1}
            key={i}
            dropId={this.props.dropId}
            selectedCommentPath={this.props.selectedComment}
            commentId={this.props.comment.id}
            actualComment={s.comment}
            subComments={s.subComments}
          />
        )
      })
    return subComments;
  };

  getSpeechBubbleArrow = (selected, sending) => {
    const color = selected ? COLOR_COMMENT_SELECTED : sending ? 'rgba(255,255,255,0.5)' : COLOR_COMMENT_BACKGROUND
    return (
      <svg className={classes.SpeechBubbleArrow} width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.1946 1.09753C15.127 2.89687 11.5635 5.9083 8 8.49986C5.64212 10.2146 7.62939e-06 9.99998 7.62939e-06 9.99998C7.62939e-06 9.99998 6.54393 10.8743 9.5 13.4999C13.3722 16.9392 13.9978 25.9679 14 25.9998L14 10C14 6.61858 15.1988 3.51715 17.1946 1.09753Z" 
              fill= {color}/>
      </svg>
    )
  }

  clicked = (sending, selected) => {
    if(sending){
      return () => {console.log('Comment still sending; cant select yet')}
    } else if(selected){
      return this.props.onUnselectComment
    }else if(!sending){
      return () => this.props.onSelectComment(this.props.id, '/')
    }
  }


  render() {
    let backgroundStyleClasses = [classes.CommentBackground]
    const selected = this.props.selectedComment === this.props.id
    const sending = this.props.sending.some(c => c.randId === this.props.id); 
    if(sending) backgroundStyleClasses.push(classes.sending);
    if(selected) backgroundStyleClasses.push(classes.selected);
      return (
      <div className={classes.CommentContainer}>
        {selected ? <Backdrop zIndex={100} clicked={this.props.onUnselectComment}/> : null}
        {selected ? <CommentMenu token={this.props.token} userComment={this.props.authorId === this.props.userId}/> : null}
        <div className={`${classes.Comment} ${selected ? classes.selected : null}`}>
          <AuthorPic depth={0} indent={0} neuMorphism={this.props.neuMorphism}/>
          <div 
            className={backgroundStyleClasses.join(' ')}
            onClick={this.clicked(sending, selected)}
            ref={divElement => (this.divElement = divElement)}>
            <Voting 
              upvoted={this.props.upVoted}
              downvoted={this.props.downVoted}
              commentId={this.props.id}
              points={this.props.points} />
            <div className={classes.SelectClickTarget}>
              <span className={classes.actualComment}>
                {this.props.comment.comment}
              </span>
              {this.getSpeechBubbleArrow(selected, sending)}
            </div>
          </div>
          {this.getRoot(selected)}
        </div>

        {this.props.comment.subComments ? this.createSubComments(selected) : null}
        {selected ? 
          <CommentForm 
            dropId={this.props.dropId}
            subComment={true}
            path={this.props.id}
            treeString={this.props.subComments.length > 0 ? [] : null}/> 
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedComment: state.stream.selectedComment,
    sending: state.stream.sending,
    userId: state.user.userId,
    token: state.user.token
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    onSelectComment: (commentId, path) => dispatch(streamActions.selectComment(commentId, path)),
    onUnselectComment: () => dispatch(streamActions.unSelectComment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
