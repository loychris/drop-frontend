import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from "./Creator.module.css";
import Rectangle from "./Rectangle/Rectangle";

class Creator extends Component {

  state = {
    selectedId: '5',
    editingId: '5', 
    strg: false,
    elements: [
      {
        type: 'text', 
        elementId: '5',
        height: 200,
        width: 200, 
        posX: 200,
        posY: 200,
        text: 'Text Element 1',
      },
      {
        type: 'text', 
        elementId: '6',
        height: 200,
        width: 200, 
        posX: 600,
        posY: 600,
        text: 'Text Element 2',
      },
      {
        type: 'image',
        elementId: '7',
        imgSrc: 'https://storage.googleapis.com/drop-meme-bucket/meme-6022470ff97f5a363a80b387',
        posX: 600,
        posY: 600,
        height: 400,
        width: 400
      }
    ]
  }

  componentDidMount

  select = (e, elementId) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('SELECTING', elementId);
    this.setState({
      selectedId: elementId, 
      editingId: ''
    })
  }

  selectAndEdit = (e, elementId) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selectedId: elementId,
      editingId: elementId
    })
  }

  unSelect = (e) => {
    if(this.state.editingId !== 0){
      this.setState({editingId: ''});
    } else {
      this.setState({selectedId: ''});
    }
  }

  ////////////////////////////////////////////////////

  rectangleMouseDown = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('rectangleMouseDown', elementId);
    const element = this.state.elements.find(e => e.elementId === elementId);
    const prevX = element.posX - e.clientX;
    const prevY = element.posY - e.clientY;
    const mousemove = (e) => {
      let elementsNew = this.state.elements.filter(e => e.elementId !== elementId);
      const newX = prevX + e.clientX;
      const newY = prevY + e.clientY;
      this.setState({
        selectedId: elementId, 
        elements: [
          ...elementsNew,
          {
            ...element,
            posX: newX,
            posY: newY,
          }
        ]
      });
    } 

    const mouseup = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('rectangleMouseup');
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('mouseup', mouseup);
    }
      window.addEventListener('mousemove', mousemove);
      window.addEventListener('mouseup', mouseup);
    this.setState({selectedId: elementId, editingId: ''})
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


  resizeMouseDown = (e, dir, elementId) => {
    e.preventDefault();
    e.stopPropagation(); 

    const element = this.state.elements.find(e => e.elementId === elementId);

    const aspectRatioFix = element.type === 'image';
    const aspectRatio = element.width / element.height;


    const prevWidth = element.width;
    const prevHeight = element.height;
    const prevLeft = element.posX;
    const prevTop = element.posY;

    const mouseStartX = e.clientX;
    const mouseStartY = e.clientY;

    const resizeMouseMouve = (e) => {
        let newWidth = prevWidth;
        let newHeight = prevHeight;
        let newLeft = prevLeft;
        let newTop = prevTop;

        const diffWidth = e.clientX - mouseStartX;
        const diffHeight = e.clientY - mouseStartY;

        switch(dir) {
            case 'E': 
                newWidth += diffWidth;
                break;
            case 'S': 
                newHeight += diffHeight; 
                break; 
            case 'W': 
                newWidth -= diffWidth;
                newLeft += diffWidth;
                break;    
            case 'N': 
                newHeight -= diffHeight;
                newTop += diffHeight;
                break;                 
            case 'SE':
                newWidth += diffWidth; 
                newHeight = e.shiftKey ? newHeight + diffHeight : newWidth / aspectRatio; 
                break; 
            case 'NE':
                newWidth += diffWidth; 
                newHeight = e.shiftKey ? newHeight - diffHeight : newWidth / aspectRatio;
                newTop += prevHeight - newHeight; 
                break; 
            case 'SW':
                newWidth -= diffWidth; 
                newHeight = e.shiftKey ? newHeight + diffHeight : newWidth / aspectRatio; 
                newLeft += prevWidth - newWidth; 
                break;
            case 'NW':
                newWidth -= diffWidth; 
                newHeight = e.shiftKey ? newHeight - diffHeight : newWidth / aspectRatio;
                newLeft += prevWidth - newWidth; 
                newTop += prevHeight - newHeight; 
                break; 
            default: console.log('Invalid dir', dir)
        }
        const elem = document.getElementById(`${elementId}-input`);

        let elementsNew = this.state.elements.filter(e => e.elementId !== elementId);
        
        this.setState({
          elements: [
            ...elementsNew,
            {
              ...element,
                width: newWidth, 
                height: element.type==='text' ? elem.offsetHeight : newHeight,
                posX: newLeft,
                posY: newTop,
            }
          ]
        });
    }
    const mouseup = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        console.log('removing Listener: ', dir);
        window.removeEventListener('mousemove', resizeMouseMouve);
        window.removeEventListener('mouseup', mouseup);
    }
    console.log('adding   Listener: ', dir);

    window.addEventListener('mousemove', resizeMouseMouve);
    window.addEventListener('mouseup', mouseup);
}
  
  ////////////////////////////////////////////////////

  getElements = () => {
    return this.state.elements.map(e => {
      switch(e.type){
        case 'text': 
          return(
            <Rectangle 
              currentlyEditing={this.state.editingId === e.elementId}
              type='text'
              key={e.elementId}
              element={e}
              elementId={e.elementId} 
              selected={e.elementId === this.state.selectedId}
              select={this.select}
              selectAndEdit={this.selectAndEdit}
              rectangleMouseDown={this.rectangleMouseDown}
              onTextInput={this.onTextInput}
              adjustTextElementHeight={this.adjustTextElementHeight}
              resizeMouseDown={this.resizeMouseDown}
            />
          ) 
        case 'image': 
          return(
            <Rectangle 
              currentlyEditing={this.state.editingId === e.elementId}
              type='image'
              key={e.elementId}
              element={e}
              elementId={e.elementId} 
              selected={e.elementId === this.state.selectedId}
              select={this.select}
              selectAndEdit={this.selectAndEdit}
              rectangleMouseDown={this.rectangleMouseDown}
              onTextInput={this.onTextInput}
              adjustTextElementHeight={this.adjustTextElementHeight}
              resizeMouseDown={this.resizeMouseDown}
            />
          )
        default: console.log('Invalid Element Type!'); 
      }
    })
  }

  render() {
    const styleClasses = [classes.Creator];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeftLeft);
    if (this.props.currentTab === 'chat') styleClasses.push(classes.OutLeft);
    return (
      <div 
        className={styleClasses.join(" ")}
        onClick={this.unSelect}>
        { this.getElements() }
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
