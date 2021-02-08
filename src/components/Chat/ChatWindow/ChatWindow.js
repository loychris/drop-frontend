import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './ChatWindow.module.css';
import ChatForm from './ChatForm/ChatForm';
import Message from './Message/Message';

const ChatWindow = props => {


  useEffect(() => {
    scrollToBottom();
    if(props.currentTab === 'chat'){
      const currentChatNotificatios = props.notifications.filter(n => n.type.startsWith('NEW_MESSAGE') && n.chatId === props.currentChatId);
      if(currentChatNotificatios.length > 0){
        console.log(currentChatNotificatios);
        const messageIds = currentChatNotificatios.map(n => n.message.id);
        props.onSendMessagesRead(props.currentChatId, messageIds);
      }
    }

  })

  const scrollToBottom = (smooth) => {
    bottomRef.current.scrollIntoView({behavior: smooth ? 'smooth' : 'auto', block: "start", inline: "nearest"});
  }
  const bottomRef = createRef()


  let messages = [];
  let foundAllOldMessages = false;
  let oldMessages = [];
  let newMessages = [];
  const currentChat = props.chats.find((x) => x.chatId === props.currentChatId);
  const newTextMessagesNotifications = props.notifications.filter(n => n.type === 'NEW_MESSAGE_TEXT');
  if(currentChat){
    currentChat.messages.forEach(message => {
      if(!message.new){
        messages.push(
          <Message           
            {...message} 
            key={message.id}
            sent={props.userId === message.sender}
          />
        )
      } else {
        if(!foundAllOldMessages){
          messages.push(
            <div key='separator' className={classes.NewMessageSeparator}>new messages</div>
          )
          foundAllOldMessages = true;
        }
        messages.push(
          <Message           
            {...message} 
            new
            key={message.id}
            sent={props.userId === message.sender}
          />
        )
      }
    })




    oldMessages = currentChat.messages
    .filter(m => !newTextMessagesNotifications.some(n => n.messageId === m.id))
    .map(message => {
      return (
        <Message           
          {...message} 
          key={message.id}
          sent={props.userId === message.sender}/>
      );
    })
    newMessages = currentChat.messages
    .filter(m => newTextMessagesNotifications.some(n => n.messageId === m.id))
    .map(message => {
      return (
        <Message           
          {...message} 
          new
          key={message.id}
          sent={props.userId === message.sender}/>
      );
    })
  }
  let styleClasses = [classes.ChatWindow];
  styleClasses.push(props.windowWidth < 1277 ? classes.SmallChatWindow : classes.BigChatWindow);
  return (
    <div className={styleClasses.join(' ')}>
      <div
        className={classes.Messages} 
        style={{height: `calc(80vh-${props.formHeight}px)`}}>
        <p className={classes.NotEncryptedMessage}>
          This Chat is not yet end-to-end encrypted. <br/>
          Or encrypted. But it is end-to-end, lol. <br/>
          What I mean is maybe don't send nudes here just yet. <br/>
        </p>
        {/* {oldMessages}
        {newMessages.length > 0 ? <div className={classes.NewMessageSeparator}>new messages</div> : null }
        {newMessages} */}
        {messages}
        <div style={{ height: "90px"}} ref={bottomRef}></div>
      </div>
      <ChatForm inputRef={props.inputRef}/>
    </div>
  )
}

const mapStateToProps = state => {
    return {
      windowWidth: state.ui.windowWidth,

      height: state.chat.formHeight,
      currentTab: state.ui.currentTab,

      chatsStatus: state.chat.chatsStatus,
      currentChatId: state.chat.currentChatId,
      chats: state.chat.chats,
      unreadMessages: state.chat.unreadMessages,

      userId: state.user.userId, 
      notifications: state.user.notifications,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onSendMessagesRead: (chatId, messageIds) => dispatch(actions.sendMessagesRead(chatId, messageIds)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);