import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import ChatPrev from './ChatPrev/ChatPrev';
import classes from './ChatPreviews.module.css';
import * as actions from '../../../store/actions/index';
import Modal from '../../UI/Modal/Modal';


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
      this.props.onChangeShouldDeleteInput(true);
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
          .map(chat => {
          return (
            <ChatPrev 
              chat
              {...chat}
              inputRef={this.props.inputRef}
              key={chat.chatId}
              clicked={() => this.clicked(chat.chatId)}
            /> 
          )
        })
      }
      return (
        <div>
          {this.state.searching ? <h3>Recent Chats ───────</h3> : null}
          {chats}
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
              user
              {...user}
              buttonType = {this.props.acceptingFriendRequests.some(id => id === user.userId) ? 'loading' : 'accept'}
              buttonClick={() => this.props.onAcceptFriendRequest(user.userId, this.props.token)}
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

    getSearchIcon() {
      return (
        <svg className={classes.SearchIcon} onClick={this.state.searching ? () => this.closeSearch() : () => this.openSearch()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="search_24px">
          <path id="icon/action/search_24px" fillRule="evenodd" clipRule="evenodd" d="M14.965 14.255H15.755L20.745 19.255L19.255 20.745L14.255 15.755V14.965L13.985 14.685C12.845 15.665 11.365 16.255 9.755 16.255C6.16504 16.255 3.255 13.345 3.255 9.755C3.255 6.16501 6.16504 3.255 9.755 3.255C13.345 3.255 16.255 6.16501 16.255 9.755C16.255 11.365 15.665 12.845 14.6851 13.985L14.965 14.255ZM5.255 9.755C5.255 12.245 7.26501 14.255 9.755 14.255C12.245 14.255 14.255 12.245 14.255 9.755C14.255 7.26501 12.245 5.255 9.755 5.255C7.26501 5.255 5.255 7.26501 5.255 9.755Z" fill={'#ffffff'}/>
          </g>
        </svg>
      )
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

    getNewChatIcon = (glow) => {
      if(glow){
        return(
          <svg className={classes.AddChatIcon} width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="refresh_24px">
            <g id="Group" filter="url(#filter0_d)">
            <g id="Group_2">
            <path id="Vector" d="M13.5 5C8.81281 5 5 8.81281 5 13.5C5 18.1872 8.81281 22 13.5 22C18.1872 22 22 18.1865 22 13.5C22 8.81348 18.1872 5 13.5 5ZM13.5 20.6832C9.5397 20.6832 6.3168 17.461 6.3168 13.5C6.3168 9.53903 9.5397 6.3168 13.5 6.3168C17.4603 6.3168 20.6832 9.53903 20.6832 13.5C20.6832 17.461 17.461 20.6832 13.5 20.6832Z" fill="white"/>
            </g>
            </g>
            <g id="Group_3" filter="url(#filter1_d)">
            <g id="Group_4">
            <path id="Vector_2" d="M16.792 12.7823H14.1584V10.1487C14.1584 9.7853 13.8641 9.49033 13.5 9.49033C13.1359 9.49033 12.8416 9.7853 12.8416 10.1487V12.7823H10.208C9.84387 12.7823 9.54956 13.0773 9.54956 13.4408C9.54956 13.8042 9.84387 14.0992 10.208 14.0992H12.8416V16.7328C12.8416 17.0962 13.1359 17.3912 13.5 17.3912C13.8641 17.3912 14.1584 17.0962 14.1584 16.7328V14.0992H16.792C17.1561 14.0992 17.4504 13.8042 17.4504 13.4408C17.4504 13.0773 17.1561 12.7823 16.792 12.7823Z" fill="white"/>
            </g>
            </g>
            </g>
            <defs>
              <filter id="filter0_d" x="0" y="0" width="27" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2.5"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.791667 0 0 0 0 0.875 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
              <filter id="filter1_d" x="4.54956" y="4.49033" width="17.9009" height="17.9009" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="2.5"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.791667 0 0 0 0 0.875 0 0 0 0 1 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
            </defs>
          </svg>
        )
      }else{
        return(
          <svg className={classes.AddChatIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="refresh_24px">
            <g id="add 2">
            <g id="Group">
            <g id="Group_2">
            <path id="Vector" d="M11.5 4C6.81281 4 3 7.81281 3 12.5C3 17.1872 6.81281 21 11.5 21C16.1872 21 20 17.1865 20 12.5C20 7.81348 16.1872 4 11.5 4ZM11.5 19.6832C7.5397 19.6832 4.3168 16.461 4.3168 12.5C4.3168 8.53903 7.5397 5.3168 11.5 5.3168C15.4603 5.3168 18.6832 8.53903 18.6832 12.5C18.6832 16.461 15.461 19.6832 11.5 19.6832Z" fill="#ABCDEF"/>
            </g>
            </g>
            <g id="Group_3">
            <g id="Group_4">
            <path id="Vector_2" d="M14.792 11.7823H12.1584V9.14874C12.1584 8.7853 11.8641 8.49033 11.5 8.49033C11.1359 8.49033 10.8416 8.7853 10.8416 9.14874V11.7823H8.20798C7.84387 11.7823 7.54956 12.0773 7.54956 12.4408C7.54956 12.8042 7.84387 13.0992 8.20798 13.0992H10.8416V15.7328C10.8416 16.0962 11.1359 16.3912 11.5 16.3912C11.8641 16.3912 12.1584 16.0962 12.1584 15.7328V13.0992H14.792C15.1561 13.0992 15.4504 12.8042 15.4504 12.4408C15.4504 12.0773 15.1561 11.7823 14.792 11.7823Z" fill="#ABCDEF"/>
            </g>
            </g>
            </g>
            </g>
          </svg>
        )
      }
    }

    render(){
        return(
            <div className={classes.ChatPreviews}>
                <div className={classes.Header}>
                  <div className={classes.SearchContainer}>
                    {this.getSearchIcon()}
                      {this.state.searching 
                        ? 
                          <input 
                          placeholder={"Search by username or @handle"}
                          ref={(input) => { this.searchInput = input; }} 
                          type="text" 
                          value={this.state.searchInput} 
                          onChange={this.onSearchInput}
                          className={classes.SearchInput}/> 
                        : null }
                  </div>
                  <div className={classes.NewChatContainer} onClick={this.props.onOpenNewChatModal}>
                    {this.getNewChatIcon()}
                    <div className={classes.NewChatButton}>

                    </div>
                  </div>
                </div>
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
      onAcceptFriendRequest: (userId, token) => dispatch(actions.acceptFriendRequest(userId, token)),
      onOpenNewChatModal: () => dispatch(actions.openNewChatModal()),
      onChangeShouldDeleteInput: (value) => dispatch(actions.changeShouldDeleteInput(value)), 
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChatPreviews);