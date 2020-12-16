import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Creator from './components/Creator/Creator';
import Navigation from "./components/Navigation/Navigation";
import Menu from './components/Menu/Menu';
import Auth from './components/Auth/Auth';
//import Assistant from "./components/Assistant/Assistant";
import taktaktak from './media/taktaktak.jpg'; 

import * as actions from './store/actions/index';
import Footer from "./components/Footer/Footer";

class App extends Component {

  state = {
    width: 0
  }

  componentDidMount = () => {
    this.props.onTryAutoSignup();
    this.setState({width: window.innerWidth});
    window.addEventListener('resize', () => this.setState({width: window.innerWidth}));
  } 

  render() {
    if(this.state.width < 600){
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
          {/* <Stream/> */}
          <Route path={['/stream', '/chat', '/creator']} component={Chat}/>
          <Route path={['/stream', '/chat', '/creator']} component={Creator}/>
          {/* <Assistant /> */}
          <Menu/>
          {this.props.authOpen ? <Auth/> : null }
          <Redirect to='/stream'/>
          {/* <Route path='/' exact component={Stream}/> 
          <Route path='/chat' exact component={Chat}/> */}
          <Footer/> 
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode,
    authOpen: state.auth.authOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
