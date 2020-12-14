import React, { Component } from "react";
import axios from 'axios';

import Sender from './Sender/Sender';
import classes from "./Message.module.css";

import StupidFuckingFace from '../../../../media/stupidfuckingface.jpeg';

class Message extends Component {

  state = {drop: null}

  componentDidMount = () => {
    if(this.props.type === 'drop'){
      const url = `/api/drop/${this.props.dropId}`;
      axios.get(url)
      .then(res => {
        this.setState({drop: res.data})
      }).catch(err => {
        console.log(err);
      })
    }
  }
  

  getMessage = () => {
    switch(this.props.type){
      case 'text': return <p className={classes.Text}>{this.props.text}</p>
      case 'image': return ([
        <img className={classes.Image} /*src={this.props.src}*/ src={StupidFuckingFace} alt='' key='image' />,
        this.props.text ? <p className={classes.Text} key='description'>{this.props.text}</p> : null
      ])
      case 'drop': return [
        this.state.drop ? <p className={classes.Text} key='title'>{this.state.drop.title}</p> : null, 
        <img className={classes.Drop} src={`https://storage.googleapis.com/drop-meme-bucket/meme-${this.props.dropId}`} alt='' key='drop'/>
      ]
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
