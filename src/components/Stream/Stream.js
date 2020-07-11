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
    streamElements: [
        { position: 0, show: "left", id: "0" },
        { position: 1, show: "show", id: "1" },
        { position: 2, show: "show", id: "2" },
        { position: 3, show: "show", id: "3" },
        { position: 4, show: "show", id: "4" },
        { position: 5, show: "show", id: "5" },
        { position: 6, show: "show", id: "6" },
        { position: 7, show: "show", id: "7" },
        { position: 8, show: "show", id: "8" },
        { position: 9, show: "show", id: "9" },
        { position: 10, show: "show", id: "10" },
        { position: 11, show: "show", id: "11" },
        { position: 12, show: "show", id: "12" },
        { position: 13, show: "show", id: "13" },
        { position: 14, show: "show", id: "14" },
        { position: 15, show: "show", id: "15" },
        { position: 16, show: "show", id: "16" },
        { position: 17, show: "show", id: "17" },
        { position: 18, show: "show", id: "18" },
        { position: 19, show: "show", id: "19" },
        { position: 20, show: "show", id: "20" },
    ],
    currentlyDropping: false,
    initialPageLoad: true,
    timeStampLastSwipe: 0,
    currentPostId: 4,
    nextId: '21' 
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
    let newElements = this.state.streamElements.map((element) => {
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
    const currentTimestamp = Date.now();
    if (
      this.props.currentTab === 'stream' &&
      currentTimestamp - TIME_BLOCK_NEXT_SWIPE > this.state.timeStampLastSwipe
    ) {
      
      if (event.keyCode === 37) {
        this.swipe('left', currentTimestamp);
      } else if (event.keyCode === 39) {
        this.swipe('right', currentTimestamp);
      }
    }
  };

  // selectTargetHandler = (id) => {
  //   let target = this.props.contacts.filter((x) => x.id === id)[0];
  //   target.selected = true;
  //   let targetsNew = this.props.contacts.filter((x) => x.id !== id);
  //   targetsNew.unshift(target);
  //   let selectedTargetsNew = this.props.selectedTargets;
  //   selectedTargetsNew.unshift(target);
  //   targetsNew.sort((x, y) => {x
  //     return x.name > y.name ? 1 : -1;
  //   });
  //   this.setState({ targets: targetsNew, selectedTargets: selectedTargetsNew });
  // };

  // unselectTargetHandler = (id) => {
  //   let target = this.props.selectedTargets.filter((x) => x.id === id)[0];
  //   target.selected = false;
  //   let targetsNew = this.props.contacts.filter((x) => x.id !== id);
  //   targetsNew.unshift(target);
  //   targetsNew.sort((x, y) => {
  //     return x.name > y.name ? 1 : -1;
  //   });
  //   let selectedTargetsNew = this.props.selectedTargets.filter(
  //     (x) => x.id !== id
  //   );
  //   this.setState({ targets: targetsNew, selectedTargets: selectedTargetsNew });
  // };


  render = () => {
    let StreamElements = [];
    this.state.streamElements.forEach((element) => {
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
    currentTab: state.ui.currentTab,
    modalOpen: state.ui.modalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenModal: () => dispatch({type: actionTypes.OPEN_MODAL}),
    onCloseModal: () => dispatch({type: actionTypes.CLOSE_MODAL})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
