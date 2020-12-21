import React, { Component } from "react";
import { connect } from 'react-redux';

import * as UIActions from '../../store/actions/index';
import classes from "./Assistant.module.css";
import Menu from "../SideMenu/Menu/Menu";

class Assistant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      width: 0,
      height: 0,
      mouseX: 0,
      mouseY: 0,
      pos: [93, 21],
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getLogoBackground = (glow) => {
    return ( !glow ? 
      <svg
        className={classes.LogoBackgorund}
        width={280}
        height={316}
        viewBox="0 0 280 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          className={classes.Shadow}
          cx="140.5"
          cy="224.615"
          rx="41.5"
          ry="13.3852"
          fill="url(#paint0_radial)"
        />
        <g filter="url(#filter0_d)">
          <path
            d="M179.399 168.455C179.399 171.947 180.269 211.52 139.93 211.52C99.0107 211.52 100.752 168.455 100.752 168.455C100.752 145.467 138.189 97.7459 139.93 96C141.672 97.7459 179.399 139.357 179.399 168.455Z"
            fill="url(#paint1_linear)"
          />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="0.741272"
            y={0}
            width="278.659"
            height="315.52"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={50} />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0.0933607 0 0 0 0 0.933606 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <radialGradient
            id="paint0_radial"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(140.5 224.615) rotate(90) scale(13.3852 41.5)"
          >
            <stop offset="0.586179" />
            <stop offset="0.758065" stopOpacity="0.622228" />
            <stop offset={1} stopOpacity={0} />
          </radialGradient>
          <linearGradient
            id="paint1_linear"
            x1="115.832"
            y1="150.414"
            x2="171.386"
            y2="197.407"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5D70C8" />
            <stop offset={1} stopColor="#A7FAE6" />
          </linearGradient>
        </defs>
      </svg> : 
      <svg 
        className={classes.LogoBackgorund}
        width="230" height="264" viewBox="0 0 230 264" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_dd)">
        <path d="M154.399 142.434C154.399 145.877 155.269 184.893 114.93 184.893C74.0107 184.893 75.7519 142.434 75.7519 142.434C75.7519 119.77 113.189 72.7213 114.93 71C116.672 72.7213 154.399 113.746 154.399 142.434Z" fill="white"/>
        </g>
        <defs>
        <filter id="filter0_dd" x="0.741211" y="0" width="228.659" height="263.893" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOspacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="37.5"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.0685603 0 0 0 0 0.608795 0 0 0 0 1 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="10"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.58106 0 0 0 0 0.798909 0 0 0 0 1 0 0 0 0.8 0"/>
        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
        </filter>
        </defs>
      </svg>
    );
  };

  onMouseMove = (event) => {
    this.setState({
      mouseX: event.screenX,
      mouseY: event.screenY,
    });
  };

  calcStyles = (left) => {
    const { width, height, mouseX, mouseY } = this.state;
    const diffX = (mouseX / width) * 100 - this.state.pos[0];
    const diffY = (mouseY / height) * 100 - this.state.pos[1];
    const X = (0.8 / Math.sqrt(diffX * diffX + diffY * diffY)) * diffX;
    const Y = (0.5 / Math.sqrt(diffX * diffX + diffY * diffY)) * diffY;
    return {
      transform: `translate(${X}vh, ${Y}vh)`,
    };
  };

  render() {
    const menu = this.props.menuOpen ? (
      <Menu theme="light" onMouseMove={this.onMouseMove.bind(this)} />
    ) : (
      []
    );
    const eyes = this.props.menuOpen ? (
      <div className={classes.eyes}>
        <div style={this.calcStyles(true)} className={classes.eye}></div>
        <div style={this.calcStyles()} className={classes.eye}></div>
      </div>
    ) : (
      []
    );
    const overlay = this.props.menuOpen ? (
      <div
        onMouseMove={this.onMouseMove.bind(this)}
        className={classes.Overlay}
        onClick={this.props.onCloseMenu}
      ></div>
    ) : (
      []
    );

    return (
      <div className={classes.Container}>
        {overlay}
        <div
          onMouseMove={this.onMouseMove.bind(this)}
          onClick={this.props.menuOpen ? this.props.onCloseMenu : this.props.onOpenMenu}
          className={classes.Assistant}
        >
          {this.getLogoBackground(!this.props.menuOpen)}
          {eyes}
        </div>
        {menu}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuOpen: state.ui.menuOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenMenu: () => dispatch(UIActions.openMenu()),
    onCloseMenu: () => dispatch(UIActions.closeMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assistant);
