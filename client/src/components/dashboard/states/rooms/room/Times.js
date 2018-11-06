import React, { Component } from 'react';
import { Clock } from 'react-feather';

// redux
import { connect } from 'react-redux';

class Times extends Component {
    constructor(props) {
        super(props);

        this.state = {
            times: {
                ...props.state.dashboard.currentRoom.times
            }
        }

        this.renderTimes = this.renderTimes.bind(this);
    }

    renderTimes() {

        return Object.keys(this.state.times).map(timeKey => {

            // check if current key is object
            if (typeof this.state.times[timeKey] === 'object') {

                const time = this.state.times[timeKey];
                return(
                    <div key={timeKey} className="room-times center-align animated fadeIn">
                        <ul>
                        {
                            Object.keys(time.days).map(day => {
                                return <li key={day}>{day.substring(0, 3).toUpperCase()}</li>
                            })
                        }
                        </ul>
                        <h5>{time.time.from} - {time.time.to}</h5>
                    </div>
                );
            };
        });
    }


    render() {
        return (
            <div id="room-times-cont" className="center-align">
                <Clock size={48} />
                {this.renderTimes()}
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(Times);
