import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import MenuScreen from '../MenuScreen/MenuScreen';
import MenuItem from "../MenuItem/MenuItem";

import classes from "./UserMenu.module.css";
import LogoutIcon from './logout.svg';



class UserMenu extends Component { 

  state = {

}

  componentDidUpdate = () => {
    if(this.props.shouldMoveRight) {
      this.props.onMoveRight()
      console.log('MOVE RIGHT!')
    }; 
  }


  getMenuScreens = () => {


    return this.props.menuStack.map((s,i) => {
        console.log(classes.LogoutContainer);
        console.log('########################')
        const pos = this.props.menuStack[this.props.currentDepth] === s ? 0 : i < this.props.currentDepth ? -1 : 1
        let content = []; 
        switch(s){
            case 'USER_MENU': 
                content.push(
                    <MenuItem  key={s}>
                        <div className={classes.LogoutContainer} onClick={this.props.onLogout}>
                          <img className={classes.LogoutIcon} src={LogoutIcon} alt='logoutIcon'/>
                          <p className={classes.LogoutText}>logout</p>
                        </div>
                    </MenuItem>
                );
                break; 
            default: console.log('INVALID ELEMENT ON MENU STACK');
        }
        return (
            <MenuScreen screen={s} pos={pos} goBack={this.goBack} addToMenuStack={this.addToMenuStack}  key={s}>
                {content}
            </MenuScreen>
        )
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
      <div className={classes.MenuItems}>
        { this.getMenuScreens() }
      </div>
      
    );
  }
}

const mapStateToProps = state => {

  return {
    menuStack: state.ui.menu.menuStack, 
    darkmode: state.ui.darkmode,
    currentDepth: state.ui.menu.currentDepth, 
    shouldMoveRight: state.ui.menu.shouldMoveRight, 

    token: state.user.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMoveRight: () => dispatch(actions.moveRight()),
    onLogout: () => dispatch(actions.logout()), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);

