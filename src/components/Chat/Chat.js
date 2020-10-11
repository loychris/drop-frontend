import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index'; 

import classes from "./Chat.module.css";
import Message from "./Message/Message.js";
import ChatForm from './ChatForm/ChatForm';
import ChatPrevs from './ChatPreviews/ChatPreviews';

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
    let latestMessages = this.props.loadedChats
      ? [...this.props.chats, ...this.props.dummyChats]
          .find((x) => {
            return x.chatId === this.props.currentChatId;
          })
          .latestMessages.map((x) => {
            return <Message {...x} key={x.id} />;
          })
      : null;


    const styleClasses = [classes.Chat];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeft);
    if (this.props.currentTab === 'creator') styleClasses.push(classes.OutRight);

    return (
      <div className={styleClasses.join(" ")}>
        <ChatPrevs contacts/>
        <div className={classes.ChatWindow}>
          <div 
            className={classes.Messages} 
            style={{height: `calc(80vh-${this.props.formHeight}px)`}}>
            <p className={classes.NotEncryptedMessage}>This Chat is not yet end-to-end encrypted yet. <br/>
              Or encrypted. But it is end to end, lol. <br/>
              What I mean is maybe don't send nudes here just yet. <br/>
            </p>
            {latestMessages}
            <ChatForm/>
          </div>
        </div>
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
    dummyChats: state.chat.dummyChats,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeChat: (id, value) => dispatch(actions.changeChat(id, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
