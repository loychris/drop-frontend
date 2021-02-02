import React, { Component } from "react";
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import TakTakTak from '../../media/taktaktak.jpg';
import * as actions from '../../store/actions/index';
import Checkmark from './Checkmark.svg';
import classes from "./Creator.module.css";

class Creator extends Component {

  state = {
    value: '',
    touched: false,
    valid: false,
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
    if(this.state.valid){
      console.log('Sending ', this.state.value);
      this.props.onSubscribeEmailList(this.state.value); 
    }

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
        {!this.props.sent ? <h2><b>Join Waiting List</b> and <b>get EARLY ACCESS</b></h2> : null }
        <div className={classes.SendingWrapper}>
          <div>
            { this.props.sending ? <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/> : null }
            { this.props.sent ? <img className={classes.Checkmark} src={Checkmark} alt='Checkmark'/> : null }
          </div>
          { !this.props.sent ? <div className={`${classes.Form} ${this.props.sending ? classes.Sending: null}`}>
            <input 
                value={this.state.value} 
                onChange={this.onInputEmail} 
                placeholder='elon@musk.com' type="email"/>
            <div className={`${classes.SendButton} ${this.state.valid ? null : classes.Disabled}`} onClick={this.onSendEmail}>Join Waiting List </div>
          </div> : null}
        { this.props.emailListError ? <div className={classes.ErrorMessage}>{this.props.emailListError}</div>: null }
        </div>
        <br/>
        <br/>
        <br/>
        {
          this.props.sent 
          ? <div>
              <img alt="taktaktak"  className={classes.TakTakTak} src={TakTakTak}/>
              <p>Working all day and night to make it happen</p>
            </div>
          : null 
          }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    darkmode: state.ui.currentTab,

    sending: state.user.sendingSubscribeEmailList, 
    sent: state.user.sentSubscribeEmailList, 
    emailListError: state.user.emailListError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubscribeEmailList: (email) => dispatch(actions.subscribeEmailList(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
