import React, { useEffect, createRef } from 'react';
import { connect } from 'react-redux';

import classes from './ChatWindow.module.css';
import ChatForm from './ChatForm/ChatForm';
import Message from './Message/Message';
import Loader from 'react-loader-spinner';

const ChatWindow = props => {


  useEffect(() => {
    scrollToBottom();
    
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
  const newTextMessagesNotifications = props.notifications.filter(n => n.type === 'TEXT_MESSAGE');
  if(currentChat){
    currentChat.messages.forEach(message => {
      if(!message.new){
        messages.push(
          <Message           
            {...message} 
            type='text'
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
            type='text'
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
          type='text'
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
          type='text'
          key={message.id}
          sent={props.userId === message.sender}/>
      );
    })
  }

  return (
    <div className={classes.ChatWindow}>
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
      height: state.chat.formHeight,
      darkmode: state.ui.currentTab,
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
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);