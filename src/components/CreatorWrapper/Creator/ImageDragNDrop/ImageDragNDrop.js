import React, { Component } from 'react'
// import classes from './ImageDragNDrop.module.css'; 

class ImageDragNDrop extends Component {
  state = {
    drag: false,
    dragging: false
  }
  dropRef = React.createRef()

  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("drag in"); 
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("drag out"); 
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({drag: false})
    }
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    console.log(e)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
      this.dragCounter = 0;     
    }
  }
  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('drop', this.handleDrop)
  }
  render() {
    return (
      <div
        style={{display: 'inline-block', position: 'relative', height: "100%", width: "100%"}}
        ref={this.dropRef}
      >
        {this.state.dragging &&
          <div 
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              zIndex: 9999, 
              height: "100%", 
              width: "100%",
              opacity: 0.5,
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36
              }}
            >
              <div>drop here</div>
            </div>
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}
export default ImageDragNDrop