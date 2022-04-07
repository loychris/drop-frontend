import React, { Component } from "react";
import { connect } from 'react-redux';

import * as streamActions from '../../store/actions/index';

import StreamElement from "./StreamElement/StreamElement";
import classes from "./Stream.module.css";
import RiverWhite from "../../SVGs/RiverWhite.svg";
import River from "../../SVGs/river.svg";
import RiverGlow from "../../SVGs/RiverGlow.svg";
import Boat from "../../media/Boat.png";
import DropButton from "../UI/DropButton/DropButton";

class Stream extends Component {

  state = {
    timeStampLastSwipe: 0,
    glowLeft: false,
    glowRight: false,
    wtfOpen: false,
  }

  componentDidMount() {
    document.addEventListener("keyup", this.keyboardSwipeHandler, false);
    document.addEventListener("keydown", this.keypressHandler, false);
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

  onLightUp = (left, right) => {
    this.setState({glowLeft: left, glowRight: right})
  }

  resetGlow = () => {
    this.setState({glowLeft: false, glowRight: false});
  }

  // onKeyDown
  keypressHandler = (event) => {
    if(!this.props.menuOpen && this.props.currentTab === 'stream'){
      if (event.keyCode === 37) {
        this.onLightUp(true, false);
      } else if (event.keyCode === 39) {
        this.onLightUp(false, true);
      }
    }

  }

  // onKeyUp
  keyboardSwipeHandler = (event) => {
    if (event.keyCode === 37 && this.state.glowLeft) {
        this.resetGlow();
        this.swipeHandler(true);
    } 
    if (event.keyCode === 39 && this.state.glowRight) {
      this.resetGlow();
      this.swipeHandler(false);
  
    }
  };

  swipeHandler = (left) => {
    if(
      this.props.streamElements[1].memeStatus === 'loaded' 
      && this.props.streamElements[1].status === 'id loaded'
      && !this.props.menuOpen
      ){
      this.props.onSwipe(left ? 'left' : 'right', this.props.streamElements[1].id, this.props.anonymousId);
    }
  }

  getLeftThumb = () => {
    return (
      <svg
        onMouseEnter={() => this.onLightUp(true, false)}
        onMouseLeave={this.resetGlow}
        onClick={() => this.swipeHandler(true)}
        className={`${classes.LeftThumb} ${classes.ThumbGlow}`}
        xmlns="http://www.w3.org/2000/svg" width="130" height="130" fill="none" viewBox="0 0 130 130">
        <g filter={this.state.glowLeft ? "url(#filter0_dd)" : null}>
          <path 
            d="M92.0177 42.2216C86.749 41.7113 81.6781 40.0051 76.5061 38.9511C71.0367 37.8369 65.5161 36.9958 59.996 36.1755C59.8856 36.1588 59.7815 36.1606 59.677 36.1593C59.5021 36.1246 59.3181 36.1045 59.1124 36.118C54.8811 36.3956 50.6969 37.0121 46.5264 37.7704C46.2564 37.8197 46.0373 37.9129 45.8468 38.0283C43.4346 38.5792 40.992 39.7617 39.706 41.9728C38.5827 43.9043 38.4274 46.0332 38.7441 48.1584C35.5408 51.0711 34.2384 54.8916 35.2674 59.1005C31.023 63.7101 30.8856 69.7316 35.1049 74.2518C32.5673 78.72 32.7345 83.6501 36.1271 87.7818C36.3481 88.0509 36.5897 88.2283 36.8385 88.3358C37.0378 88.4637 37.2695 88.5663 37.5521 88.6217C44.1235 89.912 50.8026 89.1964 56.2346 85.029C56.8084 84.5891 57.0592 84.001 57.0787 83.4154C57.1524 83.2013 57.2003 82.9769 57.2061 82.7408C57.2137 82.5954 57.2135 82.5431 57.2073 82.5629C57.2186 82.4842 57.2307 82.4048 57.2416 82.3264C57.2875 81.9574 57.3399 81.5913 57.348 81.2194C57.7083 81.2261 58.0682 81.2343 58.4276 81.2551C56.0659 89.8836 57.4168 107.446 70.3386 102.672C71.3364 102.304 71.7329 101.435 71.6951 100.596C71.7491 100.412 71.7878 100.217 71.7899 99.9984C71.8407 94.7175 72.8071 89.6863 75.6708 85.1557C79.1832 79.5986 85.1722 79.9545 91.0998 80.487C93.0124 80.6592 94.9675 81.0991 96.8947 80.9421C99.2743 80.7481 99.4179 80.0318 100.029 78.0768C100.093 77.8717 100.136 77.6509 100.132 77.3997C99.9446 66.6904 99.7468 55.9813 99.4002 45.2766C99.2947 42.0264 94.2329 42.4356 92.0177 42.2216ZM85.8764 76.1608C73.1836 75.8195 68.0886 87.454 67.7317 99.1557C59.9711 100.554 60.9928 86.8212 62.5297 81.7481C62.7796 81.7939 63.0303 81.8302 63.2803 81.8816C65.8529 82.4082 66.8733 78.4564 64.296 77.9292C58.8742 76.8186 53.4898 76.9097 48.0807 78.0418C45.5072 78.5803 46.672 82.4932 49.2338 81.9562C50.5776 81.675 51.9214 81.481 53.2665 81.3609C53.2636 81.4394 53.2641 81.4712 53.2681 81.4559C53.2568 81.5353 53.2447 81.614 53.2335 81.6932C53.2123 81.8678 53.1892 82.0425 53.17 82.217C48.8825 85.0867 43.9593 85.6635 38.8683 84.7218C36.495 81.7108 37.2792 78.2287 39.2829 75.2415C39.6301 74.7236 39.6888 74.22 39.5674 73.7785C39.6096 73.263 39.4299 72.7237 38.9118 72.2653C35.1986 68.9763 35.1719 64.9747 38.597 61.5133C39.3934 61.1316 39.93 60.3014 39.5488 59.2113C38.4344 56.0226 38.9522 53.0885 41.6972 50.9359C41.7838 50.8683 41.8523 50.7926 41.9246 50.7184C42.6631 50.3033 43.1851 49.4936 42.9311 48.4398C42.5823 46.9887 42.3754 45.2824 43.2633 43.9702C44.1753 42.6233 45.8378 42.1685 47.3419 41.8613C47.567 41.8149 47.7539 41.7357 47.9233 41.6435C51.6557 40.9717 55.3952 40.4461 59.1828 40.197C59.2266 40.1939 59.2634 40.1814 59.3058 40.177C68.4517 41.5391 77.5684 42.9647 86.4501 45.5993C86.5383 45.6254 86.6205 45.6327 86.705 45.6482C85.6635 55.8162 84.9157 65.9667 85.8764 76.1608ZM89.9725 76.3006C89.0178 66.4081 89.6823 56.5564 90.6733 46.6912C92.2358 46.7675 93.7982 46.8419 95.362 46.9151C95.6692 56.8222 95.861 66.7312 96.0347 76.6413C94.0083 76.655 91.989 76.5217 89.9725 76.3006Z" 
            fill={this.state.glowLeft ? '#ffffff' : '#555555'}/>
          <path
            fillRule="evenodd"
            d="M65 15c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 4c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46z"
            clipRule="evenodd"
            fill={this.state.glowLeft ? '#ffffff' : '#555555'}/>
        </g>
        <defs>
        { this.state.glowLeft ?
        <filter id="filter0_dd" x="0.13501" y="0.13501" width="131.73" height="131.73" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="7.5"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="2.5"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
        </filter>
        : null }
        </defs>
      </svg>
    );
  }

  getRightThumb = () => {
    return (
      <svg
        onMouseEnter={() => this.onLightUp(false, true)}
        onMouseLeave={this.resetGlow}
        onClick={() => this.swipeHandler(false)}
        className={`${classes.RightThumb} ${classes.ThumbGlow}`}
        xmlns="http://www.w3.org/2000/svg" width="132" height="132" fill="none" viewBox="0 0 132 132">
        <g filter={this.state.glowRight ? "url(#filter0_dd1)" : null}>
        <path 
          d="M38.571 88.32c5.26.603 10.3 2.397 15.453 3.542 5.449 1.209 10.954 2.146 16.459 3.063.11.018.214.018.318.022.175.037.358.06.564.05 4.236-.203 8.43-.746 12.613-1.432.27-.044.492-.134.684-.246 2.421-.508 4.884-1.648 6.209-3.837 1.157-1.911 1.35-4.037 1.07-6.167 3.253-2.857 4.622-6.654 3.667-10.88 4.324-4.535 4.566-10.553.426-15.146 2.616-4.424 2.534-9.356-.785-13.546a1.894 1.894 0 00-.702-.566 2.018 2.018 0 00-.709-.299c-6.547-1.404-13.238-.806-18.742 3.266a2.079 2.079 0 00-.872 1.599c-.077.213-.13.436-.14.672-.01.145-.01.198-.004.178l-.038.236c-.052.368-.111.733-.126 1.105-.36-.013-.72-.027-1.078-.054 2.512-8.587 1.467-26.17-11.536-21.622-1.004.35-1.416 1.212-1.392 2.052a2.16 2.16 0 00-.106.596c-.143 5.279-1.197 10.293-4.139 14.773-3.609 5.494-9.59 5.034-15.508 4.398-1.91-.205-3.856-.68-5.786-.556-2.383.152-2.539.866-3.184 2.81a2.108 2.108 0 00-.114.675c0 10.711.01 21.422.17 32.131.049 3.252 5.117 2.931 7.328 3.184zm6.733-33.826c12.685.563 17.982-10.981 18.543-22.675 7.784-1.262 6.523 12.45 4.898 17.496-.25-.05-.5-.09-.748-.147-2.564-.571-3.653 3.362-1.085 3.934 5.402 1.206 10.787 1.208 16.215.17 2.582-.493 1.486-4.425-1.085-3.933a34.786 34.786 0 01-4.042.525c.004-.079.004-.11 0-.095l.038-.237c.025-.174.05-.348.073-.523 4.337-2.794 9.27-3.285 14.343-2.254 2.32 3.052 1.476 6.52-.58 9.471-.356.512-.423 1.015-.31 1.458-.05.515.12 1.057.63 1.525 3.655 3.353 3.612 7.354.127 10.755-.803.368-1.354 1.189-.992 2.285 1.058 3.208.49 6.133-2.293 8.237-.088.066-.157.14-.23.213-.746.403-1.283 1.203-1.047 2.261.323 1.457.5 3.167-.41 4.463-.936 1.331-2.606 1.757-4.115 2.038a2.068 2.068 0 00-.585.207c-3.744.607-7.492 1.067-11.283 1.25-.044.002-.081.014-.123.018-9.121-1.522-18.212-3.106-27.046-5.895-.088-.028-.17-.037-.254-.054 1.219-10.148 2.144-20.284 1.361-30.493zm-4.093-.211c.782 9.907-.054 19.746-1.218 29.592-1.56-.103-3.121-.205-4.684-.305-.134-9.911-.153-19.822-.153-29.734 2.026.022 4.043.19 6.055.447z"
          fill={this.state.glowRight ? '#ffffff' : '#555555'}/>
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M66.8726 115.992C94.4827 115.51 116.474 92.7374 115.992 65.1274C115.51 37.5174 92.7374 15.5257 65.1274 16.0076C37.5174 16.4896 15.5257 39.2626 16.0076 66.8726C16.4896 94.4827 39.2626 116.474 66.8726 115.992ZM66.8028 111.993C92.204 111.55 112.436 90.5984 111.993 65.1972C111.55 39.796 90.5984 19.5636 65.1972 20.007C39.796 20.4504 19.5636 41.4016 20.007 66.8028C20.4504 92.204 41.4016 112.436 66.8028 111.993Z" 
          fill={this.state.glowRight ? '#ffffff' : '#555555'}/>
        </g>
        <defs>
        { this.state.glowRight ? 
          <filter id="filter0_dd1" x="0.13501" y="0.13501" width="131.73" height="131.73" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="7.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.08 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
          </filter>
        : <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M77.0177 27.2216C71.749 26.7113 66.6781 25.0051 61.5061 23.9511C56.0367 22.8369 50.5161 21.9958 44.996 21.1755C44.8856 21.1588 44.7815 21.1606 44.677 21.1593C44.5021 21.1246 44.3181 21.1045 44.1124 21.118C39.8811 21.3956 35.6969 22.0121 31.5264 22.7704C31.2564 22.8197 31.0373 22.9129 30.8468 23.0283C28.4346 23.5792 25.992 24.7617 24.706 26.9728C23.5827 28.9043 23.4274 31.0332 23.7441 33.1584C20.5408 36.0711 19.2384 39.8916 20.2674 44.1005C16.023 48.7101 15.8856 54.7316 20.1049 59.2518C17.5673 63.72 17.7345 68.6501 21.1271 72.7818C21.3481 73.0509 21.5897 73.2283 21.8385 73.3358C22.0378 73.4637 22.2695 73.5663 22.5521 73.6217C29.1235 74.912 35.8026 74.1964 41.2346 70.029C41.8084 69.5891 42.0592 69.001 42.0787 68.4154C42.1524 68.2013 42.2003 67.9769 42.2061 67.7408C42.2137 67.5954 42.2135 67.5431 42.2073 67.5629C42.2186 67.4842 42.2307 67.4048 42.2416 67.3264C42.2875 66.9574 42.3399 66.5913 42.348 66.2194C42.7083 66.2261 43.0682 66.2343 43.4276 66.2551C41.0659 74.8836 42.4168 92.4456 55.3386 87.6719C56.3364 87.3037 56.7329 86.435 56.6951 85.5962C56.7491 85.4124 56.7878 85.2169 56.7899 84.9984C56.8407 79.7175 57.8071 74.6863 60.6708 70.1557C64.1832 64.5986 70.1722 64.9545 76.0998 65.487C78.0124 65.6592 79.9675 66.0991 81.8947 65.9421C84.2743 65.7481 84.4179 65.0318 85.0285 63.0768C85.0926 62.8717 85.1359 62.6509 85.1315 62.3997C84.9446 51.6904 84.7468 40.9813 84.4002 30.2766C84.2947 27.0264 79.2329 27.4356 77.0177 27.2216ZM70.8764 61.1608C58.1836 60.8195 53.0886 72.454 52.7317 84.1557C44.9711 85.5539 45.9928 71.8212 47.5297 66.7481C47.7796 66.7939 48.0303 66.8302 48.2803 66.8816C50.8529 67.4082 51.8733 63.4564 49.296 62.9292C43.8742 61.8186 38.4898 61.9097 33.0807 63.0418C30.5072 63.5803 31.672 67.4932 34.2338 66.9562C35.5776 66.675 36.9214 66.481 38.2665 66.3609C38.2636 66.4394 38.2641 66.4712 38.2681 66.4559C38.2568 66.5353 38.2447 66.614 38.2335 66.6932C38.2123 66.8678 38.1892 67.0425 38.17 67.217C33.8825 70.0867 28.9593 70.6635 23.8683 69.7218C21.495 66.7108 22.2792 63.2287 24.2829 60.2415C24.6301 59.7236 24.6888 59.22 24.5674 58.7785C24.6096 58.263 24.4299 57.7237 23.9118 57.2653C20.1986 53.9763 20.1719 49.9747 23.597 46.5133C24.3934 46.1316 24.93 45.3014 24.5488 44.2113C23.4344 41.0226 23.9522 38.0885 26.6972 35.9359C26.7838 35.8683 26.8523 35.7926 26.9246 35.7184C27.6631 35.3033 28.1851 34.4936 27.9311 33.4398C27.5823 31.9887 27.3754 30.2824 28.2633 28.9702C29.1753 27.6233 30.8378 27.1685 32.3419 26.8613C32.567 26.8149 32.7539 26.7357 32.9233 26.6435C36.6557 25.9717 40.3952 25.4461 44.1828 25.197C44.2266 25.1939 44.2634 25.1814 44.3058 25.177C53.4517 26.5391 62.5684 27.9647 71.4501 30.5993C71.5383 30.6254 71.6205 30.6327 71.705 30.6482C70.6635 40.8162 69.9157 50.9667 70.8764 61.1608ZM74.9725 61.3006C74.0178 51.4081 74.6823 41.5564 75.6733 31.6912C77.2358 31.7675 78.7982 31.8419 80.362 31.9151C80.6692 41.8222 80.861 51.7312 81.0347 61.6413C79.0083 61.655 76.989 61.5217 74.9725 61.3006Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M51.8726 100.992C79.4827 100.51 101.474 77.7374 100.992 50.1274C100.51 22.5174 77.7374 0.525694 50.1274 1.00763C22.5174 1.48956 0.525695 24.2626 1.00763 51.8726C1.48956 79.4827 24.2626 101.474 51.8726 100.992ZM51.8028 96.993C77.204 96.5496 97.4364 75.5984 96.993 50.1972C96.5496 24.796 75.5984 4.56364 50.1972 5.00702C24.796 5.4504 4.56364 26.4016 5.00702 51.8028C5.4504 77.204 26.4016 97.4364 51.8028 96.993Z" fill="white"/>
        </svg>
         }
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
    let streamElements = [];
    this.props.streamElements.forEach((element) => {
      streamElements.unshift(
        <StreamElement
          halfLeft={this.state.glowLeft}
          halfRight={this.state.glowRight}
          key={element.id}
          {...element}
          dropping={this.droppingHandler}
        />
      );
    });
    return streamElements;
  }

  getRiverGlow = () => {
    return (
      this.props.darkmode 
      ? <img src={RiverGlow} alt="" className={classes.RiverGlow} /> 
      : null
    )
  }

  getWtf = () => {
    if(!this.state.wtfOpen){
      return <h2 className={classes.wtfButton} onClick={() => this.setState({wtfOpen: true})}>WTF?</h2>
    }
    return (
      <div className={classes.wtfContainer}>
        
        <h1>Wellcome to Meme Drop <span role='img'>✌</span></h1>
        <p className={classes.SubLine}>The bests place to discover, share, discuss and soon create memes</p>
        <h2>The Meme Stream</h2>
        <p>The neverending source of the freshes &amp; dankest memes out there.</p>
        <p>Press&nbsp;
          <b onMouseEnter={() => this.onLightUp(true, false)} onMouseLeave={this.resetGlow} className={classes.EmojiButton}>
            <span role='img'>👎</span> or <span role='img'>◀</span> 
          </b>
          &nbsp;if you don't like the meme and press &nbsp;
          <b onMouseEnter={() => this.onLightUp(false, true)} onMouseLeave={this.resetGlow} className={classes.EmojiButton}>
          <span role='img'>👍</span> or <span role='img'></span>▶
          </b>
          &nbsp; if you do (just like on y'alls favorite dating App).
        </p>
        <h3>Why though?</h3>
        <p>
          Im afraid you won't find the love of your life here (never say never, though). Behind the Meme Stream there is a magic recommendation engine that learns your taste in memes with every like/dislike. Soon it will recommend memes to you that fit your taste. The more honest you are while like/dislike, the better your recommendations will be.<br/>
          ( <b>Note: </b> nobody will see your likes/dislikes. It's just for the magic ) 
        </p>
        <p>
          If you want to share a meme with a friend press <b className={classes.EmojiButton}>Drop</b>.
        </p>
        <p>Also follow&nbsp;
          <a href='https://www.instagram.com/meme_drops/' className={classes.Link}  target="_blank" rel="noopener noreferrer">
            @meme_drops
          </a> on Instagram or you'll die.
        </p>
          
        <DropButton clicked={() => this.setState({wtfOpen: false})}>
          <h3>Got it!</h3>
        </DropButton>
      </div>
    )
  }

  render = () => {
    const styleClasses = [classes.Stream];
    if (this.props.currentTab !== 'stream') {
      styleClasses.push(classes.OutRight);
    }
    return (
      <div className={styleClasses.join(" ")}>
        {/*this.getWtf()*/}
        {this.getRiver()}
        {this.getRiverGlow()}
        <img src={Boat} alt="" className={classes.Boat1} />
        <img src={Boat} alt="" className={classes.Boat2} />
        {this.getStreamElements()}
        {this.getLeftThumb()}
        {this.getRightThumb()}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    timeStampLastSwipe: state.stream.timeStampLastSwipe,
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
    onSwipe: (dir, dropId, anonymousId) => dispatch(streamActions.swipe(dir, dropId, anonymousId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
