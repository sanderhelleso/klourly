import React, { Component } from 'react';
import styled from 'styled-components';

import Attendence from './Attendence';
import Checkin from './Checkin';
import ToRoom from './ToRoom';

export default class RoomCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledCard 
                className="col s12 m6 l4"
                onClick={() => {}}//redirect.room(this.props.data.id)}
            >
                <div className="card-cont">
                    <div className="row">
                        <RoomCover className="col s12" url={this.props.data.cover}>
                            {this.props.owning ? null : <Attendence roomID={this.props.data.id} />}
                        </RoomCover>
                        <RoomInfo className="col s12">
                            <div className="info-cont">
                                <p>{this.props.data.type}</p>
                                <h4>{this.props.data.name.length > 16
                                    ? `${this.props.data.name.substring(0, 14)}..`
                                    : this.props.data.name}
                                </h4>
                            </div>
                            <ToRoom owning={this.props.owning} roomID={this.props.data.id} />
                            {this.props.owning 
                                ? null 
                                : <Checkin 
                                    times={this.props.data.times}
                                    roomID={this.props.data.id}
                                />
                            }
                        </RoomInfo>
                    </div>
                </div>
            </StyledCard>
        )
    }
}

const StyledCard = styled.div`

    .card-cont {
        margin: 1.5rem 0.5rem;
        border-radius: 18px;
        -webkit-box-shadow: 0px 4px 14px 0px rgba(46, 82, 217, 0.30);
        -moz-box-shadow:    0px 4px 14px 0px rgba(46, 82, 217, 0.30);
        box-shadow:         0px 4px 14px 0px rgba(46, 82, 217, 0.30);
        transform: scale(1.001);
        position: relative;
        padding: 0 !important;
        background-color: #ffffff;
        transition: 0.3s ease-in-out;
    }

    .col {
        min-height: 175px;
        max-height: 175px;
        padding: 0;
    }

    .row {
        margin: 0;
    }
`;

const RoomCover = styled.div`
    background: linear-gradient(215deg,
    rgba(166, 81, 223, 0.9),
    rgba(166, 81, 223, 0.7),
    rgba(155, 26, 245, 0.3),
    rgba(155, 26, 245, 0.3)),
    url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 60%;
    height: 100%;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    transition: 0.3s ease-in-out;
`;

const RoomInfo = styled.div`
    position: relative;
    height: 101%;
    padding: 1rem;

    .info-cont {

        margin: 1.25rem;

        h4 {
            font-weight: 600;
            letter-spacing: 2px;
            font-size: 2rem;
            word-wrap: break-word;
            margin-top: 0;
        }

        p {
            margin-top: 0;
            margin-bottom: 0.20rem;
            color: #bdbdbd;
        }

        @media (max-width: 1300px) {
            h4 {
                font-size: 2rem;
            }       
        }
    }
`;