import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Timer extends Component {
    constructor(props) {
        super(props)

        this.SEC    = 1000;
        this.DAY    = 86400;
        this.HOUR   = 3600;
        this.MIN    = 60;

        this.state = {
            timer: null,
            timeElapsed: null
        }
    }

    // remove timer on unmount
    componentWillUnmount = () => clearInterval(this.state.timer);

    // intitialize new timer on mount
    componentDidMount() {
        
        // start ticking
        const timer = setInterval(() => this.calculateTime(), this.SEC)
        this.setState({ timer });
    }

    calculateTime() {

        // get total seconds between the checkin start time and current time
        let delta = Math.abs(this.props.startTime - new Date().getTime()) / this.SEC;

        // calculate (and subtract) whole days from delta val
        const days = Math.floor(delta / this.DAY);
        delta -= days * this.DAY;

        // calculate (and subtract) whole hours from delta val
        const hours = Math.floor(delta / this.HOUR) % 24;
        delta -= hours * this.HOUR;

        // calculate (and subtract) whole minutes from delta val
        const minutes = Math.floor(delta / this.MIN) % this.MIN;
        delta -= minutes * this.MIN;

        // remaining val from delta is seconds
        const seconds = Math.floor(delta % this.MIN);

        // update state with time elapsed since activation of checkin
        this.setState({ 
            timeElapsed: `${hours}h ${minutes}m ${seconds}s`
        });
    }


    render() {
        return (
            <StyledTimer className="animated fadeIn">
                <span id="elapsed-info">Time elapsed</span>
                <p>{this.state.timeElapsed}</p>
            </StyledTimer>
        )
    }
}

const mapStateToProps = state => {
    return { startTime: state.room.activeRoom.checkin.timestamp };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

const StyledTimer = styled.div`
    letter-spacing: 2px;
    min-height: 65px;
    
    #elapsed-info {
        display: block;
        font-size: 0.8rem;
        color: #9e9e9e;
        opacity: 0.7;
        margin-bottom: 0.35rem;
        text-transform: uppercase;
    }

    p {
        font-size: 1.75rem;
    }
`;
