import React, { Component } from 'react';
import styled from 'styled-components';
import { invite } from '../../api/room/invite';
import { redirect } from '../../helpers/redirect';
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

        // set invite state
        this.setState({
            loading: false,
            status: response.status,
            success: response.data.success,
            message: response.data.message,
            invitationData: response.data.invitationData ? response.data.invitationData : null
        });

        // set heading and message
        this.setMessage();
    }

    renderInvite() {
        if (!this.state.loading) {
            return (
                <InvitationCont className="animated fadeIn">
                    {this.renderInviteImage()}
                    <h1>{this.state.heading}</h1>
                    <h5>{this.state.message}</h5>
                    {this.renderActionButton()}
                </InvitationCont>
            );
        }

        return <LinearLoader center={true} loading={this.state.loading} />
    }

    renderInviteImage() {
        return this.state.status === 200 
        ?
        <img 
            className="animated fadeIn"
            src={this.state.invitationData.ownerData.photoUrl} 
            alt="Room owner avatar" 
        />
        : null;
    }

    renderActionButton() {
        return (
            <StyledButton 
                className="waves-effect waves-light btn"
                onClick={() => {

                    // join room / login
                    if (this.state.status === 200) {
                        this.props.state.auth.user 
                        ? this.joinRoomLoggedIn() 
                        : this.joinRoomNotLoggedIn()
                    }

                    // redirect to room
                    else if (this.state.status === 409) {
                        redirect.room(this.props.match.params.roomID);
                    }

                    // rediret to home
                    else {
                        redirect.home();
                    }
                }}
            >
                {this.state.buttonMessage}
            </StyledButton>
        )
    }

    joinRoomLoggedIn() {
        console.log('IM LOGGED IN!!');
    }

    joinRoomNotLoggedIn() {
        console.log(this.props.match.params);
        console.log('IM NOT LOGGED IN');
        redirect.loginWithJoinRoomRedirect(
                this.props.match.params.inviteID, 
                this.props.match.params.roomID
            );
    }

    setMessage() {

        // get message depending on response status
        switch (this.state.status) {
            case 409:
                this.setState({
                    heading: 'Oh Hi There',
                    buttonMessage: 'Enter Room'
                });
                break;
            
            case 404 || 410:
                this.setState({
                    heading: 'Invalid Link',
                    buttonMessage: 'Back to Home'
                });
                break;
            
            case 200:
                this.setState({
                    heading: this.state.invitationData.name,
                    buttonMessage: 'Join Room'
                });
                break;

            default: break;
        }
    }

    renderBg() {

        if (!this.state.loading) {
            return (
                <InviteRoomBg 
                    url={
                        this.state.status === 200 
                        ? this.state.invitationData.cover
                        : '/img/invite/invalid.jpg'
                    }
                />
            )
        }

        return null;
    }


    render() {
        return (
            <main className="container">
                {this.renderBg()}
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

    h1 {
        font-weight: 800;
        margin-top: 2rem;
        font-size: 2.75rem;
    }

    h5 {
        font-weight: 100;
        font-size: 1.25rem;
        margin: 1rem;
        color: #9e9e9e;
    }
`;

const InvitationCont = styled.div`
    padding: 3rem;
    box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    background-color: #ffffff;
    max-width: 500px;
    margin: 25vh auto;
    position: relative;

    img {
        position: absolute;
        top: -40px;
        left: -25px;
        border-radius: 50%;
        min-width: 110px;
        max-width: 110px;
        min-height: 110px;
        max-height: 110px;
        box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.1);
        transform: rotate(-7.5deg);
    }
`;

const StyledButton = styled.button`
    margin-top: 3rem;
    color: #ffffff;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.1);
    min-width: 260px;
    min-height: 50px;
    font-weight: 600;
    letter-spacing: 1px;
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 110px;

    &:hover {
        box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.3);
    }
`;

const InviteRoomBg = styled.div`
    height: 101%;
    background: linear-gradient(to right,
    rgba(166, 81, 223, 0.8),
    rgba(128, 26, 245, 0.8)),
    url(${props => props.url});
    background-size: cover;
	background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: 0 50%;
    position: fixed;
    top: -1%;
    left: 0;
    right: 0;
    z-index: 0;
    filter: blur(3px);
    -webkit-filter: blur(3px);
    transform: scale(1.1);
`;