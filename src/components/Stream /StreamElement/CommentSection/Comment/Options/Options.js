import React, { Component } from 'react'; 
import classes from './Options.module.css';
import dots from './dotdotdot.svg';


class Options extends Component {

    state = {
        expanded: false
    }
  
    hideOrShow = () => {
        this.state.expanded ? this.setState({expanded: false}) : this.setState({expanded: true});
    }

    deleteComment = () => {
        this.hideOrShow();
        this.props.deleteSubComment(this.props.path);
    }
    
    

    render() {
        const hiddenStyle = { display: 'none' }
        return(
            <div>
                <img onClick={this.hideOrShow} src={dots} className={classes.dots} alt=''/> 
                <div className = {classes.optionsMenu} style={ this.state.expanded ? {display:'block'} : {display:'none'}}>
                    <div onClick={() => this.props.deleteSubComment(this.props.path)} className={classes.OptionsMenuOption}>delete</div>
                    <div className={classes.OptionsMenuOption}>report</div>
                </div>
            </div>
        );
    }
}

export default Options; 