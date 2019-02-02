import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../helpers/redirect';
import { ArrowRight, ChevronRight } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ToRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            available: false
        }
    }

    componentWillReceiveProps(nextProps) {

        // check if room is available for checkin
        if (nextProps.availableForCheckin && nextProps.availableForCheckin.active) {
            this.setState({ available: true });
        }

        else this.setState({ available: false });
    }

    componentDidMount() {

        // check if room is available for checkin
        if (this.props.availableForCheckin && this.props.availableForCheckin.active) {
            this.setState({ available: true });
        }

        else this.setState({ available: false });
    }



    render() {
        return (
            <ToRoomButton 
                className="waves-effect waves-light btn-flat"
                notAvailable={this.props.owning || !this.state.available}
                onClick={() => redirect.room(this.props.roomID)}
            >
                <span>Enter Room</span><ChevronRight />
            </ToRoomButton>
        )
    }
}

const mapStateToProps = (state, compProps) => {
    return { 
        availableForCheckin: state.room.availableForCheckin[compProps.roomID]
    };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToRoom);


const ToRoomButton = styled.a`
    
    color: #b388ff;
    font-weight: 800;
    letter-spacing: 1px;
    position: absolute;
    bottom: 5px;
    right: 0;

    svg {
        margin-bottom: -6px;
        stroke: #e0e0e0;
    }
`;
