import React, { Component } from 'react';
import ResizeHandler from '../Element/ResizeHandler/ResizeHandler';
import classes from './SelectionFrame.module.css';

class SelectionFrame extends Component {


    getResizeHandlers = () => {
        let resizeHandlers = [];
        if(this.props.editingId) return null; 
        if(this.props.element.type === 'text' && !this.props.element.fixedDimensions){
                resizeHandlers.push('W','E');
        } else {
            resizeHandlers.push('NW','SW','NE','SE');
            if(this.props.element.height > 30){
                resizeHandlers.push('E','W');
            }
            if(this.props.element.width > 30){
                resizeHandlers.push('N','S');
            }
        } 
        return resizeHandlers.map(r => {
            return (
                <ResizeHandler 
                    key={r} 
                    dir={r} 
                    elementId={this.props.element.elementId} 
                    resizeMouseDown={this.props.resizeMouseDown}
                />
            )
        });
    }

    doubleClick = e => {
        if(this.props.element.type === 'text'){
            this.props.selectAndEdit(e, this.props.element.elementId)
        }
    }

    getStyles = () => {
        const { height, width, posX, posY, rotation } = this.props.element;
        const { offsetX, offsetY } = this.props.perspective;
        let styles = {
            height: `${height}px`, 
            width: `${width}px`,
            left: `${posX + offsetX}px`,
            top: `${posY + offsetY}px`,
            transform: `rotate(${rotation}deg)`,
        }
        if(this.props.editingId){
            styles.pointerEvents = 'none'; 
        }else {
            styles.cursor = 'grab';
        }
        return styles; 
    }

    onMouseDown = (e) => {
        if(this.props.editingId !== this.props.element.elementId){
            this.props.elementMouseDown(e, this.props.element.elementId)
        }
    }

    render(){
        return(
            <div 
                className={classes.SelectionFrame} 
                style={this.getStyles()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.mouseUp}
                onDoubleClick={this.doubleClick}
                >
                {this.getResizeHandlers()}
            </div>           
        );
    }
}

export default SelectionFrame;