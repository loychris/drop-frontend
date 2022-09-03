import React, { Component } from "react";
import { connect } from 'react-redux';

import * as streamActions from '../../store/actions/index';

import StreamElement from "./StreamElement/StreamElement";
import classes from "./Stream.module.css";
import RiverWhite from "../../SVGs/RiverWhite.svg";
import River from "../../SVGs/river.svg"
import RiverGlow from "../../SVGs/RiverGlow.svg";
import Boat from "../../media/Boat.png";

class Stream extends Component {

  state = {
    deltaYLastWheelEvent: 0,
    wtfOpen: false,
    
  }

  componentDidMount() {
    //document.addEventListener("keyup", this.keyboardSwipeHandler, false);
    document.addEventListener("keydown", this.keypressHandler, false);
    document.addEventListener("wheel", this.scrollHandler)
  }

  componentDidUpdate() {
    if(this.props.streamStatus === 'nothing loaded'){
      this.props.onFetchIds();
    }
  }

  drop = (msg) => {
    this.props.send(msg);
    this.setState({
      currentlyDropping: false,
    });
  };


  // onKeyDown
  keypressHandler = (event) => {
    if(!this.props.menuOpen && this.props.currentTab === 'stream'){
      // if (event.keyCode === 37) {
      //   this.onLightUp(true, false);
      // } else if (event.keyCode === 39) {
      //   this.onLightUp(false, true);
      // }
    }
  }

  // onKeyUp
  // keyboardSwipeHandler = (event) => {
  //   if (event.keyCode === 37) {
  //       this.scrollHandler(true);
  //   } 
  //   if (event.keyCode === 39) {
  //     this.scrollHandler(true);
  //   }
  // };

  scrollHandler = (event) => {
    if(// this.props.streamElements[1].memeStatus === 'loaded' &&
       // this.props.streamElements[1].status === 'id loaded' && 
       !this.props.menuOpen){
        if(event.deltaY < 0){ 
          // detect if user actually scrolled again or just scroll acceleration 
          // deltaY gets closer to 0 while decelerating (but with small hickups here and there -> tolerance of 20)
          // when the last scroll event was longer than 0.2s ago and the delta is bigger, a new scroll must have happened
          if(this.state.deltaYLastWheelEvent - 20 > event.deltaY 
             && Date.now() - this.props.timeStampLastScroll > 200){
            this.props.onScroll(this.props.streamElements[1].id, this.props.anonymousId);
          }
        }
      this.setState({deltaYLastWheelEvent: event.deltaY});
    }
  }

  getRiver = () => {
    return(
      this.props.darkmode 
      ? <img src={RiverWhite} alt="" className={classes.River} /> 
      : <img src={River} alt="" className={classes.River} />
    )
  }

  getRiverGlow = () => {
    return (
      this.props.darkmode 
      ? <img src={RiverGlow} alt="" className={classes.RiverGlow} /> 
      : null
    )
  }

  getStreamElements = () => {
    let streamElements = [];
    this.props.streamElements.forEach((element) => {
      streamElements.unshift(
        <StreamElement
          key={element.id}
          {...element}
          dropping={this.droppingHandler}
        />
      );
    });
    return streamElements;
  }

  render = () => {
    const styleClasses = [classes.Stream];
    if (this.props.currentTab !== 'stream') {
      styleClasses.push(classes.OutRight);
    }
    return (
      <div className={styleClasses.join(" ")}>
        {this.getRiver()}
        {this.getRiverGlow()}
        <img src={Boat} alt="" className={classes.Boat1} />
        <img src={Boat} alt="" className={classes.Boat2} />
        {this.getStreamElements()}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    timeStampLastScroll: state.stream.timeStampLastScroll,
    streamElements: state.stream.streamElements,
    initialStreamLoad: state.stream.initialStreamLoad,
    streamStatus: state.stream.streamStatus,

    currentTab: state.ui.currentTab,
    modalOpen: state.ui.modalOpen,
    menuOpen: state.ui.menu.open,
    darkmode: state.ui.darkmode,

    anonymousId: state.user.anonymousId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchIds: () => dispatch(streamActions.fetchIds()),
    onScroll: (dropId, anonymousId) => dispatch(streamActions.scroll(dropId, anonymousId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
