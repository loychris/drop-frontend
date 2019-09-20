import React, { Component } from 'react'; 
import StreamElement from '../StreamElement/StreamElement';
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
        for(let i=0;i<20;i++){
            elements.push(<StreamElement position={20-i} key={i}/>)
        }
        console.log(elements);

        return (
            <Aux className={classes.stream}>
                {elements}
                {/* <StreamElement position={1}/>
                <StreamElement position={2}/>
                <StreamElement position={3}/>
                <StreamElement position={4}/>
                <StreamElement position={5}/>
                <StreamElement position={6}/>
                <StreamElement position={7}/>
                <StreamElement position={8}/>
                <StreamElement position={9}/>
                <StreamElement position={10}/>
                <StreamElement position={11}/>
                <StreamElement position={12}/>
                <StreamElement position={13}/>
                <StreamElement position={14}/>
                <StreamElement position={15}/>
                <StreamElement position={16}/>
                <StreamElement position={17}/>
                <StreamElement position={18}/>
                <StreamElement position={19}/>
                <StreamElement position={20}/>
                <StreamElement position={21}/>
                <StreamElement position={22}/>
                <StreamElement position={23}/>
                <StreamElement position={24}/>
                <StreamElement position={25}/>
                <StreamElement position={26}/>
                <StreamElement position={27}/>
                <StreamElement position={28}/>
                <StreamElement position={29}/>
                <StreamElement position={30}/> */}
                
            </Aux>     

        )
    }
}

export default Stream;