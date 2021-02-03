import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./UserPrev.module.css";
import DefaultProfilePic from "../../../media/DefaultProfilePic.png";
import AddButton from '../../Chat/ChatPreviews/ChatPrev/AddButton/AddButton';
import * as actions from '../../../store/actions/index';


class UserPrev extends Component {

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
      buttonType = 'sent';
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

  clicked = () => {
    const existingChat = this.props.chats.find(chat => chat.members.some(user => user.userId === this.props.userId));
    if(existingChat){
      this.props.onChangeChat(existingChat.chatId); 
      this.props.onCloseNewChatModal();
    }else{
      const self = {
        name: this.props.selfName,
        handle: this.props.selfHandle,
        userId: this.props.selfId,
        profilePic: this.props.selfHasPfilePic,
      }
      const chatPartner = this.props.user;
      this.props.onCreateDummyChat(chatPartner, self);
      this.props.onCloseNewChatModal();
    }
  }

  render() {
    const profilePicSrc = this.props.profilePic ? 'https://storage.googleapis.com/drop-profile-pictures-bucket/profilePic-' + this.props.userId : DefaultProfilePic;
    return (
      <div onClick={this.clicked} className={classes.ChatPrev}>
        <img src={profilePicSrc} alt=" " className={classes.ProfilePic}/>
        <div className={classes.Info}>
          <h3 className={classes.Name}>{this.props.name}</h3>
          <p className={classes.Preview}>@{this.props.handle}</p>
        </div>
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

    selfId: state.user.userId,
    selfName: state.user.name,
    selfHandle: state.user.handle,
    selfHasPfilePic: state.user.hasProfilePic,

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
    onCreateDummyChat: (chatPartner, self) => dispatch(actions.createDummyChat(chatPartner, self)),
    onChangeChat: (chatId) => dispatch(actions.changeChat(chatId)),

    onSendFriendRequest: (user) => dispatch(actions.sendFriendRequest(user)),
    onAcceptFriendRequest: (user) => dispatch(actions.acceptFriendRequest(user)),

    onCloseNewChatModal: () => dispatch(actions.closeNewChatModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPrev);
