import React, { Component } from "react";
import { connect } from 'react-redux';

import * as streamActions from '../../store/actions/index';

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
    glowLeft: false,
    glowRight: false,
  }

  componentDidMount() {
    document.addEventListener("keyup", this.keyboardSwipeHandler, false);
    this.props.onFetchIds();
  }

  drop = (msg) => {
    this.props.send(msg);
    this.setState({
      currentlyDropping: false,
    });
  };

  onLightUp = (left, right) => {
    this.setState({glowLeft: left, glowRight: right})
  }

  resetGlow = () => {
    this.setState({glowLeft: false, glowRight: false});
  }

  checkTimeLock = () => {
    const currentTimestamp = new Date();
    return this.props.currentTab === 'stream' && currentTimestamp - TIME_BLOCK_NEXT_SWIPE > this.props.timeStampLastSwipe
  }

  keyboardSwipeHandler = (event) => {
    if(this.checkTimeLock()){
        if (event.keyCode === 37) {
          this.props.onSwipe('left');
      } else if (event.keyCode === 39) {
          this.props.onSwipe('right');
      }
    }
  };

  buttonSwipeHandler = (left) => {
    if(this.checkTimeLock()){
      this.props.onSwipe(left ? 'left' : 'right');
    }
  }

  getThumb(left) {

    return (
      <svg
        onMouseEnter={() => this.onLightUp(true)}
        onMouseLeave={this.resetGlow}
        onClick={() => this.buttonSwipeHandler(left)}
        className={`${classes.ThumbUp} ${!left ? classes.Up : classes.down} ${classes.ThumbGlow}`}
        xmlns="http://www.w3.org/2000/svg"
        width="130"
        height="130"
        fill="none"
        viewBox="0 0 130 130"
      >
        <g fill={(!left && this.state.glowRight || left && this.state.glowLeft) ? '#ffffff' : '#222222'} filter="url(#filter0_dd)">
          <path d="M38.571 88.32c5.26.603 10.3 2.397 15.453 3.542 5.449 1.209 10.954 2.146 16.459 3.063.11.018.214.018.318.022.175.037.358.06.564.05 4.236-.203 8.43-.746 12.613-1.432.27-.044.492-.134.684-.246 2.421-.508 4.884-1.648 6.209-3.837 1.157-1.911 1.35-4.037 1.07-6.167 3.253-2.857 4.622-6.654 3.667-10.88 4.324-4.535 4.566-10.553.426-15.146 2.616-4.424 2.534-9.356-.785-13.546a1.894 1.894 0 00-.702-.566 2.018 2.018 0 00-.709-.299c-6.547-1.404-13.238-.806-18.742 3.266a2.079 2.079 0 00-.872 1.599c-.077.213-.13.436-.14.672-.01.145-.01.198-.004.178l-.038.236c-.052.368-.111.733-.126 1.105-.36-.013-.72-.027-1.078-.054 2.512-8.587 1.467-26.17-11.536-21.622-1.004.35-1.416 1.212-1.392 2.052a2.16 2.16 0 00-.106.596c-.143 5.279-1.197 10.293-4.139 14.773-3.609 5.494-9.59 5.034-15.508 4.398-1.91-.205-3.856-.68-5.786-.556-2.383.152-2.539.866-3.184 2.81a2.108 2.108 0 00-.114.675c0 10.711.01 21.422.17 32.131.049 3.252 5.117 2.931 7.328 3.184zm6.733-33.826c12.685.563 17.982-10.981 18.543-22.675 7.784-1.262 6.523 12.45 4.898 17.496-.25-.05-.5-.09-.748-.147-2.564-.571-3.653 3.362-1.085 3.934 5.402 1.206 10.787 1.208 16.215.17 2.582-.493 1.486-4.425-1.085-3.933a34.786 34.786 0 01-4.042.525c.004-.079.004-.11 0-.095l.038-.237c.025-.174.05-.348.073-.523 4.337-2.794 9.27-3.285 14.343-2.254 2.32 3.052 1.476 6.52-.58 9.471-.356.512-.423 1.015-.31 1.458-.05.515.12 1.057.63 1.525 3.655 3.353 3.612 7.354.127 10.755-.803.368-1.354 1.189-.992 2.285 1.058 3.208.49 6.133-2.293 8.237-.088.066-.157.14-.23.213-.746.403-1.283 1.203-1.047 2.261.323 1.457.5 3.167-.41 4.463-.936 1.331-2.606 1.757-4.115 2.038a2.068 2.068 0 00-.585.207c-3.744.607-7.492 1.067-11.283 1.25-.044.002-.081.014-.123.018-9.121-1.522-18.212-3.106-27.046-5.895-.088-.028-.17-.037-.254-.054 1.219-10.148 2.144-20.284 1.361-30.493zm-4.093-.211c.782 9.907-.054 19.746-1.218 29.592-1.56-.103-3.121-.205-4.684-.305-.134-9.911-.153-19.822-.153-29.734 2.026.022 4.043.19 6.055.447z"></path>
          <path
            fillRule="evenodd"
            d="M65 15c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 4c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46z"
            clipRule="evenodd"
          ></path>
        </g>
        <defs>
          { (this.state.glowLeft || this.state.glowRight) 
          ? <filter
            id="filter0_dd"
            width="130"
            height="130"
            x="0"
            y="0"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
            <feOffset></feOffset>
            <feGaussianBlur stdDeviation="7.5"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.4 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
            <feOffset></feOffset>
            <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
            <feBlend in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend>
            <feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"></feBlend>
          </filter> 
          : <filter
          id="filter0_dd"
          width="130"
          height="130"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >            
          <feBlend in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend>
          <feBlend in="SourceGraphic" in2="effect2_dropShadow" result="shape"></feBlend>
          </filter> }
        </defs>
      </svg>
    );
  }

  getRiver = () => {
    return(
      this.props.darkmode 
      ? <img src={RiverWhite} alt="" className={classes.River} /> 
      : <img src={River} alt="" className={classes.River} />
    )
  }

  getStreamElements = () => {
    let StreamElements = [];
    this.props.streamElements.forEach((element) => {
      StreamElements.unshift(
        <StreamElement
          halfLeft={this.state.glowLeft}
          halfRIght={this.state.glowRight}
          key={element.id}
          {...element}
          dropping={this.droppingHandler}
        />
      );
    });
    return StreamElements;
  }

  getModal = () => {
    return(
      this.props.modalOpen 
      ? <Modal><DropOptionsMenu/></Modal> 
      : null
    )
  }

  getSecondModal = () => {
    return(
      this.props.modalOpen 
      ? <SecondModal><SelectedDropTargets/></SecondModal> 
      : null
    )
  }

  getRiverGlow = () => {
    return (
      this.props.darkmode 
      ? <img src={RiverGlow} alt="" className={classes.RiverGlow} /> 
      : null
    )
  }

  render = () => {
    const styleClasses = [classes.Stream];
    if (this.props.currentTab !== 'stream') {
      styleClasses.push(classes.OutRight);
    }
    return (
      <div className={styleClasses.join(" ")}>
        {this.getModal()}
        {this.getSecondModal()}
        {this.getRiver()}
        {this.getRiverGlow()}
        <img src={Boat} alt="" className={classes.Boat1} />
        <img src={Boat} alt="" className={classes.Boat2} />
        {this.getStreamElements()}
        {this.getThumb()}
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
