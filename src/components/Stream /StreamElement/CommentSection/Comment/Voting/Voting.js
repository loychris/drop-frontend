import React, { Component } from 'react';
import classes from './Voting.module.css';
import arrowUp from './Upvote_Icon.svg';
import arrowDown from './Downvote_Icon.svg';

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
            if(this.state.didUpvote){ // Up:1 down:0
                newState = { didDownvote:true, didUpvote:false, points:this.state.points-2 }
            } else {                    // Up:0 down:0
                newState = { didDownvote:true, didUpvote:false, points:this.state.points-1 }
            }
            this.setState(newState);
        }
        // nothing should happen otherwise; either already downvoted or both are true (should not happen)
    }
    
    //transforms the exact number of up/downvotes to a more presentable String 
    getCountString = number => {
        if(number >= 1000000){
            const firstDigit = Math.floor(number/1000000);
            const secondDigit = Math.floor((number-firstDigit*1000000)/100000);
            return `${firstDigit}.${secondDigit}M`;
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
                    src= {arrowUp} 
                    alt='upvote'/>
                <div className={classes.points}>
                    {this.getCountString(this.state.points)}
                </div>
                <img true
                    className={classes.down}
                    onClick={this.downvote}
                    style={downvoteIconStyle}
                    src={arrowDown} 
                    onClick={this.downvote}
                    alt='downvote'/>
            </div>
        )
    }
}

export default Voting;