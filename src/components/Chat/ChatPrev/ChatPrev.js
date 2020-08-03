import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./ChatPrev.module.css";
import DefaultProfilePic from "../../../media/DefaultProfilePic.png";
import DefaultGroupPic from "../../../media/DefaultGroupPic.png";
import * as actionTypes from '../../../store/actionTypes';

class ChatPrev extends Component {
  render() {
    let styleClasses = [classes.ChatPrev];
    if (this.props.active) styleClasses.push(classes.Active);
    return (
      <div
        onClick={() => this.props.onChangeChat(this.props.chatId)}
        className={styleClasses.join(" ")}
      >
        <img
          src={
            this.props.type === "group" ? DefaultGroupPic : DefaultProfilePic
          }
          alt=" "
          className={classes.ProfilePic}
        />
        <div className={classes.Info}>
          <h3 className={classes.Name}>{this.props.name}</h3>
          <p className={classes.Preview}>{this.props.preview}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeChat: (chatId) => dispatch({type: actionTypes.CHANGE_CHAT, chatId: chatId}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPrev);
