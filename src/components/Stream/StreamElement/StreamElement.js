import React, { Component } from 'react';
import axios from 'axios';
import classes from './StreamElement.module.css';
import Content from './Content/Content'
import CommentSection from './CommentSection/CommentSection';
import DroppedToYouBy from './DroppedToYouBy/DroppedToYouBy';


// import LogoForButton from '../../../media/LogoForButton.png';


const R = 200;  //Distance eye to projection
const Y = 150;  //vertical position of th object
const B = 1100; //width of the object 
const X = 100;  //Distance projection to element

class StreamElement extends Component {

    state = {
        postLoaded: false
    }

    componentDidMount() {
        if(!this.state.postLoaded){
            axios.get(`/post/${this.props.id}`)
                .then(response => {
                    this.setState({postLoaded: true, post: response.data});
                });
        }
    }
    
    componentDidUpdate() {
        console.log('updated StreamElement');
    }

    shouldComponentUpdate(){
        return !this.props.currentlyDropping;
    }

    //////////////////////////////////////////////////////////////////////////
    calcStyles(pos){
        const x = X + pos * 20;
        const yy = 5+R*Math.tan(Math.atan(Y/(x+R)));  //projected posY
        const bb = 2*R*Math.tan(Math.atan((B/2)/(x+R))); //projected width
        return {marginTop: yy-62, width: bb}; 
    }
    //////////////////////////////////////////////////////////////////////////



    render(){
        const commentSection = 
            this.props.position < 2  ? 
            <CommentSection postId = {this.props.id}/> : [];

        const droppedToYouBy = 
            this.props.position < 2 
            && this.state.postLoaded 
            && this.state.post.droppedBy ?
            <DroppedToYouBy names={this.state.post.droppedBy}/> : [];



        let cssClasses = [classes.StreamElement];
        if(this.props.show === 'show') {cssClasses.push(classes.ShowDrop);}
        else if(this.props.show === 'right') {cssClasses.push(classes.FadedRight);}
        else if(this.props.show === 'left') {cssClasses.push(classes.FadedLeft);}
        
        if(this.state.postLoaded && this.state.post.droppedBy) {
            cssClasses.push('classes.DroppedByFriend');
        }
        
        
        return(
            <div 
                onKeyPress={this.handleKeyPress}
                tabIndex="0"
                className={cssClasses.join(' ')}
                style={this.calcStyles(this.props.position)}>
                    {droppedToYouBy}
                    <h3 className={classes.title}>{this.state.post ? this.state.post.title : `title of post ${this.props.id}`}</h3>
                    <Content position={this.props.position} id={this.props.id}/>
                    <button onClick={this.props.dropping} className={classes.DropButton}>
                        <h3>DROP</h3>
                    </button>
                    { commentSection }
            </div>
        )
    }
}

export default StreamElement;