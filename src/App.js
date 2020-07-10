import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";
import * as actionTypes from './store/actionTypes'; 

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Navigation from "./components/Navigation/Navigation";
import Assistant from "./components/Assistant/Assistant";
// import Auth from './components/Auth/Auth';

class App extends Component {
  state = {
    contacts: [],
    chats: [],
    loadedContacts: false,
    loadedChats: false,
  };

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

  changeTab = (show) => {
    this.setState({ currentlyShowing: show });
  };

  render() {
    console.log('+++++++++++++++++++++++++++++++++++')
    console.log(this.props);
    return (
      <BrowserRouter>
        <div className="App">
          <div className="Background"></div>
          {/* <Auth/> */}
          <Navigation
            changeTab={this.changeTab}
          />
          <Stream
            send={this.send}
            loaded={this.state.loadedContacts}
            contacts={this.state.contacts}
          />
          <Chat
            loadedChats={this.state.loadedChats}
            contacts={this.state.contacts}
          />
          <Assistant />
          {/* <Route path='/' exact component={Stream}/> 
          <Route path='/chat' exact component={Chat}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
