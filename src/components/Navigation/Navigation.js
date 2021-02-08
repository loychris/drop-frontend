import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";


import classes from "./Navigation.module.css";

import * as UIActions from '../../store/actions/index';

class Navigation extends Component {
  render() {
    const chatNotification = this.props.notifications.filter(n => {
      if(n.type.startsWith('NEW_MESSAGE')) return true;
      return false;
    })
    return (
      <div className={classes.Navigation}>
        <nav>
          <ul>
          <li>
              <NavLink style={{ textDecoration: "none" }} to="/creator">
                <span
                  className={this.props.currentTab === "creator" ? classes.active : classes.inactive}
                  onClick={() => this.props.onSwitchTab("creator")}
                >
                  Creator
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: "none" }} to="/chat">
                {
                  chatNotification.length > 0 
                    ? <div className={classes.Notification}>
                        <span className={classes.NotificationCount}>
                          {chatNotification.length}
                        </span>
                      </div> 
                    : null 
                }
                <span
                  className={this.props.currentTab === "chat" ? classes.active : classes.inactive}
                  onClick={() => {
                    this.props.onSwitchTab("chat");
                    document.getElementById('chatForm').focus();
                  }}
                >
                  Chat
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink style={{ textDecoration: "none" }} to="/stream">
                <span
                  className={this.props.currentTab === "stream" ? classes.active : classes.inactive }
                  onClick={() => this.props.onSwitchTab("stream")}
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
    darkmode: state.ui.darkmode,
    allUsersStatus: state.chat.allUsersStatus,

    notifications: state.user.notifications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitchTab: (tab) => dispatch(UIActions.switchTab(tab)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
