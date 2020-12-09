import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ChatWindow.module.css';
import ChatForm from './ChatForm/ChatForm';
import Message from './Message/Message';

class ChatWindow extends Component {


    render() {
        let latestMessages = [];
        let group = false; 
        const currentChat = this.props.chats.find((x) => x.chatId === this.props.currentChatId);
        if(currentChat){
          group = currentChat.group;
          latestMessages = currentChat.messages.map(message => {
              return <Message {...message} group={group} key={message.id} />;
          })

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
                    <ChatForm/>
                </div>
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
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);