import React, { useRef } from 'react';
import classes from './TopMenu.module.css';

const TopMenu = props => {

    const inputFile = useRef(null) 

    const getRectangleIcon = () => {
        return(
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="26" height="26" rx="3" fill="white"/>
            </svg>

        )
    }

    const getNewCircleIcon = () => {
        return(
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13Z" fill="white"/>
            </svg>
        )
    }

    const getNewTextElementIcon = () => {
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

    const getNewImageIcon = () => {
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

    const getShareIcon = () => {
        return(
            <svg 
                className={classes.shareIcon}
                width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="10.4472" y1="17.1056" x2="20.4472" y2="22.1056" stroke="#fff" strokeWidth="2"/>
                <line x1="9.55279" y1="13.1056" x2="19.5528" y2="8.10557" stroke="#fff" strokeWidth="2"/>
                <circle cx="6" cy="15" r="5" stroke="#fff" strokeWidth="2"/>
                <circle cx="24" cy="24" r="5" stroke="#fff" strokeWidth="2"/>
                <circle cx="24" cy="6" r="5" stroke="#fff" strokeWidth="2"/>
            </svg>

        )
    }

    const getDownLoadIcon = () => {
        return(
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 26H6V33H34V26H39V35C39 36.6569 37.6569 38 36 38H4C2.34315 38 1 36.6569 1 35V26Z" fill="#ffffff"/>
                <path d="M16 1C16 0.447716 16.4477 0 17 0H23C23.5523 0 24 0.447715 24 1V18H28.8439C29.6953 18 30.1572 18.996 29.6073 19.6459L20.7634 30.0978C20.3639 30.5699 19.6361 30.5699 19.2366 30.0978L10.3927 19.6459C9.84279 18.996 10.3047 18 11.1561 18H16V1Z" fill="#ffffff"/>
            </svg>
        )
    }

    const onFileInput =  (event) => {
        console.log("FILE INPUT")
        let posX = 100;
        let posY = 100; 
        let elements = []; 
        for(let i=0; i<event.target.files.length;i++){
            console.log(event.target.files[i]); 
            elements.push({
                type: 'image', 
                elementId: `${Date.now()}${i}`, 
                height: 100,
                width: 100,
                posX, 
                posY,
                file: event.target.files[i]
            })
            posX += 20; 
            posY += 20; 
        }
        props.addElements(elements)
    }

    const addImageClickHandler = () => {
        inputFile.current.click();
    }

    return(
        <div className={classes.TopMenu}>
            <div className={classes.LeftAlign}>
                <div 
                    className={classes.MenuItem}
                    onClick={() => props.addElements([{
                        type: 'rect', 
                        elementId: `${Date.now()}`,
                        posX: 100,
                        posY: 100,
                        height: 400,
                        width: 400,
                        color: '#FF8592',
                    }])}
                >
                    {getRectangleIcon()}
                </div>
                <div 
                    className={classes.MenuItem}
                    onClick={() => props.addElements([{
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
                }])}>
                    {getNewTextElementIcon()}
                </div>
                <div 
                    className={classes.MenuItem}
                    onClick={addImageClickHandler}>
                    {getNewImageIcon()}
                </div>
            </div>
            <div className={classes.RightAlign}>
                <div 
                    className={classes.MenuItem}
                    onClick={props.openExportModal}>
                    {getShareIcon()}
                </div>
                <div 
                    className={classes.MenuItem}
                    onClick={props.openExportModal}>
                    {getDownLoadIcon()}
                </div>
            </div>
            <input type='file' id='file' multiple ref={inputFile} style={{display: 'none'}} onInput={onFileInput}/>
        </div>
    )
}

export default TopMenu;