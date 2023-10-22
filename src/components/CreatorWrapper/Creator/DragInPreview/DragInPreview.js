import React, { Component } from 'react'; 
import classes from './DragInPreview.module.css';

class DragInPreview extends Component {

    getContent = () => {
        console.log(typeof this.props.dragInElement.preview)
        switch(typeof this.props.dragInElement.preview){
            case 'string': return <img src={this.props.dragInElement.preview} className={classes.preview} alt={`drag_in_preview_${Date.now()}`}/>
            case 'object': return this.props.dragInElement.preview
            default: return null;
        }
    }


    render(){
        const { x, y, height, width, preview, id } = this.props.dragInElement;
        console.log("ID: ", id)
        const styles = { left: x, top: y, width, height }
        return(
            <div className={classes.DragInPreview} style={styles}>
                {this.getContent()}
            </div>
        )
    }
}

export default DragInPreview; 