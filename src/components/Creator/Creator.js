import React, { Component } from "react";
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from "./Creator.module.css";
import Element from "./Element/Element";
import Line from "./Line/Line";
import TopMenu from "./TopMenu/TopMenu";
import SelectionMenu from "./SelectionMenu/SelectionMenu";
import SelectionFrame from "./SelectionFrame/SelectionFrame";
import ExportModal from "./ExportModal/ExportModal";
import ImageDragNDrop from "./ImageDragNDrop/ImageDragNDrop";
// import ChrisDrunk from './ChrisDrunk.jpg'; 
import Washington from './Washington.jpeg';
import Monument from './Washington_Monument.jpeg';

const JUMP_TO_LINE_TOLERANZ = 4;

class Creator extends Component {

  state = {
    dragging: false, 
    draggingFile: false, 
    selectedId: null,
    editingId: null, 
    selectedHline: null,
    selectedVline: null,
    exportModalOpen: false,
    files: [], 
    perspective: {
      offsetX: 200,
      offsetY: 200
    },
    elements: [
      // {
      //   type: 'text', 
      //   elementId: '5',
      //   height: 170,
      //   width: 570, 
      //   posX: 15,
      //   posY: 15,
      //   text: 'Y\'all ever notice that the Washington monument looks absolutely NOTHING like George Washington?',
      //   font: 'Oswald',
      //   fontSize: '28.5',
      //   fontWeight: '700',
      //   textAlign: 'center',
      //   verticalAlign: 'top', 
      //   fixedDimensions: true,
      //   underline: false, 
      //   italic: false, 
      //   textStroke: true,
      //   rotation: 0,
      // },
      // {
      //   type: 'rect',
      //   elementId: '8',
      //   posX: 0,
      //   posY: 0,
      //   height: 200,
      //   width: 600,
      //   color: '#000000',
      //   rotation: 0,
      // },
      // {
      //   type: 'image',
      //   elementId: '11',
      //   imgSrc: Washington,
      //   posX: 0,
      //   posY: 200,
      //   height: 365,
      //   width: 300,
      //   rotation: 0,
      // },
      // {
      //   type: 'image',
      //   elementId: '12',
      //   imgSrc: Monument,
      //   posX: 300,
      //   posY: 200,
      //   height: 365,
      //   width: 300,
      //   rotation: 0,
      // }

      {
        type: 'rect',
        elementId: '9',
        posX: 0,
        posY: 0,
        height: 200,
        width: 200,
        color: '#000234',
        rotation: 90,
      },
      {
        type: 'rect',
        elementId: '8',
        posX: 0,
        posY: 0,
        height: 200,
        width: 200,
        color: '#000000',
        rotation: 0,
      },
    ],
  }


  /// SELECT /////////////////////////////////////////////////

  select = (e, elementId) => {
    e.stopPropagation();
    e.preventDefault();
    if(this.state.editingId){
      const element = document.getElementById(`${this.state.editingId}-input`);
      element.blur();
    }
    this.setState({
      selectedId: elementId, 
      editingId: null
    })
  }

  selectAndEdit = (e, elementId) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selectedId: elementId,
      editingId: elementId
    })
    const element = document.getElementById(`${elementId}-input`);
    setTimeout(() => {
      console.log("focusing")
      element.focus();
    }, 0); 
  }

  backgroundMouseUp = (e) => {
    if(!this.state.dragging){
      if(this.state.editingId){
        const element = document.getElementById(`${this.state.editingId}-input`);
        element.blur();
        this.setState({ editingId: null, draggingFile: false })
      }else{
        this.setState({
          selectedId: null, draggingFile: false 
        });
      }
    }
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
      let newX = prevX - prevMouseX + e.clientX;
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
        selectedVline: null,
        dragging: false
      })
    }

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
    this.setState({
      selectedId: elementId,
      dragging: true, 
    })
  }

  onTextInput = (e, elementId) => {
    const selectionOffsetBefore = window.getSelection().focusOffset;
    let elementsNew = this.state.elements.filter(e => e.elementId !== elementId);
    const element = this.state.elements.find(e => e.elementId === elementId);
    let elem = document.getElementById(`${elementId}-input`);
    console.log(elem.offsetHeight, element.height)
    let newHeight = element.fixedDimensions ? element.height : elem.offsetHeight; 
    this.setState({
      elements: [
        ...elementsNew,
        {
          ...element,
          height: newHeight,
          text: e.target.textContent
        }
      ]
    }, () => {
      let range = document.createRange(); 
      let selection = window.getSelection();
      if(!element.fixedDimensions){
        if(elem.childNodes.length > 0){
          range.setStart(elem.childNodes[0], selectionOffsetBefore); 
          range.collapse(true); 
          selection.removeAllRanges(); 
          selection.addRange(range); 
          elem.focus(); 
        }
      } else {
        if(elem.childNodes.length > 0 && elem.childNodes[0].childNodes.length > 0){
          range.setStart(elem.childNodes[0].childNodes[0], selectionOffsetBefore); 
          range.collapse(true); 
          selection.removeAllRanges(); 
          selection.addRange(range); 
          elem.focus(); 
        }
      }
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

  addElements = (elements) => {
    this.setState({
      elements: [...this.state.elements, ...elements],
      selectedId: elements[elements.length-1].elementId,
    })
  }

  handleImageDrop = (files) => {
    let fileList = this.state.files
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return
      fileList.push(files[i].name)
      console.log(files[i]); 
    }
    this.setState({files: fileList})
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
        let newFontSize = element.fontSize;

        const diffWidth = e.clientX - mouseStartX;
        const diffHeight = e.clientY - mouseStartY;

        const { Hlines, Vlines } = this.getLines(elementId);
        let selectedHline = null;
        let selectedVline = null; 

        let fixedAspectRatio = element.type === 'image'; 
        if(e.shiftKey) fixedAspectRatio = !fixedAspectRatio; 

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
                newHeight = fixedAspectRatio ? newWidth / aspectRatio : newHeight + diffHeight; 
                Vlines.forEach(l => {
                  if(Math.abs(newX + newWidth - l) < JUMP_TO_LINE_TOLERANZ){
                    newWidth = l - prevX;
                    selectedVline = l;
                  }  
                });
                Hlines.forEach(l => {
                  if(Math.abs(newY + newHeight - l) < JUMP_TO_LINE_TOLERANZ){
                    newHeight = l - prevY;
                    selectedHline = l;
                  }  
                });
                break; 
            case 'NE':
                newWidth += diffWidth; 
                newHeight = fixedAspectRatio ? newWidth / aspectRatio : newHeight - diffHeight;
                newY += prevHeight - newHeight; 
                Hlines.forEach(l => {
                  if(Math.abs(l-newY) < JUMP_TO_LINE_TOLERANZ){
                    newHeight = prevY + prevHeight - l;
                    newY = l;
                    selectedHline = l;
                  }  
                });
                Vlines.forEach(l => {
                  if(Math.abs(newX + newWidth - l) < JUMP_TO_LINE_TOLERANZ){
                    newWidth = l - prevX;
                    selectedVline = l;
                  }  
                });
                break; 
            case 'SW':
                newWidth -= diffWidth; 
                newHeight = fixedAspectRatio ? newWidth / aspectRatio : newHeight + diffHeight; 
                newX += prevWidth - newWidth; 
                Hlines.forEach(l => {
                  if(Math.abs(newY + newHeight - l) < JUMP_TO_LINE_TOLERANZ){
                    newHeight = l - prevY;
                    selectedHline = l;
                  }  
                });
                Vlines.forEach(l => {
                  if(Math.abs(l-newX) < JUMP_TO_LINE_TOLERANZ){
                    newWidth = prevX + prevWidth - l;
                    newX = l;
                    selectedVline = l;
                  }  
                });
                break;
            case 'NW':
                newWidth -= diffWidth; 
                newHeight = fixedAspectRatio ? newWidth / aspectRatio : newHeight - diffHeight;
                newX += prevWidth - newWidth; 
                newY += prevHeight - newHeight; 
                Hlines.forEach(l => {
                  if(Math.abs(l-newY) < JUMP_TO_LINE_TOLERANZ){
                    newHeight = prevY + prevHeight - l;
                    newY = l;
                    selectedHline = l;
                  }  
                });
                Vlines.forEach(l => {
                  if(Math.abs(l-newX) < JUMP_TO_LINE_TOLERANZ){
                    newWidth = prevX + prevWidth - l;
                    newX = l;
                    selectedVline = l;
                  }  
                });
                break; 
            default: console.log('Invalid dir', dir)
        }

        if(element.type === 'text'){
          const elem = document.getElementById(`${elementId}-input`);
          if(!element.fixedDimensions){
            newHeight = elem.offsetHeight;
          } else {
            if(elem.offsetHeight > newHeight){
              newFontSize = element.fontSize - 2; 
            }
          }
        }

        let elementsNew = this.state.elements.map(E => {
          if(E.elementId === elementId){
            return {
              ...element,
                width: newWidth, 
                height: newHeight,
                posX: newX,
                posY: newY,
                fontSize: newFontSize
            }
          }else{
            return E
          }
        });
        this.setState({
          dragging: true,
          elements: elementsNew,
          selectedHline: selectedHline,
          selectedVline: selectedVline,
        });
    }
    const mouseup = (e) => {
      console.log("RESIZE MOUSE UP");
      e.preventDefault();
      e.stopPropagation(); 
      window.removeEventListener('mousemove', resizeMouseMouve);
      window.removeEventListener('mouseup', mouseup);
      this.setState({
        selectedHline: null, 
        selectedVline: null,
        dragging: false
      })
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
    this.setState({ elements: newElements, editingId: null })
  }

  /// EXPORT /////////////////////////////////////// 

  closeExportModal = () => {
    this.setState({exportModalOpen: false})
  }

  openExportModal = () => {
    this.setState({exportModalOpen: true})
  }
  
  /// RENDER /////////////////////////////////////////////////

  getElements = (elements, inPreview, onImgeLoad) => {

    // TODO: redo/replace this with real orders and z-index
    const orderedElements = [
      ...elements.filter(e => e.type !== 'text'),
      ...elements.filter(e => e.type === 'text')
    ]

    return orderedElements.map(e => {
      // const highlight = this.state.dragging && this.state.
      switch(e.type){
        case 'text': 
          return(
            <Element 
              inPreview={inPreview}
              currentlyEditing={this.state.editingId === e.elementId}
              type='text'
              key={`${inPreview ? 'prev' : ''}-${e.elementId}`}
              element={e}
              editingId={this.state.editingId}
              selected={e.elementId === this.state.selectedId}
              perspective={this.state.perspective}
              edit={this.edit}
              select={this.select}
              selectAndEdit={this.selectAndEdit}
              elementMouseDown={this.elementMouseDown}
              onTextInput={this.onTextInput}
              selectedLines={{h: this.state.selectedHline, v: this.state.selectedVline}}
            />
          ) 
        case 'rect': 
            return(
              <Element 
                inPreview={inPreview}
                currentlyEditing={this.state.editingId === e.elementId}
                type='rect'
                key={`${inPreview ? 'prev' : ''}-${e.elementId}`}
                element={e}
                selected={e.elementId === this.state.selectedId}
                perspective={this.state.perspective}
                select={this.select}
                elementMouseDown={this.elementMouseDown}
                selectedLines={{h: this.state.selectedHline, v: this.state.selectedVline}}
              />
            )
        case 'image': 
          return(
            <Element 
              inPreview={inPreview}
              currentlyEditing={this.state.editingId === e.elementId}
              type='image'
              key={`${inPreview ? 'prev' : ''}-${e.elementId}`}
              element={e}
              selected={e.elementId === this.state.selectedId}
              perspective={this.state.perspective}
              select={this.select}
              elementMouseDown={this.elementMouseDown}
              onImageLoad={onImgeLoad}
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
        const { posY, posX, height, width, rotation } = element;
        const centerX = posX + 0.5 * width;
        const centerY = posY + 0.5 * height;

        const distanceCenterCorner = Math.sqrt((height/2) ** 2 + (width/2) ** 2);

        console.log("DISTANCE CENTER CORNER", distanceCenterCorner);

        const degAtRotZero = Math.atan(height / width) * 180 / Math.PI;
        

        const cos = Math.cos((rotation+degAtRotZero) * (Math.PI / 180));
        const sin = Math.sin((rotation+degAtRotZero) * (Math.PI / 180));

        const round = num => Math.floor(num * 1000) / 1000;

        // Hlines.push(round(centerX + distanceCenterCorner * cos));
        // Hlines.push(round(centerX - distanceCenterCorner * cos));
        // Hlines.push(round(centerX));

        Vlines.push(round(centerY + distanceCenterCorner * sin));
        Vlines.push(round(centerY - distanceCenterCorner * sin));
        Vlines.push(round(centerY));

        console.log("CENTER: ", centerX, centerY)
        console.log("HLINES: ", Hlines.map(line => line - centerX));
        console.log("VLINES: ", Vlines.map(line => line - centerY));


        // Hlines.push(element.posY)
        // Hlines.push((2 * (element.posY) + element.height)/2)
        // Hlines.push(element.posY + element.height)

        // Vlines.push(element.posX)
        // Vlines.push((2* (element.posX + element.width))/2)
        // Vlines.push(element.posX + element.width)
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
    let lines = [];
    if(this.state.selectedHline){
      lines.push(
        <Line 
          key={`HL-${this.state.selectedHline}`} 
          top={this.state.selectedHline} 
          left={0}
          perspective={this.state.perspective}
        />
      )
    }
    if(this.state.selectedVline){
      lines.push(
        <Line 
          key={`VL-${this.state.selectedVline}`} 
          top={0} 
          left={this.state.selectedVline}
          perspective={this.state.perspective}
        />
      )
    }
    return lines; 
  }

  // two finger touch on trackpad 
  wheel = (e) => {
    e.stopPropagation()
    if(e.ctrlKey && e.deltaY !== 0){
      console.log("ZOOM", e.deltaY < 0 ? "IN":"OUT", "DETECTED", e.deltaY)
    } else {
      // move the entire canvas in any direction 
      let offsetXNew = this.state.perspective.offsetX - e.deltaX;
      let offsetYNew = this.state.perspective.offsetY - e.deltaY;
      if(offsetXNew > 50000 || offsetXNew < -50000) offsetXNew = this.state.perspective.offsetX;
      if(offsetYNew > 50000 || offsetYNew < -50000) offsetYNew = this.state.perspective.offsetY;
      this.setState({
        perspective: {
          offsetX: offsetXNew,
          offsetY: offsetYNew
        }
      })
    }
  }

  calcOriginStyles = () => {
    let styles = {
      left: `${this.state.perspective.offsetX}px`, 
      top: `${this.state.perspective.offsetY}px`,
      position: "absolute",
      height: "5px",
      width: "5px",
      backgroundColor: "red",
      zIndex: 10000
    }
    return styles
  }

  calcGridStyles = () => {
    const { offsetX, offsetY } = this.state.perspective;
    let styles = {
      position: "absolute",
      left: `${-50000 + offsetX}px`,
      top: `${-50000 + offsetY}px`,
      height: `${104000}px`,
      width: `${104000}px`,
    }
    return styles
  }


  render() {
    const styleClasses = [classes.Creator];
    if (this.props.currentTab === 'stream') styleClasses.push(classes.OutLeftLeft);
    if (this.props.currentTab === 'chat') styleClasses.push(classes.OutLeft);
    const selected = this.state.elements.find(e => e.elementId === this.state.selectedId);
    return (
      <div 
        className={styleClasses.join(" ")}
        onTouchStart={e => console.log("TOUCH START")}
        onTouchEnd={e => console.log("TOUCH END")}
        onWheel={this.wheel}
      >
        <ImageDragNDrop handleDrop={this.handleImageDrop}>
          <TopMenu 
            addElements={this.addElements}
            openExportModal={this.openExportModal}
          />
          { 
            this.state.exportModalOpen && 
              <ExportModal 
                closeExportModal={this.closeExportModal}
                getElements={this.getElements}
                elements={this.state.elements}
              /> 
          }
          <div className={classes.canvas}>
            {
              selected && 
                <SelectionFrame 
                  element={selected}
                  editingId={this.state.editingId}
                  perspective={this.state.perspective}
                  resizeMouseDown={this.resizeMouseDown}
                  elementMouseDown={this.elementMouseDown}
                  selectAndEdit={this.selectAndEdit}
                /> 
            }
            { this.getElements(this.state.elements) }
            {/* {
              this.state.draggingFile && 
              <div className={classes.draggingOverlay}>Drop Images Here</div>
            } */}
            <div 
              onMouseUp={this.backgroundMouseUp}
              className={classes.grid} 
              style={this.calcGridStyles()}
            ></div>
            { this.renderLines() }
          </div>
          {/* <div className={classes.origin} style={this.calcOriginStyles()}></div> */}
          <SelectionMenu
            edit={this.edit}
            selected={selected}
          /> 
        </ImageDragNDrop>
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
