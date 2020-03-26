import React, { Component } from 'react';
import axios from 'axios';
import classes from './StreamElement.module.css';
import Content from './Content/Content'
import CommentSection from './CommentSection/CommentSection';
import DroppedToYouBy from './DroppedToYouBy/DroppedToYouBy';
import Source from './Source/Source';


// import LogoForButton from '../../../media/LogoForButton.png';

const NEUMORPHISM = true;

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

    calcStyles2(pos){
        const transY = pos*-2;
        const transZ = pos*-100;
        return {
            transform: `translate3d( 0, ${transY}px, ${transZ}px)`
        }
    }

    getPosClass(pos){
        switch(pos){
            case 0: return classes.Pos0;
            case 1: return classes.Pos1;
            case 2: return classes.Pos2;
            case 3: return classes.Pos3;
            case 4: return classes.Pos4;
            case 5: return classes.Pos5;
            case 6: return classes.Pos6;
            case 7: return classes.Pos7;
            case 8: return classes.Pos8;
            case 9: return classes.Pos9;
            case 10: return classes.Pos10;
            case 11: return classes.Pos11;
            case 12: return classes.Pos12;
            case 13: return classes.Pos13;
            case 14: return classes.Pos14;
            case 15: return classes.Pos15;
            case 16: return classes.Pos16;
            case 17: return classes.Pos17;
            case 18: return classes.Pos18;
            case 19: return classes.Pos19;
            case 20: return classes.Pos20;
            default: console.log('Invalid Position!');
        }
    }


    render(){
        //CommentSection is not loaded with the post but does its own api call
        const commentSection =
            this.props.position < 2  ?
            <CommentSection
                postId = {this.props.id}
                neuMorphism={NEUMORPHISM}
            /> : [];

        let droppedToYouBy = []
        let source = [];
        let cssClasses = [classes.StreamElement];
        let buttonClasses = [classes.DropButton];

        // cssClasses.push(this.getPosClass(this.props.position));

        if(NEUMORPHISM){buttonClasses.push(classes.DropButtonNeumorphism)} else {buttonClasses.push(classes.DropButtonFlat)}
        if(this.props.show === 'show') {cssClasses.push(classes.ShowDrop);}
        else if(this.props.show === 'right') {cssClasses.push(classes.FadedRight);}
        else if(this.props.show === 'left') {cssClasses.push(classes.FadedLeft);}
        if(this.state.postLoaded){
            if(this.props.position < 2 && this.state.post.droppedBy){
                droppedToYouBy =  <DroppedToYouBy names={this.state.post.droppedBy}/>;
            }
            if(this.state.post.droppedBy) {
                cssClasses.push('classes.DroppedByFriend');
            }
            if(this.state.post.source){
                source = <Source sourceURL={this.state.post.source}/>
            }

        }

        console.log(`
            `);
        return(
            <div
                onKeyPress={this.handleKeyPress}
                tabIndex="0"
                className={cssClasses.join(' ')}
                style={this.calcStyles2(this.props.position)}
                >
                    { droppedToYouBy }
                    <h3 className={classes.title}>{this.state.post ? this.state.post.title : `title of post ${this.props.id}`}</h3>
                    <Content position={this.props.position} id={this.props.id}/>
                    { source }
                    <button onClick={this.props.dropping} className={buttonClasses.join(' ')}>
                        <h3 className={classes.DROP}>Drop</h3>
                    </button>
                    { commentSection }
            </div>
        )
    }
}

export default StreamElement;
