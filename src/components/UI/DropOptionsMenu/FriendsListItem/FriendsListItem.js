import React, { Component } from 'react';
import classes from './FreindsListItem.module.css';
import profilePic from '../../../../media/DefaultProfilePic.png';

class FriendsListItem extends Component {
    render() {
        return(
            <div className={classes.FriendsListItem}>
                <div className={classes.CheckboxContainer}>
                    <input type='checkbox' className={classes.Checkbox} checked={this.props.checked}/>
                </div>
                <div className={classes.ProfilePicContainer}>
                    <img src={profilePic} className={classes.ProfilePictureFriend} alt='Profile Pic Friend/group'/> 
                </div>
                <div className={classes.NameContainer}>
                    <span className={classes.Name}>{this.props.name}</span>
                    <span className={classes.Description}>{this.props.description}</span>
                </div>
            </div> 
        )
    }
}

export default FriendsListItem;