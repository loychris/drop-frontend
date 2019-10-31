import React from 'react';
import classes from './Comment.module.css';
import Voting from './Voting/Voting';
import Aux from '../../../../../hoc/Aux';
import I from './I.svg';
import connector from './Connector.svg';

const Comment = props => {

    const depth = parseInt(props.depth);

    let subComments = [];
    if(props.subComments.length > 0){   //Not a root comment
        for(let i=0;i<props.subComments.length;i++){
            const nextDepth = `${depth+1}`
            subComments.push(
                <Comment
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

    if(depth>0){
        for(let i=0;i<depth;i++){      
            const styles = {
                position: 'absolute',
                top: '-40px',
                left: `${ 11+25*i }px`,
            }
            treeComponents.push(
                <img 
                    key={ i }
                    style = { styles } 
                    src={ I } 
                    alt=''
                />)
        }
        const styles = {
            position: 'absolute',
            top: '12px',
            left: `${ 25*depth-7 }px`
        }
        treeComponents.push(
            <img
                style = { styles }
                src = { connector }
                alt = ''

            />
        )
    }

    let style = { paddingLeft: `${depth*25 }px`,
    }


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