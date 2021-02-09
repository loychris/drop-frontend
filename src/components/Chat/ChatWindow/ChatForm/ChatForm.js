import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ChatForm.module.css';

import NeumorphismButton from '../../../UI/NeumorphismButton/NeumorphismButton';

import * as actions from '../../../../store/actions/index';


class ChatForm extends Component { 
    
    state = {
        inputValue: ''
    }

    componentDidMount(){
        window.addEventListener('keypress', this.enterHandler);
    }


    onInput = event => {
        this.setState({inputValue: event.target.value});
    }

    enterHandler = (event) => {
        if(event.keyCode === 13 && !event.shiftKey && this.state.inputValue.length > 0 ){
            event.preventDefault();
            this.submitHandler();
        }
    }

    submitHandler = () => {
        if(this.props.currentChatId.startsWith('dummy')){
            const currentChat = this.props.chats.find(c => c.chatId === this.props.currentChatId);
            const self = currentChat.members.find(m => m.userId === this.props.userId);
            const chatPartner = currentChat.members.find(m => m.userId !== this.props.userId);
            this.props.onSendFirstMessageNewChat(this.props.currentChatId, self, chatPartner, this.state.inputValue);
        }else {
            this.props.onSendTextMessage(this.props.currentChatId, this.state.inputValue, this.props.userId);
        }
        this.setState({inputValue: ''});
    }

    getArrowRight = () => {
        return(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="arrow_forward_24px">
                <path id="icon/navigation/arrow_forward_24px" d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill={this.state.inputValue.length === 0 ? 'grey' : 'black'} fillOpacity="0.54"/>
                </g>
            </svg>
        )
    }  

    render() {
        return(
            <div className={classes.ChatInput}>
                <div className={classes.TextareaContainer}
                    // onDragEnter={() => setDragging(true)}
                    // onDragLeave={() => setDragging(false)}>
                >
                    <textarea 
                        id="chatForm"
                        className={classes.Textarea} 
                        style={{height: `${this.props.formHeight+5}px`}}
                        value={this.state.inputValue}
                        rows={1}
                        onChange={this.onInput}
                    />                
                    <NeumorphismButton
                        colorTheme='light'
                        buttonType='SubmitComment'
                        clicked={this.submitHandler} 
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
        currentChatLoaded: state.chat.currentChatLoaded,
        formHeight: state.chat.formHeight,
        chats: state.chat.chats,
        currentChatId: state.chat.currentChatId,
        chatInput: state.chat.chatInput,

        userId: state.user.userId,
        handle: state.user.handle,
        profilePic: state.user.hasProfilePic, 
        name: state.user.name,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeFormHeight: (height) => dispatch(actions.changeFormHeight(height)),
        onSendTextMessage: (chatId, text, userId) => dispatch(actions.sendTextMessage(chatId, text, userId)), 
        onSendFirstMessageNewChat: (dummyChatId, self, chatPartner, text) => dispatch(actions.sendFirstMessageNewChat(dummyChatId, self, chatPartner, text)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);