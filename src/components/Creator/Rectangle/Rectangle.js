import React, { Component } from 'react';

import * as classes from './Rectangle.module.css';



class Rectangle extends Component {

    state = {
        selected: false,
        height: 200,
        width: 200, 
        posX: 200,
        posY: 200,

        text: 'oergnoiwrfgew',
    }

    componentDidMount = () => {
        if(this.props.type === 'text'){
            const elem = document.getElementById(`${this.props.elementId}-input`);
            elem.innerHTML = this.state.text;
            this.setState({height: elem.offsetHeight})
        }
    }

    componentDidUpdate = () => {
        if(this.props.type === 'text' && this.props.currentlyEditing){
            const elem = document.getElementById(`${this.props.elementId}-input`);
            elem.focus(); 
        }
    }

    onTextInput = (e) => {
        console.log("onTextInput");
        this.setState({text: e.target.innerHTML});
        const elem = document.getElementById(`${this.props.elementId}-input`);
        this.setState({height: elem.offsetHeight})
    }

    onTextFocus = () => {
        console.log('onTextFocus'); 
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

    onTextClick = (e) => {
        e.stopPropagation();
    }

    rectangleMouseDown = e => {
        console.log('Rectangle mousedown'); 
        e.preventDefault();
        e.stopPropagation();
        this.props.select(e, this.props.elementId);
        const prevX = this.state.posX - e.clientX;
        const prevY = this.state.posY - e.clientY;
        const mousemove = (e) => {
            console.log('Rectangle mousemove'); 
            const newX = prevX + e.clientX;
            const newY = prevY + e.clientY;
            this.setState({posX: newX, posY: newY})
        }
        const mouseup = (e) => {
            console.log('Rectangle mouseup'); 
            e.preventDefault();
            e.stopPropagation();
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);
        }
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);
    }

    
    resizeMouseDown = (e, dir) => {
        e.preventDefault();
        e.stopPropagation(); 
        const prevWidth = this.state.width;
        const prevHeight = this.state.height;
        const prevLeft = this.state.posX;
        const prevTop = this.state.posY;

        const mouseStartX = e.clientX;
        const mouseStartY = e.clientY;

        const resizeMouseMouve = (e) => {
            let newWidth = prevWidth;
            let newHeight = prevHeight;
            let newLeft = prevLeft;
            let newTop = prevTop;

            const diffX = e.clientX - mouseStartX;
            const diffY = e.clientY - mouseStartY;

            switch(dir) {
                case 'E': 
                    newWidth += diffX;
                    break;
                case 'S': 
                    newHeight += diffY; 
                    break; 
                case 'W': 
                    newWidth -= diffX;
                    newLeft += diffX;
                    break;    
                case 'N': 
                    newHeight -= diffY;
                    newTop += diffY;
                    break;                 
                case 'SE':
                    newWidth += diffX; 
                    newHeight += diffY; 
                    break; 
                case 'NE':
                    newWidth += diffX; 
                    newHeight -= diffY; 
                    newTop += diffY; 
                    break; 
                case 'SW':
                    newWidth -= diffX; 
                    newHeight += diffY; 
                    newLeft += diffX; 
                    break;
                case 'NW':
                    newWidth -= diffX; 
                    newHeight -= diffY; 
                    newLeft += diffX; 
                    newTop += diffY; 
                    break; 
                default: console.log('Invalid dir', dir)
            }
            const elem = document.getElementById(`${this.props.elementId}-input`);
            this.setState({
                width: newWidth, 
                height: this.props.type==='text' ? elem.offsetHeight : newHeight,
                posX: newLeft,
                posY: newTop,
            })
        }
        const mouseup = (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            console.log('removing Listener: ', dir);
            window.removeEventListener('mousemove', resizeMouseMouve);
            window.removeEventListener('mouseup', mouseup);
        }
        console.log('adding   Listener: ', dir);

        window.addEventListener('mousemove', resizeMouseMouve);
        window.addEventListener('mouseup', mouseup);
    }

    getResizeHandlers = () => {
        if(!this.props.selected) return null;
        let resizeHandlers = [
            <div key={`${this.props.elementId}-NW`} className={`${classes.Corner} ${classes.NW}`} onMouseDown={(e) => this.resizeMouseDown(e, 'NW')}></div>,
            <div key={`${this.props.elementId}-SW`} className={`${classes.Corner} ${classes.SW}`} onMouseDown={(e) => this.resizeMouseDown(e, 'SW')}></div>,
            <div key={`${this.props.elementId}-NE`} className={`${classes.Corner} ${classes.NE}`} onMouseDown={(e) => this.resizeMouseDown(e, 'NE')}></div>,
            <div key={`${this.props.elementId}-SE`} className={`${classes.Corner} ${classes.SE}`} onMouseDown={(e) => this.resizeMouseDown(e, 'SE')}></div>,
            <div key={`${this.props.elementId}-E`} className={`${classes.Edge} ${classes.E}`} onMouseDown={(e) => this.resizeMouseDown(e, 'E')}></div>,
            <div key={`${this.props.elementId}-W`} className={`${classes.Edge} ${classes.W}`} onMouseDown={(e) => this.resizeMouseDown(e, 'W')}></div>,
        ]
        if(this.props.type !== 'text'){
            resizeHandlers.push(<div key={`${this.props.elementId}-N`} className={`${classes.Edge} ${classes.N}`} onMouseDown={(e) => this.resizeMouseDown(e, 'N')}></div>);
            resizeHandlers.push(<div key={`${this.props.elementId}-S`} className={`${classes.Edge} ${classes.S}`} onMouseDown={(e) => this.resizeMouseDown(e, 'S')}></div>);
        }
        return resizeHandlers
    }

    getStyles = () => {
        return {
            height: `${this.state.height}px`, 
            width: `${this.state.width}px`,
            left: `${this.state.posX}px`,
            top: `${this.state.posY}px`,
        }
    }

    getTextInput = () => {
        if(this.props.type !== 'text') return null;
        return(
            <p
                contentEditable={this.props.currentlyEditing}
                type='text' 
                id={`${this.props.elementId}-input`}
                className={classes.TextInput} 
                onClick={this.onTextClick}
                onDoubleClick={(e) => this.props.selectAndEdit(e, this.props.elementId)}
                onFocus={this.onTextFocus}
                onInput={this.onTextInput}>
            </p>
        )
    }

    render() {  
        let styleClasses = [classes.Rectangle];
        if(this.props.selected) styleClasses.push(classes.Selected);
        return(
                <div className={styleClasses.join(' ')}
                    onMouseDown={!this.props.currentlyEditing ? this.rectangleMouseDown : null}
                    onClick={this.rectangleClick}
                    style={this.getStyles()}
                >
                    {this.getTextInput()}
                    {this.getResizeHandlers()}
                </div>
        )
    }
}

export default Rectangle;