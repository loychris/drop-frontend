import React, { Component } from 'react';
import classes from './MemePreview.module.css';

class MemePreview extends Component {

    clicked = () => {
        const elements = this.props.meme.elements.map(e => { 
            return {...e, elementId: `${Date.now()}-${e.elementId}`}
        })
        console.log(elements)
        //this.props.addElements(elements); 
    }

    mouseDown = (e) => {
        this.props.grabNewElement(this.props.meme.elements, this.props.meme.preview, e)
    }


    render(){
        return(
            <div 
                className={classes.MemePreview} 
                onClick={this.clicked}
                onMouseDown={this.mouseDown}
            >
                <img draggable="false" className={classes.Preview} src={this.props.meme.preview}/>
            </div>
        )
    }
}

export default MemePreview; 