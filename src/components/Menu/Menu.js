import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';

import ToggleSwitch from '../UI/ToggleSwitch/ToggleSwitch';


import classes from './Menu.module.css';
import * as UIActions from '../../store/actions/index';
import gear from './gear.svg';

class Menu extends Component {

    getGear = () =>  {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            enableBackground="new 0 0 512.002 512.002"
            version="1.1"
            viewBox="0 0 512.002 512.002"
            xmlSpace="preserve"
          >
            <path
              fill= {this.props.darkmode ? "#ffffff" : "#000000"}
              d="M496.647 312.107l-47.061-36.8a171.245 171.245 0 000-38.656l47.104-36.821c8.827-7.109 11.186-19.575 5.568-29.419l-48.96-84.629c-5.639-9.906-17.649-14.232-28.309-10.197L369.522 97.9a190.011 190.011 0 00-33.323-19.349l-8.512-58.923C326.152 8.316 316.447-.092 305.031.001h-98.133c-11.321-.068-20.948 8.246-22.528 19.456l-8.533 59.093a197.046 197.046 0 00-33.28 19.371L86.94 75.563c-10.55-4.159-22.549.115-28.096 10.005L9.841 170.347c-5.769 9.86-3.394 22.463 5.568 29.547l47.061 36.8a169.628 169.628 0 000 38.656l-47.104 36.8c-8.842 7.099-11.212 19.572-5.589 29.419l48.939 84.651c5.632 9.913 17.649 14.242 28.309 10.197l55.467-22.315a190.885 190.885 0 0033.344 19.371l8.533 58.88c1.502 11.282 11.147 19.694 22.528 19.648h98.133c11.342.091 21-8.226 22.592-19.456l8.533-59.093a197.434 197.434 0 0033.28-19.371l55.68 22.379c10.55 4.149 22.543-.122 28.096-10.005l49.152-85.12c5.503-9.83 3.084-22.196-5.716-29.228zm-240.683 50.56c-58.91 0-106.667-47.756-106.667-106.667s47.756-106.667 106.667-106.667S362.631 197.089 362.631 256c-.071 58.882-47.786 106.597-106.667 106.667z"
            ></path>
          </svg>
        );
      }

    render(){


        return(
            <div className={classes.menuContainer}>
                <div className={classes.gear}>
                    {this.getGear()}
                </div>
                <div className={`${classes.menu} ${this.props.darkmode ? classes.dark : classes.light}`}>
                    <div className={classes.menuOption}>
                        <label>Darkmode   </label>
                        <ToggleSwitch 
                            id="123456789"
                            text={["ON", "OFF"]}
                            defaultChecked={this.props.darkmode}
                            Small = {true}
                            onChange={this.props.darkmode ? this.props.onGoLight : this.props.onGoDark} />
                    </div>
                    <div className={classes.menuOption}>
                        <label>NSFW   </label>
                        <ToggleSwitch 
                            id="5423"
                            text={["ON", "OFF"]}
                            defaultChecked={this.props.darkmode}
                            Small = {true}
                            onChange={() => console.log("Turned NSFW on/off")} />
                    </div>
                    <div className={classes.menuOption}>
                        <label>Slow connection mode   </label>
                        <ToggleSwitch 
                            id="52342345"
                            text={["ON", "OFF"]}
                            defaultChecked={this.props.darkmode}
                            Small = {true}
                            onChange={() => console.log("Turned Slow connection mode on/off")} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      darkmode: state.ui.darkmode,

    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onGoDark: () => dispatch(UIActions.goDark),
        onGoLight: () => dispatch(UIActions.goLight)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Menu);