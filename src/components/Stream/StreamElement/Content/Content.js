import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

import * as actions from '../../../../store/actions';
import Source from './Source/Source';
import classes from './Content.module.css';


class Content extends Component {

    getLoader = () => {
        if(this.props.position > 2) return null;
        if(this.props.memeStatus !== 'loaded'){
            return <Loader className={classes.Spinner} type="Puff" color="#00BFFF" height={50} width={50}/>
        }
    }
 
    render() {
        const src = this.props.dropId.startsWith('no') 
                    ? `${process.env.REACT_APP_MEME_SOURCE_URL}6022a6fec54847291bdee46c`
                    : `${process.env.REACT_APP_MEME_SOURCE_URL}${this.props.dropId}`
        return(
            <div className={classes.Content}>
                <div className={classes.ContentContainer}>
                    {
                        (this.props.memeStatus === 'loaded' || this.props.currentlyLoadingMemeId === this.props.dropId) && this.props.position < 10 
                        ? <img 
                            alt={`Meme ${this.props.id}`} 
                            className={classes.Meme} 
                            src={src}
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