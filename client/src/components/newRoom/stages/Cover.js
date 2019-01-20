import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import { notification } from '../../../helpers/notification';

import CoverPreview from '../CoverPreview';
import NextStage from '../NextStage';

class Cover extends Component {
    constructor(props) {
        super(props);
    }

    onDrop = file => (Array.isArray(file) && file.length) ? this.props.nextStageAction({ cover: file[0].preview }) : null;

    onDragEnter = e => e.target.id === 'drop-zone' ? e.target.className = 'col s12 dropzone-active' : null;

    onDragLeave = e => e.target.className = '';

    onDropRejected = () => notification.error('Invalid file type! Only images of type PNG and JPEG are allowed');


    render() {
        return (
            <StlyedCoverCont className="col l12">
                <StyledDropZone className="col l6">
                    <Dropzone 
                        id="drop-zone"
                        onDrop={this.onDrop} 
                        onDragEnter={this.onDragEnter} 
                        onDragLeave={this.onDragLeave} 
                        onDropRejected={this.onDropRejected}
                        accept="image/jpeg, image/png"
                        multiple={false}
                    >
                        <h4>Drag files here</h4>
                        <h5>or</h5>
                        <a className="waves-effect waves-light btn animated fadeIn">
                            Browse
                        </a>
                    </Dropzone>
                </StyledDropZone>
                <div className="col l6">
                    <CoverPreview />
                </div>
                <div className="col s12">
                    <p>Default cover image will be selected if no other image is uploaded</p>
                    <NextStage
                        message={this.props.message}
                        valid={true}
                    />
                </div>
            </StlyedCoverCont>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(Cover);



const StlyedCoverCont = styled.div`
    margin-top: 4rem;
    text-align: center;

    p {
        margin: 2rem auto 5rem auto;
        color: #9e9e9e;
        font-size: 0.8rem;
    }
`;

const StyledDropZone = styled.div`

    #drop-zone {

        height: 300px !important;
        width: 100% !important;
        border: 2px dashed #bdbdbd !important;
        border-radius: 0px !important;
        text-align: center !important;
        padding: 3rem 2rem !important;
        color: #bdbdbd !important;
        letter-spacing: 2px !important;
        transition: 0.5s ease-in-out !important;

        h4 {
            font-size: 1.5rem;
            text-transform: uppercase;
            font-weight: 600;
            pointer-events: none;
            margin-top: 2.5rem;
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
