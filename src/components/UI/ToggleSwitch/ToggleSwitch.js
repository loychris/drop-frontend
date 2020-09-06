import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from './ToggleSwitch.module.css';


class ToggleSwitch extends Component {
    state = {
      checked: this.props.defaultChecked
    };
    onChange = e => {
      this.setState({
        checked: e.target.checked
      });
      if (typeof this.props.onChange === "function") this.props.onChange();
    };
    render() {
      return (
        <div
          className={`${classes.toggleSwitch} + ${classes.smallSwitch}`}
        >
          <input
            type="checkbox"
            name={this.props.Name}
            className={classes.toggleSwitchCheckbox}
            id={this.props.id}
            checked={this.props.currentValue}
            defaultChecked={this.props.defaultChecked}
            onChange={this.onChange}
            disabled={this.props.disabled}
          />
            <label className={classes.toggleSwitchLabel} htmlFor={this.props.id}>
              <span
                className={
                  this.props.disabled
                    ? `${classes.toggleSwitchInner} ${classes.toggleSwitchDisabled}`
                    : classes.toggleSwitchInner
                }
                data-yes={this.props.Text[0]}
                data-no={this.props.Text[1]}
              />
              <span
                className={
                  this.props.disabled
                    ? `${classes.toggleSwitchSwitch} ${classes.toggleSwitchDisabled}`
                    : classes.toggleSwitchSwitch
                }
              />
            </label>
        </div>
      );
    }
    // Set text for rendering.
    static defaultProps = {
      Text: ["OFF", "ON"]
    };
  }
  
  
  export default ToggleSwitch;
