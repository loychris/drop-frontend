import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index';


import classes from './DropModal.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import ChatPrev from './ChatPrev/ChatPrev';
import DropButton from '../UI/DropButton/DropButton';

class DropModal extends Component {

    state = {
      searchInput: '',
      searching: true
    }

    componentDidMount = () => {
      if(this.props.allUsersStatus === 'not loaded'){
        this.props.onFetchAllUsers();
      }
    }

    getFriends = () => {
      const friends = this.props.friends
      .filter(friend => friend.name.toLowerCase().includes(this.state.searchInput.toLowerCase()) 
      )
      .map(friend => {
        return (
          <ChatPrev 
            user={friend}
            {...friend}
            key={'f' + friend.userId}
            preview={friend.handle}
          />
        )
      })
      return friends;
    }

    getChats = () => {
      return this.props.chats.map(chat => {
        const chatPartner = chat.members.find(m => m.userId !== this.props.userId);
        return(
          <ChatPrev
            chatId={chat.chatId}
            user={chatPartner}
            {...chatPartner}
            key={chat.chatId}/>
        )
      })
    }

    onSearchInput = (event) => {
      this.setState({searchInput: event.target.value});
    }

    getSearchIcon = () => {
      return (
        <svg className={classes.SearchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="search_24px">
          <path id="icon/action/search_24px" fillRule="evenodd" clipRule="evenodd" d="M14.965 14.255H15.755L20.745 19.255L19.255 20.745L14.255 15.755V14.965L13.985 14.685C12.845 15.665 11.365 16.255 9.755 16.255C6.16504 16.255 3.255 13.345 3.255 9.755C3.255 6.16501 6.16504 3.255 9.755 3.255C13.345 3.255 16.255 6.16501 16.255 9.755C16.255 11.365 15.665 12.845 14.6851 13.985L14.965 14.255ZM5.255 9.755C5.255 12.245 7.26501 14.255 9.755 14.255C12.245 14.255 14.255 12.245 14.255 9.755C14.255 7.26501 12.245 5.255 9.755 5.255C7.26501 5.255 5.255 7.26501 5.255 9.755Z" fill={'#ffffff'}/>
          </g>
        </svg>
      )
    }

    send = () => {
      this.props.onSendDrop(this.props.dropTargets, this.props.streamElements[1].id, this.props.title, this.props.userId);
      document.getElementById('chatForm').focus();
    }

    render() {
        const targetNames = this.props.dropTargets
          .map(targetId => {
            return this.props.chats.find(chat => chat.chatId === targetId).name;
          })
          .map(name => name.split(' ')[0]);

        return(
            <div>
              <Backdrop show={this.props.modalOpen} clicked={this.props.onCloseDropModal} />
              <div className={classes.Modal}>
                <h2>Select Chat</h2>
                <div className={classes.SearchContainer}>
                  {this.getSearchIcon()}
                  <input 
                    placeholder={"Search by username or @handle"}
                    ref={(input) => { this.searchInput = input; }} 
                    type="text" 
                    value={this.state.searchInput} 
                    onChange={this.onSearchInput}
                    className={classes.SearchInput}/>
                  </div>
                <div className={classes.ScrollContainer}>
                  {this.getChats()}
                </div>
                <DropButton 
                  theme={false} 
                  clicked={() => this.send(this.props.streamElements[0].id)} 
                  disabled={this.props.dropTargets.length === 0}>
                  {
                    this.props.dropTargets.length > 0 
                    ? <h3>Drop to {targetNames.join(', ')}</h3>
                    : <h3>Drop</h3>
                  }
                </DropButton>
              </div>
            </div>

           )
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chat.chats,

        userId: state.user.userId,
        token: state.user.token,

        streamElements: state.stream.streamElements,
        dropTargets: state.stream.dropTargets,

    }
}

const mapDispatchToProps = dispatch => {
  return {
    onSendDrop: (targets, dropId, title, selfId) => dispatch(actions.sendDrop(targets, dropId, title, selfId)),
    onFetchAllUsers: () => dispatch(actions.fetchAllUsers()),
    onCloseDropModal: () => dispatch(actions.closeDropModal()),
    onSendFriendRequest: (userId, token) => dispatch(actions.sendFriendRequest(userId, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropModal);
