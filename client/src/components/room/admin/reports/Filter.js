import React, { Component } from 'react';
import styled from 'styled-components';

export default class Filter extends Component {
    constructor(props) {
        super(props);

        const msInDay = 86400000;

        this.options = {
            group: 'group1',
            type: 'radio',
            labels: {
                label1: {
                    name: 'Most Recent'
                },
                label2: {
                    name: 'Last 3 Days',
                    time: msInDay * 3
                },
                label3: {
                    name: 'Last 7 Days',
                    time: msInDay * 7
                },
                label4: {
                    name: 'Last 28 Days',
                    time: msInDay * 28
                },
                label5: {
                    name: 'Last 6 Months',
                    time: msInDay * 183
                },
                label6: {
                    name: 'Last 1 Year',
                    time: msInDay * 365
                }
            }
        }
    }

    renderOptions() {

        return Object.values(this.options.labels).map(option => {
            return (
                <p>
                    <label>
                        <input name={this.options.group} type={this.options.type} />
                        <span>{option.name}</span>
                    </label>
                </p>
            )
        });
    }

    render() {
        return (
            <StyledOptions>
               {this.renderOptions()}
            </StyledOptions>
        )
    }
}

const StyledOptions = styled.div`
    p {
        display: inline-block;
        margin: 1rem 0;
        width: 150px;
    }

    @media screen and (max-width: 600px) {
        p {
            width: 50%;
        }
    }
`;
