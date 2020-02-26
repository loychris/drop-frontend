import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import FriendsListItem from './FriendsListItem/FriendsListItem';
import DropButton from '../DropButton/DropButton'; 

import classes from './DropOptionsMenu.module.css';

class DropOptionsMenu extends Component {

    state = {
        friends: [
            {type: 'person', profilePic: '', name: 'Felix', id:0},
            {type: 'person', profilePic: '', name: 'Alessio', id:1},
            {type: 'person', profilePic: '', name: 'Kirill', id:2},
            {type: 'person', profilePic: '', name: 'Ullreich', id:3},
            {type: 'person', profilePic: '', name: 'Erdolars', id:4},
            {type: 'person', profilePic: '', name: 'Max Mustenann', id:5},
            {type: 'person', profilePic: '', name: 'Frank Buschmann', id:6},
            {type: 'person', profilePic: '', name: 'Enton', id:7},
            {type: 'person', profilePic: '', name: 'David', id:8},
            {type: 'person', profilePic: '', name: 'Jon Bovi', id:8},
            {type: 'person', profilePic: '', name: 'Donald Trump', id:8},
            {type: 'person', profilePic: '', name: 'Elon Musk', id:8}
            
        ],
        selected: []
    }

    getFriendsList = () => {
        let friends = this.state.friends.map(x => {
            return <FriendsListItem type={x.type} profilePic={x.profilePic} name={x.name}/>
        });
        return friends;
    }

    render() {
        console.log('DropOptionsMenu render()');
        const friends = this.getFriendsList();
        console.log(friends);
        return(
        <Aux className={classes.DropOptionsMenu}>
            <h2 className={classes.MenuHeader}>Drop this picture to: </h2>
            <div className={classes.DropOptionsList}>
                {friends}
            </div> 
            <DropButton></DropButton>
        </Aux>
        )
    }

}
export default DropOptionsMenu;