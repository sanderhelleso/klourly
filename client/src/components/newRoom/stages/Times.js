import React, { Component } from 'react';
import styled from 'styled-components';
import Time from '../Time';

export default class Times extends Component {
    constructor(props) {
        super(props);

        this.state = {
            times: [<Time nr={1} />]
        }
    }

    renderTimes() {

        return this.state.times.map(time => time);
    }

    addTime = () => {
        this.setState({
            times: [...this.state.times, <Time nr={this.state.times.length + 1} />]
        });
    }

    render() {
        return (
            <div className="col s12">
                <StyledAddButton 
                    className="waves-effect waves-light btn animated fadeIn"
                    onClick={this.addTime}
                >
                    Add new time
                </StyledAddButton>
                <StyledRow className="row">
                    {this.renderTimes()}
                </StyledRow>
            </div>
        )
    }
}

const StyledRow = styled.div`
    clear: both;
    margin-top: 4rem;
`;

const StyledAddButton = styled.a`
    box-shadow: none;
    color: #12e2a3;
    background-color: transparent;
    border: 2px solid #12e2a3;
    line-height: 0;
    letter-spacing: 2px;
    transition: 0.3s ease-in-out;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 1.5rem;
    display: block;
    float: left;
    margin: 2rem 1rem;

    &:hover {
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        background-color: #12e2a3;
        color: #ffffff;
    }
`;
