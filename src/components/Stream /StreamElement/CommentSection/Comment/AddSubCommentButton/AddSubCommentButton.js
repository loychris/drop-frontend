import React, { Component } from 'react'; 
import classes from './AddSubComment.module.css';
import Plus from './smallPlus.svg';


class AddSubCommentButton extends Component {

    state = {
        expanded: false
    }

    getStyle = () => {
        if(this.props.first) return {top: '23px', left: '7px'}
        return {left:`${ this.props.indent*this.props.depth-12}px`}
    }



    //TODO
    addSubComment = () => {
        /*
        *
        *
        *
        */
        this.setState({expanded: true});
    }


    
    render() {
        const styleClass = this.state.expanded ? '' : classes.plus;
        return(
            <div 
                style={this.getStyle()}
                className={classes.showMoreBox} >
                <img 
                    onClick={this.addSubComment}
                    src={Plus}  
                    className={styleClass} alt=''/>
                <div className={classes.respond}>
                    respond
                </div>
            </div>
        );
    }
}

export default AddSubCommentButton; 