import React, { Component } from 'react';
import classes from './ChatPrev.module.css';
import DefaultProfilePic from '../../../media/DefaultProfilePic.png';
import DefaultGroupPic from '../../../media/DefaultGroupPic.png';

class ChatPrev extends Component {
    render(){
        return(
            <div className={classes.ChatPrev}>
                <img 
                    src={this.props.type === 'group' ? DefaultGroupPic : DefaultProfilePic} alt=' ' className={classes.ProfilePic}/>
                <div className={classes.Info}>
                    <h3 className={classes.Name}>{this.props.name}</h3>
                    <p className={classes.Preview}>{this.props.preview}</p>
                </div>

            </div>
        )
    }
}

export default ChatPrev;