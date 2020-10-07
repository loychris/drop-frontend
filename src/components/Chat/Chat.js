import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index'; 

import ChatPrev from "./ChatPrev/ChatPrev";
import classes from "./Chat.module.css";
import Message from "./Message/Message.js";
import ChatForm from './ChatForm/ChatForm';

class Chat extends Component {

  state = {
      formHeight: 30,
      inputValue: ''
    }
  

  updateFormHeight = (height) => {
    this.setState({formHeight: height - 6})
  }

  onChangeInputValue = (value) => {
    this.setState({inputValue: value});
  } 

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

  onChangeChat = (newId) => {
    console.log('NewId', newId);
    this.props.onChangeChat(newId, this.state.inputValue);
    this.setState({inputValue: this.props.chats.find(c => c.chatId === newId).inputValue})
  }

  render() {
    const recentChats = this.props.chats
      ? this.props.chats.map((x) => {
          return (
            <ChatPrev
              onChangeChat={this.onChangeChat}
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
              onChangeChat={this.onChangeChat}
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
          <div 
            className={classes.Messages} 
            style={{height: `calc(80vh-${this.state.formHeight}px)`}}>
            <p className={classes.NotEncryptedMessage}>This Chat is not yet end-to-end encrypted yet. <br/>
              Or encrypted. But it is end to end, lol. <br/>
              What I mean is maybe don't send nudes here just yet. <br/>
            </p>
            {latestMessages}
            <ChatForm 
              inputValue={this.state.inputValue} 
              onChangeInputValue={this.onChangeInputValue} 
              maxHeight={this.state.height} 
              formHeight={this.state.formHeight} 
              updateFormHeight={this.updateFormHeight} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    height: state.chat.height,
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
    onChangeChat: (id, value) => dispatch(actions.changeChat(id, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
