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
    document.addEventListener("keyup", this.keyboardSwipeHandler, false);
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

  //onKeyPrev
  keyboardSwipeHandler = (event) => {
    if (event.keyCode === 38) {
      this.props.onScrollPrev(this.props.streamElements[1].id, this.props.anonymousId)
    } 
    if (event.keyCode === 40) {
      this.props.onScrollNext(this.props.streamElements[1].id, this.props.anonymousId);
    }
  };

  scrollHandler = (event) => {
    if(// this.props.streamElements[1].memeStatus === 'loaded' &&
       // this.props.streamElements[1].status === 'id loaded' && 
       !this.props.mouseOverComments &&
       this.props.currentTab === 'stream' &&
       !this.props.menuOpen){
        // detect if user actually scrolled again or just scroll acceleration 
        // deltaY gets closer to 0 while decelerating (but with small hickups here and there -> tolerance of 20)
        // when the last scroll event was longer than 0.2s ago and the delta is bigger, a new scroll must have happened
        if(Math.abs(this.state.deltaYLastWheelEvent) - 20 > Math.abs(event.deltaY) 
           && Date.now() - this.props.timeStampLastScroll > 250){
            console.log("DETECT SCROLL")
          // scroll up or down? 
          if(event.deltaY < 0){ 
            this.props.onScrollNext(this.props.streamElements[1].id, this.props.anonymousId);
          }else{
            this.props.onScrollNext(this.props.streamElements[1].id, this.props.anonymousId);
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
    mouseOverComments: state.stream.mouseOverComments, 

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
    onScrollPrev: (dropId, anonymousId) => dispatch(streamActions.scrollPrev(dropId, anonymousId)),
    onScrollNext: (dropId, anonymousId) => dispatch(streamActions.scrollNext(dropId, anonymousId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
