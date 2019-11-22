import React from 'react'; 
import StreamElement from './StreamElement/StreamElement';
import Aux from '../../hoc/Aux';
import classes from './Stream.module.css';
//import useWindowDimensions from './useWindowDimensions/userWindowDimensions'

const Stream = () => {

    //const { height, width } = useWindowDimensions();
    

    let elements = [];
    for(let i=0; i<20;i++){
        elements.push(<StreamElement position={20-i} key={20-i}/>)
    }
    return (
        <Aux className={classes.stream}>

            {elements}                
        </Aux>     
    )

}

export default Stream;