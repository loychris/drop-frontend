import React, { Component } from 'react'; 
import DropButton from '../../UI/DropButton/DropButton';
import FriendsListItem from '../FriendsListItem/FriendsListItem';

class DropTargets extends Component {



    render() {
        console.log(this.props.selectedTargets);
        let selectedTargets = this.props.selectedTargets.map(x => {
            return <FriendsListItem 
                selected={true}
                type={x.type} 
                profilePic={x.profilePic} 
                name={x.name} 
                key={x.id}/>
        })
        return(
            <div>
                <h2>Drop it to: </h2>
                {selectedTargets}
                <DropButton/>
            </div>
        )
    }
}

export default DropTargets;