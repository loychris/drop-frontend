import React, { Component } from 'react';
import axios from 'axios';

import Loader from 'react-loader-spinner'

import classes from './Content.module.css';


class Content extends Component {

    state = {
        loaded: false
    }

    componentDidMount(){
        if(!this.state.loaded){
            axios.get(`/meme/${this.props.id}`)
                .then(response => {
                    this.setState({loaded: true, img: response.data})
                });
        }
    }

    render() {
        if(!this.state.loaded){
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
                            src={`http://localhost:5000/meme/${this.props.id}`} /> 
                    : null
                }
            </div> 
        )
    }
}

export default Content;