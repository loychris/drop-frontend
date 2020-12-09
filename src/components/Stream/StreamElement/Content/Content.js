import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import * as actions from '../../../../store/actions';
import Source from './Source/Source';
import classes from './Content.module.css';


class Content extends Component {

    getLoader = () => {
        if(this.props.memeStatus === 'loaded' || this.props.position > 2){
            return null;
        }else {
            return <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/>
        }
    }
 
    render() {
        return(
            <div className={classes.Content}>
                <div className={classes.ContentContainer}>
                    {
                        (this.props.memeStatus === 'loaded' || this.props.currentlyLoadingMemeId === this.props.dropId) && this.props.position < 10
                        ? <img 
                            alt={`Meme ${this.props.id}`} 
                            className={classes.Meme} 
                            src={`https://storage.googleapis.com/drop-meme-bucket/meme-${this.props.dropId}`}
                            onLoad={() => this.props.onFetchMemeSuccess(this.props.dropId)}/>
                        : null
                    }
                    {this.getLoader()} 
                    {
                        this.props.source ? 
                        <Source sourceURL={this.props.source} /> 
                        : null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentlyLoadingMemeId: state.stream.currentlyLoadingMemeId
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onFetchMemeSuccess: (dropId) => dispatch(actions.fetchMemeSuccess(dropId)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Content);