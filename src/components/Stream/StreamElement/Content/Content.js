import React, { Component } from 'react';
import classes from './Content.module.css';
import meme0 from './0.jpg';
import meme1 from './1.jpg';
import meme2 from './2.jpg';
import meme3 from './3.jpg';
import meme4 from './4.jpg';

class Content extends Component {

    render() {
        // const url = JSON.parse(URLs).links[this.props.id];
        let meme = [];
        switch(this.props.id % 4){
            case 1: meme = meme1;break;
            case 1: meme = meme2;break;
            case 1: meme = meme3;break;
            case 1: meme = meme4;break;
            default: meme = meme0;
        }
        return(
            <div className={classes.Content}>
                <img className={classes.Meme} src={meme} alt={`meme ${this.props.id}`}/>
                    {/* <img src={url} alt ='Shits not working'/> */}
            </div>    //const { height, width } = useWindowDimensions();
        )
    }
}

export default Content;