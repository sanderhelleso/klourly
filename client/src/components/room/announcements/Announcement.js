import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Reactions from './reactions/Reactions';
import BackToRoom from '../BackToRoom';

class Announcement extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.state.room.activeRoom.activeAnnouncement;
        console.log(this.state);
    }

    renderAnnouncement() {
        return (
            <StyledAnnouncement className="animated fadeIn col s12 m10 offset-m1 l8 offset-l2">
                <h1>{this.state.title}</h1>
                <h5>{format.tsToDate(this.state.timestamp)}</h5>
                <p>{this.state.message}</p>
                <Reactions id={this.state.id} data={this.state.reactions} />
            </StyledAnnouncement>
        )
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.state.room.activeRoom.id} />
                <div className="row">
                    {this.renderAnnouncement()}
                </div>
            </main>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(Announcement);

const StyledAnnouncement = styled.section`
    h1 {
        font-size: 3rem;
        text-align: center;
        margin-top: 0;
    }

    h5 {
        color: #bdbdbd;
        text-align: center;
        font-size: 1.25rem;
        margin-bottom: 3rem;
    }

    p {
        clear: both;
        min-width: 100%;
        padding: 2rem 0;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        color: #757575;
        font-weight: 400;
    }

    .reactions {
        margin-top: 2rem;
    }
`;
