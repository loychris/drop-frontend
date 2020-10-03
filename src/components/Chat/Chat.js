import React, { Component } from "react";
import { connect } from 'react-redux';

import * as chatActions from '../../store/actions/index'; 

import ChatPrev from "./ChatPrev/ChatPrev";
import classes from "./Chat.module.css";
import Message from "./Message/Message";
import Textarea from './Textarea/Textarea';

class Chat extends Component {

  upadeChatValue = (event) => {
    this.setState({ textValue: event.target.value });
  };

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
    const recentChats = this.props.chats
      ? this.props.chats.map((x) => {
          return (
            <ChatPrev
              active={this.props.currentChatId === x.chatId}
              key={x.chatId}
              {...x}
            />
          );
        })
      : [];

    const contacts = this.props.contacts
      ? this.props.contacts.map((x) => {
          return (
            <ChatPrev
              active={this.props.currentChatId === x.id}
              key={x.id}
              {...x}
            />
          );
        })
      : [];

    const latestMessages = this.props.loadedChats
      ? this.props.chats
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
        <div className={classes.Previews}>
          {recentChats}
          <h3>Contacts:</h3>
          {contacts}
        </div>
        <div className={classes.ChatWindow}>
          <div className={classes.Messages}>
            <p className={classes.NotEncryptedMessage}>This Chat is not yet end-to-end encrypted yet. <br/>
              Or encrypted. But it is end to end, lol. <br/>
              What I mean is maybe don't send nudes here just yet. <br/>
            </p>
            {latestMessages}
        </div>
        <Textarea/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    darkmode: state.ui.currentTab,
    loadedChats: state.chat.loadedChats,
    contacts: state.chat.contacts,
    currentChatId: state.chat.currentChatId,
    chats: state.chat.chats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSend: (msg) => dispatch(chatActions.send(msg)),
    changeChat: (chatId) => dispatch(chatActions.changeChat(chatId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
