import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import classes from './Voting.module.css';
import * as actions from '../../../../../../store/actions/index';


class Voting extends Component {

    constructor(props) {
        super();
        this.state = {
            didUpvote: props.upvoted,
            didDownvote: props.downvoted,
            points: props.points
        }
    }

    getArrow = (up, glow) => {
        return(
            <svg 
                className={`${up ? classes.up : classes.down} ${glow ? classes.glow : null}`} 
                onClick={up ? this.upvote : this.downvote} 
                width="60" height="14" viewBox="0 0 60 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.036 1.70084C29.1634 0.724555 30.8366 0.724556 31.964 1.70084L58.5583 24.7322C60.658 26.5506 59.372 30 56.5943 30H3.40566C0.628007 30 -0.658012 26.5506 1.4417 24.7322L28.036 1.70084Z" 
                    fill={`${glow ? '#ffffff' : '#bbbbbb'}`}/>
            </svg>
        )
    }


    upvote = (event) => {
        event.stopPropagation();
        if(this.props.token){
            if(!this.state.didUpvote){
                let newState;
                const route = this.props.path ? `/api/comment/${this.props.commentId}/voteSub` : `/api/comment/${this.props.commentId}/vote`
                const body = this.props.path ? {vote: 'up', voterId: this.props.userId, path: this.props.path } : { vote: 'up' }
                const headers = this.props.token ? { headers: { authorization: `Bearer ${this.props.token}` } } : null 
                axios.post(
                    route, 
                    body,
                    headers
                ).then().catch(console.log);
                if(this.state.didDownvote){ // Up:0 down:1
                    newState = { didUpvote:true, didDownvote:false, points:this.state.points+2 }
                } else {                    // Up:0 down:0
                    newState = { didUpvote:true, didDownvote:false, points:this.state.points+1 }
                }
                this.setState(newState);
            } 
        } else {
            this.props.onOpenMenu("Create an Account to upvote Comments");
        }

        // nothing should happen otherwise; either already upvoted or both are true (should not happen)
    }

    downvote = (event) => {
        event.stopPropagation();
        if(this.props.token){
            if(!this.state.didDownvote){
                const route = this.props.path ? `/api/comment/${this.props.commentId}/voteSub` : `/api/comment/${this.props.commentId}/vote`
                const body = this.props.path ? {vote: 'down', voterId: this.props.userId, path: this.props.path } : { vote: 'down'}
                const headers = this.props.token ? { headers: { authorization: `Bearer ${this.props.token}` } } : null 
                axios.post(
                    route, 
                    body,
                    headers
                ).then().catch(console.log);
                if(this.state.didUpvote){ // Up:1 down:0
                    this.setState({ didDownvote:true, didUpvote:false, points:this.state.points-2 });
                } else {                    // Up:0 down:0
                    this.setState({ didDownvote:true, didUpvote:false, points:this.state.points-1 }); 
                }
            }
        } else {
            this.props.onOpenMenu();
        }
        // nothing should happen otherwise; either already downvoted or both are true (should not happen)
    }

    unvote = (event) => {
        event.stopPropagation();
        if(!this.props.token){
            this.props.onOpenMenu();
        } else if(this.state.didDownvote || this.state.didUpvote){
            const route = this.props.path ? `/api/comment/${this.props.commentId}/voteSub` : `/api/comment/${this.props.commentId}/vote`
            const body = this.props.path ? {vote: 'neutral', voterId: this.props.userId, path: this.props.path } : { vote: 'neutral' }
            const headers = this.props.token ? { headers: { authorization: `Bearer ${this.props.token}` } } : null 
            axios.post(
                route, 
                body,
                headers
            ).then().catch(console.log);

            if(this.state.didDownvote){
                this.setState({ didDownvote:false, didUpvote:false, points:this.state.points+1})
            } else if(this.state.didUpvote){
                this.setState({ didDownvote:false, didUpvote:false, points:this.state.points-1});
            } 
        }
    }
    
    //transforms the exact number of up/downvotes to a more presentable String 
    getCountString = number => {
        if(number >= 100000000){
            return `${Math.floor(number/1000000)}M`
        } else if(number >= 1000000){
            const firstDigit = Math.floor(number/1000000);
            const secondDigit = Math.floor((number-firstDigit*1000000)/100000);
            return `${firstDigit}.${secondDigit}M`;
        } else if(number >=100000) {
            return `${Math.floor(number/1000)}K`;
        } else if(number >= 1000){
            const firstDigit = Math.floor(number/1000);
            const secondDigit = Math.floor((number-firstDigit*1000)/100);
            return `${firstDigit}.${secondDigit}K`;
        }
        return `${number}`
    }

    render(){
        

        return(
            <div className={classes.voting}>
                {this.getArrow(true, this.state.didUpvote)}
                <div 
                    className={classes.points}
                    title={`${this.state.points} points`}
                    onClick={this.unvote}
                >
                    {this.getCountString(this.state.points)}
                </div>
                {this.getArrow(false, this.state.didDownvote)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      darkmode: state.ui.darkmode,
      token: state.user.token,
      userId: state.user.userId
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onOpenMenu: () => dispatch(actions.openMenu()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Voting);