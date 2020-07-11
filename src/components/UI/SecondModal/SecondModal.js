import React, { Component } from 'react';

import classes from './SecondModal.module.css';

class SecondModal extends Component {

    render(){
        return(
            <div className={classes.SecondModal}>
            {this.props.children}
        </div>)
    }
}

export default SecondModal;