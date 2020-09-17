import React, { Component } from "react";
import { connect } from 'react-redux';

import Voting from "../../Voting/Voting";
import AuthorPic from "../../../AuthorPic/AuthorPic";
import Backdrop from '../../../../../../UI/Backdrop/Backdrop';
import Branches from '../../Branches/Branches';
import * as streamActions from '../../../../../../../store/actions/index';

import classes from "./SubComment.module.css";

const INDENT = 17;
//const INDENTFRACTION = 17; //precent of width of a depth=0 Comment
const COLOR_COMMENT_BACKGROUND = 'rgba(0, 2, 10, 0.6)';


class SubComment extends Component {
  
  state = {
    height: 0
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    console.log('Setting height')
    this.setState({ height });
  }
  
  componentDidUpdate() {
    const height = this.divElement.clientHeight;
    if(this.state.height !== height){
      console.log('Updating height ', this.state.height, " ", height)
      this.setState({ height });
    }
  }

  generateRoot = () => {
    console.log(this.props.comment)
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
      <path d={`M0 0H2V${this.state.height}H0V0Z`} fill="#ffffff" />
    </svg>
    )
  };


  // createSubComments = (nextTreeString, depth) => {
  //   let subComments = [];
  //   if (this.props.subComments.length > 0) {
  //     const subCommentsCount =
  //       this.props.subComments.length < MAX_SUBCOMMENTS
  //         ? this.props.subComments.length
  //         : MAX_SUBCOMMENTS;
  //     for (let i = 0; i < subCommentsCount; i++) {
  //       const lastProp = i === this.props.subComments.length - 1 ? true : false;
  //       subComments.push(
  //         <SubComment
  //           tree={nextTreeString}
  //           last={lastProp}
  //           depth={`${depth + 1}`}
  //           highlighted={this.state.highlighted}
  //           key={`${this.props.path}/${i}`}
  //           path={`${this.props.path}/${i}`}
  //           author={this.props.subComments[i].author}
  //           points={this.props.subComments[i].points}
  //           actualComment={this.props.subComments[i].comment}
  //           subComments={this.props.subComments[i].subComments}
  //         />
  //       );
  //     }
  //   }
  //   return subComments;
  // };


  render() {
    const SpeechBubbleArrow = 
    <svg className={classes.SpeechBubbleArrow} width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.1946 1.09753C15.127 2.89687 11.5635 5.9083 8 8.49986C5.64212 10.2146 7.62939e-06 9.99998 7.62939e-06 9.99998C7.62939e-06 9.99998 6.54393 10.8743 9.5 13.4999C13.3722 16.9392 13.9978 25.9679 14 25.9998L14 10C14 6.61858 15.1988 3.51715 17.1946 1.09753Z" fill= {!this.props.parentSelected || this.props.selected ? COLOR_COMMENT_BACKGROUND : "rgba(87, 122, 161, 0.6)"}/>
    </svg> 
    const rootStyle = {left: `${this.props.depth * INDENT}px` }

    const root = (this.props.comment.subComments && this.props.comment.subComments.length > 0) || this.props.selected ?
      <svg key={1000} className={classes.Root} width={"2px"} height={`${this.state.height}px`} style={rootStyle} viewBox={`0 0 2 ${this.state.height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={`M0 0H2V${this.state.height}H0V0Z`} fill="#ffffff" />
      </svg> : null
    let commentStyle = { paddingLeft: `${this.props.depth * INDENT}px` };
    const contentStyle = {
      left: `${this.props.depth * INDENT + 40}px`,
      maxWidth: `${545 - INDENT * this.props.depth}px`
    };

    let backgroundStyleClasses = [classes.CommentBackground]
    backgroundStyleClasses.push(classes.CommnetBackgroundFlat);

    return (
      <div className={`${classes.CommentContainer} ${this.props.parentSelected || this.props.selected ? classes.selected : null}`}>
        {this.props.selected ? 
          <Backdrop clicked={this.props.onUnselectComment}/>
          : null
        }
        <div className={classes.Comment} style={commentStyle}>
          <AuthorPic depth={this.props.depth} indent={INDENT}/>
          <div 
            className={backgroundStyleClasses.join(' ')} 
            ref={divElement => (this.divElement = divElement)}
            onClick={  
            this.props.selected ? 
            () => this.props.onUnselectSubComment(this.props.commentId, this.props.path) : 
            () => this.props.onSelectSubComment(this.props.commentId, this.props.path)}
          >
            {/* //////////// */}
            <Voting points={this.props.points} />
            <div className={classes.SelectClickTarget} onClick={this.select}>
              <span className={classes.actualComment} style={contentStyle}>
                {this.props.actualComment}
              </span>
              {SpeechBubbleArrow}
            </div>
          </div>
        </div>
        <Branches 
          depth={this.props.depth}
          treeString={this.props.treeString}
          height={this.state.height}
          root={this.props.subComments && this.props.subComments.length > 0 }
          path={this.props.path}/>
          {root}
          {/* {this.createSubComments(nextTreeString, depth)} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    onSelectSubComment: (commentId, path) => dispatch(streamActions.selectSubComment(commentId, path)),
    onUnselectSubComment: () => dispatch(streamActions.unSelectSubComment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubComment);
