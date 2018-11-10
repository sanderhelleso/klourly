import React, { Component } from 'react';
import { Settings } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Information extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.state.room.activeRoom.name,
            type: this.props.state.room.activeRoom.type
        }
    }

    render() {
        return (
            <div>
                <h3><Settings size={38}/> Room Settings</h3>
                <p>Name: {this.state.name}</p>
                <p>Type: {this.state.type}</p>
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
