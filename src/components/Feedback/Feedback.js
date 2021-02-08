import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Feedback.module.css';

class Feedback extends Component {

    handleClicked = () => {
        if(this.props.token && this.props.userId !== '5fe08af76cece946855c16c9'){
            const self = {
                handle: this.props.handle,
                name: this.props.name, 
                profilePic: this.props.profilePic, 
                userId: this.props.userId
            }
            this.props.onOpenChrisChat(self);
        }
    }

    render(){
        return(
            <div className={classes.Feedback}>
                <h2>Got some feedback?<br/> Found a bug? <br/>Confused?</h2>
                Send a screenshot or text me!<br/><br/>
                +49 17682625207<br/>
                on here: <span onClick={this.handleClicked} className={this.props.token ? classes.Link : null}>@chris</span><br/>
                cloy202@gmail.com<br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
        userId: state.user.userId, 
        profilePic: state.user.profilePic, 
        handle: state.user.handle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenChrisChat: (self) => dispatch(actions.openChrisChat(self)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback); 