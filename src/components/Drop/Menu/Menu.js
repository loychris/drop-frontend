import React, { Component } from "react";
import classes from "./Menu.module.css";

class Menu extends Component {
  render() {
    return (
      <div className={classes.Menu}>
        <ul>
          <li>menu punkt 1</li>
          <li>menu punkt 2</li>
          <li>menu punkt 3</li>
          <li>menu punkt 4</li>
          <li>menu punkt 5</li>
          <li>menu punkt 6</li>
        </ul>
      </div>
    );
  }
}

export default Menu;
