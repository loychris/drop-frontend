import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from './FormElements/Input';
import Button from './FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../util/validators';

import * as actions from '../../store/actions/auth';
import { useForm } from './form-hook';
import classes from './Auth.module.css';

const Auth = () => {
  const [isLogin, setLogin] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

    const switchModeHandler = () => {
      if(!isLogin){
        setFormData(
          {
            ...formState.inputs,
            name: undefined
          }, 
          formState.inputs.email.isValid && formState.inputs.password.isValid
        )
      }else {
        setFormData({
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        }, false);
      }
      setLogin(prevMode => !prevMode)
    }

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    props.onAuth('abd@gmail.com', "passssswird")
  };

  return (
    <div>
        <div className={classes.backDrop}></div>
        <div className={classes.login}>
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler} className={classes.form}>
            {!isLogin && <Input element="input" id="name" type="text" label="Name" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler}/>}
            <Input
                element="input"
                id="email"
                type="email"
                label="E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
            />
            <Input
                element="input"
                id="password"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid password, at least 5 characters."
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                {isLogin ? 'LOGIN' : 'SIGNUP'}
            </Button>
            </form>
  <Button inverse onClick={switchModeHandler}>SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}</Button>
        </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  }
}

export default connect(null, mapDispatchToProps)(Auth);
