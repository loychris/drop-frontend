import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from './FormElements/Input';
import Button from './FormElements/Button';

import * as authActions from '../../store/actions/index';
import classes from './Auth.module.css';

class Auth extends Component {

  state = {
    isLogin: true,
    name: {
      value: '',
      touched: false,
      valid: false
    },
    password: {
      value: '',
      touched: false,
      valid: false
    },
    email: {
      value: '',
      touched: false,
      valid: false
    },
    handle: {
      value: '',
      touched: false,
      valid: false
    }
  }


  switchModeHandler = () => {
    if(!this.state.isLogin){
      this.setState({
          isLogin: true
      })
    }else {
      this.setState({
        isLogin: false
      })
    }
  }

  signupHandler = (event) => {
    event.preventDefault();
    console.log(`
      SIGNING UP 
      ${this.state.name.value},
      ${this.state.password.value},
      ${this.state.email.value},
      ${this.state.handle.value}
    `)
  }

  loginHandler = (event) => {
    event.preventDefault();
    axios.post(
      '/api/users/login', 
      JSON.stringify({
          identification: this.state.email.value,
          password: this.state.password.value
      }), {
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      console.log(res.data);
      this.props.onCloseAuth();
    }).catch(err => {
      console.log('ERRRRRRRRROR', err)
    })
    console.log(`
      LOGGING IN 
      ${this.state.email.value},
      ${this.state.password.value}
    `)
  }

  onInputPassword = (event) => {
    this.setState({ 
      password: {
        value: event.target.value,
        touched: true,
        valid: this.validatePassword(event.target.value)
      }
    })
  }

  onInputName = (event) => {
    this.setState({ 
      name: {
        value: event.target.value,
        touched: true,
        valid: this.validateName(event.target.value)
      }
    })
  }

  onInputHandle = (event) => {
    this.setState({ 
      handle: {
        value: event.target.value,
        touched: true,
        valid: this.validateHandle(event.target.value)
      }
    })  
  }

  onInputEmail = (event) => {
    this.setState({ 
      email: {
        value: event.target.value,
        touched: true,
        valid: this.validateEmail(event.target.value)
      }
    })  }

  validatePassword = (password) => {
    return password ? password.length >= 5 : false
  }

  validateName = (name) => {
    return name ? name.length >= 4 : false
  }

  validateEmail = (email) => {
    return email ? /^\S+@\S+\.\S+$/.test(email) : false
  }

  validateHandle = (handle) => {
    return handle ? /^@?(\w){1,15}$/.test(handle) : false
  }

  formStateValid = () => {
    if(this.state.isLogin){
      return this.state.email.valid && this.state.password.valid
    }else{
      return this.state.email.valid
      && this.state.password.valid
      && this.state.handle.valid 
      && this.state.name.valid
    }
  }

  getSignupForm = () => {
    return(
      <form onSubmit={this.signupHandler} className={classes.form}>
        <Input 
            className={classes.Input}
            id="name" 
            label="full name"
            type="text"
            value={this.state.name.value}
            onChange={this.onInputName}
            showError={this.state.name.touched && !this.state.name.valid} 
            errorText="Please enter your full name. At least 4 Characters"
        />
        <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            value={this.state.email.value}
            onChange={this.onInputEmail}
            showError={this.state.email.touched && !this.state.email.valid} 
            errorText="Please enter a valid email address."
        />
        <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            value={this.state.password.value}
            onChange={this.onInputPassword}
            showError={this.state.password.touched && !this.state.password.valid} 
            errorText="Please enter a valid password, at least 5 characters."
        />
        <Input
            element="input"
            id="handle"
            type="text"
            label="Handle"
            value={this.state.handle.value}
            onChange={this.onInputHandle}
            showError={this.state.handle.touched && !this.state.handle.valid} 
            errorText="Please enter a valid handle, at least 4 characters."
        />
        <Button type="submit" disabled={!this.formStateValid()}>
            SIGNUP
        </Button>
      </form>
    )
  }

  getLoginForm = () => {
    return(
      <form onSubmit={this.loginHandler} className={classes.form}>
        <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            value={this.state.email.value}
            onChange={this.onInputEmail}
            showError={this.state.email.touched && !this.state.email.valid} 
            errorText="Please enter a valid email address."
        />
        <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            value={this.state.password.value}
            onChange={this.onInputPassword}
            showError={this.state.password.touched && !this.state.password.valid} 
            errorText="Please enter a valid password, at least 5 characters."
        />
        <Button type="submit" disabled={!this.formStateValid()}>
            LOGIN
        </Button>
      </form>
    )
  }

  render() {
    console.log("VALID", this.formStateValid())
    return (
      <div className={this.props.authOpen ? null: classes.hidden}>
          <div className={classes.backDrop}></div>
          <div className={classes.login}>
              <h2>Login Required</h2>
              <hr />
              {this.state.isLogin ? this.getLoginForm() : this.getSignupForm() }
              <Button inverse onClick={this.switchModeHandler}>{this.state.isLogin ? 'CREATE AN ACCOUNT' : 'ALREADY HAVE AN ACCOUNT'}</Button>
          </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseAuth: () => dispatch(authActions.closeAuth())
  }
}

const mapStateToProps = state => {
  return {
    authOpen: state.ui.authOpen
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
