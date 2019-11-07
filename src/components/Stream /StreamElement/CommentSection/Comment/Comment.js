import React from 'react';
import classes from './Comment.module.css';
import Voting from './Voting/Voting';
import I from './I.svg';
import Ishort from './Ishort.svg';
import C from './Connector.svg';
import AddSubCommentButton from './AddSubCommentButton/AddSubCommentButton';

const indent = 25;

const Comment = props => {

    const depth = parseInt(props.depth);
    let subComments = [];

    const getStyle = (depth, type) => {
        let styles = {position: 'absolute', top: '-40px'};
        switch(type){
            case 'I':
                styles.left = `${ 11+indent*depth }px`;
                break;
            case 'Ishort':
                styles.left = `${11+indent*(depth-1)}px`;
                break;
            case 'connector':
                styles.left = `${ indent*depth-7 }px`;
                styles.top = '12px';
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
                    row.push(<img key={i} src={I} style={getStyle(i,'I')} alt=''/>); 
                    break;
                case 'T': 
                    row.push(<img key={i} src={I} style={getStyle(i,'I')} alt=''/>); 
                    row.push(<img key={`${i}-connector`} src={C} style={getStyle(i+1, 'connector')} alt=''/>); 
                    break;
                case 'L': 
                    row.push(<img key={i} src={Ishort} style={getStyle(i+1,'Ishort')} alt=''/>); 
                    row.push(<img key={`${i}-connector`} src={C} style={getStyle(i+1,'connector')} alt=''/>); 
                    row.push(<AddSubCommentButton indent={indent} depth={i+1}/>);
                    break;
                default: console.log('ERROR: unwanted Character');
            }
        }
        return row;
    }


    ////////////////////////////////////  visual tree algorithm // DO NOT FUCKING TOUCH ////////////////////////////////////////
    let inheritance = props.tree ? props.tree : [];
    let thisTreeString = props.last === true ? [...inheritance, 'L'].slice(1) : [...inheritance, 'T'].slice(1);
    (props.last === true && depth > 1) ? [...inheritance, 'L'].slice(1) : [...inheritance, 'T'].slice(1);
    let nextTreeString = props.last === true ? [...inheritance, ' '] : [...inheritance, 'I'];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //if(thisTreeString.length>0)console.log('thisTreeString', thisTreeString.reduce( (x, s) => {return x+s} ));


    //recursevly creating SUBCOMMETNS
    if(props.subComments.length > 0){ 
        for(let i=0;i<props.subComments.length;i++){
            const lastProp = i === props.subComments.length-1 ? true : false; 
            subComments.push(
                <Comment
                    tree = {nextTreeString}
                    last = {lastProp}
                    depth = {`${depth+1}`}
                    key = {`SubCommentNo${i}`}
                    author = { props.subComments[i].author }
                    points = { props.subComments[i].points }
                    actualComment = { props.subComments[i].comment }
                    subComments = { props.subComments[i].subComments }
                />
            )
        }
    }

    let firstSubcommnetButton = []
    if(props.depth === '0' && Array.isArray(subComments) && subComments.length === 0){
        console.log('adding subcomment');
        firstSubcommnetButton = <AddSubCommentButton 
                                    indent={indent} 
                                    depth={1} 
                                    first='true'
                                />
    }
    let commentStyle = { paddingLeft: `${depth*indent }px`}

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