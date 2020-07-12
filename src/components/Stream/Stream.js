import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actionTypes';

import StreamElement from "./StreamElement/StreamElement";
import classes from "./Stream.module.css";
import Modal from "../UI/Modal/Modal";
import SecondModal from "../UI/SecondModal/SecondModal";
import RiverWhite from "../../SVGs/RiverWhite.svg";
import RiverGlow from "../../SVGs/RiverGlow.svg";
import Boat from "../../media/Boat.png";
import DropOptionsMenu from "./DropOptionsMenu/DropOptionsMenu";
import SelectedDropTargets from "./SelectedDropTargets/SelectedDropTargets";
// import URLs from './URLs.json';

const TIME_BLOCK_NEXT_SWIPE = 500;

class Stream extends Component {

  state = {
    initialPageLoad: true,
    timeStampLastSwipe: 0,
}

  componentDidMount() {
    document.addEventListener("keyup", this.swipeHandler, false);
  }

  drop = (msg) => {
    this.props.send(msg);
    this.setState({
      currentlyDropping: false,
      selectedTargets: [],
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
          show={element.show}
          position={element.position}
          id={element.id}
          key={element.id}
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

    return (
      <div className={styleClasses.join(" ")}>
        {modal}
        {secondModal}
        <img src={RiverWhite} alt="" className={classes.River} />
        <img src={RiverGlow} alt="" className={classes.RiverGlow} />
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
    currentTab: state.ui.currentTab,
    modalOpen: state.ui.modalOpen,
    streamElements: state.stream.StreamElements
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwipe: (dir) => dispatch({type: actionTypes.SWIPE, dir: dir}),
    onOpenModal: () => dispatch({type: actionTypes.OPEN_MODAL}),
    onCloseModal: () => dispatch({type: actionTypes.CLOSE_MODAL})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
