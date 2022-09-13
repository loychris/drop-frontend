import React, { Component } from 'react';
import classes from './Line.module.css';


class Line extends Component {


    render() {
        const { offsetX, offsetY } = this.props.perspective; 
        const horizontal = this.props.left === 0;
        return(
            <div 
                className={horizontal ? classes.HL : classes.VL}
                style={{
                    top: horizontal ? `${this.props.top + offsetY}px` : '0',
                    left: !horizontal ? `${this.props.left + offsetX}px` : '0'
                }}>    
            </div>
        )
    }
}

export default Line;