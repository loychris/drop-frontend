import React, { Component } from 'react'; 
import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';


class Navigation extends Component {


    render(){
        return(
            <div className={classes.Navigation}>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                exact 
                                to='/chat'
                                activeClassName={classes.active}>
                                    Chat
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                exact 
                                to='/'
                                activeClassName={classes.active}>
                                    Stream
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navigation;