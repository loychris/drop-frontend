import React, { Component } from 'react';
import Loader from 'react-loader-spinner'; 

import classes from './AddButton.module.css';

class AddButton extends Component {

    state = {
        mouseOver: false
    }

    getAddIcon = () => {
        if(this.state.mouseOver){
            return(
                <svg className={classes.AddIconGLow} width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="person_add_24px">
                    <g id="icon/social/person_add_24px" filter="url(#AddFriendButtonGlow)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 13C21.21 13 23 11.21 23 9C23 6.79 21.21 5 19 5C16.79 5 15 6.79 15 9C15 11.21 16.79 13 19 13ZM19 7C20.1 7 21 7.9 21 9C21 10.1 20.1 11 19 11C17.9 11 17 10.1 17 9C17 7.9 17.9 7 19 7ZM11 19C11 16.34 16.33 15 19 15C21.67 15 27 16.34 27 19V21H11V19ZM13 19C13.22 18.28 16.31 17 19 17C21.7 17 24.8 18.29 25 19H13ZM10 13V16H8V13H5V11H8V8H10V11H13V13H10Z" fill="white"/>
                    </g>
                    </g>
                    <defs>
                        <filter id="AddFriendButtonGlow" x="0" y="0" width="32" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                        <feOffset/>
                        <feGaussianBlur stdDeviation="2.5"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0.791667 0 0 0 0 0.875 0 0 0 0 1 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            )
        }
        return (
            <svg className={classes.AddIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="person_add_24px">
                    <path id="icon/social/person_add_24px" fillRule="evenodd" clipRule="evenodd" d="M15 12C17.21 12 19 10.21 19 8C19 5.78998 17.21 4 15 4C12.79 4 11 5.78998 11 8C11 10.21 12.79 12 15 12ZM15 6C16.1 6 17 6.90002 17 8C17 9.09998 16.1 10 15 10C13.9 10 13 9.09998 13 8C13 6.90002 13.9 6 15 6ZM7 18C7 15.34 12.33 14 15 14C17.67 14 23 15.34 23 18V20H7V18ZM9 18C9.21997 17.28 12.3101 16 15 16C17.7 16 20.8 17.29 21 18H9ZM6 12V15H4V12H1V10H4V7H6V10H9V12H6Z" fill="#abcdef" />
                </g>
            </svg>
        )
    }

    getCheckMark = () => {
        return(
            <svg className={classes.AddIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="check_24px">
            <path id="icon/navigation/check_24px" d="M8.79496 15.875L4.62496 11.705L3.20496 13.115L8.79496 18.705L20.795 6.70501L19.385 5.29501L8.79496 15.875Z" fill="#ABCDEF"/>
            </g>
            </svg>
        )
    }

    render() {

        let styleClasses = [classes.AddButton]
        let button;
        let title;
        if(this.props.type==='loading'){
            button = <Loader className={classes.Spinner} type="TailSpin" color="#202040" height={18} width={18}/>; 
            styleClasses.push(classes.Clicked)
        }
        if(this.props.type === 'add'){
            button = this.getAddIcon(); 
            title = 'Add Friend';
            styleClasses.push(classes.GlowOnHover);
        }
        if(this.props.type === 'accept'){
            button = <span className={classes.Accept}>accept</span>;
            title = 'Accept Friend Request';
            styleClasses.push(classes.GlowOnHover);
        }
        if(this.props.type === 'sent'){
            button = this.getCheckMark();
            title = 'Friend Request Sent';
        }
        return(
            <div 
                title={title} 
                className={styleClasses.join(' ')} 
                onClick={this.props.clicked}
                onMouseEnter={() => this.setState({mouseOver: true})}
                onMouseLeave={() => this.setState({mouseOver: false})}
                >
                {button}
            </div>
        )
    }
}

export default AddButton;