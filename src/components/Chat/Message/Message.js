import React, { Component } from "react";
import classes from "./Message.module.css";

class Message extends Component {
  render() {
    let styleClasses = [classes.MessageContainer];
    styleClasses.push(this.props.sent ? classes.SentMsg : classes.ReceivedMsg);

    let sender = this.props.sent ? (
      []
    ) : (
      <span className={classes.Sender}>{this.props.sender}</span>
    );

    return (
      <div className={styleClasses.join(" ")}>
        {sender}
        <p className={classes.Message}>{this.props.message}</p>
        <span className={classes.Time}>{this.props.time}</span>
      </div>
    );
  }
}

export default Message;
