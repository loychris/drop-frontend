import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import Stream from "./components/Stream/Stream";
import Chat from "./components/Chat/Chat";
import Navigation from "./components/Navigation/Navigation";
// import arrowKeys from './SVGs/ArrowKeys.svg';
// import useWindowDimensions from './components/useWindowDimensions/userWindowDimensions'

class App extends Component {
  state = {
    currentlyShowing: "stream",
    contacts: [],
    loadedContacts: false
  };

  componentDidMount() {
    if (!this.state.loadedContacts) {
      axios.get(`/contacts`).then(response => {
        this.setState({ loadedContacts: true, contacts: response.data });
      });
    }
  }

  //const { height, width } = useWindowDimensions();
  // const { width } = useWindowDimensions();
  // const offSet = `${(width-700)/4-0.05*width}px`;
  /* <div className='ArrowKeys'>
          <img className='ArrowKeysLeft' src={arrowKeys} style={{marginLeft: offSet}} alt=''/>
          <img className='ArrowKeysRight' src={arrowKeys} style={{marginRight: offSet}} alt=''/>
        </div>   */

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
          <div className="Background"></div>
          <header className="AppHeader"></header>
          <Navigation
            changeTab={this.changeTab}
            showing={this.state.currentlyShowing}
          />
          <Stream
            send={this.send}
            loaded={this.state.loadedContacts}
            contacts={this.state.contacts}
            showing={this.state.currentlyShowing === "stream"}
          />
          <Chat
            contacts={this.state.contacts}
            showing={this.state.currentlyShowing === "chat"}
          />
          {/* <Route path='/' exact component={Stream}/> 
          <Route path='/chat' exact component={Chat}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
