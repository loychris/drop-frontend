import React, { Component } from "react";

import SubComment from './SubComment/SubComment';
import Voting from "./Voting/Voting";
import Options from "./Options/Options";
import AuthorPic from "./AuthorPic/AuthorPic";
//import addSubComment from './AddSubCommentButton/AddSubCommentButton';

import classes from "./Comment.module.css";

//import content from './Comment.js';

const MAX_SUBCOMMENTS = 4;
export const COLOR_COMMENT_BACKGROUND = 'rgba(0, 2, 10, 0.6)';
export const COLOR_COMMENT_BACKGORUND_HIGHLIGHTED = 'rgba(100, 0, 0, 0.6)';


class Comment extends Component {
  
  state = {
    selected: false,
    height: 0,
    highlighted: false,
    comment: {
        author: 'Chris',
        points: 99999999,
        comment: "First Comment of the comment section",
        path: '0',
        subComments: [
          {
            author: 'Chris 2',
            points: 12,
            path: '0/0',
            comment: "Longer reply to comment of comment to test/show the tree structure of comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque sed est non interdum. Quisque dapibus vitae mauris et eleifend. Quisque at augue elementum, mattis quam non, pulvinar mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque laoreet pharetra odio in interdum. Quisque convallis est non pellentesque vestibulum. In molestie elit sed sem mollis rutrum. Praesent vulputate justo tellus, vitae mollis urna porta et. In quis lobortis eros. Morbi eu nunc pharetra urna blandit dictum. Aliquam erat volutpat. Donec volutpat odio vel justo porta ornare.",
            subComments: [
              {
                author: 'Chris 2',
                points: 12,
                comment: 'No u',
                path: '0/0/0',
                subComments: [
                  {
                    author: 'Chris 2',
                    points: 12,
                    comment: 'No u',
                    path: '0/0/0',
                    subComments: []
                  }
                ]
              },
              {
                author: 'Chris 2',
                points: 12,
                comment: 'No u',
                path: '0/0/0',
                subComments: []
              }
            ]
          },
          {
            author: 'Chris 2',
            points: 12,
            comment: 'No u',
            path: '0/0/0',
            subComments: []
          }
        ]
    }
  }

  addSubComment = (parentPath, content) => {
    let comments = this.state.comments;
    const parentPathArray = parentPath.split('/').map(x => parseInt(x));
    let current = comments[parentPathArray[0]];
    if(parentPathArray.length>0){
        for(let i=1;i<parentPathArray.length;i++){
            current = current.subComments[parentPathArray[i]];

        }
    }
    current.subComments.push({
        author: 'chris',
        points: 0,
        comment: content,
        path: `${parentPath}/${current.subComments.length}`,
        subComments: []
    })
    this.setState({comments});

  }
  
  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  generateRoot = () => {
      if (this.state.comment.subComments.length > 0)
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
    if (this.state.comment.subComments.length > 0) {
      const subCommentsCount =
        this.state.comment.subComments.length < MAX_SUBCOMMENTS
          ? this.state.comment.subComments.length
          : MAX_SUBCOMMENTS;
      for (let i = 0; i < subCommentsCount; i++) {
        const lastProp = i === this.state.comment.subComments.length - 1 ? true : false;
        subComments.push(
          <SubComment
            tree={'I'}
            last={lastProp}
            depth={1}
            key={i}
            highlighted={this.state.highlighted}
            path={`${this.props.path}/${i}`}
            author={this.state.comment.subComments[i].author}
            points={this.state.comment.subComments[i].points}
            actualComment={this.state.comment.subComments[i].comment}
            subComments={this.state.comment.subComments[i].subComments}
            addSubComment={this.addSubComment}
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

  render() {
    const atlas = 
      <svg key={1000} className={classes.Atlas} width={"2px"} height={`${this.state.height}px`} viewBox={`0 0 2 ${this.state.height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={`M0 0H2V${this.state.height}H0V0Z`} fill="#ffffff" />
      </svg>;

    const SpeechBubbleArrow = 
      <svg className={classes.SpeechBubbleArrow} width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.1946 1.09753C15.127 2.89687 11.5635 5.9083 8 8.49986C5.64212 10.2146 7.62939e-06 9.99998 7.62939e-06 9.99998C7.62939e-06 9.99998 6.54393 10.8743 9.5 13.4999C13.3722 16.9392 13.9978 25.9679 14 25.9998L14 10C14 6.61858 15.1988 3.51715 17.1946 1.09753Z" fill= {!this.state.selected ? COLOR_COMMENT_BACKGROUND : COLOR_COMMENT_BACKGORUND_HIGHLIGHTED}/>
      </svg>

    const options = this.state.selected ? (<Options path={this.props.path}/>) : [];
    const backgorundStyle = 
      !this.state.highlighted
        ? { backgroundColor: COLOR_COMMENT_BACKGROUND } 
        : { backgroundColor: COLOR_COMMENT_BACKGORUND_HIGHLIGHTED }
    
      return (
      <div className={classes.CommentContainer}>
        <div className={classes.Comment}>
          <AuthorPic depth={0} indent={0} />
          <div className={classes.CommentBackground}
               style={backgorundStyle}
               ref={divElement => (this.divElement = divElement)}>
            <Voting points={this.state.comment.points} />
            <div className={classes.SelectClickTarget}                
                 onClick={this.select}>
              <span className={classes.actualComment}>
                {this.state.comment.comment}
                {options}
              </span>
              {SpeechBubbleArrow}
            </div>
          </div>
        </div>
        {atlas}
        {this.createSubComments()}
      </div>
    );
  }
}

export default Comment;
