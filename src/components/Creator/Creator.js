import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from 'react-loader-spinner'

import TakTakTak from './Ri98hoa.jpg';
import Checkmark from './Checkmark.svg';
import classes from "./Creator.module.css";

class Creator extends Component {

  state = {
    value: '',
    touched: false,
    valid: false,
    sending: false, 
    sent: false
  }

  onInputEmail = (event) => { 
    this.setState({ 
      value: event.target.value,
      touched: true,
      valid: this.validateEmail(event.target.value)
    })  
  }

  onSendEmail = (event) => {
    event.preventDefault();
    console.log(this.state.value);
    const route = '/api/list';
    const body = { email: this.state.value };
    const headers = {};
    axios.post( route, body, headers )
  .then(() => this.setState({sending: false, sent: true}))
  .catch(console.log)
  this.setState({sending: true}); 

  }

  validateEmail = (email) => {
    return email ? /^\S+@\S+\.\S+$/.test(email) : false
  }

  render() {
    const styleClasses = [classes.Creator];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeftLeft);
    if (this.props.currentTab === 'chat') styleClasses.push(classes.OutLeft);
    return (
      <div className={styleClasses.join(" ")}>
        <h2 className={classes.Blinking}>COMING SOON: </h2>
        <br/>
        <h2>THE SICKEST MEME CREATOR ON THE INTERNET</h2>
        <br/>
        <br/>
        <h2><b>Join Waiting List</b> and <b>get EARLY ACCESS</b></h2>
        <div className={classes.SendingWrapper}>
          <div>
            { this.state.sending ? <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/> : null }
            { this.state.sent ? <img className={classes.Checkmark} src={Checkmark} alt='Checkmark'/> : null }
          </div>
          { !this.state.sent ? <div className={`${classes.Form} ${this.state.sending ? classes.Sending: null}`}>
            <input 
                value={this.state.value} 
                onChange={this.onInputEmail} 
                placeholder='elon@musk.com' type="email"/>
            <div className={`${classes.SendButton} ${this.state.valid ? null : classes.Disabled}`} onClick={this.onSendEmail}>Join Waiting List </div>
          </div> : null}
        </div>
        <br/>
        <br/>
        <br/>
        {this.state.sent 
          ? <div>
              <p>Working all day and night to make it happen</p>
              <img alt="taktaktak"  className={classes.TakTakTak} src={TakTakTak}/>
            </div>
          : null }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    darkmode: state.ui.currentTab,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
