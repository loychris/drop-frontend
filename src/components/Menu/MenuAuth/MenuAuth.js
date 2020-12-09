import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../Auth/FormElements/Input';
import classes from './MenuAuth.module.css';
import * as actions from '../../../store/actions/index';

class MenuAuth extends Component {

    state = {
        password: {
          value: '',
          touched: false,
          valid: false
        },
        email: {
          value: '',
          touched: false,
          valid: false
        }
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


    onInputEmail = (event) => {
        this.setState({ 
        email: {
            value: event.target.value,
            touched: true,
            valid: this.validateEmail(event.target.value)
        }
        })  
    }

    validateEmail = (email) => {
        return email ? /^\S+@\S+\.\S+$/.test(email) : false
    }

    validatePassword = (password) => {
        return password && password !== '123456' ? password.length >= 5 : false
    }

    submitHandler = (event) => {
        if(this.state.isLogin) {
            this.props.onLogin(this.state.email.value, this.state.password.value);
        }
    }


    render() {
        return (
            <div className={classes.MenuAuth}>
            <Input
                element="input"
                id="email"
                type="email"
                label="E-Mail"
                placeholder="Elon@musk.com"
                value={this.state.email.value}
                onChange={this.onInputEmail}
                showError={this.state.email.touched && !this.state.email.valid} 
                errorText="Please enter a valid email address."/>
            <Input
                element="input"
                id="password"
                type="password"
                label="Password"
                placeholder="123456"
                value={this.state.password.value}
                onChange={this.onInputPassword}
                showError={this.state.password.touched && !this.state.password.valid} 
                errorText="Please enter a valid password, at least 5 characters."/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuAuth);


