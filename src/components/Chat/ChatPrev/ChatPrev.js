import React, { Component } from "react";
import classes from "./ChatPrev.module.css";
import DefaultProfilePic from "../../../media/DefaultProfilePic.png";
import DefaultGroupPic from "../../../media/DefaultGroupPic.png";
import { NavLink } from "react-router-dom";

class ChatPrev extends Component {
  render() {
    let styleClasses = [classes.ChatPrev];
    if (this.props.active) styleClasses.push(classes.Active);
    return (
      <div
        onClick={() => this.props.changeChat(this.props.chatId)}
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

export default ChatPrev;
