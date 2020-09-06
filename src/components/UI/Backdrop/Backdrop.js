import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = (props) => (
        <div 
            style={props.zIndex ? {zIndex: `${props.zIndex}`} : null }
            className={classes.Backdrop} 
            onClick={props.clicked}
        ></div> 
);

export default backdrop;