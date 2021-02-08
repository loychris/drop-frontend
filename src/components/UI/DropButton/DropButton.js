import React, { Component } from "react";
import classes from "./DropButton.module.css";

class DropButton extends Component {
  render() {
    let buttonClasses = [classes.DropButton];
    if (this.props.theme) {
      buttonClasses.push(classes.DropButtonNeumorphism);
    } else {
      buttonClasses.push(classes.DropButtonFlat);
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
export default DropButton;
