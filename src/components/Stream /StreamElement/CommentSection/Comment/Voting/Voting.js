import React from 'react';
import classes from './Voting.module.css';
import arrowUp from './sort-up.png';
import arrowDown from './sort-down.png';

const voting = props => {

    const getCountString = number => {
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

    return(
        <div className={classes.voting}>
            <img className={classes.up} src= {arrowUp} alt='upvote'/>
            <div className={classes.points}>{getCountString(props.points)}</div>
            <img src={arrowDown} alt='downvote'/>
        </div>

    )
}

export default voting;