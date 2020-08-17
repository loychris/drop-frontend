import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";


import classes from "./Navigation.module.css";

import * as UIActions from '../../store/actions/index';

class Navigation extends Component {
  render() {
    return (
      <div className={classes.Navigation}>
        <nav>
          <ul>
            <li>
              <NavLink style={{ textDecoration: "none" }} to="/chat">
                <span
                  className={
                    this.props.currentTab === "chat"
                      ? classes.active
                      : classes.inactive
                  }
                  onClick={() => {
                    this.props.onSwitchTab("chat");
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
                    this.props.currentTab === "stream"
                      ? classes.active
                      : classes.inactive
                  }
                  onClick={() => {
                    this.props.onSwitchTab("stream");
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

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    darkmode: state.ui.darkmode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchTab: (tab) => dispatch(UIActions.switchTab(tab)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
