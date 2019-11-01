import React, { Component } from 'react'; 
import StreamElement from './StreamElement/StreamElement';
import Aux from '../../hoc/Aux';
import classes from './Stream.module.css';

class Stream extends Component {


    getElementById( id ){
        return(
            <StreamElement key={id}/>
        )
    }

    render() {
        let elements = [];
        for(let i=0; i<20;i++){
            elements.push(<StreamElement position={20-i} key={19-i}/>)
        }
        return (
            <Aux className={classes.stream}>
                {elements}                
            </Aux>     

        )
    }
}

export default Stream;