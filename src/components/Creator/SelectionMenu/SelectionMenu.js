 import React, { Component } from 'react';
 import classes from './SelectionMenu.module.css';

 class SelectionMenu extends Component {


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



    render(){
        if(!this.props.selected) return null;
        const { type, elementId, posX, posY, height, width } = this.props.selected;

        return (
            <div className={classes.SelectionMenu} onClick={this.clicked}>
                <div className={classes.geometrics}>
                    <div className={classes.inputWrapper}>Height: <input className={classes.input} onChange={this.editHeight} type='number' value={height}/></div>
                    <div className={classes.inputWrapper}>X: <input className={classes.input}  onChange={this.editX} type='number' value={posX}/></div>
                    <div className={classes.inputWrapper}>Width: <input className={classes.input} onChange={this.editWidth} type='number' value={width}/></div>
                    <div className={classes.inputWrapper}>Y: <input className={classes.input} onChange={this.editY} type='number' value={posY}/></div>
                </div>
                { type === "text" ? 
                    <div className={classes.fontSelector}> 
                        <label for="font">Font</label>
                        <select id="font" onChange={this.editFont} value={this.props.selected.font}>
                            <option value="Impact">Impact</option>
                            <option value="Arial">Arial</option>
                            <option value="Times">Times</option>
                            <option value="Verdana">Verdana</option>
                        </select>
                    </div>
                
                : null}
            </div>
        )
    }
 }

 export default SelectionMenu;