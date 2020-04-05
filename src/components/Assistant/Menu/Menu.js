import React, { Component } from "react";
import classes from "./Menu.module.css";
import DropButton from "../../UI/DropButton/DropButton";

class Menu extends Component {
  render() {
    return (
      <div className={classes.Menu}>
        <h2>Settings</h2>
        <ul>
          <li className={classes.MenuItem}>
            <h3>Wtf is going on here?</h3>
            <DropButton>
              <h3 className={classes.TourButton}>Show me around!</h3>
            </DropButton>
          </li>

          <li>menu punkt 3</li>
          <li>menu punkt 4</li>
          <li>menu punkt 5</li>
          <li>menu punkt 6</li>
          <li className={classes.MenuItem}>
            <h3>{"Dark Mode <-> Light Mode"}</h3>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
