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
                <line stroke={strokeColor} y1="-1" x2="26" y2="-1" transform="matrix(-1 0 0 1 33 9)" strokeWidth="2"/>
                <line stroke={strokeColor} y1="-1" x2="23" y2="-1" transform="matrix(-1 0 0 1 33 21)" strokeWidth="2"/>
                <line stroke={strokeColor} y1="-1" x2="20" y2="-1" transform="matrix(-1 0 0 1 33 33)" strokeWidth="2"/>
                <line stroke={strokeColor} y1="-1" x2="16" y2="-1" transform="matrix(-1 0 0 1 33 15)" strokeWidth="2"/>
                <line stroke={strokeColor} y1="-1" x2="16" y2="-1" transform="matrix(-1 0 0 1 33 27)" strokeWidth="2"/>
            </svg>
        )
    }

    topAlignIcon = () => {
        const strokeColor = this.props.selected.verticalAlign === 'top' ? '#11192c' : '#ffffff';
        console.log(strokeColor)
        return(
            <svg 
                className={this.props.selected.verticalAlign === 'top' ? classes.alignActive : classes.alignInactive}
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line stroke={strokeColor} x1="6" y1="7" x2="34" y2="7" strokeWidth="2"/>
                <path fill={strokeColor} d="M20.7071 10.2929C20.3166 9.90237 19.6834 9.90237 19.2929 10.2929L12.9289 16.6569C12.5384 17.0474 12.5384 17.6805 12.9289 18.0711C13.3195 18.4616 13.9526 18.4616 14.3431 18.0711L20 12.4142L25.6569 18.0711C26.0474 18.4616 26.6805 18.4616 27.0711 18.0711C27.4616 17.6805 27.4616 17.0474 27.0711 16.6569L20.7071 10.2929ZM21 33V11H19V33H21Z"/>
            </svg>
        )
    }

    middleAlignIcon = () => {
        const strokeColor = this.props.selected.verticalAlign === 'middle' ? '#11192c' : '#ffffff';
        return(
            <svg 
                className={this.props.selected.verticalAlign === 'middle' ? classes.alignActive : classes.alignInactive}
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line stroke={strokeColor} x1="6" y1="20" x2="34" y2="20" strokeWidth="2"/>
                <path fill={strokeColor} d="M20.7071 23.2929C20.3166 22.9024 19.6834 22.9024 19.2929 23.2929L12.9289 29.6569C12.5384 30.0474 12.5384 30.6805 12.9289 31.0711C13.3195 31.4616 13.9526 31.4616 14.3431 31.0711L20 25.4142L25.6569 31.0711C26.0474 31.4616 26.6805 31.4616 27.0711 31.0711C27.4616 30.6805 27.4616 30.0474 27.0711 29.6569L20.7071 23.2929ZM21 34L21 24H19V34H21Z"/>
                <path fill={strokeColor} d="M19.2929 16.7071C19.6834 17.0976 20.3166 17.0976 20.7071 16.7071L27.0711 10.3431C27.4616 9.95262 27.4616 9.31946 27.0711 8.92893C26.6805 8.53841 26.0474 8.53841 25.6569 8.92893L20 14.5858L14.3431 8.92893C13.9526 8.53841 13.3195 8.53841 12.9289 8.92893C12.5384 9.31946 12.5384 9.95262 12.9289 10.3431L19.2929 16.7071ZM19 6V16H21V6H19Z"/>
                </svg>
        )
    }

    bottomAlignIcon = () => {
        const strokeColor = this.props.selected.verticalAlign === 'bottom' ? '#11192c' : '#ffffff';
        return(
            <svg 
                className={this.props.selected.verticalAlign === 'bottom' ? classes.alignActive : classes.alignInactive}
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line stroke={strokeColor} x1="34" y1="33" x2="6" y2="33" strokeWidth="2"/>
                <path fill={strokeColor} d="M19.2929 29.7071C19.6834 30.0976 20.3166 30.0976 20.7071 29.7071L27.0711 23.3431C27.4616 22.9526 27.4616 22.3195 27.0711 21.9289C26.6805 21.5384 26.0474 21.5384 25.6569 21.9289L20 27.5858L14.3431 21.9289C13.9526 21.5384 13.3195 21.5384 12.9289 21.9289C12.5384 22.3195 12.5384 22.9526 12.9289 23.3431L19.2929 29.7071ZM19 7V29H21V7H19Z" fill={strokeColor}/>
            </svg>
        )
    }



    italicIcon = () => {
        const strokeColor = this.props.selected.italic ? '#11192c' : '#ffffff';
        return(
            <svg 
                className={this.props.selected.italic ? classes.alignActive : classes.alignInactive}
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 7.44772 16.4477 7 17 7H28C28.5523 7 29 7.44772 29 8V9C29 9.55228 28.5523 10 28 10H24.7899C24.3268 10 23.9243 10.3179 23.8171 10.7684L19.2932 29.7684C19.1436 30.3968 19.6201 31 20.266 31H23C23.5523 31 24 31.4477 24 32V33C24 33.5523 23.5523 34 23 34H12C11.4477 34 11 33.5523 11 33V32C11 31.4477 11.4477 31 12 31H15.2101C15.6732 31 16.0757 30.6821 16.1829 30.2316L20.7068 11.2316C20.8564 10.6032 20.3799 10 19.734 10H17C16.4477 10 16 9.55228 16 9V8Z" fill={strokeColor}/>
            </svg>
        )
    }

    underlineIcon = () => {
        const strokeColor = this.props.selected.underline ? '#11192c' : '#ffffff';
        return(
            <svg 
                className={this.props.selected.underline ? classes.alignActive : classes.alignInactive}
                width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 32C11 31.4477 11.4477 31 12 31H28C28.5523 31 29 31.4477 29 32V33C29 33.5523 28.5523 34 28 34H12C11.4477 34 11 33.5523 11 33V32Z" fill={strokeColor}/>
                <path d="M12 8C12 7.44772 12.4477 7 13 7H15C15.5523 7 16 7.44772 16 8V22C16 22.5523 15.5523 23 15 23H13C12.4477 23 12 22.5523 12 22V8Z" fill={strokeColor}/>
                <path d="M24 8C24 7.44772 24.4477 7 25 7H27C27.5523 7 28 7.44772 28 8V22C28 22.5523 27.5523 23 27 23H25C24.4477 23 24 22.5523 24 22V8Z" fill={strokeColor}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16 17.7358C13.6088 18.6868 12 20.4643 12 22.5C12 26 15.5817 28 20 28C24.4183 28 28 26 28 22.5C28 20.4643 26.3912 18.6868 24 17.7358V21C24 25 20 25 20 25C20 25 16 25 16 21V17.7358Z" fill={strokeColor}/>
            </svg>
        )
    }

    stopPropagation = (e) => {
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
            italic: !this.props.selected.italic,
        });
    }

    editVerticalAlign = (value) => {
        this.props.edit(this.props.selected.elementId, {
            ...this.props.selected, 
            verticalAlign: value
        });
    }

    render(){
        if(!this.props.selected) return null;
        const { type, elementId, posX, posY, height, width, fontSize, font, fontWeight, fixedWidth } = this.props.selected;

        return (
            <div className={classes.SelectionMenu} onClick={this.stopPropagation} onMouseUp={this.stopPropagation}>
                <div>
                    <div className={classes.flex}>
                        <div className={classes.inputWrapper}>
                            <span>Height:</span>
                            <input className={classes.input} onChange={this.editHeight} type='number' value={height}/>
                        </div>
                        <div className={classes.inputWrapper}>
                            <span>Width:</span>
                            <input className={classes.input} onChange={this.editWidth} type='number' value={width}/>
                        </div>
                    </div>
                    <div className={classes.flex}>
                        <div className={classes.inputWrapper}>
                            <span>X:</span>
                            <input className={classes.input}  onChange={this.editX} type='number' value={posX}/>
                        </div>
                        <div className={classes.inputWrapper}>
                            <span>Y:</span>
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
                        <div className={classes.flexSpaceBetween}>
                            <div className={classes.flex}>
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
                                <div className={classes.alignIcon} onClick={() => this.editVerticalAlign("top")}>
                                {this.topAlignIcon()}
                                </div>
                                <div className={classes.alignIcon} onClick={() => this.editVerticalAlign("middle")}>
                                {this.middleAlignIcon()}
                                </div>
                                <div className={classes.alignIcon} onClick={() => this.editVerticalAlign("bottom")}>
                                {this.bottomAlignIcon()}
                                </div>
                            </div>
                        </div>
                        <div className={classes.flex}>
                            <div className={classes.fontWeight}>
                                <select onChange={this.editFontWeight} value={fontWeight}>
                                    {/* <option value="900">Black</option>
                                    <option value="800">ExtraBold</option> */}
                                    <option value="700">Bold</option>
                                    {/* <option value="600">SemiBold</option>
                                    <option value="500">Medium</option> */}
                                    <option value="400">Regular</option>
                                    {/* <option value="300">Light</option>
                                    <option value="200">ExtraLight</option>
                                    <option value="100">Thin</option> */}
                                </select>
                            </div>
                            <div className={classes.alignIcon} onClick={this.editItalic}>
                                {this.italicIcon()}
                            </div>
                            <div className={classes.alignIcon} onClick={this.editUnderline}>
                                {this.underlineIcon()}
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