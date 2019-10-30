import React from 'react';
import classes from './Comment.module.css';
import Voting from './Voting/Voting';
import Aux from '../../../../../hoc/Aux';

const Comment = props => {

    const depth = parseInt(props.depth);
    console.log(depth);
    let subComments = [];
    if(props.subComments.length > 0){
        for(let i=0;i<props.subComments.length;i++){
            const nextDepth = `${depth+1}`
            subComments.push(
                <Comment

                    subComment = {nextDepth}
                    key = {`SubCommentNo${i}`}
                    author = { props.subComments[i].author }
                    points = { props.subComments[i].points }
                    actualComment = { props.subComments[i].comment }
                    subComments = { props.subComments[i].subComments }
                />
            )
        }
    }

    let styleClass = depth > 0 ? classes.Comment : classes.SubComment;
    let marginLeft = {marginLeft: `${depth*20}px`}


    return(
        <Aux>
            <div className={styleClass}
                 style={marginLeft}
            >
                <div className={classes.AuthorProfilePic}></div>
                <Voting points={props.points}/>
                <p className={classes.actualComment}>{props.actualComment}</p>
            
                {/*<button className={classes.addSubCommentButton}></button>*/}
            </div>
            {subComments}
        </Aux>
    )

}

export default Comment;