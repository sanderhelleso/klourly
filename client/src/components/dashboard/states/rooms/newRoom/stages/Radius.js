import React, { Component } from 'react';
import { Compass } from 'react-feather';
import { helpers } from '../helpers/helpers';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../../../actions/newRoom/nextStageAction';

const staticTxt = {
    radius50: '50 Meters',
    radius100: '100 Meters',
    radius150: '150 Meters',
    radius200: '200 Meters'
}

class Radius extends Component {
    constructor(props) {
        super(props);

        this.state = {
            className50: 'room-option animated fadeIn room-option-stage4-option1 z-depth-2 hoverable no-select',
            className100: 'room-option animated fadeIn room-option-stage4-option2 z-depth-2 hoverable no-select',
            className150: 'room-option animated fadeIn room-option-stage4-option3 z-depth-2 hoverable no-select',
            className200: 'room-option animated fadeIn room-option-stage4-option4 z-depth-2 hoverable no-select',
        }

        this.render50 = this.render50.bind(this);
        this.render100 = this.render100.bind(this);
        this.render150 = this.render150.bind(this);
        this.render200 = this.render200.bind(this);
    }

    render50() {
        return(
            <div className="col s3">
                <div 
                className={this.state.className50} 
                onClick={(event) => helpers.selectOption(event, {radius: '50'}, this.props)}
                >
                    <Compass size={30} />
                    <h5>{staticTxt.radius50}</h5>
                </div>
            </div>
        )
    }

    render100() {
        return(
            <div className="col s3">
                <div 
                className={this.state.className100} 
                onClick={(event) => helpers.selectOption(event, {radius: '100'}, this.props)}
                >
                    <Compass size={30} />
                    <h5>{staticTxt.radius100}</h5>
                </div>
            </div>
        )
    }

    render150() {
        return(
            <div className="col s3">
                <div 
                className={this.state.className150} 
                onClick={(event) => helpers.selectOption(event, {radius: '150'}, this.props)}
                >
                    <Compass size={30} />
                    <h5>{staticTxt.radius150}</h5>
                </div>
            </div>
        )
    }

    render200() {
        return(
            <div className="col s3">
                <div 
                className={this.state.className200} 
                onClick={(event) => helpers.selectOption(event, {radius: '200'}, this.props)}
                >
                    <Compass size={30} />
                    <h5>{staticTxt.radius200}</h5>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id="room-option-cont" className="col s12 new-room-stage-4">
                {this.render50()}
                {this.render100()}
                {this.render150()}
                {this.render200()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Radius);