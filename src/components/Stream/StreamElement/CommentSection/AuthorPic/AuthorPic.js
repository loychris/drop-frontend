import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import classes from './AuthorPic.module.css';
import DefaultPic from '../../../../../media/DefaultProfilePic.png';

class AuthorPic extends Component {


    render(){
        let profilePicSrc = DefaultPic;
        if(this.props.authorId && this.props.authorId === this.props.selfId){
            if(this.props.profilePicSrc){
                profilePicSrc = this.props.profilePicSrc;
            }else {
                if(this.props.token && this.props.hasProfilePic){
                    profilePicSrc = `${process.env.REACT_APP_PROFILE_PICTURES_SOURCE_URL}` + this.props.selfId; 
                }
            }
        }
        return (
            <img 
                src={profilePicSrc} 
                className={classes.AuthorPic} 
                style={{left: `${this.props.depth*this.props.indent}px`}}
                alt=' '/>
        )
    }
}

const mapStateToProps = state => {
    return {
        hasProfilePic: state.user.hasProfilePic,
        selfId: state.user.userId,
        token: state.user.token,

    }
}

export default connect(mapStateToProps, null)(AuthorPic);