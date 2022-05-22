import React, { Component } from 'react';

import classes from './ExportModal.module.css';

import * as htmlToImage from 'html-to-image';

import Element from '../Element/Element';
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
import Loader from 'react-loader-spinner'; 
import { Link } from 'react-router-dom';


class ExportModal extends Component {

    state={
        height: 0,
        width: 0, 
        downloadFormat: 'jpg', // jpg, png, svg
        linkRef: React.createRef(), 
        imagesLoaded: 0, 
        imageCreationStarted: false, 
        downloadLoading: false,
    }

    componentDidMount = () => {
        const height = this.divElement.clientHeight;
        const width = this.divElement.clientWidth;
        console.log(height, width);
        this.setState({ height, width });
    }

    componentDidUpdate = () => {
        const height = this.divElement.clientHeight;
        const width = this.divElement.clientWidth;
        if(height !== this.state.height || width !== this.state.width){
            this.setState({ height, width });
        }
    }

    calcContentMetrics = () => {
        let leftBorder = 10000000000;
        let rightBorder = -10000000000;
        let topBorder = 10000000000;
        let bottomBorder = -10000000000;
        
        this.props.elements.forEach(element => {
            if(element.posX < leftBorder) leftBorder =  element.posX;
            if(element.posX + element.width > rightBorder) rightBorder =  element.posX + element.width;
            if(element.posY < topBorder) topBorder =  element.posY;
            if(element.posY + element.height > bottomBorder) bottomBorder =  element.posY + element.height;
        })
        return {
            leftBorder,
            rightBorder,
            topBorder, 
            bottomBorder,
            contentWidth: rightBorder-leftBorder,
            contentHeight: bottomBorder-topBorder,
        };
    }

    setDownloadFormat = (e) => {
        console.log(e.target.value);
        this.setState({downloadFormat: e.target.value});
    }

    onDownLoad = () => {
            const node = document.getElementById('preview');
            this.setState({downloadStarted: true}); 
            //png
            if(this.state.downloadFormat === "png"){
                htmlToImage.toPng(node)
                .then(dataUrl => {
                    const link = document.createElement('a');
                    link.setAttribute('download',`FileName.${this.state.downloadFormat}`);
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    if(link && link.parentNode){
                        link.parentNode.removeChild(link);
                    }
                    this.props.closeExportModal(); 
                }).catch(err => {
                    console.log("png downloadError")
                    console.log(err);
                })
            }
    
            // jpg
            if(this.state.downloadFormat === "jpg"){
                htmlToImage.toJpeg(node)
                .then(dataUrl => {
                    const link = document.createElement('a');
                    link.setAttribute('download',`FileName.${this.state.downloadFormat}`);
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    if(link && link.parentNode){
                        link.parentNode.removeChild(link);
                    }
                    this.props.closeExportModal(); 
                }).catch(err => {
                    console.log("SETTING URL ERROR")
                    console.log(err);
                })
            }
    
            // svg
            if(this.state.downloadFormat === "png"){
                htmlToImage.toSvg(node)
                .then(dataUrl => {
                    const link = document.createElement('a');
                    link.setAttribute('download',`FileName.${this.state.downloadFormat}`);
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    if(link && link.parentNode){
                        link.parentNode.removeChild(link);
                    }
                    this.props.closeExportModal(); 
                }).catch(err => {
                    console.log("SETTING URL ERROR")
                })
            }
    }

    getElements = (elements) => {

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
                        inPreview
                        type='text'
                        key={`prev-${e.elementId}`}
                        element={e}
                        />
                    ) 
                case 'rect': 
                    return(
                        <Element 
                            inPreview
                            type='rect'
                            key={`prev-${e.elementId}`}
                            element={e}
                        />
                    )
                case 'image': 
                    return(
                        <Element 
                        inPreview
                        type='image'
                        key={`prev-${e.elementId}`}
                        element={e}
                        />
                    )
                default: console.log('Invalid Element Type!'); return null; 
            }
        })
    }

    render(){
        const {
            leftBorder,
            rightBorder,
            topBorder, 
            bottomBorder,
            contentWidth,
            contentHeight
        } = this.calcContentMetrics();

        const aspectRatioContainer = this.state.width/this.state.height;
        const aspectRatioContent = contentWidth/contentHeight; 

        let previewStyles = {
            height: contentHeight,
            width: contentWidth
        };
        
        if(aspectRatioContent < aspectRatioContainer) {
            const scaleFactorY = this.state.height / contentHeight; 
            if(contentHeight > this.state.height){
                previewStyles.zoom = scaleFactorY; 
            }
        } else {
            const scaleFactorX =  this.state.width / contentWidth 
            if(contentWidth > this.state.width){
                previewStyles.zoom = scaleFactorX; 
            }
        }

        const transformedElements = this.props.elements.map(element => {
            return {
                ...element,
                posX: element.posX - leftBorder,
                posY: element.posY - topBorder,
            }
        })


        return(
            <div className={classes.ExportModal}>
                <div className={classes.Background} onClick={this.props.closeExportModal}></div>
                <div className={classes.Modal}>
                    <div id="previewContainer" className={classes.PreviewContainer} ref={ (divElement) => { this.divElement = divElement } }>
                        <div 
                            className={classes.Preveiw} 
                            style={previewStyles}
                            >
                                <div id="preview" className={classes.DownloadWrapper}>
                                    {
                                        this.getElements(transformedElements)
                                    }
                                </div>
                        </div>
                    </div>
                    <div className={classes.DownloadOptions}>
                        <div className={classes.DownloadContainer}>
                            <select onChange={this.setDownloadFormat} value={this.state.downloadFormat}>
                                <option value="png" label="png"/>
                                <option value="jpg" label="jpg"/>
                                <option value="svg" label="svg"/>
                            </select>
                            <PrimaryButton clicked={this.onDownLoad} disabled={this.state.downloadLoading}>
                                {
                                    !this.state.downloadLoading
                                    ? <h3>Download</h3> 
                                    :  <Loader 
                                        className={classes.Spinner} 
                                        type="ThreeDots" 
                                        color="#FFFFFF" 
                                        height={30} 
                                        width={30}/>
                                }
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExportModal;