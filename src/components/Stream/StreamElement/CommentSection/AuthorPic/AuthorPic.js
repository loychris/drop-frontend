import React, { Component } from 'react';
import classes from './AuthorPic.module.css'
import DefaultPic from '../../../../../media/DefaultProfilePic.png';

class AuthorPic extends Component {

    render(){
        return (
            <img src={DefaultPic} className={classes.AuthorPic} style={{left: `${this.props.depth*this.props.indent}px`}}/>
        )
    }

}

export default AuthorPic;