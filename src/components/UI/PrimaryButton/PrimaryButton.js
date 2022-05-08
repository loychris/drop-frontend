import React, { Component } from "react";
import classes from "./PrimaryButton.module.css";

class PrimaryButton extends Component {
  render() {
    let buttonClasses = [classes.PrimaryButton];
    if (this.props.theme) {
      buttonClasses.push(classes.PrimaryButtonNeumorphism);
    } else {
      buttonClasses.push(classes.PrimaryButtonFlat);
    }
    if(this.props.disabled){
      buttonClasses.push(classes.Disabled);
    }

    return (
      <button className={buttonClasses.join(" ")} onClick={this.props.disabled ? null : this.props.clicked}>
        {this.props.children}
      </button>
    );
  }
}
export default PrimaryButton;
