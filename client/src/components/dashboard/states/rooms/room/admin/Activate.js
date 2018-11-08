import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Activate extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.state.dashboard.currentRoom;
    }

    renderRadius() {
        return this.state.radius;
    }


    render() {
        return (
            <div id="room-activate-admin" className="col s12 animated fadeIn">
                <div className="room-admin center-align">
                    <h3>Activate Room</h3>
                    <h5>The room will be active for authorized users <span>{this.renderRadius()}M</span> around me</h5>
                    <div>
                        <button 
                        id='checkin-btn' 
                        className="waves-effect waves-light btn animated fadeIn"
                        >
                        Activate
                        </button>
                    </div>
                    <a>Change activation settings?</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
