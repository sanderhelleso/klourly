import React, { Component } from 'react';
import { Compass } from 'react-feather';
import { helpers } from '../helpers/helpers';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../../../actions/newRoom/nextStageAction';

const className = 'room-option animated fadeIn z-depth-2 hoverable no-select';
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
        this.renderRadiusOptions = this.renderRadiusOptions.bind(this);
    }

    componentWillMount() {
        document.title = 'Creating New Room | Step 4 / 7 | Klourly'
    }

    renderRadiusOptions() {
        return radiusOptions.map((option) => {
            return (
                <div key={option.radius} className="col s12 m6 l3">
                    <div 
                    tabIndex={0}
                    className={`${className} ${option.className}`} 
                    onClick={(event) => helpers.selectOption(event, { radius: option.radius }, this.props)}
                    >
                        <Compass size={30} />
                        <h5>{option.title}</h5>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div id="room-option-cont" className="col s12 new-room-stage-4">
                {this.renderRadiusOptions()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Radius);