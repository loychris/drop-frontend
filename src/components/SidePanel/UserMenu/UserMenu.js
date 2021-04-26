import React, { Component } from "react";
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as actions from '../../../store/actions/index';

import MenuScreen from '../MenuScreen/MenuScreen';
import DropButton from '../../UI/DropButton/DropButton'; 
import MenuItem from "../MenuItem/MenuItem";
import Loader from "react-loader-spinner";

import classes from "./UserMenu.module.css";
import LogoutIcon from './logout.svg';
import ProfilePicPlaceholder from './ProfilePicPlaceholder.svg'; 



class AuthMenu extends Component { 

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
                      <h1>fjwefkjwen</h1>
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
      <div className={menuClasses.join(' ')}>
        <div className={classes.NameArea}>
          <h2 className={classes.Name}>{this.props.name}</h2>
          {this.props.token ? <p className={classes.Handle}>@{this.props.handle}</p> : null }
        </div>
        <hr/>
        <div className={classes.MenuItems}>
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
    shouldMoveRight: state.ui.menu.shouldMoveRight, 

    name: state.user.name, 
    handle: state.user.handle,
    token: state.user.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMoveRight: () => dispatch(actions.moveRight()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);

