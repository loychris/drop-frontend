import React, { Component } from 'react';

import * as classes from './Element.module.css';
import ResizeHandler from './ResizeHandler/ResizeHandler';



class Element extends Component {

    getStyles = () => {
        const { height, width, posX, posY, font, fontSize, textAlign, fontWeight, underline, italic, color, textStroke, elementId } = this.props.element;
        return {
            height: `${height}px`, 
            width: `${width}px`,
            left: `${posX}px`,
            top: `${posY}px`,
            fontFamily: `${font},Oswald,Impact`,
            fontSize: `${fontSize}pt`,
            textAlign: textAlign, 
            fontWeight: fontWeight,
            fontStyle: italic ? 'italic' : 'normal',
            backgroundColor: color,
            textDecoration: underline ? 'underline' : 'none',
            WebkitTextStrokeColor: textStroke ? "black" : null,
            WebkitTextStrokeWidth: textStroke ? "0.06rem": null,
            textShadow: textStroke ? "0px 0px 0.1rem  #000" : null,
            cursor: this.props.editingId === elementId || this.props.inPreview ? null : 'grab', 
        }
    }

    getContent = () => {
        const {font, fontSize, fontWeight, color, elementId, imgSrc, verticalAlign, text } = this.props.element;
        switch(this.props.type){
            case 'text': 
                const verticalAlignClass = verticalAlign === 'top'    ? classes.topAlign 
                                        :  verticalAlign === 'bottom' ? classes.bottomAlign 
                                                                      : classes.middleAlign;
                return(
                    <p
                        contentEditable={!this.props.inPreview}
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
                            <span>{text}</span>
                    </p>
                )
            case 'image': 
                return(
                    <img
                        src={imgSrc}
                        className={classes.Image}
                        id={`${elementId}-image`}
                        onLoad={this.props.onImgeLoad}
                    />
                )
            case 'rect':
                return (
                    <div 
                        className={classes.Rect}
                        style={{backgroundColor: color}}
                    >
                    </div>
                )
            default: return null;
        }
    }

    highlighed = () => {
        if(this.props.selected || !this.props.selectedLines) return false;
        let Hlines = [];
        let Vlines = [];
        Hlines.push(this.props.element.posY)
        Hlines.push((2* this.props.element.posY + this.props.element.height)/2)
        Hlines.push(this.props.element.posY + this.props.element.height)
        Vlines.push(this.props.element.posX)
        Vlines.push((2* this.props.element.posX + this.props.element.width)/2)
        Vlines.push(this.props.element.posX + this.props.element.width)
        return Vlines.includes(this.props.selectedLines.v) || Hlines.includes(this.props.selectedLines.h);
    }

    mouseDown = (e) => {
        e.stopPropagation(); 
        if(this.props.editingId !== this.props.element.elementId && !this.props.inPreview){
            this.props.elementMouseDown(e, this.props.element.elementId);
        }
    }

    mouseUp = (e) => {
        e.stopPropagation();
        if(this.props.editingId !== this.props.element.elementId && !this.props.inPreview){
            this.props.select(e, this.props.element.elementId);
        }
    }

    doubleClick = (e) => {
        if(!this.props.inPreview){
            if(this.props.element.type === 'text'){
                this.props.selectAndEdit(e, this.props.element.elementId);
            } else {
                this.props.select(e, this.props.element.elementId);
            }
        }
    }

    render() {  
        let styleClasses = [classes.Element];
        if(this.highlighed()) styleClasses.push(classes.highlight);
        return(
            <div className={styleClasses.join(' ')}
                onDoubleClick={this.doubleClick}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                style={this.getStyles()}
                id={`element-${this.props.element.elementId}`}
            >
                {this.getContent()}
                {/* {this.getResizeHandlers()} */}
            </div>
        )
    }
}

export default Element;