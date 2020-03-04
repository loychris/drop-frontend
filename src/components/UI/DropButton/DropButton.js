import React, { Component } from 'react';
import classes from './DropButton.module.css';
class DropButton extends Component {
    render() {
        const styleClasses = [classes.DropButton, this.props.active ? 'active' : 'disabled'];
        return(
            <div className={styleClasses.join(' ')} onClick={this.props.clicked}>
                {this.props.children}
            </div>
        )
    }
}

export default DropButton;