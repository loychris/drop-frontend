import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Navigation from "./components/Navigation/Navigation";
import Assistant from "./components/Assistant/Assistant";

class App extends Component {
  state = {
    currentlyShowing: "stream",
    contacts: [],
    chats: [],
    loadedContacts: false,
    loadedChats: false,
    darkmode: true,
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

  send = (msg, chatId) => {
    var today = new Date();
    console.log(`Sending ${msg} to ${chatId}`);
    let chatsNew = [...this.state.chats];
    chatsNew
      .find((x) => {
        return x.chatId === chatId;
      })
      .latestMessages.push({
        msgId: 1000000,
        sent: true,
        sender: "user",
        time: today.getHours() + ":" + today.getMinutes(),
        message: msg,
      });
    this.setState({ chats: chatsNew });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div darkmode={this.state.darkmode} className="Background"></div>
          <Navigation
            darkmode={this.state.darkmode}
            changeTab={this.changeTab}
            showing={this.state.currentlyShowing}
          />
          <Stream
            darkmode={this.state.darkmode}
            send={this.send}
            loaded={this.state.loadedContacts}
            contacts={this.state.contacts}
            showing={this.state.currentlyShowing === "stream"}
          />
          <Chat
            send={this.send}
            chats={this.state.chats}
            loadedChats={this.state.loadedChats}
            darkmode={this.state.darkmode}
            contacts={this.state.contacts}
            showing={this.state.currentlyShowing === "chat"}
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
