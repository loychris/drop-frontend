import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import LogoutIcon from './logout.svg';

import classes from "./Menu.module.css";
import AuthForm from "./AuthForm/AuthForm";
import MenuItem from "./MenuItem/MenuItem";
import MenuScreen from "../MenuScreen/MenuScreen";


class Menu extends Component { 

  componentDidMount = () => {
    console.log(this.props.token);
    if(this.props.token) this.setState({menuStack: ['LOGOUT']})
  }

  goBack = () => {
    this.setState({
      menuStack: this.props.menuStack.slice(0, this.props.menuStack.length-1),
      currentDepth: this.props.currentDepth-1
    });
  }

  addToMenuStack = (next) => {
    this.setState({
      menuStack: [...this.props.menuStack, next]
    })
  }

  getMenuScreen = () => {
    return <MenuScreen/>
  }


  getMenuScreens = () => {
    return this.props.menuStack.map((s,i) => {
      const pos = this.props.menuStack[this.props.currentDepth] === s ? 0 : i < this.props.currentDepth ? -1 : 1
      console.log(s, pos)
      return <MenuScreen key={s} screen={s} pos={pos} goBack={this.goBack} addToMenuStack={this.addToMenuStack}/>
    })
  }


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
          {this.props.token ? <p className={classes.Handle}>@{this.props.handle}</p> : null }
        </div>
        <hr/>
        <div className={classes.MenuItems}>
          {/* {this.props.token ? null : <AuthForm/> } */}
          { this.getMenuScreens() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    menuStack: state.ui.menu.menuStack, 
    darkmode: state.ui.darkmode,
    currentDepth: state.ui.menu.currentDepth, 

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

