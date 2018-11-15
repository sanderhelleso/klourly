import React, { Component } from 'react';
import { Headphones, PieChart, } from 'react-feather';
import { helpers } from '../helpers/helpers';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../actions/newRoom/nextStageAction';

const staticTxt = {
    education: 'Education',
    event: 'Event'
}

class Purpose extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classNameEduction: 'room-option animated fadeIn room-option-stage3-option1 z-depth-2 hoverable no-select',
            classNameEvents: 'room-option animated fadeIn room-option-stage3-option2 z-depth-2 hoverable no-select'
        }

        this.renderEducation = this.renderEducation.bind(this);
        this.renderEvent = this.renderEvent.bind(this);
    }

    componentWillMount() {
        document.title = 'Creating New Room | Step 3 / 7 | Klourly'
    }

    renderEducation() {
        return(
            <div className="col s6">
                <div 
                tabIndex={0}
                className={this.state.classNameEduction} 
                onClick={(event) => helpers.selectOption(event, {purpose: 'Education'}, this.props)}
                >
                    <PieChart size={35} />
                    <h5>{staticTxt.education}</h5>
                </div>
            </div>
        )
    }


    renderEvent() {
        return(
            <div className="col s6">
                <div 
                tabIndex={0}
                className={this.state.classNameEvents} 
                onClick={(event) => helpers.selectOption(event, {purpose: 'Event'}, this.props)}
                >
                    <Headphones size={35} />
                    <h5>{staticTxt.event}</h5>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div id="room-option-cont" className="col s12">
                {this.renderEducation()}
                {this.renderEvent()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Purpose);