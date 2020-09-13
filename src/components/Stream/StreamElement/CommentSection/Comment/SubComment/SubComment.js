import React, { Component } from "react";

import Voting from "../Voting/Voting";
import Options from "../Options/Options";
import AuthorPic from "../../AuthorPic/AuthorPic";
import Backdrop from '../../../../../UI/Backdrop/Backdrop';
import Branches from '../Branches/Branches';

import classes from "./SubComment.module.css";
import C from "./Connector.svg";
import L from "./L.svg";

const INDENT = 17;
//const INDENTFRACTION = 17; //precent of width of a depth=0 Comment
const MAX_SUBCOMMENTS = 4;
const COLOR_COMMENT_BACKGROUND = 'rgba(0, 2, 10, 0.6)';


class SubComment extends Component {
  
  state = {
    selected: false,
    highlighted: false,
    height: 0
  };

  componentDidMount() {
    const height = this.divElement.clientHeight;
    const highlighted = this.props.highlighted;
    this.setState({ 
      height,
      highlighted});
  }

  componentDidUpdate(prevProps){
    if(!this.props.highlighted === prevProps.highlighted){
      this.setState({highlighted: this.props.highlighted});
    }
  }


  createSubComments = (nextTreeString, depth) => {
    let subComments = [];
    if (this.props.subComments.length > 0) {
      const subCommentsCount =
        this.props.subComments.length < MAX_SUBCOMMENTS
          ? this.props.subComments.length
          : MAX_SUBCOMMENTS;
      for (let i = 0; i < subCommentsCount; i++) {
        const lastProp = i === this.props.subComments.length - 1 ? true : false;
        subComments.push(
          <SubComment
            tree={nextTreeString}
            last={lastProp}
            depth={`${depth + 1}`}
            highlighted={this.state.highlighted}
            key={`${this.props.path}/${i}`}
            path={`${this.props.path}/${i}`}
            author={this.props.subComments[i].author}
            points={this.props.subComments[i].points}
            actualComment={this.props.subComments[i].comment}
            subComments={this.props.subComments[i].subComments}
            addSubComment={this.props.addSubComment}
            deleteSubComment={this.props.deleteSubComment}
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
    const SpeechBubbleArrow = 
    <svg className={classes.SpeechBubbleArrow} width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.1946 1.09753C15.127 2.89687 11.5635 5.9083 8 8.49986C5.64212 10.2146 7.62939e-06 9.99998 7.62939e-06 9.99998C7.62939e-06 9.99998 6.54393 10.8743 9.5 13.4999C13.3722 16.9392 13.9978 25.9679 14 25.9998L14 10C14 6.61858 15.1988 3.51715 17.1946 1.09753Z" fill= {!this.props.parentSelected ? COLOR_COMMENT_BACKGROUND : "rgba(87, 122, 161, 0.6)"}/>
    </svg> 
    const depth = this.props.path.split("/").length - 1;
    let commentStyle = { paddingLeft: `${depth * INDENT}px` };
    const contentStyle = {
      left: `${depth * INDENT + 40}px`,
      maxWidth: `${545 - INDENT * depth}px`
    };

    let backgroundStyleClasses = [classes.CommentBackground]
    backgroundStyleClasses.push(classes.CommnetBackgroundFlat);
    /////////////////////////////  visual tree algorithm // DO NOT FUCKING TOUCH   /////////////////////////////
    let inheritance = this.props.tree ? this.props.tree : [];
    let thisTreeString = this.props.last === true ? [...inheritance, "L"].slice(1) : [...inheritance, "T"].slice(1);
    this.props.last === true && depth > 1 ? [...inheritance, "L"].slice(1) : [...inheritance, "T"].slice(1);
    let nextTreeString = this.props.last === true ? [...inheritance, " "] : [...inheritance, "I"];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const options = this.state.selected ? 
      <Options 
        deleteSubComment={this.props.deleteSubComment} 
        path={this.props.path}/> : [];
    return (
      <div className={`${classes.CommentContainer} ${this.props.parentSelected ? classes.selected : null}`}>
        {this.props.selected ? 
          <Backdrop clicked={this.props.onUnselectComment}/>
          : null
        }
        <div className={classes.Comment} style={commentStyle}>
          <AuthorPic depth={this.props.depth} indent={INDENT}/>
          <div className={backgroundStyleClasses.join(' ')} 
               ref={divElement => (this.divElement = divElement)}>
            {/* //////////// */}
            <Voting points={this.props.points} />
            <div className={classes.SelectClickTarget} onClick={this.select}>
              <span className={classes.actualComment} style={contentStyle}>
                {this.props.actualComment}
                {options}
              </span>
              {SpeechBubbleArrow}
            </div>
          </div>
        </div>
        <Branches 
          treeString={thisTreeString}
          height={this.state.height}
          path={this.props.path}/>
          {this.createSubComments(nextTreeString, depth)}
      </div>
    );
  }
}

export default SubComment;
