import React, { Component } from 'react';
import classes from './FreindsListItem.module.css';
import profilePic from '../../../media/DefaultProfilePic.png';

class FriendsListItem extends Component {
    render() {
        const styleClasses = [this.props.selected ? classes.selected : classes.notSelected, classes.FriendsListItem];
        return(
            <div className={styleClasses.join(' ')} onClick={() => {this.props.clicked(this.props.id)}}>
                <img src={profilePic} className={classes.ProfilePictureFriend} alt='Profile Pic Friend/group'/> 
                <div className={classes.NameContainer}>
                    <span className={classes.Name}>{this.props.name}</span>
                    <span className={classes.Description}>{this.props.description}</span>
                </div>
            </div> 
        )
    }
}

export default FriendsListItem;