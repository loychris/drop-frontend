import React, { Component } from 'react';
import classes from './DropButton.module.css';
class DropButton extends Component {
    render() {
        return(
            <div className={classes.DropButton} onClick={this.props.clicked}>
                {this.props.children}
            </div>
        )
    }
}

export default DropButton;