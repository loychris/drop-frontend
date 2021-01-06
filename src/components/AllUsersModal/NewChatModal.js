import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index';
import Modal from '../UI/Modal/Modal';
import ChatPrev from '../Chat/ChatPreviews/ChatPrev/ChatPrev';

import Loader from 'react-loader-spinner';

import classes from './NewChatModal.module.css';

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

    getFriends = () => {
      const friends = 
        this.props.friends
        .filter(friend => friend.name.toLowerCase().includes(this.state.searchInput.toLowerCase()))
        .map(friend => {
          const chat = this.props.chats.find(chat => chat.members.some(member => member.userId === friend.userId));
          const chatId = chat.chatId;
          return (
            <ChatPrev 
              user
              {...friend}
              key={friend.userId}
              preview={friend.handle}
              clicked={() => this.props.onNewChat(null, null, chatId, this.props.inputRef)}/>
          );
        })
      return friends;
    }

    getAllUsers = () => {
      console.log(this.props.allUsersStatus)
      return <h1>{this.props.allUsersStatus}</h1>
    }

    // getAllUsers = () => {
    //   console.log(this.props.allUsersStatus)
    //   let allUsers = null;
    //   if(this.props.allUsersStatus === 'loading'){
    //     allUsers = 
    //     <div className={classes.LoaderContainer}>
    //       <Loader 
    //         className={classes.Spinner} 
    //         type="ThreeDots" 
    //         color="#00BFFF" 
    //         height={30} 
    //         width={30}/> 
    //     </div>
    //   }
    //   if(this.props.allUsersStatus === 'loaded'){
    //     return this.props.allUsers.map(user => <p key={user.userId + '1'}>{user.name}</p>)
    //   }
    //   if(this.props.allUsersStatus === 'loaded'){ 
    //     allUsers = 
    //     <div>
    //       <h1>All Users</h1>
    //       {
    //         this.props.allUsers
    //         .filter(user => {
    //           return user.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) 
    //                   && user.userId !== this.props.userId
    //                   && !this.props.friends.some(f => f.userId === user.userId)
    //         })
    //         .map(user => {
    //           let buttonType = 'add';
    //           if(this.props.sendingFriendRequests.some(id => id === user.userId)) buttonType='loading';
    //           if(this.props.sentFriendRequests.some(id => id === user.userId)) buttonType='sent';
    //           if(this.props.receivedFriendRequests.some(id=>id === user.userId)) buttonType='accept';
    //           const self = {
    //             userId: this.props.userId, 
    //             handle: this.props.handle,
    //             profilePic: this.props.profilePic,
    //           }
    //           const existingChat = this.props.chats.find(chat => chat.members.some(member => member.userId === user.userId));
    //           const chatId = existingChat ? existingChat.chatId : null;
    //           return (
    //             <ChatPrev 
    //               user
    //               {...user}
    //               inputRef={this.props.inputRef} 
    //               key={'s' + user.userId}
    //               buttonType={buttonType}
    //               clicked={() => this.props.onNewChat(user, self, chatId, this.props.inputRef)}
    //               buttonClick= {() => this.props.onSendFriendRequest(user.userId, this.props.token)}
    //               preview={user.handle}
    //             />
    //           )
    //         })
    //       }
    //     </div>
    //   }
    //   console.log(allUsers)
    //   return allUsers
    // }

    onSearchInput = (event) => {
      this.setState({searchInput: event.target.value});
    }

    render() {
        return(
            <Modal height={'50vh'} width={'300px'} backDropClick={this.props.onCloseNewChatMenu}>
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
                <h1>{this.props.allUsersStatus}</h1>
              </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        allUsersStatus: state.chat.allUsersStatus,
        allUsers: state.chat.allUsers,

        friends: state.chat.friends,
        chats: state.chat.chats,

        sendingFriendRequests: state.chat.sendingFriendRequests, 
        sentFriendRequests: state.chat.sentFriendRequests, 
        failedFriendRequest: state.chat.failedFriendRequest,

        receivedFriendRequests: state.chat.receivedFriendRequests,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onNewChat: (chatPartner, self, chatId, inputRef) => dispatch(() => actions.newChat(chatPartner, self, chatId, inputRef)),
    onFetchAllUsers: () => dispatch(actions.fetchAllUsers()),
    onCloseNewChatMenu: () => dispatch(actions.closeNewChatModal()),
    onSendFriendRequest: (userId, token) => dispatch(actions.sendFriendRequest(userId, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChatModal);
