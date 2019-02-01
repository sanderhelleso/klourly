import React, { Component } from 'react';
import { room } from '../../api/room/room';
import * as firebase from 'firebase';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';
import { updateAnnouncementsAction } from '../../actions/room/announcement/updateAnnouncementsAction';

import LinearLoader from '../loaders/LinearLoader';
import CircularLoader from '../loaders/CircularLoader';

class RoomData extends Component {
    constructor(props) {
        super(props);

        this.state = { loaded: this.props.loaded };
    }

    componentWillUnmount() {

        // clear all previous listeners
        if (this.state.listeners) {
            this.state.listeners.announcementsRef.off('value');
            this.state.listeners.announcementsRef.off('child_added');
        }
    }

    componentWillReceiveProps(nextProps) {

        // fetch new data if navigation from one active room to another directly via router
        if (this.props.activeRoom && this.props.activeRoom.id !== nextProps.match.params.roomID) {
            this.loadData();
        }
    }

    componentDidMount = () => this.loadData(); 

    async loadData() {

        // if room state is matching dispatch action and set active room data
        if (this.props.activeRoom && this.props.activeRoom.id === this.props.match.params.roomID) {
            this.props.enterRoomAction(this.props.activeRoom);
            this.setListeners();
        }

        // if room state is not set or not matching, refetch room data
        else {

            this.setState({ loaded: false });

            // attempt to fetch room data
            const response = await room.getRoom(this.props.userID, this.props.match.params.roomID);

            // if success update state and render
            if (response.data.success) {
                this.props.enterRoomAction({ ...response.data.roomData, owner: response.data.ownerData });
                this.setListeners();
            }

            this.setState({ loaded: true });
        }
    }

    setListeners() {

        // set db refs
        this.setState({
            listeners: { 
                announcementsRef: firebase.database().ref(`rooms/${this.props.activeRoom.id}/announcements`) 
            }
        }, () => {

            // prefetch data to only recieve callbacks on new data added
            let initialDataLoaded = false;
            this.state.listeners.announcementsRef.once('value', snapshot => {
                initialDataLoaded = true;

                // update rooms announcement list to be up to date on room render
                this.setAnnouncements(snapshot.val());
            });

            // on value change, update state and announcements
            this.state.listeners.announcementsRef.on('child_added', snapshot => {

                // if initalData is not loaded, return
                if (!initialDataLoaded) return;

                // update rooms announcement list
                this.setAnnouncements({
                    [snapshot.key]: snapshot.val()
                })
            });
        });
    }

    setAnnouncements(announcements) {

        // update announcement comments
        this.props.updateAnnouncementsAction({
           updatedAnnouncements: announcements
       });
   }

    render() {
        return this.state.loaded ? null : <CircularLoader size="big" />
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        loaded: state.room.loaded,
        activeRoom: state.room.activeRoom
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        enterRoomAction,
        updateAnnouncementsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomData);