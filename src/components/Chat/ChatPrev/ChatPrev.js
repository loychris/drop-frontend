import React, { Component } from 'react';
import classes from './ChatPrev.module.css';

class ChatPrev extends Component {
    render(){
        return(
            <div className={classes.ChatPrev}>
                <h3>{this.props.name}</h3>
                <p>{this.props.preview}</p>
            </div>
        )
    }
}

export default ChatPrev;