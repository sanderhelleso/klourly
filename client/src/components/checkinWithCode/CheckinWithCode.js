import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledButtonMain } from '../styles/buttons';

export default class CheckinWithCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            name: '',
            valid: null
        }
    }

    handleChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    renderInput() {
        return (
            <div class="row">
                <div class="input-field col s12">
                    <input 
                        id="name" 
                        name="name" 
                        type="text"
                        onChange={this.handleChange}
                    />
                    <label for="name">Your full name</label>
                </div>
            </div>
        )
    }

    renderCheckin() {
        return (
            <StyledCont>
                <h1>Checkin</h1>
                <p>Register your attendance for CST 370</p>
                {this.renderInput()}
                <StyledButtonMain
                    className="waves-effect waves-light btn animated fadeIn"
                >
                    Register
                </StyledButtonMain>
            </StyledCont>
        );
    }

    render() {
        return (
            this.renderCheckin()
        )
    }
}

const StyledCont = styled.div`
    padding: 4rem 3rem;
    box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    background-color: #ffffff;
    max-width: 500px;
    min-width: 500px;
    position: absolute;
    top: 27.5%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;

    h1 {
        font-weight: 800;
        margin-top: 0;
        font-size: 2.5rem;
    }

    p {
        color: #9e9e9e;
        margin-bottom: 3rem;
    }

    img {
        position: absolute;
        top: -40px;
        left: -25px;
        border-radius: 50%;
        min-width: 110px;
        max-width: 110px;
        min-height: 110px;
        max-height: 110px;
        box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.1);
        transform: rotate(-7.5deg);
    }
`;
