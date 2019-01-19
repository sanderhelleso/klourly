import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Trash2 } from 'react-feather';

import NextStage from '../NextStage';
import { notification } from '../../../helpers/notification';

const staticTxt = {
    uploadBtn: 'Browse',
    hint: 'Default cover image will be selected if no other image is uploaded',
    uploadError: 'Invalid file or image is to large! Maximum file upload size is 1024KB'
}

export default class Cover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cover: null,
            default: true,
            previewClassname: 'new-room-cover-default z-depth-2',
            message: 'Finish and create room'
        }

    }

    setCoverPreview = () => {
        return this.state.cover ? this.state.cover[0].preview : 'https://tinyurl.com/ya5kcp2h';
    }

    removeCoverPreview() {
        this.setState({
            cover: null,
            default: true,
            previewClassname: 'new-room-cover-default z-depth-2',
        })
    }

    onDrop = file => {

        if(Array.isArray(file) && file.length) {
            this.setState({
                cover: file,
                default: false,
                previewClassname: 'new-room-cover z-depth-2',
            });
        }

        document.querySelector('#new-room-cover-upload').className = 'col s6';
    }

    onDragEnter = e => {
        const ele = e.target;
        ele.id === 'new-room-cover-upload' ? ele.className = 'col s12 dropzone-active' : null;
    }

    onDragLeave = () => {
        document.querySelector('#new-room-cover-upload').className = 'col s12';
    }

    onDropRejected = () => {
        notification.invalidFileUpload(staticTxt.uploadError);
    }

    render() {
        return (
            <div className="row col s12">
                <div className="col s6">
                    <Dropzone 
                        id="new-room-cover-upload" 
                        onDrop={this.onDrop} 
                        onDragEnter={(event) => this.onDragEnter(event)} 
                        onDragLeave={this.onDragLeave} 
                        onDropRejected={this.onDropRejected}
                        accept="image/jpeg, image/png"
                        maxSize={524288 * 2}
                        multiple={false}
                    >
                        <h4>Drag files here</h4>
                        <h5>or</h5>
                        <button 
                            id="new-room-cover-browse"
                            className="waves-effect waves-light btn animated fadeIn"
                        >
                            {staticTxt.uploadBtn}
                        </button>
                    </Dropzone>
                </div>
                <div id="cover-preview" className={this.state.previewClassname}>
                    <img
                    src={this.setCoverPreview()}
                    />
                    <div className="overlay" onClick={this.removeCoverPreview}>
                        <div className="cover-preview-text">
                            <Trash2 size={48} />
                            <br />
                            <span>REMOVE</span>
                        </div>
                    </div>
                </div>
                <div id="finish-room-creation-cont" className="col s12">
                    <NextStage 
                    message={this.state.message} 
                    valid={true} 
                    data={{cover: this.state.cover ? this.state.cover : 'https://tinyurl.com/ya5kcp2h'}}
                    />
                    <p>{staticTxt.hint}</p>
                </div>
            </div>
        )
  }
}
