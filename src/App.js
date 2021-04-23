import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Creator from './components/Creator/Creator';
import Navigation from "./components/Navigation/Navigation";
import NewChatModal from './components/NewChatModal/NewChatModal';
import DropModal from './components/DropModal/DropModal';
import taktaktak from './media/taktaktak.jpg'; 

import * as actions from './store/actions/index';
import Footer from "./components/Footer/Footer";
import SidePanel from "./components/SidePanel/SidePanel";
import Feedback from "./components/Feedback/Feedback";

class App extends Component {

  componentDidMount = () => {
    let anonymousId = localStorage.getItem('anonymousId');
    if(!anonymousId) {
      localStorage.setItem('anonymousId', 'anonymous'+Date.now());
    }
    this.props.onSetAnonymousId(anonymousId);
    this.props.onTryAutoSignup();
    this.props.onSetWindowWidth(window.innerWidth);
    window.addEventListener('resize', () => this.props.onSetWindowWidth(window.innerWidth));
      setInterval(() => {
        if(this.props.token){
          const token = localStorage.getItem('token');
          const headers = { headers: { authorization : `Bearer ${token}` } }
          const url = `/api/users/notifications`;
          axios.get(url, headers)
          .then(res => {
              if(this.props.notifications.length !== res.data.length){
                this.props.onRefreshNotifications(res.data);
              }else {
                const inComingIds = res.data.map(n => n.id);
                this.props.notifications.map(n => n.id)
                .forEach(id => {
                  if(!inComingIds.some(iid => iid === id)){
                    this.props.onRefreshNotifications(res.data);
                  }
                })
              }
          })
          .catch(err => {
            console.log(err);
          })
        }
      }, 5000);
  } 

  componentDidUpdate(){
    if(this.props.anonymousId === ''){
      console.log('anonymousId empty. Setting new one ');
      let anonymousId = localStorage.getItem('anonymousId');
      if(!anonymousId) {
        localStorage.setItem('anonymousId', 'anonymous'+Date.now());
      }
      this.props.onSetAnonymousId(anonymousId);
    }
    if(this.props.windowWidth !== window.innerWidth){
      this.props.onSetWindowWidth(window.innerWidth);
    }
  }

  render() {

    if(this.props.windowWidth < 600){
      return (
        <div className='DesktopOnlyMessage'>
          Desktop only for now, sry. <br/>
          ¯\_(ツ)_/¯<br/>
          App is coming soon though.<br/>
          Working all day and night.<br/><br/>
          <img src={taktaktak} alt='chris working' className='taktaktak'/>
        </div>
      )
    }

    return (
        <div className='App'>
          <div className={`Background ${this.props.darkmode ? 'Dark' : 'Light'}`}></div>
          <Route path={['/stream', '/chat', '/creator']} component={Stream}/>
          <Route path={['/stream', '/chat', '/creator']} component={Chat}/>
          <Route path={['/stream', '/chat', '/creator']} component={Creator}/>
          <Redirect to='/stream'/>
          {this.props.newChatModalOpen ? <NewChatModal/> : null}
          {this.props.dropModalOpen ? <DropModal/> : null}
          <Navigation/>
          <SidePanel/> 
          <Footer/>
          <Feedback/>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dropModalOpen: state.ui.dropModalOpen,
    windowWidth: state.ui.windowWidth,
    darkmode: state.ui.darkmode,
    authOpen: state.user.authOpen,
    newChatModalOpen: state.ui.newChatModalOpen,
    notifications: state.user.notifications,
    token: state.user.token,
    anonymousId: state.user.anonymousId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetWindowWidth: (width) => dispatch(actions.setWindowWidth(width)),
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onRefreshNotifications: (notifications) => dispatch(actions.refreshNotifications(notifications)),
    onSetAnonymousId: (anonymousId) => dispatch(actions.setAnonymousId(anonymousId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
