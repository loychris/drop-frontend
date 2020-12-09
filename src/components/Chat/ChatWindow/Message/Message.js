import React, { Component } from "react";

import Sender from './Sender/Sender';
import classes from "./Message.module.css";

class Message extends Component {
  render() {
    let styleClasses = [classes.MessageContainer];
    styleClasses.push(this.props.sent ? classes.SentMsg : classes.ReceivedMsg);

    return (
      <div className={`${classes.Message} ${this.props.sent ? classes.Sent : classes.Received} `}>
        {/* <Sender sender={this.props.sender}/> */}
        <div className={styleClasses.join(" ")}>
          <p className={classes.Text}>{this.props.text}</p>
          {/* <span className={classes.Time}>{new Date(this.props.time).getHours()}</span> */}
        </div>
      </div>

    );
  }
}

export default Message;
