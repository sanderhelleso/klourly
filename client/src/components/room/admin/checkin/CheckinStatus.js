import React, { Component } from 'react';
import styled from 'styled-components';
import { WifiOff } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { timingSafeEqual } from 'crypto';

class CheckinStatus extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeCheckinStatus !== nextProps.activeCheckinStatus) {
            this.setState({
                statusData: nextProps[this.props.checkinID]
            });
        }
    }

    renderStatus() {

        if (this.props.checkinID) {
            console.log(this.props);
            return (
               <p>Active...</p> 
            );
        }

        else {
            return (
                <NotActive>
                    <WifiOff size={70} />
                    <h5>Not Active</h5>
                </NotActive>
            );
        }
    }

    render() {
        return (
            <StyledStatus className="col s12 m12 l5 offset-l1">
                {this.renderStatus()}
            </StyledStatus>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeCheckinStatus: state.room.activeCheckins
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinStatus);

const StyledStatus = styled.div`
    position: relative;
    padding: 2rem;
    -webkit-box-shadow: 0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    -moz-box-shadow:    0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    box-shadow:         0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    border-radius: 12px;
    background-color: #ffffff;
    min-height: 350px !important;
`;

const NotActive = styled.div`
    text-align: center;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);

    h5 {
        color: #bdbdbd;
        opacity: 0.8;
        font-weight: 100;
        margin-top: 2rem;
        font-size: 1.5rem;
    }

    svg {
        stroke: #8c9eff;
        opacity: 0.4;
    }
`;
