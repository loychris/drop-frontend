import React, { Component } from 'react';
import classes from './Content.module.css';
// import URLs from '../../URLs.json';

class Content extends Component {

    render() {
        // const url = JSON.parse(URLs).links[this.props.id];
        return(
            <div
                className={classes.Content}>
                    {/* <img src={url} alt ='Shits not working'/> */}
            </div>    //const { height, width } = useWindowDimensions();

        )
    }
}

export default Content;