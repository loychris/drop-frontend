import React, { Component } from 'react';

import classes from './Branches.module.css';

const INDENT = 17;

const HIDDENCOLOR = '#333333';


class Branches extends Component {


    getRoot = (i) => {
        let styles = { left: `${11 + this.props.treeString.length * INDENT}px` }
        return(
        <svg className={classes.Root} style={styles} width={"2px"} height={`${this.props.height}px`} viewBox={`0 0 2 ${this.props.height}`} fill="#abcdef" xmlns="http://www.w3.org/2000/svg">
          <path d={`M0 0H2V${this.props.height}H0V0Z`} fill={`${i >= this.props.hideBranches ? HIDDENCOLOR : '#ffffff'}`} />
        </svg>
        )
    }

    getL = (i) => {
        return(
            <svg style={this.generateBoneStyles(i + 1, "L")} key={`${i}L`} width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H2V1V1C2 1.55228 2.44772 2 3 2V2H6V4H2C0.89543 4 0 3.10457 0 2V0Z" fill={`${i >= this.props.hideBranches ? '#ffffff' : HIDDENCOLOR}`}/>
            </svg>
        )
    }

    getC = (i) => {
        return(
            <svg style={this.generateBoneStyles(i + 1, "connector")} key={`${i}-connector`} width="4" height="2" viewBox="0 0 4 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H4V2H0V0Z" fill={`${i >= this.props.hideBranches ? '#ffffff' : HIDDENCOLOR}`}/>
            </svg>
        )
        
    }

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
                <path d={`M0 0H2V${height}H0V0Z`} fill={`${depth >= this.props.hideBranches ? '#ffffff' : HIDDENCOLOR}`} />
            </svg>
        );
    };


    generateBones = boneComponents => {
        let bones = [];
        //Generate Bone Components
        for (let i = 0; i < boneComponents.length; i++) {
            switch (boneComponents[i]) {
            case " ": break;
            case "I": bones.push(this.generateLine(i, "I")); break;
            case "T": bones.push(this.generateLine(i, "I"));
                      bones.push(this.getC(i));break;
            case "L": bones.push(this.generateLine(i, "IL"));
                      bones.push(this.getL(i));
                      let pathArr = this.props.path.split("/");
                      pathArr.pop();
                      break;
            default: console.log("ERROR: unwanted Character in BuildBone");
            }
        }
        return bones;
    };



    generateBoneStyles = (depth, type) => {
        let styles = {
            top: "-42px",
            position: "absolute",
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