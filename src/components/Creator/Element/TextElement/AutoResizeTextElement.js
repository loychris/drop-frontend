import React from 'react';
import useFitText from 'use-fit-text'; 

import classes from './TextElement.module.css'; 

const AutoResizeTextElement = (props) => {

    const { fontSize, ref } = useFitText(); 

    const {font, height, width, fontWeight, verticalAlign, elementId } = props.element;

    const verticalAlignClass = 
    verticalAlign === 'top' ? classes.topAlign 
    : verticalAlign === 'bottom' ? classes.bottomAlign 
    : classes.middleAlign;

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
                fontWeight: fontWeight,
                height,
                width
            }}
            onInput={(e) => props.onTextInput(e, elementId)}>
                <div 
                    ref={ref}
                    style={{ fontSize, height, width }}
                >
                    {props.text}
                </div>
        </div>
    )
}

export default AutoResizeTextElement; 