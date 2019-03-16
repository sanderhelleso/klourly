import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { room } from '../../../../api/room/room';
import { notification } from '../../../../helpers/notification';
import Member from './Member';
import CircularLoader from '../../../loaders/CircularLoader';
import NoMembersPlaceholder from '../../placeholders/NoMembersPlaceholder';
import { updateRoomMembersAction } from '../../../../actions/room/updateRoomMembersAction';

class MembersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
        }
    }

    componentWillReceiveProps(nextProps) {

        // on new member join, update list
        if (nextProps.membersList.length !== this.props.membersList.length &&
            nextProps.membersList.length !== 0) 
        {
            this.loadMembers(this.getNonLoadedMembers(nextProps.membersList));
        }
    }

    async componentDidMount() {

        this.setState({ loading: true });

        // check if member list is empty
        if (this.props.membersList && this.props.membersList.length > 0) {

            // get all members not previously loaded
            const nonLoadedMembers = this.getNonLoadedMembers(this.props.membersList)

            // if all members are loaded, set loaded members
            if (nonLoadedMembers.length === 0) {

                // sort list (A - Z)
                this.props.updateRoomMembersAction(
                    this.props.membersList.sort(
                    (a, b) => `${a.name}`.localeCompare(`${b.name}`)
                ));

                return this.setState({ loading: false });
            }

            // attempt to fetch rooms members
           const loadMembers = await this.loadMembers(nonLoadedMembers);
           
            // notify user about members
           if (!loadMembers) {
                this.setState({ error: true });
                notification.error('Unable to retrieve members at this time');
            }
        }

        else this.setState({ loading: false });
    }

    getNonLoadedMembers(list) {
        return list.filter(m => typeof m !== 'object');
    }

    getLoadedMembers() {
        return this.props.membersList.filter(m => typeof m === 'object');
    }

    async loadMembers(list) {

        // attempt to fetch rooms members
        const response = await room.getRoomMembers(
            this.props.userID, 
            this.props.roomID, 
            list
        );

        // set members
        if (response.data.success) {

            // sort list (A - Z) and update
            this.props.updateRoomMembersAction(

                // cobine loaded members data from api with preloaded data from store
                response.data.membersList 
                ? [
                    ...response.data.membersList, 
                    ...this.getLoadedMembers()]
                    .sort((a, b) => `${a.name}`.localeCompare(`${b.name}`)) 
                : []
            );

            return true;
        }

        // handle error
        this.setState({ error: true });
        return false;
    }

    renderMembers() {

        // if members are loaded, render list of prepeared members with data
        if (!this.state.loading && 
            this.props.membersList && 
            this.props.membersList.length > 0) 
        {
            return this.props.membersList
                .filter(m => typeof m === 'object')
                .map(m => <Member key={m.id} data={m} />
            );
        }

        else if (this.state.error) return <p>Unable to retrieve members at this time</p>;

        else if (this.state.loading) return <CircularLoader size="medium" />;

        return <NoMembersPlaceholder text="invite" includeLink={false} />;

    }

    render() {
        return (
            <StyledMembersList>
                <div className="row">
                    {this.renderMembers()}
                </div>
            </StyledMembersList>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        membersList: state.room.activeRoom.members
     }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateRoomMembersAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);

const StyledMembersList = styled.div`
    margin-top: 4rem;
    padding: 4rem 0;
    border-top: 1px solid #e0e0e0;
    position: relative;

    .circular-loader {
        top: 80%;
    }
`;