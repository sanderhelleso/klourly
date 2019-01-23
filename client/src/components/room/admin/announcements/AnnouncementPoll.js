import React, { Component } from 'react';
import styled from 'styled-components'; 
import { BarChart2 } from 'react-feather';

export default class AnnouncementPoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            poll: false
        }
    }

    renderPollToggle() {
        
        return (
            <div className="input-field col s12">
                <p>
                    <label>
                        <input 
                            type="checkbox"
                            checked={this.state.poll}
                            onChange={() => this.setState({ poll: this.state.poll ? false : true })}
                        />
                        <span>Inlude Poll</span>
                    </label>
                </p>
            </div>
        )
    }

    renderPlaceholder() {
        
        return (
            <StyledPollPlaceholder>
                <BarChart2 size={75} />
                <p>Include a realtime poll to the announcement. Get immediate feedback and interact with your members</p>
            </StyledPollPlaceholder>
        )
    }

    renderPoll() {
        <p>I am an active poll</p>
    }


    render() {
        return (
            <StyledPollCont>
                {this.state.poll ? this.renderPoll() : this.renderPlaceholder()}
                {this.renderPollToggle()}
            </StyledPollCont>
        )
    }
}

const StyledPollCont = styled.div`
    padding: 0 2rem;
`;

const StyledPollPlaceholder = styled.div`
    color: #bdbdbd;

    p {
        max-width: 75%;
        margin: 1rem auto;
    }

    svg {
        stroke: #b388ff;
        margin-bottom: 1rem;
        opacity: 0.7;
    }
`;
