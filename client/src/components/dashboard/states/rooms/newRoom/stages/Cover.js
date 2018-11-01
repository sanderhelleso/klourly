import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import NextStage from '../NextStage';

const staticTxt = {
    uploadBtn: 'Browse',
    hint: 'Default cover image will be selected if no other image is uploaded'
}

export default class Cover extends Component {
    constructor(props) {
        super(props);

        this.setCoverPreview = this.setCoverPreview.bind(this);
        this.displayCoverFileName = this.displayCoverFileName.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);

        this.state = {
            cover: null,
            message: 'Finish and create room'
        }
    }

    setCoverPreview() {
        return this.state.cover ? this.state.cover[0].preview : '../img/dashboard/cover.jpg';
    }

    displayCoverFileName() {
        const file = this.state.cover;
        const FILE_NAME =
        <div className="animated fadeIn">
            <h5 id="new-room-cover-file-name">{file === null ? '' : file[0].name}</h5>
        </div>

        return this.state.cover === null ? null : FILE_NAME;
    }

    onDrop(file) {
        this.setState({
            cover: file
        });
        document.querySelector('#new-room-cover-upload').className = 'col s6';
    }

    onDragEnter(e) {
        const ele = e.target;
        ele.id === 'new-room-cover-upload' ? ele.className = 'col s12 dropzone-active' : null;
    }

    onDragLeave() {
        document.querySelector('#new-room-cover-upload').className = 'col s12';
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
                    accept="image/jpeg, image/png"
                    multiple={false}
                    >
                        <h4>Drag files here</h4>
                        <h5>or</h5>
                        <button id="new-room-cover-browse" className="waves-effect waves-light btn animated fadeIn">{staticTxt.uploadBtn}</button>
                    </Dropzone>
                </div>
                <div id="cover-preview" className="col s6">
                    <img src={this.setCoverPreview()} alt={this.displayCoverFileName()} className="z-depth-2" />
                </div>
                <div id="finish-room-creation-cont" className="col s12">
                    <NextStage 
                    message={this.state.message} 
                    valid={true} 
                    data={{cover: this.state.cover}}
                    />
                    <p>{staticTxt.hint}</p>
                </div>
            </div>
        )
  }
}