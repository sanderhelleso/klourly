import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../helpers/redirect';
import { ArrowRight } from 'react-feather';

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
                <ArrowRight />
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
    bottom: ${props => (props.owning || props.notAvailable) ? '35%' : '15%'};
    background: #9796f0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
