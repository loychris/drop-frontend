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

  getButton = () => {
    let buttonType;
    let buttonClick = () => console.log('Nothing should happen');

    // ADD BUTTON
    if(!this.props.friends.some(friend => friend.userId === this.props.userId)){
      buttonType = 'add';
      buttonClick = () => this.props.onSendFriendRequest(this.props.user);
    } 

    // LOADING BUTTON
    if(this.props.sendingFriendRequests.some(user => user.userId === this.props.userId) || 
       this.props.acceptingFriendRequests.some(user => user.userId === this.props.userId)){
         buttonType='loading';
    }

    // CHECK BUTTON
    if(this.props.sentFriendRequests.some(user => user.userId === this.props.userId)){
      buttonType = 'check';
    } 

    //ACCEPT BUTTON
    if(this.props.receivedFriendRequests.some(user => user.userId === this.props.userId)){
      buttonType='accept';
      buttonClick = () => this.props.onAcceptFriendRequest(this.props.user);
    } 
    if(!buttonType){
      return null;
    }else {
      return <AddButton type={buttonType} clicked={buttonClick} />
    }
  }

  render() {
    const unreadMessages = this.props.notifiaction.filter(n => n.type === 'TEXT_MESSAGE' && n.chatId === this.props.chatId).length > 0; 
    let name, preview, profilePicSrc;
    if(this.props.chat){
      const chatPartner = this.props.members.filter(m => m.userId !== this.props.currentUserId)[0];
      name = chatPartner.name;
      preview = this.props.messages.length > 0 ? this.props.messages[this.props.messages.length-1].text : '@' + chatPartner.handle;
      profilePicSrc = chatPartner.profilePic ? 'https://storage.googleapis.com/drop-profile-pictures-bucket/profilePic-' + chatPartner.userId : DefaultProfilePic;
    } else if(this.props.user) {
      name = this.props.name;
      preview = '@' + this.props.handle;
      profilePicSrc = this.props.profilePic ? 'https://storage.googleapis.com/drop-profile-pictures-bucket/profilePic-' + this.props.userId : DefaultProfilePic;
    }
    const active = this.props.chat && this.props.chatId === this.props.currentChatId;
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
        {unreadMessages ? <div className={classes.Notifiaction}></div> : null }
        {this.getButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode,
    currentChatId: state.chat.currentChatId,
    currentUserId: state.user.userId,
    unreadMessages: state.chat.unreadMessages, 
    seenUpdatesChats: state.chat.seenUpdatesChats,
    token: state.user.token,
    chats: state.chat.chats,
    allUsers: state.chat.allUsers,
    notifiaction: state.user.notifications,

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
    onCreateDummyChat: (userId, name) => dispatch(actions.createDummyChat(userId, name)),
    onChangeChat: (chatId) => dispatch(actions.changeChat(chatId)),

    onSendFriendRequest: (user) => dispatch(actions.sendFriendRequest(user)),
    onAcceptFriendRequest: (user) => dispatch(actions.acceptFriendRequest(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPrev);
