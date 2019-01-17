import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import Back from '../../dashboard/Back';

// stages
import Intro from '../Intro';
import Name from './Name';
import Purpose from './Purpose';
import Radius from './Radius';
import Location from './Location';
import Times from './Times';
import Cover from './Cover';
import Create from './Create';

class Stages extends Component {
    constructor(props) {
        super(props);
    }

    renderBackToDash() {
        return this.props.currentStage < 8 ? <Back location="dashboard" /> : null;
    }

    currentStage() {
        switch (this.props.currentStage) {

            case 1:
                return <Name />;

            case 2:
                return <Purpose />;
            
            case 3:
                return <Radius />;

            case 4:
                return <Location />;

            case 5:
                return <Times />;
            
            case 6:
                return <Cover />;

            case 7:
                return <Create />;

            default:
                return null;
        }
    }

    render() {
        return (
            <div>
                {this.renderBackToDash()}
                <div id="new-room-stage" className="no-select row">
                    <Intro />
                    <div id="new-room-stage-cont" className="col s12">
                        {this.currentStage()}
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        currentStage: state.dashboard.newRoom.stage
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stages);
