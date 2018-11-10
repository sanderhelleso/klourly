import React, { Component } from 'react';
import { Settings } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Type from './Type';
import Name from './Name';

class Information extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row center-align">
                <div className="s12 m12 l12 settings-row row">
                    <Name name={this.props.state.room.activeRoom.name} />
                    <Type type={this.props.state.room.activeRoom.type} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Information);
