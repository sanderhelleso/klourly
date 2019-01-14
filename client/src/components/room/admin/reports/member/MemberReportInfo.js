import React, { Component } from 'react';
import styled from 'styled-components';

export default class MemberReportInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledInfo className="col s12 m12 l5">
                <StyledMemberCont className="col s12 m6 l12">
                    <img 
                        src={this.props.data.photoUrl}
                        alt={`${this.props.data.name}'s avatar`}
                    />
                    <h5>Member Report</h5>
                    <h3>{this.props.data.name}</h3>
                </StyledMemberCont>
                <div className="col s12 m6 l12">
                </div>
            </StyledInfo>
        )
    }
}

const StyledInfo = styled.div`

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

    @media screen and (max-width: 1000px) {
        text-align: center;
        margin-bottom: 1rem;
        padding-bottom: 2rem !important;
        border-bottom: 1px solid #eeeeee;

        p {
            margin: 0 auto;
        }
    }
`;

const StyledMemberCont = styled.div`

    margin-top: 1.75rem;

    img {
        border-radius: 50%;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        min-height: 70px;
        min-width: 70px;
        max-height: 70px;
        max-width: 70px;
        margin-right: 1rem;
        float: left;
    }

    h5 {
        font-size: 1.15rem;
        font-weight: 100;
        color: #9e9e9e;
        margin: 0;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    h3 {
        margin: 0;
        margin-bottom: 1.5rem;
        font-size: 1.75rem;
        font-weight: 800;
    }
`;
