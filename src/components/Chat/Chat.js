import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index'; 

import classes from "./Chat.module.css";
import ChatPrevs from './ChatPreviews/ChatPreviews';
import ChatWindow from './ChatWindow/ChatWindow';

class Chat extends Component {

  render() {
    const styleClasses = [classes.Chat];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeft);
    if (this.props.currentTab === 'creator') styleClasses.push(classes.OutRight);
    return (
      <div className={styleClasses.join(" ")} onClick={this.props.token ? null : () => this.props.onOpenAuth('Create an Account to chat & share memes with your friends')}>
        <ChatPrevs contacts/>
        <ChatWindow/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    token: state.auth.token,
    chats: state.stream.chats,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenAuth: (authReason) => dispatch(actions.openAuth(authReason)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
