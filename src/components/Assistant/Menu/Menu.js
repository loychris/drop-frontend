import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actionTypes';


import classes from "./Menu.module.css";
import DropButton from "../../UI/DropButton/DropButton";


import Sun from "./Sun.png";
import Moon from "./Moon.png";

class Menu extends Component {


  changeTheme = (t) => {
    this.setState({ theme: t });
  };

  render() {
    let menuClasses = [classes.Menu];
    let lightButtonClasses = [classes.LightButton];
    let darkButtonClasses = [classes.DarkButton];
    if(this.props.darkmode){
      menuClasses.push(classes.DarkMenu); 
      darkButtonClasses.push(classes.Active);
      lightButtonClasses.push(classes.Inactive);
    } else {
      menuClasses.push(classes.LightMenu); 
      lightButtonClasses.push(classes.Active);
      darkButtonClasses.push(classes.Inactive);
    }

    return (
      <div className={menuClasses.join(' ')}>
        <h2>Settings</h2>
        <hr/>
        <ul>
          <li className={classes.MenuItem}>
            <h3>Wtf is going on here?</h3>
            <DropButton>
              <h3 className={classes.TourButton}>Show me around!</h3>
            </DropButton>
          </li>

          <li>menu punkt 3</li>
          <li>menu punkt 4</li>
          <li>menu punkt 5</li>
          <li>menu punkt 6</li>
          <li className={classes.MenuItem}>
            <div className={classes.Theme}>
              <div
                onClick={this.props.onGoDark}
                className={darkButtonClasses.join(" ")}
              >
                <span>Dark Mode</span>
                <img src={Moon} alt="" className={classes.Icon} />
              </div>
              <div
                onClick={this.props.onGoLight}
                className={lightButtonClasses.join(" ")}
              >
                <img src={Sun} alt="" className={classes.Icon} />
                <span>Light Mode</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGoDark: () => dispatch({type: actionTypes.GO_DARK}),
    onGoLight: () => dispatch({type: actionTypes.GO_LIGHT})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

