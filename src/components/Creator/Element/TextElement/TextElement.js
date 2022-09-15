import React from 'react';
import AutoResizeTextElement from './AutoResizeTextElement';

import classes from './TextElement.module.css'; 

const TextElement = (props) => {

    const {
        font, 
        fixedDimensions, 
        fontWeight, 
        verticalAlign, 
        elementId 
    } = props.element;

    const verticalAlignClass = 
    verticalAlign === 'top' ? classes.topAlign 
    : verticalAlign === 'bottom' ? classes.bottomAlign 
    : classes.middleAlign;

    if(fixedDimensions) return <AutoResizeTextElement {...props} />

    return(
        <div
            contentEditable={props.editing}
            suppressContentEditableWarning
            type='text' 
            id={`${elementId}-input`}
            className={`${classes.TextInput} ${verticalAlignClass}`} 
            // onDoubleClick={this.onTextFocus}
            style={{
                fontFamily: font,
                fontWeight: fontWeight
            }}
            onInput={(e) => props.onTextInput(e, elementId)}>
            {props.text}
        </div>
    )
}

export default TextElement; 