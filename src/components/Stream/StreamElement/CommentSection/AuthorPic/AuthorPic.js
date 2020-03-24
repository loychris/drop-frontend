import React from 'react';
import classes from './AuthorPic.module.css'

const AuthorPic = (props) => {
    return(
        <div className={classes.AuthorPic} style={{left: `${props.depth*props.indent}px`}}>
        </div>
    )
}

export default AuthorPic;