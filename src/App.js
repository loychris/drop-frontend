import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

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


  render() {
    console.log('+++++++++++++++++++++++++++++++++++')
    console.log(this.props);
    return (
      <BrowserRouter>
        <div className="App">
          <div className="Background"></div>
          {/* <Auth/> */}
          <Navigation/>
          <Stream/>
          <Chat/>
          <Assistant />
          {/* <Route path='/' exact component={Stream}/> 
          <Route path='/chat' exact component={Chat}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
