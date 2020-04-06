import React, { Component } from "react";
import classes from "./Menu.module.css";
import DropButton from "../../UI/DropButton/DropButton";

import Sun from "./Sun.png";
import Moon from "./Moon.png";

class Menu extends Component {
  state = {
    theme: "dark",
  };

  changeTheme = (t) => {
    this.setState({ theme: t });
  };

  render() {
    let lightClasses = [classes.Light];
    let darkClasses = [classes.Dark];
    lightClasses.push(
      this.state.theme === "light" ? classes.Active : classes.Inactive
    );
    darkClasses.push(
      this.state.theme === "dark" ? classes.Active : classes.Inactive
    );

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
            <div className={classes.Theme}>
              <div
                onClick={() => this.changeTheme("dark")}
                className={darkClasses.join(" ")}
              >
                <span>Dark Mode</span>
                <img src={Moon} alt="" className={classes.Icon} />
              </div>
              <div
                onClick={() => this.changeTheme("light")}
                className={lightClasses.join(" ")}
              >
                <img src={Sun} alt="" className={classes.Icon} />
                <span>Light Mode</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
