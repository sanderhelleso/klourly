import React, { Component } from 'react';
import styled from 'styled-components';
import { Trash2 } from 'react-feather';
import { materializeJS } from '../../helpers/materialize';
import { format } from '../../helpers/format';
import { notification } from '../../helpers/notification';
import { DAYS } from '../../helpers/days';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../actions/newRoom/nextStageAction';


class Time extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.data 
            ? this.props.data 
            : { 
                checkAll: false,
                fromTime: '',
                toTime: ''
            };

    }

    componentWillReceiveProps(nextProps) {
        if (this.state !== nextProps.data) this.setState({ ...nextProps.data});
    }

    componentDidUpdate(prevProps) {

        if (prevProps === this.props) {

            this.props.nextStageAction({
                times: { 
                    ...this.props.times,
                    [this.props.nr]: this.state
                }
            });
        }
    }

    componentDidMount() {

        // initial state
        if (!this.props.data) {
            DAYS.forEach(day => this.setState({ [day]: false }));
            this.props.nextStageAction({
                times: { 
                    ...this.props.times,
                    [this.props.nr]: this.state
                }
            });
        }

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
                <div className={`col s12 m6 l6 ${this.state.checkAll ? 'disabled-checkbox' : ''}`}>
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
            <div className="col s12 m6 l6">
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
                        placeholder="09.00 AM"
                        value={this.state.fromTime}
                    />
                    <label className="active" htmlFor="from-time">Room is starting from...</label>
                </div>
                <div className="col s12 input-field">
                    <input 
                        id="to-time" 
                        type="text"
                        name="toTime"
                        className="timepicker" 
                        placeholder="11.00 AM"
                        value={this.state.toTime}
                    />
                    <label className="active" htmlFor="to-time">And the room is ending at...</label>
                </div>
            </div>
        )
    }

    checkAll = () => DAYS.forEach(day => this.setState({ 
        [day]: this.state.checkAll ? false : true,
        checkAll: this.state.checkAll ? false : true
    }));

    validateTime = e => {

        const time = e.target.value;
        const type = e.target.name;
        const dateString = format.dateStringToTs(time);

        // from time validation
        if (type === 'fromTime') {

            // check if to time is sat
            if (this.state.toTime === '') this.setState({ [type]: time });

            // if sat, compare and make sure that from time is BEFORE end time
            else {

                // if time is valid, set state
                if (format.dateStringToTs(this.state.toTime) >= dateString) this.setState({ [type]: time });
                
                // if not, swap
                else this.setState({ fromTime: this.state.toTime, toTime: time });
            }
        }

        // to time validtion
        else {

            // check if from time is sat
            if (this.state.fromTime === '') this.setState({ [type]: time });

            // if sat, compare and make sure that to time is AFTER from time
            else {

                // if time is valid, set state
                if (format.dateStringToTs(this.state.fromTime) <= dateString) this.setState({ [type]: time });
                
                // if not, swap
                else this.setState({ toTime: this.state.toTime, fromTime: time });
            }
        }
    }

    removeTime = () => {

        // update list of times and remove selected index
        let timeNum = 1;
        const newTimes = {};
        Object.values(format.removeByKey(this.props.times, this.props.nr.toString()))
        .forEach(time => { newTimes[timeNum] = time; timeNum++ });

        notification.success(`Time #${this.props.nr} removed! List numbers has been updated`);
        this.props.nextStageAction({ times: newTimes });
    }

    render() {
        return (
            <div className="col s12 m6 l6">
                <StyledTime id={`time-${this.props.nr}`} className="animated fadeIn">
                    <span 
                        className="delete-time" 
                        title="Remove Time"
                        onClick={this.removeTime}
                    >
                        <Trash2 size={40} />
                    </span>
                    <div className="time-number">
                        <h5>Time #{this.props.nr}</h5>
                    </div>
                    <div className="row checkbox-cont">
                        {this.renderCheckboxes()}
                        {this.renderCheckAll()}
                    </div>
                    {this.renderPickers()}
                    <p className="help">If not sure or room wont have a specific time schedule, leave empty</p>
                </StyledTime>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { times: state.dashboard.newRoom.times };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Time);


const StyledTime = styled.div`
    padding: 2rem;
    box-shadow: 0px 28px 56px rgba(0, 0, 0, 0.09);
    border-radius: 12px;
    margin: 2rem 1rem;
    background-color: #b388ff;

    .delete-time {
        float: right;
        z-index: 100;
        cursor: pointer;

        svg {
            stroke: #ffcdd2;
        }
    }

    .help {
        font-size: 0.8rem;
        text-align: center;
        color: #ffffff;
        opacity: 0.7;
        max-width: 200px;
        margin: 1.5rem auto;
    }

    .timepicker-digital-display {
        background-color: #b388ff;
    }

    .time-number {
        
        h5 {
            letter-spacing: 5px;
            font-weight: 100;
            text-transform: uppercase;
            margin: 1rem 0 2rem 0;
            color: #ffffff;
            opacity: 0.5;
            font-size: 2.5rem;
            clear: both;
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

    @media screen and (max-width: 800px) {
        .checkbox-cont div {
            min-width: 100%;
        }
    }
`;
