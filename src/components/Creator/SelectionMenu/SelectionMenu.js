 import React, { Component } from 'react';
 import classes from './SelectionMenu.module.css';

 class SelectionMenu extends Component {

    leftAlignIcon = () => {
        const strokeColor = this.props.selected.textAlign === 'left' ? '#11192c' : '#ffffff';
        return(
            <svg 
                className={this.props.selected.textAlign === 'left' ? classes.alignActive : classes.alignInactive} 
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <rect x="1.5" y="1.5" width="37" height="37" rx="3.5" stroke="white" stroke-width="3"/> */}
                <line x1="7" y1="8" x2="33" y2="8" stroke={strokeColor} strokeWidth="2"/>
                <line x1="7" y1="20" x2="30" y2="20" stroke={strokeColor} strokeWidth="2"/>
                <line x1="7" y1="32" x2="27" y2="32" stroke={strokeColor} strokeWidth="2"/>
                <line x1="7" y1="14" x2="22" y2="14" stroke={strokeColor} strokeWidth="2"/>
                <line x1="7" y1="26" x2="22" y2="26" stroke={strokeColor} strokeWidth="2"/>
            </svg>
        )
    }

    centerAlignIcon = () => {
        const strokeColor = this.props.selected.textAlign === 'center' ? '#11192c' : '#ffffff';
        return (
            <svg 
                className={this.props.selected.textAlign === 'center' ? classes.alignActive : classes.alignInactive} 
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <rect x="1.5" y="1.5" width="37" height="37" rx="3.5" stroke="white" stroke-width="3"/> */}
                <line x1="7" y1="8" x2="33" y2="8" stroke={strokeColor} strokeWidth="2"/>
                <line x1="9" y1="20" x2="32" y2="20" stroke={strokeColor} strokeWidth="2"/>
                <line x1="10" y1="32" x2="30" y2="32" stroke={strokeColor} strokeWidth="2"/>
                <line x1="13" y1="14" x2="28" y2="14" stroke={strokeColor} strokeWidth="2"/>
                <line x1="13" y1="26" x2="28" y2="26" stroke={strokeColor} strokeWidth="2"/>
            </svg>
        )
    }

    rightAlignIcon = () => {
        const strokeColor = this.props.selected.textAlign === 'right' ? '#11192c' : '#ffffff';
        return (
            <svg 
                className={this.props.selected.textAlign === 'right' ? classes.alignActive : classes.alignInactive}
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <rect x="-1.5" y="1.5" width="37" height="37" rx="3.5" transform="matrix(-1 0 0 1 37 0)" stroke="white" stroke-width="3"/> */}
                <line y1="-1" x2="26" y2="-1" transform="matrix(-1 0 0 1 33 9)" stroke={strokeColor} strokeWidth="2"/>
                <line y1="-1" x2="23" y2="-1" transform="matrix(-1 0 0 1 33 21)" stroke={strokeColor} strokeWidth="2"/>
                <line y1="-1" x2="20" y2="-1" transform="matrix(-1 0 0 1 33 33)" stroke={strokeColor} strokeWidth="2"/>
                <line y1="-1" x2="16" y2="-1" transform="matrix(-1 0 0 1 33 15)" stroke={strokeColor} strokeWidth="2"/>
                <line y1="-1" x2="16" y2="-1" transform="matrix(-1 0 0 1 33 27)" stroke={strokeColor} strokeWidth="2"/>
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

    editFontWeight = (e) => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            fontWeight: e.target.value,
        });
    }

    editFixedWidth = (value) => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            fixedWidth: value,
        });
    }

    editUnderline = () => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            underline: !this.props.selected.underline,
        });
    }

    editItalic = () => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            underline: !this.props.selected.italic,
        });
    }



    render(){
        if(!this.props.selected) return null;
        const { type, elementId, posX, posY, height, width, fontSize, font, fontWeight, fixedWidth } = this.props.selected;

        return (
            <div className={classes.SelectionMenu} onClick={this.clicked}>
                <div>
                    <div className={classes.flex}>
                        <div className={classes.inputWrapper}>
                            Height:
                            <input className={classes.input} onChange={this.editHeight} type='number' value={height}/>
                        </div>
                        <div className={classes.inputWrapper}>
                            Width:
                            <input className={classes.input} onChange={this.editWidth} type='number' value={width}/>
                        </div>
                    </div>
                    <div className={classes.flex}>
                        <div className={classes.inputWrapper}>
                            <div>X: </div>
                            <input className={classes.input}  onChange={this.editX} type='number' value={posX}/>
                        </div>
                        <div className={classes.inputWrapper}>
                            <div>Y: </div>
                            <input className={classes.input} onChange={this.editY} type='number' value={posY}/>
                        </div>
                    </div>
                </div>
                { type === "text" ? 
                    <div className={classes.textOptions}>
                        <div className={classes.flex}>
                            <div className={classes.fontSelector}> 
                                <select onChange={this.editFont} value={font}>
                                    <option value="Impact">Impact</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Times">Times</option>
                                    <option value="Verdana">Verdana</option>
                                </select>
                            </div>
                            <div className={classes.inputWrapper}>
                                <input className={classes.input} onChange={this.editFontSize} type='number' value={fontSize}/>
                            </div>
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
                        <div className={classes.flex}>
                            <div className={classes.fontWeight}>
                                <select onChange={this.editFontWeight} value={fontWeight}>
                                    <option value="900">Black</option>
                                    <option value="800">ExtraBold</option>
                                    <option value="700">Bold</option>
                                    <option value="600">SemiBold</option>
                                    <option value="500">Medium</option>
                                    <option value="400">Regular</option>
                                    <option value="300">Light</option>
                                    <option value="200">ExtraLight</option>
                                    <option value="100">Thin</option>
                                </select>
                            </div>
                            <div className={classes.alignIcon} onClick={this.editItalic}>
                                {this.leftAlignIcon()}
                            </div>
                            <div className={classes.alignIcon} onClick={this.editUnderline}>
                                {this.centerAlignIcon()}
                            </div>
                        </div>


                        <div className={classes.textBoxTypeOptions}>
                            <div onClick={() => this.editFixedWidth(true)}>
                                <input type="checkbox" onChange={() => this.editFixedWidth(true)} checked={fixedWidth}/> fixed width & font size
                            </div>
                            <div onClick={() => this.editFixedWidth(false)}>
                                <input type="checkbox" onChange={() => this.editFixedWidth(false)} checked={!fixedWidth}/> fixed textbox size
                            </div>
                        </div>
                    </div>
                : null }
            </div>
        )
    }
 }

 export default SelectionMenu;