import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index'; 

import classes from "./Chat.module.css";
import ChatPrevs from './ChatPreviews/ChatPreviews';
import ChatWindow from './ChatWindow/ChatWindow';
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton';

class Chat extends Component {

  state = {
    textInput: 'placeholder'
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

  getNotLoggedInMessage = () => {
    return(
      <div className={classes.NotLoggedInContainer}>
        <div className={classes.NotLoggedInMessage}>
          <div className={classes.InnerContainer}>
            <PrimaryButton clicked={this.props.onOpenMenu}><h3>Log in</h3></PrimaryButton>
            or
            <PrimaryButton clicked={this.props.onOpenMenu}><h3>Create Account</h3></PrimaryButton> 
            to chat with friends!
          </div>
        </div>
      </div>
    )
  }

  render() {
    const styleClasses = [classes.Chat];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeft);
    if (this.props.currentTab === 'creator') styleClasses.push(classes.OutRight);
    return (
      <div className={styleClasses.join(" ")}>
        { !this.props.token ? this.getNotLoggedInMessage() : null }
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
    onOpenMenu: () => dispatch(actions.openMenu()),
    onChangeChat: (chatId, self, user, inputValue) => dispatch(actions.changeChat(chatId, self, user, inputValue)),
    onSendMessageFromBuffer: (id, dummyChatId, dummyMessageId, text) => dispatch(actions.sendMessageFromBuffer(id, dummyChatId, dummyMessageId, text)), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
