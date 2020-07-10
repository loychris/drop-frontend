import React, { Component } from "react";
import classes from "./Assistant.module.css";
import Menu from "./Menu/Menu";

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

  getLogoBackground = () => {
    return (
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
      </svg>
    );
  };

  onMouseMove = (event) => {
    this.setState({
      mouseX: event.screenX,
      mouseY: event.screenY,
    });
  };

  //LeftEye:  1785 208
  //RightEye: 1825 208
  //Middle:   1803 208    93vw 21vh
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

  onOff = () => {
    const next = !this.state.activated;
    this.setState({ activated: next });
  };

  render() {
    const menu = this.state.activated ? (
      <Menu theme="light" onMouseMove={this.onMouseMove.bind(this)} />
    ) : (
      []
    );
    const eyes = this.state.activated ? (
      <div className={classes.eyes}>
        <div style={this.calcStyles(true)} className={classes.eye}></div>
        <div style={this.calcStyles()} className={classes.eye}></div>
      </div>
    ) : (
      []
    );
    const overlay = this.state.activated ? (
      <div
        onMouseMove={this.onMouseMove.bind(this)}
        className={classes.Overlay}
        onClick={this.onOff}
      ></div>
    ) : (
      []
    );

    return (
      <div className={classes.Container}>
        {overlay}
        <div
          onMouseMove={this.onMouseMove.bind(this)}
          onClick={this.onOff}
          className={classes.Assistant}
        >
          {this.getLogoBackground()}
          {eyes}
        </div>
        {menu}
      </div>
    );
  }
}

export default Assistant;
