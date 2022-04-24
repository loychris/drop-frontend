import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from "./Creator.module.css";
import Element from "./Element/Element";
import Line from "./Line/Line";
import TopMenu from "./TopMenu/TopMenu";
import SelectionMenu from "./SelectionMenu/SelectionMenu";
import SelectionFrame from "./SelectionFrame/SelectionFrame";

const JUMP_TO_LINE_TOLERANZ = 8;

class Creator extends Component {

  state = {
    selectedId: null,
    editingId: null, 
    selectedHline: null,
    selectedVline: null,
    elements: [
      // {
      //   type: 'text', 
      //   elementId: '5',
      //   height: 60,
      //   width: 400, 
      //   posX: 100,
      //   posY: 100,
      //   text: 'Text Element 1',
      //   font: 'Oswald',
      //   fontSize: '30',
      //   fontWeight: '700',
      //   textAlign: 'center',
      //   fixedWidth: true,
      //   underline: false, 
      //   italic: false, 
      //   textStroke: true,
      // },
      // {
      //   type: 'text', 
      //   elementId: '6',
      //   height: 60,
      //   width: 400, 
      //   posX: 100,
      //   posY: 200,
      //   text: 'Text Element 2',
      //   font: 'Oswald',
      //   fontSize: '30',
      //   fontWeight: '700',
      //   textAlign: 'center',
      //   fixedWidth: true,
      //   underline: false, 
      //   italic: false, 
      //   textStroke: true,
      // },
      {
        type: 'text', 
        elementId: '7',
        height: 60,
        width: 400, 
        posX: 100,
        posY: 300,
        text: 'Text Element 3',
        font: 'Oswald',
        fontSize: '30',
        fontWeight: '700',
        textAlign: 'center',
        fixedWidth: true,
        underline: false, 
        italic: false, 
        textStroke: true,
      },
      {
        type: 'rect',
        elementId: '8',
        posX: 100,
        posY: 100,
        height: 400,
        width: 400,
        color: '#FF8592',
      },
      {
        type: 'image',
        elementId: '9',
        imgSrc: 'https://storage.googleapis.com/drop-meme-bucket/meme-6022470ff97f5a363a80b387',
        posX: 250,
        posY: 250,
        height: 400,
        width: 400,
      }
    ],
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.editingId !== prevState.editingId){
      console.log("Editing Id changed from ", prevState.editingId, "to ", this.state.editingId);
    }
  }


  /// SELECT /////////////////////////////////////////////////

  select = (e, elementId) => {
    console.log("SELECT")
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selectedId: elementId, 
      editingId: null
    })
  }

  selectAndEdit = (e, elementId) => {
    console.log("SELECT AND EDIT")
    console.log(elementId);
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selectedId: elementId,
      editingId: elementId
    })
  }

  unSelect = (e) => {
    console.log("UNSELECT");
    this.setState({
      editingId: null,
      selectedId: null
    });
  }

  /// REPOSITION /////////////////////////////////////////////////

  elementMouseDown = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();
    const element = this.state.elements.find(e => e.elementId === elementId);
    const prevX = element.posX;
    const prevY = element.posY;
    const prevMouseX = e.clientX;
    const prevMouseY = e.clientY;
    const { Hlines, Vlines } = this.getLines(elementId);
    const mousemove = (e) => {
      let  newX = prevX - prevMouseX + e.clientX;
      let newY = prevY - prevMouseY + e.clientY;
      let selectedHline = null;
      let selectedVline = null; 
      Hlines.forEach(l => {
        if(Math.abs(l-newY) < JUMP_TO_LINE_TOLERANZ){
           newY = l;
           selectedHline = l;
        } 
        if(Math.abs(l-(newY+element.height)) < JUMP_TO_LINE_TOLERANZ){
          newY = l - element.height;
          selectedHline = l;
        }
        if(Math.abs(l-(2*newY+element.height)/2) < JUMP_TO_LINE_TOLERANZ){
          newY = l - 0.5 * element.height;
          selectedHline = l;
        }
      })
      Vlines.forEach(l => {
        if(Math.abs(l-newX) < JUMP_TO_LINE_TOLERANZ){
           newX = l;
           selectedVline = l;
        } 
        if(Math.abs(l-(newX+element.width)) < JUMP_TO_LINE_TOLERANZ){
          newX = l - element.width
          selectedVline = l;
        }
        if(Math.abs(l-(2*newX+element.width)/2) < JUMP_TO_LINE_TOLERANZ){
          newX = l - 0.5 * element.width
          selectedVline = l;
        }
      })
      let elementsNew = this.state.elements.map(e => {
        if(e.elementId !== elementId){
          return e;
        }else{
          return ({
            ...element,
            posX: newX,
            posY: newY,
          })
        }
      });
      this.setState({
        selectedId: elementId, 
        selectedHline: selectedHline,
        selectedVline: selectedVline,
        elements: elementsNew,

      });
    } 

    const mouseup = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('mouseup', mouseup);
      this.setState({
        selectedHline: null, 
        selectedVline: null
      })
    }

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
    this.setState({
      selectedId: elementId, 
    })
  }

  onTextInput = (e, elementId) => {
    let elementsNew = this.state.elements.filter(e => e.elementId !== elementId);
    const element = this.state.elements.find(e => e.elementId === elementId);
    const elem = document.getElementById(`${elementId}-input`);

    this.setState({
      elements: [
        ...elementsNew,
        {
          ...element,
          height: elem.offsetHeight,
          text: e.target.innerHTML
        }
      ]
    });
  }

  adjustTextElementHeight = (elementId) => {
    let elementsNew = this.state.elements.filter(e => e.elementId !== elementId);
    const element = this.state.elements.find(e => e.elementId === elementId);
    const elem = document.getElementById(`${elementId}-input`);
    elem.innerHTML = element.text;
    console.log(elem.offsetHeight, element.height) 
    console.log(elementsNew); 
    this.setState({
      elements: [
        ...elementsNew,
        {
          ...element,
          height: elem.offsetHeight,
        }
      ]
    });
  }

  /// ADD //////////////////////////////////////////////////

  addElement = (element) => {
    this.setState({
      elements: [...this.state.elements, element],
      selectedId: element.id
    })
  }

  ///  RESIZE  /////////////////////////////////////////////////

  resizeMouseDown = (e, dir, elementId) => {
    console.log('RESIZE MOUSE DOWN');
    e.preventDefault();
    e.stopPropagation(); 
    const element = this.state.elements.find(e => e.elementId === elementId);
    const aspectRatio = element.width / element.height;
    const prevWidth = element.width;
    const prevHeight = element.height;
    const prevX = element.posX;
    const prevY = element.posY;
    const mouseStartX = e.clientX;
    const mouseStartY = e.clientY;

    const resizeMouseMouve = (e) => {
        let newWidth = prevWidth;
        let newHeight = prevHeight;
        let newX = prevX;
        let newY = prevY;

        const diffWidth = e.clientX - mouseStartX;
        const diffHeight = e.clientY - mouseStartY;

        const { Hlines, Vlines } = this.getLines(elementId);
        let selectedHline = null;
        let selectedVline = null; 

        switch(dir) {
            case 'E': 
                newWidth += diffWidth;
                Vlines.forEach(l => {
                  if(Math.abs(newX + newWidth - l) < JUMP_TO_LINE_TOLERANZ){
                    newWidth = l - prevX;
                    selectedVline = l;
                  }  
                });
                break;
            case 'S': 
                newHeight += diffHeight; 
                Hlines.forEach(l => {
                  if(Math.abs(newY + newHeight - l) < JUMP_TO_LINE_TOLERANZ){
                    newHeight = l - prevY;
                    selectedHline = l;
                  }  
                });
                break; 
            case 'W': 
                newWidth -= diffWidth;
                newX += diffWidth;
                Vlines.forEach(l => {
                  if(Math.abs(l-newX) < JUMP_TO_LINE_TOLERANZ){
                    newWidth = prevX + prevWidth - l;
                    newX = l;
                    selectedVline = l;
                  }  
                });
                break;    
            case 'N': 
                newHeight -= diffHeight;
                newY += diffHeight;
                Hlines.forEach(l => {
                  if(Math.abs(l-newY) < JUMP_TO_LINE_TOLERANZ){
                    newHeight = prevY + prevHeight - l;
                    newY = l;
                    selectedHline = l;
                  }  
                });
                break;                 
            case 'SE':
                newWidth += diffWidth; 
                newHeight = e.shiftKey ? newHeight + diffHeight : newWidth / aspectRatio; 
                break; 
            case 'NE':
                newWidth += diffWidth; 
                newHeight = e.shiftKey ? newHeight - diffHeight : newWidth / aspectRatio;
                newY += prevHeight - newHeight; 
                break; 
            case 'SW':
                newWidth -= diffWidth; 
                newHeight = e.shiftKey ? newHeight + diffHeight : newWidth / aspectRatio; 
                newX += prevWidth - newWidth; 
                break;
            case 'NW':
                newWidth -= diffWidth; 
                newHeight = e.shiftKey ? newHeight - diffHeight : newWidth / aspectRatio;
                newX += prevWidth - newWidth; 
                newY += prevHeight - newHeight; 
                break; 
            default: console.log('Invalid dir', dir)
        }

        // check all vetical lines if one is in the toleranz to be highlighted
        Vlines.forEach(l => {
          if(['W', 'SW', 'NW'].includes(dir) && Math.abs(l-(newY+element.height)) < JUMP_TO_LINE_TOLERANZ){

          }
        })

        const elem = document.getElementById(`${elementId}-input`);

        let elementsNew = this.state.elements.map(E => {
          if(E.elementId === elementId){
            return {
              ...element,
                width: newWidth, 
                height: element.type==='text' ? elem.offsetHeight : newHeight,
                posX: newX,
                posY: newY,
            }
          }else{
            return E
          }
        });
        this.setState({
          elements: elementsNew,
          selectedHline: selectedHline,
          selectedVline: selectedVline,
        });
    }
    const mouseup = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        window.removeEventListener('mousemove', resizeMouseMouve);
        window.removeEventListener('mouseup', mouseup);
    }
    window.addEventListener('mousemove', resizeMouseMouve);
    window.addEventListener('mouseup', mouseup);
  }

  edit = (elementId, newElement) => {
    const newElements = this.state.elements.map(e => {
      if(e.elementId === elementId){
        return newElement
      }else{
        return e;
      }
    })
    this.setState({ elements: newElements})
  }
  
  /// RENDER /////////////////////////////////////////////////

  getElements = () => {

    // TODO: redo/replace this with real orders and z-index
    const elements = [
      ...this.state.elements.filter(e => e.type !== 'text'),
      ...this.state.elements.filter(e => e.type === 'text')
    ]

    return elements.map(e => {
      // const highlight = this.state.dragging && this.state.
      switch(e.type){
        case 'text': 
          return(
            <Element 
              currentlyEditing={this.state.editingId === e.elementId}
              type='text'
              key={e.elementId}
              element={e}
              selected={e.elementId === this.state.selectedId}
              edit={this.edit}
              select={this.select}
              selectAndEdit={this.selectAndEdit}
              elementMouseDown={this.elementMouseDown}
              onTextInput={this.onTextInput}
              adjustTextElementHeight={this.adjustTextElementHeight}
              selectedLines={{h: this.state.selectedHline, v: this.state.selectedVline}}
            />
          ) 
        case 'rect': 
            return(
              <Element 
                currentlyEditing={this.state.editingId === e.elementId}
                type='rect'
                key={e.elementId}
                element={e}
                selected={e.elementId === this.state.selectedId}
                select={this.select}
                elementMouseDown={this.elementMouseDown}
                selectedLines={{h: this.state.selectedHline, v: this.state.selectedVline}}
              />
            )
        case 'image': 
          return(
            <Element 
              currentlyEditing={this.state.editingId === e.elementId}
              type='image'
              key={e.elementId}
              element={e}
              selected={e.elementId === this.state.selectedId}
              select={this.select}
              elementMouseDown={this.elementMouseDown}
              onTextInput={this.onTextInput}
              adjustTextElementHeight={this.adjustTextElementHeight}
              selectedLines={{h: this.state.selectedHline, v: this.state.selectedVline}}
            />
          )
        default: console.log('Invalid Element Type!'); return null; 
      }
    })
  }

  getLines = (excludeId) => {
    let Hlines = [];
    let Vlines = [];
    this.state.elements.forEach(element => {
      if(excludeId !== element.elementId){
        Hlines.push(element.posY)
        Hlines.push((2* element.posY + element.height)/2)
        Hlines.push(element.posY + element.height)
        Vlines.push(element.posX)
        Vlines.push((2* element.posX + element.width)/2)
        Vlines.push(element.posX + element.width)
      } 
    });
    const lines = {
      Hlines: [...new Set(Hlines)],
      Vlines: [...new Set(Vlines)]
    }
    return lines; 
  }

  shouldElementHighlight = (elementId) => {
    if(!this.state.selectedHline && !this.state.selectedHline) return false;
    if(elementId === this.state.selectedId) return false;
    const element = this.state.elements.find(e => e.elementId === elementId);
    let Hlines = [];
    let Vlines = [];
    Hlines.push(element.posY)
    Hlines.push(element.posY + element.height)
    Hlines.push((2* element.posY + element.height)/2)
    Vlines.push(element.posX)
    Vlines.push(element.posX + element.width)
    Vlines.push((2* element.posX + element.width)/2)
    console.log(element);
    console.log(Hlines);
    console.log(Vlines);
    console.log(this.state.selectedVline);
    console.log(Vlines.includes(this.state.selectedVline))
    if(Hlines.includes(this.state.selectedHline)) return true; 
    if(Vlines.includes(this.state.selectedVline)) return true; 
    return false;
  }

  renderLines = () => {
    // const lines = this.getLines(this.state.selectedId);
    // return [
    //   ...lines.Hlines.map(top => <Line key={`HL-${top}`} top={top} left={0}/>),
    //   ...lines.Vlines.map(left => <Line key={`VL-${left}`} top={0} left={left}/>)
    // ]
    let lines = [];
    if(this.state.selectedHline){
      lines.push(<Line key={`HL-${this.state.selectedHline}`} top={this.state.selectedHline} left={0}/>)
    }
    if(this.state.selectedVline){
      lines.push(<Line key={`VL-${this.state.selectedVline}`} top={0} left={this.state.selectedVline}/>)
    }
    return lines; 
  }

  render() {
    const styleClasses = [classes.Creator];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeftLeft);
    if (this.props.currentTab === 'chat') styleClasses.push(classes.OutLeft);
    const selected = this.state.elements.find(e => e.elementId === this.state.selectedId);
    return (
      <div 
        className={styleClasses.join(" ")}
        // onClick={this.unSelect}
      >
        <SelectionMenu
          edit={this.edit}
          selected={selected}
        /> 
        {selected 
          ? <SelectionFrame 
              element={selected}
              resizeMouseDown={this.resizeMouseDown}
            /> 
          : null}
        { this.getElements() }
        <TopMenu addElement={this.addElement}/>
        { this.renderLines() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.ui.currentTab,
    darkmode: state.ui.currentTab,

    sending: state.user.sendingSubscribeEmailList, 
    sent: state.user.sentSubscribeEmailList, 
    emailListError: state.user.emailListError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubscribeEmailList: (email) => dispatch(actions.subscribeEmailList(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
