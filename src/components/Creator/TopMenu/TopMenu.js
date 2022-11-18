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

    // const getNewCircleIcon = () => {
    //     return(
    //         <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13Z" fill="white"/>
    //         </svg>
    //     )
    // }

    const getMemeIcon = () => {
        return(
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.172 12V7.8336C10.172 7.3184 10.1888 6.792 10.2224 6.2544C10.2672 5.7056 10.312 5.2464 10.3568 4.8768C10.4016 4.5072 10.4296 4.272 10.4408 4.1712H10.3736L8.24 12H5.3336L3.1832 4.188H3.116C3.1272 4.2888 3.1552 4.524 3.2 4.8936C3.256 5.252 3.3064 5.7056 3.3512 6.2544C3.396 6.792 3.4184 7.3184 3.4184 7.8336V12H0.00799999V0.4416H5.2496L6.9968 7.1112H7.064L8.7944 0.4416H13.8512V12H10.172ZM15.856 0.4416H25.852V3.2136H19.5688V4.8096H24.9448V7.464H19.5688V9.228H25.9696V12H15.856V0.4416ZM10.172 26V21.8336C10.172 21.3184 10.1888 20.792 10.2224 20.2544C10.2672 19.7056 10.312 19.2464 10.3568 18.8768C10.4016 18.5072 10.4296 18.272 10.4408 18.1712H10.3736L8.24 26H5.3336L3.1832 18.188H3.116C3.1272 18.2888 3.1552 18.524 3.2 18.8936C3.256 19.252 3.3064 19.7056 3.3512 20.2544C3.396 20.792 3.4184 21.3184 3.4184 21.8336V26H0.00799999V14.4416H5.2496L6.9968 21.1112H7.064L8.7944 14.4416H13.8512V26H10.172ZM15.856 14.4416H25.852V17.2136H19.5688V18.8096H24.9448V21.464H19.5688V23.228H25.9696V26H15.856V14.4416Z" fill="white"/>
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
        for(let i=0; i<event.target.files.length;i++){
            let fr = new FileReader(); 
            fr.onload = () => {
                let image = new Image(); 
                image.src = fr.result; 
                image.onload = () => {
                    props.addElements([{
                        type: 'image', 
                        elementId: `${Date.now()}${i}`, 
                        height: image.height,
                        width: image.width,
                        posX, 
                        posY,
                        imgSrc: image.src,
                        rotation: 0,
                    }])
                }
            }
            fr.readAsDataURL(event.target.files[i]); 
            posX += 20; 
            posY += 20; 
        }
    }

    const addImageClickHandler = () => {
        inputFile.current.click();
    }

    return(
        <div className={classes.TopMenu}>
            <div className={classes.LeftAlign}>
                <div className={classes.MenuItem} onClick={props.toggleMemeMenu}>
                    {getMemeIcon()}
                </div>
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
                        rotation: 0,
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
                        textStroke: true,
                        rotation: 0,
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