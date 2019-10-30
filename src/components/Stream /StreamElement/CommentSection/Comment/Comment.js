import React from 'react';
import classes from './Comment.module.css';
import Voting from './Voting/Voting';
import Aux from '../../../../../hoc/Aux'

const comment = props => {

    return(
        <div className={classes.Comment}>
            <div className={classes.AuthorProfilePic}></div>
            <Voting points={props.points}/>
            <p className={classes.actualComment}>{props.actualComment}</p>
            {/*<button className={classes.addSubCommentButton}></button>*/}
        </div>
    )
}

export default comment;