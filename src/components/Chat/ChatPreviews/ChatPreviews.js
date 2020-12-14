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

    getChats = () => {
      let chats = [];
      if(this.props.chatsStatus === 'loading'){
        chats = 
          <Loader 
            className={classes.Spinner} 
            type="ThreeDots" 
            color="#00BFFF" 
            height={30} 
            width={30}/> 
      }else {
        chats = this.props.chats
          .filter(chat => !chat.chatId.startsWith('dummy'))
          .map(chat => {
          return (
            <ChatPrev 
              key={chat.chatId}
              name={chat.name} 
              chatId={chat.chatId} 
              preview={chat.messages[chat.messages.length-1].text}
              clicked={this.props.currentChatId === chat.chatId 
                  ? () => console.log('Chat already selected') 
                  : () => this.props.onChangeChat(chat.chatId)
                }
            /> 
          )
        })
      }
      return (
        <div>
          <h3>Recent Chats ───────</h3>
          {chats}
        </div>
      )
    }


    getFriends = () => {
      let contacts;
        if(this.props.friendsStatus === 'loading' || this.props.friendsStatus === 'not loaded'){
          contacts = 
          <Loader 
            className={classes.Spinner} 
            type="ThreeDots" 
            color="#00BFFF" 
            height={30} 
            width={30}/> 
      }else {
        contacts = this.props.friends
        .filter(friend => this.props.friendsStatus !== 'loaded' ? true : friend.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
        .map((friend) => {
          return (
            <ChatPrev 
              name={friend.name} 
              userId={friend.userId} 
              key={'f-' + friend.userId}
              preview={friend.handle}
              clicked={() => this.props.onChangeChat('friend'+friend.userId, friend, {userId: this.props.userId})}/>
          );
        })
      }

        return(
          <div>
            <h3>Your Friends ────────</h3>
            {contacts}
          </div>
        )
    }

    getFriendRequests = () => {
      if(this.state.searching || this.props.receivedFriendRequests.length === 0){
        return null
      } else {
        const requests = this.props.receivedFriendRequests.map(user => {
          return (
            <ChatPrev
              name={user.name}
              userId={user.userId}
              buttonType='accept'
              onButtonClick={() => this.props.onAcceptFriendRequest(user.userId, this.props.token)}
              key={'request'+ user.userId}/>
          )
        }) 
        return(
          <div>
            <h3>Friend Requests: ────────</h3>
            {requests}
          </div>
        )
      }
    }

    getAllUsers = () => {
      let allUsers = [];
      if(this.props.allUsersStatus === 'loading'){
        allUsers = 
          <Loader 
            className={classes.Spinner} 
            type="ThreeDots" 
            color="#00BFFF" 
            height={30} 
            width={30}/> 
      }
      if(this.props.allUsersStatus === 'loaded'){ 
        allUsers = this.props.allUsers
        .filter(user => {
          return user.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) 
                 && user.userId !== this.props.userId
                 && !this.props.friends.some(f => f.userId === user.userId)
        })
        .map(user => {
          return (
            <ChatPrev 
              userId={user.userId} 
              key={user.userId}
              name={user.name}
              buttonType='add'
              buttonClick= {() => this.props.onSendFriendRequest(user.userId, this.props.token)}
              preview={user.handle}
            />
          )
        }) 
        if(allUsers.length === 0){
          allUsers = <p className={classes.EmptyMessage}>No Users found with '{this.state.searchInput}'</p>
        }
      }
      return(
        <div>
          <h3>All Users</h3>
          {allUsers}
        </div>
      )
    }

    componentDidUpdate = () => {
      if(this.searchInput) this.searchInput.focus();
    }

    getSearchIcon() {
      return (
        <svg className={classes.SearchIcon} onClick={this.state.searching ? () => this.closeSearch() : () => this.openSearch()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="search_24px">
          <path id="icon/action/search_24px" fillRule="evenodd" clipRule="evenodd" d="M14.965 14.255H15.755L20.745 19.255L19.255 20.745L14.255 15.755V14.965L13.985 14.685C12.845 15.665 11.365 16.255 9.755 16.255C6.16504 16.255 3.255 13.345 3.255 9.755C3.255 6.16501 6.16504 3.255 9.755 3.255C13.345 3.255 16.255 6.16501 16.255 9.755C16.255 11.365 15.665 12.845 14.6851 13.985L14.965 14.255ZM5.255 9.755C5.255 12.245 7.26501 14.255 9.755 14.255C12.245 14.255 14.255 12.245 14.255 9.755C14.255 7.26501 12.245 5.255 9.755 5.255C7.26501 5.255 5.255 7.26501 5.255 9.755Z" fill={this.state.searching ? '#000000' : '#ffffff'}/>
          </g>
        </svg>
      )
    }

    openSearch = () => {
      if(this.props.allUsersStatus !== 'loaded'){
        this.props.onFetchAllUsers();
      }
      this.setState({searching: true})
    }

    closeSearch = () => {
      this.setState({searching: false, searchInput: ''})
    }

    onSearchInput = (event) => {
      this.setState({searchInput: event.target.value});
    }

    render(){
        return(
            <div className={classes.ChatPreviews}>
                <div className={classes.Header}>
                  {this.state.searching 
                    ? <div className={classes.SearchContainer}>
                          <input 
                          placeholder={"Search by username or @handle"}
                          ref={(input) => { this.searchInput = input; }} 
                          type="text" 
                          value={this.state.searchInput} 
                          onChange={this.onSearchInput}
                          className={classes.SearchInput}/>
                      </div> 
                    : null }
                  {this.getSearchIcon()}
                </div>
                <div className={classes.ScrollContainer}>
                  {this.getFriendRequests()}
                  {this.getChats()}
                  {this.getFriends()}
                  {this.state.searching ? this.getAllUsers() : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      userId: state.auth.userId,
      token: state.auth.token,

      chats: state.chat.chats,
      chatsStatus: state.chat.chatsStatus,
      currentChatId: state.chat.currentChatId,
      height: state.chat.formHeight,
      
      receivedFriendRequests: state.chat.receivedFriendRequests,
      acceptingFriendRequests: state.chat.acceptingFriendRequests,

      sendingFriendRequests: state.chat.sendingFriendRequests,
      sentFriendRequests: state.chat.sentFriendRequests,
      failedFriendRequests: state.chat.failedFriendRequests,

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
      onChangeChat: (chatId, user, self) => dispatch(actions.changeChat(chatId, user, self)), 
      onSendFriendRequest: (userId, token) => dispatch(actions.sendFriendRequest(userId, token)),
      onAcceptFriendRequest: (userId, token) => dispatch(actions.acceptFriendRequest(userId, token))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatPreviews);