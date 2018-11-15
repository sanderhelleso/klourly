import React, { Component } from 'react';
import { Headphones, PieChart, } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const staticTxt = {
    heading: 'Purpose',
    description: 'The purpose of the room describes what kind of room purpose the room serves and allows users to more easily understand the content of the room.'
}

const className = 'room-option z-depth-2 no-select';
const purposeOptions = [
    {
        purpose: 'Education',
        className: 'room-option-stage3-option1'
    },
    {
        purpose: 'Event',
        className: 'room-option-stage3-option2'
    }
];

class Purpose extends Component {
    constructor(props) {
        super(props);

        this.state = {
            purpose: this.props.state.room.activeRoom.purpose,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn disabled'
        }

        this.selectPurpose = this.selectPurpose.bind(this);
        console.log(this.state);
    }

    selectPurpose(e, purpose) {
        this.setState({
            purpose: purpose
        });
    }

    renderPurposeOptions() {
        return purposeOptions.map((option) => {
            return (
                <div key={option.purpose} className="col s12 m6 l6">
                    <div 
                    tabIndex={0}
                    className={`${className} ${option.className} ${this.state.purpose === option.purpose ? 'z-depth-3' : 'disabled-option'}`}
                    onClick={(event) => this.selectPurpose(event, option.purpose)}
                    >
                        {option.purpose === 'Education' ? <PieChart size={25} /> : <Headphones size={25} />}
                        <h5>{option.purpose}</h5>
                    </div>
                </div>
            );
        })
    }

    renderPurpose() {
        return (
            <div className="col s12 m12 l12 room-settings-col">
                <h5>{staticTxt.heading}</h5>
                <p className="settings-description">{staticTxt.description}</p>
                <div className="row">
                    <div className="col s12 m12 l10 offset-l1">
                        {this.renderPurposeOptions()}
                    </div>
                </div>
            </div> 
        );
    }

    render() {
        return this.renderPurpose();
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Purpose);