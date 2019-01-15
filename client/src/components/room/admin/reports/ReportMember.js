import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../helpers/redirect';
import { format } from '../../../../helpers/format';

export default class ReportMember extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div 
                className="col s12 m4 l4" 
                onClick={() => redirect.roomMemberReport(this.props.roomID, this.props.data.id)}
            >
                <StyledMember attented={this.props.data.attended}>
                    <div className="row">
                        <div className="col s12">
                            <img 
                                src={this.props.data.photoUrl} 
                                alt={`${this.props.data.name}'s avatar`} 
                            />
                            <h5>{this.props.data.name}</h5>
                            <span>{this.props.data.attended 
                                    ? `Checked in at ${format.tsToHHMM(this.props.data.timestamp)}`
                                    : 'Not Attended'
                                }
                            </span>
                        </div>
                    </div>
                </StyledMember> 
            </div>
        )
    }
}

const StyledMember = styled.div`

    margin: 1rem 0;
    opacity: ${props => props.attented ? 1 : 0.4};
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
        opacity: 1;
    }

    img {
        margin-top: 0.9rem;
        margin-right: 1.25rem;
        border-radius: 50%;
        box-shadow: ${props => props.attented ? '0px 9px 28px rgba(0, 0, 0, 0.09)' : 'none'};
        min-height: 40px;
        min-width: 40px;
        max-height: 40px;
        max-width: 40px;
        float: left;
    }

    h5 {
        font-size: 1rem;
        font-weight: 600;
        display: inline-block;
        margin-bottom: 0;
    }

    span {
        color: #9e9e9e;
        display: block;
        font-size: 0.8rem;
    }
`;
