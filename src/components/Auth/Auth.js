import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

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
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin }
    })
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
    })  
  }

  validatePassword = (password) => {
    return password && password !== '123456' ? password.length >= 5 : false
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

  submitHandler = (event) => {
    event.preventDefault();
    if(this.state.isLogin){
      this.props.onLogin(this.state.email.value, this.state.password.value);
    }
    else{
      this.props.onSignup(this.state.name.value, this.state.email.value, this.state.handle.value, this.state.password.value);
    }
  }

  getSignupForm = () => {
    if(this.props.loading){
      return <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/>    
    }
    return(
      <form onSubmit={this.submitHandler} className={classes.form}>
        <Input 
            className={classes.Input}
            id="name" 
            label="Full Name"
            placeholder="Elon Musk"
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
            placeholder="Elon@musk.com"
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
            placeholder="123456"
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
            placeholder="@elon"
            value={this.state.handle.value}
            onChange={this.onInputHandle}
            showError={this.state.handle.touched && !this.state.handle.valid} 
            errorText="Please enter a valid handle, at least 4 characters."
        />
        <Button type="submit" disabled={!this.formStateValid()}>
            SIGNUP
        </Button>
        Already have an account? <span className={classes.switchMode} onClick={this.switchModeHandler}> LOG IN!</span>
      </form>
    )
  }

  getLoginForm = () => {
    if(this.props.loading){
      return <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/>    
    }
    return(
      <form onSubmit={this.submitHandler} className={classes.form}>
        <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            placeholder="fuck@zuck.com"
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
            placeholder="123456"
            value={this.state.password.value}
            onChange={this.onInputPassword}
            showError={this.state.password.touched && !this.state.password.valid} 
            errorText="Please enter a valid password, at least 5 characters."
        />
        <Button type="submit" disabled={!this.formStateValid()}>
            LOGIN
        </Button>

        Dont have an Account?   <span className={classes.switchMode} onClick={this.switchModeHandler}> SIGN UP!</span>

      </form>
    )
  }

  render() {
    let errorMessage = this.props.error ? <p className={classes.errorMessage}>{this.props.error}</p> : null;
    return (
      <div>
          <div className={classes.Backdrop} onClick={this.props.onCloseAuth}></div>
          {/* <Backdrop clicked={this.props.onCloseAuth} zIndex='100' />  */}
          <div className={classes.login}>
          <h2>{this.props.authReason}</h2>
              <hr/>
              {errorMessage}
              {this.state.isLogin ? this.getLoginForm() : this.getSignupForm() }
          </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(authActions.login(email, password)),
    onSignup: (name, email, handle, password) => dispatch(authActions.signup(name, email, handle, password)),
    onCloseAuth: () => dispatch(authActions.closeAuth())
  }
}

const mapStateToProps = state => {
  return {
    authOpen: state.auth.authOpen,
    loading: state.auth.loading,
    error: state.auth.error,
    authReason: state.auth.authReason
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
