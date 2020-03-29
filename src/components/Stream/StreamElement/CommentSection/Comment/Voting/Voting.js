import React, { Component } from 'react';
import axios from 'axios';
import classes from './Voting.module.css';
import arrowUpWhite from './Upvote_Icon_white.svg';
import arrowUpGrey from './Upvote_Icon_grey.svg';
import arrowDownWhite from './Downvote_Icon_white.svg';
import arrowDownGrey from './Downvote_Icon_grey.svg';


class Voting extends Component {

    constructor(props) {
        super();
        this.state = {
            didUpvote: false,
            didDownvote: false,
            points: props.points
        }
    }

    upvote = () => {
        if(!this.state.didUpvote){
            let newState = {};
            axios.post(`/post/${this.props.postId}/comment/${this.props.commentId}/vote`, {vote: 'up', user:'Voting User'});
            if(this.state.didDownvote){ // Up:0 down:1
                newState = { didUpvote:true, didDownvote:false, points:this.state.points+2 }
            } else {                    // Up:0 down:0
                newState = { didUpvote:true, didDownvote:false, points:this.state.points+1 }
            }
            this.setState(newState);
        }
        // nothing should happen otherwise; either already upvoted or both are true (should not happen)
    }

    downvote = () => {
        if(!this.state.didDownvote){
            let newState = {};
            axios.post(`/post/${this.props.postId}/comment/${this.props.commentId}/vote`, {vote: 'down', user:'Voting User'});
            if(this.state.didUpvote){ // Up:1 down:0
                newState = { didDownvote:true, didUpvote:false, points:this.state.points-2 }
            } else {                    // Up:0 down:0
                newState = { didDownvote:true, didUpvote:false, points:this.state.points-1 }
            }
            this.setState(newState);
        }
        // nothing should happen otherwise; either already downvoted or both are true (should not happen)
    }

    unvote = () => {
        let newState = {};
        if(this.state.didDownvote){
            axios.post(`/post/${this.props.postId}/comment/${this.props.commentId}/vote`, {vote: 'neutral', user:'Voting User'});
            newState = { didDownvote:false, didUpvote:false, points:this.state.points+1}
            this.setState(newState);
        } else if(this.state.didUpvote){
            axios.post(`/post/${this.props.postId}/comment/${this.props.commentId}/vote`, {vote: 'neutral', user:'Voting User'});
            newState = { didDownvote:false, didUpvote:false, points:this.state.points-1}
            this.setState(newState);
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
        
        const glow = {filter: 'drop-shadow(0px 0px 6px #ffffff)'};
        const upvoteIconstyle = this.state.didUpvote ? glow :{};
        const downvoteIconStyle = this.state.didDownvote ? glow :{};

        return(
            <div className={classes.voting}>
                <img 
                    className={classes.up} 
                    onClick={this.upvote}
                    style={upvoteIconstyle}
                    src={this.state.didUpvote?arrowUpWhite:arrowUpGrey} 
                    alt='upvote'/>
                <div 
                    className={classes.points}
                    title={`${this.state.points} points`}
                    onClick={this.unvote}
                >
                    {this.getCountString(this.state.points)}
                </div>
                <img 
                    className={classes.down}
                    onClick={this.downvote}
                    style={downvoteIconStyle}
                    src={this.state.didDownvote?arrowDownWhite:arrowDownGrey} 
                    alt='downvote'/>
            </div>
        )
    }
}

export default Voting;