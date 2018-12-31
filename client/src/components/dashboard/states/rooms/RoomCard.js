import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../helpers/redirect';
import { ArrowRight, Loader,  Lock, Unlock } from 'react-feather';

export default class RoomCard extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        return (
            <StyledCard className="col s12 m12 l10 offset-l1 animated fadeIn">
                <div className="row">
                    <RoomCover className="col s5" url={this.props.data.cover} />
                    <RoomInfo className="col s7">
                        <h4>{this.props.data.name.length > 16 
                            ? `${this.props.data.name.substring(0, 16)}..`
                            : this.props.data.name}
                        </h4>
                        <h5>76<span>%</span><span className="attended">Attended</span></h5>
                        <ToRoomButton 
                            className="waves-effect waves-purple btn-flat"
                            onClick={() => redirect.room(this.props.data.id)}
                        >
                            <ArrowRight />
                        </ToRoomButton>
                        <CheckinRoomButton className="waves-effect waves-purple btn-flat"><Lock /></CheckinRoomButton>
                    </RoomInfo>
                </div>
            </StyledCard>
        )
    }
}

const StyledCard = styled.div`
    transform: scale(1.001);
    position: relative;
    margin: 1.5rem 0.5rem;
    padding: 0 !important;
    border-radius: 8px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;

    .col {
        min-height: 150px;
        max-height: 150px;
        padding: 0;
    }

    .row {
        margin: 0;
    }
`;

const RoomCover = styled.div`
    transform: scale(1.001);
    background: linear-gradient(to right,
    rgba(166, 81, 223, 0.6),
    rgba(255, 255, 255, 1)),
    url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
`;

const RoomInfo = styled.div`
    transform: scale(1.001);
    position: relative;
    height: 101%;

    h4 {
        font-weight: 800;
        font-size: 2.25rem;
        position: absolute;
        top: 25%;
        left: -65px;
        max-width: 67.5%;
        margin-top: 0;
        word-wrap: break-word;
    }

    h5 {
        font-weight: 100;
        font-size: 4rem;
        position: absolute;
        top: 7.5%;
        right: 50px;
        color: #bdbdbd;
        opacity: 0.4;

        span {
            font-size: 2rem;
            opacity: 0.8;
        }

        .attended {
            display: block;
            font-size: 1.275rem;
            margin-top: -35px;
            opacity: 1;
        }
    }

    a {
        border-radius: 50%;
        min-height: 52px;
        max-height: 52px;
        min-width: 52px;
        max-width: 52px;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        position: absolute;
        right: -25px;
        color: #ffffff;

        svg {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%);
            height: 20px;
            width: 20px;
        }
    }

    @media (max-width: 1300px) {
        h4 {
            font-size: 2rem;
        }       
    }
`;

const ToRoomButton = styled.a`
    bottom: 10%;
    background: #7F7FD5;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const CheckinRoomButton = styled.a`
    bottom: 55%;
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;



//                            <img src={this.props.data.cover} />

/*
<div className="card small">
                    <div className="card-image">
                        <div className="card-image-overlay">
                            <img src={this.props.data.cover} />
                        </div>
                        <span className="room-card-type">
                        </span>
                        <span className="card-title room-card-name">
                            <span className="room-card-location">
                            {this.props.data.location.name}
                            </span>
                            <br />
                            {this.props.data.name}
                        </span>
                    </div>
                    <div className="card-fab">
                        <a className="btn-floating halfway-fab waves-effect waves-light btn-large room-btn"
                        onClick={() => redirect.room(this.props.data.id)}
                        >
                            <ArrowRight />
                        </a>
                    </div>
                    <div className="card-content room-card-content">
                    </div>
                </div>*/
