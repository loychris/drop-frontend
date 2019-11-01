import React from 'react';
import classes from './Comment.module.css';
import Voting from './Voting/Voting';
import I from './I.svg';
import Ishort from './Ishort.svg';
import C from './Connector.svg';

const Comment = props => {

    const depth = parseInt(props.depth);
    let subComments = [];

    const Istyles = depth => {
        return {
            position: 'absolute',
            top: '-40px',
            left: `${ 11+25*depth }px`,
        }
    }

    const connectorStyles = depth => {
        return {
            position: 'absolute',
            top: '12px',
            left: `${ 25*depth-7 }px`
        }
    }

    const IshortStyles = depth => {
        return {
            position: 'absolute',
            left: `${11+25*(depth-1)}px`,
            top: '-40px'
        }
    }

    const buildTree = components => {
        let row = [];
        for(let i=0;i<components.length;i++){
            switch(components[i]){
                case ' ': break;
                case 'I': 
                    row.push(<img key={i} src={I} style={Istyles(i)} alt=''/>); 
                    break;
                case 'T': 
                    row.push(<img key={i} src={I} style={Istyles(i)} alt=''/>); 
                    row.push(<img key={`${i}-connector`} src={C} style={connectorStyles(i+1)} alt=''/>); 
                    break;
                case 'L': 
                    row.push(<img key={i} src={Ishort} style={IshortStyles(i+1)} alt=''/>); 
                    row.push(<img key={`${i}-connector`} src={C} style={connectorStyles(i+1)} alt=''/>); 
                    break;
                default: console.log('ERROR: unwanted Character');
            }
        }
        return row;
    }

    ////////////////////////////////////  visual tree algorithm // DO NOT FUCKING TOUCH ////////////////////////////////////////
    let inheritance = props.tree ? props.tree : [];
    let thisTreeString = (props.last === 'true' && depth > 1) ? [...inheritance, 'L'].slice(1) : [...inheritance, 'T'].slice(1);
    let nextTreeString = props.last === 'true' ? [...inheritance, ' '] : [...inheritance, 'I'];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(thisTreeString.length>0)console.log('thisTreeString', thisTreeString.reduce( (x, s) => {return x+s} ));


    //recursevly add SUBCOMMETNS
    if(props.subComments.length > 0){ 
        const nextDepth = `${depth+1}`
        for(let i=0;i<props.subComments.length;i++){
            const lastProp = i === props.subComments.length-1 ? 'true' : 'false'; 
            subComments.push(
                <Comment
                    tree = {nextTreeString}
                    last = {lastProp}
                    depth = {nextDepth}
                    key = {`SubCommentNo${i}`}
                    author = { props.subComments[i].author }
                    points = { props.subComments[i].points }
                    actualComment = { props.subComments[i].comment }
                    subComments = { props.subComments[i].subComments }
                />
            )
        }
    }


    let commentStyle = { paddingLeft: `${depth*25 }px`}

    return(
        <div className ={classes.CommentContainer}>
            <div className={classes.Comment} style={ commentStyle }>
                <div className={classes.AuthorProfilePic}></div>
                <Voting points={props.points}/>
                <p className={classes.actualComment}>{props.actualComment}</p>
                {/*<button className={classes.addSubCommentButton}></button>*/}
            </div>
            {subComments}
            {buildTree(thisTreeString)}
        </div>
    )
}

export default Comment;