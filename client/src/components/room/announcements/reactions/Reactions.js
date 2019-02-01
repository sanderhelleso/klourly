import React, { Component } from 'react';
import styled from 'styled-components';
import * as firebase from 'firebase';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateAnnouncementReactionsAction } from '../../../../actions/room/announcement/updateAnnouncementReactionsAction';

import Reaction from './Reaction';


class Reactions extends Component {
    constructor(props) {
        super(props);

        this.reactionsRef = firebase.database().ref(`rooms/${this.props.roomID}/announcements/${this.props.announcementID}/reactions`);
    }

    componentWillUnmount() {

        // clear all previous listeners
        this.reactionsRef.off('value');
    }

    componentDidMount() {


        // prefetch data to only recieve callbacks on new data added
        let initialDataLoaded = false;
        this.reactionsRef.once('value', snapshot => {
            initialDataLoaded = true;

            // set initial data to always be up to date if data is stored in localstorage
            this.setReactions(snapshot.val());
        });

        // on value change, update state and reactions
        this.reactionsRef.on('value', snapshot => {

            // if initalData is not loaded, return
            if (!initialDataLoaded) return;

            // else update reactions with new data
            this.setReactions(snapshot.val());
        });
    }

    setReactions(reactions) {

        // update announcement reaction
        this.props.updateAnnouncementReactionsAction({
            announcementID: this.props.announcementID,
            updatedReactions: reactions
        });
    }


    getRGB() {
        return (
            `rgba(
            ${Math.floor(Math.random() * 255) + 1},
            ${Math.floor(Math.random() * 255) + 1},
            ${Math.floor(Math.random() * 255) + 1},
            0.5)`
        );
    }

    hoverReaction(e) {
        e.target.style.backgroundColor = this.getRGB();
    }

    removeHoverReaction(e) {
        e.target.style.backgroundColor = 'transparent';
    }

    renderReactions() {

        return Object.entries(this.props.reactions).map(([key, value]) => {
            return (
                <Reaction 
                    key={key}
                    id={this.props.announcementID}
                    name={key}
                    data={value}
                />
            );
        });
    }


    render() {
        return (
            <StyledReactions className="col s12 m12 l10">
                {this.renderReactions()}
            </StyledReactions>
        )
    }
}

const mapStateToProps = (state, compProps) => {
    return {
        roomID: state.room.activeRoom.id,
        reactions: state.room.activeRoom.announcements[compProps.announcementID].reactions
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateAnnouncementReactionsAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reactions);


const StyledReactions = styled.div`

    text-align: center;
    margin-top: 0.5rem;
    padding: 0 !important;

    div {
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        margin: 0.25rem 0.5rem;
        padding: 0.5rem !important;
        cursor: pointer;
        transition: 0.2s ease-in-out;
    }

    div span {
        font-size: 1rem;
        z-index: -1000;
        pointer-events: none;
        color: #363636;
    }

    .reacted {
        background-color: #ede7f6 !important;
        border: 1px solid #d1c4e9 !important;
    }
`;
