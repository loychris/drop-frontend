import React, { Component } from 'react'; 
import classes from './AddSubComment.module.css';
import Plus from './Plus.svg';


class AddSubCommentButton extends Component {

    state = {
        expanded: false
    }

    getStyle = () => {
        if(this.props.first) return {top: '29px', left: '0px'}
        return {left:`${ this.props.indent*this.props.depth-25}px`}
    }



    //TODO
    addSubComment = () => {





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
                <div className={classes.respond}>respond</div>
            </div>
        );
    }
}

export default AddSubCommentButton; 