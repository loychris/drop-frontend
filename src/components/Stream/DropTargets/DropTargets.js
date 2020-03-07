import React, { Component } from 'react'; 
import DropButton from '../../UI/DropButton/DropButton';
import FriendsListItem from '../FriendsListItem/FriendsListItem';
import classes from './DropTargets.Module.css';

class DropTargets extends Component {



    render() {
        let selectedTargets = this.props.selectedTargets && this.props.selectedTargets.length > 0 ? this.props.selectedTargets.map(x => {
            return <FriendsListItem 
                        clicked={this.props.unselectTarget} 
                        type={x.type} 
                        profilePic={x.profilePic} 
                        selected={x.selected} 
                        name={x.name} 
                        id={x.id} 
                        key={x.id}/>
        }) : [];
        

        return(
            <div>
                <h2>Drop it to: </h2>
                <div className={classes.SelectedTargetsList}>
                    {selectedTargets}
                    <DropButton active={selectedTargets.length > 0}/>

                </div>
            </div>
        )
    }
}

export default DropTargets;