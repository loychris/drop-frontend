import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Navigation from "./components/Navigation/Navigation";
//import Assistant from "./components/Assistant/Assistant";
import Menu from './components/Menu/Menu';
// import Auth from './components/Auth/Auth';

class App extends Component {

  state = {
    loadedChats: true,
    loadedContacts: true
  }

  componentDidMount() {
    if (!this.state.loadedContacts) {
      axios.get(`/contacts`).then((response) => {
        this.setState({ loadedContacts: true, contacts: response.data });
      });
    }
    if (!this.state.loadedChats) {
      axios.get("/chats").then((response) => {
        this.setState({
          loadedChats: true,
          chats: response.data,
        });
      });
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className={`App`}>
          <div className={`Background ${this.props.darkmode ? 'Dark' : 'Light'}`}></div>
          {/* <Auth/> */}
          <Navigation/>
          <Stream/>
          <Chat/>
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
    darkmode: state.ui.darkmode
  }
}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
