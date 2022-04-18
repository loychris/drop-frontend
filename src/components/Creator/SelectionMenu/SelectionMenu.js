 import React, { Component } from 'react';
 import classes from './SelectionMenu.module.css';

 class SelectionMenu extends Component {

    leftAlignIcon = () => {
        return(
            <svg 
                className={this.props.selected.textAlign === 'left' ? classes.alignActive : classes.alignInactive} 
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <rect x="1.5" y="1.5" width="37" height="37" rx="3.5" stroke="white" stroke-width="3"/> */}
                <line x1="7" y1="8" x2="33" y2="8" stroke="white" stroke-width="2"/>
                <line x1="7" y1="20" x2="30" y2="20" stroke="white" stroke-width="2"/>
                <line x1="7" y1="32" x2="27" y2="32" stroke="white" stroke-width="2"/>
                <line x1="7" y1="14" x2="22" y2="14" stroke="white" stroke-width="2"/>
                <line x1="7" y1="26" x2="22" y2="26" stroke="white" stroke-width="2"/>
            </svg>
        )
    }

    centerAlignIcon = () => {
        return (
            <svg 
                className={this.props.selected.textAlign === 'center' ? classes.alignActive : classes.alignInactive} 
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <rect x="1.5" y="1.5" width="37" height="37" rx="3.5" stroke="white" stroke-width="3"/> */}
                <line x1="7" y1="8" x2="33" y2="8" stroke="white" stroke-width="2"/>
                <line x1="9" y1="20" x2="32" y2="20" stroke="white" stroke-width="2"/>
                <line x1="10" y1="32" x2="30" y2="32" stroke="white" stroke-width="2"/>
                <line x1="13" y1="14" x2="28" y2="14" stroke="white" stroke-width="2"/>
                <line x1="13" y1="26" x2="28" y2="26" stroke="white" stroke-width="2"/>
            </svg>
        )
    }

    rightAlignIcon = () => {
        return (
            <svg 
                className={this.props.selected.textAlign === 'right' ? classes.alignActive : classes.alignInactive}
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <rect x="-1.5" y="1.5" width="37" height="37" rx="3.5" transform="matrix(-1 0 0 1 37 0)" stroke="white" stroke-width="3"/> */}
                <line y1="-1" x2="26" y2="-1" transform="matrix(-1 0 0 1 33 9)" stroke="white" stroke-width="2"/>
                <line y1="-1" x2="23" y2="-1" transform="matrix(-1 0 0 1 33 21)" stroke="white" stroke-width="2"/>
                <line y1="-1" x2="20" y2="-1" transform="matrix(-1 0 0 1 33 33)" stroke="white" stroke-width="2"/>
                <line y1="-1" x2="16" y2="-1" transform="matrix(-1 0 0 1 33 15)" stroke="white" stroke-width="2"/>
                <line y1="-1" x2="16" y2="-1" transform="matrix(-1 0 0 1 33 27)" stroke="white" stroke-width="2"/>
            </svg>
        )
    }

    clicked = (e) => {
        e.stopPropagation();
    }

    editHeight = (e) => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            height: e.target.value,
        });
    }

    editWidth = (e) => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            width: e.target.value,
        });
    }

    editX = (e) => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            posX: e.target.value,
        });
    }

    editY = (e) => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            posY: e.target.value,
        });
    }

    editFont = (e) => {
        console.log(e.target.value);
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            font: e.target.value,
        });
    }

    editFontSize = (e) => {
        console.log(e.target.value);
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            fontSize: e.target.value,
        });
    }

    editTextAlign = (value) => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            textAlign: value,
        });
    }



    render(){
        if(!this.props.selected) return null;
        const { type, elementId, posX, posY, height, width, fontSize, font, fontWeight } = this.props.selected;

        return (
            <div className={classes.SelectionMenu} onClick={this.clicked}>
                <div className={classes.geometrics}>
                    <div className={classes.inputWrapper}>Height: <input className={classes.input} onChange={this.editHeight} type='number' value={height}/></div>
                    <div className={classes.inputWrapper}>X: <input className={classes.input}  onChange={this.editX} type='number' value={posX}/></div>
                    <div className={classes.inputWrapper}>Width: <input className={classes.input} onChange={this.editWidth} type='number' value={width}/></div>
                    <div className={classes.inputWrapper}>Y: <input className={classes.input} onChange={this.editY} type='number' value={posY}/></div>
                </div>
                { type === "text" ? 
                    <div className={classes.textOptions}>
                        <div className={classes.fontSelector}> 
                            <select onChange={this.editFont} value={font}>
                                <option value="Impact">Impact</option>
                                <option value="Arial">Arial</option>
                                <option value="Times">Times</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </div>
                        <div className={classes.inputWrapper}>
                            Font Size: 
                            <input className={classes.input} onChange={this.editFontSize} type='number' value={fontSize}/>
                        </div>
                        <div className={classes.align}>
                            <div className={classes.alignIcon} onClick={() => this.editTextAlign("left")}>
                                {this.leftAlignIcon()}
                            </div>
                            <div className={classes.alignIcon} onClick={() => this.editTextAlign("center")}>
                                {this.centerAlignIcon()}
                            </div>
                            <div className={classes.alignIcon} onClick={() => this.editTextAlign("right")}>
                                {this.rightAlignIcon()}
                            </div>

                        </div>
                    </div>
                : null }
            </div>
        )
    }
 }

 export default SelectionMenu;