import React, { Component } from 'react';
import { room } from '../../api/room/room';
import * as firebase from 'firebase';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';
import { updateAnnouncementsAction } from '../../actions/room/announcement/updateAnnouncementsAction';
import { loadNewAnnouncementsAction } from '../../actions/room/announcement/loadNewAnnouncementsAction';

import LinearLoader from '../loaders/LinearLoader';
import CircularLoader from '../loaders/CircularLoader';

class RoomData extends Component {
    constructor(props) {
        super(props);

        this.DEFAULT_ANNOUNCEMENT_LIMIT = 3;

        this.state = { 
            loaded: this.props.loaded,
            announcementLimit: this.DEFAULT_ANNOUNCEMENT_LIMIT, // updated on scroll
            initialAnnouncementsLoaded: false,
            hasAnnouncementsLeft: true
        };
    }

    componentWillUnmount() {

        // clear all previous listeners
        if (this.state.listeners) {
            this.state.listeners.announcementsRef.off('value');
            this.state.listeners.announcementsRef.off('child_added');

            // remove announcements from active room to be refetched at limit for performence
            this.setAnnouncements(false);
        }
    }

    componentWillReceiveProps(nextProps) {

        // fetch new data if navigation from one active room to another directly via router
        if (this.props.activeRoom && this.props.activeRoom.id !== nextProps.match.params.roomID) {
            this.loadData();
        }

        if (!this.props.fetcingNextAnnoucements && nextProps.fetcingNextAnnoucements) {
            this.setState({ 
                announcementLimit: this.state.announcementLimit + this.DEFAULT_ANNOUNCEMENT_LIMIT,
            }, () => this.fetchAnnouncements(true));
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

    fetchAnnouncements(fetchNew) {

        // prefetch data to only recieve callbacks on new data added
        if (this.state.hasAnnouncementsLeft) {
            this.state.listeners.announcementsRef
            .orderByChild('timestamp')
            .limitToLast(this.state.announcementLimit)
            .once('value', snapshot => {

                console.log(this.state);

                // update rooms announcement list to be up to date on room render
                if (snapshot.exists()) {

                    // update fetch announcement
                    this.setAnnouncements(snapshot.val());

                    // check if collection has more childs
                    if (snapshot.numChildren() < this.state.announcementLimit) {
                        this.props.loadNewAnnouncementsAction('ALL_LOADED');
                        return this.setState({ hasAnnouncementsLeft: false });
                    }

                    // allow user to keep fetching annoucements
                    if (fetchNew) this.props.loadNewAnnouncementsAction(false);


                }

                // notifiy listeners that they can start listening for child added
                this.setState({ initialAnnouncementsLoaded: true });
            });
        }
    }

    setListeners() {

        // set db refs
        this.setState({
            listeners: { 
                announcementsRef: firebase.database().ref(`rooms/${this.props.activeRoom.id}/announcements`) 
            }
        }, () => {

            this.fetchAnnouncements();

            // on value change, update state and announcements
            this.state.listeners.announcementsRef
            .orderByChild('timestamp')
            .limitToLast(1)
            .on('child_added', snapshot => {

                // if initalData is not loaded, return
                if (!this.state.initialAnnouncementsLoaded) return;

                // update rooms announcement list
                this.setAnnouncements({
                    [snapshot.key]: snapshot.val()
                });
            });

            this.props.loadNewAnnouncementsAction(false);
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
        activeRoom: state.room.activeRoom,
        fetcingNextAnnoucements: state.room.activeRoom 
        ? state.room.activeRoom.fetcingNextAnnoucements
        : false
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        enterRoomAction,
        updateAnnouncementsAction,
        loadNewAnnouncementsAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomData);