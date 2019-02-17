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
                    name: 'Most Recent',
                    time: null
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
                    name: 'Of all time',
                    time: 2147483647
                }
            }
        }
    }

    updateFilter = option => {

        console.log(option);
        this.props.updateRoomReportsFilterAction({
            by: option.name,
            time: option.time
        });
    }

    renderOptions() {

        return Object.values(this.options.labels).map(option => {
            return (
                <p key={option.name}>
                    <label 
                        id={`label-${option.name}`}
                        htmlFor={`input-${option.name}`}
                    >
                        <input
                            readOnly
                            id={`input-${option.name}`} 
                            name={this.options.group} 
                            type={this.options.type}
                            onClick={() => this.updateFilter(option)}
                            checked={option.name === this.props.filter.by ? true : false}
                        />
                        <span>{option.name}</span>
                    </label>
                </p>
            )
        });
    }

    render() {
        return (
            <StyledOptions className="animated fadeIn">
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
