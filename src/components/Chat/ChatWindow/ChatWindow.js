import React, { Component, useEffect, createRef } from 'react';
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

  
  let latestMessages = [];
  const currentChat = props.chats.find((x) => x.chatId === props.currentChatId);
  if(currentChat){
    latestMessages = currentChat.messages.map(message => {
      return <Message {...message} key={message.id} sent={props.userId === message.sender}/>;
    })
  }
  if(props.chatsStatus === 'loading'){
    return (
      <div className={classes.ChatWindow}>
        <div
            className={classes.Messages} 
            style={{height: `calc(80vh-${props.formHeight}px)`}}>
              <Loader className={classes.Loader} type='Puff' height={50} width={50} color='#11192c'/>
              <div style={{ clear: "both", border: '1px solid red', height: "77px"}} ref={bottomRef}></div>
        </div>
        <ChatForm/>
      </div>
    )
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
        {latestMessages}
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

      userId: state.user.userId
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);