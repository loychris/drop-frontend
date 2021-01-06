import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ChatWindow.module.css';
import ChatForm from './ChatForm/ChatForm';
import Message from './Message/Message';
import Loader from 'react-loader-spinner';

class ChatWindow extends Component {

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }


  render() {
    let latestMessages = [];
    let group = false; 
    const currentChat = this.props.chats.find((x) => x.chatId === this.props.currentChatId);
    if(currentChat){
      group = currentChat.group;
      latestMessages = currentChat.messages.map(message => {
        return <Message {...message} group={group} key={message.id} sent={this.props.userId === message.sender}/>;
      })
    }
    if(this.props.chatsStatus === 'loading'){
      return (
        <div className={classes.ChatWindow}>
          <div
              className={classes.Messages} 
              style={{height: `calc(80vh-${this.props.formHeight}px)`}}>
                <Loader className={classes.Loader} type='Puff' height={50} width={50} color='#11192c'/>
                <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
          </div>
          <ChatForm/>
        </div>
      )
    }

    return (
      <div className={classes.ChatWindow}>
        <div
          className={classes.Messages} 
          style={{height: `calc(80vh-${this.props.formHeight}px)`}}>
          <p className={classes.NotEncryptedMessage}>
            This Chat is not yet end-to-end encrypted. <br/>
            Or encrypted. But it is end-to-end, lol. <br/>
            What I mean is maybe don't send nudes here just yet. <br/>
          </p>
          {latestMessages}
          <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
        </div>
        <ChatForm inputRef={this.props.inputRef}/>
      </div>
    )
  }
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