import React, { Component } from 'react';

import * as classes from './Rectangle.module.css';
import ResizeHandler from './ResizeHandler/ResizeHandler';



class Rectangle extends Component {

    componentDidMount = () => {
        if(this.props.type === 'text'){
            this.props.adjustTextElementHeight(this.props.elementId);
            if(this.props.currentlyEditing){
                this.onTextFocus(); 
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
                console.log(this.props.element.color);
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