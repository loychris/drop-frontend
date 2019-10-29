import React from 'react';
import classes from './Comment.module.css';
import Voting from './Voting/Voting';
import Aux from '../../../../../hoc/Aux'

const comment = props => {

    return(
        <div className={classes.Comment}>
            <Aux>
                <div className={classes.AuthorProfilePic}></div>
                <p className={classes.actualComment}>{props.actualComment}</p>
            </Aux>
            <Voting points={props.points}/>
            {/*<button className={classes.addSubCommentButton}></button>*/}
        </div>
    )
}

export default comment;