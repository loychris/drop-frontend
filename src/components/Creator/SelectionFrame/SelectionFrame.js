import React, { Component } from 'react';
import ResizeHandler from '../Element/ResizeHandler/ResizeHandler';
import classes from './SelectionFrame.module.css';

class SelectionFrame extends Component {


    getResizeHandlers = () => {
        let resizeHandlers = [];
        if(this.props.element.type === 'text' && this.props.element.fixedWidth){
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

    getStyles = () => {
        const { height, width, posX, posY } = this.props.element;
        return {
            height: `${height}px`, 
            width: `${width}px`,
            left: `${posX}px`,
            top: `${posY}px`,
        }
    }

    render(){
        return(
            <div 
                className={classes.SelectionFrame} 
                style={this.getStyles()}
                onMouseDown={(e) => this.props.elementMouseDown(e, this.props.element.elementId)}>
                {this.getResizeHandlers()}
            </div>           
        );
    }
}

export default SelectionFrame;