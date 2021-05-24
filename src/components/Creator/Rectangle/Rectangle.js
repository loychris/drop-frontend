import React, { Component } from 'react';

import * as classes from './Rectangle.module.css';



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
            <div key={`${this.props.elementId}-NW`} className={`${classes.Corner} ${classes.NW}`} onMouseDown={(e) => this.props.resizeMouseDown(e, 'NW', this.props.elementId)}></div>,
            <div key={`${this.props.elementId}-SW`} className={`${classes.Corner} ${classes.SW}`} onMouseDown={(e) => this.props.resizeMouseDown(e, 'SW', this.props.elementId)}></div>,
            <div key={`${this.props.elementId}-NE`} className={`${classes.Corner} ${classes.NE}`} onMouseDown={(e) => this.props.resizeMouseDown(e, 'NE', this.props.elementId)}></div>,
            <div key={`${this.props.elementId}-SE`} className={`${classes.Corner} ${classes.SE}`} onMouseDown={(e) => this.props.resizeMouseDown(e, 'SE', this.props.elementId)}></div>,
            <div key={`${this.props.elementId}-E`} className={`${classes.Edge} ${classes.E}`} onMouseDown={(e) => this.props.resizeMouseDown(e, 'E', this.props.elementId)}></div>,
            <div key={`${this.props.elementId}-W`} className={`${classes.Edge} ${classes.W}`} onMouseDown={(e) => this.props.resizeMouseDown(e, 'W', this.props.elementId)}></div>,
        ]
        if(this.props.type !== 'text'){
            resizeHandlers.push(<div key={`${this.props.elementId}-N`} className={`${classes.Edge} ${classes.N}`} onMouseDown={(e) => this.props.resizeMouseDown(e, 'N', this.props.elementId)}></div>);
            resizeHandlers.push(<div key={`${this.props.elementId}-S`} className={`${classes.Edge} ${classes.S}`} onMouseDown={(e) => this.props.resizeMouseDown(e, 'S')}></div>);
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

    getTextInput = () => {
        if(this.props.type !== 'text') return null;
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
    }

    render() {  
        let styleClasses = [classes.Rectangle];
        if(this.props.selected) styleClasses.push(classes.Selected);
        return(
                <div className={styleClasses.join(' ')}
                    onMouseDown={e => this.props.rectangleMouseDown(e, this.props.elementId)}
                    style={this.getStyles()}
                >
                    {this.getTextInput()}
                    {this.getResizeHandlers()}
                </div>
        )
    }
}

export default Rectangle;