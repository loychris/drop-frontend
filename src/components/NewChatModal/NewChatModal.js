import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index';
import UserPrev from './UserPrev/UserPrev';

import classes from './NewChatModal.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Loader from 'react-loader-spinner';

class NewChatModal extends Component {

    state = {
      searchInput: '',
      searching: true
    }

    componentDidMount = () => {
      if(this.props.allUsersStatus === 'not loaded'){
        this.props.onFetchAllUsers();
      }
    }

    componentDidUpdate = () => {
      console.log()
    }

    getAllUsers = () => {
      let allUsers = null;
      if(this.props.allUsersStatus === 'loading'){
        allUsers = 
        <div className={classes.LoaderContainer}>
          <Loader 
            className={classes.Spinner} 
            type="ThreeDots" 
            color="#00BFFF" 
            height={30} 
            width={30}/> 
        </div>
      }
      if(this.props.allUsersStatus === 'loaded'){ 
        allUsers = 
        <div>
          {
            this.props.allUsers
            .filter(user => {
              return user.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) 
                      && user.userId !== this.props.logedinUserId
                      && !this.props.friends.some(f => f.userId === user.userId)
            })
            .map(user => {
              return (
                <UserPrev 
                  user={user}
                  {...user}
                  inputRef={this.props.inputRef} 
                  key={'s' + user.userId}
                  preview={user.handle}
                />
              )
            })
          }
        </div>
      }
      return allUsers
    }

    getFriends = () => {
      const friends = this.props.friends
      .filter(friend => friend.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) 
      )
      .map(friend => {
        return (
          <UserPrev 
            user={friend}
            {...friend}
            inputRef={this.props.inputRef} 
            key={'f' + friend.userId}
            preview={friend.handle}
          />
        )
      })
      return friends;
    }

    onSearchInput = (event) => {
      this.setState({searchInput: event.target.value});
    }

    getSearchIcon() {
      return (
        <svg className={classes.SearchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          spellCheck='false'
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

    render() {
        return(
            <div>
              <Backdrop show={this.props.modalOpen} clicked={this.props.onCloseNewChatMenu} />
              <div className={classes.Modal}>
                <h2>New Chat</h2>
                <div className={classes.SearchContainer}>
                  {this.getSearchIcon()}
                  {this.getSearchInput()}
                </div>
                <div className={classes.ScrollContainer}>
                  {this.getFriends()}
                  {this.getAllUsers()} 
                </div>
              </div>
            </div>

           )
    }
}

const mapStateToProps = state => {
    return {
        logedinUserId: state.user.userId, 

        allUsersStatus: state.chat.allUsersStatus,
        allUsers: state.chat.allUsers,

        friends: state.chat.friends,
        chats: state.chat.chats,

        sendingFriendRequests: state.chat.sendingFriendRequests, 
        sentFriendRequests: state.chat.sentFriendRequests, 
        failedFriendRequest: state.chat.failedFriendRequest,

        receivedFriendRequests: state.chat.receivedFriendRequests,

        token: state.user.token, 
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllUsers: () => dispatch(actions.fetchAllUsers()),
    onCloseNewChatMenu: () => dispatch(actions.closeNewChatModal()),
    onSendFriendRequest: (userId, token) => dispatch(actions.sendFriendRequest(userId, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChatModal);
