import React, { Component } from 'react'

import classes from './Input.module.css';

class Input extends Component {

  render(){
    return(
      <div 
        className={ !this.props.showError 
        ? classes.InputContainer 
        : classes.InputContainerInvalid }
      >
        <label 
          className={classes.Label}>
            {this.props.label}
        </label>
        <input 
          className={classes.Input}
          type={this.props.type}
          onChange={this.props.onChange}
          value={this.props.value}
          id={this.props.id}
        />
        { 
          this.props.showError ? 
          <p className={classes.ErrorText}>{this.props.errorText}</p> : null
        }

      </div>

    )
  }
}

export default Input;