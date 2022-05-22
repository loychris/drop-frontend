import React, { useRef } from 'react';

import classes from './TextElement.module.css'; 

const TextElement = (props) => {

    const inputEl = useRef(null);

    const {font, fontSize, fontWeight, verticalAlign, elementId } = props.element;

    const verticalAlignClass = 
    verticalAlign === 'top' ? classes.topAlign 
    : verticalAlign === 'bottom' ? classes.bottomAlign 
    : classes.middleAlign;

    const onTextInput = (e) => {
        props.onTextInput(e, elementId, () => {
            console.log("Callback called")
        }); 
    }



    return(
        <div
            ref={inputEl}
            contentEditable={props.editing}
            suppressContentEditableWarning
            type='text' 
            id={`${elementId}-input`}
            className={`${classes.TextInput} ${verticalAlignClass}`} 
            selectionStart={3}
            selectionEnd={5}
            // onDoubleClick={this.onTextFocus}
            style={{
                fontFamily: font,
                fontSize: fontSize,
                fontWeight: fontWeight
            }}
            onInput={onTextInput}>
                {props.text}
        </div>
    )
}

export default TextElement; 