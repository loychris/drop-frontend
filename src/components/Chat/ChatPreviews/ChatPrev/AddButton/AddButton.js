import React, { Component } from 'react';
import Loader from 'react-loader-spinner'; 

import classes from './AddButton.module.css';

class AddButton extends Component {


    getAddIcon = (inverted) => {
        return (
            <svg className={classes.AddIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="person_add_24px">
                    <path id="icon/social/person_add_24px" fillRule="evenodd" clipRule="evenodd" d="M15 12C17.21 12 19 10.21 19 8C19 5.78998 17.21 4 15 4C12.79 4 11 5.78998 11 8C11 10.21 12.79 12 15 12ZM15 6C16.1 6 17 6.90002 17 8C17 9.09998 16.1 10 15 10C13.9 10 13 9.09998 13 8C13 6.90002 13.9 6 15 6ZM7 18C7 15.34 12.33 14 15 14C17.67 14 23 15.34 23 18V20H7V18ZM9 18C9.21997 17.28 12.3101 16 15 16C17.7 16 20.8 17.29 21 18H9ZM6 12V15H4V12H1V10H4V7H6V10H9V12H6Z" fill={inverted ? "#444444" : "#abcdef" } />
                </g>
            </svg>
        )
    }

    getCheckMark = () => {
        return(
            <svg className={classes.AddIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="check_24px">
            <path id="icon/navigation/check_24px" d="M8.79496 15.875L4.62496 11.705L3.20496 13.115L8.79496 18.705L20.795 6.70501L19.385 5.29501L8.79496 15.875Z" fill="#abcdef"/>
            </g>
            </svg>
        )
    }

    render() {

        let styleClasses = [classes.AddButton]
        let button;
        let title;
        if(this.props.type==='sending'){
            button = <Loader className={classes.Spinner} type="TailSpin" color={this.props.inverted ? '#000000' : '#abcdef'} height={18} width={18}/>; 
            styleClasses.push(classes.Loading)
            title = 'sending friend request...'
        }
        if(this.props.type==='accepting'){
            button = <Loader className={classes.Spinner} type="TailSpin" color={this.props.inverted ? '#000000' : '#abcdef'} height={18} width={18}/>; 
            styleClasses.push(classes.Loading)
            title = 'accepting friend request...'
        }
        if(this.props.type === 'add'){
            button = this.getAddIcon(this.props.inverted); 
            title = 'send friend request';
            styleClasses.push(classes.GlowOnHover);
            styleClasses.push(classes.Clickable);
        }
        if(this.props.type === 'received'){
            button = <span className={classes.TextButton}>accept</span>;
            title = 'accept friend request';
            styleClasses.push(classes.AcceptButton);
            styleClasses.push(classes.GlowOnHover);
            styleClasses.push(classes.Clickable);
        }
        if(this.props.type === 'sent'){
            button = <span className={classes.TextButton}>requested</span>;
            title = 'friend request sent';
        }
        styleClasses.push(this.props.inverted ? classes.Inverted : classes.NotIverted);
        
        return(
            <div 
                title={title} 
                className={styleClasses.join(' ')} 
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.props.clicked()
                }}
                >
                {button}
            </div>
        )
    }
}

export default AddButton;