import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ChatForm.module.css';

import NeumorphismButton from '../../UI/NeumorphismButton/NeumorphismButton';

import * as actions from '../../../store/actions/index';


class ChatForm extends Component {

    state = {
        disabled: false,
        dragging: false,
        formHeight: 30,
    }

    componentDidMount = () => {
        this.multilineTextarea.style.height = 'auto';
        this.multilineTextarea.style.height = `${this.multilineTextarea.scrollHeight}px`;
        // this.props.onChangeFormHeight(this.multilineTextarea.scrollHeight+10);    
        //this.multilineTextarea.focus()
        // this.multilineTextarea.style.height = this.multilineTextarea.scrollHeight + 'px';
    }

    componentDidUpdate = () => {
        this.multilineTextarea.focus()
    }

    onChangeHandler = (event) => {
        this.props.onChatInputChangeHandler(event.target.value);
        if(this.multilineTextarea.scrollHeight !== this.props.formHeight){
            this.props.onChangeFormHeight(0)
            this.props.onChangeFormHeight(this.multilineTextarea.scrollHeight);
        }
    }

    getArrowRight = () => {
        return(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="arrow_forward_24px">
                <path id="icon/navigation/arrow_forward_24px" d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill={this.state.disabled ? 'grey' : 'black'} fillOpacity="0.54"/>
                </g>
            </svg>
        )
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSendMessage(
            this.props.inputValue, 
            this.props.currentChatId, 
            this.props.dummyChats.includes(this.props.currentChatId) // new Chat?
        ); 
    }

    render() {
        const currentChat = this.props.chats.concat(this.props.dummyChats).find(c => c.chatId === this.props.currentChatId);
        let styleClasses = [classes.TextareaContainer];
        if(this.state.dragging) styleClasses.push(classes.Dragging);
        return(
            <div className={classes.ChatInput}>
                <div className={styleClasses.join(' ')}
                    onDragEnter={() => this.setState({dragging: true})}
                    onDragLeave={() => this.setState({dragging: false})}>
                    <textarea 
                        style={{
                            height: `${this.props.formHeight+5}px`}}
                        value={currentChat.inputValue}
                        rows={1}
                        className={classes.TextArea} 
                        onChange={this.onChangeHandler}
                        ref={ref => this.multilineTextarea = ref}
                    />
                    <NeumorphismButton
                        colorTheme='light'
                        buttonType='SubmitComment'
                        clicked={this.submitHandler} 
                        disabled={this.state.disabled} 
                        className={classes.SubmitButton} 
                        type='submit'>
                            {this.getArrowRight()}
                    </NeumorphismButton>
                </div> 
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        formHeight: state.chat.formHeight,
        chats: state.chat.chats,
        dummyChats: state.chat.dummyChats,
        currentChatId: state.chat.currentChatId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeFormHeight: (height) => dispatch(actions.changeFormHeight(height)),
        onSendMessage: (message) => dispatch(actions.sendMessage(message)), 
        onChatInputChangeHandler: (value) => dispatch(actions.chatInputChangeHandler(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);