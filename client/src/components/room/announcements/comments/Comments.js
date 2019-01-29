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

    renderCommentsInfo() {

        // render comments info containing either no comments message or comments amount
        if (!this.props.comments) return <h5>This announcement dont have any comments yet</h5>;
        else return <h5>Showing {Object.keys(this.props.comments).length} comments</h5>;
    }

    renderCommentsCont() {

        // if no comments is present, only render post comment
        if (!this.props.comments) return <PostComment announcementID={this.props.announcementID} />;

        // if comments are present, render post aswell as comments
        console.log(this.props.comments);
        return (
            <div>
                <PostComment announcementID={this.props.announcementID} />
                {this.renderComments()}
            </div>
        )
    }

    renderComments() {
        return Object.values(this.props.comments)
                .sort((a, b) => b.postedAt - a.postedAt)
                .map(comment => <Comment key={comment.postedAt} data={comment} />);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <StyledComments className="col s12">
                        {this.renderCommentsInfo()}
                    </StyledComments>
                </div>
                {this.renderCommentsCont()}
            </div>
        )
    }
}


const mapStateToProps = (state, compProps) => {
    return { 
        roomID: state.room.activeRoom.id,
        comments: state.room.activeRoom
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
