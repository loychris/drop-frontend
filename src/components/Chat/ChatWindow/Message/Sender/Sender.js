import React, { Component } from 'react';

import classes from './Sender.module.css';
import DefaultProfilePic from '../../../../../media/DefaultProfilePic.png';


class Sender extends Component {



    render() {
        return (
            <div className={classes.Sender}>
                <img src={DefaultProfilePic} alt=" "  className={classes.ProfilePic}/>
                <div className={classes.SenderName}>{this.props.sender}</div>
          </div>
        )
    }
}

export default Sender;