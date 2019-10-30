import React, { Component } from 'react';
import classes from './StreamElement.module.css';
import { anyTypeAnnotation } from '@babel/types';
import Content from './Content/Content'
import CommentSection from './CommentSection/CommentSection';


class StreamElement extends Component {
    

    // Height should not be fix/calculated
    calcStyles(pos){
        const r = 100; //Distance eye to projection
        const x = 100 + pos * 15; //Distance projection to element
        const y = 200; //vertical position of th object
        //const h = 1800; //height of the object
        const b = 1400; //width of the object 

        const alpha = Math.atan(y/(x+r)); //Winkel zwischen Achse und Beginn des Objekts
        //const beta = Math.atan((y+h)/(x+r)); // Winkel zwischen Achse und Ende des Objekts
        const gamma = Math.atan( (b/2)/(r+x)) //WinWinkel zwischen Achse und Beginn des Objektskel zwischen Achse und linker/rechter Kante

        const yy = r*Math.tan(Math.atan(y/(x+r)));
        //const hh = r*Math.tan(Math.atan((y+h)/(x+r)))-yy;
        const bb = 2*r*Math.tan(Math.atan( (b/2)/(r+x))); //projezierte Breite
        const styles = {
            marginTop: yy,
            width: bb, 
            //height: hh
        };
        return styles; 
    }



    render(){
        return(
            <div 
                className={classes.StreamElement}
                style={this.calcStyles(this.props.position)}>
                    

                    {/* /////////////////////////////////////  Replace the following with proper Components & Content   ////////////////////////////////////////  */}
                    <h3>Title of the Drop</h3>
                    <Content/>
                    <CommentSection/>
                    {/* /////////////////////////////////////  ///////////////////////////////////////////////////////   ////////////////////////////////////////  */}

            </div>
        )
    }
}

export default StreamElement;