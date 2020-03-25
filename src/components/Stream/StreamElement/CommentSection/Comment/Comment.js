import React, { Component } from "react";

import SubComment from './SubComment/SubComment';
import Voting from "./Voting/Voting";
import Options from "./Options/Options";
import AuthorPic from "../AuthorPic/AuthorPic";

import classes from "./Comment.module.css";

//import content from './Comment.js';

export const COLOR_COMMENT_BACKGROUND = 'rgba(0, 2, 10, 0.6)';
export const COLOR_COMMENT_BACKGORUND_HIGHLIGHTED = 'rgba(100, 0, 0, 0.6)';


class Comment extends Component {
  
  state = {
    selected: false,
    height: 0
  }


  
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  generateRoot = () => {
      if (this.props.comment.subComments.length > 0)
      return(
      <svg
        key={1001}
        className={classes.Atlas}
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



  createSubComments = () => {
    let subComments = [];
    if (this.props.comment.subComments.length > 0) {
      for (let i = 0; i < this.props.comment.subComments.length; i++) {
        const lastProp = i === this.props.comment.subComments.length - 1 ? true : false;
        subComments.push(
          <SubComment
            tree={'I'}
            last={lastProp}
            depth={1}
            key={i}
            highlighted={this.state.selected}
            path={`${this.props.path}/${i}`}
            author={this.props.comment.subComments[i].author}
            points={this.props.comment.subComments[i].points}
            actualComment={this.props.comment.subComments[i].comment}
            subComments={this.props.comment.subComments[i].subComments}
          />
        );
      }
    }
    return subComments;
  };

  select = () => {
    if(this.state.selected){
      this.unselect()
    } else {
      this.setState({ selected: true, highlighted: true})
    }
  };

  unselect = () => { 
    this.setState({selected: false, highlighted: false});
  }

  getBackgroundColor = () => {
      return { backgroundColor: !this.state.selected ? COLOR_COMMENT_BACKGROUND : COLOR_COMMENT_BACKGORUND_HIGHLIGHTED }; 
  }

  render() {
    /////////////////////////// DESIGN ELEMENTS ///////////////////////
    const root = this.props.comment.subComments.length > 0 ?
      <svg key={1000} className={classes.Atlas} width={"2px"} height={`${this.state.height}px`} viewBox={`0 0 2 ${this.state.height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={`M0 0H2V${this.state.height}H0V0Z`} fill="#ffffff" />
      </svg> : []

    const SpeechBubbleArrow = 
      <svg className={classes.SpeechBubbleArrow} width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.1946 1.09753C15.127 2.89687 11.5635 5.9083 8 8.49986C5.64212 10.2146 7.62939e-06 9.99998 7.62939e-06 9.99998C7.62939e-06 9.99998 6.54393 10.8743 9.5 13.4999C13.3722 16.9392 13.9978 25.9679 14 25.9998L14 10C14 6.61858 15.1988 3.51715 17.1946 1.09753Z" fill= {!this.state.selected ? COLOR_COMMENT_BACKGROUND : COLOR_COMMENT_BACKGORUND_HIGHLIGHTED}/>
      </svg>
    ///////////////////////////////////////////////////////////////////


    const options = this.state.selected ? <Options path={this.props.path}/> : []


      return (
      <div className={classes.CommentContainer}>
        <div className={classes.Comment}>
          <AuthorPic depth={0} indent={0} />
          <div className={classes.CommentBackground}
               style={this.getBackgroundColor()}
               ref={divElement => (this.divElement = divElement)}>
            <Voting 
              commentId={this.props.commentId}
              postId={this.props.postId}
              points={this.props.comment.points} />
            <div className={classes.SelectClickTarget}                
                 onClick={this.select}>
              <span className={classes.actualComment}>
                {this.props.comment.comment}
                {options}
              </span>
              {SpeechBubbleArrow}
            </div>
          </div>
        </div>
        {root}
        {this.createSubComments()}
      </div>
    );
  }
}

export default Comment;
