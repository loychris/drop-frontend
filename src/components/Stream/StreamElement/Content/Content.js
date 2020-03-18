import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import classes from './Content.module.css';
import meme0 from './0.jpg';
import meme1 from './1.jpg';
import meme2 from './2.jpg';
import meme3 from './3.jpg';
import meme4 from './4.jpg';

class Content extends Component {

    state = {
        loaded: false
    }

    componentDidMount(){
        if(!this.state.loaded){
            axios.get(`http://localhost:5000/meme/${this.props.id}`)
                .then(response => {
                    console.log(response)
                    this.setState({loaded: true, img: response.data})
                });
        }
    }

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
                <img className={classes.Meme} src={`http://localhost:5000/meme/${this.props.id}`} />                    
            </div> 
        )
    }
}

export default Content;