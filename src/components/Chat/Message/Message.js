import React, { Component } from 'react';
import classes from './Message.module.css';

class Message extends Component {
    render() {

        let styleClasses = [classes.Message];
        styleClasses.push(this.props.user 
            ? classes.UserMsg 
            : classes.OtherMsg);

        console.log(this.props);
        

        return(
            <div className={styleClasses.join(' ')}>
                {this.props.message}
            </div>
        )
    }
}

export default Message; 