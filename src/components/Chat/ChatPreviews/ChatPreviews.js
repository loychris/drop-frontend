import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import ChatPrev from './ChatPrev/ChatPrev';
import classes from './ChatPreviews.module.css';
import * as actions from '../../../store/actions/index';


class ChatPreviews extends Component {

    state = {
      searching: false,
      searchInput: ''
    }

    componentDidUpdate = () => {
      if(this.searchInput) this.searchInput.focus();
    }

    clicked = (chatId) => {
      this.props.onChangeChat(chatId);
    }

    getChats = () => {
      let chats = [];
      if(this.props.chatsStatus === 'loading'){
        chats = 
        <div className={classes.LoaderContainer}>
          <Loader 
            className={classes.Spinner} 
            type="ThreeDots" 
            color="#00BFFF" 
            height={30} 
            width={30}/> 
        </div>
      }else {
        chats = this.props.chats
        .sort((chatA, chatB) => chatB.lastInteraction - chatA.lastInteraction)
        .map(chat => {
            return (
              <ChatPrev 
                chat
                {...chat}
                key={chat.chatId}
                clicked={() => this.clicked(chat.chatId)}
              /> 
            )
          })
        
      }
      return chats
    }

    getFriendRequests = () => {
      if(this.state.searching || this.props.receivedFriendRequests.length === 0){
        return null
      } else {
        const requests = this.props.receivedFriendRequests.map(user => {
          const self = {
            name: this.props.selfName,
            handle: this.props.selfHandle,
            userId: this.props.selfId,
            profilePic: this.props.selfHasPfilePic,
          }
          return (
            <ChatPrev
              user
              {...user}
              clicked={() => this.props.onCreateDummyChat(user, self)}
              key={'request'+ user.userId}/>
          )
        }) 
        return(
          <div>
            {requests}
          </div>
        )
      }
    }

    getSearchIcon() {
      return (
        <svg className={classes.SearchIcon} onClick={this.state.searching ? () => this.closeSearch() : () => this.openSearch()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="search_24px">
          <path id="icon/action/search_24px" fillRule="evenodd" clipRule="evenodd" d="M14.965 14.255H15.755L20.745 19.255L19.255 20.745L14.255 15.755V14.965L13.985 14.685C12.845 15.665 11.365 16.255 9.755 16.255C6.16504 16.255 3.255 13.345 3.255 9.755C3.255 6.16501 6.16504 3.255 9.755 3.255C13.345 3.255 16.255 6.16501 16.255 9.755C16.255 11.365 15.665 12.845 14.6851 13.985L14.965 14.255ZM5.255 9.755C5.255 12.245 7.26501 14.255 9.755 14.255C12.245 14.255 14.255 12.245 14.255 9.755C14.255 7.26501 12.245 5.255 9.755 5.255C7.26501 5.255 5.255 7.26501 5.255 9.755Z" fill={'#ffffff'}/>
          </g>
        </svg>
      )
    }

    getSearchInput = () => {
      if(this.state.searching){
        return (
          <input 
          placeholder={"Search by username or @handle"}
          ref={(input) => { this.searchInput = input; }} 
          type="text" 
          value={this.state.searchInput} 
          onChange={this.onSearchInput}
          className={classes.SearchInput}/> 
        )
      }
      return null;
    }

    openSearch = () => {
      this.setState({searching: true})
    }

    closeSearch = () => {
      this.setState({searching: false, searchInput: ''})
    }

    onSearchInput = (event) => {
      this.setState({searchInput: event.target.value});
    }

    getNewChatIcon = () => {
      return(
        <svg className={classes.AddChatIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="chat_bubble_outline_24px">
          <path id="icon/communication/chat_bubble_outline_24px" fillRule="evenodd" clipRule="evenodd" d="M4 2H20C21.1 2 22 2.89999 22 4V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.89999 2.90002 2 4 2ZM6 16H20V4H4V18L6 16Z" fill="#ffffff"/>
          <rect id="Rectangle 6" x="7" y="9" width="10" height="2" fill="#ffffff"/>
          <rect id="Rectangle 7" x="11" y="5" width="2" height="10" fill="#ffffff"/>
          </g>
        </svg>
      )
    }

    getNewChatButton = () => {
      if(!this.state.searching){
        return(
          <div className={classes.NewChatContainer} onClick={this.props.token ? this.props.onOpenNewChatModal : null}>
            {this.getNewChatIcon()}
            <h3 className={classes.NewChatMessage}>new chat</h3>
          </div>
        )
      }
      return null;
    }

    render(){
        return(
            <div className={classes.ChatPreviews}>
                <div className={classes.Header}>
                  {/* <div className={classes.SearchContainer}>
                    {this.getSearchIcon()}
                      {this.getSearchInput()}
                  </div> */}
                </div> 
                {this.getNewChatButton()}
                <div className={classes.ScrollContainer}>
                  {this.getFriendRequests()}
                  {this.getChats()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      userId: state.user.userId,
      token: state.user.token,
      notifications: state.user.notifications,

      chats: state.chat.chats,
      chatsStatus: state.chat.chatsStatus,
      currentChatId: state.chat.currentChatId,
      height: state.chat.formHeight,
      
      receivedFriendRequests: state.chat.receivedFriendRequests,
      acceptingFriendRequests: state.chat.acceptingFriendRequests,

      friends: state.chat.friends,
      friendsStatus: state.chat.friendsStatus,

      allUsers: state.chat.allUsers,
      allUsersStatus: state.chat.allUsersStatus,

      currentTab: state.ui.currentTab,
      darkmode: state.ui.currentTab,

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onFetchAllUsers: () => dispatch(actions.fetchAllUsers()),
      onChangeChat: (chatId, user, self, inputRef) => dispatch(actions.changeChat(chatId, user, self, inputRef)), 
      onOpenNewChatModal: () => dispatch(actions.openNewChatModal()),
      onCreateDummyChat: (chatPartner, self) => dispatch(actions.createDummyChat(chatPartner, self))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatPreviews);