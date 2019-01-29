import React, { Component } from 'react';
import styled from 'styled-components';
import * as firebase from 'firebase';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateAnnouncementCommentsAction } from '../../../../actions/room/announcement/updateAnnouncementCommentsAction';

import Comment from './Comment';
import PostComment from './PostComment';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.commentsRef = firebase.database().ref(`rooms/${this.props.roomID}/announcements/${this.props.announcementID}/comments`);
    }

    componentWillUnmount() {

        // clear all previous listeners
        this.commentsRef.off('value');
        this.commentsRef.off('child_added');
    }

    componentDidMount() {


        // prefetch data to only recieve callbacks on new data added
        let initialDataLoaded = false;
        this.commentsRef.once('value', snapshot => {
            initialDataLoaded = true;

            // set initial data to always be up to date if data is stored in localstorage
            this.setComments(snapshot.val());
        });

        // on value change, update state and comments
        this.commentsRef.on('value', snapshot => {

            // if initalData is not loaded, return
            if (!initialDataLoaded) return;

            // else update comments with new data
            this.setComments(snapshot.val());
            console.log(snapshot.val());
        });
    }

    setComments(comments) {

         // update announcement comments
         this.props.updateAnnouncementCommentsAction({
            announcementID: this.props.announcementID,
            updatedComments: comments
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <StyledComments className="col s12">
                        <h5>Showing 6 comments</h5>
                    </StyledComments>
                </div>
                <PostComment announcementID={this.props.announcementID} />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
        )
    }
}


const mapStateToProps = (state, compProps) => {
    return { 
        roomID: state.room.activeRoom.id,
        announcement: state.room.activeRoom
                      .announcements[compProps.announcementID].comments
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateAnnouncementCommentsAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);


const StyledComments = styled.div`
    
    margin-top: 4.5rem;

    h5 {
        font-size: 1.15rem;
        color: #bdbdbd;
        font-weight: 400;
    }
`;
