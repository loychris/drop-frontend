import React from 'react';
import classes from './Ellipse.module.css'; 

const Ellipse = (props) => {

    const {
        color, 
        height, 
        width, 
        elementId 
    } = props.element;

    return(
        <svg height={height} width={width}>
            <ellipse 
                cx={width / 2}
                cy={height / 2}
                rx={width / 2}
                ry={height / 2} 
                style={{fill: color, stroke: 'purple', strokeWidth: 2}}
            />  
        </svg>    
    )
}

export default Ellipse; 