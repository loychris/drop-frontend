 import React, { Component } from 'react';
 import classes from './SelectionMenu.module.css';

 class SelectionMenu extends Component {

    render(){
        if(!this.props.selected) return null;
        return (
            <div className={classes.SelectionMenu}>
                
            </div>
        )
    }
 }

 export default SelectionMenu;