import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./ChatPrev.module.css";
import DefaultProfilePic from "../../../media/DefaultProfilePic.png";
import * as actions from '../../../store/actions/index';


class ChatPrev extends Component {

  clicked = () => {
    if(this.props.dropTargets.some(id => id === this.props.chatId)){
      this.props.onUnSelectDropTarget(this.props.chatId)
    } else {
      this.props.onSelectDropTarget(this.props.chatId)

    }
  }

  render() {
    const profilePicSrc = this.props.profilePic ? 'https://storage.googleapis.com/drop-profile-pictures-bucket/profilePic-' + this.props.userId : DefaultProfilePic;
    const selected = this.props.dropTargets.some(id => id === this.props.chatId);
    return (
      <div onClick={this.clicked} className={`${classes.ChatPrev} ${selected ? classes.selected : ''}`}>
        <img src={profilePicSrc} alt=" " className={classes.ProfilePic}/>
        <div className={classes.Info}>
          <h3 className={classes.Name}>{this.props.name}</h3>
          <p className={classes.Preview}>@{this.props.handle}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode,
    dropTargets: state.stream.dropTargets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectDropTarget: (chatId) => dispatch(actions.selectDropTarget(chatId)),
    onUnSelectDropTarget: (chatId) => dispatch(actions.unSelectDropTarget(chatId)),
    onCloseNewChatModal: () => dispatch(actions.closeNewChatModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPrev);

