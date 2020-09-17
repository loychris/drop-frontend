import React, { Component } from 'react';

import classes from './Branches.module.css';
import L from './L.svg';
import C from './Connector.svg';

const INDENT = 17;

const HIDDENCOLOR = 'red';


class Branches extends Component {


    getRoot = (hidden) => {
        let styles = {}
        styles.left = `${11 + this.props.treeString.length * INDENT}px`;
        return(
        <svg className={classes.Root} style={styles} width={"2px"} height={`${this.props.height}px`} viewBox={`0 0 2 ${this.props.height}`} fill="#abcdef" xmlns="http://www.w3.org/2000/svg">
          <path d={`M0 0H2V${this.props.height}H0V0Z`} fill={`${hidden ? HIDDENCOLOR : '#ffffff' }`} />
        </svg>
        )
    }


    generateBones = boneComponents => {
        let bones = [];
        //Generate Bone Components
        for (let i = 0; i < boneComponents.length; i++) {
            switch (boneComponents[i]) {
            case " ": break;
            case "I": bones.push(this.generateLine(i, "I")); break;
            case "T": bones.push(this.generateLine(i, "I"));
                      bones.push(<img key={`${i}-connector`} src={C}  style={this.generateBoneStyles(i + 1, "connector")} alt="" />); break;
            case "L": bones.push(this.generateLine(i, "IL"));
                      bones.push(<img key={`${i}L`} src={L} style={this.generateBoneStyles(i + 1, "L")} alt=""/>);
                      let pathArr = this.props.path.split("/");
                      pathArr.pop();
                      break;
            default: console.log("ERROR: unwanted Character in BuildBone");
            }
        }
        return bones;
    };

    generateLine = (depth, type) => {
        let height = 0;
        switch (type) {
            case "I": height = this.props.height + 22; break;
            case "IL": height = 53; break;
            case "start": height = this.props.height; break;
            default: console.log("DIESE NACHRICHT SOLLE NIE KOMMEN");
        }
        return (
            <svg
            key={depth}
            style={this.generateBoneStyles(depth, type)}
            width={"2px"}
            height={`${height}px`}
            viewBox={`0 0 2 ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d={`M0 0H2V${height}H0V0Z`} fill={`${depth > this.props.selectedDepth ? '#ffffff' : 'red'}`} />
            </svg>
        );
    };

    generateBoneStyles = (depth, type) => {
        let styles = {
            top: "-42px",
            position: "absolute",
            fill: `${depth > this.props.selectedDepth ? '#ffffff' : 'red'}`
        };
        switch (type) {
            case "start": styles.top = "25px";
                        styles.left = `${11 + INDENT * depth}px`;break;
            case "I":
            case "IL": styles.left = `${11 + INDENT * depth}px`; break;
            case "L": styles.left = `${INDENT * depth - 6}px`; styles.top = "9px"; break;
            case "connector": styles.left = `${INDENT * depth - 4}px`; styles.top = "12px"; break;
            default: console.log("Switch case ERROR");
        }
        return styles;
    };




    render() {
        return (
            <div className={classes.branches}>
                {this.generateBones(this.props.treeString)}
                {this.props.root ? this.getRoot(this.props.depth) : null}
            </div>
        )
    }
}

export default Branches;