import React, { Component } from 'react';
import classes from './Content.module.css';
import meme0 from './0.jpg';
import meme1 from './1.jpg';
import meme2 from './2.jpg';
import meme3 from './3.jpg';
import meme4 from './4.jpg';

class Content extends Component {

    componentDidUpdate() {
        // console.log('updated Content');
    }

    render() {
        let meme = [];
        switch(this.props.id % 4){
            case 1: meme = meme1;break;
            case 2: meme = meme2;break;
            case 3: meme = meme3;break;
            case 4: meme = meme4;break;
            default: meme = meme0;
        }
        return(
            <div className={classes.Content}>
                <img className={classes.Meme} src={meme} alt={`meme ${this.props.id}`}/>
            </div> 
        )
    }
}

export default Content;