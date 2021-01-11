import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import classes from './ChatForm.module.css';

import NeumorphismButton from '../../../UI/NeumorphismButton/NeumorphismButton';

import * as actions from '../../../../store/actions/index';


const ChatForm = (props) => {

    // const [dragging, setDragging] = useState(false)
    const [input, setInput] = useState('');

    const getArrowRight = () => {
        return(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="arrow_forward_24px">
                <path id="icon/navigation/arrow_forward_24px" d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill={input.length === 0 ? 'grey' : 'black'} fillOpacity="0.54"/>
                </g>
            </svg>
        )
    }

    useEffect(() => {
        if(props.shouldDeleteInput){
            props.onChangeShouldDeleteInput(false);
            deleteInput('');
        }
        textInput.current.focus();
    })

    const deleteInput = () => {
        setInput('')
    }

    const onInput = (event) => {
        setInput(event.target.value);
    }

    const submitHandler = () => {
        props.onSendTextMessage(
            props.currentChatId, 
            input,
            props.token,
            props.userId
        ); 
    }

    const textInput = createRef();
    let styleClasses = [classes.TextareaContainer];
    return(
        <div className={classes.ChatInput}>
            <div className={styleClasses.join(' ')}
                // onDragEnter={() => setDragging(true)}
                // onDragLeave={() => setDragging(false)}>
            >
                <textarea 
                    ref={textInput}
                    className={classes.Textarea} 
                    style={{height: `${props.formHeight+5}px`}}
                    value={input}
                    rows={1}
                    onChange={onInput}
                />                
                <NeumorphismButton
                    colorTheme='light'
                    buttonType='SubmitComment'
                    clicked={submitHandler} 
                    className={classes.SubmitButton} 
                    type='submit'>
                        {getArrowRight()}
                </NeumorphismButton>
            </div> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentChatLoaded: state.chat.currentChatLoaded,
        formHeight: state.chat.formHeight,
        chats: state.chat.chats,
        currentChatId: state.chat.currentChatId,
        chatInput: state.chat.chatInput,
        shouldDeleteInput: state.chat.shouldDeleteInput,

        token: state.user.token,
        userId: state.user.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeChatInput: (value) => dispatch(actions.changeChatInput(value)),
        onChangeFormHeight: (height) => dispatch(actions.changeFormHeight(height)),
        onSendTextMessage: (chatId, text, token, userId) => dispatch(actions.sendTextMessage(chatId, text, token, userId)), 
        onChangeShouldDeleteInput: (value) => dispatch(actions.changeShouldDeleteInput(value)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);