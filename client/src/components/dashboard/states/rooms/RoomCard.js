import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../helpers/redirect';
import { ArrowRight } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Attendence from './Attendence';
import Checkin from './Checkin';

class RoomCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledCard 
                className="col s12 m12 l10 offset-l1"
                onClick={() => {}}//redirect.room(this.props.data.id)}
            >
                <div className="row">
                    <RoomCover className="col s5" url={this.props.data.cover} />
                    <RoomInfo className="col s7">
                        <h4>{this.props.data.name.length > 16 
                            ? `${this.props.data.name.substring(0, 16)}..`
                            : this.props.data.name}
                        </h4>
                        {this.props.owning 
                            ? null 
                            : <Attendence 
                                roomID={this.props.data.id} 
                                attendingIndex={this.props.attendingIndex}
                                attendenceData={this.props.data.attendenceData} 
                            />
                        }
                        <ToRoomButton 
                            className="waves-effect waves-light btn-flat"
                            notAvailable={this.props.owning}
                            onClick={() => redirect.room(this.props.data.id)}
                        >
                            <ArrowRight />
                        </ToRoomButton>
                        {this.props.owning 
                            ? null 
                            : <Checkin 
                                times={this.props.data.times}
                                roomID={this.props.data.id}
                            />
                        }
                    </RoomInfo>
                </div>
            </StyledCard>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id
    };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCard);

const StyledCard = styled.div`
    transform: scale(1.001);
    position: relative;
    margin: 1.5rem 0.5rem;
    padding: 0 !important;
    border-radius: 8px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.2);
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
    transform: scale(1.001);
    background: linear-gradient(to right,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 1)),
    url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    transition: 0.3s ease-in-out;

    &:hover {
        opacity: 1;
    }
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

    a {
        border-radius: 50%;
        transition: 0.3s ease-in-out;
        min-height: 52px;
        max-height: 52px;
        min-width: 52px;
        max-width: 52px;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        position: absolute;
        right: -25px;
        color: #ffffff;

        &:hover {
            box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.2);
        }

        svg {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%);
            height: 20px;
            width: 20px;
        }
    }

    .btn-flat.btn-flat[disabled] {
        color: #ffffff !important;
    }

    @media (max-width: 1300px) {
        h4 {
            font-size: 2rem;
        }       
    }
`;

const ToRoomButton = styled.a`
    bottom: ${props => (props.owning || props.notAvailable) ? '35%' : '15%'};
    background: #9796f0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`;