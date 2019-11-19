import React, { Component } from 'react';
import classes from './StreamElement.module.css';
import Content from './Content/Content'
import CommentSection from './CommentSection/CommentSection';


class StreamElement extends Component {

    state = {
        position: this.props.position,
        showComments: false
        
    }
    
    showComments = () => {
        console.log("Executing showcommetns")
        this.setState({showComments: true});
    }

    hideComments = () => {
        this.setState({showComments: false});
    }

    // Height should not be fix/calculated
    calcStyles(pos){
        const r = 100; //Distance eye to projection
        const x = 100 + pos * 12; //Distance projection to element
        const y = 180; //vertical position of th object
        //const h = 1800; //height of the object
        const b = 1400; //width of the object 

        // const alpha = Math.atan(y/(x+r)); //Winkel zwischen Achse und Beginn des Objekts
        // const beta = Math.atan((y+h)/(x+r)); // Winkel zwischen Achse und Ende des Objekts
        // const gamma = Math.atan( (b/2)/(r+x)) //WinWinkel zwischen Achse und Beginn des Objektskel zwischen Achse und linker/rechter Kante

        const yy = 5+r*Math.tan(Math.atan(y/(x+r)));  //projected posY
        // const hh = r*Math.tan(Math.atan((y+h)/(x+r)))-yy; //projected height
        const bb = 2*r*Math.tan(Math.atan( (b/2)/(r+x))); //projected width
        const styles = {
            marginTop: yy,
            width: bb, 
            //height: hh
        };
        return styles; 
    }

    

    render(){
        const commentSection = this.state.showComments === true ? <CommentSection/> : [];
        const showHideCommentsButton = this.state.showComments ? 
                <button className={classes.hideCommentsButton} onClick={this.hideComments}>HideComments</button> :
                <button className={classes.showCommentsButton} onClick={this.showComments}>Show Comments</button>
        return(
            <div 
                className={classes.StreamElement}
                style={this.calcStyles(this.state.position)}>
                    <h3 className={classes.title}>Title of the Drop</h3>
                    <Content/>
                    {showHideCommentsButton}
                    {commentSection}
            </div>
        )
    }
}

export default StreamElement;