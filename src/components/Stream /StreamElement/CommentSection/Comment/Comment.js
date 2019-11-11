import React from 'react';
import classes from './Comment.module.css';
import Voting from './Voting/Voting';
import I from './I.svg';
import Ishort from './Ishort.svg';
import C from './Connector.svg';
import L from './L.svg';
import AddSubCommentButton from './AddSubCommentButton/AddSubCommentButton';

const INDENT = 17;

const Comment = props => {

    const depth =  props.path.split('/').length-1;

    const generateStyles = (depth, type) => {
        let styles = {position: 'absolute', top: '-42px', boxShadow: '0px 0px 8px #D5D9FE'};
        switch(type){
            case 'I':
                styles.left = `${ 11+INDENT*depth }px`;
                break;
            case 'Ishort':
                styles.left = `${11+INDENT*(depth-1)}px`;
                break;
            case 'L':
                styles.left = `${ INDENT*depth-6}px`;
                styles.top = '11px';
                break;
            case 'connector':
                styles.left = `${ INDENT*depth-4 }px`;
                styles.top = '13px';
                break;
            default: console.log('Switch case ERROR');
        }    
        return styles;
    }

    const buildTree = components => {
        let row = [];
        for(let i=0;i<components.length;i++){
            switch(components[i]){
                case ' ': break;
                case 'I': 
                    row.push(<img key={i} src={I} style={generateStyles(i,'I')} alt=''/>); 
                    break;
                case 'T': 
                    row.push(<img key={i} src={I} style={generateStyles(i,'I')} alt=''/>); 
                    row.push(<img key={`${i}-connector`} src={C} style={generateStyles(i+1, 'connector')} alt=''/>); 
                    break;
                case 'L': 
                    row.push(<img key={i} src={Ishort} style={generateStyles(i+1,'Ishort')} alt=''/>); 
                    row.push(<img key={`${i}L`} src={L} style={generateStyles(i+1,'L')} alt=''/>)
                    let pathArr = props.path.split('/');
                    pathArr.pop();
                    row.push(<AddSubCommentButton 
                                indent={INDENT} 
                                depth={i+1}
                                parentPath={pathArr.join('/')}
                                addSubComment = {props.addSubComment}
                                key={`${i}S`}/>);
                    break;
                default: console.log('ERROR: unwanted Character');
            }
        }
        return row;
    }


    /////////////////////////////  visual tree algorithm // DO NOT FUCKING TOUCH   /////////////////////////////
    let inheritance = props.tree ? props.tree : [];
    let thisTreeString = props.last === true ? [...inheritance, 'L'].slice(1) : [...inheritance, 'T'].slice(1);
    (props.last === true && depth > 1) ? [...inheritance, 'L'].slice(1) : [...inheritance, 'T'].slice(1);
    let nextTreeString = props.last === true ? [...inheritance, ' '] : [...inheritance, 'I'];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////



    //recursevly creating SUBCOMMETNS
    let subComments = [];
    if(props.subComments.length > 0){ 
        for(let i=0;i<props.subComments.length;i++){
            const lastProp = i === props.subComments.length-1 ? true : false; 
            subComments.push(
                <Comment
                    tree = {nextTreeString}
                    last = {lastProp}
                    depth = {`${depth+1}`}
                    key = { `${props.path}/${i}`}
                    path = { `${props.path}/${i}`}
                    author = { props.subComments[i].author }
                    points = { props.subComments[i].points }
                    actualComment = { props.subComments[i].comment }
                    subComments = { props.subComments[i].subComments }
                    addSubComment = { props.addSubComment }
                />
            )
        }
    }

    //SubCommentButton
    let firstSubcommnetButton = []
    if(props.depth === '0' && Array.isArray(subComments) && subComments.length === 0){
        firstSubcommnetButton = 
            <AddSubCommentButton indent={INDENT} depth={1} first='true'/>
    }

    //styles
    let commentStyle = { paddingLeft: `${depth*INDENT }px`}

    
    return(
        <div className ={classes.CommentContainer}>
            <div className={classes.Comment} style={ commentStyle }>
                <div className={classes.AuthorProfilePic}></div>
                <Voting points={props.points}/>
                <p className={classes.actualComment}>{props.actualComment}</p>
            </div>
            {subComments}
            {buildTree(thisTreeString)}
            {firstSubcommnetButton}
        </div>
    )
}

export default Comment;