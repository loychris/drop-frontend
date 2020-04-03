import React, { Component } from "react";
import classes from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render() {
    
    return (
      <div className={classes.Navigation}>
        <nav>
          <ul>
            <li>
              <NavLink style={{ textDecoration: "none" }} to="chat">
                <span
                  className={
                    this.props.showing === "chat"
                      ? classes.active
                      : classes.inactive
                  }
                  onClick={() => {
                    this.props.changeTab("chat");
                  }}
                >
                  Chat
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: "none" }} to="/stream">
                <span
                  className={
                    this.props.showing === "stream"
                      ? classes.active
                      : classes.inactive
                  }
                  onClick={() => {
                    this.props.changeTab("stream");
                  }}
                >
                  Stream
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
