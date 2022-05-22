import React, { useRef } from 'react';
import useFitText from 'use-fit-text'; 

import classes from './TextElement.module.css'; 

const TextElement = (props) => {

    const inputEl = useRef(null);
    const { fontSize, ref } = useFitText(); 

    const {font, height, width, fontWeight, verticalAlign, elementId } = props.element;

    const verticalAlignClass = 
    verticalAlign === 'top' ? classes.topAlign 
    : verticalAlign === 'bottom' ? classes.bottomAlign 
    : classes.middleAlign;



    return(
        <div
            ref={inputEl}
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
                <div 
                    ref={ref}
                    style={{ fontSize, height, width }}
                >
                    {props.text}
                </div>
        </div>
    )
}

export default TextElement; 