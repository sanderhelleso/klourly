import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../../helpers/format';
import { redirect } from '../../../../helpers/redirect';

export default class CheckedInMember extends Component {
    constructor(props) {
        super(props);

        this.DEFAULT_IMG = '/img/dashboard/stock.jpg';
    }

    renderCheckedinTime() {

        if (this.props.data.checkedin || this.props.type === 'code') {
            return (
                <p>
                    {format.getFormatedDateAndTime(this.props.data.checkinTimestamp)}
                </p>
            )
        }

        return <p>Not checked in</p>
    }

    render() {
        return (
            <StyledMember
                onClick={() => this.props.type !== 'code'
                    ? redirect.roomMemberReport(this.props.roomID, this.props.data.id) 
                    : null
                }
                checkedin={this.props.data.checkedin}
                type={this.props.type}
            >
                <img src={this.props.data.photoUrl || this.DEFAULT_IMG} alt="" />
                <div className="member-info">
                    <h5>{this.props.data.name}</h5>
                    {this.renderCheckedinTime()}
                </div>
            </StyledMember>
        )
    }
}

const StyledMember = styled.div`

    min-width: 100%;
    padding: 2rem;
    margin: 0.25rem 0;
    clear: both;
    transition: 0.3s ease-in-out;
    opacity: ${props => props.checkedin || props.type === 'code' ? 1 : 0.3};
    cursor: ${props => props.type !== 'code' ? 'pointer' : 'default'};


    img {
        border-radius: 50%;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        min-height: 40px;
        min-width: 40px;
        max-height: 40px;
        max-width: 40px;
        float: left;
    }

    .member-info {
        float: left;
        text-align: left;
        margin-left: 1rem;

        h5 {
            font-size: 1.15rem;
            font-weight: 600;
            margin: 3.5px 0;
        }

        p {
            margin: 0;
            font-size: 0.8rem;
            color: #bdbdbd;
        }
    }
`;

