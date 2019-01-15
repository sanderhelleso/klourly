import React, { Component } from 'react';
import styled from 'styled-components';
import { Cloud, CloudOff, CheckCircle, XCircle } from 'react-feather';
import { format } from '../../../../../helpers/format';
import { redirect } from '../../../../../helpers/redirect';


export default class MemberReportCheckin extends Component {
    constructor(props) {
        super(props);
    }

    renderAttendedIcon() {
        return this.props.attended 
                ?   <span>
                        <CheckCircle className="attended-icon" size={16} />
                        <span className="icon-text">Attended</span>
                    </span>
                :   <span>
                        <XCircle className="not-attended-icon" size={16} />
                        <span className="icon-text">Not Attended</span>
                    </span>;
    }
 
    render() {
        return (
            <div className="col s12 m6 l6 xl4">
                <StyledCont 
                    attended={this.props.attended} 
                    onClick={() => redirect.roomCheckinReport(this.props.roomID, this.props.data.checkinID)}
                >
                    <div className={`member-cont ${this.props.attended ? "attended-cont" : "not-attended-cont"}`}>
                        <div className="attended">
                            {this.renderAttendedIcon()}
                        </div>
                        <h5>Checkin ID</h5>
                        <h4>{this.props.data.checkinID}</h4>
                        <div className="start-end">
                            <p><Cloud /> <span>{format.getFormatedDateAndTime(this.props.data.startTime)}</span></p>
                            <p><CloudOff /> <span>{format.getFormatedDateAndTime(this.props.data.endTime)}</span></p>
                        </div>
                    </div>
                </StyledCont>
            </div>
        )
    }
}

const StyledCont = styled.div`

    .member-cont {
        border-radius: 6px;
        padding: 1.25rem;
        margin: 2.25rem 0.5rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        position: relative;
        word-break: break-all;
    }

    .attended-cont {
        -webkit-box-shadow: 0px 4px 14px 0px rgba(46, 82, 217, 0.30);
        -moz-box-shadow:    0px 4px 14px 0px rgba(46, 82, 217, 0.30);
        box-shadow:         0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    }

    .not-attended-cont {
        -webkit-box-shadow: 0px 4px 14px 0px rgba(255,39,48, 0.30);
        -moz-box-shadow:    0px 4px 14px 0px rgba(255,39,48, 0.30);
        box-shadow:         0px 4px 14px 0px rgba(255,39,48, 0.30);
    }

    &:hover {
        opacity: 1;
    }

    .attended {
        position: absolute;
        top: -25px;
        right: 10px;
        background-color: ${props => props.attended ? '#81c784' : '#e57373'};
        color: #ffffff;
        height: 35px;
        width: 130px;
        border-radius: 20px;
        box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.09);
        text-align: center;

        span {
            display: block;
            margin-top: 9px;

            svg {
                float: left;
                margin: 0 10px;
            }

            .icon-text {
                font-size: 0.8rem;
                margin-right: 15px;
            }
        }
    }

    h5 {
        font-size: 1.10rem;
        font-weight: 100;
        margin: 0;
        color: #bdbdbd;
    }

    h4 {
        margin: 0.35rem 0 0.75rem 0;
        font-size: 1.45rem;
        font-weight: 600;
    }

    .start-end {
        padding-top: 1rem;
        border-top: 1px solid #eeeeee;
        margin-top: 1rem;

        p {
            max-width: 195px;
            margin: 0.15rem 0;
            font-weight: 400;

            svg {
                stroke: #bdbdbd;
            }

            span {
                float: right;
            }
        }
    }
`;
