import React, { Component } from 'react';

import classes from './MenuItem.module.css';

class MenuItem extends Component {
    render() {
        return(
            <div className={`${classes.MenuItem} ${this.props.invalid ? classes.Invalid : ''}`}>
                {this.props.children}
            </div>
        )
    }
}

export default MenuItem;