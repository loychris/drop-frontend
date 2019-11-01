import React from 'react';
import classes from './Comment.module.css';
import Voting from './Voting/Voting';
import Aux from '../../../../../hoc/Aux';
import I from './I.svg';
import Ishort from './Ishort.svg';
import connector from './Connector.svg';

const Comment = props => {

    const depth = parseInt(props.depth);

    let subComments = [];
    if(props.subComments.length > 0){   //Not a root comment
        const nextDepth = `${depth+1}`
        for(let i=0;i<props.subComments.length;i++){
            const lastProp = i === props.subComments.length-1 ? 'true' : 'false';
            console.log(lastProp);
            subComments.push(
                <Comment
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


    let treeComponents = [];
    let log = [];

    if(depth>0){
        for(let i=0;i<depth-1;i++){ 
            const styles = {
                position: 'absolute',
                top: '-40px',
                left: `${ 11+25*i }px`,
            }
            treeComponents.push(<img key={i} style={styles} src={I} alt=''/>)
            log.push('I');
        }

        const IshortStyles={
            position: 'absolute',
            left: `${11+25*(depth-1)}px`,
            top: '-40px'
        }
        treeComponents.push(<img key={depth+1} style={IshortStyles} src={Ishort} alt=''/>);
        log.push('Ishort');

        const connectorStyles = {
            position: 'absolute',
            top: '12px',
            left: `${ 25*depth-7 }px`
        }
        treeComponents.push(<img key={depth+2} style={connectorStyles} src={connector} alt=''/>)
        log.push('-');
    }
    console.log(log, depth);

    let style = { paddingLeft: `${depth*25 }px`}


    return(
        <div className ={classes.CommentContainer}>
            <div className={classes.Comment}
                 style={ style }
            >
                <div className={classes.AuthorProfilePic}></div>
                <Voting points={props.points}/>
                <p className={classes.actualComment}>{props.actualComment}</p>
            
                {/*<button className={classes.addSubCommentButton}></button>*/}
            </div>
            {subComments}
            {treeComponents}
        </div>
    )

}

export default Comment;