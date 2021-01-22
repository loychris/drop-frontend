import React, { useState, useEffect, createRef, useRef } from 'react';
import { connect } from 'react-redux';
import classes from './ChatForm.module.css';

import NeumorphismButton from '../../../UI/NeumorphismButton/NeumorphismButton';

import * as actions from '../../../../store/actions/index';


const ChatForm = (props) => {

    // const [dragging, setDragging] = useState(false)
    const [inputValue, _setInputValue] = useState('');

    const inputValueRef = useRef(inputValue);
    const currentChatRef = useRef(props.currentChatId);
    const setInputValue = data => {
        inputValueRef.current = data;
        _setInputValue(data);
    }

    const getArrowRight = () => {
        return(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="arrow_forward_24px">
                <path id="icon/navigation/arrow_forward_24px" d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill={inputValue.length === 0 ? 'grey' : 'black'} fillOpacity="0.54"/>
                </g>
            </svg>
        )
    }

    useEffect(() => {
        if(props.shouldDeleteInput){
            setInputValue('');
            props.onChangeShouldDeleteInput(false);
        }
        textInput.current.focus(); 
    });

    useEffect(() => {
        textInput.current.focus(); 
        document.addEventListener('keypress', enterHandler);
    }, [])
      


    const onInput = (event) => {
        setInputValue(event.target.value);
    }

    const enterHandler = (event) => {
        if(event.keyCode === 13 && !event.shiftKey && inputValueRef.current.length > 0 ){
            submitHandler(event, inputValueRef.current)
        }
    }

    const submitHandler = (event) => {
        props.onSendTextMessage(
            currentChatRef.current, 
            inputValueRef.current,
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
                    value={inputValue}
                    rows={1}
                    onChange={(event) => onInput(event)}
                />                
                <NeumorphismButton
                    colorTheme='light'
                    buttonType='SubmitComment'
                    clicked={event => submitHandler(event)} 
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

        userId: state.user.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeChatInput: (value) => dispatch(actions.changeChatInput(value)),
        onChangeFormHeight: (height) => dispatch(actions.changeFormHeight(height)),
        onSendTextMessage: (chatId, text, userId) => dispatch(actions.sendTextMessage(chatId, text, userId)), 
        onChangeShouldDeleteInput: (value) => dispatch(actions.changeShouldDeleteInput(value)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);