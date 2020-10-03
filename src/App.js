import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Creator from './components/Creator/Creator';
import Navigation from "./components/Navigation/Navigation";
import Menu from './components/Menu/Menu';
import Auth from './components/Auth/Auth';
//import Assistant from "./components/Assistant/Assistant";

import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount = () => {
    this.props.onTryAutoSignup();
  } 

  render() {
    return (
        <div className={`App`}>
          <div className={`Background ${this.props.darkmode ? 'Dark' : 'Light'}`}></div>
          {this.props.authOpen ? <Auth/> : null }
          <Navigation/>
          <Stream/>
          <Chat/>
          <Creator/>
          {/* <Assistant /> */}
          <Menu/>
          {/* <Route path='/' exact component={Stream}/> 
          <Route path='/chat' exact component={Chat}/> */}
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
