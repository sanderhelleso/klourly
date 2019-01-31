import React, { Component } from 'react';
import * as firebase from 'firebase';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setInitialNotificationsAction } from '../../actions/dashboard/notifications/setInitialNotificationsAction';
import { updateNotificationsAction } from '../../actions/dashboard/notifications/updateNotificationsAction';


class NotificationsData extends Component {
    constructor(props) {
        super(props);

        this.notificationsRef = firebase.database().ref(`users/${this.props.userID}/notifications`);
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

            console.log(snapshot.val());
            // set initial data to always be up to date if data is stored in localstorage
        });

        // on value change, update state and notifications
        this.notificationsRef.on('value', snapshot => {

            // if initalData is not loaded, return
            if (!initialDataLoaded) return;

            // else update notifications with new data
            console.log(snapshot.val());
        });
    }

    render() {
        return null;
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
        setInitialNotificationsAction,
        updateNotificationsAction 
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsData);