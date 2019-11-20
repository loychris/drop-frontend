import React from 'react'
import classes from './CommentBackground.module.css';

const CommentBackground = (props) => {
    const generateBackgroundStyles = () => {
        return {
            left: `${props.depth*props.indent+35}px`,
            width: `${630-props.indent*props.depth}px`
        }
    }

    return(
        <div zIndex={1} className={classes.CommentBackground} style={generateBackgroundStyles()}></div>
    )
}
export default CommentBackground; 