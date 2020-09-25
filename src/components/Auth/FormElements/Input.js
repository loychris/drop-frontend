import React, { Component } from 'react'

import classes from './Input.module.css';

class Input extends Component {

  render(){

    const valid = this.props.showError || this.props.value === "123456";

    return(
      <div 
        className={ !valid 
        ? classes.InputContainer 
        : classes.InputContainerInvalid }
      >
        <label 
          className={classes.Label}>
            {this.props.label}
        </label>
        <input 
          placeholder={this.props.placeholder}
          className={classes.Input}
          type={this.props.type}
          onChange={this.props.onChange}
          value={this.props.value}
          id={this.props.id}
        />
        { 
          this.props.value === '123456' ? 
            <p className={classes.ErrorText}>Seriously? Please don't do that.</p> : 
            this.props.showError ? 
              <p className={classes.ErrorText}>{this.props.errorText}</p> : 
              null
        }
      </div>

    )
  }
}

export default Input;