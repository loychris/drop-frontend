import React, { Component } from 'react';
import classes from './ResizeHandler.module.css';


class ResizeHandler extends Component {

    getStyleClasses = () => {
        let styles = [this.props.dir.length > 1 ? classes.Corner : classes.Edge];
        switch(this.props.dir){ 
            case 'NW': styles.push(classes.NW);break;
            case 'NE': styles.push(classes.NE);break;
            case 'SW': styles.push(classes.SW);break;
            case 'SE': styles.push(classes.SE);break;
            case 'N': styles.push(classes.N);break;
            case 'W': styles.push(classes.W);break;
            case 'S': styles.push(classes.S);break;
            case 'E': styles.push(classes.E);break;
        }
        return styles;
    } 


    render() {
        return(
            <div 
                className={this.getStyleClasses().join(' ')} 
                onMouseDown={e => this.props.mouseDown(e, this.props.dir, this.props.elementId)}>
            </div>
        )
    }
}

export default ResizeHandler;