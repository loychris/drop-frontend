import React, { Component } from 'react';
import classes from './TopMenu.module.css';

class TopMenu extends Component {

    render(){
        return(
            <div className={classes.TopMenu}>
                <div 
                    className={classes.MenuItem}
                    onClick={() => this.props.addElement({
                        type: 'text', 
                        elementId: `${Date.now()}`,
                        height: 59,
                        width: 270, 
                        posX: 300,
                        posY: 300,
                        text: 'Text Element 1',
                    })}
                >
                    
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
                </div>
                <div 
                    className={classes.MenuItem}
                    onClick={() => this.props.addElement({
                        type: 'rect',
                        elementId: `${Date.now()}`,
                        posX: 600,
                        posY: 600,
                        height: 400,
                        width: 400,
                        color: '#FF0000'
                    })}>
                </div>
            </div>
        )
    }
}

export default TopMenu;