import React, { Component } from 'react';
import classes from './TopMenu.module.css';

class TopMenu extends Component {

    getRectangleIcon = () => {
        return(
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="26" height="26" rx="3" fill="white"/>
            </svg>

        )
    }

    getNewCircleIcon = () => {
        return(
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13Z" fill="white"/>
            </svg>
        )
    }

    getNewTextElementIcon = () => {
        return(
            <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H22.5V3H0V0Z" fill="white"/>
                <path d="M0 3H3V7H0V3Z" fill="white"/>
                <path d="M20 3H22.5V7H20V3Z" fill="white"/>
                <path d="M7 23H16V26H7V23Z" fill="white"/>
                <path d="M10 3H13V26H10V3Z" fill="white"/>
            </svg>
        )
    }

    getNewImageIcon = () => {
        return(
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.411133 20.9529L7.36393 14.0001L8.77815 15.4143L1.82535 22.3671L0.411133 20.9529Z" fill="white"/>
                <path d="M10.0928 19.2714L19.3641 10.0001L20.7783 11.4143L11.507 20.6856L10.0928 19.2714Z" fill="white"/>
                <path d="M7.41406 14L12.8181 19.404L11.4039 20.8182L5.99985 15.4142L7.41406 14Z" fill="white"/>
                <path d="M19.4141 10L25.778 16.364L24.3638 17.7782L17.9998 11.4142L19.4141 10Z" fill="white"/>
                <circle cx="9.5" cy="8.5" r="2.5" stroke="white" strokeWidth="2"/>
                <rect x="1" y="1" width="24" height="24" rx="1" stroke="white" strokeWidth="2"/>
            </svg>

        )
    }

    render(){
        return(
            <div className={classes.TopMenu}>
                <div 
                    className={classes.MenuItem}
                    onClick={() => this.props.addElement({
                        type: 'rect', 
                        elementId: `${Date.now()}`,
                        posX: 100,
                        posY: 100,
                        height: 400,
                        width: 400,
                        color: '#FF8592',

                    })}
                >
                    {this.getRectangleIcon()}
                </div>
                <div 
                    className={classes.MenuItem}
                    onClick={() => this.props.addElement({
                        type: 'text', 
                        elementId: `${Date.now()}`,
                        height: 60,
                        width: 400, 
                        posX: 100,
                        posY: 300,
                        text: 'Text Element 3',
                        font: 'Oswald',
                        fontSize: '30',
                        fontWeight: '700',
                        textAlign: 'center',
                        fixedWidth: true,
                        underline: false, 
                        italic: false, 
                        textStroke: true
                })}>
                    {this.getNewTextElementIcon()}
                </div>
                <div 
                    className={classes.MenuItem}
                    onClick={() => this.props.addElement({
                        type: 'image',
                        elementId: `${Date.now()}`,
                        imgSrc: 'https://storage.googleapis.com/drop-meme-bucket/meme-6022470ff97f5a363a80b387',
                        posX: 600,
                        posY: 600,
                        height: 400,
                        width: 400
                    })}>
                    {this.getNewImageIcon()}
                </div>
            </div>
        )
    }
}

export default TopMenu;