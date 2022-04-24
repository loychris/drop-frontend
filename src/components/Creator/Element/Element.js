import React, { Component } from 'react';

import * as classes from './Element.module.css';
import ResizeHandler from './ResizeHandler/ResizeHandler';



class Element extends Component {

    componentDidMount = () => {
        if(this.props.type === 'text'){
            //this.props.adjustTextElementHeight(this.props.element.elementId);
            const domElemement = document.getElementById(`${this.props.element.elementId}-input`);
            if(this.props.element.height !== domElemement.offsetHeight){
                this.props.edit(this.props.element.elementId, {
                    ...this.props.element, 
                    height: domElemement.offsetHeight
                })
            }
            if(this.props.currentlyEditing){
                console.log("EDITING")
                console.log(this.props.currentlyEditing);
                this.onTextFocus(); 
            }
        }
    }

    componentDidUpdate = () => {
        if(this.props.type === 'text' && this.props.element.fixedWidth){
            const domElemement = document.getElementById(`${this.props.element.elementId}-input`);
            if(this.props.element.height !== domElemement.offsetHeight){
                this.props.adjustTextElementHeight(this.props.element.elementId);

                // console.log("Changing height from ", this.props.element.height, " to ", domElemement.offsetHeight, "in DidUpdate");
                // this.props.edit(this.props.element.elementId, {
                //     ...this.props.element, 
                //     height: domElemement.offsetHeight
                // })
            }
        }
    }

    onTextFocus = () => {
        const el = document.getElementById(`${this.props.element.elementId}-input`);
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            const textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    getStyles = () => {
        const { height, width, posX, posY, font, fontSize, textAlign, fontWeight, underline, italic, color, textStroke } = this.props.element;
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
        }
    }

    getContent = () => {
        switch(this.props.type){
            case 'text': 
                return(
                    <p
                        contentEditable={true}//this.props.currentlyEditing}
                        type='text' 
                        id={`${this.props.element.elementId}-input`}
                        className={classes.TextInput} 
                        onDoubleClick={this.onTextFocus}
                        style={{
                            fontFamily: this.props.element.font,
                            fontSize: this.props.element.fontSize,
                            fontWeight: this.props.element.fontWeight
                        }}
                        onInput={e => this.props.onTextInput(e, this.props.element.elementId)}>
                    </p>
                )
            case 'image': 
                return(
                    <img
                        src={this.props.element.imgSrc}
                        className={classes.Image}
                        id={`${this.props.element.elementId}-image`}
                    />
                )
            case 'rect':
                return (
                    <div 
                        className={classes.Rect}
                        style={{backgroundColor: this.props.element.color}}
                    >

                    </div>
                )
            default: return null;
        }

    }

    highlighed = () => {
        if(this.props.selected) return false;
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
        console.log("ELEMENT MOUSE DOOWN");
        e.preventDefault();
        e.stopPropagation(); 
        this.props.elementMouseDown(e, this.props.element.elementId);
    }

    normalCkick = (e) => {
        console.log("ELEMENT CLICK");
        e.preventDefault();
        e.stopPropagation(); 
        this.props.select(e, this.props.element.elementId);
    }

    doubleClick = (e) => {
        console.log("ELEMENT DOUBLE CLICK")
        if(this.props.element.type === 'text'){
            this.props.selectAndEdit(e, this.props.element.elementId);
        } else {
            this.props.select(e, this.props.element.elementId);
        }
    }


    render() {  
        let styleClasses = [classes.Rectangle];
        if(this.highlighed()) styleClasses.push(classes.highlight);
        return(
                <div className={styleClasses.join(' ')}
                    onClick={this.normalCkick}
                    onDoubleClick={this.doubleClick}
                    onMouseDown={this.mouseDown}
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