import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomReportsIndexAction } from '../../../../actions/room/report/updateRoomReportsIndexAction';


class Pagination extends Component {

    calculateNextIndex = index => {

        this.props.reports.options.index === index - 1 
        ? null
        : this.props.updateRoomReportsIndexAction(index - 1);
    }

    renderPagination() {

        // if most recent is selcted, exit early
        if (this.props.reports.options.filter.by === 'Most Recent') return;

        // create paginations
        const numOfColums = 9;
        const paginations = [];
        const availablePaginations = Math.ceil(this.props.reports.paginationLength / numOfColums);

        // if pagination is 1, exit early
        if (availablePaginations === 1) return;

        // create pagination array
        for (let i = 1; i < availablePaginations + 1; i++) {
            paginations[i] = i;
        }

        // itterate over number of available paginations and render
        return paginations.map(index => {
            return (
                <li key={index}
                    onClick={() => this.calculateNextIndex(index)}
                    className={`waves-effect animated fadeIn 
                        ${index === this.props.reports.options.index + 1 
                        ? 'active' 
                        : ''
                    }`}
                >
                    <a>{index}</a>
                </li>
            )
        });
    }


    render() {
        return (
            <StyledPagination className="col s12">
                <ul className="pagination">
                    {this.renderPagination()}
                </ul>
            </StyledPagination>
        )
    }
}


const mapStateToProps = state => {
    return { 
        checkins: state.room.activeRoom.checkins,
        reports: state.room.activeRoom.reports
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateRoomReportsIndexAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);


const StyledPagination = styled.div`
    min-height: 60px !important;
    margin-top: 1rem;
    padding: 1rem 0;

    ul li {
        margin: 0 0.15rem;
        a {
            color: #9e9e9e;
        }
    }

    .active {
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        background-color: #b388ff !important;
    }
`;