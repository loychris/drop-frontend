import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Creator from './components/Creator/Creator';
import Navigation from "./components/Navigation/Navigation";
import NewChatModal from './components/NewChatModal/NewChatModal';
import taktaktak from './media/taktaktak.jpg'; 

import * as actions from './store/actions/index';
import Footer from "./components/Footer/Footer";
import SideMenu from "./components/SideMenu/SideMenu";

class App extends Component {

  componentDidMount = () => {
    this.props.onTryAutoSignup();
    this.props.onSetWindowWidth(window.innerWidth);
    window.addEventListener('resize', () => this.props.onSetWindowWidth(window.innerWidth));
    setInterval(this.props.onRefreshNotifications, 5000);
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
          <Navigation/>
          <Route path={['/stream', '/chat', '/creator']} component={Chat}/>
          <Route path={['/stream', '/chat', '/creator']} component={Creator}/>
          <Redirect to='/stream'/>
          {this.props.newChatModalOpen ? <NewChatModal/> : null}
          <SideMenu/> 
          <Footer/>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    windowWidth: state.ui.windowWidth,
    darkmode: state.ui.darkmode,
    authOpen: state.user.authOpen,
    newChatModalOpen: state.ui.newChatModalOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetWindowWidth: (width) => dispatch(actions.setWindowWidth(width)),
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onRefreshNotifications: () => dispatch(actions.refreshNotifications()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
