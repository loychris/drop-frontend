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
      let chats = this.props.chats
        ? this.props.chats
          .filter(c => c.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
          .map((c) => {
            return (
              <ChatPrev
                chatExists={true}
                active={this.props.currentChatId === c.chatId}
                key={c.chatId}
                {...c}
              />
            );
          })
        : []
      if(chats.length === 0)
        if(this.state.searchInput === ''){
          chats = <p className={classes.EmptyMessage}>No Chats Yet</p> 
        } else {
          chats = <p className={classes.EmptyMessage}>No Contacts found with '{this.state.searchInput}'</p>
        }
      return (
        <div>
          {this.state.searching ? <h3>Contacts:</h3> : null}
          {chats}
        </div>
      )
    }

    getFriends = () => {
      const contacts =  this.props.friends
        ? this.props.friends
          .filter(x => true)
          .map((x) => {
            return (
              <ChatPrev
                chatExists={true}
                active={this.props.currentChatId === x.id}
                key={x.id}
                {...x} />
            );
          })
        : [];
        return contacts
    }

    getFriendRequests = () => {
      if(this.state.searching || this.props.receivedFriendRequests.length === 0){
        return null
      } else {
        const requests = this.props.receivedFriendRequests.map(user => {
          return (
            <ChatPrev
              name={user.name}
              preview={user.handle}
              request
              active={false}
              userId={user._id}
              key={user._id}/>
          )
        }) 
        return(
          <div>
            <h3>Friend Requests: </h3>
            {requests}
          </div>
        )
      }
    }

    getAllUsers = () => {
      let allUsers = [];
      if(this.props.allUsersStatus === 'loading'){
        allUsers = <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/> 
      }
      if(this.props.allUsersStatus === 'loaded'){ 
        allUsers = this.props.allUsers
        .filter(user => {
          return user.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
        })
        .map(user => {
          return (
            <ChatPrev 
              {...user} 
              stranger
              active={this.props.currentChatId === user.userId} 
              key={user.userId}
            />
          )
        }) 
        if(allUsers.length === 0){
          allUsers = <p className={classes.EmptyMessage}>No Users found with '{this.state.searchInput}'</p>
        }
      }
      return(
        <div>
          {this.state.searching ? <h3>All Users</h3> : null }
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
      console.log('OPENING SEARCH');
      this.props.onFetchAllUsers();
      this.setState({searching: true})
    }

    closeSearch = () => {
      console.log('CLOSING SEARCH');
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
                  {this.getAllUsers()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      receivedFriendRequests: state.chat.receivedFriendRequests,
      chats: state.chat.chats,
      dummyChats: state.chat.dummyChats,
      friends: state.chat.friends,
      allUsers: state.chat.allUsers,
      allUsersStatus: state.chat.allUsersStatus,
      currentTab: state.ui.currentTab,
      darkmode: state.ui.currentTab,
      loadedChats: state.chat.loadedChats,
      currentChatId: state.chat.currentChatId,
      height: state.chat.formHeight,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onChangeChat: (id, value) => dispatch(actions.changeChat(id, value)),
      onFetchAllUsers: () => dispatch(actions.fetchAllUsers())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatPreviews);