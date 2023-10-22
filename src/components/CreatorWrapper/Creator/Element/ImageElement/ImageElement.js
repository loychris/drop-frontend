import React from 'react';
import classes from './ImageElement.module.css'; 

const ImageElement = (props) => {

    const {
        imgSrc,
        elementId 
    } = props.element;

    return(
        <img
            src={imgSrc}
            className={classes.Image}
            id={`${elementId}-image`}
            onLoad={props.onImageLoad}
            alt=''
        />  
    )
}

export default ImageElement; 