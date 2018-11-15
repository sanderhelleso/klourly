import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import { Trash2 } from 'react-feather';

import { notification } from '../../../helpers/notification';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const staticTxt = {
    heading: 'Cover',
    description: 'The purpose of the room describes what kind of room purpose the room serves and allows users to more easily understand the content of the room.', 
    hint: 'Default cover image will be selected if no other image is uploaded',
    uploadError: 'Invalid file or image is to large! Maximum file upload size is 1024KB'
}


class Cover extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            originalCover: props.state.room.activeRoom.cover,
            cover: null
        }

        this.removeCoverPreview = this.removeCoverPreview.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
    }

    setCoverPreview() {

        if (!this.state.cover) {
            return this.state.originalCover;
        }

        else {
            return this.state.cover[0].preview;
        }
    }

    removeCoverPreview() {
        this.setState({
            cover: null,
            previewClassname: 'new-room-cover-default z-depth-2',
        })
    }


    onDrop(file) {
        if(Array.isArray(file) && file.length) {
            this.setState({
                cover: file,
                default: false,
                previewClassname: 'new-room-cover z-depth-2',
            });
        }

        document.querySelector('#new-room-cover-upload').className = 'col s6';
    }

    onDragEnter(e) {
        const ele = e.target;
        ele.id === 'new-room-cover-upload' ? ele.className = 'col s12 dropzone-active' : null;
    }

    onDragLeave() {
        document.querySelector('#new-room-cover-upload').className = 'col s12';
    }

    onDropRejected() {
        notification.invalidFileUpload(staticTxt.uploadError);
    }

    renderCover() {
        return (
            <div className="col s12 m12 l12 room-settings-col">
                <h5>{staticTxt.heading}</h5>
                <p className="settings-description">{staticTxt.description}</p>
                <div className="row">
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
                            Browse
                            </button>
                        </Dropzone>
                    </div>
                    <div id="cover-preview" className={this.state.previewClassname}>
                        <img
                        src={this.setCoverPreview()}
                        alt="Cover Image Preview"
                        />
                        <div className="overlay" onClick={this.removeCoverPreview}>
                            <div className="cover-preview-text">
                                <Trash2 size={48} />
                                <br />
                                <span>REMOVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }

    render() {
        return this.renderCover();
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cover);