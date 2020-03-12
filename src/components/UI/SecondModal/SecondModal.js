import React, { Component } from 'react';

import classes from './SecondModal.module.css';

class SecondModal extends Component {

    componentDidUpdate(){
        console.log('updated SecondModal');
    }

    shouldComponentUpdate(){
        return this.props.show === true;
    }

    render(){
        return(
            <div className={classes.SecondModal}
            style={{
                backgorundColor: '#000a2f',
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
        </div>)
    }
}

export default SecondModal;