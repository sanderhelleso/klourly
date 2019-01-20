import React, { Component } from 'react';
import styled from 'styled-components';
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
            <div className="col l12">
                <StyledDropZone className="col l5">
                    <Dropzone 
                        id="drop-zone"
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
                        <a className="waves-effect waves-light btn animated fadeIn">
                            {staticTxt.uploadBtn}
                        </a>
                    </Dropzone>
                </StyledDropZone>
                <div className="col l6 offset-l1">
                    <p>qweqw</p>
                </div>
            </div>
        )
    }
}

const StyledDropZone = styled.div`

    #drop-zone {

        border: 3px dashed #bdbdbd !important;
        border-radius: 12px !important;
        text-align: center !important;
        padding: 2.5rem 2rem !important;
        min-height: 17.5rem;
        min-width: 100% !important;
        color: #bdbdbd !important;
        letter-spacing: 2px !important;
        transition: 0.5s ease-in-out !important;

        h4 {
            font-size: 1.5rem;
            text-transform: uppercase;
            font-weight: 600;
            pointer-events: none;
        }

        h5 {
            font-weight: 100;
            pointer-events: none;
        }

        a {
            margin: 1rem;
            font-size: 1rem;
            background: #A770EF;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #FDB99B, #CF8BF3, #A770EF);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #FDB99B, #CF8BF3, #A770EF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            border: none;
            line-height: 0;
            min-width: 225px;
            padding: 1.5rem;
            box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        }

        #new-room-cover-input {
            display: none;
        }

        .dropzone-active {
            border: 3px dashed #7c4dff !important;
            box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        }
    }
`;
