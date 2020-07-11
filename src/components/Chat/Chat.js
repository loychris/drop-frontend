import React, { Component } from "react";
import axios from "axios";
import { connect } from 'react-redux';

import ChatPrev from "./ChatPrev/ChatPrev";
import classes from "./Chat.module.css";
import Message from "./Message/Message";

class Chat extends Component {
  state = {
    searchBarValue: "",
    currentChatId: 0,
    textValue: "initial Message",
    chats: [{
      chatId: 0,
      latestMessages: [
        {
          message: 'THis is a chat message',
          time: new Date(), 
          sender: "chris",
          sent: true 
        }
      ]
    }]
  };

  changeChat = (newChatId) => {
    console.log("Changing chat to ", newChatId);
    this.setState({ currentChatId: newChatId });
  };

  upadeChatValue = (event) => {
    this.setState({ textValue: event.target.value });
  };

  send = (msg, chatId) => {
    var today = new Date();
    console.log(`Sending ${msg} to ${chatId}`);
    let chatsNew = [...this.state.chats];
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
    const recentChats = this.state.chats
      ? this.state.chats.map((x) => {
          return (
            <ChatPrev
              active={this.state.currentChatId === x.chatId}
              changeChat={this.changeChat}
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
              active={this.state.currentChatId === x.id}
              changeChat={this.changeChat}
              key={x.id}
              {...x}
            />
          );
        })
      : [];

    const messages = this.props.loadedChats
      ? this.state.chats
          .find((x) => {
            return x.chatId === this.state.currentChatId;
          })
          .latestMessages.map((x) => {
            return <Message {...x} key={x.msgId} />;
          })
      : [];

    const styleClasses = [classes.Chat];
    if (this.props.currentTab !== 'chat') styleClasses.push(classes.OutLeft);

    return (
      <div className={styleClasses.join(" ")}>
        <div className={classes.Previews}>
          {recentChats}
          <h3>Contacts:</h3>
          {contacts}
        </div>
        <div className={classes.ChatWindow}>
          <div className={classes.Messages}>
            {messages}
          </div>
          <div className={classes.TextField}>
            <imput
              type="textArea"
              value={this.state.textValue}
              onChange={this.upadeChatValue}
            />
            <button
              onClick={() => {
                console.log("sending");
                this.props.send(this.state.textValue, this.state.currentChatId);
              }}
            >
              send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    darkmode: state.ui.currentTab
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
