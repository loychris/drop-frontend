import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index'; 

import classes from "./Chat.module.css";
import ChatPrevs from './ChatPreviews/ChatPreviews';
import ChatWindow from './ChatWindow/ChatWindow';

class Chat extends Component {


  send = (msg, chatId) => {
    var today = new Date();
    console.log(`Sending ${msg} to ${chatId}`);
    let chatsNew = [...this.props.chats];
    chatsNew
      .find((x) => {
        return x.chatId === chatId;
      })
      .latestMessages.push({
        msgId: 1000000,
        sent: true,
        sender: "user",
        time: today.getHours() + ":" + today.getMinutes(),
        message: msg,
      });
    this.setState({ chats: chatsNew });
  };


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
    height: state.chat.formHeight,
    currentTab: state.ui.currentTab,
    darkmode: state.ui.currentTab,
    loadedChats: state.chat.loadedChats,
    contacts: state.chat.contacts,
    currentChatId: state.chat.currentChatId,
    chats: state.chat.chats,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenAuth: (authReason) => dispatch(actions.openAuth(authReason)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
