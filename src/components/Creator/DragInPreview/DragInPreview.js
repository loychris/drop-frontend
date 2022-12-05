import React, { Component } from 'react'; 
import classes from './DragInPreview.module.css';

class DragInPreview extends Component {

    render(){
        const { x, y, height, width, preview } = this.props.dragInElement;
        const styles = { left: x, top: y, width, height }
        return(
            <div className={classes.DragInPreview} style={styles}>
                <img src={preview} className={classes.preview}/>
            </div>
        )
    }
}

export default DragInPreview; 