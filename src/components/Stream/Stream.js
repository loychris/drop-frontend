import React, { Component } from "react";
import { connect } from 'react-redux';

import * as streamActions from '../../store/actions/index';
import * as UIActions from '../../store/actions/index';

import StreamElement from "./StreamElement/StreamElement";
import classes from "./Stream.module.css";
import Modal from "../UI/Modal/Modal";
import SecondModal from "../UI/SecondModal/SecondModal";
import RiverWhite from "../../SVGs/RiverWhite.svg";
import River from "../../SVGs/River.svg";
import RiverGlow from "../../SVGs/RiverGlow.svg";
import Boat from "../../media/Boat.png";
import DropOptionsMenu from "./DropOptionsMenu/DropOptionsMenu";
import SelectedDropTargets from "./SelectedDropTargets/SelectedDropTargets";
// import URLs from './URLs.json';

const TIME_BLOCK_NEXT_SWIPE = 500;

class Stream extends Component {

  state = {
    timeStampLastSwipe: 0,
}

  componentDidMount() {
    console.log('MOUNTING')
    document.addEventListener("keyup", this.swipeHandler, false);
    this.props.onFetchIds();
  }

  drop = (msg) => {
    this.props.send(msg);
    this.setState({
      currentlyDropping: false,
    });
  };

  swipe = (dir, timestamp) => {
    let newElements = this.props.streamElements.map((element) => {
      return {
        position: element.position - 1,
        id: element.id,
        show: element.position - 1 === 0 ? dir : "show",
      };
    });
    if (newElements[0].position < 0) {
      newElements.shift();
      newElements.push({
        position: 20,
        id: `${this.props.nextId}`,
        show: "show",
      });
    }
    const nextId = this.props.nextId + 1;
    this.setState({
      nextId: nextId,
      streamElements: newElements,
      timeStampLastSwipe: timestamp,
    });
  }

  swipeHandler = (event) => {
    const currentTimestamp = new Date();
    if (
      this.props.currentTab === 'stream' &&
      currentTimestamp - TIME_BLOCK_NEXT_SWIPE > this.props.timeStampLastSwipe
    ) {
      
      if (event.keyCode === 37) {
        this.props.onSwipe('left');
      } else if (event.keyCode === 39) {
        this.props.onSwipe('right');
      }
    }
  };

  render = () => {
    let StreamElements = [];
    this.props.streamElements.forEach((element) => {
      StreamElements.unshift(
        <StreamElement
          key={element.id}
          {...element}
          dropping={this.droppingHandler}
        />
      );
    });

    const styleClasses = [classes.Stream];
    if (this.props.currentTab !== 'stream') {
      styleClasses.push(classes.OutRight);
    }

    const modal = this.props.modalOpen ? 
      <Modal> 
        <DropOptionsMenu/> 
      </Modal> : null; 

    const secondModal = this.props.modalOpen ? 
      <SecondModal>
        <SelectedDropTargets/> 
      </SecondModal> : null; 

    const river = this.props.darkmode ? 
      <img src={RiverWhite} alt="" className={classes.River} /> : 
      <img src={River} alt="" className={classes.River} />

    const riverGlow = this.props.darkmode ? 
      <img src={RiverGlow} alt="" className={classes.RiverGlow} /> :
      null


    return (
      <div className={styleClasses.join(" ")}>
        {modal}
        {secondModal}
        {river}
        {riverGlow}
        <img src={Boat} alt="" className={classes.Boat1} />
        <img src={Boat} alt="" className={classes.Boat2} />
        {StreamElements}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    timeStampLastSwipe: state.stream.timeStampLastSwipe,
    streamElements: state.stream.StreamElements,
    initialStreamLoad: state.stream.initialStreamLoad,
    currentTab: state.ui.currentTab,
    modalOpen: state.ui.modalOpen,
    darkmode: state.ui.darkmode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchIds: () => dispatch(streamActions.fetchIds()),
    onSwipe: (dir) => dispatch(streamActions.swipe(dir)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
