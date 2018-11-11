import React, { Component } from 'react';
import { Lock, Users } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomTypeAction } from '../../../../actions/room/settings/updateRoomTypeAction';

const staticTxt = {
    heading: 'Type',
    description: 'The type of a room decides who and how users can join and participate. Private rooms are for users with invitation only, while public is for everyone.'
}

const className = 'room-option no-select z-depth-2';
const typeOptions = [
    {
        type: 'Private',
        className: 'room-option-stage3-option1'
    },
    {
        type: 'Public',
        className: 'room-option-stage3-option2'
    }
];

class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.state.room.activeRoom.type,
        }

        this.selectType = this.selectType.bind(this);
    }

    // update the rooms type (public / private)
    selectType(e, type) {
        this.setState({
            type: type
        });
    }

    renderTypeOptions() {
        return typeOptions.map((option) => {
            return (
                <div key={option.type} className="col s12 m6 l6">
                    <div 
                    tabIndex={0}
                    className={`${className} ${option.className} ${this.state.type.toLowerCase() === option.type.toLowerCase() ? 'z-depth-3' : 'disabled-option'}`}
                    onClick={(event) => this.selectType(event, option.type)}
                    >
                        {option.type === 'Private' ? <Lock size={25} /> : <Users size={25} />}
                        <h5>{option.type}</h5>
                    </div>
                </div>
            );
        })
    }

    render() {
        return(
            <div className="col s12 m12 l12 room-settings-col">
                <h5>{staticTxt.heading}</h5>
                <p className="settings-description">{staticTxt.description}</p>
                <div className="row">
                    <div className="col s12 m12 l10 offset-l1">
                        {this.renderTypeOptions()}
                    </div>
                </div>
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateRoomTypeAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Type);
