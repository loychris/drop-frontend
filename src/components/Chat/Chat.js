import React, { Component } from "react";
import ChatPrev from "./ChatPrev/ChatPrev";
import classes from "./Chat.module.css";
import Message from "./Message/Message";
import axios from "axios";

class Chat extends Component {
  state = {
    searchBarValue: "",
    currentChatId: 0,
    textValue: "initial Message",
  };

  changeChat = (newChatId) => {
    console.log("Changing chat to ", newChatId);
    this.setState({ currentChatId: newChatId });
  };

  upadeChatValue = (event) => {
    this.setState({ textValue: event.target.value });
  };

  render() {
    const recentChats = this.props.chats
      ? this.props.chats.map((x) => {
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
      ? this.props.chats
          .find((x) => {
            return x.chatId === this.state.currentChatId;
          })
          .latestMessages.map((x) => {
            return <Message {...x} key={x.msgId} />;
          })
      : [];

    const styleClasses = [classes.Chat];
    if (this.props.showing !== true) styleClasses.push(classes.OutLeft);

    return (
      <div className={styleClasses.join(" ")}>
        <div className={classes.Previews}>
          {recentChats}
          <h3>Contacts:</h3>
          {contacts}
        </div>
        <div className={classes.ChatWindow}>
          <div className={classes.Messages}>{messages}</div>
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

export default Chat;
