import React from 'react';
import AutoResizeTextElement from './AutoResizeTextElement';

import classes from './TextElement.module.css'; 

const TextElement = (props) => {

    const {
        font, 
        fixedDimensions, 
        fontWeight, 
        verticalAlign, 
        elementId,
        fontSize,
        textAlign,
        italic,
        underline,
        textStroke,
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
                fontWeight: fontWeight,
                fontFamily: `${font},Oswald,Impact`,
                fontSize: `${fontSize}pt`,
                textAlign: textAlign, 
                fontWeight: fontWeight,
                fontStyle: italic ? 'italic' : 'normal',
                textDecoration: underline ? 'underline' : 'none',
                WebkitTextStrokeColor: textStroke ? "black" : null,
                WebkitTextStrokeWidth: textStroke ? "0.06rem": null,
                textShadow: textStroke ? "0px 0px 0.1rem  #000" : null,
            }}
            onInput={(e) => props.onTextInput(e, elementId)}>
            {props.text}
        </div>
    )
}

export default TextElement; 