import React, { Component } from 'react';
import classes from './StreamElement.module.css';
import Content from './Content/Content'
import CommentSection from './CommentSection/CommentSection';
import DropButton from '../../UI/DropButton/DropButton';

const R = 200;  //Distance eye to projection
const Y = 150;  //vertical position of th object
const B = 1100; //width of the object 
const X = 100;  //Distance projection to element

class StreamElement extends Component {

    state = {
        position: this.props.position,
        showComments: this.props.position === 1 ? true : false
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
        const x = X + pos * 20;
        const yy = 5+R*Math.tan(Math.atan(Y/(x+R)));  //projected posY
        const bb = 2*R*Math.tan(Math.atan((B/2)/(x+R))); //projected width
        const styles = {
            marginTop: yy-62,
            width: bb, 
        };
        return styles; 
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            console.log('enter press here!');
        }
    }
    

    render(){
        const commentSection = this.state.showComments ? <CommentSection/> : [];
        // const showHideCommentsButton = this.state.showComments ? 
        //         <button className={classes.hideCommentsButton} onClick={this.hideComments}>HideComments</button> :
        //         <button className={classes.showCommentsButton} onClick={this.showComments}>Show Comments</button>

        return(
            <div 
                onKeyPress={this.handleKeyPress}
                tabIndex="0"
                className={classes.StreamElement}
                style={this.calcStyles(this.state.position)}>
                    <h3 className={classes.title}>Title of the Drop</h3>
                    <Content/>
                    <DropButton clicked={this.props.openDropMenu}/>
                    {/* {showHideCommentsButton} */}
                    {commentSection}
            </div>
        )
    }
}

export default StreamElement;