import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index'; 

import classes from "./Chat.module.css";
import ChatPrevs from './ChatPreviews/ChatPreviews';
import ChatWindow from './ChatWindow/ChatWindow';

class Chat extends Component {

  state = {
    textInput: 'placeholder'
  }

  clicked = (event) => {
    event.stopPropagation();
    if(!this.props.token){
      this.props.onOpenAuth('Create an Account to chat & share memes with your friends')
    }
  }

  componentDidUpdate = () => {
    const unbufferMessage = this.props.messageBuffer.find(m => !m.dummyChatId.startsWith('dummy') && !m.sending); 
    if(unbufferMessage){
      console.log('Sending Message');
      console.log(unbufferMessage); 
      this.props.onSendMessageFromBuffer(
        unbufferMessage.id, 
        unbufferMessage.dummyChatId, 
        unbufferMessage.dummyMessageId,
        unbufferMessage.text
      );
    }
  }

  setChatFormInputValue = (event) => {
    this.setState({textInput: event.target.value})
  }

  changeChat = (chatId) => {
    this.props.onChangeChat(chatId, null, null, this.state.textInput);
    this.props.onChangeShouldDeleteInput(true);
  }

  render() {
    const styleClasses = [classes.Chat];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeft);
    if (this.props.currentTab === 'creator') styleClasses.push(classes.OutRight);
    return (
      <div className={styleClasses.join(" ")} onClick={this.clicked}>
        <ChatPrevs/>
        <ChatWindow/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    token: state.user.token,
    chats: state.stream.chats,
    messageBuffer: state.chat.messageBuffer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenAuth: (authReason) => dispatch(actions.openMenu(authReason)),
    onChangeChat: (chatId, self, user, inputValue) => dispatch(actions.changeChat(chatId, self, user, inputValue)),
    onSendMessageFromBuffer: (id, dummyChatId, dummyMessageId, text) => dispatch(actions.sendMessageFromBuffer(id, dummyChatId, dummyMessageId, text)), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
