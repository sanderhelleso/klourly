import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomReportsFilterAction } from '../../../../actions/room/report/updateRoomReportsFilterAction';


class Filter extends Component {
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

    updateFilter = option => {

    }

    renderOptions() {

        return Object.values(this.options.labels).map(option => {
            return (
                <p onClick={() => this.updateFilter(option)}>
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

const mapStateToProps = state => {
    return { 
        filter: state.room.activeRoom.reports.options.filter
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateRoomReportsFilterAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

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
