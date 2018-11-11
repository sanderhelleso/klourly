import React, { Component } from 'react';
import { PlusCircle } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { materializeJS } from '../../../../helpers/materialize';

import Days from '../../../dashboard/states/rooms/newRoom/Days';

const staticTxt = {
    heading: 'Times',
    description: 'The type of a room decides who and how users can join and participate. Private rooms are for users with invitation only, while public is for everyone.'
}

class Times extends Component {
    constructor(props) {
        super(props);

        this.state = {
            times: this.getCurrentTimes()
        }
    }

    getCurrentTimes() {
        const times = [];
        Object.entries(this.props.state.room.activeRoom.times).forEach(
            ([key, value]) => {
                if (Number.isInteger(parseInt(key))) {
                    times.push(value);
                }
            }
        );

        return times;
    }

    renderSelectDays() {

        const collapsibles = [];
        for (let i = 1; i < this.state.times.length + 1; i++) {
            collapsibles.push(<Days data={this.state.times[i - 1]} daysID={i} key={i} />);
        }

        setTimeout(() => {
            materializeJS.M.AutoInit();
        }, 10);

        return collapsibles;
    }

    renderTimes() {
        return (
            <div className="col s12 m12 l10 offset-l1 collapsible-cont">
                <h5>{staticTxt.heading}</h5>
                <p className="settings-description">{staticTxt.description}</p>
                <div className="row left-align">
                    <button id="add-new-room-time" className="waves-effect waves-light btn animated fadeIn"><PlusCircle size ={25}/> Add</button>
                </div>
                <ul className="collapsible popout expandable">
                    {this.renderSelectDays()}
                </ul>
            </div>
        );
    }

    render() {
        return this.renderTimes();
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Times);