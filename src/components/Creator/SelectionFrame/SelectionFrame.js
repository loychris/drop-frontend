import React, { Component } from 'react';
import ResizeHandler from '../Element/ResizeHandler/ResizeHandler';
import classes from './SelectionFrame.module.css';

class SelectionFrame extends Component {


    getResizeHandlers = () => {
        let resizeHandlers = [];
        if(this.props.editingId) return null; 
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

    doubleClick = e => {
        console.log("DOUBLE CLICK REGISTERED")
        if(this.props.element.type === 'text'){
            this.props.selectAndEdit(e, this.props.element.elementId)
        }
    }

    getStyles = () => {
        const { height, width, posX, posY } = this.props.element;
        let styles = {
            height: `${height}px`, 
            width: `${width}px`,
            left: `${posX}px`,
            top: `${posY}px`,
        }
        if(this.props.editingId){
            styles.pointerEvents = 'none'; 
        }else {
            styles.cursor = 'grab';
        }
        return styles; 
    }

    render(){
        return(
            <div 
                className={classes.SelectionFrame} 
                style={this.getStyles()}
                onMouseDown={(e) => this.props.elementMouseDown(e, this.props.element.elementId)}
                onDoubleClick={this.doubleClick}
                >
                {this.getResizeHandlers()}
            </div>           
        );
    }
}

export default SelectionFrame;