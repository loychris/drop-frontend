import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index';
import Modal from '../UI/Modal/Modal';
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

    render() {
        return(
            // <Modal height={'50vh'} width={'300px'} backDropClick={this.props.onCloseNewChatMenu}>
            <div>
              <Backdrop show={this.props.modalOpen} clicked={this.props.onCloseNewChatMenu} />
              <div className={classes.Modal}>
                <h2>New Chat</h2>
                  <input 
                    placeholder={"Search by username or @handle"}
                    ref={(input) => { this.searchInput = input; }} 
                    type="text" 
                    onChange={this.onSearchInput}
                    className={classes.SearchInput}/> 
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
