import React, { Component } from "react";
import { connect } from 'react-redux';

import AddFriendButton from './AddFriendButton/AddFriendButton';
import classes from "./ChatPrev.module.css";
import DefaultProfilePic from "../../../../media/DefaultProfilePic.png";
import DefaultGroupPic from "../../../../media/DefaultGroupPic.png";
import Connector from './Connector.svg';
import * as actions from '../../../../store/actions/index';


class ChatPrev extends Component {

  state={
    connectorsOut: false
  }

  openChat = () => {
    if(this.props.chatId !== this.props.currentChatId){
      this.props.onChangeChat(this.props.chatId)
    }
  }

  clicked = () => {
    if(this.props.chatExists){
      this.openChat()
    } else {
      this.props.onCreateDummyChat(this.props.userId)
    }
  }

  getConnector = (up) => {
    return <img 
      src={Connector} 
      alt='' 
      className={`${up ? classes.ConnectorUp : classes.ConnectorDown}`}/>
  }


  render() {
    // const active = this.props.active || this.props.dummyChats.some(chat => chat.chatId === this.props.userId)
    let styleClasses = [classes.ChatPrev];
    if(this.props.active) styleClasses.push(classes.Active);
    return (
      <div onClick={this.clicked} className={styleClasses.join(" ")}>
        {this.props.active ? this.getConnector(true) : null } 
        {this.props.active ? this.getConnector(false) : null } 
        <img src={ this.props.type === "group" ? DefaultGroupPic : DefaultProfilePic }alt=" " className={classes.ProfilePic}/>
        <div className={classes.Info}>
          {this.props.stranger
            ? <AddFriendButton clicked={() => this.props.onAddFriend(this.props.userId, this.props.token)}/> 
            : null}
          {this.props.request
            ? <AddFriendButton clicked={() => this.props.onAcceptRequest(this.props.userId, this.props.token)}/>
            : null}
          <h3 className={classes.Name}>{this.props.name}</h3>
          <p className={classes.Preview}>{this.props.preview}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode,
    currentChatId: state.chat.currentChatId,
    dummyChats: state.chat.dummyChats,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeChat: (chatId) => dispatch(actions.changeChat(chatId)),
    onCreateDummyChat: (userId) => dispatch(actions.createDummyChat(userId)),
    onAddFriend: (friendId, token) => dispatch(actions.sendFriendRequest(friendId, token)),
    onAcceptRequest: (userId, token) => dispatch(actions.acceptFriendRequest(userId, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPrev);
