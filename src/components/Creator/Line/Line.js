import React, { Component } from 'react';
import classes from './Line.module.css';


class Line extends Component {


    render() {
        return(
            <div 
                className={this.props.left === 0 ? classes.HL : classes.VL}
                style={{
                    top: `${this.props.top}px`,
                    left: `${this.props.left}px`
                }}>    
            </div>
        )
    }
}

export default Line;