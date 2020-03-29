import React, { Component } from 'react';
import classes from './Source.module.css';

class Source extends Component {


    render(){
        return(
            <div className={classes.Source}>
                <p className={classes.Header}>Source:</p>
                <a  className={classes.Link} 
                    href={this.props.sourceURL}
                    >
                    {this.props.sourceURL}
                </a>
            </div>
        )
    }
}

export default Source;