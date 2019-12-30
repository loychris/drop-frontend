import React, { Component } from 'react';
import classes from './DropButton.module.css';
import LogoForButton from './LogoForButton.png';
class DropButton extends Component {
    render() {
        return(
            <div className={classes.DropButton}
                 onClick={this.props.clicked}>
                <img src={LogoForButton} className={classes.LogoForButton} alt='Logo For Button'/>
                {this.props.children}
            </div>
        )
    }
}

export default DropButton;