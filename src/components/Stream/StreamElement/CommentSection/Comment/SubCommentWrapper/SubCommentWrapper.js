import React, { Component } from 'react';

import SubComment from '../SubComment/SubComment';

class SubCommentWrapper extends Component {

    createSubComments = (nextTreeString, depth) => {
        const subComments = this.props.subComments.map((s, i) => {
          const lastProp = i === this.props.subComments.length - 1 && !this.props.selected ? true : false;
          return(
            <SubCommentWrapper
              {...s}
              parentSelected={this.props.selected}
              tree={nextTreeString}
              last={lastProp}
              depth={depth+1}
              key={i}
              actualComment={s.comment}
              subComments={s.subComments}
              commentId={this.props.commentId}
            />
          )
        })
        return subComments;
    };

    render(){

        const depth = this.props.path.split("/").length - 1;

        /////////////////////////////  tree algorithm // DO NOT FUCKING TOUCH   /////////////////////////////
        let inheritance = this.props.tree ? this.props.tree : [];
        let thisTreeString = this.props.last === true ? [...inheritance, "L"].slice(1) : [...inheritance, "T"].slice(1);
        this.props.last === true && depth > 1 ? [...inheritance, "L"].slice(1) : [...inheritance, "T"].slice(1);
        let nextTreeString = this.props.last === true ? [...inheritance, " "] : [...inheritance, "I"];
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        
        return (
            <div className="SubCommentWrapper">
                <SubComment {...this.props} treeString={thisTreeString}/>
                { this.createSubComments(nextTreeString, depth )  }
            </div>
        )
    }
}

export default SubCommentWrapper;