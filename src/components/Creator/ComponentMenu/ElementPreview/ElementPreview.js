import React, { Component } from 'react';
import classes from './ElementPreview.module.css';

class ElementPreview extends Component {

    clicked = () => {
        const elements = this.props.element.elements.map(e => { 
            return {...e, elementId: `${Date.now()}-${e.elementId}`}
        })
        console.log(elements)
        //this.props.addElements(elements); 
    }

    mouseDown = (e) => {
        this.props.grabNewElement(this.props.element.elements, this.props.element.preview, e)
    }

    getContent = () => {
        switch(this.props.element.type){
            case 'meme': 
                return <img draggable="false" className={classes.Preview} src={this.props.element.preview}/>
            case 'shape':
                return this.props.element.preview
            default:
                return null;
        }
    }

    getClasses = () => {
        let classesArr = [classes.ElementPreview];
        if(this.props.element.type === 'shape'){
            classesArr.push(classes.smallPreview)
        }
        return classesArr.join(' ');
    }

    render(){
        return(
            <div 
                className={this.getClasses()} 
                onClick={this.clicked}
                onMouseDown={this.mouseDown}
            >
                {this.getContent()}
            </div>
        )
    }
}

export default ElementPreview; 