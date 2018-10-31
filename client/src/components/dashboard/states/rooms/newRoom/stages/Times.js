import React, { Component } from 'react';
import { PlusCircle } from 'react-feather';

import { materializeJS } from '../../../../../../helpers/materialize';

import Days from '../Days';
import NextStage from '../NextStage';

export default class Times extends Component {
    constructor(props) {
        super(props);

        this.state = {
            daysSelected: 0,
            dayTimes: [],
            validTimes: false,
            validWeeks: false,
            startWeek: this.getCurrentWeek(),
            repeat: true,
            message: 'Continue'
        }

        this.updateDayTime = this.updateDayTime.bind(this);
        this.validateDayTime = this.validateDayTime.bind(this);
        this.renderConfirmTimesBtn = this.renderConfirmTimesBtn.bind(this);
        this.repeatTime = this.repeatTime.bind(this);
        this.updateDaysAmount = this.updateDaysAmount.bind(this);
        this.handleWeek = this.handleWeek.bind(this);
        this.renderSelectDays = this.renderSelectDays.bind(this);

    }

    componentWillMount() {
        document.title = 'Creating New Room | Step 6 / 7 | Klourly'
    }

    repeatTime(e) {
        this.setState({
            repeat: e.target.checked
        });
    }

    renderConfirmTimesBtn() {
        if (this.state.validTimes && this.state.validWeek) {
            return(
                <NextStage 
                message={this.state.message} 
                valid={true} 
                data={{
                    times: {
                        ...this.state.dayTimes,
                        startWeek: this.state.startWeek,
                        repeat: this.state.repeat
                    }
                }}
                />
            )
        }

        else {
            return(
                <NextStage 
                message={this.state.message} 
                valid={false} 
                />
            )
        }
    }

    updateDaysAmount() {
        this.setState({
            daysSelected: this.state.daysSelected += 1
        }, 
        () => {
            setTimeout(() => {
                this.setState({
                    dayTimes: this.updateDayTime()
                });
            }, 10);
        });
    }

    renderSelectDays() {

        const collapsibles = [];
        for (let i = 1; i < this.state.daysSelected + 1; i++) {
            collapsibles.push(<Days daysID={i} key={i} />);
        }

        if (this.state.daysSelected === 0) {
            setTimeout(() => {
                document.querySelector('#add-new-room-time').click();
            }, 10);
        }

        setTimeout(() => {
            materializeJS.M.AutoInit();
        }, 10);

        return collapsibles;
    }

    validateDayTime() {
        this.setState({
            dayTimes: this.updateDayTime()
        });
    }

    handleWeek(e) {
        const value = e.target.value.replace(/[^\d]/,'',);    
        
        if (value.length > 2) {
            e.target.value = value.substring(0, 2);
        }

        if (value > 52) {
            e.target.value = 52;
        }

        else if (value < 1 || value === '') {
            e.target.value = '';
            this.setState({
                validWeek: false,
                startWeek: null
            });
            return;
        }

        this.setState({
            validWeek: true,
            startWeek: e.target.value
        });
    }

    // get current week
    getCurrentWeek() {
        const now = new Date();
        const onejan = new Date(now.getFullYear(), 0, 1);
        const currentWeek = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
        return currentWeek === 52 ? 1 : currentWeek + 1; // return upcoming week
    }

    updateDayTime() {
        const days = [];
        let validCount = 0;
        const day = Array.from(document.querySelectorAll('.collapsible-body'));
        day.forEach(day => {
            const inputs = Array.from(day.querySelectorAll('input'));

            const dayObj = {
                days: null,
                time: null
            };

            let valid = false;
            inputs.forEach(input => {
                input.addEventListener('change', this.validateDayTime);
                if (input.name !== 'time') {
                    if (input.checked) {
                        dayObj.days = {
                            ...dayObj.days,
                            [input.name]: input.checked
                        }
                        valid = true;
                    }
                }

               else {
                    dayObj.time = {
                        from: input.value,
                    }
               }
            });

            if (dayObj.time !== '' && valid) {
                validCount++;
            }

            days.push(dayObj);
        });

        if (validCount === days.length) {
            this.setState({
                validTimes: true
            });
        }

        else {
            this.setState({
                validTimes: false
            });
        }

        return days;
    }

    render() {
        return (
            <div className="row col s12">
                <div className="col s6 collapsible-cont">
                    <button id="add-new-room-time" className="waves-effect waves-light btn animated fadeIn" onClick={this.updateDaysAmount}><PlusCircle size ={25}/> Add</button>
                    <ul className="collapsible popout expandable">
                        {this.renderSelectDays()}
                    </ul>
                </div>
                <div id="starting-from-week-cont" className="center col s6">
                    <h5>Starting from week...</h5>
                    <input id="select-start-week" placeholder={this.getCurrentWeek()} type="number" className="browser-default animated fadeIn" min="1" max="52" maxLength="2" onChange={(event) => this.handleWeek(event)}/>
                    <p>Not sure?</p>
                    <div id="repeat-active-switch-cont" className="col s12">
                        <h5>Repeat every week?</h5>
                        <div className="switch" onChange={(event) => this.repeatTime(event)}>
                            <label>
                            No
                            <input type="checkbox" defaultChecked={true} />
                            <span className="lever"></span>
                            Yes
                            </label>
                        </div>
                    </div>
                    <div>
                        {this.renderConfirmTimesBtn()}
                    </div>
                </div>
            </div>
        )
    }
}
