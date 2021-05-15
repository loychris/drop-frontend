import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from "./SidePanel.module.css";
import DefaultProfilePic from '../../media/DefaultProfilePic.png';

import AuthMenu from "./AuthMenu/AuthMenu";
import UserMenu from "./UserMenu/UserMenu";



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
        let menuClasses = [classes.Menu, classes.DarkMode];
        return (
            <div className={classes.Container}>
                { this.props.menuOpen ? <div className={classes.Overlay} onClick={this.props.onCloseMenu}></div> : null }
                <div 
                    onClick={this.props.menuOpen ? this.props.onCloseMenu : this.props.onOpenMenu} 
                    className={classes.Assistant}>
                    { this.getProfilePic() }
                </div>
                {
                    this.props.menuOpen 
                    ? <div className={menuClasses.join(' ')}>
                        <div className={classes.NameArea}>
                        <h2 className={classes.Name}>{this.props.name}</h2>
                        {
                            this.props.token 
                            ? <p className={classes.Handle}>@{this.props.handle}</p>
                            : null 
                        }
                        </div>
                        <hr/>
                        { 
                            this.props.menuOpen 
                            ? this.props.token 
                                ? <UserMenu/> 
                                : <AuthMenu/> 
                            : null
                        }
                    </div>
                    : null
                }
 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        darkmode: state.ui.darkmode, 
        menuOpen: state.ui.menu.open,

        token: state.user.token,
        userId: state.user.userId,
        handle: state.user.handle,
        name: state.user.name, 

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
