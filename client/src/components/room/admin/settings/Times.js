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
            dayTimes: this.getCurrentTimes(),
            daysSelected: this.getCurrentTimes().length,
            validTimes: true
        }

        this.updateDaysAmount = this.updateDaysAmount.bind(this);
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

    updateDaysAmount() {
        this.setState({
            daysSelected: this.state.daysSelected += 1,
            dayTimes: this.updateDayTime()
        });
    }

    updateDayTime() {
        const days = [];
        let validCount = 0;
        const day = Array.from(document.querySelectorAll('.collapsible-body'));
        day.forEach(day => {
            const inputs = Array.from(day.querySelectorAll('input'));

            const dayObj = {
                days: {},
                time: {
                    from: '',
                    to: ''
                }
            };

            let valid = false;
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    if (input.checked) {
                        dayObj.days = {
                            ...dayObj.days,
                            [input.name]: input.checked
                        }
                        valid = true;
                    }
                }

               else if (input.name === 'timeFrom') {
                    dayObj.time.from = input.value;
               }

               else if (input.name === 'timeTo') {
                    dayObj.time.to = input.value
               }

            });

            if (dayObj.time.from !== '' && dayObj.time.to !== '' && valid) {
                validCount++;
            }

            days.push(dayObj);
        });

        return days;
    }


    renderSelectDays() {

        const collapsibles = [];
        for (let i = 1; i < this.state.daysSelected + 1; i++) {
            collapsibles.push(
                <Days data={this.state.dayTimes[i - 1]} settings={true} daysID={i} key={i} />
            );
        }

        setTimeout(() => {
            materializeJS.M.AutoInit();
        }, 10);

        return collapsibles;
    }

    renderTimes() {
        return (
            <div className="col s12 m12 l12">
                <h5>{staticTxt.heading}</h5>
                <p className="settings-description">{staticTxt.description}</p>
                <div className="col s12 m12 l8 offset-l2 collapsible-cont">
                    <div className="row left-align">
                        <button 
                        id="add-new-room-time"
                        className="waves-effect waves-light btn animated fadeIn"
                        onClick={this.updateDaysAmount}
                        >
                            <PlusCircle size ={25} />
                            Add
                        </button>
                    </div>
                    <ul className="collapsible popout expandable">
                        {this.renderSelectDays()}
                    </ul>
                </div>
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