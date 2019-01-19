import React, { Component } from 'react';
import styled from 'styled-components';
import { materializeJS } from '../../helpers/materialize';
import { format } from '../../helpers/format';
import { notification } from '../../helpers/notification';
import { DAYS } from '../../helpers/days';

export default class Time extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            checkAll: false,
            fromTime: '',
            toTime: ''
        };
    }

    componentDidMount() {

        // initial state
        DAYS.forEach(day => this.setState({ [day]: false }));
        materializeJS.M.Timepicker.init(document.querySelectorAll('.timepicker'), {});
        setTimeout(() => { 

            const cont = document.querySelector(`#time-${this.props.nr}`);
            cont.classList.remove('fadeIn');

            // add event listeners to from - to time
            Array.from(cont.querySelectorAll('.timepicker'))
            .forEach(ele => ele.addEventListener('change', this.validateTime));
            
        }, 700);
    }

    renderCheckboxes() {
        
        return DAYS.map(day => {
            return (
                <div className={`col l6 ${this.state.checkAll ? 'disabled-checkbox' : ''}`}>
                    <p>
                        <label>
                            <input
                                value={this.state[day]}
                                name={day}
                                type="checkbox"
                                checked={this.state[day]}
                                disabled={this.state.checkAll}
                                onChange={() => this.setState({ [day]: this.state[day] ? false : true })}
                            />
                            <span>{`${day[0].toUpperCase()}${day.substring(1).toLowerCase()}`}</span>
                        </label>
                    </p>
                </div>
            )
        });
    }

    renderCheckAll() {

        return (
            <div className="col l6">
                <p>
                    <label>
                        <input
                            value={'all'}
                            name={'checkAll'}
                            type="checkbox"
                            checked={this.state.checkAll}
                            onChange={this.checkAll}
                        />
                        <span>Every Day</span>
                    </label>
                </p>
            </div>
        )
    }

    renderPickers() {
        
        return (
            <div className="row picker-cont">
                <div className="col s12 input-field">
                    <input 
                        id="from-time"
                        name="fromTime"
                        type="text" 
                        className="timepicker" 
                        readOnly={true}
                        placeholder="09.00 AM"
                        value={this.state.startTime}
                    />
                    <label className="active" htmlFor="from-time">Starts At</label>
                </div>
                <div className="col s12 input-field">
                    <input 
                        id="to-time" 
                        type="text"
                        name="toTime"
                        className="timepicker" 
                        placeholder="11.00 AM"
                        readOnly={true}
                        value={this.state.endTime}
                    />
                    <label className="active" htmlFor="to-time">Ends At</label>
                </div>
            </div>
        )
    }

    checkAll = () => DAYS.forEach(day => this.setState({ 
        [day]: this.state.checkAll ? false : true,
        checkAll: this.state.checkAll ? false : true
    }));

    validateTime = e => {
        console.log(e);

        const time = e.target.value;
        const type = e.target.name;
        const dateString = format.dateStringToTs(time);

        // start time validation
        if (type === 'fromTime') {

            // check if end time is sat
            if (this.state.toTime === '') this.setState({ [type]: time });

            // if sat, compare and make sure that from time is BEFORE end time
            else {

                // if time is valid, set state
                if (format.dateStringToTs(this.state.toTime) >= dateString) this.setState({ [type]: time });

                // if not, show error to aware user
                else notification.error('Invalid time!. Looks like the "to time" is before the selected "from time"');
            }
        }

        else {

        }
    }


    render() {
        return (
            <div className="col s12 m10 offset-m1 l6">
                <StyledTime id={`time-${this.props.nr}`} className="animated fadeIn">
                    <div className="time-number">
                        <h5>Time #{this.props.nr}</h5>
                    </div>
                    <div className="row">
                        {this.renderCheckboxes()}
                        {this.renderCheckAll()}
                    </div>
                    {this.renderPickers()}
                </StyledTime>
            </div>
        )
    }
}

const StyledTime = styled.div`
    padding: 2rem;
    box-shadow: 0px 28px 56px rgba(0, 0, 0, 0.09);
    border-radius: 12px;
    margin: 2rem 1rem;
    background-color: #b388ff;

    .time-number {
        
        h5 {
            letter-spacing: 5px;
            font-weight: 800;
            text-transform: uppercase;
            margin: 1rem 0 2rem 0;
            color: #ffffff;
            opacity: 0.5;
            font-size: 2.5rem;
        }
    }

    p {
        label {
            color: #ede7f6;
        }
    }

    .picker-cont {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #d1c4e9;


        input {
            color: #ffffff !important;
            box-shadow: 0 1px 0 0 #ede7f6!important;
            border-bottom: 1px solid #ede7f6 !important;
        }

        input:focus + label, textarea:focus + label {
            color: #ede7f6 !important;
        }

        input::placeholder {
            color: #ede7f6 !important;
            opacity: 0.5;
        }

        label {
            color: #ede7f6;
            opacity: 0.8;
        }
    }

    input[type="checkbox"]:checked+span:not(.lever):before {
        border-right: 2px solid #ffffff;
        border-bottom: 2px solid #ffffff;
    }

    .disabled-checkbox {
        pointer-events: none;
        opacity: 0.8;
    }
`;
