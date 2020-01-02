import React from 'react'; 
import StreamElement from './StreamElement/StreamElement';
import Aux from '../../hoc/Aux';
import classes from './Stream.module.css';

import River from '../../SVGs/River.svg';

const Stream = () => {

    
    let elements = [];
    for(let i=0; i<20;i++){
        elements.push(<StreamElement position={20-i} key={20-i}/>)
    }
    return (
        <Aux className={classes.stream}>
            <img src={River} alt='' className='River'/>
            {elements}    
        </Aux>     
    )

}

export default Stream;