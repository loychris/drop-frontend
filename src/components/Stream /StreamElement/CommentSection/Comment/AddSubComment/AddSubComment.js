import React, { Component } from 'react'; 
import './AddSubComment.css';
import Plus from './Plus.svg';


class AddSubComment extends Component {

    state = {
        expanded: false,
    }

    getStyle = () => {
        console.log(11+this.props.indent*this.props.depth);
        return {
            left: `${ this.props.indent*this.props.depth - 23 }px`,
        }
    }
    
    render() {
        const styleClass = this.state.expanded ? '' : 'notExpanded';
        return(
            <img src={Plus} style={this.getStyle()} className={styleClass} alt=''/>
        );
    }
}

export default AddSubComment; 