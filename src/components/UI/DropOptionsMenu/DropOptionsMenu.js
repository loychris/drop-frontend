import React, { Component } from 'react';

import classes from './DropOptionsMenu.module.css';

import Aux from '../../../hoc/Aux'

class DropOptionsMenu extends Component {

    state = {
        receivers: [
            {name: 'Group1', type: 'group'},
            {name: 'Group2', type: 'group'},
            {name: 'Group3', type: 'group'},
            {name: 'Group4', type: 'group'},
            {name: 'Group5', type: 'group'},
            {name: 'Group6', type: 'group'},
            {name: 'Group7', type: 'group'},
            {name: 'Group8', type: 'group'},
            {name: 'Group9', type: 'group'},
            {name: 'friend1', type: 'person'},
            {name: 'friend2', type: 'person'},
            {name: 'friend3', type: 'person'},
            {name: 'friend4', type: 'person'},
            {name: 'friend5', type: 'person'},
            {name: 'friend6', type: 'person'},
            {name: 'friend7', type: 'person'},
            {name: 'friend8', type: 'person'},
            {name: 'friend9', type: 'person'}
        ]
    }

    generateList = () => {
        const currentReceivers = this.state.receivers;
        return currentReceivers.map(x => {
            return (
                <div>
                    <div className={classes.profilePic}></div>
                    {x.name}
                </div>
            )
        })
    }

    render() {

        return(
            <Aux>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div className={classes.DropOptionsMenu}
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                }}
                >

                </div>
            </Aux>
        )
    }
}

export default DropOptionsMenu;