import React, { Component } from 'react';
import styled from 'styled-components';

export default class CheckedInMember extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledMember checkedin={this.props.checkedin} >
                <img src={this.props.data.photoUrl} alt="Checked in members avatar" />
                <div className="member-info">
                    <h5>{this.props.data.name}</h5>
                    <p>Checked in 6 minutes ago</p>
                </div>
            </StyledMember>
        )
    }
}

const StyledMember = styled.div`
    ${props => console.log(props.checkedin)}
    min-width: 100%;
    padding: 2rem;
    margin: 0.25rem 0;
    clear: both;
    transition: 0.3s ease-in-out;
    opacity: ${props => props.checkedin ? 1 : 0.4};

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


