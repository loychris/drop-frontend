import React from "react";
import Stream from "./components/Stream /Stream";
import arrowKeys from './SVGs/ArrowKeys.svg';
import useWindowDimensions from './components/useWindowDimensions/userWindowDimensions'


function App() {
  //const { height, width } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const offSet = `${(width-700)/4-0.05*width}px`;
  return (
    <div className='App'>
        <header className='AppHeader'></header>
        <div className='ArrowKeys'>
          <img className='ArrowKeysLeft' src={arrowKeys} style={{marginLeft: offSet}} alt=''/>
          <img className='ArrowKeysRight' src={arrowKeys} style={{marginRight: offSet}} alt=''/>
        </div>  
          <Stream></Stream>
    </div>
  );
}

export default App;
