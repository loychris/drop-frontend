import React, { Component } from 'react'; 
import DropButton from '../../UI/DropButton/DropButton';
import FriendsListItem from '../FriendsListItem/FriendsListItem';

class DropTargets extends Component {



    render() {
        let selectedTargets = this.props.selectedTargets && this.props.selectedTargets.length > 0 ? this.props.selectedTargets.map(x => {
            return <FriendsListItem select={this.props.selectTarget} type={x.type} profilePic={x.profilePic} selected={x.selected} name={x.name} id={x.id} key={x.id}/>
        }) : [];
        

        return(
            <div>
                <h2>Drop it to: </h2>
                {selectedTargets}
                <DropButton active={selectedTargets.length > 0}/>
            </div>
        )
    }
}

export default DropTargets;