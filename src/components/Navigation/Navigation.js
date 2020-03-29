import React, { Component } from 'react'; 
import classes from './Navigation.module.css';
// import { NavLink } from 'react-router-dom';


class Navigation extends Component {


    render(){
        return(
            <div className={classes.Navigation}>
                <nav>
                    <ul>
                        <li>
                            {/* <NavLink  
                                to='/chat'
                                activeClassName={classes.active}>
                                    Chat
                            </NavLink> */}
                            <span 
                                className={this.props.showing==='chat' ? classes.active : classes.inactive}
                                onClick={() => {this.props.changeTab('chat')}}>Chat</span>
                        </li>
                        <li>
                            {/* <NavLink 
                                exact 
                                to='/'
                                activeClassName={classes.active}>
                                    Stream
                            </NavLink> */}
                            <span 
                                className={this.props.showing==='stream' ? classes.active : classes.inactive}
                                onClick={() => {this.props.changeTab('stream')}}>Stream</span>
                        </li>

                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navigation;