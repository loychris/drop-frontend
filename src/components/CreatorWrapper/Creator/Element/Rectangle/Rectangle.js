import React from 'react';
import classes from './Rectangle.module.css'; 

const Rectangle = (props) => {

    const {
        color, 
        height, 
        width, 
        elementId 
    } = props.element;

    const styles = {
        backgroundColor: color
    }

    return(
        <div className={classes.Rectangle} style={styles}>
        </div>
    )
}

export default Rectangle; 