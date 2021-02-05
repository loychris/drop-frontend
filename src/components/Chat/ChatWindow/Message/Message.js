import React, { Component } from "react";
import axios from 'axios';

import classes from "./Message.module.css";

import StupidFuckingFace from '../../../../media/stupidfuckingface.jpeg';

class Message extends Component {

  

  getMessage = () => {
    switch(this.props.type){
      case 'text': return <p className={classes.Text}>{this.props.text}</p>
      case 'image': return ([
        <img className={classes.Image} /*src={this.props.src}*/ src={StupidFuckingFace} alt='' key='image' />,
        this.props.text ? <p className={classes.Text} key='description'>{this.props.text}</p> : null
      ])
      case 'drop': 
        console.log("DROP MESSAGE");
        return ( 
          <div>
            {this.props.title ? <p className={classes.Text}>{this.props.title}</p> : null }
            <img className={classes.Drop} src={`https://storage.googleapis.com/drop-meme-bucket/meme-${this.props.dropId}`} alt='there was a problem' key='drop'/>
          </div>
        )
      default: return null
    }
  }

  render() {
    const containerStyleclasses = [classes.MessageContainer];
    if(this.props.sent){
      containerStyleclasses.push(classes.Sent);
    }else{
      containerStyleclasses.push(classes.Received);
    }
    if(this.props.sending){
      containerStyleclasses.push(classes.Sending);
    }
    if(this.props.messageNew){
      containerStyleclasses.push(classes.New);
    } 
    return (
      <div className={containerStyleclasses.join(' ')}>
        {/* <Sender sender={this.props.sender}/> */}
        <div className={classes.Message}>
          {this.getMessage()}
          {/* <span className={classes.Time}>{new Date(this.props.time).getHours()}</span> */}
        </div>
      </div>
    );
  }
}



export default Message;
