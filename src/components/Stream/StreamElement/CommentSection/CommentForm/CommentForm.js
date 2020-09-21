import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
        this.setState({textareaValue: newValue, disabled: newValue.trim() === ''});
    }

    submitHandler = (event) => {
        const randId = `${Math.random()}`;
        event.preventDefault();
        this.setState({textareaValue: '', disabled: true});
        console.log("SUBCOMMENT", this.props.subComment);
        if(!this.props.subComment){
            this.props.onAddComment(this.state.textareaValue, randId);
            // axios.post(
            //     `/api/drop/${this.props.dropId}/comment`, 
            //     { 
            //         authorId: '5f5538d269ae656e859629be', 
            //         comment: this.state.textareaValue })
            // .then(response => {
            //     this.props.onCommentSaved(response.data)
            // }).catch(err => {
            //     this.props.onPostCommentFailed()
            // })
        }else{
            this.props.onAddSubComment(this.state.textareaValue, randId);
        }
    }

    getSpeechBubbleArrow() {
        return(
            <svg className={classes.SpeechBubbleArrow} width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.1946 1.09753C15.127 2.89687 11.5635 5.9083 8 8.49986C5.64212 10.2146 7.62939e-06 9.99998 7.62939e-06 9.99998C7.62939e-06 9.99998 6.54393 10.8743 9.5 13.4999C13.3722 16.9392 13.9978 25.9679 14 25.9998L14 10C14 6.61858 15.1988 3.51715 17.1946 1.09753Z" fill= '#ffffff'/>
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

    render(){
        const depth = this.props.path ? this.props.path.split("/").length : 0;
        // let inputStyle = this.props.path ? { paddingLeft: `${depth * INDENT}px` } : null;
        const commentInputStyles = { paddingLeft: `${depth * INDENT}px` };
        const contentStyle = {
            left: `${(depth+1) * INDENT + 40}px`,
            maxWidth: `${545 - INDENT * depth}px`
          };
        const treeString = this.props.treeString ? [...this.props.treeString.slice(1), 'L'] : ['L']
        const branches = this.props.path ? 
            <Branches
                hideBranches={depth-1}
                treeString={treeString}
                height={61}
                path={this.props.path}
            /> : null

        return(
            <div className={classes.CommentInputContainer}
                style={this.props.path ? {zIndex: '200'} : null}>
                <div className={classes.CommentInput} style={commentInputStyles}>
                    <AuthorPic depth={depth} indent={INDENT}/>
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
                {branches}
            </div>
        )

        // return(
        //     <div className={classes.CommentFormContainer}>
        //         <div style={contentStyle}>contentStyle
        //             <div
        //                 className={classes.CommentForm} 
        //                 id={`commentForm${this.props.dropId}`}
        //             >
        //                 <AuthorPic depth={depth} indent={INDENT} neuMorphism={this.props.neuMorphism}/>                        <AuthorPic depth={depth} indent={INDENT} neuMorphism={this.props.neuMorphism}/>
        //                 <div className={classes.InputContainer}>
        //                     <TextareaAutosize 
        //                         className={classes.TextArea}
        //                         onChange={this.inputChangedHandler} 
        //                         form={`commentForm${this.props.id}`} 
        //                         value={this.state.textareaValue}
        //                         placeholder='Write a comment...'/>
        //                     <NeumorphismButton
        //                         colorTheme='light'
        //                         buttonType='SubmitComment'
        //                         clicked={this.submitHandler} 
        //                         disabled={this.state.disabled} 
        //                         className={classes.SubmitButton} 
        //                         type='submit'>
        //                             {ArrowRight}
        //                     </NeumorphismButton>
        //                 </div>
        //                 {SpeechBubbleArrow}
        //                 {branches}
        //             </div>
        //         </div>

        //     </div>
        //)
    }
}

const mapStateToProps = state => {
    return {
        
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        onAddComment: (comment, randId) => dispatch(streamActions.addComment(comment, randId)),
        onAddSubComment: (comment, randId) => dispatch(streamActions.addSubComment(comment, randId)),
        onCommentSaved: () => dispatch(streamActions.commentSaved()),
        onPostCommentFailed: () => dispatch(streamActions.postCommentFailed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);