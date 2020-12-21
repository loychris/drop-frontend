import React, { Component } from "react";
import { connect } from 'react-redux';

import CommentMenu from '../../CommentMenu/CommentMenu';
import Voting from "../../Voting/Voting";
import AuthorPic from "../../../AuthorPic/AuthorPic";
import Backdrop from '../../../../../../UI/Backdrop/Backdrop';
import Branches from '../../Branches/Branches';
import * as streamActions from '../../../../../../../store/actions/index';

import classes from "./SubComment.module.css";

const INDENT = 17;
const COLOR_COMMENT_BACKGROUND = 'rgba(0, 2, 10, 0.6)';
const COLOR_COMMENT_SELECTED = 'rgba(87, 122, 161, 0.6)'


class SubComment extends Component {
  
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

  getRoot = () => {
    if (this.props.comment.subComments && this.props.comment.subComments.length > 0)
    return(
    <svg
      key={1001}
      className={classes.Root}
      width={"2px"}
      height={`${this.state.height}px`}
      viewBox={`0 0 2 ${this.state.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={`M0 0H20V${this.state.height}H0V0Z`} fill="green" />
    </svg>
    )
  };

  getSpeechBubbleArrow = (selected, parentSelected, sending) => {
    const color = selected || parentSelected ? COLOR_COMMENT_SELECTED : sending ? 'rgba(255,255,255,0.5)' : COLOR_COMMENT_BACKGROUND
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
    } else {
      return () => this.props.onSelectSubComment(this.props.commentId, this.props.path)
    }
  }


  render() {

    const selected = this.props.selectedComment === this.props.path;
    const sending = this.props.sending.some(s => s.dropId === this.props.dropId && s.path === this.props.path)
    const parentSelected = this.props.path.startsWith(this.props.selectedComment);
    let backgroundStyleClasses = [classes.CommentBackground]
    if(sending) backgroundStyleClasses.push(classes.sending);
    if(selected || parentSelected) backgroundStyleClasses.push() 

    const commentStyle = { paddingLeft: `${this.props.depth * INDENT}px` };
    const contentStyle = { left: `${this.props.depth * INDENT + 40}px`, maxWidth: `${545 - INDENT * this.props.depth}px`};

    const hiddenBranches = parentSelected ? this.props.selectedComment.split('/').length -1 : selected ? this.props.depth : null;

    return (
      <div className={`${classes.CommentContainer} ${parentSelected || selected ? classes.selected : null}`}>
        {selected ? <Backdrop clicked={ this.props.onUnselectComment }/> : null }
        {selected ? <CommentMenu token={this.props.token} userComment={this.props.authorId === this.props.userId}/> : null}
        <div className={classes.Comment} style={commentStyle}>
          <AuthorPic depth={this.props.depth} indent={INDENT}/>
          <div 
            className={backgroundStyleClasses.join(' ')} 
            ref={divElement => (this.divElement = divElement)}
            onClick={this.clicked(sending, selected)}>
            <Voting 
              upvoted={this.props.upVoted}
              downvoted={this.props.downVoted}
              points={this.props.points} 
              commentId={this.props.commentId}
              path={this.props.path}/>
            <div className={classes.SelectClickTarget} onClick={this.select}>
              <span className={classes.actualComment} style={contentStyle}>
                {this.props.actualComment}
              </span>
              {this.getSpeechBubbleArrow(selected, parentSelected, sending)}
            </div>
          </div>
        </div>
        <Branches 
          hideBranches={ hiddenBranches }
          treeString={ this.props.treeString }
          height={ this.state.height }
          root={ selected || (this.props.subComments && this.props.subComments.length > 0) }
          path={ this.props.path }
          selected={ selected }
        />
          {/* {this.createSubComments(nextTreeString, depth)} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedComment: state.stream.selectedComment,
    sending: state.stream.sending,
    token: state.user.token, 
    userId: state.user.userId
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    onSelectSubComment: (commentId, path) => dispatch(streamActions.selectSubComment(commentId, path)),
    onUnselectComment: () => dispatch(streamActions.unSelectComment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubComment);
