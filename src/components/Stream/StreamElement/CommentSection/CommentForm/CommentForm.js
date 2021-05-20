import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as streamActions from '../../../../../store/actions/index';
import classes from './CommentForm.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import AuthorPic from '../AuthorPic/AuthorPic';

import NeumorphismButton from '../../../../UI/NeumorphismButton/NeumorphismButton';
import Branches from '../Comment/Branches/Branches';

const INDENT = 17;


class CommentForm extends Component {

    state = {
        textareaValue: '',
        disabled: true
    }

    inputChangedHandler = (event) => {
        const newValue = event.target.value; 
        const disabled = newValue.trim() === '' || this.props.streamElements[0].id.startsWith("no more");
        this.setState({textareaValue: newValue, disabled: disabled});
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(!this.props.token){
            this.props.onOpenMenu();
        } else {
            this.setState({textareaValue: '', disabled: true});

            if(!this.props.subComment) {
                const newComment = {
                    id: `${Date.now()}`,
                    comment: this.state.textareaValue, 
                    authorId: this.props.userId, 
                    posted: new Date(), 
                    points: 0,
                    subComments: [],
                    path: '0'
                }
                this.props.onSendComment(this.props.dropId, newComment, this.props.token);
            } else {
                const newSubComment = {
                    id: `${Date.now()}`,
                    author: this.props.userId, 
                    points: 0, 
                    subComments: [],
                    comment: this.state.textareaValue, 
                    parentPath: this.props.selectedComment
                }
                this.props.onSendSubComment(this.props.dropId, newSubComment, this.props.token )
            }
        }
    }

    getSpeechBubbleArrow() {
        return(
            <svg className={classes.SpeechBubbleArrow} width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.1946 1.09753C15.127 2.89687 11.5635 5.9083 8 8.49986C5.64212 10.2146 7.62939e-06 9.99998 7.62939e-06 9.99998C7.62939e-06 9.99998 6.54393 10.8743 9.5 13.4999C13.3722 16.9392 13.9978 25.9679 14 25.9998L14 10C14 6.61858 15.1988 3.51715 17.1946 1.09753Z" fill= '#eeeeee'/>
            </svg>
        )
    }

    getArrowRight(){
        return(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="arrow_forward_24px">
                <path id="icon/navigation/arrow_forward_24px" d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill={this.state.disabled ? 'grey' : 'black'} fillOpacity="0.54"/>
                </g>
            </svg>
        )
    }

    getBranches = (depth, treeString) => {
        if(!this.props.path) return null
        return <Branches hideBranches={depth-1} treeString={treeString} height={61} path={this.props.path}/>
    }

    render(){
        const depth = this.props.path ? this.props.path.split("/").length : 0;
        const commentInputStyles = { paddingLeft: `${depth * INDENT}px` };
        const contentStyle = { left: `${(depth+1) * INDENT + 40}px`};
        const treeString = this.props.treeString ? [...this.props.treeString.slice(1), 'L'] : ['L']

        return(
            <div className={classes.CommentForm}
                style={this.props.path ? {zIndex: '200'} : null}>
                <div className={classes.CommentInput} style={commentInputStyles}>
                    <AuthorPic depth={depth} indent={INDENT} authorId={this.props.userId}/>
                    <div className={classes.CommentInputBackground}>
                        <div className={classes.actualCommentForm} style={contentStyle}>
                            <TextareaAutosize 
                                className={classes.TextArea}
                                onChange={this.inputChangedHandler} 
                                value={this.state.textareaValue}
                                placeholder={this.props.path ? 'Write a response...' : 'Write a comment...'}/>
                            <NeumorphismButton
                                className={classes.SubmitButton} 
                                colorTheme='light'
                                buttonType='SubmitComment'
                                clicked={this.submitHandler} 
                                disabled={this.state.disabled} 
                                type='submit'>
                                    {this.getArrowRight()}
                            </NeumorphismButton>                            
                            {this.getSpeechBubbleArrow()}
                        </div>
                    </div>
                </div>
                {this.getBranches(depth, treeString)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedComment: state.stream.selectedComment,
        token: state.user.token,
        userId: state.user.userId, 
        streamElements: state.stream.streamElements, 
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        onOpenMenu: () => dispatch(streamActions.openMenu()),
        onSendComment: (dropId, comment, token) => dispatch(streamActions.sendComment(dropId, comment, token)),
        onSendSubComment: (dropId, subComment, token) => dispatch(streamActions.sendSubComment(dropId, subComment, token)),    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);