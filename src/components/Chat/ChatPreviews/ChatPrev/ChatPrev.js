import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./ChatPrev.module.css";
import DefaultProfilePic from "../../../../media/DefaultProfilePic.png";
import AddButton from './AddButton/AddButton';
import Connector from './Connector.svg';
import * as actions from '../../../../store/actions/index';


class ChatPrev extends Component {

  state={
    connectorsOut: false
  }

  getConnector = (up) => {
    return <img 
      src={Connector} 
      alt='' 
      className={`${up ? classes.ConnectorUp : classes.ConnectorDown}`}/>
  }

  getButton = (chatPartner, active) => {
    let buttonType;
    let buttonClick = () => console.log('Nothing should happen');
    if(!this.props.friends.some(friend => friend.userId === chatPartner.userId)){
      buttonType = 'add';
      buttonClick = () => this.props.onSendFriendRequest(chatPartner, this.props.chatId.startsWith('request') ? this.props.chatId : null);
    }
    if(this.props.sentFriendRequests.some(user => user.userId === chatPartner.userId)){
      buttonType= 'sent';
    }
    if(this.props.sendingFriendRequests.some(user => user.userId === chatPartner.userId)){
      buttonType='sending';
    }
    if(this.props.acceptingFriendRequests.some(user => user.userId === chatPartner.userId)){
      buttonType='accepting';
    }
    if(this.props.receivedFriendRequests.some(user => user.userId === chatPartner.userId)){
      buttonType='received';
      buttonClick = () => this.props.onAcceptFriendRequest(chatPartner);
    }
    return buttonType ? <AddButton type={buttonType} clicked={buttonClick} inverted={active}/> : null;
  }

  render() {
    const unreadMessages = this.props.notifiaction
      .filter(n => (n.type.startsWith('NEW_MESSAGE') && n.chatId === this.props.chatId)
        || n.type.startsWith('NEW_CHAT') && n.chatId === this.props.chatId); 
    const notifiactionStype = unreadMessages.length > 99 
      ? classes.TrippleDigit : unreadMessages.length > 9 
        ? classes.DoubleDigit : classes.SingleDigit
    const chatPartner = this.props.members.filter(m => m.userId !== this.props.userId)[0];
    const name = chatPartner.name;
    const preview = this.props.messages.length > 0 ? this.props.messages[this.props.messages.length-1].text : '@' + chatPartner.handle;
    const profilePicSrc = chatPartner.profilePic ? 'https://storage.googleapis.com/drop-profile-pictures-bucket/profilePic-' + chatPartner.userId : DefaultProfilePic;

    const active = this.props.chatId === this.props.currentChatId;
    let styleClasses = [classes.ChatPrev];
    if(active) styleClasses.push(classes.Active);

    return (
      <div onClick={this.props.clicked} className={styleClasses.join(" ")}>
        {active ? this.getConnector(true) : null } 
        {active ? this.getConnector(false) : null } 
        <img src={profilePicSrc} alt=" " className={classes.ProfilePic}/>
        <div className={classes.Info}>
          <h3 className={classes.Name}>{name}</h3>
          <p className={classes.Preview}>{preview}</p>
        </div>
        { 
          unreadMessages.length > 0
          ? <div className={notifiactionStype}>
                  <span className={classes.NotificationCount}>{unreadMessages.length}</span>
            </div> 
          : null 
        }
    {this.getButton(chatPartner, active)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode,
    currentChatId: state.chat.currentChatId,
    unreadMessages: state.chat.unreadMessages, 
    seenUpdatesChats: state.chat.seenUpdatesChats,
    chats: state.chat.chats,
    allUsers: state.chat.allUsers,
    notifiaction: state.user.notifications,
    token: state.user.token,
    userId: state.user.userId,


    friends: state.chat.friends,
    acceptingFriendRequests: state.chat.acceptingFriendRequests,
    sendingFriendRequests: state.chat.sendingFriendRequests,
    sentFriendRequests: state.chat.sentFriendRequests, 
    receivedFriendRequests: state.chat.receivedFriendRequests,
    acceptingFriendRequests: state.chat.acceptingFriendRequests, 

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeChat: (chatId) => dispatch(actions.changeChat(chatId)),
    onSendFriendRequest: (user) => dispatch(actions.sendFriendRequest(user)),
    onAcceptFriendRequest: (user) => dispatch(actions.acceptFriendRequest(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPrev);
