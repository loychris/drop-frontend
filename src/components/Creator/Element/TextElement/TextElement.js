import React from 'react';

import classes from './TextElement.module.css'; 

const TextElement = (props) => {

    const {font, fontSize, fontWeight, verticalAlign, elementId } = props.element;

    const verticalAlignClass = 
    verticalAlign === 'top' ? classes.topAlign 
    : verticalAlign === 'bottom' ? classes.bottomAlign 
    : classes.middleAlign;

    return(
        <p
            contentEditable={props.editing}
            suppressContentEditableWarning
            type='text' 
            id={`${elementId}-input`}
            className={`${classes.TextInput} ${verticalAlignClass}`} 
            // onDoubleClick={this.onTextFocus}
            style={{
                fontFamily: font,
                fontSize: fontSize,
                fontWeight: fontWeight
            }}
            onInput={e => this.props.onTextInput(e, elementId)}>
                <span>{props.text}</span>
        </p>
    )
}

export default TextElement; 