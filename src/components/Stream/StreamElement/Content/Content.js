import React, { Component } from 'react';
import axios from 'axios';

import Loader from 'react-loader-spinner'

import classes from './Content.module.css';


class Content extends Component {

    state = {
        img: null,
        loaded: false
    }

    componentDidMount(){
        // if(!this.state.loaded && !this.props.id.startsWith("no")){
        //     axios.get(`/api/meme/${this.props.id}`)
        //         .then(response => {
        //             this.setState({loaded: true, img: response.data})
        //         });
        // }
    }

    render() {
        if(this.props.status === 'not loaded'){
            return(
                <div className={classes.Content}>
                    {
                        this.props.position < 3 ? 
                        <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/>    
                        : null
                    }
                </div>

            )
        }
        return(
            <div className={classes.Content}>
                {
                    this.props.position < 3 ? 
                        <img 
                            alt={`Meme ${this.props.id}`} 
                            className={classes.Meme} 
                            //src={this.state.img ? this.state.img : null}/>
                            //src={`http://localhost:5000/api/meme/5f552d928b538f58fca4ecf2`}/>
                            src={`http://localhost:5000/api/meme/${this.props.id}`} /> 
                    : null
                }
            </div> 
        )
    }
}

export default Content;