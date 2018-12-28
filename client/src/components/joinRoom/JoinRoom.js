import React, { Component } from 'react';
import styled from 'styled-components';
import { invite } from '../../api/room/invite';
import LinearLoader from '../loaders/LinearLoader';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class JoinRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    async componentDidMount() {

        // check for valid and active invite / room
        const response = await invite.getRoomInvite({
            ...this.props.match.params,
            uid: this.props.state.auth.user ? this.props.state.auth.user.id : null
        });

        this.setState({
            loading: false,
            status: response.status,
            success: response.data.success,
            message: response.data.message,
            invitationData: response.data.invitationData ? response.data.invitationData : null
        });
    }

    renderInvite() {
        if (!this.state.loading) {
            return (
                <div className="animated fadeIn">
                    <h1>Join Room</h1>
                    <h5>{this.state.message}</h5>
                    {this.renderInviteActionButton()}
                </div>
            );
        }

        return <LinearLoader loading={this.state.loading} />
    }

    renderInviteActionButton() {

        // get message depending on response status
        let message = '';

        switch (this.state.status) {
            case 409:
                message = 'Enter Room';
                break;
            
            case 404 || 410:
                message = 'Back to Home';
                break;
            
            case 200:
                message = 'Join Room';
                break;

            default: break;
        }

        return (
            <StyledButton className="waves-effect waves-light btn">
            {message}
            </StyledButton>
        )
    }


    render() {
        return (
           <main className="container">
                <StyledHeader>
                    {this.renderInvite()}
                </StyledHeader>
           </main>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);


const StyledHeader = styled.div`
    text-align: center;
    margin-top: 35vh;

    h1 {
        font-weight: 800;
        margin-bottom: 3rem;
        font-size: 3rem;
    }

    h5 {
        font-weight: 100;
        font-size: 1.5rem;
        max-width: 500px;
        margin: 0 auto;
        color: #9e9e9e;
    }
`;

const StyledButton = styled.button`
    transition: 0.3s ease-in-out;
    margin-top: 3rem;
    color: #ffffff;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    min-width: 250px;
    min-height: 50px;
    font-weight: 600;
    letter-spacing: 1px;
    background: #7F00FF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    &:hover, &:active, &:focus {
        box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.2);
    }
`;