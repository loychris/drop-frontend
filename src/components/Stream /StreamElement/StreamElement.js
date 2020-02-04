import React, { Component } from 'react';
import classes from './StreamElement.module.css';
import Content from './Content/Content'
import CommentSection from './CommentSection/CommentSection';
import DropButton from '../../UI/DropButton/DropButton';
import DropOptionsMenu from '../../UI/DropOptionsMenu/DropOptionsMenu';

const R = 200;  //Distance eye to projection
const Y = 150;  //vertical position of th object
const B = 1100; //width of the object 
const X = 100;  //Distance projection to element

class StreamElement extends Component {
    


    calcStyles(pos){
        const x = X + pos * 20;
        const yy = 5+R*Math.tan(Math.atan(Y/(x+R)));  //projected posY
        const bb = 2*R*Math.tan(Math.atan((B/2)/(x+R))); //projected width
        return {marginTop: yy-62, width: bb}; 
    }
  

    render(){
        const commentSection = this.props.position < 2 ? <CommentSection/> : [];
        let cssClasses = [classes.StreamElement];
        if(this.props.show === 'show') {cssClasses.push(classes.ShowDrop);}
        else if(this.props.show === 'right') {cssClasses.push(classes.FadedRight);}
        else if(this.props.show === 'left') {cssClasses.push(classes.FadedLeft);}
        return(
            <div 
                onKeyPress={this.handleKeyPress}
                tabIndex="0"
                className={cssClasses.join(' ')}
                style={this.calcStyles(this.props.position)}>
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