import React, { Component } from 'react';
import classes from './MemePreview.module.css';

class MemePreview extends Component {
    render(){
        return(
            <div className={classes.MemePreview}>
                <img className={classes.Preview} src={this.props.meme.preview}/>
            </div>
        )
    }
}

export default MemePreview; 