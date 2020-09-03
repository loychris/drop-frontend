import React, { Component } from 'react';
import classes from './Textarea.module.css';

import NeumorphismButton from '../../UI/NeumorphismButton/NeumorphismButton';
import TextareaAutosize from 'react-textarea-autosize';


class Textarea extends Component {

    state = {
        disabled: false
    }

    render() {

        const ArrowRight = 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="arrow_forward_24px">
            <path id="icon/navigation/arrow_forward_24px" d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill={this.state.disabled ? 'grey' : 'black'} fillOpacity="0.54"/>
            </g>
        </svg>

        return(
            <div className={classes.TextareaContainer}>
                <TextareaAutosize 
                    className={classes.TextArea}
                    onChange={this.inputChangedHandler} 
                    form={`commentForm${this.props.id}`} 
                    value={this.state.textareaValue}
                    placeholder='Write a comment...'/>
                <NeumorphismButton
                    colorTheme='light'
                    buttonType='SubmitComment'
                    clicked={this.submitHandler} 
                    disabled={this.state.disabled} 
                    className={classes.SubmitButton} 
                    type='submit'>
                        {ArrowRight}
                </NeumorphismButton>
            </div> 
        )
    }
}

export default Textarea;