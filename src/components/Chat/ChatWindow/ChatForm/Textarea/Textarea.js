import React from 'react';

import classes from './Textarea.module.css';

const Textarea = React.forwardRef((props, ref) => {

    return(
        <textarea 
            className={classes.Textarea} 
            style={{height: `${props.formHeight+5}px`}}
            value={props.input}
            rows={1}
            onChange={props.onInput}
            ref={ref}
        />
    )
})

export default Textarea; 