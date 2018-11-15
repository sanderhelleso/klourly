import React, { Component } from 'react';

import { Compass } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const staticTxt = {
    heading: 'Radius',
    description: 'The radius of a room is what controlls where and how close a user need to be to be able to checkin into a room. The radius is spreading from the location the room became active.'
}

const className = 'room-option z-depth-2 no-select';
const radiusOptions = [
    {
        title: '50 Meters',
        className: 'room-option-stage4-option1',
        radius: '50'
    },
    {
        title: '100 Meters',
        className: 'room-option-stage4-option2',
        radius: '100'
    },
    {
        title: '150 Meters',
        className: 'room-option-stage4-option3',
        radius: '150'
    },
    {
        title: '200 Meters',
        className: 'room-option-stage4-option4',
        radius: '200'
    }
]

class Radius extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: this.props.state.room.activeRoom.radius,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn disabled'
        }

        this.selectRadius = this.selectRadius.bind(this);
    }

    selectRadius(e, radius) {
        console.log(radius);
        this.setState({
            radius: radius
        });
    }

    renderRadiusOptions() {
        return radiusOptions.map((option) => {
            return (
                <div key={option.radius} className="col s12 m6 l3">
                    <div 
                    tabIndex={0}
                    className={`${className} ${option.className} ${this.state.radius === option.radius ? 'z-depth-3' : 'disabled-option'}`}
                    onClick={(event) => this.selectRadius(event, option.radius)}
                    >
                        <Compass size={25} />
                        <h5>{option.title}</h5>
                    </div>
                </div>
            );
        })
    }

    renderRadius() {
        return (
            <div className="col s12 m12 l12 room-settings-col">
                <h5>{staticTxt.heading}</h5>
                <p className="settings-description">{staticTxt.description}</p>
                <div className="row">
                    {this.renderRadiusOptions()}
                </div>
            </div> 
        );
    }

    render() {
        return this.renderRadius();
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Radius);