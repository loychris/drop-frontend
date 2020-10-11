import React, { Component } from "react";

import DefaultProfilePic from '../../../media/DefaultProfilePic.png';
import classes from "./Message.module.css";

class Message extends Component {
  render() {
    let styleClasses = [classes.MessageContainer];
    styleClasses.push(this.props.sent ? classes.SentMsg : classes.ReceivedMsg);

    return (
      <div className={`${classes.Message} ${this.props.sent ? classes.Sent : classes.Received} `}>
        <div className={classes.Sender}>
          <img src={DefaultProfilePic} alt=" "  className={classes.ProfilePic}/>
          <div className={classes.SenderName}>{this.props.sender}</div>
        </div>
        <div className={styleClasses.join(" ")}>
          <p className={classes.MessageBody}>{this.props.message}</p>
          <span className={classes.Time}>{this.props.time}</span>
        </div>
      </div>

    );
  }
}

export default Message;
