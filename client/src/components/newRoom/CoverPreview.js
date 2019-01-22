import React, { Component } from 'react';
import styled from 'styled-components';
import { Trash2 } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../actions/newRoom/nextStageAction';
import { notification } from '../../helpers/notification';


class CoverPreview extends Component {
    constructor(props) {
        super(props);
    }

    removeCover = () =>{
        this.props.nextStageAction({ cover: false });
        notification.success('Cover image removed');
    }

    renderImage() {

        if (this.props.src) {
            return (
                <div id="img-cont">
                    <div 
                        id="remove-img" 
                        className="waves-effect waves-light animated fadeIn z-depth-1"
                        title="Remove Cover"
                        onClick={this.removeCover}
                    >
                        <span>
                            <Trash2 />
                        </span>
                    </div>
                    <img src={this.props.src.preview} />
                </div>
            );
        }

        return <h5>Cover Preview</h5>
    }

    render() {
        return (
            <StyledImgCont className={`${this.props.src ? 'active-cont' : ''}`}>
                {this.renderImage()}
            </StyledImgCont>
        )
    }
}


const mapStateToProps = state => {
    return { src: state.dashboard.newRoom.cover };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoverPreview);


const StyledImgCont = styled.div`

    position: relative;
    height: 300px;
    border: 1px solid #bdbdbd;
    transition: 0.3s ease-in-out;
    text-align: center;

    &.active-cont {
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        border: 0px solid #bdbdbd;
    }

    #remove-img {
        width: 55px;
        height: 55px;
        text-align: center;
        border-radius: 50%;
        background-color: #ff5252;
        position: absolute;
        top: -20px;
        right: -15px;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        span {
            display: block;
            margin-top: 14px;

            svg {
                stroke : #ffebee;
            }
        }
    }

    #img-cont {
        height: 100%;
    }

    img {
        width: 100%;
        height: 100%;
    }

    h5 {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        letter-spacing: 2px;
        color: #bdbdbd;
        font-weight: 100;
    }
`;
