import React, { Component } from 'react';
import styled from 'styled-components';
import * as firebase from 'firebase';
import { notification } from '../../helpers/notification';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateNotificationsAction } from '../../actions/dashboard/notifications/updateNotificationsAction';
import { redirect } from '../../helpers/redirect';
import history from '../../helpers/history';


class NotificationsData extends Component {
    constructor(props) {
        super(props);

        this.notificationsRef = firebase.database().ref(`users/${this.props.userID}/notifications`);

        this.state = { playSound: false }
    }

    componentWillUnmount() {

        // clear all previous listeners
        this.notificationsRef.off('value');
        this.notificationsRef.off('child_added');
    }

    componentDidMount() {

        // prefetch data to only recieve callbacks on new data added
        let initialDataLoaded = false;
        this.notificationsRef.once('value', snapshot => {
            initialDataLoaded = true;

            // set initial data to always be up to date if data is stored in localstorage
            this.props.updateNotificationsAction(snapshot.exists() ? snapshot.val() : false);
        });

        // on value change, update state and notifications
        this.notificationsRef.on('child_added', snapshot => {

            // if initalData is not loaded, return
            if (!initialDataLoaded) return;

            // else update notifications with new data
            this.props.updateNotificationsAction({
                [snapshot.key]: snapshot.val()
            });
            
            // alert user
            this.alertUser(snapshot.val());
        });
    }

    alertUser(data) {

        // display alert
        const Toast = ({message, img, redirect}) => (
            <StyledNotify onClick={() => {
                const route = redirect.split('/');
                history.push(route.slice(3, route.length).join('/')); // remove domain form route
            }}>
                <img src={img} alt="" />
                <p>{message}</p>
            </StyledNotify>
        );

        notification.notify(
            <Toast 
                message={data.message} 
                img={data.image}
                redirect={data.redirect.redirectTo} 
            />
        );

        // play sound
        this.setState({ playSound: true });
        setTimeout(() => this.setState({ playSound: false }), 2000);

        // modify title if user is not viewing the page (tabbed out)
        if (document.hidden) {

            let switcher = 0;
            const currentPageTitle = document.title;
            const notificationTitle = '👋 New Notifications | Klourly';
            document.title = notificationTitle;
            const modifyTab = setInterval(() => {

                // if user is viewing page again, clear interval
                if (!document.hidden) {
                    clearInterval(modifyTab);
                    switcher = 0;
                }

                // else keep switching ;)
                if (switcher === 1) {
                    document.title = notificationTitle;
                    switcher--;
                }

                else {
                    document.title = currentPageTitle;
                    switcher++;
                }

            }, 2000);
        }
    }

    render() {
        return this.state.playSound ? <audio src="/sound/notification.mp3" autoPlay/> : null;
    }
}


const mapStateToProps = state => {
    return { 
        notifications: state.dashboard.userData.notifications,
        userID: state.auth.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        updateNotificationsAction 
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsData);

const StyledNotify = styled.div`

    position: relative;

    img {
        float: left;
        max-width: 22.5%;
        max-height: 70px;
        min-width: 22.5%;
        min-height: 70px;
    }

    p {
        position: absolute;
        top: 35%;
        left: 62%;
        text-align: left;
        min-width: 70%;
        transform: translate(-50%);
        font-size: 0.8rem;
        font-weight: 400;
    }
`;