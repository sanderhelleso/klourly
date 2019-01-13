import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomReportsIndexAction } from '../../../../actions/room/report/updateRoomReportsIndexAction';


class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    calculateNextIndex = index => {

        this.props.reportIndex === index - 1 
        ? null
        : this.props.updateRoomReportsIndexAction(index - 1);
    }

    renderPagination() {

        // create paginations
        const paginations = [];
        const availablePaginations = Math.ceil(Object.keys(this.props.checkins).length / 9);

        for (let i = 1; i < availablePaginations + 1; i++) {
            paginations[i] = i;
        }

        // itterate over number of available paginations and render
        return paginations.map(index => {
            return (
                <li 
                    className={`waves-effect ${index === this.props.reportIndex + 1 ? 'active' : ''}`}
                    onClick={() => this.calculateNextIndex(index)}
                >
                    <a>{index}</a>
                </li>
            )
        });
    }


    render() {
        return (
            <div className="col s12">
                <ul className="pagination">
                    {this.renderPagination()}
                </ul>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { 
        checkins: state.room.activeRoom.checkins,
        reportIndex: state.room.activeRoom.reportIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateRoomReportsIndexAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);