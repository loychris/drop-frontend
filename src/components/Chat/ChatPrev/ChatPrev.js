import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./ChatPrev.module.css";
import DefaultProfilePic from "../../../media/DefaultProfilePic.png";
import DefaultGroupPic from "../../../media/DefaultGroupPic.png";
import Connector from './Connector.svg';

class ChatPrev extends Component {

  render() {
    let styleClasses = [classes.ChatPrev];
    if (this.props.active) styleClasses.push(classes.Active);
    return (
      <div
        onClick={() => this.props.onChangeChat(this.props.chatId)}
        className={styleClasses.join(" ")}
      >
        {this.props.active ? <img src={Connector} alt='' className={classes.ConnectorDown}/> : null } 
        {this.props.active ? <img src={Connector} alt='' className={classes.ConnectorUp}/> : null } 
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

export default connect(mapStateToProps)(ChatPrev);
