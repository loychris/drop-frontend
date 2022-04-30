import React, { Component } from 'react';

import classes from './ExportModal.module.css';

class ExportModal extends Component {

    render(){
        return(
            <div className={classes.ExportModal}>
                <div className={classes.Background} onClick={this.props.closeExportModal}></div>
                <div className={classes.PreviewContainer}>
                    <button onClick={this.props.jpgDownload}>download png</button>
                </div>
            </div>
        )
    }
}

export default ExportModal;