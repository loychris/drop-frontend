import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./ChatPrev.module.css";
import DefaultProfilePic from "../../../../media/DefaultProfilePic.png";
import DefaultGroupPic from "../../../../media/DefaultGroupPic.png";
import AddButton from './AddButton/AddButton';
import Connector from './Connector.svg';
import * as actions from '../../../../store/actions/index';


class ChatPrev extends Component {

  state={
    connectorsOut: false
  }


  clicked = (type, user) => {
    if(type === 'chat'){
      if(this.props.chatId === this.props.currentChatId){
        return () => console.log('Chat already selcted');
      }else {
        return () => this.props.onChangeChat(this.props.cahtId);
      }
    } else {
      return () => this.props.onCreateDummyChat(this.props.userId, this.props.name);
    }
  }

  getConnector = (up) => {
    return <img 
      src={Connector} 
      alt='' 
      className={`${up ? classes.ConnectorUp : classes.ConnectorDown}`}/>
  }

  getButton = () => {
    if(!this.props.buttonType){
      return null;
    }else {
      return <AddButton type={this.props.buttonType} clicked={this.props.onButtonClick} />
    }
  }

  checkActive = () => {
    if(this.props.chatId && this.props.chatId === this.props.currentChatId) return true;
    if(this.props.currentChatId.startsWith('dummy')){
      const id = this.props.currentChatId.substring(5, this.props.currentChatId.length);
      console.log(id);
      return id === this.props.userId;
    }
  }

  render() {
    const active = this.checkActive();
    let styleClasses = [classes.ChatPrev];
    if(active) styleClasses.push(classes.Active);
    return (
      <div onClick={this.props.clicked} className={styleClasses.join(" ")}>
        {active ? this.getConnector(true) : null } 
        {active ? this.getConnector(false) : null } 
        <img src={DefaultProfilePic} alt=" " className={classes.ProfilePic}/>
        <div className={classes.Info}>
          <h3 className={classes.Name}>{this.props.name}</h3>
          <p className={classes.Preview}>{this.props.preview}</p>
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
    currentUserId: state.stream.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateDummyChat: (userId, name) => dispatch(actions.createDummyChat(userId, name)),
    onChangeChat: (chatId) => dispatch(actions.changeChat(chatId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPrev);
