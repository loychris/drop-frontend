import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";


import classes from "./Navigation.module.css";

import * as UIActions from '../../store/actions/index';

class Navigation extends Component {
  render() {
    const chatNotifications = this.props.notifications.filter(n => {
      if(n.type.startsWith('NEW_MESSAGE')) return true;
      if(n.type.startsWith('NEW_CHAT')) return true;
      return false;
    })
    const notifiactionStyle = chatNotifications.length > 99 
    ? classes.TrippleDigit : chatNotifications.length > 9 
      ? classes.DoubleDigit : classes.SingleDigit
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
              <NavLink style={{ textDecoration: "none", position: 'relative' }} to="/chat">
                {
                  chatNotifications.length > 0 
                    ? <div className={notifiactionStyle}>
                        <span className={classes.NotificationCount}>
                          {chatNotifications.length}
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
