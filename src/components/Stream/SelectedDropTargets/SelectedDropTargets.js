import React, { Component } from 'react'; 
import FriendsListItem from '../FriendsListItem/FriendsListItem';
import classes from './SelectedDropTargets.Module.css';
import NeumorphismButton from '../../UI/NeumorphismButton/NeumorphismButton';

class SelectedDropTargets extends Component {

    componentDidUpdate(){
        console.log("updated SelectedDropTargets");
    }

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
                    <NeumorphismButton
                        buttonType='DropButton'
                        colorTheme='dark'
                        clicked={() => {}}>
                        <h2>Drop</h2>
                    </NeumorphismButton>
                </div>
            </div>
        )
    }
}

export default SelectedDropTargets;