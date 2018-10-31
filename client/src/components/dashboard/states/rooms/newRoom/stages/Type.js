import React, { Component } from 'react';
import { Lock, Users } from 'react-feather';
import { helpers } from '../helpers/helpers';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../../../actions/newRoom/nextStageAction';

const staticTxt = {
    public: 'Public',
    private: 'Private'
}

class Type extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomType: null,
            classNamePublic: 'room-option animated fadeIn room-option-stage2-option1 z-depth-2 hoverable no-select',
            classNamePrivate: 'room-option animated fadeIn room-option-stage2-option2 z-depth-2 hoverable no-select'
        }

        this.public = this.public.bind(this);
        this.private = this.private.bind(this);
    }

    public() {
        return(
            <div className="col s6">
                <div 
                className={this.state.classNamePublic} 
                onClick={(event) => helpers.selectOption(event, {type: 'Public'}, this.props)}
                >
                    <Users size={35} />
                    <h5>{staticTxt.private}</h5>
                </div>
            </div>
        )
    }

    private() {
        return(
            <div className="col s6">
                <div 
                className={this.state.classNamePrivate} 
                onClick={(event) => helpers.selectOption(event, {type: 'Private'}, this.props)}
                >
                    <Lock size={35} />
                    <h5>{staticTxt.private}</h5>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div id="room-option-cont" className="col s12">
                {this.public()}
                {this.private()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Type);
