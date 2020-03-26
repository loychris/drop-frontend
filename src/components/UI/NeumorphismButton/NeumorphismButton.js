import React, { Component } from 'react'
import classes from './NeumorphismButton.module.css';

class NeumorphismButton extends Component {


    render(){
        let styleClasses = [classes.Button];
        if(this.props.buttonType){
            switch(this.props.buttonType) {
                case 'SubmitComment': styleClasses.push(classes.SubmitComment); break;
                // case 'DropButton': styleClasses.push(classes.DropButton); break;
                default: console.log('no type given');
            }
        }
        if(this.props.disabled) styleClasses.push(classes.Disabled);
        if(this.props.colorTheme === 'light') styleClasses.push(classes.Light);
        if(this.props.colorTheme === 'dark') styleClasses.push(classes.Dark);
        return(
            <button 
                onClick={this.props.clicked} 
                className={styleClasses.join(' ')}
                disabled={this.props.disabled}>
                {this.props.children}
            </button>
        )
    }
}

export default NeumorphismButton;