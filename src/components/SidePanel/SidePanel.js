import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from "./SidePanel.module.css";
import DefaultProfilePic from '../../media/DefaultProfilePic.png';

import AuthMenu from "./AuthMenu/AuthMenu";



class SidePanel extends Component {



    getProfilePic = () => {
        let profilePicSrc = DefaultProfilePic;
        const token = localStorage.getItem('token');
        if(this.props.profilePicSrc){
            profilePicSrc = this.props.profilePicSrc;
        }else {
            if(token && this.props.hasProfilePic){
                profilePicSrc = `${process.env.REACT_APP_PROFILE_PICTURES_SOURCE_URL}` + this.props.userId; 
            }
        }
        return(
            <img 
                alt=''
                className={`${classes.ProfilePic} ${this.props.menuOpen ? classes.MenuOpen : ''}`} 
                src={profilePicSrc}/>
        )
    }

    render() {
        const menu = this.props.menuOpen ? <AuthMenu/> : null;

        return (
            <div className={classes.Container}>
                { this.props.menuOpen ? <div className={classes.Overlay} onClick={this.props.onCloseMenu}></div> : null }
                <div 
                    onClick={this.props.menuOpen ? this.props.onCloseMenu : this.props.onOpenMenu} 
                    className={classes.Assistant}>
                    { this.getProfilePic() }
                </div>
                { menu }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        menuOpen: state.ui.menu.open,
        token: state.user.token,
        userId: state.user.userId,
        hasProfilePic: state.user.hasProfilePic,
        profilePicSrc: state.user.profilePicSrc,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onOpenMenu: () => dispatch(actions.openMenu()),
      onCloseMenu: () => dispatch(actions.closeMenu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
