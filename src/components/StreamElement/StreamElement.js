import React, { Component } from 'react';
import classes from './StreamElement.module.css';
import { anyTypeAnnotation } from '@babel/types';


class StreamElement extends Component {
    
    calcStyles(pos){
        const orgHeight = 600;
        const distance = 100 + 20 * pos;
        const projDistance = 50;
        const deg = 2 * Math.atan(orgHeight/ 2 * distance);
        const projHeight = Math.abs(2 * projDistance * Math.tan((deg/2)));
        console.log(projHeight);
        const styles = {
            marginTop: 1000 / (pos / 4 + 5) ,
            width: 800 - pos * 20, 
            height: 600
        };
        return styles; 
    }

    render(){

        return(
            <div 
                className={classes.StreamElement}
                style={this.calcStyles(this.props.position)}>
                    <img src="" className={classes.pic}/>
            </div>
        )
    }
}

export default StreamElement;