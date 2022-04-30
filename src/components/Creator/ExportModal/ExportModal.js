import React, { Component } from 'react';

import classes from './ExportModal.module.css';

import * as htmlToImage from 'html-to-image';

class ExportModal extends Component {

    state={
        pngUrl: null, 
        rendered: false,
    }

    componentDidMount = () => {
        const node = document.getElementById('preview');
        console.log("COMPONENT DID MOUNT ")
        htmlToImage.toPng(node)
        .then(dataUrl => {
            console.log("SETTING URL")
            this.setState({pngUrl: dataUrl}) 
        }).catch(err => {
            console.log("SETTING URL ERROR")

            console.log(err);
        })
    }

    componentDidUpdate = () => {
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


        return(
            <div className={classes.ExportModal}>
                <div className={classes.Background} onClick={this.props.closeExportModal}></div>
                <div className={classes.Modal}>
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
                        <a href={this.state.pngUrl} download>download png</a>
                        <p>left { leftBorder }</p>
                        <p>right { rightBorder }</p>
                        <p>top { topBorder }</p>
                        <p>bottom { bottomBorder }</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExportModal;