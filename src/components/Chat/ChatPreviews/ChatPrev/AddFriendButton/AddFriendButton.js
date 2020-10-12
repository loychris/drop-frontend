import React, { Component } from 'react';
import classes from './AddFriendButton.module.css';

class AddFriendButton extends Component {

    render(){
        if(this.props.sending)return <div className={classes.AddFriendButton}>...sending</div>
        if(this.props.sent) return <div className={classes.AddFriendButton}>sent</div>
        return <button className={classes.AddFriendButton} onClick={this.props.clicked}>Add</button>
    }
}

export default AddFriendButton;