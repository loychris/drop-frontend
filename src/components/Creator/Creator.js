import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./Creator.module.css";

class Creator extends Component {

  render() {
    const styleClasses = [classes.Creator];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeftLeft);
    if (this.props.currentTab === 'chat') styleClasses.push(classes.OutLeft);

    return (
      <div className={styleClasses.join(" ")}>
        <h1>WHATUP FUCKERS</h1>
        <hr/>
        <h2>THe sickest Meme Creator of the internet dropping soon.</h2>
        <h2>Signup now to get notified </h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    darkmode: state.ui.currentTab,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
