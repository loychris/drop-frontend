import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import LogoutIcon from './logout.svg';

import classes from "./Menu.module.css";
import AuthForm from "./AuthForm/AuthForm";
import MenuItem from "./MenuItem/MenuItem";

class Menu extends Component { 

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
        <div className={classes.NameArea}>
          <h2 className={classes.Name}>{this.props.name}</h2>
          <p className={classes.Handle}>{this.props.handle}</p>
        </div>
        <hr/>
        <div className={classes.MenuItems}>
          {this.props.token ? null : <AuthForm/> }
          {this.props.token 
            ? <MenuItem>
                <div className={classes.LogoutContainer} onClick={this.props.onLogout}>
                  <img className={classes.LogoutIcon} src={LogoutIcon} alt='logoutIcon'/>
                  <p className={classes.LogoutText}>logout</p>
                </div>
              </MenuItem>
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkmode: state.ui.darkmode,

    userId: state.user.userId,
    name: state.user.name, 
    handle: state.user.handle,
    token: state.user.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGoDark: () => dispatch(actions.goDark()),
    onGoLight: () => dispatch(actions.goLight()),
    onLogout: () => dispatch(actions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

