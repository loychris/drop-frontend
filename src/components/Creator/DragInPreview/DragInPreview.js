import React, { Component } from 'react'; 
import classes from './DragInPreview.module.css';

class DragInPreview extends Component {

    render(){
        const { x, y, height, width, preview, id } = this.props.dragInElement;
        console.log("ID: ", id)
        const styles = { left: x, top: y, width, height }
        return(
            <div className={classes.DragInPreview} style={styles}>
                <img src={preview} className={classes.preview} alt={`drag_in_preview_${Date.now()}`}/>
            </div>
        )
    }
}

export default DragInPreview; 