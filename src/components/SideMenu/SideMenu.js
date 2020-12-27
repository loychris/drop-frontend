import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from "./SideMenu.module.css";
import DefaultProfilePic from '../../media/DefaultProfilePic.png';

import Menu from "./Menu/Menu";

class SideMenu extends Component {

    render() {
        const menu = this.props.menuOpen ? <Menu/> : null;
        let profilePicSrc = DefaultProfilePic;
        if(this.props.profilePicSrc){
            profilePicSrc = this.props.profilePicSrc;
        }else {
            if(this.props.token && this.props.hasProfilePic){
                profilePicSrc = 'https://storage.googleapis.com/drop-profile-pictures-bucket/profilePic-' + this.props.userId; 
            }
        }
        return (
            <div className={classes.Container}>
                { this.props.menuOpen ? <div className={classes.Overlay} onClick={this.props.onCloseMenu}></div> : null }
                <div 
                    onClick={this.props.menuOpen ? this.props.onCloseMenu : this.props.onOpenMenu} 
                    className={classes.Assistant}>
                <img 
                    className={`${classes.ProfilePic} ${this.props.menuOpen ? classes.MenuOpen : ''}`} 
                    src={profilePicSrc}/>
                </div>
                { menu }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        menuOpen: state.ui.menuOpen,
        token: state.user.token,
        hasProfilePic: state.user.hasProfilePic,
        userId: state.user.userId,
        profilePicSrc: state.user.profilePicSrc,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onOpenMenu: () => dispatch(actions.openMenu()),
      onCloseMenu: () => dispatch(actions.closeMenu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
