import React, { Component } from 'react';

import SubComment from './SubComment/SubComment';
import CommentForm from '../../CommentForm/CommentForm';

class SubCommentWrapper extends Component {

    createSubComments = (nextTreeString, depth, selected) => {
        const subComments = this.props.subComments.map((s, i) => {
          const lastProp = selected ? false : i === this.props.subComments.length - 1 ? true : false;
          return(
            <SubCommentWrapper
              {...s}
              tree={nextTreeString}
              last={lastProp}
              depth={depth+1}
              key={i}
              dropId={this.props.dropId}
              selectedCommentPath={this.props.selectedCommentPath}
              actualComment={s.comment}
              subComments={s.subComments}
              commentId={this.props.commentId}
              selected={selected}
            />
          )
        })
        return subComments;
    };

    render(){

        const depth = this.props.path.split("/").length - 1;
        const selected = this.props.selectedCommentPath === this.props.path;
        /////////////////////////////  tree algorithm // DO NOT FUCKING TOUCH   /////////////////////////////
        let inheritance = this.props.tree ? this.props.tree : [];
        let thisTreeString = this.props.last === true ? [...inheritance, "L"].slice(1) : [...inheritance, "T"].slice(1);
        !this.props.selected && this.props.last === true && depth > 1 ? [...inheritance, "L"].slice(1) : [...inheritance, "T"].slice(1);
        let nextTreeString = this.props.last === true ? [...inheritance, " "] : [...inheritance, "I"];
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        
        return (
            <div className="SubCommentWrapper">
                <SubComment {...this.props} treeString={thisTreeString}/>
                { this.createSubComments(nextTreeString, depth, selected)  }
                {
                  selected ? 
                  <CommentForm
                    subComment
                    dropId={this.props.dropId}
                    path={this.props.path}
                    treeString={nextTreeString}/> 
                  : null 
                }
            </div>
        )
    }
}

export default SubCommentWrapper;