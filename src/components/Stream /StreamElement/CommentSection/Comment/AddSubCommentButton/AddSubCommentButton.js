import React, { Component } from 'react'; 
import classes from './AddSubComment.module.css';
import Plus from './Plus.svg';


class AddSubCommentButton extends Component {

    state = {
        expanded: false
    }

    getStyle = () => {
        if(this.props.first) return {top: '20px', left: '8px'}
        return {left:`${ this.props.indent*this.props.depth-10}px`}
    }

    
    render() {
        const styleClass = this.state.expanded ? '' : classes.plus;
        return(
            <div 
                onClick={() => this.props.addSubComment(this.props.parentPath, "add Comment Form functionallity")}
                style={this.getStyle()}
                className={classes.showMoreBox} >
                <img 
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