import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import FriendsListItem from '../FriendsListItem/FriendsListItem';

import classes from './DropOptionsMenu.module.css';

class DropOptionsMenu extends Component {

    state = {
        searchBarValue: '',
        targets: this.props.targets
    }

    getTargetsList = () => {
        let targets = this.props.targets;
        if(this.state.searchBarValue !== ''){
            return targets.filter( x => {
                return x.name.toLowerCase().startsWith(this.state.searchBarValue.toLowerCase());
            }).map(x => {
                return <FriendsListItem 
                            clicked={x.selected ? this.props.unselectTarget : this.props.selectTarget} 
                            type={x.type} 
                            profilePic={x.profilePic} 
                            selected={x.selected} 
                            name={x.name} 
                            id={x.id} 
                            key={x.id}/>
            }); 
        }
        return targets.map(x => {
            return <FriendsListItem 
                            clicked={x.selected ? this.props.unselectTarget : this.props.selectTarget} 
                            type={x.type} 
                            profilePic={x.profilePic} 
                            selected={x.selected} 
                            name={x.name} 
                            id={x.id} 
                            key={x.id}/>
        });
    }

    handleSearchBarChange = (event) => {
        this.setState({searchBarValue: event.target.value});
    }

    render() {
        const targets = this.getTargetsList();
        return(
        <Aux className={classes.DropOptionsMenu}>
            <h2 className={classes.MenuHeader}>Drop this picture to: </h2>
            <div className={classes.DropOptionsList}>
                {targets}
            </div>
            <input className={classes.SearchBar} 
                   type='text' 
                   onChange={this.handleSearchBarChange}/> 
        </Aux>
        )
    }

}
export default DropOptionsMenu;