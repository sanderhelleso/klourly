import React, { Component } from 'react';
import * as firebase from 'firebase';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateNotificationsAction } from '../../actions/dashboard/notifications/updateNotificationsAction';


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

            // play sound
            this.setState({ playSound: true });
            setTimeout(() => this.setState({ playSound: false }), 2000);
        });
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