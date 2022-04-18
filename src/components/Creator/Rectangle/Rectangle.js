import React, { Component } from 'react';

import * as classes from './Rectangle.module.css';
import ResizeHandler from './ResizeHandler/ResizeHandler';



class Rectangle extends Component {

    componentDidMount = () => {
        if(this.props.type === 'text'){
            //this.props.adjustTextElementHeight(this.props.elementId);
            const domElemement = document.getElementById(`${this.props.elementId}-input`);
            if(this.props.element.height !== domElemement.offsetHeight){
                console.log("Changing height from ", this.props.element.height, " to ", domElemement.offsetHeight, "in DidMount");
                console.log("ojsrgniower", this.props.element);
                this.props.edit(this.props.elementId, {
                    ...this.props.element, 
                    height: domElemement.offsetHeight
                })
            }
            if(this.props.currentlyEditing){
                this.onTextFocus(); 
            }
        }
    }

    componentDidUpdate = () => {
        if(this.props.type === 'text'){
            const domElemement = document.getElementById(`${this.props.elementId}-input`);
            if(this.props.element.height !== domElemement.offsetHeight){
                this.props.adjustTextElementHeight(this.props.elementId);

                // console.log("Changing height from ", this.props.element.height, " to ", domElemement.offsetHeight, "in DidUpdate");
                // this.props.edit(this.props.elementId, {
                //     ...this.props.element, 
                //     height: domElemement.offsetHeight
                // })
            }
        }
    }

    onTextFocus = () => {
        console.log('TEXT FOCUS END')
        const el = document.getElementById(`${this.props.elementId}-input`);
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

    getResizeHandlers = () => {
        if(!this.props.selected) return null;
        let resizeHandlers = [
            <ResizeHandler key={'NW'} dir={'NW'} elementId={this.props.elementId} mouseDown={this.props.resizeMouseDown}/>,
            <ResizeHandler key={'SW'} dir={'SW'} elementId={this.props.elementId} mouseDown={this.props.resizeMouseDown}/>,
            <ResizeHandler key={'NE'} dir={'NE'} elementId={this.props.elementId} mouseDown={this.props.resizeMouseDown}/>,
            <ResizeHandler key={'SE'} dir={'SE'} elementId={this.props.elementId} mouseDown={this.props.resizeMouseDown}/>,
            <ResizeHandler key={'W'}  dir={'W'} elementId={this.props.elementId} mouseDown={this.props.resizeMouseDown}/>,
            <ResizeHandler key={'E'}  dir={'E'} elementId={this.props.elementId} mouseDown={this.props.resizeMouseDown}/>,
        ]
        if(this.props.type !== 'text'){
            resizeHandlers.push(<ResizeHandler key={'N'} dir={'N'} elementId={this.props.elementId} mouseDown={this.props.resizeMouseDown}/>)
            resizeHandlers.push(<ResizeHandler key={'S'} dir={'S'} elementId={this.props.elementId} mouseDown={this.props.resizeMouseDown}/>)
        }
        return resizeHandlers
    }

    getStyles = () => {

        return {
            height: `${this.props.element.height}px`, 
            width: `${this.props.element.width}px`,
            left: `${this.props.element.posX}px`,
            top: `${this.props.element.posY}px`,
            fontFamily: `${this.props.element.font},Oswald,Impact`,
            fontSize: `${this.props.element.fontSize}pt`,
            textAlign: this.props.element.textAlign, 
        }
    }

    getContent = () => {
        switch(this.props.type){
            case 'text': 
                return(
                    <p
                        contentEditable={true}//this.props.currentlyEditing}
                        type='text' 
                        id={`${this.props.elementId}-input`}
                        className={classes.TextInput} 
                        onDoubleClick={this.onTextFocus}
                        style={{
                            fontFamily: this.props.element.font,
                            fontSize: this.props.element.fontSize,
                            fontWeight: this.props.element.fontWeight
                        }}
                        onInput={e => this.props.onTextInput(e, this.props.elementId)}>
                    </p>
                )
            case 'image': 
                return(
                    <img
                        src={this.props.element.imgSrc}
                        className={classes.Image}
                        id={`${this.props.elementId}-image`}
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
        e.preventDefault();
        e.stopPropagation(); 
        this.props.rectangleMouseDown(e, this.props.elementId);
    }

    normalCkick = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        this.props.select(e, this.props.elementId);
    }


    render() {  
        let styleClasses = [classes.Rectangle];
        if(this.props.selected) styleClasses.push(classes.Selected);
        if(this.highlighed()) styleClasses.push(classes.highlight);
        return(
                <div className={styleClasses.join(' ')}
                    onClick={this.normalCkick}
                    onDoubleClick={this.props.element.type === 'text' ? this.props.selectAndEdit : this.props.select }
                    onMouseDown={this.mouseDown}
                    style={this.getStyles()}
                >
                    {this.getContent()}
                    {this.getResizeHandlers()}
                </div>
        )
    }
}

export default Rectangle;