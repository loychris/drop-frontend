import React, { Component } from "react";
// import { BrowserRouter, Route } from 'react-router-dom';

import Stream from "./components/Stream/Stream";
import Chat from './components/Chat/Chat';
import Navigation from './components/Navigation/Navigation';
// import arrowKeys from './SVGs/ArrowKeys.svg';
// import useWindowDimensions from './components/useWindowDimensions/userWindowDimensions'


class  App extends Component {

  state = {
    currentlyShowing: 'chat'
  }

  //const { height, width } = useWindowDimensions();
  // const { width } = useWindowDimensions();
  // const offSet = `${(width-700)/4-0.05*width}px`;
     /* <div className='ArrowKeys'>
          <img className='ArrowKeysLeft' src={arrowKeys} style={{marginLeft: offSet}} alt=''/>
          <img className='ArrowKeysRight' src={arrowKeys} style={{marginRight: offSet}} alt=''/>
        </div>   */

  changeTab = (show) => {
    this.setState({currentlyShowing: show});
  }

  render(){
    return (
      // <BrowserRouter>
        <div className='App'>
          <div className='Background'></div>
          <header className='AppHeader'></header>
          <Navigation changeTab={this.changeTab} showing={this.state.currentlyShowing}/>
          <Stream showing={this.state.currentlyShowing === 'stream'}/>
          <Chat showing={this.state.currentlyShowing === 'chat'}/>
          {/* <Route path='/' exact component={Stream}/> 
          <Route path='/chat' exact component={Chat}/> */}
        </div>
      // </BrowserRouter>
    );
  }

}

export default App;
