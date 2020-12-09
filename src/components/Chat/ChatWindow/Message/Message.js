import React, { Component } from "react";

import Sender from './Sender/Sender';
import classes from "./Message.module.css";

class Message extends Component {


  getMessage = () => {
    switch(this.props.type){
      case 'text': 
        return(
          <div className={classes.TextMessage}>
              <p className={classes.Text}>{this.props.text}</p>
              {/* <span className={classes.Time}>{new Date(this.props.time).getHours()}</span> */}
          </div>
        )
      case 'image': 
      return(
        <div className={classes.ImageMessage}>
          <img className={classes.Image} src={this.props.src} alt=''/>
          <p className={classes.Text}>{this.props.text}</p>
          {/* <span className={classes.Time}>{new Date(this.props.time).getHours()}</span> */}
        </div>
      )
      case 'drop': 
      return (
        <div className={classes.DropMessage}>
          <img className={classes.Drop} src={this.props.src} alt=''/>
          {/* <span className={classes.Time}>{new Date(this.props.time).getHours()}</span> */}
        </div>
      )
    }
  }

  render() {

    return (
      <div className={`${classes.Message} ${this.props.sent ? classes.Sent : classes.Received} `}>
        {/* <Sender sender={this.props.sender}/> */}
        {this.getMessage()}
      </div>
    );
  }
}

export default Message;
