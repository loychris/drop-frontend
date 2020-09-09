import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import * as StreamActions from '../../../../store/actions';
import classes from './Content.module.css';


class Content extends Component {

    state = {
        loaded: false,
        file: null
    }

 
    render() {
        if(this.props.memeStatus === 'loading' || 'loaded'){
            return(
                <div className={classes.Content}>
                    {
                        this.props.position < 10 ? 
                            <img 
                                alt={`Meme ${this.props.id}`} 
                                className={classes.Meme} 
                                src={`http://localhost:5000/api/meme/${this.props.id}`} 
                                onLoad={() => this.props.onMemeLoaded(this.props.id)}/> 
                        : null
                    }
            </div>)
        }
        return(
            <div className={classes.Content}>
                {
                    this.props.position < 10 ? 
                    <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/>    
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onMemeLoaded: (dropId) => dispatch(StreamActions.memeLoaded(dropId))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Content);