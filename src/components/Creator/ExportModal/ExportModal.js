import React, { Component } from 'react';

import classes from './ExportModal.module.css';

import * as htmlToImage from 'html-to-image';

import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';


class ExportModal extends Component {

    state={
        pngUrl: null, 
        jpgUrl: null,
        svgUrl: null,
        rendered: false,
        downloadFormat: 'jpg',
        linkRef: React.createRef(), 
    }

    componentDidMount = () => {

        const node = document.getElementById('preview');
        console.log("COMPONENT DID MOUNT ")


        //png
        htmlToImage.toPng(node)
        .then(dataUrl => {
            this.setState({pngUrl: dataUrl}) 
        }).catch(err => {
            console.log("SETTING URL ERROR")

            console.log(err);
        })

        // jpg
        htmlToImage.toJpeg(node)
        .then(dataUrl => {
            this.setState({jpgUrl: dataUrl}) 
        }).catch(err => {
            console.log("SETTING URL ERROR")

            console.log(err);
        })

        // svg
        htmlToImage.toSvg(node)
        .then(dataUrl => {
            this.setState({svgUrl: dataUrl}) 
        }).catch(err => {
            console.log("SETTING URL ERROR")
        })
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

    getDownloadLink = () => {
        const downloadUrl = 
            this.state.downloadFormat === 'jpg' ? this.state.jpgUrl : 
            this.state.downloadFormat === 'png' ? this.state.pngUrl : 
            this.state.downloadFormat === 'svg' ? this.state.svgUrl : null
        return (
            <a 
                href={downloadUrl} 
                download 
                id="downloadLink" 
                style={{display: "none"}} 
                ref={this.state.linkRef}
            />
        )
    }

    download = () => {
        const link = document.createElement('a');
        console.log(this.state.downloadFormat)
        link.setAttribute('download',`FileName.${this.state.downloadFormat}`);
        if(this.state.downloadFormat === 'jpg' && this.state.jpgUrl){
            link.href = this.state.jpgUrl;
        }
        if(this.state.downloadFormat === 'png' && this.state.pngUrl){
            link.href = this.state.pngUrl;
        }
        if(this.state.downloadFormat === 'svg' && this.state.svgUrl){
            link.href = this.state.svgUrl;
        }
        if(link.href){
            document.body.appendChild(link);
            link.click();
        }
        if(link && link.parentNode){
            link.parentNode.removeChild(link);
        }else{
            console.log(link);
        }
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

        const scaleFactor = 600 / contentWidth 
        const previewStyles = contentWidth > 600 ? {
            zoom: scaleFactor,
            height: contentHeight
            // transform: `translate(${-leftBorder}px,${-topBorder}px)`,
        } : {
            width: contentWidth,
            height: contentHeight
        }

        const transformedElements = this.props.elements.map(element => {
            return {
                ...element,
                posX: element.posX - leftBorder,
                posY: element.posY - topBorder,
            }
        })

        const modalStyles = {
            
        }

        return(
            <div className={classes.ExportModal}>
                <div className={classes.Background} onClick={this.props.closeExportModal}></div>
                <div className={classes.Modal} style={modalStyles}>
                    <div className={classes.PreviewContainer}>
                        <div 
                            className={classes.Preveiw} 
                            style={previewStyles}
                            >
                                <div id="preview" className={classes.DownloadWrapper}>
                                    {
                                        this.props.getElements(transformedElements, true)
                                    }
                                </div>
                        </div>
                    </div>
                    <div className={classes.DownloadOptions}>
                        <select onChange={this.setDownloadFormat} value={this.state.downloadFormat}>
                            <option value="png" label="png"/>
                            <option value="jpg" label="jpg"/>
                            <option value="svg" label="svg"/>
                        </select>
                        <PrimaryButton clicked={this.download}>
                            <h2>Download</h2> 
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExportModal;