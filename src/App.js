import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Creator from './components/Creator/Creator';
import Navigation from "./components/Navigation/Navigation";
//import Assistant from "./components/Assistant/Assistant";
import Menu from './components/Menu/Menu';
import Auth from './components/Auth/Auth';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
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

      </BrowserRouter>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
