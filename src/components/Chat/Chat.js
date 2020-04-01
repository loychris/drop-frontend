import React, { Component } from "react";
import ChatPrev from "./ChatPrev/ChatPrev";
import classes from "./Chat.module.css";
import Message from "./Message/Message";
import axios from "axios";

class Chat extends Component {
  state = {
    searchBarValue: "",
    currentChatId: 0,
    recentChats: [],
    recentChatsLoaded: false
  };

  componentDidMount() {
    if (!this.state.recentChatsLoaded) {
      axios.get("/recentchats").then(response => {
        this.setState({ recentChatsLoaded: true, recentChats: response.data });
      });
    }
  }

  changeChat = newChatId => {
    console.log("Changing chat to ", newChatId);
    this.setState({ currentChatId: newChatId });
  };

  render() {
    const recentChats = this.state.recentChats.map(x => {
      return (
        <ChatPrev
          active={this.state.currentChatId === x.chatId}
          changeChat={this.changeChat}
          key={x.chatId}
          {...x}
        />
      );
    });

    const contacts = this.props.contacts
      ? this.props.contacts.map(x => {
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

    const messages =
      this.state.recentChatsLoaded &&
      this.state.recentChats.some(x => {
        return x.chatId === this.state.currentChatId;
      })
        ? this.state.recentChats
            .find(x => x.chatId === this.state.currentChatId)
            .latestMessages.map(x => {
              return (
                <Message changeChat={this.changeChat} key={x.msgId} {...x} />
              );
            })
        : [];

    const styleClasses = [classes.Chat];
    if (this.props.showing !== true) styleClasses.push(classes.OutLeft);

    console.log(messages);

    return (
      <div className={styleClasses.join(" ")}>
        <div className={classes.Previews}>
          {recentChats}
          <h3>Contacts:</h3>
          {contacts}
        </div>
        <div className={classes.ChatWindow}>
          <div className={classes.Messages}>{messages}</div>
          <div className={classes.TextField}></div>
        </div>
      </div>
    );
  }
}

export default Chat;
