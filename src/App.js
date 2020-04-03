import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Navigation from "./components/Navigation/Navigation";
import Drop from "./components/Drop/Drop";

class App extends Component {
  state = {
    currentlyShowing: "stream",
    contacts: [],
    loadedContacts: false,
    darkmode: true
  };

  componentDidMount() {
    if (!this.state.loadedContacts) {
      axios.get(`/contacts`).then(response => {
        this.setState({ loadedContacts: true, contacts: response.data });
      });
    }
  }

  changeTab = show => {
    this.setState({ currentlyShowing: show });
  };

  send = msg => {
    console.log(msg);
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
            darkmode={this.state.darkmode}
            contacts={this.state.contacts}
            showing={this.state.currentlyShowing === "chat"}
          />
          <Drop />
          {/* <Route path='/' exact component={Stream}/> 
          <Route path='/chat' exact component={Chat}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
