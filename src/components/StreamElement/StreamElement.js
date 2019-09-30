import React, { Component } from 'react';
import classes from './StreamElement.module.css';
import { anyTypeAnnotation } from '@babel/types';


class StreamElement extends Component {
    
    calcStyles(pos){
        const r = 100; //Abstand vom Auge zur Projektion
        const x = 100 + pos * 20; //Abstand von der Projektion zum Objekt
        const y = 200; //Vertikale position des Objekts
        const h = 800; //Höhe des Objekts
        const b = 1000; //Breite des Objekts

        const alpha = Math.atan(y/(x+r)); //Winkel zwischen Achse und Beginn des Objekts
        const beta = Math.atan((y+h)/(x+r)); // Winkel zwischen Achse und Ende des Objekts
        const yy = r * Math.tan(alpha);
        const hh = r * Math.tan(beta) - yy;
        const gamma = Math.atan( (b/2) / (r+x) ) //Winkel zwischen Achse und linker/rechter Kante
        const bb = 2 * r * Math.tan(gamma); //projezierte Breite
        const styles = {
            marginTop: yy,
            width: bb, 
            height: hh
        };
        return styles; 
    }

    // calcHeight(pos){


    //     return hh;
    // }

    // calcMarginTop(pos){
    //     const r = 100; //Abstand vom Auge zur Projektion
    //     const x = 100 + pos * 20; //Abstand von der Projektion zum Objekt
    //     const y = 30; //Vertikale position des Objekts
    //     const h = 800; //Höhe des Objekts
    //     const alpha = Math.atan(y/(x+r)); //Winkel zwischen Achse und Beginn des Objekts
    //     const beta = Math.atan((y+h)/(x+r)); // Winkel zwischen Achse und Ende des Objekts
    //     const yy = r * Math.tan(alpha); // projezierter Margin-Top
    //     return yy;
    // }

    // calcWidth(pos){
    //     const r = 100; //Abstand vom Auge zur Projektion
    //     const x = 100 + pos * 20; //Abstand von der Projektion zum Objekt
    //     const b = 1000; //Breite des Objekts

    //     console.log(bb);
    //     return bb;
    // }

    render(){

        return(
            <div 
                className={classes.StreamElement}
                style={this.calcStyles(this.props.position)}>
                    <img src="" className={classes.pic}/>
            </div>
        )
    }
}

export default StreamElement;