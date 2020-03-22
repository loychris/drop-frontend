import React, { Component } from 'react';
import FriendsListItem from '../../FriendsListItem/FriendsListItem';
import classes from './DroppedToYouBy.module.css';

class DroppedToYouBy extends Component {
    render(){
        const list = this.props.names.map(x => {
            return <FriendsListItem key={x} name={x}/>
        })
        return(
            <div className={classes.DroppedToYouBy}>
                <h3>Dropped to you by: </h3>
                {list}
        </div> 
        )
    }
}

export default DroppedToYouBy;