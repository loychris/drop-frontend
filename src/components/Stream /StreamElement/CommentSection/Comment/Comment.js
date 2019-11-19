import React from 'react';

import AddSubCommentButton from './AddSubCommentButton/AddSubCommentButton';
import Voting from './Voting/Voting';
import Options from './Options/Options';

import classes from './Comment.module.css';
import Ishort from './Ishort.svg';
import C from './Connector.svg';
import L from './L.svg';

const INDENT = 17;
const INDENTFRACTION = 17 //precent of width of a depth=0 Comment

const Comment = props => {

    const depth =  props.path.split('/').length-1;
    //const pathArray = props.path.split('/');
    //const parentPath = depth === 0 ? '/' : pathArray.splice(0, pathArray.length-1).join('/');




    const generateSVG = (depth, height, width) => {
        return( <svg key={depth}
                     style={generateBoneStyles(depth,'I')} 
                     width= {`${width}px`} 
                     height= {`${height}px`} 
                     viewBox= {`0 0 ${width} ${height}`} 
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={`M0 0H${width}V${height}H0V0Z`} fill="#ffffff"/>
                </svg>);
    }


    


    const generateBoneStyles = (depth, type) => {
        let styles = {
            position: 'absolute', 
            top: '-42px', 
            boxShadow: '0px 0px 8px #D5D9FE'
        };
        switch(type){
            case 'I':         styles.left = `${ 11+INDENT*depth }px`; break;
            case 'Ishort':    styles.left = `${11+INDENT*(depth-1)}px`; break;
            case 'L':         styles.left = `${ INDENT*depth-6}px`; styles.top = '11px'; break;
            case 'connector': styles.left = `${ INDENT*depth-4 }px`; styles.top = '13px'; break;
            default:          console.log('Switch case ERROR');
        }    
        return styles;
    }






    const generateHighlightGradient = (leftColor, leftTransparency, rightColor, rightTransparency, depth) => {
        const fraction = depth*INDENTFRACTION;
        console.log(fraction);
        const left = {
            red: parseInt(leftColor.slice(1,3), 16), 
            green: parseInt(leftColor.slice(3,5), 16), 
            blue: parseInt(leftColor.slice(-2), 16)
        };
        console.log('left:', left);
        const right = {
            red: parseInt(rightColor.slice(1,3), 16), 
            green: parseInt(rightColor.slice(3,5), 16), 
            blue: parseInt(rightColor.slice(-2), 16)
        };
        console.log('right:',right);
        const difference = {
            red: right.red-left.red,
            green: right.green-left.green,
            blue: right.blue-left.blue
        }
        console.log('diff:', difference);
        const leftNew = {
            red: difference.red * fraction / 255 + left.red,
            green: difference.green * fraction / 255 + left.green,
            blue: difference.blue * fraction / 255 + left.blue
        }
        console.log(`linear-gradient(90deg, rgb(${leftNew.red},${leftNew.green},${leftNew.blue},${leftTransparency}%), rgb(${right.red},  ${right.green},  ${right.blue},  ${rightTransparency}%))`);
        return `linear-gradient(90deg, rgb(${leftNew.red},${leftNew.green},${leftNew.blue},${leftTransparency}%), rgb(${right.red},  ${right.green},  ${right.blue},  ${rightTransparency}%))`;
    }








    const generateBackground = () => {
        const backgroundStyle = { backgroundImage: generateHighlightGradient('#FF0000', 100, '#0000FF', 100, props.depth),
                                  //left: `${(depth-1)*INDENT+13}px`,
                                  left: `${depth*INDENTFRACTION}px`,
                                  top: '0px'
                                }
        console.log('style: ', backgroundStyle);
        return <div className={ classes.HighlightBackground } style={ backgroundStyle }></div>;
    }









    const generateBones = (boneComponents, depth) => {
        let styleComponents = [];

        //Generate Bone Components 
        for(let i=0;i<boneComponents.length;i++){
            switch(boneComponents[i]){
                case ' ': break;
                case 'I': styleComponents.push(generateSVG(i,70, 2)); break;
                case 'T': styleComponents.push(generateSVG(i,70, 2));
                          styleComponents.push(<img key={`${i}-connector`} src={C} style={generateBoneStyles(i+1, 'connector')} alt=''/>); break;
                case 'L': styleComponents.push(<img key={i} src={Ishort} style={generateBoneStyles(i+1,'Ishort')} alt=''/>); 
                          styleComponents.push(<img key={`${i}L`} src={L} style={generateBoneStyles(i+1,'L')} alt=''/>)
                          let pathArr = props.path.split('/');
                          pathArr.pop();
                          styleComponents.push(<AddSubCommentButton 
                                        indent={INDENT} 
                                        depth={i+1}
                                        parentPath={pathArr.join('/')}
                                        addSubComment = {props.addSubComment}
                                        key={`${i}S`}/>);break;
                default:  console.log('ERROR: unwanted Character in BuildBone');
            }
        }

        //generate highlight Background







        return styleComponents;
    }





    /////////////////////////////  visual tree algorithm // DO NOT FUCKING TOUCH   /////////////////////////////
    let inheritance = props.tree ? props.tree : [];
    let thisTreeString = props.last === true ? [...inheritance, 'L'].slice(1) : [...inheritance, 'T'].slice(1);
    (props.last === true && depth > 1) ? [...inheritance, 'L'].slice(1) : [...inheritance, 'T'].slice(1);
    let nextTreeString = props.last === true ? [...inheritance, ' '] : [...inheritance, 'I'];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////



    //recursevly filling subComments Array
    let subComments = [];
    if(props.subComments.length > 0){ 
        for(let i=0;i<props.subComments.length;i++){
            const lastProp = i === props.subComments.length-1 ? true : false; 
            subComments.push(
                <Comment tree = {nextTreeString}
                         last = {lastProp}
                         depth = {`${depth+1}`}
                         key = { `${props.path}/${i}`}
                         path = { `${props.path}/${i}`}
                         author = { props.subComments[i].author }
                         points = { props.subComments[i].points }
                         actualComment = { props.subComments[i].comment }
                         subComments = { props.subComments[i].subComments }
                         addSubComment = { props.addSubComment }
                         deleteSubComment = { props.deleteSubComment }
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
    let commentStyle = {  paddingLeft: `${ depth*INDENT }px`,
                          
                       }
    const contentStyle = {  left: `${depth*INDENT+40}px`,
                            maxWidth: `${550-INDENT*depth}px`,
                         }
    
   
    
    return(
        <div className ={classes.CommentContainer}>
            <div className={classes.Comment} style={commentStyle}>
                <div className={classes.AuthorProfilePic}></div>
                <Voting points={props.points}/>
                <Options deleteSubComment={props.deleteSubComment} path={props.path}/>
                <span className={classes.actualComment} style={contentStyle}>{props.actualComment}</span>
            </div>
            { subComments }
            { generateBones(thisTreeString) }
            { firstSubcommnetButton }
        </div>
    )
}

export default Comment;